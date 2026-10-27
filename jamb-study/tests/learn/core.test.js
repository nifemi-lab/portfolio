'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../../students/core.js');

const lesson = (id, order, title) => ({
  id, order, title,
  objective: 'I can do it.',
  minutes: 5,
  recap: 'You did it.',
  blocks: [{ type: 'text', body: 'A short idea.' }],
  vocabulary: [{ word: 'word', meaning: 'A meaning.', example: 'An example.' }],
  quiz: [{
    type: 'multiple_choice', question: 'Pick one.',
    options: ['A', 'B', 'C'], answer: 0, why: 'A is correct.'
  }]
});

const fixture = {
  version: 1,
  tracks: [{
    id: 'primary', label: 'Primary', stage: 'UK Key Stage 1–2',
    ages: '5–11', usEquivalent: 'Elementary', tone: 'Warm',
    subjects: [{
      id: 'maths', label: 'Mathematics',
      modules: [
        { id: 'm1', order: 1, title: 'One', description: 'First module.', lessons: [
          lesson('primary-maths-m1-l1', 1, 'A'),
          lesson('primary-maths-m1-l2', 2, 'B')
        ]},
        { id: 'm2', order: 2, title: 'Two', description: 'Second module.', lessons: [
          lesson('primary-maths-m2-l1', 1, 'C'),
          lesson('primary-maths-m2-l2', 2, 'D')
        ]}
      ]
    }]
  }]
};

test('createIndex and lookups find nested content', () => {
  const index = core.createIndex(fixture);
  assert.equal(core.getTrack(index, 'primary').label, 'Primary');
  assert.equal(core.getSubject(index, 'primary', 'maths').label, 'Mathematics');
  assert.equal(core.getModule(index, 'primary', 'maths', 'm2').title, 'Two');
  assert.equal(core.getLesson(index, 'primary-maths-m2-l1').title, 'C');
  assert.equal(core.getTrack(index, 'missing'), null);
});

test('orderedLessons flattens modules in lesson order', () => {
  const index = core.createIndex(fixture);
  const ids = core.orderedLessons(index, 'primary', 'maths').map(l => l.id);
  assert.deepEqual(ids, [
    'primary-maths-m1-l1', 'primary-maths-m1-l2',
    'primary-maths-m2-l1', 'primary-maths-m2-l2'
  ]);
});

test('lessonPosition reports index and total', () => {
  const index = core.createIndex(fixture);
  const pos = core.lessonPosition(index, 'primary-maths-m2-l2');
  assert.equal(pos.index, 3);
  assert.equal(pos.total, 4);
  assert.equal(pos.moduleId, 'm2');
  assert.equal(core.lessonSlug('primary-maths-m2-l2'), 'l2');
  assert.equal(core.lessonPosition(index, 'nope'), null);
});

test('parseHash classifies every supported route', () => {
  assert.equal(core.parseHash('').kind, 'home');
  assert.equal(core.parseHash('#/').kind, 'home');
  assert.equal(core.parseHash('#/review').kind, 'review');
  assert.equal(core.parseHash('#/settings').kind, 'settings');
  assert.equal(core.parseHash('#/primary').kind, 'track');
  assert.equal(core.parseHash('#/primary/maths').kind, 'subject');
  assert.equal(core.parseHash('#/primary/maths/m1').kind, 'modules');
  const lessonRoute = core.parseHash('#/primary/maths/m1/l1');
  assert.equal(lessonRoute.kind, 'lesson');
  assert.equal(lessonRoute.trackId, 'primary');
  assert.equal(lessonRoute.lessonSlug, 'l1');
  assert.equal(core.parseHash('#/a/b/c/d/e').kind, 'unknown');
});

test('buildHash and canonicalize normalise URLs', () => {
  assert.equal(core.buildHash([]), '#/');
  assert.equal(core.buildHash(['primary', 'maths', 'm1', 'l1']),
    '#/primary/maths/m1/l1');
  assert.equal(core.canonicalize('#/primary/'), '#/primary');
  assert.equal(core.canonicalize(''), '#/');
  assert.equal(core.canonicalize('#/a/b/c/d/e'), '#/not-found');
});

const NOW = '2026-10-27T10:00:00.000Z';

