/* Content gate for LearnStack. Run from jamb-study/:
   node tools/check-learn-data.js  */
'use strict';

const fs = require('fs');
const path = require('path');

global.window = global;
const core = require('../students/core.js');
require('../students/data/tracks.js');
require('../students/data/primary/english.js');
require('../students/data/lower-secondary/english.js');
require('../students/data/upper-secondary/english-language.js');
require('../students/data/upper-secondary/english-literature.js');
require('../students/data/primary/science.js');
require('../students/data/lower-secondary/science.js');
require('../students/data/upper-secondary/biology.js');
require('../students/data/upper-secondary/chemistry.js');
require('../students/data/upper-secondary/physics.js');
require('../students/data/primary/history.js');
require('../students/data/primary/geography.js');
require('../students/data/lower-secondary/history.js');
require('../students/data/lower-secondary/geography.js');
require('../students/data/upper-secondary/history.js');
require('../students/data/upper-secondary/geography.js');
require('../students/data/primary/computing.js');
require('../students/data/lower-secondary/computing.js');
require('../students/data/upper-secondary/computing.js');
require('../students/data/lower-secondary/citizenship.js');
require('../students/data/upper-secondary/citizenship.js');
require('../students/data/lower-secondary/religious-education.js');
require('../students/data/upper-secondary/religious-education.js');
require('../students/data/primary/art.js');
require('../students/data/primary/music.js');
require('../students/data/primary/pe.js');
require('../students/data/lower-secondary/art.js');
require('../students/data/lower-secondary/music.js');
require('../students/data/lower-secondary/pe.js');
require('../students/data/upper-secondary/art.js');
require('../students/data/upper-secondary/music.js');
require('../students/data/upper-secondary/pe.js');

const result = core.validateTracks(window.LEARN_TRACKS);
result.errors.forEach((message) => console.error('FAIL: ' + message));

const missingImages = [];
((window.LEARN_TRACKS && window.LEARN_TRACKS.tracks) || []).forEach((track) => {
  (track.subjects || []).forEach((subject) => {
    (subject.modules || []).forEach((module) => {
      (module.lessons || []).forEach((lesson) => {
        (lesson.blocks || []).forEach((block) => {
          if (block.type !== 'illustration' || !block.image) return;
          const file = path.join(__dirname, '..', 'students', block.image);
          if (!fs.existsSync(file)) {
            const message = lesson.id + ' image not found: ' + block.image;
            missingImages.push(message);
            console.error('FAIL: ' + message);
          }
        });
      });
    });
  });
});

const s = result.stats;
console.log('tracks: ' + s.tracks +
  ', subjects: ' + s.subjects +
  ', modules: ' + s.modules +
  ', lessons: ' + s.lessons +
  ', questions: ' + s.questions);

const problems = result.errors.length + missingImages.length;
if (problems) {
  console.error(problems + ' problem(s)');
  process.exit(1);
}
console.log('OK');
