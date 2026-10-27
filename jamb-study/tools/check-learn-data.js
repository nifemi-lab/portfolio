/* Content gate for LearnStack. Run from jamb-study/:
   node tools/check-learn-data.js  */
'use strict';

global.window = global;
const core = require('../students/core.js');
require('../students/data/tracks.js');

const result = core.validateTracks(window.LEARN_TRACKS);
result.errors.forEach((message) => console.error('FAIL: ' + message));

const s = result.stats;
console.log('tracks: ' + s.tracks +
  ', subjects: ' + s.subjects +
  ', modules: ' + s.modules +
  ', lessons: ' + s.lessons +
  ', questions: ' + s.questions);

if (result.errors.length) {
  console.error(result.errors.length + ' problem(s)');
  process.exit(1);
}
console.log('OK');