test('multiple-choice and numeric answers are checked correctly', () => {
  const mc = { type: 'multiple_choice', options: ['10', '17', '18'], answer: 1 };
  assert.equal(core.isAnswerCorrect(mc, 1), true);
  assert.equal(core.isAnswerCorrect(mc, '1'), true);
  assert.equal(core.isAnswerCorrect(mc, 2), false);

  const numeric = { type: 'numeric', answer: 0.25, tolerance: 0.01 };
  assert.equal(core.isAnswerCorrect(numeric, '0.25'), true);
  assert.equal(core.isAnswerCorrect(numeric, 0.26), true);
  assert.equal(core.isAnswerCorrect(numeric, '0.3'), false);
  assert.equal(core.isAnswerCorrect(numeric, 'nope'), false);
});

test('scoreQuiz passes at 2 of 3 and reports a rounded percentage', () => {
  const quiz = [
    { type: 'multiple_choice', options: ['a', 'b'], answer: 0 },
    { type: 'multiple_choice', options: ['a', 'b'], answer: 0 },
    { type: 'multiple_choice', options: ['a', 'b'], answer: 1 }
  ];
  assert.deepEqual(core.scoreQuiz(quiz, [0, 0, 1]),
    { correct: 3, total: 3, percent: 100, passed: true });
  assert.deepEqual(core.scoreQuiz(quiz, [0, 0, 0]),
    { correct: 2, total: 3, percent: 67, passed: true });
  assert.deepEqual(core.scoreQuiz(quiz, [0, 1, 0]),
    { correct: 1, total: 3, percent: 33, passed: false });
});

test('isUnlocked opens lessons strictly in sequence across modules', () => {
  const index = core.createIndex(fixture);
  const empty = core.emptyProgress(NOW);
  assert.equal(core.isUnlocked(index, 'primary-maths-m1-l1', empty), true);
  assert.equal(core.isUnlocked(index, 'primary-maths-m1-l2', empty), false);

  const afterOne = core.applyAttempt(empty, 'primary-maths-m1-l1',
    { passed: true, percent: 100 }, NOW);
  assert.equal(core.isUnlocked(index, 'primary-maths-m1-l2', afterOne), true);
  assert.equal(core.isUnlocked(index, 'primary-maths-m2-l1', afterOne), false);

  const afterTwo = core.applyAttempt(afterOne, 'primary-maths-m1-l2',
    { passed: true, percent: 67 }, NOW);
  assert.equal(core.isUnlocked(index, 'primary-maths-m2-l1', afterTwo), true);
  assert.equal(core.isUnlocked(index, 'missing', afterTwo), false);
});

test('markInProgress never downgrades a completed lesson', () => {
  const p = core.emptyProgress(NOW);
  const first = core.markInProgress(p, 'primary-maths-m1-l1', NOW);
  assert.equal(first.lessons['primary-maths-m1-l1'].status, 'in_progress');

  const done = core.applyAttempt(first, 'primary-maths-m1-l1',
    { passed: true, percent: 100 }, NOW);
  const reopened = core.markInProgress(done, 'primary-maths-m1-l1',
    '2026-10-29T10:00:00.000Z');
  assert.equal(reopened.lessons['primary-maths-m1-l1'].status, 'completed');
  assert.equal(reopened.lessons['primary-maths-m1-l1'].lastSeenAt,
    '2026-10-29T10:00:00.000Z');
});

test('applyAttempt schedules +1, +3, +7, then resets on failure', () => {
  const id = 'primary-maths-m1-l1';
  let p = core.emptyProgress(NOW);
  p = core.applyAttempt(p, id, { passed: true, percent: 67 }, NOW);
  assert.equal(p.lessons[id].reviewStage, 0);
  assert.equal(p.lessons[id].nextReviewAt, '2026-10-28T10:00:00.000Z');
  assert.equal(p.lessons[id].attempts, 1);

  p = core.applyAttempt(p, id, { passed: true, percent: 100 }, NOW);
  assert.equal(p.lessons[id].reviewStage, 1);
  assert.equal(p.lessons[id].nextReviewAt, '2026-10-30T10:00:00.000Z');
  assert.equal(p.lessons[id].bestScore, 100);
  assert.equal(p.lessons[id].attempts, 2);

  p = core.applyAttempt(p, id, { passed: true, percent: 100 }, NOW);
  assert.equal(p.lessons[id].reviewStage, 2);
  assert.equal(p.lessons[id].nextReviewAt, '2026-11-03T10:00:00.000Z');

  p = core.applyAttempt(p, id, { passed: false, percent: 33 }, NOW);
  assert.equal(p.lessons[id].status, 'completed');
  assert.equal(p.lessons[id].reviewStage, 0);
  assert.equal(p.lessons[id].nextReviewAt, '2026-10-28T10:00:00.000Z');
  assert.equal(p.lessons[id].bestScore, 100);
});

