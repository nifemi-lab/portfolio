(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.LearnCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const INTERVALS = [1, 3, 7, 14, 30];
  const DAY_MS = 86400000;
  const PASS_PERCENT = 67;

  function createIndex(data) {
    const tracks = data && Array.isArray(data.tracks) ? data.tracks : [];
    const trackById = new Map();
    const subjectByKey = new Map();
    const moduleByKey = new Map();
    const lessonsByModule = new Map();
    const lessonById = new Map();
    const orderedBySubject = new Map();
    const positionById = new Map();

    tracks.forEach((track) => {
      trackById.set(track.id, track);
      (track.subjects || []).forEach((subject) => {
        const subjectKey = track.id + '/' + subject.id;
        subjectByKey.set(subjectKey, subject);
        const flat = [];
        (subject.modules || []).forEach((mod) => {
          const moduleKey = subjectKey + '/' + mod.id;
          moduleByKey.set(moduleKey, mod);
          const lessons = (mod.lessons || []).slice()
            .sort((a, b) => a.order - b.order);
          lessonsByModule.set(moduleKey, lessons);
          lessons.forEach((entry) => {
            lessonById.set(entry.id, entry);
            positionById.set(entry.id, {
              trackId: track.id,
              subjectId: subject.id,
              moduleId: mod.id,
              lesson: entry,
              index: flat.length,
              total: 0
            });
            flat.push(entry);
          });
        });
        flat.forEach((entry) => {
          const pos = positionById.get(entry.id);
          pos.total = flat.length;
        });
        orderedBySubject.set(subjectKey, flat);
      });
    });

    return {
      data, tracks, trackById, subjectByKey, moduleByKey,
      lessonsByModule, lessonById, orderedBySubject, positionById
    };
  }

  function getTrack(index, trackId) {
    return index.trackById.get(trackId) || null;
  }

  function getSubject(index, trackId, subjectId) {
    return index.subjectByKey.get(trackId + '/' + subjectId) || null;
  }

  function getModule(index, trackId, subjectId, moduleId) {
    return index.moduleByKey.get(trackId + '/' + subjectId + '/' + moduleId) || null;
  }

  function getLesson(index, lessonId) {
    return index.lessonById.get(lessonId) || null;
  }

  function orderedLessons(index, trackId, subjectId) {
    return index.orderedBySubject.get(trackId + '/' + subjectId) || [];
  }

  function lessonPosition(index, lessonId) {
    return index.positionById.get(lessonId) || null;
  }

  function lessonSlug(lessonId) {
    const match = String(lessonId).match(/-(l\d+)$/);
    return match ? match[1] : '';
  }

  function parseHash(hash) {
    const raw = String(hash || '').replace(/^#/, '').replace(/^\/+/, '');
    const segments = raw.split('/').filter(Boolean).map((part) => {
      try { return decodeURIComponent(part); } catch (e) { return part; }
    });

    if (!segments.length) return { kind: 'home', segments };
    if (segments.length === 1) {
      if (segments[0] === 'review') return { kind: 'review', segments };
      if (segments[0] === 'settings') return { kind: 'settings', segments };
      if (segments[0] === 'not-found') return { kind: 'not-found', segments };
      return { kind: 'track', trackId: segments[0], segments };
    }
    if (segments.length === 2 && segments[0] === 'review') {
      return { kind: 'review-lesson', lessonId: segments[1], segments };
    }
    if (segments.length === 2) {
      return { kind: 'subject', trackId: segments[0], subjectId: segments[1], segments };
    }
    if (segments.length === 3) {
      return {
        kind: 'modules', trackId: segments[0], subjectId: segments[1],
        moduleId: segments[2], segments
      };
    }
    if (segments.length === 4) {
      return {
        kind: 'lesson', trackId: segments[0], subjectId: segments[1],
        moduleId: segments[2], lessonSlug: segments[3], segments
      };
    }
    return { kind: 'unknown', segments };
  }

  function buildHash(segments) {
    const parts = Array.isArray(segments) ? segments : [segments];
    if (!parts.length) return '#/';
    return '#/' + parts.map((part) => encodeURIComponent(part)).join('/');
  }

  function canonicalize(hash) {
    const route = parseHash(hash);
    if (route.kind === 'unknown') return '#/not-found';
    return buildHash(route.segments);
  }

  const STATUS_RANK = { not_started: 0, in_progress: 1, completed: 2 };
  const WORD_LIMITS = { primary: 25, 'lower-secondary': 45, 'upper-secondary': 60 };
  const BLOCK_TYPES = ['text', 'tip', 'illustration', 'example'];
  const BANNED_RE = /\b(jamb|utme|waec|neco|jamstack)\b/i;
  const HTML_RE = /<\/?[a-z][^>]*>/i;

  function countWords(value) {
    return String(value || '').trim().split(/\s+/).filter(Boolean).length;
  }

  function isCompleted(entry) {
    return !!entry && entry.status === 'completed';
  }

  function isUnlocked(index, lessonId, progress) {
    const pos = lessonPosition(index, lessonId);
    if (!pos) return false;
    if (pos.index === 0) return true;
    const previous = orderedLessons(index, pos.trackId, pos.subjectId)[pos.index - 1];
    if (!previous) return false;
    return isCompleted(progress && progress.lessons && progress.lessons[previous.id]);
  }

  function isAnswerCorrect(question, given) {
    if (!question) return false;
    if (question.type === 'numeric') {
      const value = typeof given === 'number' ? given : parseFloat(String(given).trim());
      const answer = Number(question.answer);
      const tolerance = Math.abs(Number(question.tolerance) || 0);
      return Number.isFinite(value) && Number.isFinite(answer) &&
        Math.abs(value - answer) <= tolerance + 1e-9;
    }
    const picked = Number(given);
    return Number.isInteger(picked) && picked === Number(question.answer);
  }

  function scoreQuiz(questions, answers) {
    const list = Array.isArray(questions) ? questions : [];
    const total = list.length;
    let correct = 0;
    list.forEach((question, i) => {
      if (isAnswerCorrect(question, answers ? answers[i] : undefined)) correct += 1;
    });
    const percent = total ? Math.round((correct / total) * 100) : 0;
    return { correct, total, percent, passed: percent >= PASS_PERCENT };
  }

  function emptyProgress(nowIso) {
    return {
      version: 1,
      updatedAt: nowIso || new Date().toISOString(),
      lessons: {}
    };
  }

  function validDate(value) {
    return typeof value === 'string' && !Number.isNaN(Date.parse(value));
  }

  function clampInt(value, min, max) {
    const number = Math.floor(Number(value));
    if (!Number.isFinite(number)) return min;
    return Math.min(max, Math.max(min, number));
  }

  function normalizeEntry(raw) {
    const entry = raw && typeof raw === 'object' ? raw : {};
    const status = Object.prototype.hasOwnProperty.call(STATUS_RANK, entry.status)
      ? entry.status : 'not_started';
    return {
      status,
      bestScore: clampInt(entry.bestScore, 0, 100),
      attempts: clampInt(entry.attempts, 0, Number.MAX_SAFE_INTEGER),
      lastSeenAt: validDate(entry.lastSeenAt) ? entry.lastSeenAt : null,
      reviewStage: clampInt(entry.reviewStage, 0, 4),
      nextReviewAt: validDate(entry.nextReviewAt) ? entry.nextReviewAt : null
    };
  }

  function normalizeProgress(raw) {
    const source = raw && typeof raw === 'object' ? raw : {};
    const lessons = {};
    const sourceLessons = source.lessons && typeof source.lessons === 'object'
      ? source.lessons : {};
    Object.keys(sourceLessons).forEach((id) => {
      lessons[id] = normalizeEntry(sourceLessons[id]);
    });
    return {
      version: 1,
      updatedAt: validDate(source.updatedAt) ? source.updatedAt : null,
      lessons
    };
  }

  function cloneProgress(progress) {
    return normalizeProgress(JSON.parse(JSON.stringify(progress || emptyProgress())));
  }

  function markInProgress(progress, lessonId, nowIso) {
    const next = cloneProgress(progress);
    const now = nowIso || new Date().toISOString();
    const previous = next.lessons[lessonId] || normalizeEntry({});
    next.lessons[lessonId] = {
      status: previous.status === 'completed' ? 'completed' : 'in_progress',
      bestScore: previous.bestScore,
      attempts: previous.attempts,
      lastSeenAt: now,
      reviewStage: previous.reviewStage,
      nextReviewAt: previous.nextReviewAt
    };
    next.updatedAt = now;
    return next;
  }

  function applyAttempt(progress, lessonId, result, nowIso) {
    const next = cloneProgress(progress);
    const previous = next.lessons[lessonId] || normalizeEntry({});
    const wasCompleted = previous.status === 'completed';
    const passed = !!result.passed;
    const percent = clampInt(result.percent, 0, 100);
    const now = nowIso || new Date().toISOString();
    const stage = passed
      ? (wasCompleted ? Math.min(previous.reviewStage + 1, 4) : 0)
      : 0;

    next.lessons[lessonId] = {
      status: passed || wasCompleted ? 'completed' : 'in_progress',
      bestScore: Math.max(previous.bestScore, percent),
      attempts: previous.attempts + 1,
      lastSeenAt: now,
      reviewStage: stage,
      nextReviewAt: (passed || wasCompleted)
        ? new Date(Date.parse(now) + INTERVALS[stage] * DAY_MS).toISOString()
        : null
    };
    next.updatedAt = now;
    return next;
  }

  function dueReviews(progress, nowIso) {
    const now = Date.parse(nowIso);
    const lessons = progress && progress.lessons ? progress.lessons : {};
    return Object.keys(lessons)
      .map((lessonId) => ({ lessonId, entry: lessons[lessonId] }))
      .filter((row) => row.entry.status === 'completed' &&
        validDate(row.entry.nextReviewAt) &&
        Date.parse(row.entry.nextReviewAt) <= now)
      .sort((a, b) => Date.parse(b.entry.nextReviewAt) - Date.parse(a.entry.nextReviewAt));
  }

  function latestDate(a, b) {
    if (!validDate(a)) return validDate(b) ? b : null;
    if (!validDate(b)) return a;
    return Date.parse(a) >= Date.parse(b) ? a : b;
  }

  function earliestDate(a, b) {
    if (!validDate(a)) return validDate(b) ? b : null;
    if (!validDate(b)) return a;
    return Date.parse(a) <= Date.parse(b) ? a : b;
  }

  function mergeProgress(localRaw, remoteRaw) {
    const local = normalizeProgress(localRaw);
    const remote = normalizeProgress(remoteRaw);
    const ids = new Set(Object.keys(local.lessons).concat(Object.keys(remote.lessons)));
    const lessons = {};
    ids.forEach((id) => {
      const a = local.lessons[id];
      const b = remote.lessons[id];
      if (!a) { lessons[id] = b; return; }
      if (!b) { lessons[id] = a; return; }
      lessons[id] = {
        status: STATUS_RANK[a.status] >= STATUS_RANK[b.status] ? a.status : b.status,
        bestScore: Math.max(a.bestScore, b.bestScore),
        attempts: Math.max(a.attempts, b.attempts),
        lastSeenAt: latestDate(a.lastSeenAt, b.lastSeenAt),
        reviewStage: Math.max(a.reviewStage, b.reviewStage),
        nextReviewAt: earliestDate(a.nextReviewAt, b.nextReviewAt)
      };
    });
    return {
      version: 1,
      updatedAt: latestDate(local.updatedAt, remote.updatedAt),
      lessons
    };
  }

  function createProgressStore(storage, key) {
    const storeKey = key || 'learnstack.v1.progress';
    const safeStorage = storage || null;
    return {
      read() {
        if (!safeStorage) return emptyProgress();
        try {
          const raw = safeStorage.getItem(storeKey);
          return raw ? normalizeProgress(JSON.parse(raw)) : emptyProgress();
        } catch (e) {
          return emptyProgress();
        }
      },
      write(progress) {
        if (!safeStorage) return false;
        try {
          safeStorage.setItem(storeKey, JSON.stringify(normalizeProgress(progress)));
          return true;
        } catch (e) {
          return false;
        }
      },
      clear() {
        if (!safeStorage) return false;
        try {
          safeStorage.removeItem(storeKey);
          return true;
        } catch (e) {
          return false;
        }
      }
    };
  }

  function textToParagraphs(text) {
    return String(text || '')
      .trim()
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .filter(Boolean)
      .map((block) => {
        const lines = block.split('\n').map(line => line.trim()).filter(Boolean);
        if (lines.length && lines.every(line => line.startsWith('- '))) {
          return { type: 'ul', items: lines.map(line => line.slice(2).trim()) };
        }
        return { type: 'p', text: lines.join(' ') };
      });
  }

  function pushError(errors, path, message) {
    errors.push(path + ': ' + message);
  }

  function validateString(errors, path, value, maxWords, required) {
    if (typeof value !== 'string' || !value.trim()) {
      if (required) pushError(errors, path, 'is required');
      return;
    }
    if (BANNED_RE.test(value)) pushError(errors, path, 'contains a banned term');
    if (HTML_RE.test(value)) pushError(errors, path, 'contains raw HTML');
    if (maxWords && countWords(value) > maxWords) {
      pushError(errors, path, 'exceeds the ' + maxWords + '-word limit');
    }
  }

  function validateTracks(data) {
    const errors = [];
    const stats = { tracks: 0, subjects: 0, modules: 0, lessons: 0, questions: 0 };
    if (!data || !Array.isArray(data.tracks) || !data.tracks.length) {
      pushError(errors, 'data', 'must contain a non-empty tracks array');
      return { errors, stats };
    }

    const trackIds = new Set();
    const subjectIds = new Set();
    const moduleIds = new Set();
    const lessonIds = new Set();

    data.tracks.forEach((track, ti) => {
      const tp = 'tracks[' + ti + ']';
      stats.tracks += 1;
      if (!track || !track.id) return pushError(errors, tp, 'missing id');
      if (trackIds.has(track.id)) pushError(errors, tp, 'duplicate track id ' + track.id);
      trackIds.add(track.id);
      if (!WORD_LIMITS[track.id]) pushError(errors, tp + '.id', 'is not a supported track id');
      ['label', 'stage', 'ages', 'usEquivalent', 'tone'].forEach((field) => {
        validateString(errors, tp + '.' + field, track[field], 0, true);
      });
      if (!Array.isArray(track.subjects) || !track.subjects.length) {
        return pushError(errors, tp + '.subjects', 'must not be empty');
      }

      track.subjects.forEach((subject, si) => {
        const sp = tp + '.subjects[' + si + ']';
        stats.subjects += 1;
        if (!subject || !subject.id) return pushError(errors, sp, 'missing id');
        const sk = track.id + '/' + subject.id;
        if (subjectIds.has(sk)) pushError(errors, sp, 'duplicate subject id ' + subject.id);
        subjectIds.add(sk);
        validateString(errors, sp + '.label', subject.label, 0, true);
        if (!Array.isArray(subject.modules) || !subject.modules.length) {
          return pushError(errors, sp + '.modules', 'must not be empty');
        }

        const moduleOrders = subject.modules.map(m => m && m.order);
        moduleOrders.forEach((order, i) => {
          if (order !== i + 1) {
            pushError(errors, sp + '.modules[' + i + '].order',
              'must be contiguous starting at 1');
          }
        });

        subject.modules.forEach((mod, mi) => {
          const mp = sp + '.modules[' + mi + ']';
          stats.modules += 1;
          if (!mod || !mod.id) return pushError(errors, mp, 'missing id');
          const mk = sk + '/' + mod.id;
          if (moduleIds.has(mk)) pushError(errors, mp, 'duplicate module id ' + mod.id);
          moduleIds.add(mk);
          validateString(errors, mp + '.title', mod.title, 0, true);
          validateString(errors, mp + '.description', mod.description, 30, true);
          if (!Array.isArray(mod.lessons) || !mod.lessons.length) {
            return pushError(errors, mp + '.lessons', 'must not be empty');
          }

          mod.lessons.forEach((lesson, li) => {
            const lp = mp + '.lessons[' + li + ']';
            validateLesson(errors, stats, lp, lesson, track.id, lessonIds);
          });

          const lessonOrders = mod.lessons.map(l => l && l.order);
          lessonOrders.forEach((order, i) => {
            if (order !== i + 1) {
              pushError(errors, mp + '.lessons[' + i + '].order',
                'must be contiguous starting at 1');
            }
          });
        });
      });
    });

    return { errors, stats };
  }

  function validateLesson(errors, stats, path, lesson, trackId, lessonIds) {
    stats.lessons += 1;
    if (!lesson || typeof lesson !== 'object') {
      return pushError(errors, path, 'must be an object');
    }
    if (!lesson.id) pushError(errors, path, 'missing lesson id');
    else {
      if (lessonIds.has(lesson.id)) pushError(errors, path, 'duplicate lesson id ' + lesson.id);
      lessonIds.add(lesson.id);
      const pattern = new RegExp('^' + trackId + '-maths-m\\d+-l\\d+$');
      if (!pattern.test(lesson.id)) pushError(errors, path + '.id', 'has an invalid lesson id format');
    }
    validateString(errors, path + '.title', lesson.title, 12, true);
    validateString(errors, path + '.objective', lesson.objective, 20, true);
    validateString(errors, path + '.recap', lesson.recap, 30, true);
    if (!Number.isFinite(lesson.minutes) || lesson.minutes < 3 || lesson.minutes > 15) {
      pushError(errors, path + '.minutes', 'must be between 3 and 15');
    }

    const blocks = Array.isArray(lesson.blocks) ? lesson.blocks : [];
    if (!blocks.length) pushError(errors, path + '.blocks', 'must not be empty');
    const explanation = blocks.filter(b => b && (b.type === 'text' || b.type === 'tip'));
    if (explanation.length < 3 || explanation.length > 5) {
      pushError(errors, path + '.blocks',
        'must contain 3 to 5 text or tip explanation blocks');
    }
    if (!blocks.some(b => b && b.type === 'text')) {
      pushError(errors, path + '.blocks', 'must contain at least one text block');
    }
    const illustrations = blocks.filter(b => b && b.type === 'illustration');
    if (illustrations.length !== 1) {
      pushError(errors, path + '.blocks', 'must contain exactly one illustration');
    }
    const examples = blocks.filter(b => b && b.type === 'example');
    if (examples.length !== 1) {
      pushError(errors, path + '.blocks', 'must contain exactly one worked example');
    }

    blocks.forEach((block, bi) => {
      const bp = path + '.blocks[' + bi + ']';
      if (!block || !BLOCK_TYPES.includes(block.type)) {
        return pushError(errors, bp, 'has an unknown block type');
      }
      if (block.type === 'text' || block.type === 'tip') {
        validateString(errors, bp + '.body', block.body, WORD_LIMITS[trackId], true);
      }
      if (block.type === 'illustration') {
        if (typeof block.alt !== 'string' || !block.alt.trim()) {
          pushError(errors, bp + '.alt', 'alt text is required');
        } else {
          validateString(errors, bp + '.alt', block.alt, 40, true);
        }
        const hasImage = typeof block.image === 'string' && block.image.trim();
        const hasSvg = typeof block.svg === 'string' && block.svg.trim();
        const hasPlate = typeof block.placeholder === 'string' && block.placeholder.trim();
        if (!hasImage && !hasSvg) {
          pushError(errors, bp, 'needs a 3D image or an svg');
        }
        if (!hasPlate) {
          pushError(errors, bp + '.placeholder', 'needs a placeholder description');
        }
        if (hasImage &&
            !/^assets\/3d\/[a-z0-9][a-z0-9._-]*\.(png|webp)$/i.test(block.image)) {
          pushError(errors, bp + '.image', 'must be a local assets/3d image');
        }
        if (hasSvg) {
          if (/<script/i.test(block.svg)) pushError(errors, bp + '.svg', 'contains a script tag');
          if (/\son\w+\s*=/i.test(block.svg)) pushError(errors, bp + '.svg', 'contains an event handler');
          if (/(?:href|src)\s*=\s*["']?\s*(?:https?:)?\/\//i.test(block.svg)) {
            pushError(errors, bp + '.svg', 'contains an external URL');
          }
        }
      }
      if (block.type === 'example') {
        if (!Array.isArray(block.steps) || block.steps.length < 2 || block.steps.length > 4) {
          pushError(errors, bp + '.steps', 'must contain 2 to 4 steps');
        } else {
          block.steps.forEach((step, si) => {
            validateString(errors, bp + '.steps[' + si + ']', step, 20, true);
          });
        }
      }
    });

    const vocabulary = Array.isArray(lesson.vocabulary) ? lesson.vocabulary : [];
    if (vocabulary.length < 3 || vocabulary.length > 5) {
      pushError(errors, path + '.vocabulary', 'must contain 3 to 5 vocabulary words');
    }
    vocabulary.forEach((word, wi) => {
      const wp = path + '.vocabulary[' + wi + ']';
      validateString(errors, wp + '.word', word && word.word, 3, true);
      validateString(errors, wp + '.meaning', word && word.meaning, 15, true);
      validateString(errors, wp + '.example', word && word.example, 20, true);
    });

    const quiz = Array.isArray(lesson.quiz) ? lesson.quiz : [];
    if (quiz.length !== 3) pushError(errors, path + '.quiz', 'must contain exactly 3 questions');
    quiz.forEach((question, qi) => {
      const qp = path + '.quiz[' + qi + ']';
      stats.questions += 1;
      if (!question || !['multiple_choice', 'numeric'].includes(question.type)) {
        return pushError(errors, qp, 'has an unknown question type');
      }
      validateString(errors, qp + '.question', question.question, 25, true);
      validateString(errors, qp + '.why', question.why, 30, true);
      if (question.type === 'numeric') {
        if (!Number.isFinite(Number(question.answer))) {
          pushError(errors, qp + '.answer', 'must be a number');
        }
        if (question.tolerance !== undefined &&
            (!Number.isFinite(Number(question.tolerance)) || Number(question.tolerance) < 0)) {
          pushError(errors, qp + '.tolerance', 'must be zero or more');
        }
      } else {
        const options = Array.isArray(question.options) ? question.options : [];
        if (options.length < 2 || options.length > 4) {
          pushError(errors, qp + '.options', 'must contain 2 to 4 options');
        }
        options.forEach((option, oi) => {
          validateString(errors, qp + '.options[' + oi + ']', option, 10, true);
        });
        if (new Set(options.map(String)).size !== options.length) {
          pushError(errors, qp + '.options', 'contains identical options');
        }
        if (!Number.isInteger(question.answer) ||
            question.answer < 0 || question.answer >= options.length) {
          pushError(errors, qp + '.answer', 'has an out-of-range answer index');
        }
      }
    });
  }

  return {
    INTERVALS, DAY_MS, PASS_PERCENT,
    createIndex, getTrack, getSubject, getModule, getLesson,
    orderedLessons, lessonPosition, lessonSlug,
    parseHash, buildHash, canonicalize,
    isCompleted, isUnlocked, isAnswerCorrect, scoreQuiz,
    emptyProgress, normalizeProgress, markInProgress, applyAttempt,
    dueReviews, mergeProgress, createProgressStore,
    textToParagraphs, validateTracks, countWords
  };
});
