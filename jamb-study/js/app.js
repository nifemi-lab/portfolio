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
  /* Past questions live in js/questions.js, loaded first as window.QUESTION_BANK. */
  const BANK = window.QUESTION_BANK || [];

  /* ---------------- Storage ---------------- */

  const STORE_KEY = 'jamb_study_db_v1';
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
        { id: uid('sess'), subject: 'Use of English', day: 4, time: '17:15', minutes: 45, topic: 'Past questions drill' },
        { id: uid('sess'), subject: 'Mathematics',    day: 5, time: '10:00', minutes: 90, topic: 'Full mock — 50 questions' },
        { id: uid('sess'), subject: 'Mixed practice', day: 6, time: '17:00', minutes: 60, topic: 'Weekly review + wrong answers' }
      ],
      logs: [],
      quiz_results: [],
      questions: [],
      missed: [],
      settings: { dailyGoal: 120, examDate: '', theme: '' }
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

  const SESSION_KEY = 'jamb_study_session_v1';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const doneIds = db.logs
      .filter((l) => l.date === today && l.sessionId)
      .map((l) => l.sessionId);

    $('#todayCount').textContent = list.length + (list.length === 1 ? ' session' : ' sessions');
    $('#todayEmpty').hidden = list.length > 0;

    $('#todayPlan').innerHTML = list.map((s) => {
      const done = doneIds.indexOf(s.id) !== -1;
      return '<li class="plan-item' + (done ? ' done' : '') + '">' +
        '<button class="plan-check" data-toggle="' + s.id + '" aria-pressed="' + done + '" aria-label="Mark ' + esc(s.subject) + ' as done">✓</button>' +
        '<span class="plan-body">' +
          '<span class="plan-subject">' + esc(s.subject) + (s.minutes ? ' <span class="plan-time">· ' + s.minutes + ' min</span>' : '') + '</span>' +
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
        const done = db.logs.some((l) => l.sessionId === s.id && l.date === today);
        return '<article class="slot' + (done ? ' done' : '') + '">' +
          '<div class="slot-top">' +
            '<span class="slot-time">' + esc(fmtTime(s.time, s.minutes)) + '</span>' +
            '<span class="slot-actions">' +
              '<button class="icon-btn check" data-slot-check="' + s.id + '" title="Mark as studied" aria-label="Mark ' + esc(s.subject) + ' as studied">✓</button>' +
              '<button class="icon-btn" data-slot-del="' + s.id + '" title="Delete session" aria-label="Delete ' + esc(s.subject) + ' session">✕</button>' +
            '</span>' +
          '</div>' +
          '<p class="slot-subject">' + esc(s.subject) + '</p>' +
          (s.topic ? '<p class="slot-topic">' + esc(s.topic) + '</p>' : '') +
          '<p class="slot-mins">' + s.minutes + ' min</p>' +
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

    $('#subjectPresets').innerHTML = PRESETS.map((p) => '<option value="' + esc(p) + '">').join('');

    $('#sDay').innerHTML = DAYS_FULL.map((d, i) =>
      '<option value="' + i + '"' + (i === todayIndex() ? ' selected' : '') + '>' + d + '</option>').join('');
  }

  /* ---------------- Quiz ---------------- */

  const MIXED = '__mixed__';
  const MOCK_SECONDS = 60;

  const quiz = {
    pool: [], idx: 0, score: 0, answered: false, subject: '',
    mode: 'practice', lastOpts: null, deadline: 0, timerId: null
  };

  function poolFor(subject) {
    const all = BANK.concat(db.questions);
    const chosen = subject === MIXED ? all : all.filter((q) => q.s === subject);
    return chosen.map((q) => ({ s: q.s, q: q.q, o: q.o, a: q.a }));
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

  function startQuiz(opts) {
    const options = Object.assign({ mode: 'practice' }, opts || {});
    const subject = options.mode === 'review'
      ? null
      : (options.subject !== undefined ? options.subject : $('#qSubject').value);
    const count = parseInt(
      options.count !== undefined ? options.count : $('#qCount').value, 10
    );

    if (options.mode === 'practice' && !subject) return;

    const source = options.mode === 'review' ? db.missed : shuffle(poolFor(subject));

    if (!source.length) {
      const msg = options.mode === 'review'
        ? 'No mistakes saved yet — answer a quiz first and wrong answers land here.'
        : 'No questions for ' + esc(subject) + ' yet — add your own below.';
      let hint = $('#noQ');
      if (!hint) {
        hint = document.createElement('p');
        hint.id = 'noQ';
        hint.className = 'hint';
        $('#quizSetup').appendChild(hint);
      }
      hint.textContent = msg;
      return;
    }

    quiz.pool = options.mode === 'review'
      ? shuffle(source).slice(0, Math.min(20, source.length))
      : source.slice(0, Math.min(count, source.length));
    quiz.idx = 0;
    quiz.score = 0;
    quiz.mode = options.mode;
    quiz.subject = options.mode === 'review' ? 'Mistake review' : (subject === MIXED ? 'Mixed subjects' : subject);
    quiz.lastOpts = options;

    /* Mock exam: a hard clock, one minute per question. */
    stopMockClock();
    if (options.mode === 'mock') {
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

    $('#qProgress').textContent = (quiz.idx + 1) + ' / ' + quiz.pool.length;
    $('#qScore').textContent = quiz.score + ' correct';
    $('#qSubjectLabel').textContent = item.s + (quiz.mode === 'mock' ? ' · mock exam' : '');
    $('#qText').textContent = item.q;
    $('#qBar').style.width = ((quiz.idx) / quiz.pool.length * 100) + '%';
    $('#qNext').disabled = true;
    $('#qNext').textContent = quiz.idx === quiz.pool.length - 1 ? 'See result' : 'Next question';

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

    if (i === item.a) {
      quiz.score++;
      byIndex(i).classList.add('correct');
      if (quiz.mode === 'review') clearMistake(item);
    } else {
      byIndex(i).classList.add('wrong');
      byIndex(item.a).classList.add('correct');
      recordMistake(item);
    }

    $('#qScore').textContent = quiz.score + ' correct';
    $('#qNext').disabled = false;
    $('#qNext').focus();
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

    db.quiz_results.unshift({
      id: uid('qr'),
      date: isoDate(new Date()),
      subject: quiz.subject,
      correct: quiz.score,
      total: total,
      mode: quiz.mode
    });
    db.quiz_results = db.quiz_results.slice(0, 60);
    save();

    $('#quizCard').hidden = true;
    $('#quizResult').hidden = false;
    $('#rScore').textContent = pct + '%';
    $('#rText').textContent =
      (timeUp ? 'Time up — ' : '') +
      'You got ' + quiz.score + ' out of ' + total + ' in ' + quiz.subject + '. ' +
      (pct >= 80 ? 'Excellent — keep it sharp.'
        : pct >= 50 ? 'Solid base. Review the ones you missed.'
        : 'Worth another pass before you move on.');

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
    db.logs.push({
      id: uid('log'),
      date: isoDate(new Date()),
      subject: subject,
      minutes: elapsed,
      sessionId: null,
      source: 'timer'
    });
    save();
    resetTimer();
    $('#timerHint').textContent = 'Logged ' + elapsed + ' min to ' + subject + '.';
    renderStats();
    renderChart();
    renderProgress();
    renderSubjects();
  }

  /* ---------------- Events ---------------- */

  function wire() {
    /* tabs */
    $$('.tab').forEach((t) => t.addEventListener('click', () => showTab(t.dataset.tab)));
    $$('[data-goto]').forEach((b) => b.addEventListener('click', () => showTab(b.dataset.goto)));

    /* today's plan */
    $('#todayPlan').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-toggle]');
      if (!btn) return;
      const id = btn.dataset.toggle;
      const session = db.sessions.find((s) => s.id === id);
      const today = isoDate(new Date());
      const existing = db.logs.findIndex((l) => l.sessionId === id && l.date === today);

      if (existing !== -1) {
        db.logs.splice(existing, 1);
      } else {
        db.logs.push({
          id: uid('log'),
          date: today,
          subject: session ? session.subject : 'Study',
          minutes: session ? session.minutes : 30,
          sessionId: id,
          source: 'plan'
        });
      }
      save();
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

      if (del) {
        const id = del.dataset.slotDel;
        db.sessions = db.sessions.filter((s) => s.id !== id);
        db.logs = db.logs.filter((l) => l.sessionId !== id);
        save();
        renderWeekGrid();
        renderToday();
        renderStats();
        renderChart();
        renderProgress();
        renderSubjects();
        return;
      }

      if (chk) {
        const id = chk.dataset.slotCheck;
        const session = db.sessions.find((s) => s.id === id);
        const today = isoDate(new Date());
        const existing = db.logs.findIndex((l) => l.sessionId === id && l.date === today);

        if (existing !== -1) {
          db.logs.splice(existing, 1);
        } else {
          db.logs.push({
            id: uid('log'),
            date: today,
            subject: session ? session.subject : 'Study',
            minutes: session ? session.minutes : 30,
            sessionId: id,
            source: 'plan'
          });
        }
        save();
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
    $('#rAgain').addEventListener('click', () => {
      $('#quizResult').hidden = true;
      startQuiz(quiz.lastOpts || { mode: 'practice' });
    });
    $('#rHome').addEventListener('click', () => { $('#quizResult').hidden = true; $('#quizSetup').hidden = false; });

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

    /* keyboard: 1-4 to answer in quiz */
    document.addEventListener('keydown', (e) => {
      if ($('#quizCard').hidden) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4) answer(n - 1);
      if (e.key === 'Enter' && quiz.answered) nextQuestion();
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
    renderToday();
    renderChart();
    renderProgress();
    renderWeak();
    renderHeat();
    renderWeekGrid();
    renderSubjects();
    renderHistory();
    renderReview();
    paintTimer();
  }

  function init() {
    $('#year').textContent = new Date().getFullYear();
    wire();
    renderAll();
    registerSW();

    const hash = (location.hash || '#dashboard').slice(1);
    const valid = ['dashboard', 'timetable', 'subjects', 'practice'];
    showTab(valid.indexOf(hash) !== -1 ? hash : 'dashboard');

    if (cloudEnabled) {
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
