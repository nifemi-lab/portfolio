/* =========================================================
   JAMB Study Tracker — app.js
   Plain ES6, no dependencies. Data is stored in localStorage
   as five tables: subjects, sessions, logs, quiz_results, questions.
   ========================================================= */

(function () {
  'use strict';

  /* ---------------- Constants ---------------- */

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const DAYS_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const KEYS = ['A', 'B', 'C', 'D'];

  const PRESETS = [
    'Use of English', 'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'Economics', 'Government', 'Geography', 'Literature-in-English',
    'History', 'Commerce', 'Further Mathematics', 'Agricultural Science',
    'Principles of Accounts', 'Christian Religious Knowledge', 'Islamic Religious Knowledge'
  ];

  /* Built-in question bank: { s: subject, q: question, o: options, a: answer index } */
  /* Question files (js/questions.js + js/q-*.js) load first as window.QUESTION_BANK. */
  const BANK = window.QUESTION_BANK || [];

  /* ---------------- Storage ---------------- */

  const STORE_BASE = 'jamb_study_db_v1';
  const SESSION_BASE = 'jamb_study_session_v1';
  const PROFILES_KEY = 'jamb_study_profiles_v1';

  /* One device can hold several students. Each gets its own data key and
     its own Supabase identity, so nothing leaks between them. This runs
     before load() so the very first read already uses the right key. */
  const Profiles = { list: [], active: 'me' };

  (function bootstrapProfiles() {
    let p = null;
    try {
      p = JSON.parse(window.localStorage.getItem(PROFILES_KEY) || 'null');
    } catch (e) { p = null; }

    if (!p || !Array.isArray(p.list) || !p.list.length) {
      p = { active: 'me', list: [{ id: 'me', name: 'Me' }] };
      try {
        /* adopt whatever this browser already had, so no data is lost */
        const oldDb = window.localStorage.getItem(STORE_BASE);
        if (oldDb) window.localStorage.setItem(STORE_BASE + '::me', oldDb);
        const oldSess = window.localStorage.getItem(SESSION_BASE);
        if (oldSess) window.localStorage.setItem(SESSION_BASE + '::me', oldSess);
        window.localStorage.setItem(PROFILES_KEY, JSON.stringify(p));
      } catch (e) { /* storage blocked */ }
    }

    Profiles.list = p.list;
    Profiles.active = p.active || p.list[0].id;
    if (!Profiles.list.some(function (x) { return x.id === Profiles.active; })) {
      Profiles.active = Profiles.list[0].id;
    }
  })();

  function profileKey(base) { return base + '::' + Profiles.active; }

  function persistProfiles() {
    try {
      window.localStorage.setItem(PROFILES_KEY, JSON.stringify({
        active: Profiles.active, list: Profiles.list
      }));
    } catch (e) { /* storage blocked */ }
  }

  let STORE_KEY = profileKey(STORE_BASE);
  let memoryOnly = false;

  function uid(prefix) {
    return prefix + '_' + Math.random().toString(36).slice(2, 9);
  }

  function slug(name) {
    return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function defaultDB() {
    const s = (name, target, exam) => ({ id: slug(name), name, target, exam: !!exam });
    return {
      subjects: [
        s('Use of English', 450, true),
        s('Mathematics', 450, true),
        s('Physics', 360, true),
        s('Chemistry', 360, true),
        s('Biology', 300, false),
        s('Economics', 300, false),
        s('Government', 300, false),
        s('Further Mathematics', 240, false)
      ],
      sessions: [
        { id: uid('sess'), subject: 'Use of English', day: 0, time: '16:00', minutes: 60, topic: 'Comprehension + synonyms' },
        { id: uid('sess'), subject: 'Mathematics',    day: 0, time: '17:15', minutes: 75, topic: 'Algebra — simultaneous equations' },
        { id: uid('sess'), subject: 'Physics',        day: 1, time: '16:00', minutes: 60, topic: 'Mechanics — motion' },
        { id: uid('sess'), subject: 'Chemistry',      day: 1, time: '17:15', minutes: 60, topic: 'Mole concept' },
        { id: uid('sess'), subject: 'Use of English', day: 2, time: '16:00', minutes: 60, topic: 'Oral English + antonyms' },
        { id: uid('sess'), subject: 'Mathematics',    day: 2, time: '17:15', minutes: 75, topic: 'Geometry practice' },
        { id: uid('sess'), subject: 'Physics',        day: 3, time: '16:00', minutes: 60, topic: 'Waves and sound' },
        { id: uid('sess'), subject: 'Chemistry',      day: 4, time: '16:00', minutes: 60, topic: 'Periodic table' },
        { id: uid('sess'), subject: 'Use of English', day: 4, time: '17:15', minutes: 45, topic: 'Practice drill' },
        { id: uid('sess'), subject: 'Mathematics',    day: 5, time: '10:00', minutes: 90, topic: 'Full mock — 50 questions' },
        { id: uid('sess'), subject: 'Mixed practice', day: 6, time: '17:00', minutes: 60, topic: 'Weekly review + wrong answers' }
      ],
      logs: [],
      quiz_results: [],
      questions: [],
      missed: [],
      recentQ: [],
      settings: { dailyGoal: 120, examDate: '', theme: '', retake: null }
    };
  }

  function normalise(parsed) {
    const base = defaultDB();
    return {
      subjects: Array.isArray(parsed.subjects) ? parsed.subjects : base.subjects,
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : base.sessions,
      logs: Array.isArray(parsed.logs) ? parsed.logs : [],
      quiz_results: Array.isArray(parsed.quiz_results) ? parsed.quiz_results : [],
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      missed: Array.isArray(parsed.missed) ? parsed.missed : [],
      recentQ: Array.isArray(parsed.recentQ) ? parsed.recentQ : [],
      settings: Object.assign({}, base.settings, parsed.settings || {})
    };
  }

  function load() {
    let raw = null;
    try {
      raw = window.localStorage.getItem(STORE_KEY);
    } catch (e) {
      memoryOnly = true;
    }
    if (!raw) return defaultDB();
    try {
      return normalise(JSON.parse(raw));
    } catch (e) {
      return defaultDB();
    }
  }

  let db = load();

  /* Local write — always the source of truth for the UI. */
  function persistLocal() {
    if (memoryOnly) return;
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(db));
    } catch (e) {
      memoryOnly = true;
    }
  }

  /* =========================================================
     Optional cloud sync — Supabase REST, no SDK
     Configured in js/config.js. When the keys are empty the
     app runs local-only and this code path never fires.
     ========================================================= */

  const CFG = window.STUDY_CONFIG || {};
  const CLOUD_URL = String(CFG.supabaseUrl || '').replace(/\/+$/, '');
  const CLOUD_KEY = CFG.supabaseAnonKey || '';
  const cloudEnabled = CFG.syncEnabled !== false && !!CLOUD_URL && !!CLOUD_KEY;

  let SESSION_KEY = profileKey(SESSION_BASE);
  let session = null;
  try {
    session = JSON.parse(window.localStorage.getItem(SESSION_KEY) || 'null');
  } catch (e) {
    session = null;
  }

  let pushTimer = null;

  function setStatus(text, kind) {
    const chip = document.getElementById('syncChip');
    if (!chip) return;
    chip.textContent = text;
    chip.className = 'sync-chip' + (kind ? ' is-' + kind : '');
  }

  function persistSession() {
    try {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (e) { /* storage blocked — sync just won't persist */ }
  }

  function buildSession(r) {
    return {
      access_token: r.access_token,
      refresh_token: r.refresh_token,
      user_id: (r.user && r.user.id) || r.user_id,
      email: (r.user && r.user.email) || '',
      expires_at: r.expires_at || Math.floor(Date.now() / 1000) + (r.expires_in || 3600)
    };
  }

  async function api(path, opts) {
    const o = opts || {};
    const headers = Object.assign({ apikey: CLOUD_KEY }, o.headers || {});
    if (o.body) headers['Content-Type'] = 'application/json';
    if (session && session.access_token) headers.Authorization = 'Bearer ' + session.access_token;

    const res = await fetch(CLOUD_URL + path, { method: o.method || 'GET', headers: headers, body: o.body });

    if (!res.ok) {
      let msg = 'HTTP ' + res.status;
      try {
        const j = await res.json();
        msg = j.msg || j.message || j.error_description || j.error || msg;
      } catch (e) { /* non-JSON error body */ }
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    if (res.status === 204) return null;
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }

  const Cloud = {
    /* Anonymous sign-in: one hidden account per browser, no password. */
    auth: async function () {
      if (session && session.access_token && session.expires_at > Date.now() / 1000 + 60) return;

      if (session && session.refresh_token) {
        try {
          const r = await api('/auth/v1/token?grant_type=refresh_token', {
            method: 'POST',
            body: JSON.stringify({ refresh_token: session.refresh_token })
          });
          session = buildSession(r);
          persistSession();
          return;
        } catch (e) {
          session = null; // expired for good — sign in again below
        }
      }

      const r = await api('/auth/v1/signup', {
        method: 'POST',
        body: JSON.stringify({ data: {} })
      });
      session = buildSession(r);
      persistSession();
    },

    pull: async function () {
      const rows = await api('/rest/v1/study_data?user_id=eq.' + session.user_id + '&select=data,updated_at');
      return Array.isArray(rows) && rows.length ? rows[0] : null;
    },

    push: async function () {
      await api('/rest/v1/study_data', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({
          user_id: session.user_id,
          data: db,
          updated_at: new Date().toISOString()
        })
      });
    }
  };

  /* =========================================================
     Email sign-in — optional on purpose. Anonymous sync stays
     the default so the app works with no account at all, and
     nothing is ever visible to another student.
     ========================================================= */

  const AUTH_HINTS = {
    'Invalid login credentials': 'That email and password do not match an account yet.',
    'User already registered': 'That email already has an account — use Sign in instead.',
    'Password should be at least 6 characters': 'Password must be at least 6 characters.',
    'Unable to validate email address': 'That email address does not look valid.',
    'Email not confirmed': 'Confirm the link we emailed you, then sign in.',
    'email rate limit exceeded': 'Supabase is limiting how many emails can go out right now — wait a minute and try again.',
    'Signup requires a valid password': 'Password must be at least 6 characters.'
  };

  function authError(e) {
    const raw = (e && e.message) || 'unknown error';
    return AUTH_HINTS[raw] || raw;
  }

  /* Where the confirmation email should send the student back to:
     this exact page, on whatever origin it is running (localhost
     now, the live site later). GoTrue falls back to the project's
     Site URL if this isn't on the allow list. */
  function authRedirectUrl() {
    try {
      if (location.protocol === 'http:' || location.protocol === 'https:') {
        return location.origin + location.pathname;
      }
    } catch (e) { /* no usable origin (file://) */ }
    return undefined;
  }

  /* Read auth results out of the URL. The confirmation link lands
     as #access_token=…&refresh_token=… (implicit flow) or ?code=…
     (PKCE), or with #error=… when the link expired. Returns null
     when there is nothing auth-shaped in the address bar. */
  function consumeAuthRedirect() {
    let params;
    try {
      params = new URLSearchParams(
        (location.hash || '').replace(/^#/, '') + '&' + (location.search || '').replace(/^\?/, '')
      );
    } catch (e) { return null; }

    const access = params.get('access_token');
    const refresh = params.get('refresh_token');
    const err = params.get('error_description') || params.get('error');
    const code = params.get('code');
    if (!access && !err && !code) return null;

    /* strip the one-shot tokens from the address bar */
    try { history.replaceState(null, '', location.pathname); } catch (e) { /* ignore */ }

    if (access && refresh) {
      session = {
        access_token: access,
        refresh_token: refresh,
        user_id: '',
        email: '',
        expires_at: Math.floor(Date.now() / 1000) + (parseInt(params.get('expires_in') || '3600', 10) || 3600)
      };
      return { ok: true };
    }
    if (err) {
      const errCode = (params.get('error_code') || '').toLowerCase();
      const expired = errCode.indexOf('expired') !== -1 || /expired/i.test(err);
      return {
        ok: false,
        msg: expired
          ? 'That confirmation link has expired. Sign in with your email and password and we’ll send you a fresh one.'
          : 'We couldn’t confirm that link. Try signing in with your email and password.'
      };
    }
    /* PKCE ?code= — the account is confirmed by now, but without a
       code_verifier stored at signup we can't claim a session from it. */
    return { ok: false, msg: 'Email confirmed ✅ — sign in with your email and password to finish.' };
  }

  /* Fill in who the confirmed session belongs to, then celebrate. */
  async function finishEmailConfirm() {
    try {
      const u = await api('/auth/v1/user');
      session.user_id = u.id;
      session.email = u.email || '';
    } catch (e) { /* Cloud.auth() retries this via /user later */ }
    persistSession();
    paintAuth();

    const el = document.getElementById('authMsg');
    el.textContent = 'Email confirmed ✅ — signed in as ' + (session.email || 'your account') +
      '. Your progress now syncs across devices.';
    el.className = 'hint auth-ok';
    el.hidden = false;
    document.getElementById('authEmail').value = session.email || '';
    const dlg = document.getElementById('authDialog');
    Auth.mode = 'signin';
    Auth.paintMode();
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');

    queuePush();
  }

  function paintAuth() {
    const b = document.getElementById('authBtn');
    if (!b) return;
    const email = (session && session.email) || '';
    b.textContent = email ? (email.length > 20 ? email.slice(0, 19) + '…' : email) : 'Sign in';
    b.title = email
      ? 'Signed in as ' + email + ' — click to switch account or sign out'
      : 'Sign in to sync your progress across devices';
  }

  const Auth = {
    mode: 'signin',

    open: function () {
      const dlg = document.getElementById('authDialog');
      if (!dlg) return;
      Auth.mode = 'signin';
      document.getElementById('authMsg').hidden = true;
      Auth.showResend(false);
      document.getElementById('authEmail').value = (session && session.email) || '';
      document.getElementById('authPass').value = '';
      Auth.paintMode();
      if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
      document.getElementById('authEmail').focus();
    },

    close: function () {
      const dlg = document.getElementById('authDialog');
      if (!dlg) return;
      if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
    },

    paintMode: function () {
      const signup = Auth.mode === 'signup';
      document.getElementById('authTitle').textContent = signup ? 'Create your account' : 'Sign in';
      document.getElementById('authGo').textContent = signup ? 'Create account' : 'Sign in';
      document.getElementById('authSwitch').textContent = signup ? 'I already have an account' : 'Create an account';
      document.getElementById('authPass').autocomplete = signup ? 'new-password' : 'current-password';
      document.getElementById('authOutRow').hidden = !(session && session.email);
    },

    fail: function (msg) {
      const el = document.getElementById('authMsg');
      el.textContent = msg;
      el.className = 'hint auth-err';
      el.hidden = false;
    },

    /* GoTrue won't issue a session until the confirmation link is
       clicked, so give people a one-tap way to get that email again. */
    showResend: function (on) {
      const row = document.getElementById('authResendRow');
      if (row) row.hidden = !on;
    },

    resend: async function () {
      const email = document.getElementById('authEmail').value.trim();
      const row = document.getElementById('authResendRow');
      const btn = document.getElementById('authResend');
      if (!email) { Auth.fail('Enter your email above first, then tap Resend.'); return; }
      btn.disabled = true;
      setStatus('sending…', 'busy');
      try {
        const body = { type: 'signup', email: email };
        /* Same rule as signup: the return URL rides in the query string. */
        const back = authRedirectUrl();
        const url = '/auth/v1/resend' + (back ? '?redirect_to=' + encodeURIComponent(back) : '');
        await api(url, { method: 'POST', body: JSON.stringify(body) });
        Auth.showResend(false);
        const el = document.getElementById('authMsg');
        el.textContent = 'Confirmation email sent again — open the link and you’ll land back here, signed in.';
        el.className = 'hint auth-ok';
        el.hidden = false;
        setStatus('saved locally', 'ok');
      } catch (e) {
        const raw = (e && e.message) || '';
        if (raw.indexOf('rate limit') !== -1) {
          Auth.fail('Give it a minute — Supabase limits how many emails can go out per hour, then try Resend again.');
        } else {
          Auth.fail(authError(e));
        }
        setStatus('local only', 'warn');
      } finally {
        btn.disabled = false;
      }
    },

    submit: async function (email, password) {
      const btn = document.getElementById('authGo');
      btn.disabled = true;
      setStatus('connecting…', 'busy');
      try {
        const body = { email: email, password: password };
        /* GoTrue reads the return URL from ?redirect_to=… on the request
           itself — a body field is ignored, and it silently falls back
           to the project Site URL (so the email would skip this app). */
        const back = Auth.mode === 'signup' ? authRedirectUrl() : null;
        const url = Auth.mode === 'signup'
          ? '/auth/v1/signup' + (back ? '?redirect_to=' + encodeURIComponent(back) : '')
          : '/auth/v1/token?grant_type=password';
        const r = await api(url, { method: 'POST', body: JSON.stringify(body) });

        /* No token means the project still wants email confirmation. */
        if (!r || !r.access_token) {
          Auth.mode = 'signin';
          Auth.paintMode();
          Auth.fail('Account created. We emailed you a confirmation link — open it and you’ll land back here, already signed in.');
          Auth.showResend(true);
          setStatus('saved locally', 'ok');
          return;
        }

        session = buildSession(r);
        persistSession();
        Auth.close();
        paintAuth();
        queuePush();
      } catch (e) {
        const raw = (e && e.message) || '';
        Auth.fail(authError(e));
        Auth.showResend(raw === 'Email not confirmed');
        setStatus('local only', 'warn');
      } finally {
        btn.disabled = false;
      }
    },

    signOut: async function () {
      try { await api('/auth/v1/logout', { method: 'POST' }); } catch (e) { /* already gone */ }
      session = null;
      persistSession();
      Auth.close();
      paintAuth();
      setStatus('saved locally', 'ok');
    }
  };

  /* Local write now, cloud push debounced. */
  function save() {
    db.settings.updatedAt = Date.now();
    persistLocal();
    queuePush();
  }

  function queuePush() {
    if (!cloudEnabled) return;
    if (pushTimer) window.clearTimeout(pushTimer);
    setStatus('saving…', 'busy');
    pushTimer = window.setTimeout(async function () {
      pushTimer = null;
      try {
        await Cloud.auth();
        await Cloud.push();
        setStatus('synced', 'ok');
      } catch (e) {
        setStatus('local only', 'warn');
        const chip = document.getElementById('syncChip');
        if (chip) chip.title = 'Sync failed: ' + (e.message || 'unknown error');
      }
    }, 1200);
  }

  /* On start: pull the cloud copy, adopt it if it is newer than
     what this device has (last-writer-wins on updated_at). */
  async function cloudStart() {
    setStatus('connecting…', 'busy');
    try {
      await Cloud.auth();
      const remote = await Cloud.pull();
      const ra = remote && remote.data && remote.data.settings ? (remote.data.settings.updatedAt || 0) : 0;
      const la = db.settings.updatedAt || 0;

      if (remote && remote.data && ra > la) {
        db = normalise(remote.data);
        persistLocal();
        renderAll();
      } else if (!remote) {
        await Cloud.push();
      }
      setStatus('synced', 'ok');
    } catch (e) {
      setStatus('local only', 'warn');
      const chip = document.getElementById('syncChip');
      if (chip) chip.title = 'Sync unavailable: ' + (e.message || 'unknown error');
    }
  }

  /* Import a JSON backup (the other half of "no back-end"). */
  function importJSON(file, done) {
    const reader = new FileReader();
    reader.onload = function () {
      try {
        const incoming = JSON.parse(reader.result);
        if (!incoming || !Array.isArray(incoming.subjects)) {
          throw new Error('that is not a study-data file');
        }
        if (!window.confirm('Replace your current data with this file?')) return;
        db = normalise(incoming);
        save();
        renderAll();
        setStatus('imported', 'ok');
        if (done) done(null);
      } catch (err) {
        if (done) done(err);
      }
    };
    reader.readAsText(file);
  }

  /* ---------------- Helpers ---------------- */

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.prototype.slice.call(document.querySelectorAll(sel));

  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function isoDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function todayIndex() { return (new Date().getDay() + 6) % 7; } // 0 = Monday

  function mondayOf(offsetWeeks) {
    const now = new Date();
    const idx = todayIndex();
    now.setDate(now.getDate() - idx + (offsetWeeks || 0) * 7);
    now.setHours(0, 0, 0, 0);
    return now;
  }

  function minutesInWeek(offset, subjectName) {
    const start = mondayOf(offset);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    return db.logs.reduce((sum, log) => {
      if (subjectName && log.subject !== subjectName) return sum;
      const t = new Date(log.date + 'T00:00:00');
      if (t >= start && t < end) return sum + log.minutes;
      return sum;
    }, 0);
  }

  function minutesOn(dateISO) {
    return db.logs.reduce((s, l) => (l.date === dateISO ? s + l.minutes : s), 0);
  }

  function streakDays() {
    let streak = 0;
    const d = new Date();
    if (minutesOn(isoDate(d)) === 0) d.setDate(d.getDate() - 1); // today not started yet
    while (minutesOn(isoDate(d)) > 0) {
      streak++;
      d.setDate(d.getDate() - 1);
    }
    return streak;
  }

  function quizStats() {
    const correct = db.quiz_results.reduce((s, r) => s + r.correct, 0);
    const total = db.quiz_results.reduce((s, r) => s + r.total, 0);
    return { correct, total, pct: total ? Math.round((correct / total) * 100) : null };
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function fmtTime(time, minutes) {
    const parts = time.split(':');
    const start = new Date();
    start.setHours(+parts[0], +parts[1], 0, 0);
    const end = new Date(start.getTime() + minutes * 60000);
    const f = (d) => d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
    return f(start) + ' – ' + f(end);
  }

  /* ---------------- Profiles (who is studying) ---------------- */

  function paintProfiles() {
    const sel = document.getElementById('whoPick');
    if (!sel) return;
    sel.innerHTML = Profiles.list.map(function (p) {
      return '<option value="' + esc(p.id) + '"' +
        (p.id === Profiles.active ? ' selected' : '') + '>' + esc(p.name) + '</option>';
    }).join('') + '<option value="__new__">+ New student</option>';
  }

  function switchProfile(id) {
    if (!id || id === Profiles.active) return;

    persistLocal();                       /* flush the current student first */
    Profiles.active = id;
    persistProfiles();

    STORE_KEY = profileKey(STORE_BASE);
    SESSION_KEY = profileKey(SESSION_BASE);
    db = load();
    try {
      session = JSON.parse(window.localStorage.getItem(SESSION_KEY) || 'null');
    } catch (e) { session = null; }

    applyTheme();
    renderAll();
    paintProfiles();
    paintAuth();

    if (cloudEnabled) {
      setStatus('connecting…', 'busy');
      cloudStart();
    } else {
      setStatus('saved locally', 'ok');
    }
  }

  function addProfile(name) {
    const p = { id: uid('p'), name: name };
    Profiles.list.push(p);
    persistProfiles();
    switchProfile(p.id);
  }

  /* =========================================================
     Learn — revision notes, formula sheets, worked solutions
       window.NOTES     = [ { subject, type, topic, title, body } ]
       window.SOLUTIONS = { subject: { questionText: { t, e } } ]
     ========================================================= */

  const Learn = { subject: '', mode: 'index', topic: '' };

  function learnSubjects() {
    const found = [];
    const add = (s) => { if (s && found.indexOf(s) === -1) found.push(s); };
    (window.NOTES || []).forEach((n) => add(n.subject));
    Object.keys(window.SOLUTIONS || {}).forEach(add);
    return PRESETS.filter((p) => found.indexOf(p) !== -1)
      .concat(found.filter((p) => PRESETS.indexOf(p) === -1));
  }

  function notesFor(subject, type) {
    return (window.NOTES || []).filter((n) => n.subject === subject && n.type === type);
  }

  /* Plain text -> safe HTML. Blank line = paragraph break, single \n = line
     break inside the paragraph, "- " at line start = bullet list. A bullet
     block may sit directly under an intro line with no blank line.
     A paragraph that opens with one of these labels becomes a styled
     lesson box (used by the Learn notes):
       Example:   worked problem, shown step by step
       Watch out: the slip JAMB is hoping you'll make
       In short:  the takeaway, in one breath */
  const CALLOUTS = { 'Example:': 'eg', 'Watch out:': 'warn', 'In short:': 'recap' };

  function textBlocks(body) {
    const out = [];
    let mode = '', buf = [];
    const close = () => {
      if (mode === 'p') {
        const first = buf[0] || '';
        let hit = '';
        Object.keys(CALLOUTS).forEach((k) => { if (first.indexOf(k) === 0) hit = k; });
        if (hit) {
          out.push('<p class="nb nb-' + CALLOUTS[hit] + '"><b>' + esc(hit) + '</b>' +
            first.slice(hit.length) + (buf.length > 1 ? '<br>' + buf.slice(1).join('<br>') : '') + '</p>');
        } else {
          out.push('<p>' + buf.join('<br>') + '</p>');
        }
      }
      else if (mode === 'ul') out.push('<ul>' + buf.map((li) => '<li>' + li + '</li>').join('') + '</ul>');
      buf = []; mode = '';
    };
    String(body || '').split('\n').forEach((raw) => {
      const line = raw.replace(/\s+$/, '');
      if (!line.trim()) { close(); return; }
      if (/^\s*-\s+/.test(line)) {
        if (mode !== 'ul') close();
        mode = 'ul';
        buf.push(esc(line.replace(/^\s*-\s+/, '')));
        return;
      }
      if (mode !== 'p') close();
      mode = 'p';
      buf.push(esc(line));
    });
    close();
    return out.join('');
  }

  function learnNotesHTML() {
    const notes = notesFor(Learn.subject, 'note');
    if (!notes.length) {
      return '<p class="hint">No notes for this subject yet — try the formula sheets or solutions.</p>';
    }
    return notes.map((n) =>
      '<article class="note">' +
        '<button class="note-head" type="button" aria-expanded="false">' +
          '<span class="note-topic">' + esc(n.topic) + '</span>' +
          '<span class="note-title">' + esc(n.title) + '</span>' +
          '<span class="note-caret" aria-hidden="true">&#8250;</span>' +
        '</button>' +
        '<div class="note-body">' + textBlocks(n.body) +
          '<div class="note-actions">' +
            '<button class="btn btn-ghost" type="button" data-try="' + encodeURIComponent(n.topic) + '">' +
              'Try ' + esc(n.topic) + ' questions</button>' +
          '</div>' +
        '</div>' +
      '</article>').join('');
  }

  function learnSheetsHTML() {
    const sheets = notesFor(Learn.subject, 'sheet');
    if (!sheets.length) return '<p class="hint">No formula sheet for this subject yet.</p>';
    return sheets.map((n) =>
      '<article class="note is-open">' +
        '<div class="note-head note-fixed">' +
          '<span class="note-topic">' + esc(n.topic) + '</span>' +
          '<span class="note-title">' + esc(n.title) + '</span>' +
        '</div>' +
        '<div class="note-body">' + textBlocks(n.body) + '</div>' +
      '</article>').join('');
  }

  function learnSolutionsHTML() {
    const sols = (window.SOLUTIONS || {})[Learn.subject] || {};
    const texts = Object.keys(sols);
    if (!texts.length) return '<p class="hint">No solutions for this subject yet.</p>';

    const groups = {}, order = [];
    texts.forEach((t) => {
      const topic = (sols[t] && sols[t].t) || 'General';
      if (!groups[topic]) { groups[topic] = []; order.push(topic); }
      groups[topic].push(t);
    });

    const bank = {};
    BANK.concat(db.questions).forEach((x) => { if (x.s === Learn.subject) bank[x.q] = x; });

    return order.map((topic) => {
      const items = groups[topic];
      return '<section class="sol-group">' +
        '<div class="sol-head">' +
          '<h3>' + esc(topic) + '</h3>' +
          '<span class="sol-count">' + items.length + ' question' + (items.length === 1 ? '' : 's') + '</span>' +
        '</div>' +
        items.map((text) => solItemHTML(text, sols[text], bank[text])).join('') +
        '<div class="note-actions">' +
          '<button class="btn btn-ghost" type="button" data-try="' + encodeURIComponent(topic) + '">' +
            'Quiz me on ' + esc(topic) + '</button>' +
        '</div>' +
      '</section>';
    }).join('');
  }

  /* ============================================================
     Learn: the lesson page.
     A topic index -> a lesson: the taught note, real questions from
     the bank with the working already revealed, then a quiz on it.
     Hash route: #learn/{subject}/{topic}
     ============================================================ */

  /* Which notes sit under this topic, in file order. */
  function notesUnderTopic(subject, topic) {
    return (window.NOTES || []).filter(
      (n) => n.subject === subject && n.type === 'note' && n.topic === topic
    );
  }

  function topicList(subject) {
    const seen = [], out = [];
    notesFor(subject, 'note').forEach((n) => {
      if (seen.indexOf(n.topic) !== -1) return;
      seen.push(n.topic);
      out.push({
        topic: n.topic,
        title: n.title,
        count: notesUnderTopic(subject, n.topic).length
      });
    });
    return out;
  }

  /* The questions on this topic, taken from the bank, with the answer
     and the working from window.SOLUTIONS so each one is already solved
     on the page. Teaching happens on the read, not on a guess. */
  function workedQuestions(subject, topic, limit) {
    const sols = (window.SOLUTIONS || {})[subject] || {};
    const bank = {};
    BANK.concat(db.questions).forEach((x) => {
      if (x.s === subject) bank[x.q] = x;
    });

    const rows = Object.keys(sols).filter((text) => (sols[text] || {}).t === topic);
    return rows.slice(0, limit).map((text) => ({
      text: text,
      opts: (bank[text] || {}).o || [],
      right: (bank[text] || {}).a,
      why: (sols[text] || {}).e || ''
    })).filter((r) => r.opts.length);
  }

  function learnLessonHTML(subject, topic) {
    const notes = notesUnderTopic(subject, topic);
    if (!notes.length) return '<p class="hint">No lesson for this topic yet.</p>';

    const lesson = notes[0];
    const worked = workedQuestions(subject, topic, 3);
    const total = Object.keys((window.SOLUTIONS || {})[subject] || {})
      .filter((t) => ((window.SOLUTIONS[subject][t] || {}).t) === topic).length;

    /* Prev / next across this subject's topics, so you read like a book. */
    const topics = topicList(subject);
    const idx = topics.findIndex((t) => t.topic === topic);
    const prev = idx > 0 ? topics[idx - 1] : null;
    const next = idx >= 0 && idx < topics.length - 1 ? topics[idx + 1] : null;

    const body = notes.map((n) => textBlocks(n.body)).join('');

    const workedHTML = worked.length
      ? '<section class="lesson-worked">' +
        '<h3 class="lesson-h">Worked questions from this topic</h3>' +
        worked.map((r) => solItemHTML(r.text, { e: r.why }, { o: r.opts, a: r.right })).join('') +
        '<p class="hint">' + esc(
          (total - worked.length) > 0
            ? 'Plus ' + (total - worked.length) + ' more in the Solutions browser.'
            : 'That is every question on this topic.'
        ) + '</p>' +
        '</section>'
      : (total
        ? '<p class="hint">This topic has ' + total + ' questions — open Solutions to see the working on all of them.</p>'
        : '');

    return '<article class="lesson">' +
      '<nav class="lesson-crumbs">' +
        '<button class="linklike" type="button" data-learn-back="1">' +
          '\u2190 All ' + esc(subject) + ' topics</button>' +
      '</nav>' +

      '<header class="lesson-head">' +
        '<p class="lesson-eyebrow">' + esc(subject) + '</p>' +
        '<h2 class="lesson-title">' + esc(lesson.title || topic) + '</h2>' +
        (notes.length > 1
          ? '<p class="hint">' + notes.length + ' notes on this topic</p>'
          : '') +
      '</header>' +

      '<div class="note-body lesson-body">' + body + '</div>' +

      workedHTML +

      '<div class="lesson-cta">' +
        '<button class="btn btn-primary" type="button" data-try="' +
          encodeURIComponent(topic) + '">Test me on ' + esc(topic) + ' (' + total + ')</button>' +
        '<div class="lesson-nav">' +
          (prev
            ? '<button class="btn btn-ghost btn-sm" type="button" data-learn-go="' +
              encodeURIComponent(prev.topic) + '">\u2190 ' + esc(prev.title) + '</button>'
            : '') +
          (next
            ? '<button class="btn btn-ghost btn-sm" type="button" data-learn-go="' +
              encodeURIComponent(next.topic) + '">' + esc(next.title) + ' \u2192</button>'
            : '') +
        '</div>' +
      '</div>' +
    '</article>';
  }

  /* The topic index: a contents page, so you choose what to learn. */
  function learnIndexHTML(subject) {
    const topics = topicList(subject);
    if (!topics.length) return '<p class="hint">No notes for this subject yet.</p>';

    const sols = (window.SOLUTIONS || {})[subject] || {};
    const qTotal = {};
    Object.keys(sols).forEach((t) => {
      const topic = (sols[t] || {}).t || 'General';
      qTotal[topic] = (qTotal[topic] || 0) + 1;
    });

    return '<nav class="lesson-crumbs">' +
        '<span class="lesson-eyebrow">' + esc(subject) + '</span>' +
      '</nav>' +
      '<h2 class="lesson-title">Pick a topic to learn</h2>' +
      '<p class="panel-sub">Each one opens a full lesson: the idea, the steps, a worked example, the slip to avoid — then questions with the working shown.</p>' +
      '<ol class="toc">' +
        topics.map((t) =>
          '<li class="toc-row">' +
            '<button class="toc-btn" type="button" data-learn-go="' + encodeURIComponent(t.topic) + '">' +
              '<span class="toc-title">' + esc(t.title) + '</span>' +
              '<span class="toc-meta">' +
                '<span class="toc-topic">' + esc(t.topic) + '</span>' +
                (qTotal[t.topic] ? '<span class="toc-n">' + qTotal[t.topic] + ' questions</span>' : '') +
              '</span>' +
            '</button>' +
          '</li>').join('') +
      '</ol>';
  }

  function solItemHTML(text, sol, item) {
    const opts = item ? item.o : [];
    const right = item ? item.a : -1;
    return '<div class="sol-item">' +
      '<p class="sol-q">' + esc(text) + '</p>' +
      opts.map((o, i) =>
        '<div class="sol-opt' + (i === right ? ' is-right' : '') + '">' +
          '<b>' + KEYS[i] + '.</b><span>' + esc(o) + '</span></div>'
      ).join('') +
      (sol && sol.e
        ? '<p class="sol-why">' + esc(sol.e) + '</p>'
        : '<p class="sol-note">Explanation not written for this one yet.</p>') +
    '</div>';
  }

  function renderLearn() {
    const subs = learnSubjects();
    if (subs.indexOf(Learn.subject) === -1) Learn.subject = subs[0] || '';

    // Keep the address bar on the lesson you are reading, so Back and a
    // pasted link both land you in the same place.
    if (Learn.mode === 'lesson' && Learn.subject && Learn.topic) {
      const want = '#learn/' + encodeURIComponent(Learn.subject) + '/' + encodeURIComponent(Learn.topic);
      if (window.location.hash !== want && history.replaceState) {
        history.replaceState(null, '', want);
      }
    } else if (window.location.hash.indexOf('#learn/') === 0 && history.replaceState) {
      history.replaceState(null, '', '#learn');
    }

    const seg = document.getElementById('learnSubject');
    if (seg) {
      seg.innerHTML = subs.map((s) =>
        '<button type="button" class="seg-btn' + (s === Learn.subject ? ' is-active' : '') +
          '" data-subject="' + encodeURIComponent(s) + '">' + esc(s) + '</button>'
      ).join('');
    }
    $$('#learnMode .seg-btn').forEach((b) => {
      /* A lesson is a topic opened, so it belongs to the Topics chip. */
      const own = b.dataset.mode === Learn.mode;
      const underTopics = Learn.mode === 'lesson' && b.dataset.mode === 'index';
      b.classList.toggle('is-active', own || underTopics);
    });

    const body = document.getElementById('learnBody');
    const empty = document.getElementById('learnEmpty');
    if (!body) return;

    if (!Learn.subject) {
      body.innerHTML = '';
      if (empty) { empty.hidden = false; empty.textContent = 'No notes in this build yet.'; }
      return;
    }
    if (empty) empty.hidden = true;

    body.innerHTML = Learn.mode === 'sheets' ? learnSheetsHTML()
      : Learn.mode === 'solutions' ? learnSolutionsHTML()
        : Learn.mode === 'lesson' && Learn.topic ? learnLessonHTML(Learn.subject, Learn.topic)
          : learnIndexHTML(Learn.subject);
  }

  function startTopicQuiz(topic) {
    showTab('practice');
    startQuiz({ mode: 'practice', subject: Learn.subject, topic: topic, count: 'all' });
  }

  /* ---------------- Tabs ---------------- */

  function showTab(name) {
    $$('.tab').forEach((t) => {
      const on = t.dataset.tab === name;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
    });
    $$('.panel').forEach((p) => {
      const on = p.id === name;
      p.classList.toggle('is-active', on);
      if (on) p.removeAttribute('hidden'); else p.setAttribute('hidden', '');
    });
    if (history.replaceState) history.replaceState(null, '', '#' + name);
    stopRetakeTick();
    if (name === 'learn') renderLearn();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------------- Next UTME cycle ----------------
     JAMB's dates shift a little every year and are announced each
     January, so the card below works from the projected pattern:
     registration late Jan (~6 weeks to mid Mar), mock late Mar /
     early Apr, slips from mid Apr, main exam from the last week of
     Apr into mid May, results within 24-48h. Everything is derived
     from today's date, so once one cycle finishes the card rolls
     itself onto the next year — no update needed. */

  function cycleFor(year) {
    const d = (m, day) => new Date(year, m, day);
    return {
      year: year,
      marks: [
        { key: 'reg', label: 'Registration opens', date: d(0, 26), note: 'late Jan' },
        { key: 'regClose', label: 'Registration closes', date: d(2, 13), note: 'about 6 weeks after opening' },
        { key: 'mock', label: 'Mock-UTME', date: d(2, 30), note: 'late Mar / early Apr' },
        { key: 'slip', label: 'Slip printing opens', date: d(3, 14), note: 'mid Apr' },
        { key: 'examStart', label: 'UTME exam starts', date: d(3, 26), note: 'last week of Apr' },
        { key: 'examEnd', label: 'UTME exam ends', date: d(4, 10), note: 'mid May' },
        { key: 'results', label: 'Results released', date: d(4, 12), note: 'within 24-48h of each paper' }
      ]
    };
  }

  function activeCycle() {
    const today = startOfDay(new Date());
    let cycle = cycleFor(today.getFullYear());
    /* June onward the current year's cycle is history — roll to the next. */
    if (today > cycle.marks[cycle.marks.length - 1].date) cycle = cycleFor(cycle.year + 1);
    return { today: today, cycle: cycle };
  }

  function startOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function daysFrom(a, b) { return Math.round((b - a) / 86400000); }

  function renderCycle() {
    const ac = activeCycle();
    const today = ac.today;
    const cycle = ac.cycle;
    const marks = cycle.marks;
    const nextIdx = marks.findIndex((m) => m.date >= today);

    /* Phases that span days rather than a single date. */
    const spans = [
      { label: 'Registration is open', from: marks[0].date, to: marks[1].date },
      { label: 'UTME exam is running', from: marks[4].date, to: marks[5].date }
    ];
    const live = spans.find((s) => today >= s.from && today <= s.to);

    let headline;
    if (live) {
      const left = daysFrom(today, live.to);
      headline = live.label + ' — <span class="grad">' +
        (left === 0 ? 'closes today' : left + ' day' + (left === 1 ? '' : 's') + ' left') + '</span>';
    } else if (nextIdx !== -1) {
      const n = marks[nextIdx];
      const inDays = daysFrom(today, n.date);
      headline = esc(n.label) + ' in <span class="grad">' +
        (inDays === 0 ? 'today' : inDays + ' day' + (inDays === 1 ? '' : 's')) + '</span>';
    } else {
      headline = 'This cycle is done — <span class="grad">next one loads automatically</span>';
    }

    $('#cycleYear').textContent = cycle.year + ' cycle';
    $('#cycleCount').innerHTML = headline;

    const examStart = marks[4].date;
    const examDays = daysFrom(today, examStart);
    $('#cycleNext').textContent = 'Exam day: ' +
      examStart.toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) +
      (examDays < 0 && today <= marks[5].date ? ' — happening now' : '');

    $('#cycleTimeline').innerHTML = marks.map((m) => {
      const diff = daysFrom(today, m.date);
      const state = diff < 0 ? 'done' : (diff === 0 ? 'now' : (m === (nextIdx === -1 ? null : marks[nextIdx]) ? 'is-next' : ''));
      const when = diff < 0 ? 'done'
        : diff === 0 ? 'today'
          : diff + ' day' + (diff === 1 ? '' : 's');
      return '<li class="' + state + '">' +
        '<span class="tl-body">' +
        '<span class="tl-label">' + esc(m.label) + '</span>' +
        '<span class="tl-note">' + esc(m.note) + '</span>' +
        '</span>' +
        '<span class="tl-when">' + when + '</span>' +
        '<span class="tl-date">' + m.date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' }) + '</span>' +
        '</li>';
    }).join('');
  }

  /* ---------------- Dashboard ---------------- */

  function renderStats() {
    const today = isoDate(new Date());
    const goal = db.settings.dailyGoal || 120;
    const done = minutesOn(today);
    const streak = streakDays();
    const acc = quizStats();

    let daysLeft = null;
    if (db.settings.examDate) {
      const exam = new Date(db.settings.examDate + 'T00:00:00');
      daysLeft = Math.ceil((exam - new Date().setHours(0, 0, 0, 0)) / 86400000);
    }

    const goalPct = Math.min(100, Math.round((done / goal) * 100));

    $('#stats').innerHTML = [
      stat('Today', done + ' <span class="sub">/ ' + goal + ' min</span>',
        goalPct >= 100 ? 'good' : (goalPct >= 50 ? 'warn' : '')),
      stat('Daily streak', streak + ' <span class="sub">' + (streak === 1 ? 'day' : 'days') + '</span>',
        streak > 0 ? 'good' : ''),
      stat('This week', minutesInWeek(0) + ' <span class="sub">min</span>', ''),
      stat('Quiz accuracy', acc.pct === null ? '—' : acc.pct + '%',
        acc.pct === null ? '' : (acc.pct >= 70 ? 'good' : (acc.pct >= 50 ? 'warn' : ''))),
      daysLeft === null
        ? stat('Exam date', '<span class="sub">not set</span>', '')
        : (daysLeft < 0
            ? stat('Exam date', 'passed', '')
            : stat('Days to exam', daysLeft + ' <span class="sub">days left</span>', daysLeft <= 30 ? 'warn' : ''))
    ].join('');
  }

  function stat(label, value, cls) {
    return '<div class="stat"><dl><dt>' + esc(label) + '</dt><dd class="' + (cls || '') + '">' + value + '</dd></dl></div>';
  }

  function renderToday() {
    const idx = todayIndex();
    const today = isoDate(new Date());
    const list = db.sessions
      .filter((s) => s.day === idx)
      .sort((a, b) => a.time.localeCompare(b.time));

    $('#todayCount').textContent = list.length + (list.length === 1 ? ' session' : ' sessions');
    $('#todayEmpty').hidden = list.length > 0;

    $('#todayPlan').innerHTML = list.map((s) => {
      const real = studiedToday(s.id);
      const done = isDoneToday(s.id);
      const canTick = real > 0;
      return '<li class="plan-item' + (done ? ' done' : '') + '">' +
        '<button class="plan-check" data-toggle="' + s.id + '" aria-pressed="' + done + '"' +
          (canTick ? '' : ' disabled title="No focus time yet — run the focus timer first, so the minutes are real"') +
          ' aria-label="Mark ' + esc(s.subject) + ' as done">✓</button>' +
        '<span class="plan-body">' +
          '<span class="plan-subject">' + esc(s.subject) +
            ' <span class="plan-time' + (canTick ? ' plan-time-earned' : '') + '">· ' + real + ' / ' + s.minutes + ' min</span></span>' +
          (s.topic ? '<span class="plan-topic">' + esc(s.topic) + '</span>' : '') +
        '</span>' +
        '<span class="plan-time">' + esc(fmtTime(s.time, s.minutes).split(' – ')[0]) + '</span>' +
      '</li>';
    }).join('');
  }

  function renderChart() {
    const start = mondayOf(0);
    const values = DAYS.map((_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return minutesOn(isoDate(d));
    });

    const max = Math.max(60, ...values);
    const tIdx = todayIndex();
    const total = values.reduce((a, b) => a + b, 0);

    $('#weekTotal').textContent = total + ' min';
    $('#weekChart').innerHTML = values.map((v, i) => {
      const pct = Math.round((v / max) * 100);
      const cls = v === 0 ? 'zero' : (i === tIdx ? 'today' : '');
      return '<div class="bar-col' + (i === tIdx ? ' is-today' : '') + '">' +
        '<span class="bar-val">' + v + '</span>' +
        '<span class="bar ' + cls + '" style="height:' + (v === 0 ? 6 : Math.max(8, pct)) + '%"></span>' +
        '<span class="bar-label">' + DAYS[i] + '</span>' +
      '</div>';
    }).join('');
  }

  function renderProgress() {
    const items = db.subjects.map((s) => {
      const mins = minutesInWeek(0, s.name);
      const target = s.target || 300;
      const pct = Math.round((mins / target) * 100);
      return '<li class="pl-row">' +
        '<span class="pl-top">' +
          '<span class="pl-name">' + esc(s.name) + (s.exam ? '<span class="tag">UTME</span>' : '') + '</span>' +
          '<span class="pl-val">' + mins + ' / ' + target + ' min</span>' +
        '</span>' +
        '<span class="pl-track"><span class="pl-fill' + (pct > 100 ? ' over' : '') + '" style="width:' + Math.min(100, pct) + '%"></span></span>' +
      '</li>';
    });
    $('#progressList').innerHTML = items.length ? items.join('') : '<li class="empty">Add subjects to see progress here.</li>';
  }

  /* Subjects you keep getting wrong in quizzes. */
  function renderWeak() {
    const agg = {};
    db.quiz_results.forEach((r) => {
      if (!agg[r.subject]) agg[r.subject] = { correct: 0, total: 0, quizzes: 0 };
      agg[r.subject].correct += r.correct;
      agg[r.subject].total += r.total;
      agg[r.subject].quizzes += 1;
    });

    const rows = Object.keys(agg)
      .filter((k) => agg[k].total > 0)
      .map((k) => ({
        name: k,
        pct: Math.round((agg[k].correct / agg[k].total) * 100),
        correct: agg[k].correct,
        total: agg[k].total,
        quizzes: agg[k].quizzes
      }))
      .sort((a, b) => a.pct - b.pct)
      .slice(0, 4);

    if (!rows.length) {
      $('#weakList').innerHTML =
        '<li class="empty">No quiz data yet. Take one in <button class="linklike" data-goto="practice">Practice</button> and your weak subjects show up here.</li>';
      return;
    }

    $('#weakList').innerHTML = rows.map((r) => {
      const cls = r.pct >= 70 ? 'good' : (r.pct >= 50 ? 'mid' : 'bad');
      return '<li class="weak-item">' +
        '<span class="weak-name">' + esc(r.name) +
          '<span>' + r.correct + ' of ' + r.total + ' correct · ' + r.quizzes + (r.quizzes === 1 ? ' quiz' : ' quizzes') + '</span>' +
        '</span>' +
        '<span class="weak-score ' + cls + '">' + r.pct + '%</span>' +
      '</li>';
    }).join('');
  }

  /* Month heatmap of logged minutes. */
  function renderHeat() {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    const pad = (n) => String(n).padStart(2, '0');
    const days = new Date(y, m + 1, 0).getDate();
    const offset = (new Date(y, m, 1).getDay() + 6) % 7; // Monday-first
    const dows = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    let html = dows.map((d) => '<span class="dow">' + d + '</span>').join('');
    for (let i = 0; i < offset; i++) html += '<span class="heat-cell pad"></span>';

    const todayISO = isoDate(now);
    for (let d = 1; d <= days; d++) {
      const iso = y + '-' + pad(m + 1) + '-' + pad(d);
      const mins = minutesOn(iso);
      const lvl = mins === 0 ? 0 : (mins < 45 ? 1 : (mins < 120 ? 2 : 3));
      html += '<span class="heat-cell l' + lvl +
        (iso === todayISO ? ' today' : '') +
        '" title="' + mins + ' min on ' + d + '">' + d + '</span>';
    }

    const grid = $('#heatGrid');
    grid.innerHTML = html;
    grid.setAttribute('aria-label',
      'Minutes studied each day in ' + now.toLocaleString('en-GB', { month: 'long', year: 'numeric' }));
    $('#heatMonth').textContent = now.toLocaleString('en-GB', { month: 'long', year: 'numeric' });
  }

  /* Saved mistakes, newest first. */
  function renderReview() {
    const n = db.missed.length;
    const count = $('#reviewCount');
    count.textContent = n;
    count.classList.toggle('zero', n === 0);
    $('#reviewCard').hidden = n === 0;
    $('#reviewTotal').textContent = n + (n === 1 ? ' saved' : ' saved');
    $('#reviewStart').disabled = n === 0;
    $('#reviewClear').disabled = n === 0;

    if (!n) {
      $('#reviewList').innerHTML = '';
      return;
    }

    $('#reviewList').innerHTML = db.missed.slice(0, 20).map((m) =>
      '<li class="review-item">' +
        '<p class="review-sub">' + esc(m.s) + '</p>' +
        '<p class="review-q">' + esc(m.q) + '</p>' +
        '<p class="review-meta">Missed ' + m.hits + (m.hits === 1 ? ' time' : ' times') +
          (m.last ? ' · last on ' + esc(m.last) : '') + '</p>' +
      '</li>').join('');
  }

  /* ---------------- Timetable ---------------- */

  function renderWeekGrid() {
    const start = mondayOf(0);
    const tIdx = todayIndex();
    const today = isoDate(new Date());

    $('#weekGrid').innerHTML = DAYS.map((day, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);

      const slots = db.sessions
        .filter((s) => s.day === i)
        .sort((a, b) => a.time.localeCompare(b.time));

      const body = slots.length ? slots.map((s) => {
        const dateStr = isoDate(d);
        const real = studiedOn(s.id, dateStr);
        const done = isDoneOn(s.id, dateStr);
        const isTodayCol = (i === tIdx);
        /* Only today can be ticked off — a past day is history, not a task. */
        const canTick = isTodayCol && real > 0;
        const locked = isTodayCol
          ? 'No focus time yet — run the timer first, so the minutes are real'
          : 'Only today can be ticked off';
        return '<article class="slot' + (done ? ' done' : '') + '">' +
          '<div class="slot-top">' +
            '<span class="slot-time">' + esc(fmtTime(s.time, s.minutes)) + '</span>' +
            '<span class="slot-actions">' +
              (isTodayCol && !canTick ?
                '<button class="icon-btn play" data-slot-start="' + s.id + '" title="Start the focus timer for this session" aria-label="Start focus timer for ' + esc(s.subject) + '">▶</button>' : '') +
              '<button class="icon-btn check" data-slot-check="' + s.id + '"' +
                (canTick ? ' title="Mark as studied"' : ' disabled title="' + locked + '"') +
                ' aria-label="Mark ' + esc(s.subject) + ' as studied">✓</button>' +
              '<button class="icon-btn" data-slot-del="' + s.id + '" title="Delete session" aria-label="Delete ' + esc(s.subject) + ' session">✕</button>' +
            '</span>' +
          '</div>' +
          '<p class="slot-subject">' + esc(s.subject) + '</p>' +
          (s.topic ? '<p class="slot-topic">' + esc(s.topic) + '</p>' : '') +
          '<p class="slot-mins' + (real > 0 ? ' slot-mins-earned' : '') + '">' +
            real + ' / ' + s.minutes + ' min' + (done ? ' · studied' : '') + '</p>' +
        '</article>';
      }).join('') : '<p class="day-empty">Free</p>';

      return '<div class="day-col' + (i === tIdx ? ' is-today' : '') + '">' +
        '<div class="day-head"><span class="day-name">' + day + '</span><span class="day-date">' + d.getDate() + '/' + (d.getMonth() + 1) + '</span></div>' +
        body +
      '</div>';
    }).join('');
  }

  /* ---------------- Subjects ---------------- */

  function renderSubjects() {
    const examCount = db.subjects.filter((s) => s.exam).length;
    $('#examCount').textContent = examCount + ' / 4 UTME';
    $('#examCount').className = 'chip' + (examCount === 4 ? ' chip-good' : '');
    $('#subjectEmpty').hidden = db.subjects.length > 0;

    $('#subjectList').innerHTML = db.subjects.map((s) => {
      const mins = minutesInWeek(0, s.name);
      return '<li class="subject-item' + (s.exam ? ' exam' : '') + '">' +
        '<span class="subject-name">' + esc(s.name) + '</span>' +
        '<span class="subject-meta">' +
          '<label class="exam-toggle"><input type="checkbox" data-exam="' + esc(s.id) + '"' + (s.exam ? ' checked' : '') + ' /> UTME</label>' +
          '<label>Target <input type="number" data-target="' + esc(s.id) + '" min="30" max="3000" step="30" value="' + (s.target || 300) + '" aria-label="Weekly target minutes for ' + esc(s.name) + '" /> min/wk</label>' +
          '<span>' + mins + ' this week</span>' +
          '<button class="icon-btn" data-del-subject="' + esc(s.id) + '" aria-label="Remove ' + esc(s.name) + '">✕</button>' +
        '</span>' +
      '</li>';
    }).join('');

    $('#dailyGoal').value = db.settings.dailyGoal;
    $('#examDate').value = db.settings.examDate || '';
  }

  function fillSubjectSelects() {
    const opts = db.subjects.map((s) => '<option value="' + esc(s.name) + '">' + esc(s.name) + '</option>').join('');
    const any = db.subjects.length === 0 ? '<option value="">Add a subject first</option>' : '';

    ['#sSubject', '#timerSubject', '#cSubject'].forEach((sel) => {
      const el = $(sel);
      const keep = el.value;
      el.innerHTML = any + opts;
      if (keep && db.subjects.some((s) => s.name === keep)) el.value = keep;
    });

    /* Practice offers every subject that actually has questions. */
    const qSelect = $('#qSubject');
    const keepQ = qSelect.value;
    const seen = {};
    const names = db.subjects.map((s) => s.name)
      .concat(BANK.map((q) => q.s))
      .concat(db.questions.map((q) => q.s))
      .filter((n) => (seen[n] ? false : (seen[n] = true)));

    qSelect.innerHTML =
      '<option value="' + MIXED + '">Mixed — every subject</option>' +
      names.map((n) => '<option value="' + esc(n) + '">' + esc(n) + '</option>').join('');
    qSelect.value = keepQ && (keepQ === MIXED || names.indexOf(keepQ) !== -1)
      ? keepQ
      : (names.indexOf('Use of English') !== -1 ? 'Use of English' : MIXED);
    updateQAvail();

    $('#subjectPresets').innerHTML = PRESETS.map((p) => '<option value="' + esc(p) + '">').join('');

    $('#sDay').innerHTML = DAYS_FULL.map((d, i) =>
      '<option value="' + i + '"' + (i === todayIndex() ? ' selected' : '') + '>' + d + '</option>').join('');
  }

  /* ---------------- Quiz ---------------- */

  const MIXED = '__mixed__';
  const MOCK_SECONDS = 60;

  const quiz = {
    pool: [], idx: 0, score: 0, skipped: 0, answered: false, subject: '',
    topic: '', mode: 'practice', lastOpts: null, deadline: 0, timerId: null, answers: []
  };

  function poolFor(subject) {
    const all = BANK.concat(db.questions);
    const chosen = subject === MIXED ? all : all.filter((q) => q.s === subject);
    return chosen.map((q) => ({ s: q.s, q: q.q, o: q.o, a: q.a, e: q.e }));
  }

  /* One syllabus topic. Topics come from the solutions files, which are
     keyed by the exact question text. */
  function poolForTopic(subject, topic) {
    const sols = (window.SOLUTIONS || {})[subject] || {};
    return BANK.concat(db.questions)
      .filter((q) => q.s === subject && sols[q.q] && sols[q.q].t === topic)
      .map((q) => ({ s: q.s, q: q.q, o: q.o, a: q.a, e: q.e }));
  }

  /* The paper for exam mode: Use of English first (it is compulsory in
     UTME), then whatever else is ticked as UTME — four subjects max. */
  function examPaper() {
    const names = db.subjects.filter((s) => s.exam).map((s) => s.name);
    if (!names.length) return [];
    const english = db.subjects
      .filter((s) => /use of english/i.test(s.name))
      .map((s) => s.name);
    const rest = names.filter((n) => english.indexOf(n) === -1);
    return english.slice(0, 1).concat(rest).slice(0, 4);
  }

  /* Explanations live in the solutions files, keyed by subject then by the
     exact question text; the mistake queue only stores the question itself,
     so look it up when it is missing. Falls back to the bank's own e: field. */
  function explanationFor(subject, text) {
    const sols = window.SOLUTIONS || {};
    const own = subject && sols[subject] && sols[subject][text];
    if (own && own.e) return own.e;
    const subjects = Object.keys(sols);
    for (let i = 0; i < subjects.length; i++) {
      const hit = sols[subjects[i]][text];
      if (hit && hit.e) return hit.e;
    }
    const banked = BANK.concat(db.questions).filter((q) => q.q === text)[0];
    return banked && banked.e ? banked.e : '';
  }

  /* Topic for a question, when the solutions file has one. */
  function topicFor(subject, text) {
    const sols = window.SOLUTIONS || {};
    const own = subject && sols[subject] && sols[subject][text];
    if (own && own.t) return own.t;
    const subjects = Object.keys(sols);
    for (let i = 0; i < subjects.length; i++) {
      const hit = sols[subjects[i]][text];
      if (hit && hit.t) return hit.t;
    }
    return '';
  }

  function renderExamWho() {
    const el = $('#examWho');
    if (!el) return;
    const paper = examPaper();
    el.textContent = paper.length
      ? 'Paper: ' + paper.join(' · ') +
        ' — retick them in the Subjects tab to change it. One clock for the whole paper, 60s per question.'
      : 'Tick at least one subject as UTME in the Subjects tab to build your paper.';
  }

  /* Live count of what the chosen subject can actually serve, so the
     length menu is never a surprise. */
  function updateQAvail() {
    const el = $('#qAvail'), sel = $('#qSubject');
    if (!el || !sel) return;
    const total = BANK.concat(db.questions).length;
    el.textContent = '(' + poolFor(sel.value).length + ' of ' + total + ' in bank)';
  }

  /* ---------------- Different questions each round ---------------- */

  const RECENT_MAX = 400;

  /* Questions already shown recently sink to the back of the pool, so a
     re-run hands out a different set rather than the same ten again. */
  function freshFirst(list) {
    const seen = {};
    for (let i = 0; i < db.recentQ.length; i++) seen[db.recentQ[i]] = 1;
    const fresh = [], rest = [];
    for (let i = 0; i < list.length; i++) (seen[list[i].q] ? rest : fresh).push(list[i]);
    return fresh.concat(rest);
  }

  function rememberShown(items) {
    const shown = [];
    for (let i = 0; i < items.length; i++) {
      if (shown.indexOf(items[i].q) === -1) shown.push(items[i].q);
    }
    const older = db.recentQ.filter((q) => shown.indexOf(q) === -1);
    db.recentQ = shown.concat(older).slice(0, RECENT_MAX);
  }

  /* ---------------- One-hour gap before a re-run ---------------- */

  const RETAKE_MS = 60 * 60 * 1000;
  let retakeTick = null;

  function retakeKey() { return quiz.subject + '|' + quiz.mode + '|' + (quiz.topic || ''); }

  function retakeLeft() {
    const r = db.settings.retake;
    if (!r || r.key !== retakeKey()) return 0;
    return Math.max(0, (r.at + RETAKE_MS) - Date.now());
  }

  function humanLeft(ms) {
    const s = Math.ceil(ms / 1000);
    if (s >= 3600) {
      const h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60);
      return m ? h + ' hr ' + m + ' min' : h + ' hr';
    }
    if (s >= 60) return Math.ceil(s / 60) + ' min';
    return s + ' s';
  }

  function paintRetake() {
    const btn = $('#rAgain'), hint = $('#rHint');
    if (!btn) return;
    const left = retakeLeft();
    if (left > 0) {
      btn.disabled = true;
      btn.textContent = 'Practise again in ' + humanLeft(left);
      if (hint) hint.textContent =
        'Retaking straight away only repeats answers you just saw. ' +
        'Give it an hour — spacing is what moves it into long-term memory.';
    } else {
      btn.disabled = false;
      btn.textContent = 'Practise again';
      if (hint) hint.textContent =
        'Fresh pool — this round pulls questions you have not just seen.';
    }
  }

  function startRetakeTick() {
    stopRetakeTick();
    paintRetake();
    retakeTick = window.setInterval(paintRetake, 1000);
  }

  function stopRetakeTick() {
    if (retakeTick) window.clearInterval(retakeTick);
    retakeTick = null;
  }

  /* Mistake queue — a wrong answer saves the whole question here. */
  function recordMistake(item) {
    const i = db.missed.findIndex((m) => m.q === item.q);
    if (i !== -1) {
      db.missed[i].hits += 1;
      db.missed[i].last = isoDate(new Date());
    } else {
      db.missed.push({
        s: item.s, q: item.q, o: item.o, a: item.a,
        hits: 1, last: isoDate(new Date())
      });
    }
    db.missed = db.missed.slice(0, 60);
    save();
  }

  function clearMistake(item) {
    const before = db.missed.length;
    db.missed = db.missed.filter((m) => m.q !== item.q);
    if (db.missed.length !== before) save();
  }

  /* One shared "we have nothing to ask you" message. */
  function showNoQ(msg) {
    let hint = $('#noQ');
    if (!hint) {
      hint = document.createElement('p');
      hint.id = 'noQ';
      hint.className = 'hint';
      $('#quizSetup').appendChild(hint);
    }
    hint.textContent = msg;
  }

  function startQuiz(opts) {
    const options = Object.assign({ mode: 'practice' }, opts || {});
    const subject = options.mode === 'review' || options.mode === 'exam'
      ? null
      : (options.subject !== undefined ? options.subject : $('#qSubject').value);
    /* `all` (and any non-numeric value) means "everything in the pool". */
    const rawCount = options.count !== undefined ? options.count : $('#qCount').value;
    const count = String(rawCount).toLowerCase() === 'all'
      ? Infinity
      : (parseInt(rawCount, 10) || 0);

    if (options.mode === 'practice' && !subject) return;

    let source;
    if (options.mode === 'review') {
      source = db.missed;
    } else if (options.mode === 'exam') {
      const paper = examPaper();
      if (!paper.length) {
        showNoQ('Tick at least one subject as UTME in the Subjects tab to build your paper.');
        return;
      }
      /* English sits first, each section drawn fresh, whole paper in one go. */
      source = paper.reduce((acc, name) => acc.concat(freshFirst(shuffle(poolFor(name)))), []);
    } else if (options.topic) {
      /* Learn tab: a quiz scoped to one syllabus topic. */
      source = freshFirst(shuffle(poolForTopic(subject, options.topic)));
    } else {
      source = freshFirst(shuffle(poolFor(subject)));
    }

    if (!source.length) {
      showNoQ(options.mode === 'review'
        ? 'No mistakes saved yet — answer a quiz first and wrong answers land here.'
        : options.mode === 'exam'
          ? 'No questions for that paper yet — add your own in the Subjects tab.'
          : 'No questions for ' + esc(subject) + ' yet — add your own below.');
      return;
    }

    quiz.pool = options.mode === 'review'
      ? shuffle(source).slice(0, Math.min(20, source.length))
      : options.mode === 'exam'
        ? source
        : source.slice(0, Math.min(count, source.length));
    quiz.idx = 0;
    quiz.score = 0;
    quiz.skipped = 0;
    quiz.answers = [];
    quiz.mode = options.mode;
    quiz.topic = options.topic || '';
    quiz.subject = options.mode === 'review' ? 'Mistake review'
      : options.mode === 'exam' ? 'UTME exam'
      : (subject === MIXED ? 'Mixed subjects' : subject);
    quiz.lastOpts = options;

    /* Mock and exam: a hard clock, one minute per question. */
    stopMockClock();
    if (options.mode === 'mock' || options.mode === 'exam') {
      quiz.deadline = Date.now() + quiz.pool.length * MOCK_SECONDS * 1000;
      $('#qClock').hidden = false;
      $('#qClock').classList.remove('urgent');
      paintClock();
      quiz.timerId = window.setInterval(tickClock, 250);
    } else {
      $('#qClock').hidden = true;
    }

    $('#quizSetup').hidden = true;
    $('#quizResult').hidden = true;
    $('#quizCard').hidden = false;
    renderQuestion();
  }

  function stopMockClock() {
    if (quiz.timerId) window.clearInterval(quiz.timerId);
    quiz.timerId = null;
    $('#qClock').hidden = true;
    $('#qClock').classList.remove('urgent');
  }

  function paintClock() {
    const left = Math.max(0, Math.ceil((quiz.deadline - Date.now()) / 1000));
    const m = Math.floor(left / 60);
    const s = left % 60;
    const el = $('#qClock');
    el.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    el.classList.toggle('urgent', left <= 60);
    return left;
  }

  function tickClock() {
    if (paintClock() <= 0) {
      stopMockClock();
      finishQuiz(true);
    }
  }

  function renderQuestion() {
    const item = quiz.pool[quiz.idx];
    quiz.answered = false;
    const whyBox = document.getElementById('qWhy');
    if (whyBox) { whyBox.hidden = true; whyBox.innerHTML = ''; }

    $('#qProgress').textContent = (quiz.idx + 1) + ' / ' + quiz.pool.length;
    $('#qScore').textContent = quiz.score + ' correct';
    $('#qSubjectLabel').textContent = item.s + (quiz.mode === 'mock' ? ' · mock exam' : '');
    $('#qText').textContent = item.q;
    $('#qBar').style.width = ((quiz.idx) / quiz.pool.length * 100) + '%';
    $('#qNext').disabled = true;
    $('#qNext').textContent = quiz.idx === quiz.pool.length - 1 ? 'See result' : 'Next question';
    const sk = document.getElementById('qSkip');
    if (sk) sk.disabled = false;

    /* Options are reshuffled every question so the answer position
       never gives the pattern away. data-opt keeps the real index. */
    quiz.order = shuffle([0, 1, 2, 3]);
    $('#qOptions').innerHTML = quiz.order.map((realIdx) =>
      '<li><button class="opt" data-opt="' + realIdx + '">' +
        '<span class="opt-key">' + KEYS[quiz.order.indexOf(realIdx)] + '</span>' +
        '<span class="opt-text">' + esc(item.o[realIdx]) + '</span>' +
      '</button></li>').join('');
  }

  function answer(i) {
    if (quiz.answered) return;
    quiz.answered = true;

    const item = quiz.pool[quiz.idx];
    const buttons = $$('#qOptions .opt');
    const byIndex = (idx) => buttons.filter((b) => parseInt(b.dataset.opt, 10) === idx)[0];
    buttons.forEach((b) => { b.disabled = true; });
    const sk = document.getElementById('qSkip');
    if (sk) sk.disabled = true;

    /* Remember every pick so the result screen can show the full paper. */
    quiz.answers.push({
      s: item.s, q: item.q, o: item.o, a: item.a,
      chosen: i, ok: i === item.a,
      e: item.e || explanationFor(item.s, item.q)
    });

    if (i === item.a) {
      quiz.score++;
      byIndex(i).classList.add('correct');
      if (quiz.mode === 'review') clearMistake(item);
    } else {
      byIndex(i).classList.add('wrong');
      byIndex(item.a).classList.add('correct');
      recordMistake(item);
    }

    /* Show the working straight away — especially when it went wrong, so
       the method lands while the question is still in front of you. */
    const whyBox = document.getElementById('qWhy');
    if (whyBox) {
      const worked = item.e || explanationFor(item.s, item.q);
      const topic = topicFor(item.s, item.q);
      if (worked) {
        whyBox.innerHTML =
          '<p class="quiz-why-head">' +
            (i === item.a ? 'Why that is the answer' : 'How to work it out') +
            (topic ? '<span class="quiz-why-topic">' + esc(topic) + '</span>' : '') +
          '</p>' +
          '<p class="quiz-why-body">' + esc(worked) + '</p>';
        whyBox.hidden = false;
      } else {
        whyBox.innerHTML = '';
        whyBox.hidden = true;
      }
    }

    $('#qScore').textContent = quiz.score + ' correct';
    $('#qNext').disabled = false;
    $('#qNext').focus();
  }

  /* Skip: you're not sure, so don't spend a point on it right now.
     It is NOT marked wrong — it goes straight to the mistakes queue
     and comes back on review instead. */
  function skipQuestion() {
    if (quiz.answered) return;
    quiz.answered = true;

    const item = quiz.pool[quiz.idx];
    quiz.skipped++;
    quiz.answers.push({
      s: item.s, q: item.q, o: item.o, a: item.a,
      chosen: -1, ok: false, skipped: true,
      e: item.e || explanationFor(item.s, item.q)
    });
    recordMistake(item);
    nextQuestion();
  }

  function nextQuestion() {
    if (!quiz.answered) return;
    if (quiz.idx < quiz.pool.length - 1) {
      quiz.idx++;
      renderQuestion();
    } else {
      finishQuiz(false);
    }
  }

  function finishQuiz(timeUp) {
    stopMockClock();
    const total = quiz.pool.length;
    const pct = total ? Math.round((quiz.score / total) * 100) : 0;

    /* Time ran out: everything still unanswered counts as a miss, so the
       review screen shows the whole paper rather than just what you hit. */
    if (timeUp) {
      for (let i = quiz.answers.length; i < quiz.pool.length; i++) {
        const it = quiz.pool[i];
        quiz.answers.push({
          s: it.s, q: it.q, o: it.o, a: it.a, chosen: -1, ok: false,
          e: it.e || explanationFor(it.s, it.q)
        });
      }
    }

    /* The exam paper is scored per subject, so the dashboard's
       weak-subject report stays per subject instead of one lump. */
    let rows;
    if (quiz.mode === 'exam') {
      const bySubject = {};
      quiz.answers.forEach((a) => {
        if (!bySubject[a.s]) bySubject[a.s] = { correct: 0, total: 0, first: quiz.answers.indexOf(a) };
        bySubject[a.s].total++;
        if (a.ok) bySubject[a.s].correct++;
      });
      rows = Object.keys(bySubject)
        .map((name) => ({ subject: name, correct: bySubject[name].correct, total: bySubject[name].total, first: bySubject[name].first }))
        .sort((a, b) => a.first - b.first)
        .map((r) => ({ subject: r.subject, correct: r.correct, total: r.total }));
    } else {
      rows = [{ subject: quiz.subject, correct: quiz.score, total: total }];
    }

    rows.forEach((row) => {
      db.quiz_results.unshift({
        id: uid('qr'),
        date: isoDate(new Date()),
        subject: row.subject,
        correct: row.correct,
        total: row.total,
        mode: quiz.mode
      });
    });
    db.quiz_results = db.quiz_results.slice(0, 60);
    rememberShown(quiz.pool);
    db.settings.retake = { key: retakeKey(), at: Date.now() };
    save();

    /* Per-subject breakdown (exam papers only). */
    const brk = $('#rBreak');
    if (quiz.mode === 'exam') {
      brk.hidden = false;
      brk.innerHTML = rows.map((r) =>
        '<li><span>' + esc(r.subject) + '</span><b>' + r.correct + ' / ' + r.total + '</b></li>'
      ).join('');
    } else {
      brk.hidden = true;
      brk.innerHTML = '';
    }

    /* Question-by-question review. */
    $('#answerList').innerHTML = quiz.answers.map((a, i) => {
      const unanswered = a.chosen === -1;
      const verdict = a.skipped ? 'skipped'
        : unanswered ? 'not answered'
          : (a.ok ? 'correct' : 'wrong');
      const cls = unanswered ? 'is-skip' : (a.ok ? 'is-right' : 'is-wrong');
      const you = a.chosen === -1
        ? ''
        : '<p class="answer-line ' + (a.ok ? 'you ok' : 'you no') + '"><span>You</span>' + esc(a.o[a.chosen]) + '</p>';
      const right = a.ok
        ? ''
        : '<p class="answer-line right"><span>Answer</span>' + esc(a.o[a.a]) + '</p>';
      const why = a.e ? '<p class="answer-why">' + esc(a.e) + '</p>' : '';
      return '<li class="answer-item ' + cls + '">' +
        '<div class="answer-head">' +
          '<span class="answer-no">' + (i + 1) + '</span>' +
          '<span class="answer-sub">' + esc(a.s) + '</span>' +
          '<span class="answer-flag">' + verdict + '</span>' +
        '</div>' +
        '<p class="answer-q">' + esc(a.q) + '</p>' +
        you + right + why +
      '</li>';
    }).join('');
    $('#answerCount').textContent = quiz.answers.length + ' answered';
    $('#answerWrap').hidden = true;
    $('#rReview').hidden = quiz.answers.length === 0;
    $('#rReview').textContent = 'Review answers (' + quiz.answers.length + ')';

    $('#quizCard').hidden = true;
    $('#quizResult').hidden = false;
    $('#rScore').textContent = pct + '%';
    $('#rText').textContent =
      (timeUp ? 'Time up — ' : '') +
      (quiz.mode === 'exam'
        ? 'You got ' + quiz.score + ' out of ' + total + ' across your UTME paper. '
        : 'You got ' + quiz.score + ' out of ' + total + ' in ' + quiz.subject + '. ') +
      (quiz.skipped
        ? 'Skipped ' + quiz.skipped + (quiz.skipped === 1 ? ' question' : ' questions') +
          ' — waiting in your mistakes queue. '
        : '') +
      (pct >= 80 ? 'Excellent — keep it sharp.'
        : pct >= 50 ? 'Solid base. Review the ones you missed.'
        : 'Worth another pass before you move on.');

    startRetakeTick();
    renderStats();
    renderHistory();
    renderWeak();
    renderReview();
  }

  function renderHistory() {
    const stats = quizStats();
    $('#accChip').textContent = stats.pct === null ? '—' : stats.pct + '% overall';

    const list = db.quiz_results.slice(0, 8);
    $('#historyEmpty').hidden = list.length > 0;

    $('#history').innerHTML = list.map((r) => {
      const pct = Math.round((r.correct / r.total) * 100);
      const cls = pct >= 70 ? 'good' : (pct >= 50 ? 'mid' : 'bad');
      const d = new Date(r.date + 'T00:00:00');
      const when = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
      return '<li class="history-item">' +
        '<span class="history-who"><strong>' + esc(r.subject) + '</strong><span>' + when + ' · ' + r.correct + '/' + r.total + '</span></span>' +
        '<span class="history-score ' + cls + '">' + pct + '%</span>' +
      '</li>';
    }).join('');
  }

  /* ---------------- Timer ---------------- */

  const timer = { total: 25 * 60, left: 25 * 60, id: null, running: false, startedAt: 0 };

  function paintTimer() {
    const m = Math.floor(timer.left / 60);
    const s = timer.left % 60;
    $('#timerClock').textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    $('#timerToggle').textContent = timer.running ? 'Pause' : (timer.left === timer.total ? 'Start' : 'Resume');
    $('#timerMode').textContent = Math.round(timer.total / 60) + ' min';
    document.querySelector('.timer').classList.toggle('running', timer.running);
  }

  function tick() {
    if (timer.left > 0) {
      timer.left--;
      paintTimer();
    }
    if (timer.left === 0) {
      stopTimer();
      $('#timerHint').textContent = 'Time\'s up — hit "Log time" to add it to your subject.';
    }
  }

  function startTimer() {
    timer.running = true;
    timer.startedAt = Date.now();
    timer.id = window.setInterval(tick, 1000);
    $('#timerHint').textContent = 'Staying focused. Logging is manual so you can stop early.';
    paintTimer();
  }

  function stopTimer() {
    timer.running = false;
    if (timer.id) window.clearInterval(timer.id);
    timer.id = null;
    paintTimer();
  }

  function resetTimer() {
    stopTimer();
    timer.left = timer.total;
    $('#timerHint').textContent = 'Start a session and it lands in this subject\'s total when you log it.';
    paintTimer();
  }

  function logTimer() {
    const elapsed = Math.round((timer.total - timer.left) / 60);
    const subject = $('#timerSubject').value;
    if (!subject) return;
    if (elapsed < 1) {
      $('#timerHint').textContent = 'No time elapsed yet — study a minute first.';
      return;
    }
    /* Attribute the minutes to a session scheduled for today whenever there
       is one. That is what makes the tick on the timetable honest: a slot
       only lights up once real focus time has been recorded against it, so
       nobody can claim an hour they never sat down for. */
    const session = db.sessions.find((s) => s.subject === subject && s.day === todayIndex());
    db.logs.push({
      id: uid('log'),
      date: isoDate(new Date()),
      subject: subject,
      minutes: elapsed,
      sessionId: session ? session.id : null,
      source: 'timer'
    });
    save();
    resetTimer();
    $('#timerHint').textContent = session
      ? 'Logged ' + elapsed + ' min — your ' + fmtTime(session.time, session.minutes) + ' slot is now marked.'
      : 'Logged ' + elapsed + ' min to ' + subject + '.';
    renderStats();
    renderChart();
    renderProgress();
    renderSubjects();
    renderWeekGrid();
    renderToday();
  }

  /* Focus minutes recorded against a session on a given day, and whether it
     was ticked off then. Ticking on its own earns nothing — the focus timer
     has to put real time against the slot first. */
  function sessionLogsOn(sessionId, date) {
    return db.logs.filter((l) => l.sessionId === sessionId && l.date === date);
  }

  function studiedOn(sessionId, date) {
    return sessionLogsOn(sessionId, date).reduce((n, l) => n + (l.minutes || 0), 0);
  }

  function isDoneOn(sessionId, date) {
    return sessionLogsOn(sessionId, date).some((l) => !l.unticked);
  }

  function studiedToday(sessionId) {
    return studiedOn(sessionId, isoDate(new Date()));
  }

  function isDoneToday(sessionId) {
    return isDoneOn(sessionId, isoDate(new Date()));
  }

  /* Undo a tick. Self-awarded plan minutes are dropped, because they were
     never earned; focus-timer minutes are only flagged, so real study
     stays in the totals and the tick can be put back. Only today's logs
     are touched — yesterday's study is never rewritten. */
  function toggleSessionLog(id) {
    const today = isoDate(new Date());
    const mine = (l) => l.sessionId === id && l.date === today;
    const logs = sessionLogsOn(id, today);
    if (!logs.length) return false;           /* gated: nothing real yet */
    const anyLive = logs.some((l) => !l.unticked);
    if (anyLive) {
      db.logs = db.logs.filter((l) => !(mine(l) && l.source === 'plan'));
      db.logs.forEach((l) => { if (mine(l)) l.unticked = true; });
    } else {
      db.logs.forEach((l) => { if (mine(l)) l.unticked = false; });
    }
    save();
    return true;
  }

  /* The slot's play button: jump to the focus timer with this subject
     already chosen and start it, so earning the tick is one tap away. */
  function startFocusForSession(id) {
    const session = db.sessions.find((s) => s.id === id);
    if (!session) return;
    const pick = document.getElementById('timerSubject');
    if (pick) pick.value = session.subject;
    showTab('dashboard');
    if (timer.left === 0 || timer.left === timer.total) resetTimer();
    startTimer();
    $('#timerHint').textContent = 'Focusing on ' + session.subject +
      ' — when you stop, hit "Log time" and the slot unlocks.';
    const card = document.querySelector('.timer');
    if (card && card.scrollIntoView) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ---------------- Events ---------------- */

  function wire() {
    /* tabs */
    $$('.tab').forEach((t) => t.addEventListener('click', () => showTab(t.dataset.tab)));
    $$('[data-goto]').forEach((b) => b.addEventListener('click', () => showTab(b.dataset.goto)));

    /* today's plan */
    $('#todayPlan').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-toggle]');
      if (!btn || btn.disabled) return;
      /* Ticking only toggles. It never mints minutes — they come from the
         focus timer, so a plan item cannot be claimed without studying. */
      if (!toggleSessionLog(btn.dataset.toggle)) return;
      renderToday();
      renderStats();
      renderChart();
      renderProgress();
      renderSubjects();
      renderWeekGrid();
    });

    /* session form */
    $('#sessionForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const subject = $('#sSubject').value;
      if (!subject) return;
      db.sessions.push({
        id: uid('sess'),
        subject: subject,
        day: parseInt($('#sDay').value, 10),
        time: $('#sTime').value,
        minutes: parseInt($('#sMinutes').value, 10) || 60,
        topic: $('#sTopic').value.trim()
      });
      save();
      $('#sTopic').value = '';
      renderWeekGrid();
      renderToday();
      showTab('timetable');
    });

    /* week grid actions */
    $('#weekGrid').addEventListener('click', (e) => {
      const del = e.target.closest('[data-slot-del]');
      const chk = e.target.closest('[data-slot-check]');
      const start = e.target.closest('[data-slot-start]');

      if (del) {
        const id = del.dataset.slotDel;
        db.sessions = db.sessions.filter((s) => s.id !== id);
        /* Keep the minutes you actually studied — only the plan slot goes.
           Detach the log so the time stays in your totals. */
        db.logs.forEach((l) => { if (l.sessionId === id) l.sessionId = null; });
        save();
        renderWeekGrid();
        renderToday();
        renderStats();
        renderChart();
        renderProgress();
        renderSubjects();
        return;
      }

      if (start) {
        startFocusForSession(start.dataset.slotStart);
        return;
      }

      if (chk) {
        if (chk.disabled) return;
        /* Toggling only flips the tick. The minutes were recorded by the
           focus timer, so nothing here can invent study time. */
        if (!toggleSessionLog(chk.dataset.slotCheck)) return;
        renderWeekGrid();
        renderToday();
        renderStats();
        renderChart();
        renderProgress();
        renderSubjects();
      }
    });

    /* subject form */
    $('#subjectForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#subName').value.trim();
      if (!name) return;
      const id = slug(name);
      if (db.subjects.some((s) => s.id === id)) {
        $('#subName').value = '';
        $('#subName').placeholder = 'Already added';
        return;
      }
      db.subjects.push({
        id: id,
        name: name,
        target: parseInt($('#subTarget').value, 10) || 300,
        exam: db.subjects.filter((s) => s.exam).length < 4
      });
      save();
      $('#subName').value = '';
      renderSubjects();
      renderProgress();
      fillSubjectSelects();
    });

    /* subject list actions */
    $('#subjectList').addEventListener('change', (e) => {
      const examBox = e.target.closest('[data-exam]');
      const targetInput = e.target.closest('[data-target]');

      if (examBox) {
        const s = db.subjects.find((x) => x.id === examBox.dataset.exam);
        if (!s) return;
        if (examBox.checked && db.subjects.filter((x) => x.exam).length >= 4) {
          examBox.checked = false;
          return;
        }
        s.exam = examBox.checked;
        save();
        renderSubjects();
        renderProgress();
        renderExamWho();
      }

      if (targetInput) {
        const s = db.subjects.find((x) => x.id === targetInput.dataset.target);
        if (!s) return;
        s.target = parseInt(targetInput.value, 10) || 300;
        save();
        renderProgress();
      }
    });

    $('#subjectList').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-del-subject]');
      if (!btn) return;
      const id = btn.dataset.delSubject;
      db.subjects = db.subjects.filter((s) => s.id !== id);
      db.sessions = db.sessions.filter((s) => slug(s.subject) !== id);
      save();
      renderSubjects();
      renderProgress();
      renderWeekGrid();
      renderToday();
      fillSubjectSelects();
      renderExamWho();
    });

    /* settings */
    $('#dailyGoal').addEventListener('change', (e) => {
      db.settings.dailyGoal = parseInt(e.target.value, 10) || 120;
      save();
      renderStats();
    });
    $('#examDate').addEventListener('change', (e) => {
      db.settings.examDate = e.target.value;
      save();
      renderStats();
    });

    /* next-cycle card: adopt the projected exam date as the countdown date */
    $('#cycleSetExam').addEventListener('click', () => {
      const ac = activeCycle();
      db.settings.examDate = isoDate(ac.cycle.marks[4].date);
      $('#examDate').value = db.settings.examDate;
      save();
      renderStats();
      setStatus('countdown set to ' + db.settings.examDate, 'ok');
    });

    /* timer */
    $('#timerToggle').addEventListener('click', () => { timer.running ? stopTimer() : startTimer(); });
    $('#timerReset').addEventListener('click', resetTimer);
    $('#timerLog').addEventListener('click', logTimer);
    $('#timerLength').addEventListener('change', (e) => {
      stopTimer();
      timer.total = parseInt(e.target.value, 10) * 60;
      timer.left = timer.total;
      paintTimer();
    });

    /* quiz */
    $('#startQuiz').addEventListener('click', () => startQuiz({ mode: 'practice' }));
    $('#startMock').addEventListener('click', () => startQuiz({ mode: 'mock' }));
    $('#startExam').addEventListener('click', () => startQuiz({ mode: 'exam' }));
    $('#qSubject').addEventListener('change', updateQAvail);
    $('#reviewStart').addEventListener('click', () => startQuiz({ mode: 'review' }));
    $('#reviewClear').addEventListener('click', () => {
      if (!db.missed.length) return;
      if (!window.confirm('Clear all saved mistakes?')) return;
      db.missed = [];
      save();
      renderReview();
    });

    $('#qOptions').addEventListener('click', (e) => {
      const b = e.target.closest('[data-opt]');
      if (b) answer(parseInt(b.dataset.opt, 10));
    });
    $('#qNext').addEventListener('click', nextQuestion);
    $('#qQuit').addEventListener('click', () => {
      stopMockClock();
      $('#quizCard').hidden = true;
      $('#quizSetup').hidden = false;
    });
    $('#qSkip').addEventListener('click', skipQuestion);
    $('#rAgain').addEventListener('click', () => {
      if ($('#rAgain').disabled) return;
      stopRetakeTick();
      $('#quizResult').hidden = true;
      startQuiz(quiz.lastOpts || { mode: 'practice' });
    });
    $('#rReview').addEventListener('click', () => {
      const wrap = $('#answerWrap');
      wrap.hidden = !wrap.hidden;
      $('#rReview').textContent = wrap.hidden
        ? 'Review answers (' + quiz.answers.length + ')'
        : 'Hide review';
      if (!wrap.hidden) wrap.scrollIntoView({ block: 'nearest' });
    });
    $('#rHome').addEventListener('click', () => {
      stopRetakeTick();
      $('#quizResult').hidden = true;
      $('#answerWrap').hidden = true;
      $('#quizSetup').hidden = false;
    });

    /* sign-in dialog */
    document.getElementById('authBtn').addEventListener('click', function () { Auth.open(); });
    document.getElementById('authCancel').addEventListener('click', function () { Auth.close(); });
    document.getElementById('authSignOut').addEventListener('click', function () { Auth.signOut(); });
    document.getElementById('authSwitch').addEventListener('click', function () {
      Auth.mode = Auth.mode === 'signin' ? 'signup' : 'signin';
      document.getElementById('authMsg').hidden = true;
      Auth.showResend(false);
      Auth.paintMode();
    });
    document.getElementById('authResend').addEventListener('click', function () { Auth.resend(); });
    document.getElementById('authForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('authEmail').value.trim();
      const pass = document.getElementById('authPass').value;
      if (!email) { Auth.fail('Enter your email address.'); return; }
      if (pass.length < 6) { Auth.fail('Password must be at least 6 characters.'); return; }
      if (!cloudEnabled) {
        Auth.fail('Cloud sync is switched off in this build — everything stays on this device.');
        return;
      }
      Auth.submit(email, pass);
    });
    paintAuth();

    /* Learn tab: pick a subject, pick what to show, open a note, or jump
       straight into a quiz on one topic. */
    $('#learnSubject').addEventListener('click', (e) => {
      const b = e.target.closest('.seg-btn');
      if (!b) return;
      Learn.subject = decodeURIComponent(b.dataset.subject || '');
      Learn.topic = '';
      Learn.mode = 'index';
      renderLearn();
    });
    $('#learnMode').addEventListener('click', (e) => {
      const b = e.target.closest('.seg-btn');
      if (!b) return;
      Learn.mode = b.dataset.mode || 'index';
      Learn.topic = '';
      renderLearn();
    });
    $('#learnBody').addEventListener('click', (e) => {
      /* Open a topic's lesson. */
      const go = e.target.closest('[data-learn-go]');
      if (go) {
        Learn.topic = decodeURIComponent(go.getAttribute('data-learn-go') || '');
        Learn.mode = 'lesson';
        renderLearn();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      /* Back to the topic index. */
      if (e.target.closest('[data-learn-back]')) {
        Learn.topic = '';
        Learn.mode = 'index';
        renderLearn();
        return;
      }
      const tryBtn = e.target.closest('[data-try]');
      if (tryBtn) { startTopicQuiz(decodeURIComponent(tryBtn.getAttribute('data-try') || '')); return; }
      /* Solutions browser still collapses its own topic groups. */
      const head = e.target.closest('.note-head');
      if (head && head.tagName === 'BUTTON') {
        const open = head.closest('.note').classList.toggle('is-open');
        head.setAttribute('aria-expanded', String(open));
      }
    });

    /* who is studying on this device */
    $('#whoPick').addEventListener('change', (e) => {
      const v = e.target.value;
      if (v === '__new__') {
        const name = window.prompt('Name of the new student on this device:', '');
        if (name && name.trim()) addProfile(name.trim());
        paintProfiles();
        e.target.value = Profiles.active;
        return;
      }
      switchProfile(v);
    });
    paintProfiles();

    /* theme */
    $('#themeToggle').addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      db.settings.theme = next;
      save();
      applyTheme();
    });

    /* custom question */
    $('#questionForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const subject = $('#cSubject').value;
      if (!subject) return;
      db.questions.push({
        id: uid('q'),
        s: subject,
        q: $('#cText').value.trim(),
        o: [$('#cO0').value.trim(), $('#cO1').value.trim(), $('#cO2').value.trim(), $('#cO3').value.trim()],
        a: parseInt($('#cAnswer').value, 10)
      });
      save();
      e.target.reset();
      const msg = $('#cMsg');
      msg.textContent = 'Saved — it will appear next time you quiz ' + subject + '.';
      msg.hidden = false;
      setTimeout(() => { msg.hidden = true; }, 4000);
    });

    /* data */
    $('#exportBtn').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'jamb-study-data.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });

    $('#resetBtn').addEventListener('click', () => {
      if (!window.confirm('Delete all your subjects, logs and quiz history? This cannot be undone.')) return;
      db = defaultDB();
      save();
      renderAll();
      showTab('dashboard');
    });

    $('#importBtn').addEventListener('click', () => $('#importFile').click());
    $('#importFile').addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      e.target.value = '';
      if (!file) return;
      importJSON(file, (err) => {
        if (err) window.alert('Could not read that file: ' + err.message);
      });
    });

    /* scroll progress */
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      $('#progressBar').style.width = pct + '%';
    }, { passive: true });

    /* keyboard: 1-4 to answer, Enter to advance, S to skip */
    document.addEventListener('keydown', (e) => {
      if ($('#quizCard').hidden) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4) answer(n - 1);
      if (e.key === 'Enter' && quiz.answered) nextQuestion();
      if ((e.key === 's' || e.key === 'S') && !quiz.answered) skipQuestion();
    });
  }

  /* ---------------- Init ---------------- */

  function applyTheme() {
    const theme = db.settings.theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    const btn = $('#themeToggle');
    if (btn) {
      btn.textContent = theme === 'light' ? '☾' : '☀';
      btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f2f5fa' : '#0a0c11');
  }

  /* Offline support: network-first so an update is never stuck behind
     the cache, cache-first only when the network is gone. */
  function registerSW() {
    if (!('serviceWorker' in navigator)) return;
    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') return;
    navigator.serviceWorker.register('sw.js').catch(function () { /* offline support unavailable */ });
  }

  function renderAll() {
    fillSubjectSelects();
    applyTheme();
    renderStats();
    renderCycle();
    renderToday();
    renderChart();
    renderProgress();
    renderWeak();
    renderHeat();
    renderWeekGrid();
    renderSubjects();
    renderExamWho();
    renderHistory();
    renderReview();
    paintTimer();
  }

  function init() {
    $('#year').textContent = new Date().getFullYear();

    /* Confirmation links land here with tokens in the URL — claim
       them before anything else reads or writes the session. */
    const redirect = cloudEnabled ? consumeAuthRedirect() : null;

    wire();
    renderAll();
    registerSW();

    const hash = (location.hash || '#dashboard').slice(1);
    /* A deep link like #learn/Use%20of%20English/Synonyms opens straight into
       one lesson. showTab rewrites the hash, so read it first and hand the
       subject/topic over before the first render. */
    const deep = String(location.hash || '').match(/^#learn\/([^/]+)(?:\/(.+))?$/);
    if (deep) {
      Learn.subject = decodeURIComponent(deep[1]);
      Learn.topic = deep[2] ? decodeURIComponent(deep[2]) : '';
      Learn.mode = Learn.topic ? 'lesson' : 'index';
      showTab('learn');
    } else {
      const valid = ['dashboard', 'timetable', 'subjects', 'practice', 'learn'];
      showTab(valid.indexOf(hash) !== -1 ? hash : 'dashboard');
    }

    if (redirect && redirect.ok) {
      setStatus('confirming…', 'busy');
      finishEmailConfirm().then(function () {
        if (cloudEnabled) cloudStart();
      });
    } else if (redirect && redirect.msg) {
      Auth.fail(redirect.msg);
      const dlg = document.getElementById('authDialog');
      if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
      if (cloudEnabled) cloudStart();
    } else if (cloudEnabled) {
      cloudStart();
    } else {
      setStatus('saved locally', '');
      const chip = document.getElementById('syncChip');
      if (chip) chip.title = 'Offline-first: data lives in this browser. Add Supabase keys in js/config.js to sync across devices.';
    }

    if (memoryOnly) {
      const hint = document.createElement('p');
      hint.className = 'hint';
      hint.textContent = 'Note: storage is unavailable here, so progress will not persist after a refresh.';
      $('#dashboard').appendChild(hint);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
