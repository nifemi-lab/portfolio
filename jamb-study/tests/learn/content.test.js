'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

global.window = global;
const core = require('../../students/core.js');
require('../../students/data/tracks.js');

test('content loads and passes validation', () => {
  const result = core.validateTracks(global.window.LEARN_TRACKS);
  assert.deepEqual(result.errors, []);
  assert.equal(result.stats.tracks, 3);
  assert.equal(result.stats.lessons, 8);
  assert.equal(result.stats.questions, 24);
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

test('lesson ids are unique and resolve to short route slugs', () => {
  const index = core.createIndex(global.window.LEARN_TRACKS);
  const ids = Array.from(index.lessonById.keys());
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(core.lessonSlug('primary-maths-m1-l1'), 'l1');
  assert.equal(core.lessonSlug('lower-secondary-maths-m1-l1'), 'l1');
  assert.equal(core.lessonSlug('upper-secondary-maths-m1-l1'), 'l1');
});
