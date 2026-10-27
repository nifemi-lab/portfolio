'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

global.window = global;
const core = require('../../students/core.js');
require('../../students/data/tracks.js');
require('../../students/data/primary/english.js');
require('../../students/data/lower-secondary/english.js');
require('../../students/data/upper-secondary/english-language.js');
require('../../students/data/upper-secondary/english-literature.js');
require('../../students/data/primary/science.js');
require('../../students/data/lower-secondary/science.js');
require('../../students/data/upper-secondary/biology.js');
require('../../students/data/upper-secondary/chemistry.js');
require('../../students/data/upper-secondary/physics.js');

test('content loads and passes validation', () => {
  const result = core.validateTracks(global.window.LEARN_TRACKS);
  assert.deepEqual(result.errors, []);
  assert.equal(result.stats.tracks, 3);
  assert.equal(result.stats.subjects, 12);
  assert.equal(result.stats.modules, 24);
  assert.equal(result.stats.lessons, 72);
  assert.equal(result.stats.questions, 216);
});

test('every track starts at Module 1, Lesson 1 with a playable lesson', () => {
  const index = core.createIndex(global.window.LEARN_TRACKS);
  ['primary', 'lower-secondary', 'upper-secondary'].forEach((id) => {
    const track = core.getTrack(index, id);
    assert.ok(track, id + ' track exists');
    assert.equal(track.subjects[0].id, 'maths');
    const modules = core.getSubject(index, id, 'maths').modules;
    assert.equal(modules[0].order, 1);
    const lessons = core.orderedLessons(index, id, 'maths');
    assert.ok(lessons.length >= 1);
    assert.equal(lessons[0].order, 1);
    lessons.forEach((lesson) => {
      assert.equal(lesson.quiz.length, 3);
      assert.ok(lesson.blocks.some(b => b.type === 'illustration'));
      assert.ok(lesson.blocks.some(b => b.type === 'example'));
    });
  });
});

test('primary track is complete with two modules of three lessons', () => {
  const index = core.createIndex(global.window.LEARN_TRACKS);
  const subject = core.getSubject(index, 'primary', 'maths');
  assert.equal(subject.modules.length, 2);
  subject.modules.forEach((mod) => {
    assert.equal(mod.lessons.length, 3);
    mod.lessons.forEach((lesson, i) => assert.equal(lesson.order, i + 1));
  });
  const ids = core.orderedLessons(index, 'primary', 'maths').map(l => l.id);
  assert.deepEqual(ids, [
    'primary-maths-m1-l1', 'primary-maths-m1-l2', 'primary-maths-m1-l3',
    'primary-maths-m2-l1', 'primary-maths-m2-l2', 'primary-maths-m2-l3'
  ]);
});

test('lower secondary track is complete with two modules of three lessons', () => {
  const index = core.createIndex(global.window.LEARN_TRACKS);
  const subject = core.getSubject(index, 'lower-secondary', 'maths');
  assert.equal(subject.modules.length, 2);
  subject.modules.forEach((mod) => {
    assert.equal(mod.lessons.length, 3);
    mod.lessons.forEach((lesson, i) => assert.equal(lesson.order, i + 1));
  });
  const ids = core.orderedLessons(index, 'lower-secondary', 'maths').map(l => l.id);
  assert.deepEqual(ids, [
    'lower-secondary-maths-m1-l1', 'lower-secondary-maths-m1-l2', 'lower-secondary-maths-m1-l3',
    'lower-secondary-maths-m2-l1', 'lower-secondary-maths-m2-l2', 'lower-secondary-maths-m2-l3'
  ]);
});

test('upper secondary track is complete and every track has six lessons', () => {
  const index = core.createIndex(global.window.LEARN_TRACKS);
  const subject = core.getSubject(index, 'upper-secondary', 'maths');
  assert.equal(subject.modules.length, 2);
  subject.modules.forEach((mod) => {
    assert.equal(mod.lessons.length, 3);
    mod.lessons.forEach((lesson, i) => assert.equal(lesson.order, i + 1));
  });
  ['primary', 'lower-secondary', 'upper-secondary'].forEach((id) => {
    assert.equal(core.orderedLessons(index, id, 'maths').length, 6);
  });
});

test('lesson ids are unique and resolve to short route slugs', () => {
  const index = core.createIndex(global.window.LEARN_TRACKS);
  const ids = Array.from(index.lessonById.keys());
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(core.lessonSlug('primary-maths-m1-l1'), 'l1');
  assert.equal(core.lessonSlug('lower-secondary-maths-m1-l1'), 'l1');
  assert.equal(core.lessonSlug('upper-secondary-maths-m1-l1'), 'l1');
});

test('english subjects have two modules of three lessons', () => {
  const index = core.createIndex(global.window.LEARN_TRACKS);
  const entries = [
    ['primary', 'english'],
    ['lower-secondary', 'english'],
    ['upper-secondary', 'english-language'],
    ['upper-secondary', 'english-literature']
  ];
  entries.forEach(([trackId, subjectId]) => {
    const subject = core.getSubject(index, trackId, subjectId);
    assert.ok(subject, trackId + '/' + subjectId + ' exists');
    assert.equal(subject.modules.length, 2);
    subject.modules.forEach((mod, mi) => {
      assert.equal(mod.order, mi + 1);
      assert.equal(mod.lessons.length, 3);
      mod.lessons.forEach((lesson, li) => assert.equal(lesson.order, li + 1));
    });
    assert.equal(core.orderedLessons(index, trackId, subjectId).length, 6);
  });
});

test('science subjects have two modules of three lessons', () => {
  const index = core.createIndex(global.window.LEARN_TRACKS);
  const entries = [
    ['primary', 'science'],
    ['lower-secondary', 'science'],
    ['upper-secondary', 'biology'],
    ['upper-secondary', 'chemistry'],
    ['upper-secondary', 'physics']
  ];
  entries.forEach(([trackId, subjectId]) => {
    const subject = core.getSubject(index, trackId, subjectId);
    assert.ok(subject, trackId + '/' + subjectId + ' exists');
    assert.equal(subject.modules.length, 2);
    subject.modules.forEach((mod, mi) => {
      assert.equal(mod.order, mi + 1);
      assert.equal(mod.lessons.length, 3);
      mod.lessons.forEach((lesson, li) => assert.equal(lesson.order, li + 1));
    });
    assert.equal(core.orderedLessons(index, trackId, subjectId).length, 6);
  });
});
