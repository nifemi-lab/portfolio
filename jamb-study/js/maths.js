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

  /* ---- quiz state (drill on screen 3) ---- */
  const state = { topic: null, qs: [], qi: 0, score: 0, answered: false, ended: false };
  let session = null, written = false;
  const runStreak = {};            // consecutive corrects per topic, this session

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

  /* ---- screen 3: the drill ---- */
  function startQuiz(topic) {
    state.topic = topic;
    state.qs = questionsFor(topic);
    state.qi = 0;
    state.score = 0;
    state.answered = false;
    state.ended = false;
    session = { start: Date.now(), perTopic: {} };
    written = false;
    Object.keys(runStreak).forEach(k => delete runStreak[k]);
    $('#quizEyebrow').textContent = 'Practice · ' + topic;
    showScreen('screen-quiz');
    renderQuestion();
  }

  function renderQuestion() {
    const item = state.qs[state.qi];
    state.answered = false;
    state.ended = false;
    $('#qCount').textContent = 'Question ' + (state.qi + 1) + ' of ' + state.qs.length;
    $('#qBar').style.width = (state.qi / state.qs.length) * 100 + '%';
    $('#qText').textContent = item.q;
    $('#qSolution').hidden = true;
    $('#nextBtn').hidden = true;
    $('#skipRow').hidden = false;
    $('#skipBtn').hidden = false;
    $('#explainBtn').hidden = !LESSONS[item.q];
    const wrap = $('#qOpts');
    wrap.innerHTML = '';
    item.o.forEach((opt, i) => {
      const b = document.createElement('button');
      b.className = 'opt';
      b.type = 'button';
      b.innerHTML = '<span class="key">' + 'ABCD'[i] + '</span><span>' + esc(opt) + '</span>';
      b.addEventListener('click', () => answer(i, b));
      wrap.appendChild(b);
    });
  }

  function perTopic() {
    return session.perTopic[state.topic] || (session.perTopic[state.topic] = { correct: 0, total: 0 });
  }

  function bumpMastery(correct) {
    const m = mastery();
    const e = m[state.topic] || { seen: 0, correct: 0, bestStreak: 0 };
    e.seen += 1;
    if (correct) {
      e.correct += 1;
      runStreak[state.topic] = (runStreak[state.topic] || 0) + 1;
      if (runStreak[state.topic] > e.bestStreak) e.bestStreak = runStreak[state.topic];
    } else {
      runStreak[state.topic] = 0;
    }
    e.updatedAt = new Date().toISOString();
    m[state.topic] = e;
    saveMastery(m);
    paintHeader();
  }

  function recordMistake(item) {
    const d = db(); const i = d.missed.findIndex(m => m.q === item.q);
    if (i !== -1) { d.missed[i].hits += 1; d.missed[i].last = isoDate(new Date()); }
    else d.missed.push({ s: item.s, q: item.q, o: item.o, a: item.a, hits: 1, last: isoDate(new Date()) });
    d.missed = d.missed.slice(0, 60);
    saveDB(d); paintHeader();
  }

  function showToast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 1200);
  }

  function answer(i, btn) {
    const item = state.qs[state.qi];
    const correct = i === item.a;
    state.answered = true;
    document.querySelectorAll('#qOpts .opt').forEach((b, j) => {
      b.disabled = true;
      if (j === item.a) b.classList.add('correct');
    });
    if (!correct) btn.classList.add('wrong');
    const sol = $('#qSolution');
    sol.className = 'card solution ' + (correct ? 'good' : 'bad');
    $('#solTitle').textContent = correct ? '✓ Why that is the answer' : '✗ How to work it out';
    $('#solBody').textContent = item.e || (SOLS[item.q] || {}).e;
    sol.hidden = false;
    $('#nextBtn').hidden = false;
    $('#skipBtn').hidden = true;
    perTopic().total += 1;
    if (correct) {
      state.score += 1;
      perTopic().correct += 1;
      showToast('+10 XP');
    } else {
      recordMistake(item);
    }
    bumpMastery(correct);
  }

  function skipQuestion() {
    if (state.answered || state.ended) return;
    const item = state.qs[state.qi];
    state.answered = true;
    perTopic().total += 1;
    recordMistake(item);
    bumpMastery(false);
    nextQuestion();
  }

  function nextQuestion() {
    if (state.qi < state.qs.length - 1) { state.qi += 1; renderQuestion(); return; }
    /* end state */
    state.ended = true;
    $('#qBar').style.width = '100%';
    $('#qCount').textContent = 'Done · ' + state.score + ' of ' + state.qs.length + ' correct';
    $('#qText').textContent = state.score === state.qs.length
      ? 'Clean sweep. This topic ring just moved.'
      : 'Session complete — missed ones joined your mistake queue.';
    $('#qOpts').innerHTML = '';
    $('#qSolution').hidden = true;
    $('#skipRow').hidden = true;
    const nb = $('#nextBtn');
    nb.textContent = 'Back to the map';
    nb.hidden = false;
  }

  function finishSession() {
    if (written) return;
    written = true;
    if (!Object.keys(session.perTopic).length) return;
    const d = db(); const mins = Math.max(1, Math.round((Date.now() - session.start) / 60000));
    Object.keys(session.perTopic).forEach(topic => {
      const c = session.perTopic[topic];
      d.quiz_results.unshift({ id: uid('qr'), date: isoDate(new Date()), subject: SUBJECT, topic: topic, correct: c.correct, total: c.total, mode: 'practice' });
    });
    d.quiz_results = d.quiz_results.slice(0, 60);
    d.logs.push({ id: uid('log'), date: isoDate(new Date()), subject: SUBJECT, minutes: mins, sessionId: null, source: 'dojo' });
    saveDB(d); paintHeader();
  }

  function backToMap() {
    finishSession();
    $('#nextBtn').textContent = 'Next question';
    renderMap();
    showScreen('screen-map');
  }

  /* ---- scientific calculator with step log ---- */
  const CALC_KEYS = [
    { k: 'C', cls: 'clr', act: 'clear' }, { k: 'DEL', act: 'del' }, { k: '(', ins: '(' }, { k: ')', ins: ')' }, { k: '^', ins: '^', cls: 'op', show: '˄' },
    { k: 'sin', ins: 'sin(', cls: 'fn' }, { k: 'cos', ins: 'cos(', cls: 'fn' }, { k: 'tan', ins: 'tan(', cls: 'fn' }, { k: 'log', ins: 'log(', cls: 'fn', show: 'log₁₀' }, { k: 'ln', ins: 'ln(', cls: 'fn' },
    { k: '7', ins: '7' }, { k: '8', ins: '8' }, { k: '9', ins: '9' }, { k: '√', ins: 'sqrt(', cls: 'op' }, { k: 'x²', act: 'square', cls: 'op' },
    { k: '4', ins: '4' }, { k: '5', ins: '5' }, { k: '6', ins: '6' }, { k: '×', ins: '*', cls: 'op' }, { k: '÷', ins: '/', cls: 'op' },
    { k: '1', ins: '1' }, { k: '2', ins: '2' }, { k: '3', ins: '3' }, { k: '+', ins: '+', cls: 'op' }, { k: '−', ins: '-', cls: 'op' },
    { k: '0', ins: '0' }, { k: '.', ins: '.' }, { k: 'π', ins: 'pi', cls: 'op' }, { k: '1/x', act: 'recip', cls: 'op' }, { k: '=', act: 'equals', cls: 'eq' }
  ];
  let calcExpr = '';

  const calcKeysWrap = $('#calcKeys');
  CALC_KEYS.forEach(key => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = key.show || key.k;
    if (key.cls) b.className = key.cls;
    b.addEventListener('click', () => calcPress(key));
    calcKeysWrap.appendChild(b);
  });

  function calcPress(key) {
    const ansEl = $('#calcAns');
    if (key.act === 'clear') { calcExpr = ''; ansEl.textContent = ' '; renderCalc(); return; }
    if (key.act === 'del') { calcExpr = calcExpr.slice(0, -1); renderCalc(); return; }
    if (key.act === 'square') { calcExpr = '(' + calcExpr + ')^2'; renderCalc(); return; }
    if (key.act === 'recip') { calcExpr = '1/(' + calcExpr + ')'; renderCalc(); return; }
    if (key.act === 'equals') { calcSolve(); return; }
    calcExpr += key.ins;
    renderCalc();
  }

  function pretty(src) {
    return src.replace(/\*/g, '×').replace(/\//g, '÷').replace(/sqrt/g, '√').replace(/pi/g, 'π');
  }
  function fmt(n) {
    if (!isFinite(n)) throw Error('undefined');
    return Math.abs(n - Math.round(n)) < 1e-10 ? String(Math.round(n)) : String(+n.toFixed(6));
  }
  function renderCalc() {
    $('#calcExpr').textContent = pretty(calcExpr) || ' ';
  }

  function evaluate(src) {
    let pos = 0;
    const steps = [];
    const peek = () => src[pos];
    function expr() {
      let v = term();
      while (peek() === '+' || peek() === '-') {
        const op = src[pos++], r = term(), res = op === '+' ? v + r : v - r;
        steps.push(fmt(v) + ' ' + op + ' ' + fmt(r) + ' = ' + fmt(res));
        v = res;
      }
      return v;
    }
    function term() {
      let v = power();
      while (peek() === '*' || peek() === '/') {
        const op = src[pos++], r = power(), res = op === '*' ? v * r : v / r;
        steps.push(fmt(v) + ' ' + (op === '*' ? '×' : '÷') + ' ' + fmt(r) + ' = ' + fmt(res));
        v = res;
      }
      return v;
    }
    function power() {
      const base = unary();
      if (peek() === '^') {
        pos++;
        const ex = power(), res = Math.pow(base, ex);
        steps.push(fmt(base) + '^' + fmt(ex) + ' = ' + fmt(res));
        return res;
      }
      return base;
    }
    function unary() {
      if (peek() === '-') { pos++; return -unary(); }
      return atom();
    }
    function atom() {
      if (peek() === '(') {
        pos++;
        const v = expr();
        if (peek() !== ')') throw Error('missing )');
        pos++;
        return v;
      }
      const num = /^[0-9]*\.?[0-9]+/.exec(src.slice(pos));
      if (num) { pos += num[0].length; return parseFloat(num[0]); }
      if (src.startsWith('pi', pos)) { pos += 2; return Math.PI; }
      const fn = /^(sin|cos|tan|log|ln|sqrt)\(/.exec(src.slice(pos));
      if (fn) {
        pos += fn[0].length;
        const arg = expr();
        if (peek() !== ')') throw Error('missing )');
        pos++;
        const f = fn[1];
        let res;
        const rad = arg * Math.PI / 180;
        if (f === 'sin') res = Math.sin(rad);
        else if (f === 'cos') res = Math.cos(rad);
        else if (f === 'tan') res = Math.tan(rad);
        else if (f === 'log') res = Math.log10(arg);
        else if (f === 'ln') res = Math.log(arg);
        else res = Math.sqrt(arg);
        steps.push((f === 'sqrt' ? '√' : f) + '(' + fmt(arg) + ') = ' + fmt(res));
        return res;
      }
      throw Error('bad input');
    }
    const value = expr();
    if (pos < src.length) throw Error('unexpected ' + src[pos]);
    return { value: value, steps: steps };
  }

  function calcSolve() {
    const ansEl = $('#calcAns');
    const stepsEl = $('#calcSteps');
    if (!calcExpr) { ansEl.textContent = ' '; stepsEl.hidden = true; return; }
    try {
      const out = evaluate(calcExpr);
      ansEl.textContent = fmt(out.value);
      ansEl.classList.remove('err');
      if ($('#workToggle').checked && out.steps.length) {
        stepsEl.innerHTML = out.steps.map(s => '<p>' + s + '</p>').join('') + '<p class="final">= ' + fmt(out.value) + '</p>';
        stepsEl.hidden = false;
      } else {
        stepsEl.hidden = true;
      }
      calcExpr = fmt(out.value);
      renderCalc();
    } catch (err) {
      ansEl.textContent = 'Error';
      ansEl.classList.add('err');
      stepsEl.hidden = true;
    }
  }

  /* ---- explain side (teach-first: idea -> steps one by one -> trap check) ---- */
  let xRevealed = 0;
  let explainFinishing = false;

  function openExplain() {
    const item = state.qs[state.qi];
    const L = LESSONS[item.q];
    if (!L) return;
    explainFinishing = false;
    $('#xEyebrow').textContent = 'Explain · Question ' + (state.qi + 1) + ' of ' + state.qs.length;
    $('#xQuestion').textContent = item.q;
    $('#xIdea').innerHTML = '<p>' + L.idea + '</p>';
    $('#xSteps').innerHTML = L.steps.map(s => '<li hidden>' + s + '</li>').join('');
    $('#xBoard').innerHTML = L.board.map((l, i) =>
      '<p' + (i === L.board.length - 1 ? ' class="ans"' : '') + '>' + l + '</p>').join('');
    $('#xBoard').hidden = true;
    $('#xBoardLabel').hidden = true;
    $('#xTrap').innerHTML = '<b>Trap check:</b> ' + L.trap;
    $('#xTrap').hidden = true;
    $('#xBack').hidden = true;
    xRevealed = 0;
    revealStep();
    $('#explainBackdrop').hidden = false;
    const p = $('#explainPanel');
    p.hidden = false;
    requestAnimationFrame(() => {
      $('#explainBackdrop').classList.add('open');
      p.classList.add('open');
    });
    $('#xClose').focus();
  }

  function closeExplain() {
    $('#explainBackdrop').classList.remove('open');
    const p = $('#explainPanel');
    p.classList.remove('open');
    clearTimeout(closeExplain.t);
    closeExplain.t = setTimeout(() => {
      p.hidden = true;
      $('#explainBackdrop').hidden = true;
      const trig = $('#explainBtn');
      if (trig && !trig.hidden) trig.focus();
    }, 320);
  }

  /* Finishing an explanation moves you on: an unanswered question joins the
     mistake queue (retry it later), then the next question loads. */
  function finishExplain() {
    if (explainFinishing) return;
    explainFinishing = true;
    const unanswered = !state.answered;
    closeExplain();
    if (unanswered) {
      perTopic().total += 1;
      recordMistake(state.qs[state.qi]);
      bumpMastery(false);
      showToast('Added to your mistake queue');
    }
    setTimeout(nextQuestion, 200);
  }

  function revealStep() {
    const items = document.querySelectorAll('#xSteps li');
    if (xRevealed < items.length) {
      items[xRevealed].hidden = false;
      xRevealed++;
    }
    const done = xRevealed >= items.length;
    $('#xNextStep').hidden = done;
    $('#xBack').hidden = !done;
    if (done) {
      $('#xBoard').hidden = false;
      $('#xBoardLabel').hidden = false;
      $('#xTrap').hidden = false;
    }
    const body = document.querySelector('.explain-body');
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
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
  $('#nextBtn').addEventListener('click', () => state.ended ? backToMap() : nextQuestion());
  $('#skipBtn').addEventListener('click', skipQuestion);
  $('#calcToggle').addEventListener('click', () => {
    const panel = $('#calcPanel');
    panel.classList.toggle('open');
    $('#calcToggle').textContent = panel.classList.contains('open') ? 'Hide calculator' : 'Calculator';
  });

  $('#explainBtn').addEventListener('click', openExplain);
  $('#xClose').addEventListener('click', closeExplain);
  $('#explainBackdrop').addEventListener('click', closeExplain);
  $('#xNextStep').addEventListener('click', revealStep);
  $('#xBack').addEventListener('click', closeExplain);
  $('#xFinish').addEventListener('click', finishExplain);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !$('#explainPanel').hidden) closeExplain();
  });

  window.DOJO = {
    state: state, showScreen: showScreen, openTopic: openTopic, renderMap: renderMap,
    questionsFor: questionsFor, topicStats: topicStats, paintHeader: paintHeader,
    startQuiz: startQuiz, nextQuestion: nextQuestion, finishSession: finishSession, showToast: showToast,
    mastery: mastery, saveMastery: saveMastery, db: db, saveDB: saveDB,
    uid: uid, isoDate: isoDate, esc: esc
  };
})();
