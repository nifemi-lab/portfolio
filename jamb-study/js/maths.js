/* Maths Dojo — standalone page logic. Shares the tracker's localStorage
   shape (jamb_study_db_v1::<profile>) and design tokens; loads no app.js. */
(function () {
  'use strict';
  const SUBJECT = 'Mathematics';
  const STORE_BASE = 'jamb_study_db_v1';
  const PROFILES_KEY = 'jamb_study_profiles_v1';
  const MASTERY_BASE = 'jamb_study_maths_mastery_v1';

  /* ---- profile + storage (mirrors app.js) ---- */
  function activeProfile() {
    try {
      const p = JSON.parse(localStorage.getItem(PROFILES_KEY) || 'null');
      if (p && Array.isArray(p.list) && p.list.length) {
        return p.list.some(x => x.id === p.active) ? p.active : p.list[0].id;
      }
    } catch (e) { /* storage blocked */ }
    return 'me';
  }
  const PID = activeProfile();
  const DB_KEY = STORE_BASE + '::' + PID;
  const MASTERY_KEY = MASTERY_BASE + '::' + PID;

  let memoryDB = null;               // used when localStorage is blocked
  function readJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || 'null') || fallback; }
    catch (e) { return fallback; }
  }
  function writeJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch (e) { return false; }
  }
  function db() {
    if (memoryDB) return memoryDB;
    const d = readJSON(DB_KEY, null);
    if (!d) { memoryDB = { logs: [], quiz_results: [], missed: [], questions: [], settings: {} }; return memoryDB; }
    /* normalise only what the dojo touches; never clobber other tables */
    if (!Array.isArray(d.logs)) d.logs = [];
    if (!Array.isArray(d.quiz_results)) d.quiz_results = [];
    if (!Array.isArray(d.missed)) d.missed = [];
    if (!d.settings || typeof d.settings !== 'object') d.settings = {};
    return d;
  }
  function saveDB(d) { if (!writeJSON(DB_KEY, d)) memoryDB = d; }
  function mastery() { return readJSON(MASTERY_KEY, {}); }
  function saveMastery(m) { writeJSON(MASTERY_KEY, m); }

  const uid = p => p + '_' + Math.random().toString(36).slice(2, 9);
  function isoDate(d) {
    const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  /* ---- data ---- */
  const SYL = (window.SYLLABUS || {})[SUBJECT] || [];
  const Q_TOPIC = ((window.Q_TOPIC || {})[SUBJECT]) || {};
  const BANK = (window.QUESTION_BANK || []).filter(q => q.s === SUBJECT);
  const SOLS = (window.SOLUTIONS || {})[SUBJECT] || {};
  const LESSONS = (window.LESSONS || {})[SUBJECT] || {};
  const NOTES = (window.LESSON_NOTES || {})[SUBJECT] || {};
  function questionsFor(topic) { return BANK.filter(q => Q_TOPIC[q.q] === topic); }

  const $ = sel => document.querySelector(sel);
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  /* XP = 10 × corrects across the mastery map; streak = tracker's streakDays() over db.logs minutes */
  function xpTotal() { const m = mastery(); return Object.keys(m).reduce((s, t) => s + (m[t].correct || 0), 0) * 10; }
  function minutesOn(iso) { return db().logs.filter(l => l.date === iso).reduce((s, l) => s + (l.minutes || 0), 0); }
  function streakDays() {
    let streak = 0; const d = new Date();
    if (minutesOn(isoDate(d)) === 0) d.setDate(d.getDate() - 1);
    while (minutesOn(isoDate(d)) > 0) { streak++; d.setDate(d.getDate() - 1); }
    return streak;
  }

  /* ---- theme + header ---- */
  function applyTheme() {
    const theme = db().settings.theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    const btn = $('#themeToggle');
    if (btn) {
      btn.textContent = theme === 'light' ? '☾' : '☀';
      btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    }
  }
  function paintHeader() {
    $('#streakVal').textContent = streakDays();
    const xp = xpTotal();
    $('#xpVal').textContent = xp;
    $('#lvlVal').textContent = 1 + Math.floor(xp / 100);
  }

  /* ---- quiz state (filled by the drill in part 2) ---- */
  const state = { topic: null, qs: [], qi: 0, score: 0 };

  /* ---- screens ---- */
  const SCREENS = ['screen-map', 'screen-topic', 'screen-quiz'];
  function showScreen(id) {
    SCREENS.forEach(s => { $('#' + s).hidden = s !== id; });
    window.scrollTo({ top: 0 });
  }

  /* ---- mastery helpers ---- */
  function topicStats(topic) {
    const m = (mastery()[topic]) || {};
    const seen = m.seen || 0, correct = m.correct || 0;
    return {
      seen, correct,
      pct: seen ? Math.round(correct / seen * 100) : 0,
      best: m.bestStreak || 0
    };
  }
  function sectionOf(topic) {
    for (const sec of SYL) if (sec.topics.indexOf(topic) !== -1) return sec.name;
    return SUBJECT;
  }
  function ringHTML(seen, pct, big) {
    const cls = ['ring'];
    if (big) cls.push('big');
    if (seen && pct < 40) cls.push('warn');
    const label = seen ? pct + '% mastery' : 'Not practised yet';
    return '<span class="' + cls.join(' ') + '" style="--p:' + (seen ? pct : 0) + '" role="img" aria-label="' + label + '"></span>';
  }

  /* ---- screen 1: syllabus map ---- */
  function renderWeak() {
    const m = mastery();
    const rows = Object.keys(m)
      .map(t => {
        const seen = m[t].seen || 0, correct = m[t].correct || 0;
        return { t: t, seen: seen, pct: seen ? Math.round(correct / seen * 100) : 0 };
      })
      .filter(r => r.seen >= 3)
      .sort((a, b) => a.pct - b.pct)
      .slice(0, 3);
    const card = $('#weakCard');
    if (rows.length < 3) { card.hidden = true; return; }
    $('#weakRows').innerHTML = rows.map(r =>
      '<div class="weak-row"><span class="name">' + esc(r.t) + '</span>' +
      '<span class="bar"><span style="width:' + r.pct + '%"></span></span>' +
      '<span class="pct">' + r.pct + '%</span></div>').join('');
    card.hidden = false;
  }

  function renderMap() {
    renderWeak();
    const wrap = $('#sections');
    wrap.innerHTML = '';
    SYL.forEach((sec, i) => {
      const started = sec.topics.filter(t => topicStats(t).seen > 0).length;
      const el = document.createElement('div');
      el.className = 'section' + (i === 0 ? ' is-open' : '');
      el.innerHTML =
        '<button class="section-head" type="button" aria-expanded="' + (i === 0) + '">' +
          '<span>' + esc(sec.name) + '</span>' +
          '<span class="count">' + started + '/' + sec.topics.length + ' started</span>' +
          '<span class="caret" aria-hidden="true">▸</span>' +
        '</button>' +
        '<div class="topic-list"' + (i === 0 ? '' : ' hidden') + '>' +
          sec.topics.map(name => {
            const s = topicStats(name);
            return '<button class="topic" type="button" data-topic="' + esc(name) + '">' +
              ringHTML(s.seen, s.pct, false) +
              '<span class="t-main">' +
                '<span class="t-name">' + esc(name) + '</span><br>' +
                '<span class="t-meta">' + (s.seen ? s.seen + ' questions drilled' : 'Not practised yet') + '</span>' +
              '</span>' +
              '<span class="t-pct">' + (s.seen ? s.pct + '%' : '') + '</span>' +
            '</button>';
          }).join('') +
        '</div>';
      wrap.appendChild(el);

      const head = el.querySelector('.section-head');
      head.addEventListener('click', () => {
        el.classList.toggle('is-open');
        const open = el.classList.contains('is-open');
        el.querySelector('.topic-list').hidden = !open;
        head.setAttribute('aria-expanded', open);
      });
      el.querySelectorAll('.topic').forEach(b =>
        b.addEventListener('click', () => openTopic(b.dataset.topic)));
    });
  }

  /* ---- screen 2: topic page ---- */
  function openTopic(topic) {
    const s = topicStats(topic);
    const qs = questionsFor(topic);
    const note = NOTES[topic];
    const el = $('#screen-topic');
    let html =
      '<p class="topic-back"><button class="linklike" type="button" id="backToMap">← All topics</button></p>' +
      '<div class="page-head">' +
        '<p class="eyebrow">' + esc(sectionOf(topic)) + '</p>' +
        '<h1>' + esc(topic) + '</h1>' +
      '</div>' +
      '<div class="card topic-hero">' +
        ringHTML(s.seen, s.pct, true) +
        '<div class="stats">' +
          '<div class="stat-line"><span>Mastery</span><b>' + (s.seen ? s.pct + '%' : '—') + '</b></div>' +
          '<div class="stat-line"><span>Accuracy</span><b>' + (s.seen ? s.correct + ' / ' + s.seen : '—') + '</b></div>' +
          '<div class="stat-line"><span>Questions drilled</span><b>' + s.seen + '</b></div>' +
          '<div class="stat-line"><span>Best streak</span><b>' + s.best + '</b></div>' +
        '</div>' +
        '<button class="btn btn-primary block" type="button" id="practiceBtn"' + (qs.length ? '' : ' disabled') + '>Practice this topic</button>' +
      '</div>';

    if (note) {
      html += '<div class="card"><p class="eyebrow">Quick note</p><div class="note-body">' + note.note + '</div></div>';
      if (note.example) {
        html += '<div class="card">' +
          '<p class="eyebrow">Worked example</p>' +
          '<h2 style="font-size:1.05rem">' + esc(note.example.title) + '</h2>' +
          '<ol class="steps">' + note.example.steps.map(st => '<li>' + st + '</li>').join('') + '</ol>' +
        '</div>';
      }
    }
    if (!qs.length) {
      html += '<div class="card">' +
        '<p class="eyebrow">Lesson coming soon</p>' +
        '<p class="muted">No questions tagged for this topic yet — it is on the list for a future bank update.</p>' +
      '</div>';
    }
    el.innerHTML = html;

    $('#backToMap').addEventListener('click', () => showScreen('screen-map'));
    const pb = $('#practiceBtn');
    if (pb && qs.length) pb.addEventListener('click', () => { if (window.DOJO.startQuiz) window.DOJO.startQuiz(topic); });
    showScreen('screen-topic');
  }

  /* ---- init ---- */
  applyTheme();
  paintHeader();
  renderMap();

  $('#themeToggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    const d = db();
    d.settings.theme = next;
    saveDB(d);
    applyTheme();
  });

  window.DOJO = {
    state: state, showScreen: showScreen, openTopic: openTopic, renderMap: renderMap,
    questionsFor: questionsFor, topicStats: topicStats, paintHeader: paintHeader,
    mastery: mastery, saveMastery: saveMastery, db: db, saveDB: saveDB,
    uid: uid, isoDate: isoDate, esc: esc
  };
})();
