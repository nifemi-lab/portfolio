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
require('../../students/data/primary/history.js');
require('../../students/data/primary/geography.js');
require('../../students/data/lower-secondary/history.js');
require('../../students/data/lower-secondary/geography.js');
require('../../students/data/upper-secondary/history.js');
require('../../students/data/upper-secondary/geography.js');
require('../../students/data/primary/computing.js');
require('../../students/data/lower-secondary/computing.js');
require('../../students/data/upper-secondary/computing.js');
require('../../students/data/lower-secondary/citizenship.js');
require('../../students/data/upper-secondary/citizenship.js');
require('../../students/data/lower-secondary/religious-education.js');
require('../../students/data/upper-secondary/religious-education.js');
require('../../students/data/primary/art.js');
require('../../students/data/primary/music.js');
require('../../students/data/primary/pe.js');
require('../../students/data/lower-secondary/art.js');
require('../../students/data/lower-secondary/music.js');
require('../../students/data/lower-secondary/pe.js');
require('../../students/data/upper-secondary/art.js');
require('../../students/data/upper-secondary/music.js');
require('../../students/data/upper-secondary/pe.js');
require('../../students/data/primary/design-technology.js');
require('../../students/data/lower-secondary/design-technology.js');
require('../../students/data/primary/french.js');
require('../../students/data/lower-secondary/french.js');
require('../../students/data/upper-secondary/french.js');
require('../../students/data/upper-secondary/business-studies.js');

test('content loads and passes validation', () => {
  const result = core.validateTracks(global.window.LEARN_TRACKS);
  assert.deepEqual(result.errors, []);
  assert.equal(result.stats.tracks, 3);
  assert.equal(result.stats.subjects, 40);
  assert.equal(result.stats.modules, 80);
  assert.equal(result.stats.lessons, 240);
  assert.equal(result.stats.questions, 720);
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

test('history and geography subjects have two modules of three lessons', () => {
  const index = core.createIndex(global.window.LEARN_TRACKS);
  const entries = [
    ['primary', 'history'],
    ['primary', 'geography'],
    ['lower-secondary', 'history'],
    ['lower-secondary', 'geography'],
    ['upper-secondary', 'history'],
    ['upper-secondary', 'geography']
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

test('computing, citizenship, and RE subjects have two modules of three lessons', () => {
  const index = core.createIndex(global.window.LEARN_TRACKS);
  const entries = [
    ['primary', 'computing'],
    ['lower-secondary', 'computing'],
    ['upper-secondary', 'computing'],
    ['lower-secondary', 'citizenship'],
    ['upper-secondary', 'citizenship'],
    ['lower-secondary', 'religious-education'],
    ['upper-secondary', 'religious-education']
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

test('art, music, and PE subjects have two modules of three lessons', () => {
  const index = core.createIndex(global.window.LEARN_TRACKS);
  const entries = [
    ['primary', 'art'],
    ['primary', 'music'],
    ['primary', 'pe'],
    ['lower-secondary', 'art'],
    ['lower-secondary', 'music'],
    ['lower-secondary', 'pe'],
    ['upper-secondary', 'art'],
    ['upper-secondary', 'music'],
    ['upper-secondary', 'pe']
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

test('French, design and technology, and business subjects are complete', () => {
  const index = core.createIndex(global.window.LEARN_TRACKS);
  const entries = [
    ['primary', 'design-technology'],
    ['lower-secondary', 'design-technology'],
    ['primary', 'french'],
    ['lower-secondary', 'french'],
    ['upper-secondary', 'french'],
    ['upper-secondary', 'business-studies']
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
