// NVR Coding — spaced repetition review
document.addEventListener('DOMContentLoaded', () => {
  const due = store.get('srs', []).filter(e => e.due <= Date.now());
  const area = document.getElementById('reviewArea');
  if (!due.length) {
    area.innerHTML = '<h2>All caught up! 🎉</h2><p>No reviews due. Finish some lessons and come back later — your brain will thank you.</p><a class="btn ghost" href="index.html">Back home</a>';
    return;
  }
  let i = 0;
  const show = () => {
    if (i >= due.length) {
      markDoneCount();
      area.innerHTML = '<h2>Session complete 🧠✨</h2><p>You just strengthened ' + due.length + ' memory traces. That spacing is literally how long-term memory forms.</p><a class="btn primary" href="index.html">Done</a>';
      celebrate();
      return;
    }
    const s = due[i];
    area.innerHTML = `
      <p class="tiny">Review ${i + 1} of ${due.length}</p>
      <h2>Quick recall 🎯</h2>
      <p>${s.question}</p>
      ${s.options.map((o, k) => `<button class="quiz-opt" data-k="${k}">${o}</button>`).join('')}
      <p class="feedback" id="fb"></p>`;
    area.querySelectorAll('.quiz-opt').forEach(b => b.onclick = () => {
      area.querySelectorAll('.quiz-opt').forEach(x => x.disabled = true);
      if (+b.dataset.k === s.answer) {
        b.classList.add('correct');
        document.getElementById('fb').className = 'feedback ok';
        document.getElementById('fb').textContent = '✅ ' + s.explain;
        addXP(5);
        const srs = store.get('srs', []);
        const entry = srs.find(e => e.question === s.question);
        if (entry) { entry.level = Math.min(entry.level + 1, 4); entry.due = Date.now() + [0, 864e5, 3 * 864e5, 7 * 864e5, 14 * 864e5][entry.level]; store.set('srs', srs); }
        setTimeout(() => { i++; show(); }, 1600);
      } else {
        b.classList.add('wrong');
        document.getElementById('fb').className = 'feedback err';
        document.getElementById('fb').textContent = '🌱 Errors are data! ' + s.hint + ' — reviewing this again tomorrow.';
        const srs = store.get('srs', []);
        const entry = srs.find(e => e.question === s.question);
        if (entry) { entry.level = 0; entry.due = Date.now() + 864e5; store.set('srs', srs); }
        setTimeout(() => { i++; show(); }, 2600);
      }
    });
  };
  function markDoneCount() { store.set('lastReview', new Date().toDateString()); }
  show();
});
