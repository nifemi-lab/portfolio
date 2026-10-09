// NVR Coding — shared state: XP, streaks, progress (localStorage)
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem('nvr_' + k)) ?? d; } catch { return d; } },
  set(k, v) { localStorage.setItem('nvr_' + k, JSON.stringify(v)); }
};

function renderPills() {
  const xp = store.get('xp', 0), streak = store.get('streak', 0);
  const x = document.getElementById('xpPill'), s = document.getElementById('streakPill');
  if (x) x.textContent = xp;
  if (s) s.textContent = streak;
}

function addXP(n) { store.set('xp', store.get('xp', 0) + n); renderPills(); trackActivity(); }
function trackActivity() {
  const days = store.get('activity', {});
  const key = new Date().toDateString();
  days[key] = (days[key] || 0) + 1;
  store.set('activity', days);
}
function renderHeatmap() {
  const el = document.getElementById('heatmap');
  if (!el) return;
  const days = store.get('activity', {});
  const today = new Date();
  let html = '';
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today - i * 864e5);
    const n = days[d.toDateString()] || 0;
    const shade = n === 0 ? 'var(--surface2)' : n < 2 ? '#7dd3fc55' : n < 4 ? '#7dd3fc99' : '#7dd3fc';
    html += `<span title="${d.toDateString()}: ${n} actions" style="width:16px;height:16px;border-radius:4px;background:${shade}"></span>`;
  }
  el.innerHTML = html;
}

function touchStreak() {
  const today = new Date().toDateString();
  const last = store.get('lastDay', null);
  if (last === today) return;
  const y = new Date(Date.now() - 864e5).toDateString();
  store.set('streak', last === y ? store.get('streak', 0) + 1 : 1);
  store.set('lastDay', today);
  renderPills();
}

// Spaced repetition: saved when a quiz is answered correctly
function renderBadges() {
  const el = document.getElementById('badges');
  if (!el) return;
  const done = store.get('done', []), xp = store.get('xp', 0), streak = store.get('streak', 0);
  const badges = [
    { icon: '🌱', name: 'First Steps', got: done.length >= 1, desc: 'Finish your first lesson' },
    { icon: '📚', name: 'Bookworm', got: done.length >= 3, desc: 'Finish 3 lessons' },
    { icon: '🎯', name: 'Recall Pro', got: xp >= 50, desc: 'Earn 50 XP' },
    { icon: '🔥', name: 'On Fire', got: streak >= 3, desc: '3-day streak' },
    { icon: '✍️', name: 'Pen Master', got: store.get('writes', 0) >= 1, desc: 'Nail a write-it step' },
    { icon: '🔁', name: 'Reviewer', got: !!store.get('lastReview', null), desc: 'Complete a review session' }
  ];
  el.innerHTML = badges.map(b => `
    <div class="card" style="opacity:${b.got ? 1 : .4}">
      <h3>${b.icon} ${b.name} ${b.got ? '✅' : '🔒'}</h3><p>${b.desc}</p>
    </div>`).join('');
}

function scheduleReview(s) {
  const srs = store.get('srs', []);
  let entry = srs.find(e => e.question === s.question);
  if (!entry) { entry = { question: s.question, options: s.options, answer: s.answer, explain: s.explain, hint: s.hint, level: 0 }; srs.push(entry); }
  entry.level = Math.min(entry.level + 1, 4);
  entry.due = Date.now() + [0, 864e5, 3 * 864e5, 7 * 864e5, 14 * 864e5][entry.level];
  store.set('srs', srs);
}

function markDone(lessonId) {
  const done = store.get('done', []);
  if (!done.includes(lessonId)) done.push(lessonId);
  store.set('done', done);
}

function isDone(lessonId) { return store.get('done', []).includes(lessonId); }

