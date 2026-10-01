/* Shared demo dataset for the screenshot pages (same origin as the app). */
window.__SEED__ = (function () {
  var dayISO = function (back) {
    var d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() - back);
    var dd = d.getDate(), mm = d.getMonth() + 1;
    return d.getFullYear() + '-' + (mm < 10 ? '0' : '') + mm + '-' + (dd < 10 ? '0' : '') + dd;
  };

  var s = function (id, name, target, exam) { return { id: id, name: name, target: target, exam: !!exam }; };
  var subjects = [
    s('use-of-english', 'Use of English', 450, true),
    s('mathematics', 'Mathematics', 450, true),
    s('physics', 'Physics', 360, true),
    s('chemistry', 'Chemistry', 360, true),
    s('biology', 'Biology', 300, false),
    s('economics', 'Economics', 300, false),
    s('government', 'Government', 300, false),
    s('further-mathematics', 'Further Mathematics', 240, false)
  ];
  var names = subjects.map(function (x) { return x.name; });

  /* minutes per day, index 0 = today, nulls are rest days */
  var pattern = [90, 60, null, 120, 75, 45, null, 100, 60, 40, null, 130, 80, 55, null,
                 70, 110, 45, null, 90, 65, 50, null, 120, 85, 60, 40, null];
  var logs = [];
  pattern.forEach(function (mins, i) {
    if (!mins) return;
    logs.push({
      id: 'log_seed' + i, date: dayISO(i), subject: names[i % names.length],
      minutes: mins, sessionId: null, source: 'timer'
    });
  });

  var quizRaw = [
    ['Use of English', 19, 25, 1, 'practice'],
    ['Physics', 14, 25, 2, 'practice'],
    ['Mathematics', 17, 25, 3, 'mock'],
    ['Chemistry', 21, 25, 4, 'practice'],
    ['Use of English', 16, 25, 6, 'practice'],
    ['Physics', 11, 25, 7, 'mock'],
    ['Government', 18, 25, 9, 'practice'],
    ['Mathematics', 13, 25, 10, 'practice'],
    ['Use of English', 22, 25, 12, 'exam'],
    ['Biology', 20, 25, 13, 'practice']
  ];
  var quiz = quizRaw.map(function (r, i) {
    return { id: 'qr_seed' + i, date: dayISO(r[3]), subject: r[0], correct: r[1], total: r[2], mode: r[4] };
  });

  var missed = [
    { id: 'm_seed1', s: 'Physics', q: 'The SI unit of pressure is:', o: ['Pascal', 'Newton', 'Joule', 'Watt'], a: 0, hits: 2, last: dayISO(2) },
    { id: 'm_seed2', s: 'Mathematics', q: 'The square root of 144 is:', o: ['10', '11', '12', '14'], a: 2, hits: 1, last: dayISO(3) },
    { id: 'm_seed3', s: 'Chemistry', q: 'The pH of a neutral solution is:', o: ['0', '7', '10', '14'], a: 1, hits: 1, last: dayISO(4) }
  ];

  var sess = function (id, subject, day, time, minutes, topic) {
    return { id: id, subject: subject, day: day, time: time, minutes: minutes, topic: topic };
  };
  var sessions = [
    sess('sess_s1', 'Use of English', 0, '16:00', 60, 'Comprehension + synonyms'),
    sess('sess_s2', 'Mathematics', 0, '17:15', 75, 'Algebra — simultaneous equations'),
    sess('sess_s3', 'Physics', 1, '16:00', 60, 'Mechanics — motion'),
    sess('sess_s4', 'Chemistry', 1, '17:15', 60, 'Mole concept'),
    sess('sess_s5', 'Use of English', 2, '16:00', 60, 'Oral English + antonyms'),
    sess('sess_s6', 'Mathematics', 3, '17:15', 75, 'Geometry practice'),
    sess('sess_s7', 'Physics', 4, '16:00', 60, 'Waves and sound'),
    sess('sess_s8', 'Mixed practice', 6, '17:00', 60, 'Weekly review + wrong answers')
  ];

  return {
    profiles: { active: 'me', list: [{ id: 'me', name: 'Me' }] },
    db: {
      subjects: subjects,
      sessions: sessions,
      logs: logs,
      quiz_results: quiz,
      questions: [],
      missed: missed,
      recentQ: [],
      settings: { dailyGoal: 120, examDate: dayISO(-68), theme: '', retake: null }
    }
  };
})();
