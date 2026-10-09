// NVR Coding — lesson engine
let lesson = null, stepIdx = 0, quizSolved = false, attempts = 0;

const $ = id => document.getElementById(id);

async function init() {
  const id = new URLSearchParams(location.search).get('lesson') || 't0l1';
  const data = window.LESSONS;
  for (const t of data.tracks) {
    const found = t.lessons.find(l => l.id === id);
    if (found) { lesson = found; break; }
  }
  if (!lesson) { $('lessonArea').innerHTML = '<h2>Lesson not found 😅</h2><a class="btn ghost" href="index.html">Home</a>'; return; }
  document.title = lesson.title + ' — NVR Coding';
  renderStep();
  $('prevBtn').onclick = () => { if (stepIdx > 0) { stepIdx--; quizSolved = true; renderStep(); } };
  $('nextBtn').onclick = onNext;
}

function renderStep() {
  const s = lesson.steps[stepIdx];
  $('stepCounter').textContent = `Step ${stepIdx + 1} of ${lesson.steps.length}`;
  $('progressBar').style.width = ((stepIdx + 1) / lesson.steps.length * 100) + '%';
  $('prevBtn').disabled = stepIdx === 0;
  $('nextBtn').disabled = (s.type === 'quiz' && !s._solved);

  if (s.type === 'text') {
    $('lessonArea').innerHTML = `
      <h2>${s.heading}</h2>
      <p>${s.body}</p>
      ${s.analogy ? `<div class="analogy">🍳 <b>Analogy:</b> ${s.analogy}</div>` : ''}`;
  } else if (s.type === 'quiz') {
    $('lessonArea').innerHTML = `
      <h2>Quick recall 🎯</h2>
      <p>${s.question}</p>
      ${s.options.map((o, i) => `<button class="quiz-opt" data-i="${i}">${o}</button>`).join('')}
      <p class="feedback" id="fb"></p>`;
    document.querySelectorAll('.quiz-opt').forEach(btn => btn.onclick = () => answerQuiz(+btn.dataset.i, s));
  } else if (s.type === 'code') {
    $('lessonArea').innerHTML = `
      <h2>${s.heading}</h2>
      <p>${s.body}</p>
      <textarea class="code-editor" id="editor" spellcheck="false">${s.starter}</textarea>
      <button class="btn primary" id="runBtn">▶ Run</button>
      <pre class="console" id="out">Output will appear here…</pre>`;
    $('runBtn').onclick = () => runCode();
    quizSolved = true; // code steps unlock freely
    $('nextBtn').disabled = false;
  } else if (s.type === 'write') {
    $('lessonArea').innerHTML = `
      <h2>${s.heading}</h2>
      <p>${s.body}</p>
      <p class="analogy">✍️ Write from memory — blank editor. I'll check your output live.</p>
      <textarea class="code-editor" id="editor" spellcheck="false" placeholder="// Type your code here..."></textarea>
      <button class="btn primary" id="runBtn">▶ Run & Check</button>
      <pre class="console" id="out">Output will appear here…</pre>
      <p class="feedback" id="fb"></p>`;
    attempts = 0;
    $('runBtn').onclick = () => checkWrite(s);
    $('nextBtn').disabled = false; // skip is always allowed — no frustration walls
  }
}

function answerQuiz(i, s) {
  const btns = document.querySelectorAll('.quiz-opt');
  btns.forEach(b => b.disabled = true);
  if (i === s.answer) {
    btns[i].classList.add('correct');
    $('fb').className = 'feedback ok';
    $('fb').textContent = '✅ Yes! ' + s.explain;
    quizSolved = true;
    s._solved = true;
    $('nextBtn').disabled = false;
    addXP(10);
    scheduleReview(s);
  } else {
    btns[i].classList.add('wrong');
    $('fb').className = 'feedback err';
    $('fb').textContent = '🌱 Not quite — errors are data! Read the explanation and try the right one.' + ' ' + s.hint;
    setTimeout(() => { btns.forEach(b => { b.disabled = false; b.classList.remove('wrong'); }); $('fb').textContent = ''; }, 2200);
  }
}

function checkWrite(s) {
  attempts++;
  const code = document.getElementById('editor').value;
  const out = [];
  try {
    new Function('console', code)({ log: (...a) => out.push(a.join(' ')) });
  } catch (e) {
    $('out').textContent = '🐛 ' + e.message;
    $('fb').className = 'feedback err';
    $('fb').textContent = '🌱 Read that error slowly — it tells you exactly where to look. Errors are data.';
    return;
  }
  const printed = out.join('\n');
  $('out').textContent = printed || '(no output — did you use console.log? 😉)';
  const okOutput = s.expected ? printed.toLowerCase().includes(s.expected.toLowerCase()) : true;
  const okIncludes = (s.mustInclude || []).every(t => code.includes(t));
  if (okOutput && okIncludes) {
    $('fb').className = 'feedback ok';
    $('fb').textContent = '🎉 Exactly right! You wrote it yourself — that’s real learning. +20 XP';
    addXP(20);
    celebrate();
    s._solved = true;
    store.set('writes', store.get('writes', 0) + 1);
    document.getElementById('runBtn').disabled = true;
  } else if (attempts >= 2) {
    $('fb').className = 'feedback err';
    $('fb').textContent = '🌱 Hint: ' + s.hint + ' — one more try, you’ve got it!';
  } else {
    $('fb').className = 'feedback err';
    $('fb').textContent = '👀 Close! Check spelling, quotes, and the console.log part. You can also press Next and come back.';
  }
}

function runCode() {
  const out = [];
  const fakeConsole = { log: (...a) => out.push(a.join(' ')) };
  try {
    new Function('console', document.getElementById('editor').value)(fakeConsole);
    $('out').textContent = out.join('\n') || '(no output — did you use console.log? 😉)';
  } catch (e) {
    $('out').textContent = '🐛 ' + e.message + '\nNo worries — read it slowly. That’s the skill.';
  }
}

function onNext() {
  if (stepIdx < lesson.steps.length - 1) {
    stepIdx++;
    quizSolved = lesson.steps[stepIdx].type !== 'quiz';
    renderStep();
  } else {
    // Lesson complete!
    markDone(lesson.id);
    addXP(25);
    celebrate();
    const allDone = store.get('done', []);
    let nextId = null;
    for (const t of window.LESSONS.tracks) {
      const i = t.lessons.findIndex(l => l.id === lesson.id);
      if (i >= 0 && i < t.lessons.length - 1) { nextId = t.lessons[i + 1].id; break; }
    }

    $('lessonArea').innerHTML = `
      <h2>🎉 Lesson complete!</h2>
      <p>You showed up, you recalled, you built. That's exactly how the brain learns.</p>
      <p class="analogy">Come back tomorrow for your streak 🔥 and your spaced review.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">
        <a class="btn primary" href="index.html">Back to roadmap</a>
        ${nextId ? `<a class="btn ghost" href="lesson.html?lesson=${nextId}">Next lesson →</a>` : '<span class="pill">🏁 You finished the whole track!</span>'}
      </div>`;
    $('nextBtn').disabled = true;
    $('nextBtn').style.display = 'none';
    $('prevBtn').style.display = 'none';
    $('progressBar').style.width = '100%';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  init();
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight' && !document.getElementById('nextBtn').disabled) onNext();
    if (e.key === 'ArrowLeft' && stepIdx > 0) { stepIdx--; renderStep(); }
  });
});
