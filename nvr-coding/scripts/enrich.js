// Inject deeper exercises into lessons
const fs = require('fs');
const vm = require('vm');
let code = fs.readFileSync('data/lessons.js', 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(code, sandbox);
const data = sandbox.window.LESSONS;

// keyed by lesson id: extra steps (2 per lesson: a detail + a write-it)
const extra = {
  t0l1: [
    { type: 'text', heading: 'Did you know?', body: 'When you type a URL and hit Enter, your browser makes a request, the server finds the files, and the response comes back — all in milliseconds.', analogy: 'Blink and you\'ve already ordered and received the package.' },
    { type: 'write', heading: 'Show me the client 🗣️', body: 'Write a line that logs which side you are (the client or the server).', expected: '', mustInclude: ['console.log'], hint: 'console.log("I am the client!");' }
  ],
  t1l1: [
    { type: 'text', heading: 'Tags nest like boxes', body: 'Tags open and close: <div>…</div>. Inside a tag you can put others — that nesting is what builds the page tree.', analogy: 'Like gift boxes inside gift boxes.' },
    { type: 'write', heading: 'Your turn ✍️', body: 'Log a string of a simple HTML heading tag, like <h1>.', expected: '<h1>', mustInclude: ['console.log'], hint: 'console.log("<h1>My Title</h1>");' }
  ],
  t2l1: [
    { type: 'text', heading: 'A server all day', body: 'Servers listen on a port (like a door number) for incoming requests. Node.js lets that listening be just a few lines of JavaScript.', analogy: 'A door number on a busy street.' },
    { type: 'write', heading: 'Your turn ✍️', body: 'Log the port number a server might listen on, e.g. 3000.', expected: '3000', mustInclude: ['console.log'], hint: 'console.log(3000);' }
  ],
  t3l1: [
    { type: 'text', heading: 'Columns have types', body: 'Every column has a type: text, number, date. It keeps your data clean and fast to search.', analogy: 'Like labeling shelves: books here, toys there.' },
    { type: 'write', heading: 'Your turn ✍️', body: 'Log the word "database" as if you were naming your table.', expected: 'database', mustInclude: ['console.log'], hint: 'console.log("database");' }
  ],
  t6l1: [
    { type: 'text', heading: 'Reassigning values', body: 'With let, you can change the value later. With const, JS stops you — that safety is the point.', analogy: 'let = whiteboard, const = carved stone.' },
    { type: 'write', heading: 'Your turn ✍️', body: 'Create a const called x with value 5 and log it.', expected: '5', mustInclude: ['const', 'console.log'], hint: 'const x = 5; console.log(x);' }
  ],
  t13l2: [
    { type: 'text', heading: 'Space is style', body: 'Empty space around text and images makes designs feel calm and premium. Cramped = amateur. Generous = pro.', analogy: 'A crowded room feels loud; an empty gallery feels classy.' },
    { type: 'write', heading: 'Your turn ✍️', body: 'Log a one-word design tip: "whitespace".', expected: 'whitespace', mustInclude: ['console.log'], hint: 'console.log("whitespace");' }
  ],
  t15l1: [
    { type: 'text', heading: 'Arrays are zero-indexed', body: 'The first item is at position 0, not 1. So fruits[0] is "apple". Forgetting this is the #1 beginner bug.', analogy: 'Like floors in Europe — ground floor is called 0.' },
    { type: 'write', heading: 'Your turn ✍️', body: 'Log the length of a two-item array.', expected: '2', mustInclude: ['console.log'], hint: 'const a = [1,2]; console.log(a.length);' }
  ]
};

let added = 0;
for (const track of data.tracks) {
  for (const lesson of track.lessons) {
    if (extra[lesson.id]) {
      // insert before the last step of the lesson? No — append at end of steps
      lesson.steps.push(...extra[lesson.id]);
      added += extra[lesson.id].length;
    }
  }
}
code = 'window.LESSONS = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync('data/lessons.js', code, 'utf8');
console.log('Added', added, 'steps across', Object.keys(extra).length, 'lessons.');
