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
  assert.equal(result.stats.lessons, 3);
  assert.equal(result.stats.questions, 9);
});

test('every track starts with one fully playable lesson', () => {
  const index = core.createIndex(global.window.LEARN_TRACKS);
  ['primary', 'lower-secondary', 'upper-secondary'].forEach((id) => {
    const track = core.getTrack(index, id);
    assert.ok(track, id + ' track exists');
    assert.equal(track.subjects[0].id, 'maths');
    const lessons = core.orderedLessons(index, id, 'maths');
    assert.equal(lessons.length, 1);
    assert.equal(lessons[0].order, 1);
    assert.equal(lessons[0].quiz.length, 3);
    assert.ok(lessons[0].blocks.some(b => b.type === 'illustration'));
    assert.ok(lessons[0].blocks.some(b => b.type === 'example'));
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
