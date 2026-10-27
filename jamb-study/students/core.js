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

  return {
    INTERVALS, DAY_MS, PASS_PERCENT,
    createIndex, getTrack, getSubject, getModule, getLesson,
    orderedLessons, lessonPosition, lessonSlug,
    parseHash, buildHash, canonicalize
  };
});