function renderProgress() {
  const el = document.getElementById('progressSection');
  if (!el) return;
  const done = store.get('done', []);
  const dueCount = store.get('srs', []).filter(e => e.due <= Date.now()).length;
  el.innerHTML = window.LESSONS.tracks.map(t => {
    const total = t.lessons.length;
    const finished = t.lessons.filter(l => done.includes(l.id)).length;
    const pct = Math.round(finished / total * 100);
    return `<a class="card" href="lesson.html?lesson=${(t.lessons.find(l => !done.includes(l.id)) || t.lessons[0]).id}" style="text-decoration:none;color:inherit;display:block"><h3>${t.icon} ${t.title}</h3>
      <div class="progress" style="margin:10px 0 6px"><div style="width:${pct}%"></div></div>
      <p>${finished}/${total} lessons · ${pct}% complete</p></a>`;
  }).join('') + `<div class="card"><h3>🔁 Review due</h3><p>${dueCount} concept(s) waiting</p></div>` +
    `<div class="card"><h3>⏱️ Est. focus time</h3><p>${Math.round(store.get('xp', 0) * 0.8)} min</p></div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  touchStreak();
  renderPills();
  renderBadges();
  renderProgress();
  renderHeatmap();

  // Theme: cycle dark → light → mars → moon, saved
  const THEMES = ['dark', 'light', 'mars', 'moon'];
  const ICONS = { dark: '🌙', light: '☀️', mars: '🔴', moon: '🌕' };
  const applyTheme = t => { document.documentElement.dataset.theme = t; store.set('theme', t);
    const b = document.getElementById('themeBtn'); if (b) b.textContent = ICONS[t] || '🌙'; };
  applyTheme(store.get('theme', 'dark'));
  const tb = document.getElementById('themeBtn');
  if (tb) tb.onclick = () => {
    const cur = store.get('theme', 'dark');
    applyTheme(THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length]);
  };

  // Random lesson button
  const rb = document.getElementById('randomBtn');
  if (rb) rb.onclick = (e) => {
    e.preventDefault();
    const all = window.LESSONS.tracks.flatMap(t => t.lessons);
    const pick = all[Math.floor(Math.random() * all.length)];
    location.href = 'lesson.html?lesson=' + pick.id;
  };

  // Welcome-back reminder banner
  const lastVisit = store.get('lastVisit', null);
  const todayStr = new Date().toDateString();
  if (lastVisit && lastVisit !== todayStr) {
    const b = document.createElement('div');
    b.className = 'pill';
    b.style.cssText = 'display:block;text-align:center;margin:20px auto 0;max-width:640px';
    b.textContent = `👋 Welcome back! You had a ${store.get('streak', 0)}-day streak. Keep it alive!`;
    document.querySelector('main').prepend(b);
  }
  store.set('lastVisit', todayStr);

  // Daily challenge: one lesson per day
  const dc = document.getElementById('dailyChallenge');
  if (dc) {
    const all = window.LESSONS.tracks.flatMap(t => t.lessons.map(l => ({ ...l, track: t.title })));
    const pick = all[new Date().getDate() % all.length];
    dc.innerHTML = `🎯 Daily challenge: <a href="lesson.html?lesson=${pick.id}" style="color:var(--accent)">${pick.title}</a> — ${pick.track}`;
  }

  // Search filter
  const search = document.getElementById('search');
  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase();
      document.querySelectorAll('#trackList .track').forEach(tr => {
        const links = [...tr.querySelectorAll('a')];
        let any = false;
        links.forEach(a => { const show = a.textContent.toLowerCase().includes(q); a.style.display = show ? '' : 'none'; if (show) any = true; });
        tr.style.display = any ? '' : 'none';
      });
    });
  }

  // Share + print buttons
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) shareBtn.onclick = () => {
    const text = `I'm learning with NVR Coding 🧠 — ${store.get('xp', 0)} XP, ${store.get('streak', 0)}-day streak, ${store.get('done', []).length} lessons done!`;
    navigator.clipboard?.writeText(text).then(() => { shareBtn.textContent = '✅ Copied!'; setTimeout(() => shareBtn.textContent = '🔗 Copy my stats', 1500); }).catch(() => prompt('Copy this:', text));
  };
  const printBtn = document.getElementById('printBtn');
  if (printBtn) printBtn.onclick = () => window.print();

  // Landing page: render tracks from lessons data
  const trackList = document.getElementById('trackList');
  if (trackList) {
    const data = window.LESSONS;
    trackList.innerHTML = data.tracks.map(t => {
      const allDone = t.lessons.every(l => isDone(l.id));
      return `
        <div class="track">
          <h3>${t.icon} ${t.title}</h3>
          ${t.lessons.map(l => `<a href="lesson.html?lesson=${l.id}">${isDone(l.id) ? '✅' : '○'} ${l.title}</a>`).join('')}
          ${allDone ? `<br><a href="certificate.html?track=${t.id}" style="color:var(--accent);font-weight:700">🏆 Track complete — get your certificate</a>` : ''}
        </div>`;
    }).join('');
  }
});

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