test('a first failed attempt stays in progress with no review date', () => {
  const p = core.applyAttempt(core.emptyProgress(NOW), 'primary-maths-m1-l1',
    { passed: false, percent: 33 }, NOW);
  const entry = p.lessons['primary-maths-m1-l1'];
  assert.equal(entry.status, 'in_progress');
  assert.equal(entry.nextReviewAt, null);
  assert.equal(entry.reviewStage, 0);
});

test('review stage caps at 4 and stays at +30 days', () => {
  const id = 'primary-maths-m1-l1';
  let p = core.emptyProgress(NOW);
  for (let i = 0; i < 7; i += 1) {
    p = core.applyAttempt(p, id, { passed: true, percent: 100 }, NOW);
  }
  assert.equal(p.lessons[id].reviewStage, 4);
  assert.equal(p.lessons[id].nextReviewAt, '2026-11-26T10:00:00.000Z');
});

test('dueReviews returns only completed lessons at or before now', () => {
  const p = core.normalizeProgress({
    version: 1,
    updatedAt: NOW,
    lessons: {
      a: { status: 'completed', nextReviewAt: '2026-10-26T10:00:00.000Z' },
      b: { status: 'completed', nextReviewAt: '2026-10-30T10:00:00.000Z' },
      c: { status: 'completed', nextReviewAt: null },
      d: { status: 'in_progress', nextReviewAt: '2026-10-01T10:00:00.000Z' }
    }
  });
  const due = core.dueReviews(p, NOW);
  assert.deepEqual(due.map(row => row.lessonId), ['a']);
});

test('mergeProgress keeps the furthest and safest values', () => {
  const local = core.normalizeProgress({
    version: 1,
    updatedAt: '2026-10-27T10:00:00.000Z',
    lessons: {
      a: {
        status: 'in_progress', bestScore: 33, attempts: 2,
        lastSeenAt: '2026-10-27T10:00:00.000Z',
        reviewStage: 0, nextReviewAt: null
      },
      b: {
        status: 'completed', bestScore: 100, attempts: 3,
        lastSeenAt: '2026-10-26T10:00:00.000Z',
        reviewStage: 2, nextReviewAt: '2026-11-03T10:00:00.000Z'
      }
    }
  });
  const remote = core.normalizeProgress({
    version: 1,
    updatedAt: '2026-10-25T10:00:00.000Z',
    lessons: {
      a: {
        status: 'completed', bestScore: 67, attempts: 1,
        lastSeenAt: '2026-10-24T10:00:00.000Z',
        reviewStage: 1, nextReviewAt: '2026-10-30T10:00:00.000Z'
      },
      b: {
        status: 'completed', bestScore: 67, attempts: 5,
        lastSeenAt: '2026-10-28T10:00:00.000Z',
        reviewStage: 1, nextReviewAt: '2026-10-31T10:00:00.000Z'
      }
    }
  });
  const merged = core.mergeProgress(local, remote);
  assert.equal(merged.lessons.a.status, 'completed');
  assert.equal(merged.lessons.a.bestScore, 67);
  assert.equal(merged.lessons.a.attempts, 2);
  assert.equal(merged.lessons.a.reviewStage, 1);
  assert.equal(merged.lessons.b.bestScore, 100);
  assert.equal(merged.lessons.b.attempts, 5);
  assert.equal(merged.lessons.b.reviewStage, 2);
  assert.equal(merged.lessons.b.lastSeenAt, '2026-10-28T10:00:00.000Z');
  assert.equal(merged.lessons.b.nextReviewAt, '2026-10-31T10:00:00.000Z');
  assert.equal(merged.updatedAt, '2026-10-27T10:00:00.000Z');
});

test('createProgressStore survives broken JSON and counts writes', () => {
  const map = new Map();
  const storage = {
    getItem: key => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => map.set(key, value),
    removeItem: key => map.delete(key)
  };
  const store = core.createProgressStore(storage, 'learnstack.v1.progress');
  assert.deepEqual(store.read().lessons, {});

  map.set('learnstack.v1.progress', '{broken');
  assert.deepEqual(store.read().lessons, {});

  const written = store.write(core.markInProgress(
    core.emptyProgress(NOW), 'primary-maths-m1-l1', NOW));
  assert.equal(written, true);
  assert.equal(store.read().lessons['primary-maths-m1-l1'].status, 'in_progress');

  store.clear();
  assert.deepEqual(store.read().lessons, {});
});

