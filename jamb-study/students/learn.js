(function () {
  'use strict';

  const core = window.LearnCore;
  const index = core.createIndex(window.LEARN_TRACKS);

  const KEYS = {
    progress: 'learnstack.v1.progress',
    settings: 'learnstack.v1.settings'
  };

  function detectStorage() {
    try {
      const probe = 'learnstack.v1.probe';
      window.localStorage.setItem(probe, '1');
      window.localStorage.removeItem(probe);
      return window.localStorage;
    } catch (e) {
      return null;
    }
  }

  const storage = detectStorage();
  const progressStore = core.createProgressStore(storage, KEYS.progress);

  function readSettings() {
    const defaults = { theme: 'system', easyRead: false, nickname: '', confidence: {} };
    if (!storage) return defaults;
    try {
      const raw = JSON.parse(storage.getItem(KEYS.settings) || '{}');
      return {
        theme: ['system', 'light', 'dark'].indexOf(raw.theme) >= 0 ? raw.theme : 'system',
        easyRead: !!raw.easyRead,
        nickname: typeof raw.nickname === 'string' ? raw.nickname.slice(0, 24) : '',
        confidence: raw.confidence && typeof raw.confidence === 'object'
          ? raw.confidence : {}
      };
    } catch (e) {
      return defaults;
    }
  }

  const state = {
    progress: progressStore.read(),
    settings: readSettings(),
    memoryOnly: !storage,
    route: null
  };

  function saveSettings(patch) {
    state.settings = Object.assign({}, state.settings, patch);
    if (storage) {
      try {
        storage.setItem(KEYS.settings, JSON.stringify(state.settings));
      } catch (e) { /* storage blocked — settings apply for this session only */ }
    }
    applyDisplaySettings();
  }

  function resolveTheme() {
    if (state.settings.theme !== 'system') return state.settings.theme;
    const light = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches;
    return light ? 'light' : 'dark';
  }

  function applyDisplaySettings() {
    const theme = resolveTheme();
    document.documentElement.dataset.theme = theme;
    document.body.classList.toggle('is-easy-read', !!state.settings.easyRead);

    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.textContent = theme === 'light' ? 'Dark' : 'Light';
      toggle.setAttribute('aria-label',
        'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' theme');
    }

    const notice = document.getElementById('storageNotice');
    if (notice) notice.hidden = !!storage;
  }

  function el(tag, options, children) {
    const node = document.createElement(tag);
    const opts = options || {};
    if (opts.className) node.className = opts.className;
    if (opts.text !== undefined) node.textContent = opts.text;
    if (opts.attrs) {
      Object.keys(opts.attrs).forEach((name) => {
        const value = opts.attrs[name];
        if (value !== null && value !== undefined) {
          node.setAttribute(name, String(value));
        }
      });
    }
    (children || []).forEach((child) => {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function announce(text) {
    const region = document.getElementById('learnAnnouncer');
    if (region) region.textContent = text;
  }

  function subjectProgress(trackId, subjectId) {
    const lessons = core.orderedLessons(index, trackId, subjectId);
    const done = lessons.filter((lesson) =>
      core.isCompleted(state.progress.lessons[lesson.id])).length;
    return { total: lessons.length, done };
  }

  function lessonStatus(lesson) {
    const entry = state.progress.lessons[lesson.id];
    if (core.isCompleted(entry)) {
      const total = lesson.quiz.length;
      const correct = Math.round((entry.bestScore / 100) * total);
      return { key: 'completed', text: 'Completed · ' + correct + '/' + total };
    }
    if (entry && entry.status === 'in_progress') {
      return { key: 'in-progress', text: 'In progress' };
    }
    return { key: 'not-started', text: 'Not started' };
  }

  function renderChooser(main) {
    main.appendChild(el('section', { className: 'learn-hero' }, [
      el('p', { className: 'learn-eyebrow', text: 'LearnStack' }),
      el('h1', { text: 'What would you like to learn?' }),
      el('p', {
        className: 'learn-lede',
        text: 'Start at the beginning. Each short lesson unlocks the next one.'
      })
    ]));

    const grid = el('div', { className: 'track-grid' });
    index.tracks.forEach((track) => {
      const subject = track.subjects[0];
      const progress = subject
        ? subjectProgress(track.id, subject.id)
        : { total: 0, done: 0 };
      const card = el('a', {
        className: 'track-card',
        attrs: { href: core.buildHash([track.id]), 'data-track': track.id }
      }, [
        el('span', { className: 'track-kicker', text: track.stage }),
        el('h2', { text: track.label }),
        el('p', { className: 'learn-muted', text: track.tone }),
        el('p', { className: 'track-meta' }, [
          el('span', { text: 'Ages ' + track.ages }),
          el('span', { text: track.usEquivalent })
        ]),
        el('p', {
          className: 'track-progress',
          text: progress.done + ' of ' + progress.total + ' lessons complete'
        })
      ]);
      grid.appendChild(card);
    });
    main.appendChild(grid);
    main.appendChild(el('p', {
      className: 'learn-helper',
      text: 'Not sure where to start? Begin with Primary.'
    }));
  }

  function renderSubject(main, track) {
    const subject = track.subjects[0];
    if (!subject) return renderNotFound(main);
    const progress = subjectProgress(track.id, subject.id);

    main.appendChild(el('a', {
      className: 'learn-backline',
      attrs: { href: '#/' },
      text: 'Back to all tracks'
    }));

    main.appendChild(el('section', { className: 'learn-hero' }, [
      el('p', { className: 'learn-eyebrow', text: track.stage }),
      el('h1', { text: track.label }),
      el('p', { className: 'learn-lede', text: track.tone + ' Choose a subject to begin.' })
    ]));

    main.appendChild(el('a', {
      className: 'subject-card',
      attrs: { href: core.buildHash([track.id, subject.id]) }
    }, [
      el('h2', { text: subject.label }),
      el('p', { className: 'learn-muted', text: 'Start at Module 1 and work through one lesson at a time.' }),
      el('p', {
        className: 'learn-count',
        text: progress.done + ' of ' + progress.total + ' lessons complete'
      }),
      el('span', { className: 'learn-cta', text: 'Open modules' })
    ]));

    main.appendChild(el('div', { className: 'learn-how' }, [
      el('p', { text: 'How this works: finish a lesson to unlock the next one. You can retry any quiz.' })
    ]));
  }

  function moduleLockNote(trackId, subject, moduleIndex) {
    const ordered = subject.modules.slice().sort((a, b) => a.order - b.order);
    const previous = ordered[moduleIndex - 1];
    if (!previous) return null;
    const lessons = index.lessonsByModule.get(
      trackId + '/' + subject.id + '/' + previous.id) || [];
    const last = lessons[lessons.length - 1];
    return last ? 'Finish “' + last.title + '” to open this module.' : null;
  }

  function renderModules(main, route) {
    const track = core.getTrack(index, route.trackId);
    const subject = core.getSubject(index, route.trackId, route.subjectId);
    if (!track || !subject) return renderNotFound(main);

    main.appendChild(el('a', {
      className: 'learn-backline',
      attrs: { href: core.buildHash([track.id]) },
      text: 'Back to ' + track.label
    }));

    main.appendChild(el('section', { className: 'learn-hero' }, [
      el('p', { className: 'learn-eyebrow', text: track.label + ' · ' + track.stage }),
      el('h1', { text: subject.label }),
      el('p', {
        className: 'learn-lede',
        text: 'Start at Module 1. Finish a lesson to unlock the next one.'
      })
    ]));

    const orderedModules = subject.modules.slice().sort((a, b) => a.order - b.order);
    const list = el('div', { className: 'module-list' });
    orderedModules.forEach((mod, mi) => {
      const lessons = index.lessonsByModule.get(
        track.id + '/' + subject.id + '/' + mod.id) || [];
      const first = lessons[0];
      const open = !!first && core.isUnlocked(index, first.id, state.progress);
      const done = lessons.filter((lesson) =>
        core.isCompleted(state.progress.lessons[lesson.id])).length;

      const card = el(open ? 'a' : 'div', {
        className: 'module-card' + (open ? '' : ' is-locked'),
        attrs: open ? { href: core.buildHash([track.id, subject.id, mod.id]) } : {}
      }, [
        el('div', { className: 'module-head' }, [
          el('div', {}, [
            el('p', { className: 'learn-eyebrow', text: 'Module ' + mod.order }),
            el('h2', { text: mod.title }),
            el('p', { className: 'learn-muted', text: mod.description })
          ]),
          el('span', {
            className: 'learn-status' + (open ? '' : ' is-locked'),
            text: open ? done + ' / ' + lessons.length + ' complete' : 'Locked'
          })
        ])
      ]);

      if (!open) {
        const note = moduleLockNote(track.id, subject, mi);
        if (note) {
          card.appendChild(el('p', { className: 'lesson-lock-note', text: note }));
        }
      }
      list.appendChild(card);
    });
    main.appendChild(list);
  }

  function renderLessons(main, route) {
    const track = core.getTrack(index, route.trackId);
    const subject = core.getSubject(index, route.trackId, route.subjectId);
    const mod = core.getModule(index, route.trackId, route.subjectId, route.moduleId);
    if (!track || !subject || !mod) return renderNotFound(main);

    main.appendChild(el('a', {
      className: 'learn-backline',
      attrs: { href: core.buildHash([track.id, subject.id]) },
      text: 'Back to modules'
    }));

    main.appendChild(el('section', { className: 'learn-hero' }, [
      el('p', { className: 'learn-eyebrow', text: 'Module ' + mod.order }),
      el('h1', { text: mod.title }),
      el('p', { className: 'learn-lede', text: mod.description })
    ]));

    const lessons = index.lessonsByModule.get(
      track.id + '/' + subject.id + '/' + mod.id) || [];
    const ordered = core.orderedLessons(index, track.id, subject.id);
    const list = el('div', { className: 'lesson-list' });

    lessons.forEach((lesson) => {
      const open = core.isUnlocked(index, lesson.id, state.progress);
      const status = open
        ? lessonStatus(lesson)
        : { key: 'locked', text: 'Locked' };
      const row = el(open ? 'a' : 'div', {
        className: 'lesson-row' + (open ? '' : ' is-locked'),
        attrs: open ? {
          href: core.buildHash([
            track.id, subject.id, mod.id, core.lessonSlug(lesson.id)
          ])
        } : {}
      }, [
        el('span', { className: 'lesson-number', text: String(lesson.order) }),
        el('span', { className: 'lesson-copy' }, [
          el('span', { className: 'lesson-title', text: lesson.title }),
          el('span', { className: 'lesson-sub', text: lesson.minutes + ' min' })
        ]),
        el('span', {
          className: 'learn-status is-' + status.key,
          text: status.text
        })
      ]);

      if (!open) {
        const pos = core.lessonPosition(index, lesson.id);
        const previous = pos && pos.index > 0 ? ordered[pos.index - 1] : null;
        row.appendChild(el('p', {
          className: 'lesson-lock-note',
          text: previous
            ? 'Finish “' + previous.title + '” first.'
            : 'Finish the lesson before this one first.'
        }));
      }
      list.appendChild(row);
    });

    main.appendChild(list);
  }

  function renderNotFound(main) {
    main.appendChild(el('section', { className: 'learn-empty' }, [
      el('p', { className: 'learn-eyebrow', text: 'Not found' }),
      el('h1', { text: 'That page is not here.' }),
      el('p', { text: 'Choose a track and start from the beginning.' }),
      el('a', { className: 'learn-btn', attrs: { href: '#/' }, text: 'Go to the start' })
    ]));
  }

  function route() {
    const app = document.getElementById('app');
    const main = document.getElementById('learnMain');
    if (!app || !main) return;

    const parsed = core.parseHash(window.location.hash);
    state.route = parsed;
    app.replaceChildren();
    main.dataset.track = parsed.trackId || '';
    window.scrollTo(0, 0);

    switch (parsed.kind) {
      case 'home':
        renderChooser(app);
        break;
      case 'track': {
        const track = core.getTrack(index, parsed.trackId);
        if (!track) renderNotFound(app);
        else renderSubject(app, track);
        break;
      }
      case 'subject':
        renderModules(app, parsed);
        break;
      case 'modules':
        renderLessons(app, parsed);
        break;
      default:
        renderNotFound(app);
    }

    const heading = app.querySelector('h1');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
      announce(heading.textContent);
    }
  }

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      saveSettings({ theme: resolveTheme() === 'light' ? 'dark' : 'light' });
    });
  }

  if (window.matchMedia) {
    const query = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => {
      if (state.settings.theme === 'system') applyDisplaySettings();
    };
    if (query.addEventListener) query.addEventListener('change', onChange);
    else if (query.addListener) query.addListener(onChange);
  }

  window.addEventListener('hashchange', route);

  applyDisplaySettings();
  route();
})();
