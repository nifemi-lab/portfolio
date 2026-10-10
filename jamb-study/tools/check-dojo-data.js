/* Sanity-checks the dojo data files against the question bank.
   Run from jamb-study/:  node tools/check-dojo-data.js  */
global.window = global;
require('../js/questions.js');
require('../js/q-mathematics.js');
require('../js/sol-mathematics.js');
require('../js/syllabus-mathematics.js');
try { require('../js/lessons-mathematics.js'); } catch (e) { /* task 2 not written yet */ }

const bank = window.QUESTION_BANK.filter(q => q.s === 'Mathematics');
const syl = window.SYLLABUS['Mathematics'];
const map = (window.Q_TOPIC || {})['Mathematics'] || {};
const sols = (window.SOLUTIONS || {})['Mathematics'] || {};
const lessons = (window.LESSONS || {})['Mathematics'] || {};
const notes = (window.LESSON_NOTES || {})['Mathematics'] || {};

let fail = 0;
const err = m => { console.error('FAIL: ' + m); fail++; };

const topics = syl.flatMap(s => s.topics);
if (new Set(topics).size !== topics.length) err('duplicate topic names');

const bankSet = new Set(bank.map(q => q.q));
Object.keys(map).forEach(q => {
  if (!bankSet.has(q)) err('Q_TOPIC key not in bank: ' + q);
  if (!topics.includes(map[q])) err('Q_TOPIC value not a topic: ' + map[q]);
});
bank.forEach(q => { if (!map[q.q]) err('bank question not assigned: ' + q.q); });
bank.forEach(q => {
  const s = sols[q.q];
  if (!s) err('bank question has no solution: ' + q.q);
  else if (!s.e) err('solution missing working text: ' + q.q);
});

Object.keys(lessons).forEach(q => {
  const L = lessons[q];
  if (!bankSet.has(q)) err('LESSONS key not in bank: ' + q);
  if (!L.idea || !Array.isArray(L.steps) || !L.steps.length ||
      !Array.isArray(L.board) || !L.board.length || !L.trap)
    err('LESSONS entry missing idea/steps/board/trap: ' + q);
  if (!map[q]) err('LESSONS question has no Q_TOPIC: ' + q);
});
Object.keys(notes).forEach(t => {
  if (!topics.includes(t)) err('LESSON_NOTES key not a syllabus topic: ' + t);
});

const counts = {};
bank.forEach(q => { counts[map[q.q]] = (counts[map[q.q]] || 0) + 1; });
console.log('bank: ' + bank.length + ' questions, assigned: ' +
  bank.filter(q => map[q.q]).length + ', solutions: ' +
  bank.filter(q => sols[q.q] && sols[q.q].e).length);
console.log('sections: ' + syl.length + ', topics: ' + topics.length +
  ', populated: ' + Object.keys(counts).length);
console.log('lessons: ' + Object.keys(lessons).length +
  ', lesson notes: ' + Object.keys(notes).length);
if (fail) { console.error(fail + ' problem(s)'); process.exit(1); }
console.log('OK');