test('textToParagraphs keeps paragraphs and bullet lists separate', () => {
  assert.deepEqual(core.textToParagraphs('One.\n\nTwo.'), [
    { type: 'p', text: 'One.' },
    { type: 'p', text: 'Two.' }
  ]);
  assert.deepEqual(core.textToParagraphs('- First\n- Second'), [
    { type: 'ul', items: ['First', 'Second'] }
  ]);
  assert.deepEqual(core.textToParagraphs(''), []);
});

const validLesson = () => ({
  id: 'primary-maths-m1-l1',
  order: 1,
  title: 'Counting to 20',
  objective: 'I can count, read, and write numbers to 20.',
  minutes: 7,
  recap: 'You counted and wrote numbers to 20.',
  blocks: [
    { type: 'text', body: 'We count in order. Each number is one more than the one before.' },
    { type: 'text', body: 'Say one number for each object you count.' },
    { type: 'tip', body: 'Touch each object once as you count it.' },
    { type: 'illustration', alt: 'Two ten frames showing 14 dots.', placeholder: 'Ten dots and four dots.' },
    { type: 'example', steps: ['Start at 10.', 'Count on: 11, 12, 13, 14.', 'There are 14 dots.'] }
  ],
  vocabulary: [
    { word: 'digit', meaning: 'A number symbol from 0 to 9.', example: 'The number 14 has two digits.' },
    { word: 'count', meaning: 'Say numbers in order for each object.', example: 'Count the dots one by one.' },
    { word: 'total', meaning: 'The number you reach after counting.', example: 'The total is 14.' }
  ],
  quiz: [
    { type: 'multiple_choice', question: 'What comes after 16?', options: ['15', '17', '18'], answer: 1, why: '17 is one more than 16.' },
    { type: 'multiple_choice', question: 'What is one ten and four ones?', options: ['14', '41', '104'], answer: 0, why: 'One ten and four ones make 14.' },
    { type: 'multiple_choice', question: 'There are 10 dots and 3 more. How many altogether?', options: ['12', '13', '30'], answer: 1, why: '10 and 3 more make 13.' }
  ]
});

const validData = () => ({
  version: 1,
  tracks: [{
    id: 'primary', label: 'Primary', stage: 'UK Key Stage 1–2',
    ages: '5–11', usEquivalent: 'Elementary', tone: 'Warm, concrete, guided',
    subjects: [{
      id: 'maths', label: 'Mathematics',
      modules: [{
        id: 'm1', order: 1, title: 'Counting and Place Value',
        description: 'Count, read, write, and compare whole numbers.',
        lessons: [validLesson()]
      }]
    }]
  }]
});

test('validateTracks accepts a complete lesson and reports stats', () => {
  const result = core.validateTracks(validData());
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.stats,
    { tracks: 1, subjects: 1, modules: 1, lessons: 1, questions: 3 });
});

test('validateTracks catches schema, key, and safety failures', () => {
  const data = validData();
  const l = data.tracks[0].subjects[0].modules[0].lessons[0];

  l.objective = 'I can use JAMB past questions.';
  l.blocks.find(b => b.type === 'illustration').alt = '';
  l.quiz[0].options = ['17', '17', '18'];
  l.quiz[1].answer = 9;
  l.quiz[2].why = '';
  l.blocks[0].body = '<b>Bold</b> idea';
  l.vocabulary.pop();

  const errors = core.validateTracks(data).errors;
  assert.ok(errors.some(e => /banned term/i.test(e)));
  assert.ok(errors.some(e => /alt text/i.test(e)));
  assert.ok(errors.some(e => /identical options/i.test(e)));
  assert.ok(errors.some(e => /answer index/i.test(e)));
  assert.ok(errors.some(e => /why/i.test(e)));
  assert.ok(errors.some(e => /raw HTML/i.test(e)));
  assert.ok(errors.some(e => /3 to 5 vocabulary/i.test(e)));
});

test('validateTracks rejects gaps, duplicates, and over-long blocks', () => {
  const data = validData();
  const module = data.tracks[0].subjects[0].modules[0];
  module.lessons.push(Object.assign(validLesson(), {
    id: 'primary-maths-m1-l2', order: 3, title: 'Second'
  }));
  module.lessons[1].blocks[0].body =
    'This sentence is deliberately much too long for the primary word limit because it keeps going and going and going and on and on and on and on and on.';

  const errors = core.validateTracks(data).errors;
  assert.ok(errors.some(e => /order/i.test(e)));
  assert.ok(errors.some(e => /word limit/i.test(e)));
});

test('parseHash recognises a review lesson deep link', () => {
  const route = core.parseHash('#/review/primary-maths-m1-l1');
  assert.equal(route.kind, 'review-lesson');
  assert.equal(route.lessonId, 'primary-maths-m1-l1');
});
