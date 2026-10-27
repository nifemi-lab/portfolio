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
    route: null,
    sync: 'saved locally',
    syncReady: false
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

  function findLessonBySlug(trackId, subjectId, moduleId, slug) {
    const lessons = index.lessonsByModule.get(
      trackId + '/' + subjectId + '/' + moduleId) || [];
    return lessons.find((lesson) => core.lessonSlug(lesson.id) === slug) || null;
  }

  function lessonHash(trackId, subjectId, moduleId, lesson) {
    return core.buildHash([
      trackId, subjectId, moduleId, core.lessonSlug(lesson.id)
    ]);
  }

  function persistProgress(next) {
    state.progress = next;
    progressStore.write(next);
    schedulePush();
  }

  function recordLessonOpen(lesson) {
    persistProgress(core.markInProgress(
      state.progress, lesson.id, new Date().toISOString()));
  }

  const PENDING_DELETE_KEY = 'learnstack.v1.pending-delete';
  let pushTimer = null;
  let syncInFlight = false;

  function cloudOn() {
    return !!(window.LearnCloud && window.LearnCloud.enabled);
  }

  function syncFailureLabel() {
    return typeof navigator !== 'undefined' && navigator.onLine === false
      ? 'offline'
      : 'saved locally';
  }

  function syncTitle(label) {
    if (label === 'synced') {
      return 'Progress is saved in this browser and backed up.';
    }
    if (label === 'saving…') {
      return 'Progress is saved in this browser. A backup is in progress.';
    }
    if (label === 'connecting…') {
      return 'Progress is saved in this browser. Checking the backup.';
    }
    if (label === 'offline') {
      return 'Progress is saved in this browser. The backup will retry when you are online.';
    }
    return 'Progress is saved in this browser only.';
  }

  function setSyncStatus(label) {
    state.sync = label;
    const chip = document.getElementById('learnSyncChip');
    if (chip) {
      chip.textContent = label;
      chip.setAttribute('title', syncTitle(label));
    }
    const settingsText = document.getElementById('settingsSyncText');
    if (settingsText) {
      settingsText.textContent =
        'Progress is saved in this browser. Status: ' + label + '.';
    }
  }

  function rowsToProgress(rows) {
    const lessons = {};
    rows.forEach((row) => {
      lessons[row.lessonId] = {
        status: row.status,
        bestScore: row.bestScore,
        attempts: row.attempts,
        lastSeenAt: row.lastSeenAt,
        reviewStage: row.reviewStage,
        nextReviewAt: row.nextReviewAt
      };
    });
    return core.normalizeProgress({
      version: 1,
      updatedAt: new Date().toISOString(),
      lessons
    });
  }

  function readPendingDelete() {
    if (!storage) return false;
    try {
      return storage.getItem(PENDING_DELETE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function queuePendingDelete() {
    if (!storage) return;
    try {
      storage.setItem(PENDING_DELETE_KEY, '1');
    } catch (e) { /* storage blocked */ }
  }

  function clearPendingDelete() {
    if (!storage) return;
    try {
      storage.removeItem(PENDING_DELETE_KEY);
    } catch (e) { /* storage blocked */ }
  }

  async function pushNow() {
    if (!cloudOn()) return;
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setSyncStatus('offline');
      return;
    }
    setSyncStatus('saving…');
    try {
      await window.LearnCloud.pushProgress(state.progress);
      setSyncStatus('synced');
    } catch (e) {
      setSyncStatus(syncFailureLabel());
    }
  }

  function schedulePush() {
    if (!cloudOn() || !state.syncReady) return;
    setSyncStatus('saving…');
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(() => {
      pushTimer = null;
      pushNow();
    }, 1500);
  }

  async function initSync() {
    if (syncInFlight) return;
    if (!cloudOn()) {
      state.syncReady = true;
      setSyncStatus('saved locally');
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      state.syncReady = true;
      setSyncStatus('offline');
      return;
    }

    syncInFlight = true;
    setSyncStatus('connecting…');
    try {
      await window.LearnCloud.ensureSession();

      if (readPendingDelete()) {
        await window.LearnCloud.deleteProgress();
        clearPendingDelete();
        state.syncReady = true;
        setSyncStatus('saved locally');
        return;
      }

      const remoteRows = await window.LearnCloud.pullProgress();
      const merged = core.mergeProgress(state.progress, rowsToProgress(remoteRows));
      state.progress = merged;
      progressStore.write(merged);

      await window.LearnCloud.pushProgress(merged);
      state.syncReady = true;
      setSyncStatus('synced');
      if (!state.lesson) route();
    } catch (e) {
      state.syncReady = true;
      setSyncStatus(syncFailureLabel());
    } finally {
      syncInFlight = false;
    }
  }

  async function deleteAllData() {
    deleteLocalData();
    if (!cloudOn()) {
      setSyncStatus('saved locally');
      return 'local';
    }
    try {
      await window.LearnCloud.deleteProgress();
      clearPendingDelete();
      setSyncStatus('saved locally');
      return 'all';
    } catch (e) {
      queuePendingDelete();
      setSyncStatus('offline');
      return 'pending';
    }
  }

  function buildSteps(lesson) {
    const steps = [{ kind: 'objective' }, { kind: 'vocabulary' }];
    lesson.blocks
      .filter((block) => block.type === 'text' || block.type === 'tip')
      .forEach((block) => steps.push({ kind: 'block', block }));
    const illustration = lesson.blocks.find((block) => block.type === 'illustration');
    if (illustration) steps.push({ kind: 'illustration', block: illustration });
    const example = lesson.blocks.find((block) => block.type === 'example');
    if (example) steps.push({ kind: 'example', block: example });
    steps.push({ kind: 'recap' }, { kind: 'confidence' });
    return steps;
  }

  function stepHeading(step, lesson) {
    if (step.kind === 'objective') return lesson.title;
    if (step.kind === 'vocabulary') return 'Words to know';
    if (step.kind === 'block') return step.block.type === 'tip' ? 'Tip' : 'The idea';
    if (step.kind === 'illustration') return 'Look at the diagram';
    if (step.kind === 'example') return 'Worked example';
    if (step.kind === 'recap') return 'Recap';
    return 'How ready do you feel?';
  }

  function appendText(target, text) {
    core.textToParagraphs(text).forEach((node) => {
      if (node.type === 'ul') {
        const list = el('ul');
        node.items.forEach((item) => list.appendChild(el('li', { text: item })));
        target.appendChild(list);
      } else {
        target.appendChild(el('p', { text: node.text }));
      }
    });
  }

  function renderIllustration(block) {
    const figure = el('figure', { className: 'lesson-figure' });
    let inserted = false;

    if (typeof block.svg === 'string' && block.svg.trim()) {
      try {
        const doc = new DOMParser().parseFromString(block.svg, 'image/svg+xml');
        const svg = doc.documentElement;
        if (svg && svg.nodeName.toLowerCase() === 'svg' &&
            !doc.querySelector('parsererror')) {
          const imported = document.importNode(svg, true);
          imported.setAttribute('aria-hidden', 'true');
          imported.setAttribute('focusable', 'false');
          figure.appendChild(imported);
          inserted = true;
        }
      } catch (e) {
        inserted = false;
      }
    }

    if (!inserted) {
      figure.appendChild(el('div', { className: 'illustration-plate' }, [
        el('span', { className: 'plate-label', text: 'Diagram' }),
        el('p', { text: block.placeholder || block.alt })
      ]));
    }
    figure.appendChild(el('figcaption', { text: block.alt }));
    return figure;
  }

  function renderStepBody(step, lesson, holder) {
    if (step.kind === 'objective') {
      holder.appendChild(el('p', { className: 'lesson-objective', text: lesson.objective }));
      holder.appendChild(el('p', {
        className: 'lesson-meta',
        text: 'About ' + lesson.minutes + ' minutes. Take your time.'
      }));
      return;
    }

    if (step.kind === 'vocabulary') {
      holder.appendChild(el('p', {
        className: 'lesson-muted',
        text: 'These words will help with this lesson.'
      }));
      const list = el('ul', { className: 'vocab-list' });
      lesson.vocabulary.forEach((word) => {
        list.appendChild(el('li', { className: 'vocab-card' }, [
          el('strong', { text: word.word }),
          el('p', { text: word.meaning }),
          el('p', { className: 'vocab-example', text: word.example })
        ]));
      });
      holder.appendChild(list);
      return;
    }

    if (step.kind === 'block') {
      const body = el('div', {
        className: 'lesson-body' + (step.block.type === 'tip' ? ' lesson-tip' : '')
      });
      appendText(body, step.block.body);
      holder.appendChild(body);
      return;
    }

    if (step.kind === 'illustration') {
      holder.appendChild(renderIllustration(step.block));
      return;
    }

    if (step.kind === 'example') {
      const list = el('ol', { className: 'example-steps' });
      step.block.steps.forEach((text, i) => {
        list.appendChild(el('li', {}, [
          el('span', { className: 'step-badge', text: String(i + 1) }),
          el('p', { text })
        ]));
      });
      holder.appendChild(list);
      return;
    }

    if (step.kind === 'recap') {
      holder.appendChild(el('div', { className: 'lesson-recap' }, [
        el('p', { text: lesson.recap })
      ]));
      return;
    }

    const saved = state.settings.confidence[lesson.id];
    const labels = { ready: 'Ready', unsure: 'A bit unsure', 'not-yet': 'Not yet' };
    const grid = el('div', { className: 'confidence-grid' });
    const note = el('p', {
      className: 'confidence-note',
      attrs: { 'aria-live': 'polite' },
      text: saved
        ? 'You chose: ' + labels[saved] + '. You can change this any time.'
        : 'Choose one. This is not graded.'
    });

    [['ready', 'Ready'], ['unsure', 'A bit unsure'], ['not-yet', 'Not yet']]
      .forEach((pair) => {
        const value = pair[0];
        const button = el('button', {
          className: 'confidence-btn' + (saved === value ? ' is-picked' : ''),
          attrs: {
            type: 'button',
            'aria-pressed': saved === value ? 'true' : 'false'
          },
          text: pair[1]
        });
        button.addEventListener('click', () => {
          const confidence = Object.assign({}, state.settings.confidence);
          confidence[lesson.id] = value;
          saveSettings({ confidence });
          Array.prototype.forEach.call(grid.children, (child) => {
            child.classList.remove('is-picked');
            child.setAttribute('aria-pressed', 'false');
          });
          button.classList.add('is-picked');
          button.setAttribute('aria-pressed', 'true');
          note.textContent = 'You chose: ' + pair[1] + '. You can change this any time.';
          announce('Confidence saved: ' + pair[1] + '.');
        });
        grid.appendChild(button);
      });

    holder.appendChild(el('p', {
      className: 'lesson-muted',
      text: 'This check is private. It is not part of your score.'
    }));
    holder.appendChild(grid);
    holder.appendChild(note);

    const startButton = el('button', {
      className: 'learn-btn',
      attrs: { type: 'button' },
      text: 'Start quiz'
    });
    startButton.addEventListener('click', startQuiz);
    holder.appendChild(startButton);
  }

  function renderStep(focus) {
    const holder = document.getElementById('lessonStep');
    if (!holder || !state.lesson) return;

    const lesson = state.lesson.lesson;
    const steps = state.lesson.steps;
    const stepIndex = state.lesson.step;
    const step = steps[stepIndex];

    holder.replaceChildren();
    const heading = el('h1', { text: stepHeading(step, lesson) });
    holder.appendChild(heading);
    renderStepBody(step, lesson, holder);

    const count = document.getElementById('stepCount');
    if (count) {
      count.textContent = 'Step ' + (stepIndex + 1) + ' of ' + steps.length;
    }

    const bar = document.querySelector('.learn-progress');
    if (bar) bar.setAttribute('aria-valuenow', String(stepIndex + 1));
    const fill = document.querySelector('.learn-progress-fill');
    if (fill) fill.style.width = (((stepIndex + 1) / steps.length) * 100) + '%';

    const back = document.getElementById('stepBack');
    const next = document.getElementById('stepNext');
    if (back) back.disabled = stepIndex === 0;
    if (next) next.hidden = stepIndex === steps.length - 1;

    if (focus) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
      window.scrollTo(0, 0);
      announce('Step ' + (stepIndex + 1) + ' of ' + steps.length +
        '. ' + heading.textContent);
    }
  }

  function moveStep(delta) {
    if (!state.lesson) return;
    const max = state.lesson.steps.length - 1;
    const next = Math.min(max, Math.max(0, state.lesson.step + delta));
    if (next === state.lesson.step) return;
    state.lesson.step = next;
    renderStep(true);
  }

  function renderLessonPlayer(main, track, subject, mod, lesson) {
    const steps = buildSteps(lesson);
    state.lesson = {
      lesson, steps, step: 0, mode: 'steps',
      quiz: null, result: null, review: false
    };

    const top = el('div', { className: 'lesson-top' }, [
      el('a', {
        className: 'learn-backline',
        attrs: { href: core.buildHash([track.id, subject.id, mod.id]) },
        text: 'Back to lessons'
      }),
      el('p', { className: 'lesson-top-title', text: lesson.title }),
      el('p', {
        className: 'step-count',
        attrs: { id: 'stepCount' },
        text: 'Step 1 of ' + steps.length
      })
    ]);

    const bar = el('div', {
      className: 'learn-progress',
      attrs: {
        role: 'progressbar',
        'aria-valuemin': '1',
        'aria-valuemax': String(steps.length),
        'aria-valuenow': '1',
        'aria-label': 'Lesson progress'
      }
    }, [el('span', { className: 'learn-progress-fill' })]);

    const panel = el('section', {
      className: 'lesson-step',
      attrs: { id: 'lessonStep' }
    });

    const backButton = el('button', {
      className: 'learn-btn is-ghost',
      attrs: { type: 'button', id: 'stepBack' },
      text: 'Back'
    });
    const nextButton = el('button', {
      className: 'learn-btn',
      attrs: { type: 'button', id: 'stepNext' },
      text: 'Next'
    });
    backButton.addEventListener('click', () => moveStep(-1));
    nextButton.addEventListener('click', () => moveStep(1));

    main.appendChild(el('div', { className: 'lesson-shell' }, [
      top,
      bar,
      panel,
      el('div', { className: 'lesson-actions' }, [backButton, nextButton])
    ]));

    renderStep(false);
  }

  function renderLockedLesson(main, track, subject, mod, lesson) {
    const ordered = core.orderedLessons(index, track.id, subject.id);
    const pos = core.lessonPosition(index, lesson.id);
    const previous = pos && pos.index > 0 ? ordered[pos.index - 1] : null;

    main.appendChild(el('a', {
      className: 'learn-backline',
      attrs: { href: core.buildHash([track.id, subject.id, mod.id]) },
      text: 'Back to lessons'
    }));

    const children = [
      el('p', { className: 'learn-eyebrow', text: 'Lesson locked' }),
      el('h1', { text: 'Finish the lesson before this one.' }),
      el('p', {
        text: previous
          ? 'Finish Lesson ' + previous.order + ': ' + previous.title + ' first.'
          : 'Start with the first lesson in this module.'
      })
    ];

    if (previous) {
      children.push(el('a', {
        className: 'learn-btn',
        attrs: {
          href: lessonHash(track.id, subject.id, pos.moduleId, previous)
        },
        text: 'Go to “' + previous.title + '”'
      }));
    }
    children.push(el('a', {
      className: 'learn-btn is-ghost',
      attrs: { href: core.buildHash([track.id, subject.id, mod.id]) },
      text: 'Back to lessons'
    }));

    main.appendChild(el('section', { className: 'learn-empty' }, children));
  }

  function neighbourLessons(lesson) {
    const pos = core.lessonPosition(index, lesson.id);
    if (!pos) return { previous: null, next: null };
    const ordered = core.orderedLessons(index, pos.trackId, pos.subjectId);
    return {
      previous: ordered[pos.index - 1] || null,
      next: ordered[pos.index + 1] || null
    };
  }

  function setProgressBar(current, total) {
    const bar = document.querySelector('.learn-progress');
    if (bar) {
      bar.setAttribute('aria-valuemax', String(total));
      bar.setAttribute('aria-valuenow', String(current));
    }
    const fill = document.querySelector('.learn-progress-fill');
    if (fill) fill.style.width = ((current / total) * 100) + '%';
  }

  function hasAnswer(question, answer) {
    if (question.type === 'numeric') {
      return answer !== null && answer !== undefined && String(answer).trim() !== '';
    }
    return Number.isInteger(answer);
  }

  function startQuiz() {
    if (!state.lesson) return;
    const lesson = state.lesson.lesson;
    state.lesson.mode = 'quiz';
    state.lesson.step = state.lesson.steps.length - 1;
    state.lesson.quiz = {
      index: 0,
      checked: false,
      answers: lesson.quiz.map(() => null)
    };
    state.lesson.result = null;
    renderQuiz(false);
  }

  function updateQuizButton() {
    const session = state.lesson;
    if (!session || !session.quiz) return;
    const button = document.getElementById('quizCheck');
    if (!button) return;
    const quiz = session.quiz;
    const question = session.lesson.quiz[quiz.index];
    if (quiz.checked) {
      button.textContent = quiz.index === session.lesson.quiz.length - 1
        ? 'See result'
        : 'Next question';
      button.disabled = false;
    } else {
      button.textContent = 'Check';
      button.disabled = !hasAnswer(question, quiz.answers[quiz.index]);
    }
  }

  function renderQuiz(focus) {
    const session = state.lesson;
    if (!session) return;
    const lesson = session.lesson;
    const quiz = session.quiz;
    const question = lesson.quiz[quiz.index];
    const panel = document.getElementById('lessonStep');
    if (!panel) return;

    const actions = document.querySelector('.lesson-actions');
    if (actions) actions.hidden = true;

    const count = document.getElementById('stepCount');
    if (count) count.textContent = 'Question ' + (quiz.index + 1) + ' of ' + lesson.quiz.length;
    setProgressBar(quiz.index + 1, lesson.quiz.length);

    panel.replaceChildren();
    const heading = el('h1', {
      text: 'Question ' + (quiz.index + 1) + ' of ' + lesson.quiz.length
    });
    panel.appendChild(el('p', { className: 'learn-eyebrow', text: 'Quick check' }));
    panel.appendChild(heading);
    panel.appendChild(el('p', {
      className: 'quiz-question',
      text: question.question
    }));

    if (question.type === 'numeric') {
      const input = el('input', {
        className: 'quiz-input',
        attrs: {
          type: 'text',
          inputmode: 'decimal',
          autocomplete: 'off',
          id: 'quizNumeric',
          'aria-label': question.question
        }
      });
      input.value = quiz.answers[quiz.index] === null
        ? ''
        : String(quiz.answers[quiz.index]);
      input.disabled = quiz.checked;
      input.addEventListener('input', () => {
        quiz.answers[quiz.index] = input.value;
        updateQuizButton();
      });
      panel.appendChild(el('label', {
        className: 'lesson-muted',
        attrs: { for: 'quizNumeric' },
        text: 'Type your answer'
      }));
      panel.appendChild(input);
    } else {
      const fieldset = el('fieldset', { className: 'quiz-options' });
      fieldset.appendChild(el('legend', {
        className: 'sr-only',
        text: question.question
      }));
      question.options.forEach((option, i) => {
        const input = el('input', {
          attrs: {
            type: 'radio',
            name: 'quizAnswer',
            value: String(i),
            id: 'quizOption' + i
          }
        });
        input.checked = quiz.answers[quiz.index] === i;
        input.disabled = quiz.checked;
        input.addEventListener('change', () => {
          quiz.answers[quiz.index] = i;
          updateQuizButton();
        });
        fieldset.appendChild(el('label', {
          className: 'quiz-option',
          attrs: { for: 'quizOption' + i }
        }, [
          input,
          el('span', { text: option })
        ]));
      });
      panel.appendChild(fieldset);
    }

    const check = el('button', {
      className: 'learn-btn',
      attrs: { type: 'button', id: 'quizCheck' },
      text: 'Check'
    });
    check.addEventListener('click', onQuizButton);
    panel.appendChild(el('div', { className: 'quiz-actions' }, [check]));
    panel.appendChild(el('div', { attrs: { id: 'quizFeedback' } }));
    updateQuizButton();

    if (focus) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
      window.scrollTo(0, 0);
    }
  }

  function checkAnswer() {
    const session = state.lesson;
    if (!session || !session.quiz) return;
    const lesson = session.lesson;
    const quiz = session.quiz;
    const question = lesson.quiz[quiz.index];
    const correct = core.isAnswerCorrect(question, quiz.answers[quiz.index]);
    quiz.checked = true;

    const panel = document.getElementById('lessonStep');
    if (panel) {
      Array.prototype.forEach.call(panel.querySelectorAll('input'), (input) => {
        input.disabled = true;
      });
    }

    const host = document.getElementById('quizFeedback');
    if (host) {
      host.replaceChildren();
      const feedback = el('div', {
        className: 'quiz-feedback ' + (correct ? 'is-correct' : 'is-needs-work'),
        attrs: { 'aria-live': 'polite' }
      }, [
        el('strong', {
          text: correct ? 'Yes — that’s right.' : 'Not yet. Here’s the idea.'
        }),
        el('p', { text: question.why })
      ]);
      host.appendChild(feedback);
    }

    announce(correct
      ? 'Correct. ' + question.why
      : 'Not yet. ' + question.why);
    updateQuizButton();
    const button = document.getElementById('quizCheck');
    if (button) button.focus();
  }

  function onQuizButton() {
    const session = state.lesson;
    if (!session || !session.quiz) return;
    const quiz = session.quiz;
    if (!quiz.checked) {
      checkAnswer();
      return;
    }
    if (quiz.index < session.lesson.quiz.length - 1) {
      quiz.index += 1;
      quiz.checked = false;
      renderQuiz(true);
      return;
    }
    finishQuiz();
  }

  function finishQuiz() {
    const session = state.lesson;
    if (!session || !session.quiz) return;
    const lesson = session.lesson;
    const result = core.scoreQuiz(lesson.quiz, session.quiz.answers);
    persistProgress(core.applyAttempt(
      state.progress, lesson.id, result, new Date().toISOString()));
    session.result = result;
    renderResult();
  }

  function restartLesson() {
    if (!state.lesson) return;
    state.lesson.mode = 'steps';
    state.lesson.step = 0;
    state.lesson.quiz = null;
    state.lesson.result = null;
    const actions = document.querySelector('.lesson-actions');
    if (actions) actions.hidden = false;
    renderStep(true);
  }

  function renderResult() {
    const session = state.lesson;
    if (!session || !session.result) return;
    const lesson = session.lesson;
    const result = session.result;
    const panel = document.getElementById('lessonStep');
    if (!panel) return;

    const actions = document.querySelector('.lesson-actions');
    if (actions) actions.hidden = true;

    const count = document.getElementById('stepCount');
    if (count) count.textContent = 'Result';
    setProgressBar(lesson.quiz.length, lesson.quiz.length);

    panel.replaceChildren();
    panel.appendChild(el('p', {
      className: 'learn-eyebrow',
      text: result.passed ? 'Lesson complete' : 'Not yet'
    }));
    const heading = el('h1', {
      text: result.passed
        ? (session.review ? 'Review complete' : 'Lesson complete')
        : 'Not yet — try once more'
    });
    panel.appendChild(heading);
    panel.appendChild(el('p', {
      className: 'quiz-score',
      text: result.correct + ' of ' + result.total + ' correct (' + result.percent + '%)'
    }));
    panel.appendChild(el('p', {
      text: result.passed
        ? 'You worked through the steps and checked your understanding. That is how learning sticks.'
        : 'A mistake is a clue. Read the explanations again, then try once more when you are ready.'
    }));

    const row = el('div', { className: 'result-actions' });
    const pos = core.lessonPosition(index, lesson.id);
    const next = pos ? neighbourLessons(lesson).next : null;

    if (result.passed && !session.review && next && pos) {
      row.appendChild(el('a', {
        className: 'learn-btn',
        attrs: { href: lessonHash(pos.trackId, pos.subjectId, pos.moduleId, next) },
        text: 'Next lesson'
      }));
    }

    if (!session.review) {
      const again = el('button', {
        className: 'learn-btn is-ghost',
        attrs: { type: 'button' },
        text: result.passed ? 'Review this lesson' : 'Read the lesson again'
      });
      again.addEventListener('click', restartLesson);
      row.appendChild(again);
    }

    if (!result.passed) {
      const retry = el('button', {
        className: 'learn-btn',
        attrs: { type: 'button' },
        text: 'Retry quiz'
      });
      retry.addEventListener('click', startQuiz);
      row.appendChild(retry);
    }

    if (session.review) {
      row.appendChild(el('a', {
        className: 'learn-btn is-ghost',
        attrs: { href: '#/review' },
        text: 'Back to review'
      }));
    } else if (pos) {
      row.appendChild(el('a', {
        className: 'learn-btn is-ghost',
        attrs: { href: core.buildHash([pos.trackId, pos.subjectId, pos.moduleId]) },
        text: 'Back to lessons'
      }));
    }

    panel.appendChild(row);

    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
    window.scrollTo(0, 0);
    announce(result.passed
      ? 'Lesson complete. ' + result.correct + ' of ' + result.total + ' correct.'
      : 'Not yet. ' + result.correct + ' of ' + result.total + ' correct. Try once more.');
  }

  function dueLabel(iso, nowIso) {
    const days = Math.floor((Date.parse(nowIso) - Date.parse(iso)) / core.DAY_MS);
    if (days <= 0) return 'Due today';
    if (days === 1) return 'Due yesterday';
    return 'Due ' + days + ' days ago';
  }

  function renderReview(main) {
    const now = new Date().toISOString();
    const due = core.dueReviews(state.progress, now)
      .map((row) => ({
        entry: row.entry,
        lesson: core.getLesson(index, row.lessonId)
      }))
      .filter((row) => row.lesson);

    main.appendChild(el('section', { className: 'learn-hero' }, [
      el('p', { className: 'learn-eyebrow', text: 'Review' }),
      el('h1', { text: 'Keep the ideas strong' }),
      el('p', {
        className: 'learn-lede',
        text: 'A short review helps you remember. It does not unlock new lessons.'
      })
    ]));

    if (!due.length) {
      main.appendChild(el('section', { className: 'learn-empty' }, [
        el('p', { text: 'Nothing to review today. Pick a lesson to keep going.' }),
        el('a', {
          className: 'learn-btn',
          attrs: { href: '#/' },
          text: 'Choose a track'
        })
      ]));
      return;
    }

    const list = el('div', { className: 'review-list' });
    due.forEach((row) => {
      const pos = core.lessonPosition(index, row.lesson.id);
      const track = pos ? core.getTrack(index, pos.trackId) : null;
      list.appendChild(el('a', {
        className: 'review-row',
        attrs: { href: core.buildHash(['review', row.lesson.id]) }
      }, [
        el('span', { className: 'review-copy' }, [
          el('strong', { text: row.lesson.title }),
          el('span', {
            className: 'review-due',
            text: (track ? track.label + ' · ' : '') +
              dueLabel(row.entry.nextReviewAt, now)
          })
        ]),
        el('span', { className: 'learn-status is-in-progress', text: 'Review' })
      ]));
    });
    main.appendChild(list);
  }

  function startReview(route) {
    const lesson = core.getLesson(index, route.lessonId);
    if (!lesson || !core.isCompleted(state.progress.lessons[lesson.id])) {
      return false;
    }
    const pos = core.lessonPosition(index, lesson.id);
    if (!pos) return false;
    const track = core.getTrack(index, pos.trackId);
    const subject = core.getSubject(index, pos.trackId, pos.subjectId);
    const mod = core.getModule(index, pos.trackId, pos.subjectId, pos.moduleId);
    if (!track || !subject || !mod) return false;

    renderLessonPlayer(
      document.getElementById('app'), track, subject, mod, lesson);
    state.lesson.review = true;
    const back = document.querySelector('.learn-backline');
    if (back) {
      back.setAttribute('href', '#/review');
      back.textContent = 'Back to review';
    }
    startQuiz();
    return true;
  }

  function deleteLocalData() {
    if (storage) {
      [KEYS.progress, KEYS.settings].forEach((key) => {
        try { storage.removeItem(key); } catch (e) { /* storage blocked */ }
      });
      if (!cloudOn()) {
        try { storage.removeItem('learnstack.v1.session'); } catch (e) { /* ignore */ }
      }
    }
    state.progress = core.emptyProgress();
    state.settings = {
      theme: 'system', easyRead: false, nickname: '', confidence: {}
    };
    applyDisplaySettings();
  }

  function renderSettings(main) {
    main.appendChild(el('section', { className: 'learn-hero' }, [
      el('p', { className: 'learn-eyebrow', text: 'Settings' }),
      el('h1', { text: 'Make LearnStack yours' }),
      el('p', {
        className: 'learn-lede',
        text: 'These settings stay on this device. You can change them at any time.'
      })
    ]));

    const grid = el('div', { className: 'settings-grid' });

    const nickname = el('input', {
      className: 'settings-input',
      attrs: {
        type: 'text', id: 'nickname', maxlength: '24',
        autocomplete: 'off', placeholder: 'Optional'
      }
    });
    nickname.value = state.settings.nickname;
    nickname.addEventListener('input', () => {
      saveSettings({ nickname: nickname.value.trim().slice(0, 24) });
    });

    grid.appendChild(el('section', { className: 'settings-card' }, [
      el('h2', { text: 'Your name on this device' }),
      el('p', {
        className: 'lesson-muted',
        text: 'Optional. It is not sent anywhere and you can leave it blank.'
      }),
      el('label', {
        className: 'settings-label',
        attrs: { for: 'nickname' },
        text: 'Nickname'
      }),
      nickname
    ]));

    const theme = el('select', {
      className: 'settings-input',
      attrs: { id: 'themeSelect' }
    });
    [['system', 'Match my device'], ['light', 'Light'], ['dark', 'Dark']]
      .forEach((pair) => {
        theme.appendChild(el('option', {
          attrs: { value: pair[0] },
          text: pair[1]
        }));
      });
    theme.value = state.settings.theme;
    theme.addEventListener('change', () => saveSettings({ theme: theme.value }));

    grid.appendChild(el('section', { className: 'settings-card' }, [
      el('h2', { text: 'Theme' }),
      el('label', {
        className: 'settings-label',
        attrs: { for: 'themeSelect' },
        text: 'Colour theme'
      }),
      theme
    ]));

    const easy = el('input', {
      attrs: { type: 'checkbox', id: 'easyRead' }
    });
    easy.checked = !!state.settings.easyRead;
    easy.addEventListener('change', () => {
      saveSettings({ easyRead: easy.checked });
    });

    grid.appendChild(el('section', { className: 'settings-card' }, [
      el('h2', { text: 'Reading' }),
      el('div', { className: 'settings-row' }, [
        easy,
        el('label', {
          className: 'settings-label',
          attrs: { for: 'easyRead' },
          text: 'Easy-read mode: larger text, more spacing'
        })
      ])
    ]));

    const chip = document.getElementById('learnSyncChip');
    grid.appendChild(el('section', { className: 'settings-card' }, [
      el('h2', { text: 'Saving' }),
      el('p', {
        className: 'lesson-muted',
        attrs: { id: 'settingsSyncText' },
        text: 'Progress is saved in this browser. Status: ' +
          (chip ? chip.textContent : state.sync) + '.'
      })
    ]));

    const status = el('p', {
      className: 'settings-status',
      attrs: { role: 'status', 'aria-live': 'polite' }
    });
    const confirmBox = el('div', {
      className: 'settings-danger',
      attrs: { hidden: 'hidden' }
    }, [
      el('p', {
        text: 'This removes your lesson progress, scores, review dates, ' +
          'nickname, and display settings from this browser. ' +
          'It cannot be undone.'
      })
    ]);

    const yes = el('button', {
      className: 'learn-btn is-danger',
      attrs: { type: 'button' },
      text: 'Yes, delete everything'
    });
    yes.addEventListener('click', async () => {
      confirmBox.hidden = true;
      status.textContent = 'Deleting…';
      const outcome = await deleteAllData();
      status.textContent = outcome === 'pending'
        ? 'Deleted from this browser. The cloud copy will be removed when you are online.'
        : 'Your LearnStack data has been deleted.';
      announce(status.textContent);
    });
    const cancel = el('button', {
      className: 'learn-btn is-ghost',
      attrs: { type: 'button' },
      text: 'Cancel'
    });
    cancel.addEventListener('click', () => {
      confirmBox.hidden = true;
    });
    confirmBox.appendChild(el('div', { className: 'result-actions' }, [yes, cancel]));

    const deleteButton = el('button', {
      className: 'learn-btn is-danger',
      attrs: { type: 'button' },
      text: 'Delete my LearnStack data'
    });
    deleteButton.addEventListener('click', () => {
      confirmBox.hidden = false;
      status.textContent = 'Please confirm below.';
      yes.focus();
    });

    grid.appendChild(el('section', { className: 'settings-card' }, [
      el('h2', { text: 'Delete my data' }),
      deleteButton,
      confirmBox,
      status
    ]));

    main.appendChild(grid);
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
    state.lesson = null;
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
      case 'review':
        renderReview(app);
        break;
      case 'review-lesson': {
        if (!startReview(parsed)) renderNotFound(app);
        break;
      }
      case 'settings':
        renderSettings(app);
        break;
      case 'lesson': {
        const track = core.getTrack(index, parsed.trackId);
        const subject = core.getSubject(index, parsed.trackId, parsed.subjectId);
        const mod = core.getModule(
          index, parsed.trackId, parsed.subjectId, parsed.moduleId);
        const lesson = mod
          ? findLessonBySlug(
              parsed.trackId, parsed.subjectId, parsed.moduleId, parsed.lessonSlug)
          : null;

        if (!track || !subject || !mod || !lesson) {
          renderNotFound(app);
          break;
        }
        if (!core.isUnlocked(index, lesson.id, state.progress)) {
          renderLockedLesson(app, track, subject, mod, lesson);
          break;
        }
        recordLessonOpen(lesson);
        renderLessonPlayer(app, track, subject, mod, lesson);
        break;
      }
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

  window.addEventListener('online', () => {
    if (cloudOn()) initSync();
  });
  window.addEventListener('offline', () => {
    if (cloudOn()) setSyncStatus('offline');
  });

  applyDisplaySettings();
  route();
  initSync();
})();
