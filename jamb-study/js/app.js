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
  const BANK = [
    /* --- Use of English --- */
    { s: 'Use of English', q: 'Choose the option nearest in meaning to the word in capital letters: The chairman was EBULLIENT during the ceremony.', o: ['Tired', 'Cheerful', 'Angry', 'Silent'], a: 1 },
    { s: 'Use of English', q: 'Choose the option opposite in meaning to the word: BENEVOLENT', o: ['Kind', 'Generous', 'Malevolent', 'Caring'], a: 2 },
    { s: 'Use of English', q: 'Complete the sentence: Neither of the boys ___ the answer.', o: ['have', 'were', 'has', 'are'], a: 2 },
    { s: 'Use of English', q: 'Fill the gap: She has been living in Lagos ___ 2015.', o: ['for', 'from', 'since', 'by'], a: 2 },
    { s: 'Use of English', q: 'A person who hates the whole of mankind is a ___', o: ['philanthropist', 'misanthrope', 'stoic', 'hermit'], a: 1 },
    { s: 'Use of English', q: 'The word "candid" means most nearly:', o: ['secretive', 'frank', 'careless', 'bitter'], a: 1 },
    { s: 'Use of English', q: 'Choose the correctly punctuated sentence:', o: ['"Where are you going?" he asked.', '"Where are you going" he asked?', '"Where are you going?", he asked.', 'Where are you going? he asked.'], a: 0 },
    { s: 'Use of English', q: 'The plural of "crisis" is:', o: ['crisises', 'crises', 'crisis', 'crisi'], a: 1 },

    /* --- Mathematics --- */
    { s: 'Mathematics', q: 'Simplify: 2/3 + 3/4', o: ['17/12', '5/7', '6/12', '24/17'], a: 0 },
    { s: 'Mathematics', q: 'If 3x − 5 = 16, what is x?', o: ['5', '6', '7', '8'], a: 2 },
    { s: 'Mathematics', q: 'Find the area of a circle of radius 7 cm. (Take π = 22/7)', o: ['44 cm²', '154 cm²', '22 cm²', '308 cm²'], a: 1 },
    { s: 'Mathematics', q: 'What is 15% of ₦200?', o: ['₦15', '₦25', '₦30', '₦35'], a: 2 },
    { s: 'Mathematics', q: 'Solve: 2(x + 3) = 18', o: ['x = 5', 'x = 6', 'x = 7', 'x = 12'], a: 1 },
    { s: 'Mathematics', q: 'A right-angled triangle has sides 3 cm, 4 cm and 5 cm. Its area is:', o: ['6 cm²', '12 cm²', '7 cm²', '15 cm²'], a: 0 },
    { s: 'Mathematics', q: 'Simplify: √144 + √25', o: ['12', '15', '17', '25'], a: 2 },
    { s: 'Mathematics', q: 'Simple interest on ₦5,000 at 10% per annum for 2 years is:', o: ['₦500', '₦1,000', '₦1,500', '₦2,000'], a: 1 },

    /* --- Physics --- */
    { s: 'Physics', q: 'The SI unit of force is the:', o: ['Joule', 'Watt', 'Newton', 'Pascal'], a: 2 },
    { s: 'Physics', q: 'Which of these is a vector quantity?', o: ['Speed', 'Distance', 'Mass', 'Velocity'], a: 3 },
    { s: 'Physics', q: "Newton's first law of motion is also called the law of:", o: ['Inertia', 'Momentum', 'Acceleration', 'Reaction'], a: 0 },
    { s: 'Physics', q: 'The unit of power is the:', o: ['Volt', 'Ampere', 'Watt', 'Ohm'], a: 2 },
    { s: 'Physics', q: 'The formula for kinetic energy is:', o: ['mgh', '½mv²', 'Fd', 'mc²'], a: 1 },
    { s: 'Physics', q: 'The speed of light is approximately:', o: ['3 × 10⁶ m/s', '3 × 10⁸ m/s', '3 × 10¹⁰ m/s', '340 m/s'], a: 1 },
    { s: 'Physics', q: 'A body moving in a circle at constant speed has:', o: ['zero acceleration', 'constant velocity', 'centripetal acceleration', 'increasing speed'], a: 2 },
    { s: 'Physics', q: 'Which instrument measures atmospheric pressure?', o: ['Barometer', 'Hygrometer', 'Anemometer', 'Thermometer'], a: 0 },

    /* --- Chemistry --- */
    { s: 'Chemistry', q: 'The chemical symbol for gold is:', o: ['Go', 'Gd', 'Au', 'Ag'], a: 2 },
    { s: 'Chemistry', q: 'The pH of pure water at 25°C is:', o: ['0', '7', '10', '14'], a: 1 },
    { s: 'Chemistry', q: 'Zinc reacts with dilute hydrochloric acid to produce:', o: ['Oxygen', 'Chlorine', 'Hydrogen', 'Carbon dioxide'], a: 2 },
    { s: 'Chemistry', q: 'The most abundant gas in the air is:', o: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], a: 2 },
    { s: 'Chemistry', q: 'The atomic number of an element is the number of:', o: ['neutrons', 'protons', 'shells', 'isotopes'], a: 1 },
    { s: 'Chemistry', q: 'The chemical formula of common salt is:', o: ['KCl', 'NaOH', 'NaCl', 'NaHCO₃'], a: 2 },
    { s: 'Chemistry', q: 'Which of these is a noble gas?', o: ['Chlorine', 'Neon', 'Nitrogen', 'Helium compounds'], a: 1 },
    { s: 'Chemistry', q: 'Water is formed when hydrogen burns in:', o: ['chlorine', 'oxygen', 'nitrogen', 'sulphur'], a: 1 },

    /* --- Biology --- */
    { s: 'Biology', q: 'The powerhouse of the cell is the:', o: ['ribosome', 'mitochondrion', 'nucleus', 'vacuole'], a: 1 },
    { s: 'Biology', q: 'Photosynthesis takes place mainly in the:', o: ['chloroplast', 'cell wall', 'cytoplasm', 'membrane'], a: 0 },
    { s: 'Biology', q: 'Which blood cells fight infection?', o: ['Red blood cells', 'Platelets', 'White blood cells', 'Plasma cells only'], a: 2 },
    { s: 'Biology', q: 'The largest organ of the human body is the:', o: ['Liver', 'Skin', 'Heart', 'Brain'], a: 1 },
    { s: 'Biology', q: 'The basic unit of life is the:', o: ['tissue', 'organ', 'cell', 'molecule'], a: 2 },
    { s: 'Biology', q: 'During photosynthesis, plants take in:', o: ['oxygen', 'nitrogen', 'carbon dioxide', 'hydrogen'], a: 2 },
    { s: 'Biology', q: 'The universal donor blood group is:', o: ['AB+', 'A', 'B', 'O'], a: 3 },
    { s: 'Biology', q: 'Cell division that produces two identical cells is:', o: ['meiosis', 'mitosis', 'fertilisation', 'binary fission'], a: 1 },

    /* --- Economics --- */
    { s: 'Economics', q: 'The fundamental economic problem is:', o: ['inflation', 'scarcity', 'unemployment', 'monopoly'], a: 1 },
    { s: 'Economics', q: 'Man-made factors of production are called:', o: ['land', 'labour', 'capital', 'entrepreneurship'], a: 2 },
    { s: 'Economics', q: 'A market where buyers and sellers meet is the:', o: ['factor market only', 'market', 'stock exchange', 'bank'], a: 1 },
    { s: 'Economics', q: 'The demand curve normally slopes:', o: ['upward', 'downward', 'horizontally', 'vertically'], a: 1 },
    { s: 'Economics', q: 'Goods that see demand rise as income rises are:', o: ['inferior goods', 'normal goods', 'substitute goods', 'public goods'], a: 1 },
    { s: 'Economics', q: 'The central bank of Nigeria is:', o: ['CBN', 'NDIC', 'SEC', 'NSE'], a: 0 },
    { s: 'Economics', q: 'The measure of the average level of prices is the:', o: ['index of retail prices', 'interest rate', 'exchange rate', 'budget'], a: 0 },
    { s: 'Economics', q: 'An economy that relies only on the public sector is a:', o: ['mixed economy', 'market economy', 'command economy', 'free economy'], a: 2 },

    /* --- Government --- */
    { s: 'Government', q: 'The arm of government that interprets the law is the:', o: ['executive', 'legislature', 'judiciary', 'civil service'], a: 2 },
    { s: 'Government', q: 'How many states does Nigeria have?', o: ['24', '30', '36', '37'], a: 2 },
    { s: 'Government', q: 'Local government is the ___ tier of government in Nigeria.', o: ['first', 'second', 'third', 'fourth'], a: 2 },
    { s: 'Government', q: 'Suffrage means the right to:', o: ['own property', 'vote', 'hold office', 'free speech'], a: 1 },
    { s: 'Government', q: 'Nigeria became a republic in:', o: ['1960', '1963', '1966', '1979'], a: 1 },
    { s: 'Government', q: 'A bicameral legislature has:', o: ['one chamber', 'two chambers', 'three chambers', 'no chamber'], a: 1 },
    { s: 'Government', q: 'The 1999 Constitution of Nigeria is the ___ constitution.', o: ['first', 'second', 'third', 'fourth'], a: 3 },
    { s: 'Government', q: 'The head of state and government of Nigeria is the:', o: ['President', 'Governor', 'Speaker', 'Chief Justice'], a: 0 },

    /* --- Geography --- */
    { s: 'Geography', q: 'The instrument used to measure atmospheric pressure is the:', o: ['thermometer', 'barometer', 'hygrometer', 'rain gauge'], a: 1 },
    { s: 'Geography', q: 'The line of latitude 0° is called the:', o: ['Tropic of Cancer', 'Equator', 'Prime Meridian', 'Tropic of Capricorn'], a: 1 },
    { s: 'Geography', q: 'The capital of Nigeria is:', o: ['Lagos', 'Abuja', 'Kano', 'Ibadan'], a: 1 },
    { s: 'Geography', q: 'The river that meets the Benue at Lokoja is the River:', o: ['Nile', 'Niger', 'Cross', 'Benue'], a: 1 },
    { s: 'Geography', q: 'Crude oil in Nigeria is found mainly in the:', o: ['Sahel', 'Niger Delta', 'Chad Basin', 'North Central'], a: 1 },
    { s: 'Geography', q: 'The largest ethnic group in Nigeria by population is the:', o: ['Yoruba', 'Igbo', 'Hausa-Fulani', 'Ijaw'], a: 2 },
    { s: 'Geography', q: 'Which of these is a non-renewable resource?', o: ['Solar energy', 'Wind', 'Crude oil', 'Water'], a: 2 },
    { s: 'Geography', q: 'The climate of the southern part of Nigeria is:', o: ['arid', 'tropical rainforest', 'sahel', 'temperate'], a: 1 },

    /* --- Literature-in-English --- */
    { s: 'Literature-in-English', q: 'Who wrote "Things Fall Apart"?', o: ['Wole Soyinka', 'Chinua Achebe', 'Ngugi wa Thiong\'o', 'Ben Okri'], a: 1 },
    { s: 'Literature-in-English', q: 'The protagonist of "Things Fall Apart" is:', o: ['Obierika', 'Okonkwo', 'Ekwefi', 'Nwoye'], a: 1 },
    { s: 'Literature-in-English', q: '"The wind whispered through the trees" is an example of:', o: ['simile', 'hyperbole', 'personification', 'alliteration'], a: 2 },
    { s: 'Literature-in-English', q: 'A poem of fourteen lines is a:', o: [' ode', 'elegy', 'sonnet', 'ballad'], a: 2 },
    { s: 'Literature-in-English', q: 'A comparison using "like" or "as" is a:', o: ['metaphor', 'simile', 'irony', 'synecdoche'], a: 1 },
    { s: 'Literature-in-English', q: 'Who wrote "The Lion and the Jewel"?', o: ['Christopher Okigbo', 'Wole Soyinka', 'J.P. Clark', 'Flora Nwapa'], a: 1 },
    { s: 'Literature-in-English', q: 'The author of "The Road Not Taken" is:', o: ['Robert Frost', 'William Wordsworth', 'Alfred Tennyson', 'Pablo Neruda'], a: 0 },
    { s: 'Literature-in-English', q: 'A prose narrative long enough to be published as a book is a:', o: ['novel', 'epic', 'lyric', 'proverb'], a: 0 },

    /* --- History --- */
    { s: 'History', q: 'Nigeria gained independence in:', o: ['1957', '1960', '1963', '1970'], a: 1 },
    { s: 'History', q: 'The amalgamation of the Northern and Southern Protectorates took place in:', o: ['1900', '1914', '1946', '1954'], a: 1 },
    { s: 'History', q: 'The first indigenous Governor-General of Nigeria was:', o: ['Nnamdi Azikiwe', 'Tafawa Balewa', 'John Macpherson', 'Nwafor Orizu'], a: 0 },
    { s: 'History', q: 'The Nigerian Civil War was fought between:', o: ['1966–1968', '1967–1970', '1970–1973', '1964–1966'], a: 1 },
    { s: 'History', q: 'The Sokoto Caliphate was founded by:', o: ['Usman dan Fodio', 'Muhammad Bello', 'Aliyu Bida', 'Attahiru Ahmadu'], a: 0 },
    { s: 'History', q: 'The first political party in Nigeria was the:', o: ['NCNC', 'AG', 'NPC', 'UMBC'], a: 0 },
    { s: 'History', q: 'Nigeria\'s capital moved from Lagos to Abuja in:', o: ['1979', '1986', '1991', '1999'], a: 2 },
    { s: 'History', q: 'The military coup that ended the First Republic occurred in:', o: ['1964', '1966', '1967', '1975'], a: 1 },

    /* --- Commerce --- */
    { s: 'Commerce', q: 'A written promise to pay a sum of money at a future date is a:', o: ['cheque', 'promissory note', 'invoice', 'bill of lading'], a: 1 },
    { s: 'Commerce', q: 'Insurance of goods against loss while being carried by sea is:', o: ['fire insurance', 'marine insurance', 'life insurance', 'burglary insurance'], a: 1 },
    { s: 'Commerce', q: 'A person who sells goods on behalf of another for a commission is an:', o: ['agent', 'broker', 'merchant', 'wholesaler'], a: 0 },
    { s: 'Commerce', q: 'A market with very few sellers is an:', o: ['perfect competition', 'oligopoly', 'monopoly', 'monopsony'], a: 1 },
    { s: 'Commerce', q: 'The Nigerian Stock Exchange is now known as the:', o: ['NSE', 'NGX', 'CBN', 'SEC'], a: 1 },
    { s: 'Commerce', q: 'Buying and selling of goods without changing their form is:', o: ['production', 'trade', 'distribution', 'retailing'], a: 1 },
    { s: 'Commerce', q: 'A document that shows the description and price of goods sent is the:', o: ['invoice', 'receipt', 'order', 'quotation'], a: 0 },
    { s: 'Commerce', q: 'The reward for an entrepreneur is:', o: ['wage', 'rent', 'profit', 'interest'], a: 2 }
  ];

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
      settings: { dailyGoal: 120, examDate: '' }
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

    ['#sSubject', '#timerSubject', '#qSubject', '#cSubject'].forEach((sel) => {
      const el = $(sel);
      const keep = el.value;
      el.innerHTML = any + opts;
      if (keep && db.subjects.some((s) => s.name === keep)) el.value = keep;
    });

    $('#subjectPresets').innerHTML = PRESETS.map((p) => '<option value="' + esc(p) + '">').join('');

    $('#sDay').innerHTML = DAYS_FULL.map((d, i) =>
      '<option value="' + i + '"' + (i === todayIndex() ? ' selected' : '') + '>' + d + '</option>').join('');
  }

  /* ---------------- Quiz ---------------- */

  const quiz = { pool: [], idx: 0, score: 0, answered: false, subject: '' };

  function poolFor(subject) {
    const builtIn = BANK.filter((q) => q.s === subject);
    const custom = db.questions.filter((q) => q.s === subject);
    return builtIn.concat(custom).map((q) => ({ s: q.s, q: q.q, o: q.o, a: q.a }));
  }

  function startQuiz() {
    const subject = $('#qSubject').value;
    const count = parseInt($('#qCount').value, 10);
    if (!subject) return;

    const pool = shuffle(poolFor(subject));
    if (!pool.length) {
      $('#qSubject').innerHTML = $('#qSubject').innerHTML; // no-op, keeps selection
      $('#quizSetup').insertAdjacentHTML('beforeend',
        '<p class="hint" id="noQ">No questions for ' + esc(subject) + ' yet — add your own below.</p>');
      setTimeout(() => { const n = $('#noQ'); if (n) n.remove(); }, 4000);
      return;
    }

    quiz.pool = pool.slice(0, Math.min(count, pool.length));
    quiz.idx = 0;
    quiz.score = 0;
    quiz.subject = subject;

    $('#quizSetup').hidden = true;
    $('#quizResult').hidden = true;
    $('#quizCard').hidden = false;
    renderQuestion();
  }

  function renderQuestion() {
    const item = quiz.pool[quiz.idx];
    quiz.answered = false;

    $('#qProgress').textContent = (quiz.idx + 1) + ' / ' + quiz.pool.length;
    $('#qScore').textContent = quiz.score + ' correct';
    $('#qSubjectLabel').textContent = item.s;
    $('#qText').textContent = item.q;
    $('#qBar').style.width = ((quiz.idx) / quiz.pool.length * 100) + '%';
    $('#qNext').disabled = true;
    $('#qNext').textContent = quiz.idx === quiz.pool.length - 1 ? 'See result' : 'Next question';

    $('#qOptions').innerHTML = item.o.map((text, i) =>
      '<li><button class="opt" data-opt="' + i + '">' +
        '<span class="opt-key">' + KEYS[i] + '</span>' +
        '<span class="opt-text">' + esc(text) + '</span>' +
      '</button></li>').join('');
  }

  function answer(i) {
    if (quiz.answered) return;
    quiz.answered = true;

    const item = quiz.pool[quiz.idx];
    const buttons = $$('#qOptions .opt');
    buttons.forEach((b) => { b.disabled = true; });

    if (i === item.a) {
      quiz.score++;
      buttons[i].classList.add('correct');
    } else {
      buttons[i].classList.add('wrong');
      buttons[item.a].classList.add('correct');
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
      finishQuiz();
    }
  }

  function finishQuiz() {
    const total = quiz.pool.length;
    const pct = Math.round((quiz.score / total) * 100);

    db.quiz_results.unshift({
      id: uid('qr'),
      date: isoDate(new Date()),
      subject: quiz.subject,
      correct: quiz.score,
      total: total
    });
    db.quiz_results = db.quiz_results.slice(0, 60);
    save();

    $('#quizCard').hidden = true;
    $('#quizResult').hidden = false;
    $('#rScore').textContent = pct + '%';
    $('#rText').textContent = 'You got ' + quiz.score + ' out of ' + total + ' in ' + quiz.subject + '. ' +
      (pct >= 80 ? 'Excellent — keep it sharp.' : pct >= 50 ? 'Solid base. Review the ones you missed.' : 'Worth another pass before you move on.');

    renderStats();
    renderHistory();
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
    $('#startQuiz').addEventListener('click', startQuiz);
    $('#qOptions').addEventListener('click', (e) => {
      const b = e.target.closest('[data-opt]');
      if (b) answer(parseInt(b.dataset.opt, 10));
    });
    $('#qNext').addEventListener('click', nextQuestion);
    $('#qQuit').addEventListener('click', () => {
      $('#quizCard').hidden = true;
      $('#quizSetup').hidden = false;
    });
    $('#rAgain').addEventListener('click', () => { $('#quizResult').hidden = true; startQuiz(); });
    $('#rHome').addEventListener('click', () => { $('#quizResult').hidden = true; $('#quizSetup').hidden = false; });

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

  function renderAll() {
    fillSubjectSelects();
    renderStats();
    renderToday();
    renderChart();
    renderProgress();
    renderWeekGrid();
    renderSubjects();
    renderHistory();
    paintTimer();
  }

  function init() {
    $('#year').textContent = new Date().getFullYear();
    wire();
    renderAll();

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
