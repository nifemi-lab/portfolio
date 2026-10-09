// NVR Coding — tiny celebrations: confetti + a cheerful chime
function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [523, 659, 784].forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = f; o.type = 'sine';
      g.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.12);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3);
      o.connect(g).connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.12); o.stop(ctx.currentTime + i * 0.12 + 0.3);
    });
  } catch (e) { /* audio blocked — no big deal */ }
}

function confetti() {
  const colors = ['#34d399', '#8b5cf6', '#fbbf24', '#f472b6', '#60a5fa'];
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.textContent = ['🎉', '✨', '⭐', '🎊'][i % 4];
    el.style.cssText = `position:fixed;top:-20px;left:${Math.random() * 100}vw;font-size:${14 + Math.random() * 18}px;z-index:9999;pointer-events:none;transition:transform 1.6s ease-in, opacity 1.6s;`;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = `translateY(${window.innerHeight + 40}px) rotate(${Math.random() * 720 - 360}deg)`;
      el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 1800);
  }
}

function celebrate() { playChime(); confetti(); }
