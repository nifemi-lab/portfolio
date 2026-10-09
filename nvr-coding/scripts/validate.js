// NVR Coding content validator — run: node scripts/validate.js
const fs = require('fs');
const vm = require('vm');
const code = fs.readFileSync('data/lessons.js', 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(code, sandbox);
const data = sandbox.window.LESSONS;
let errors = 0, count = 0, quizzes = 0, writes = 0;
for (const t of data.tracks) {
  for (const l of t.lessons) {
    count++;
    if (!l.steps || !l.steps.length) { console.log(`ERR ${l.id}: no steps`); errors++; continue; }
    for (const s of l.steps) {
      if (!['text', 'quiz', 'code', 'write'].includes(s.type)) { console.log(`ERR ${l.id}: bad type ${s.type}`); errors++; }
      if (s.type === 'quiz') {
        quizzes++;
        if (!(s.answer >= 0 && s.answer < s.options.length)) { console.log(`ERR ${l.id}: quiz answer out of range`); errors++; }
        if (!s.explain || !s.hint) { console.log(`ERR ${l.id}: quiz missing explain/hint`); errors++; }
      }
      if (s.type === 'code' && !s.starter) { console.log(`ERR ${l.id}: code step missing starter`); errors++; }
      if (s.type === 'write') { writes++; if (!s.hint) { console.log(`ERR ${l.id}: write step missing hint`); errors++; } }
    }
  }
}
console.log(`Checked ${count} lessons, ${quizzes} quizzes, ${writes} write-it steps. Errors: ${errors}`);
if (errors) process.exit(1);
console.log('ALL GOOD ✅');
