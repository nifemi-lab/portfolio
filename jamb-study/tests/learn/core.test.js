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
