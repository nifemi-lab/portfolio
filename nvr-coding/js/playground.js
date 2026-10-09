// Mini game: Number Guesser
document.addEventListener('DOMContentLoaded', () => {
  let secret = Math.ceil(Math.random() * 10), tries = 5;
  const msg = document.getElementById('guessMsg');
  const input = document.getElementById('guessInput');
  const reset = () => { secret = Math.ceil(Math.random() * 10); tries = 5; msg.textContent = ''; input.value = ''; };
  document.getElementById('newGameBtn').onclick = reset;
  document.getElementById('guessBtn').onclick = () => {
    const g = Number(input.value);
    if (!g || g < 1 || g > 10) { msg.textContent = '🌱 Enter a number 1-10.'; return; }
    tries--;
    if (g === secret) { msg.textContent = '🎉 You got it! +15 XP'; addXP(15); celebrate(); setTimeout(reset, 2500); }
    else if (tries <= 0) { msg.textContent = `💥 Out of tries! It was ${secret}.`; setTimeout(reset, 2500); }
    else msg.textContent = g < secret ? `📈 Higher! ${tries} tries left.` : `📉 Lower! ${tries} tries left.`;
  };
});


// NVR Coding — free playground (JS + Python via Pyodide)
const TEMPLATES = {
  hello: 'const name = "you";\nconsole.log("Hello, " + name + "!");',
  loop: 'for (let i = 1; i <= 5; i++) {\n  console.log("Count: " + i);\n}',
  math: 'let total = 0;\nfor (let i = 1; i <= 10; i++) total += i;\nconsole.log("Sum 1..10 = " + total);',
  array: 'const nums = [2, 4, 6, 8];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);',
  object: 'const user = { name: "Ada", role: "coder" };\nconsole.log(user.name + " is a " + user.role);',
  fetch: '// fetch example (won\'t run offline, just read it)\nfetch("/api/data")\n  .then(r => r.json())\n  .then(data => console.log(data));'
};

function highlight(code) {
  const esc = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc
    .replace(/(\/\/.*$)/gm, '<span style="color:#64748b">$1</span>')
    .replace(/(".*?"|'.*?')/g, '<span style="color:#fcd34d">$1</span>')
    .replace(/\b(const|let|var|function|return|if|else|for|while|new|=>|true|false|null|undefined|fetch|console|log)\b/g, '<span style="color:#a78bfa">$1</span>')
    .replace(/\b(\d+)\b/g, '<span style="color:#34d399">$1</span>');
}

let lang = 'js';
let pyodideRef = null;

async function runPython(code, out) {
  if (!pyodideRef) {
    out.textContent = '⏳ Loading Python engine (first run downloads ~10MB)…';
    const mod = await import('https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.mjs');
    pyodideRef = await mod.loadPyodide();
  }
  const lines = [];
  pyodideRef.setStdout({ batched: s => lines.push(s) });
  try {
    pyodideRef.runPython(code);
    out.textContent = lines.join('\n') || '(no output — use print())';
  } catch (e) {
    out.textContent = '🐛 ' + e.message;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  const preview = document.getElementById('highlight');
  const out = document.getElementById('out');

  document.querySelectorAll('[data-tpl]').forEach(b => b.onclick = () => {
    editor.value = TEMPLATES[b.dataset.tpl];
    preview.innerHTML = highlight(editor.value);
  });
  editor.addEventListener('input', () => { preview.innerHTML = highlight(editor.value); });
  preview.innerHTML = highlight(editor.value);

  const setLang = (l) => {
    lang = l;
    document.getElementById('langJs').style.fontWeight = l === 'js' ? '700' : '400';
    document.getElementById('langPy').style.fontWeight = l === 'py' ? '700' : '400';
    document.getElementById('langNote').textContent = l === 'py' ? 'Runs with Pyodide (needs internet first time)' : '';
    if (l === 'py') { editor.value = 'name = "Ada"\nprint(f"Hello, {name}!")\nfor i in range(3):\n    print(i)'; preview.innerHTML = highlight(editor.value); }
  };
  document.getElementById('langJs').onclick = () => setLang('js');
  document.getElementById('langPy').onclick = () => setLang('py');

  document.getElementById('runBtn').onclick = async () => {
    if (lang === 'py') { await runPython(editor.value, out); return; }
    const outLines = [];
    try {
      new Function('console', editor.value)({ log: (...a) => outLines.push(a.join(' ')) });
      out.textContent = outLines.join('\n') || '(no output — use console.log 😉)';
    } catch (e) {
      out.textContent = '🐛 ' + e.message;
    }
  };
});
