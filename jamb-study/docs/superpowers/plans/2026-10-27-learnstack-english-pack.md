# LearnStack English Pack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the multi-subject framework plus all four English subjects (24 lessons) so LearnStack shows a subject grid and supports subjects beyond Mathematics.

**Architecture:** Keep the static, no-build site. `tracks.js` holds track and subject metadata only for new subjects; each subject's modules live in its own classic script under `students/data/<track>/<subject>.js`, loaded after `tracks.js` and attaching itself to `window.LEARN_TRACKS`. The existing router, lesson player, progress store, and sync layer are unchanged.

**Tech Stack:** Vanilla HTML/CSS/JS (classic scripts), `node:test` + `node:assert/strict`, Node content gate, service worker cache.

**Spec:** `docs/superpowers/specs/2026-10-27-learnstack-all-subjects-design.md`

## Global Constraints

- No JAMB, UTME, WAEC, NECO, or JAMstack content, branding, examples, or links. The validator rejects these terms.
- No AI features, no AI-generated text or images. Every 3D image is downloaded from Microsoft Fluent Emoji (MIT) into `students/assets/3d/`.
- No external fonts, no frameworks, no bundler, no build step.
- localStorage keys stay exactly `learnstack.v1.progress`, `learnstack.v1.settings`, `learnstack.v1.session`, `learnstack.v1.pending-delete`. Never touch tracker keys.
- Word limits per text or tip block: Primary 25, Lower Secondary 45, Upper Secondary 60. Quiz question ≤25 words, `why` ≤30, each option ≤10. Vocabulary meaning ≤15 words, example ≤20. Example steps 2–4, each ≤20 words. Module description ≤30 words.
- Every lesson: 3–5 explanation blocks (at least one `text`, at most one `tip`), exactly one `illustration`, exactly one `example`, 3–5 vocabulary entries, exactly 3 multiple-choice questions with a valid answer index.
- Module descriptions end with `Draft content.`
- Never push. Commit after each task; stop with the branch ahead of origin.
- Work from `C:\Users\ADMIN\Documents\Default Project\jamb-study` (git root is the parent directory).

## File Structure

Create:
- `students/assets/3d/open_book-3d.png` … 15 sourced images (Task 1)
- `students/data/primary/english.js` (Primary English)
- `students/data/lower-secondary/english.js` (Lower Secondary English)
- `students/data/upper-secondary/english-language.js` (GCSE English Language)
- `students/data/upper-secondary/english-literature.js` (GCSE English Literature)

Modify:
- `students/core.js` — accept any subject in the lesson-id format
- `students/data/tracks.js` — four subject metadata entries
- `students/index.html` — four data scripts, new meta description
- `students/learn.js` — aggregate track progress, subject grid
- `students/learn.css` — subject grid and thumbnail styles
- `tests/learn/core.test.js` — subject-id validation test
- `tests/learn/content.test.js` — load new data, update counts
- `tools/check-learn-data.js` — load new data
- `sw.js` — cache version and precache list
- `README.md` — LearnStack subject list

---

### Task 1: Source the English 3D illustrations

**Files:**
- Create: `students/assets/3d/open_book-3d.png`, `books-3d.png`, `memo-3d.png`, `pencil-3d.png`, `label-3d.png`, `scroll-3d.png`, `magnifying-glass-tilted-left-3d.png`, `thought-balloon-3d.png`, `speech-balloon-3d.png`, `envelope-3d.png`, `artist-palette-3d.png`, `performing-arts-3d.png`, `world-map-3d.png`, `bookmark-3d.png`, `microphone-3d.png`

**Interfaces:**
- Consumes: nothing
- Produces: 15 local PNG files referenced by the data files as `assets/3d/<name>.png`

- [ ] **Step 1: Download all 15 images**

Run from `jamb-study/`:

```bash
while read -r src dest; do
  curl -fsSL "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/$src" -o "students/assets/3d/$dest" || exit 1
done <<'EOF'
Open%20book/3D/open_book_3d.png open_book-3d.png
Books/3D/books_3d.png books-3d.png
Memo/3D/memo_3d.png memo-3d.png
Pencil/3D/pencil_3d.png pencil-3d.png
Label/3D/label_3d.png label-3d.png
Scroll/3D/scroll_3d.png scroll-3d.png
Magnifying%20glass%20tilted%20left/3D/magnifying_glass_tilted_left_3d.png magnifying-glass-tilted-left-3d.png
Thought%20balloon/3D/thought_balloon_3d.png thought-balloon-3d.png
Speech%20balloon/3D/speech_balloon_3d.png speech-balloon-3d.png
Envelope/3D/envelope_3d.png envelope-3d.png
Artist%20palette/3D/artist_palette_3d.png artist-palette-3d.png
Performing%20arts/3D/performing_arts_3d.png performing-arts-3d.png
World%20map/3D/world_map_3d.png world-map-3d.png
Bookmark/3D/bookmark_3d.png bookmark-3d.png
Microphone/3D/microphone_3d.png microphone-3d.png
EOF
```

- [ ] **Step 2: Verify every file is a real PNG over 1 KB**

```bash
for f in open_book books memo pencil label scroll magnifying-glass-tilted-left thought-balloon speech-balloon envelope artist-palette performing-arts world-map bookmark microphone; do
  test -s "students/assets/3d/$f-3d.png" || { echo "MISSING $f"; exit 1; }
  size=$(wc -c < "students/assets/3d/$f-3d.png")
  test "$size" -gt 1000 || { echo "TOO SMALL $f ($size bytes)"; exit 1; }
  echo "$f: $size bytes"
done
```

Expected: 15 lines, every size above 1000.

- [ ] **Step 3: Commit**

```bash
git add students/assets/3d
git commit -m "feat(learn): add sourced 3D images for English lessons"
```

---

### Task 2: Allow non-Mathematics lesson ids in the validator

**Files:**
- Modify: `students/core.js:469-479` (`validateLesson` signature and id pattern), `students/core.js:452` (call site)
- Test: `tests/learn/core.test.js` (append)

**Interfaces:**
- Consumes: existing `validData()` and `validLesson()` test helpers
- Produces: `validateTracks` accepts `<track>-<subject>-m<number>-l<number>` for any subject id, including hyphenated ids such as `english-language`

- [ ] **Step 1: Write the failing test**

Append to `tests/learn/core.test.js`:

```js
test('validateTracks accepts lesson ids for subjects other than maths', () => {
  const data = validData();
  const subject = data.tracks[0].subjects[0];
  subject.id = 'english-language';
  subject.label = 'English Language';
  subject.modules[0].lessons[0].id = 'primary-english-language-m1-l1';

  const result = core.validateTracks(data);
  assert.deepEqual(result.errors, []);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test "tests/learn/core.test.js"`
Expected: FAIL — the error contains `has an invalid lesson id format`.

- [ ] **Step 3: Pass the subject id into lesson validation**

In `students/core.js`, change the call site inside `validateTracks` from:

```js
            validateLesson(errors, stats, lp, lesson, track.id, lessonIds);
```

to:

```js
            validateLesson(errors, stats, lp, lesson, track.id, subject.id, lessonIds);
```

Change the function signature from:

```js
  function validateLesson(errors, stats, path, lesson, trackId, lessonIds) {
```

to:

```js
  function validateLesson(errors, stats, path, lesson, trackId, subjectId, lessonIds) {
```

Change the id pattern from:

```js
      const pattern = new RegExp('^' + trackId + '-maths-m\\d+-l\\d+$');
```

to:

```js
      const pattern = new RegExp('^' + trackId + '-' + subjectId + '-m\\d+-l\\d+$');
```

- [ ] **Step 4: Run all learn tests**

Run: `node --test "tests/learn/*.test.js"`
Expected: PASS — 28 tests (27 existing plus the new one), 0 failures.

- [ ] **Step 5: Run the content gate on the current 18 lessons**

Run: `node tools/check-learn-data.js`
Expected:

```
tracks: 3, subjects: 3, modules: 6, lessons: 18, questions: 54
OK
```

- [ ] **Step 6: Commit**

```bash
git add students/core.js tests/learn/core.test.js
git commit -m "feat(learn): support lesson ids for any subject"
```

---

### Task 3: Show aggregate progress and a subject grid

**Files:**
- Modify: `students/learn.js:109-203` (add `trackProgress`, rewrite chooser, replace `renderSubject` with `renderTrack`), `students/learn.js:1582` (route call)
- Modify: `students/learn.css:225` (grid and thumbnail rules)
- Modify: `students/index.html:7` (meta description)

**Interfaces:**
- Consumes: `core.orderedLessons`, `core.isCompleted`, `core.buildHash`, existing `el()` and `subjectProgress()`
- Produces: `trackProgress(track) → { done, total }`; `renderTrack(main, track)`; subject cards with `data-subject`; chooser meta shows `N subjects`

- [ ] **Step 1: Add aggregate progress after `subjectProgress`**

Insert after the closing brace of `subjectProgress` in `students/learn.js`:

```js
  function trackProgress(track) {
    let done = 0;
    let total = 0;
    track.subjects.forEach((subject) => {
      if (!subject.modules || !subject.modules.length) return;
      const progress = subjectProgress(track.id, subject.id);
      done += progress.done;
      total += progress.total;
    });
    return { done, total };
  }
```

- [ ] **Step 2: Rewrite the chooser to use all subjects**

Replace the body of `renderChooser` from `const grid = el('div', { className: 'track-grid' });` through `main.appendChild(grid);` with:

```js
    const grid = el('div', { className: 'track-grid' });
    index.tracks.forEach((track) => {
      const progress = trackProgress(track);
      const subjectCount = track.subjects.filter(
        (subject) => subject.modules && subject.modules.length).length;
      const subjectText = subjectCount === 1
        ? '1 subject' : subjectCount + ' subjects';
      const card = el('a', {
        className: 'track-card',
        attrs: { href: core.buildHash([track.id]), 'data-track': track.id }
      }, [
        el('span', { className: 'track-kicker', text: track.stage }),
        el('h2', { text: track.label }),
        el('p', { className: 'learn-muted', text: track.tone }),
        el('p', { className: 'track-meta' }, [
          el('span', { text: 'Ages ' + track.ages }),
          el('span', { text: track.usEquivalent }),
          el('span', { text: subjectText })
        ]),
        el('p', {
          className: 'track-progress',
          text: progress.done + ' of ' + progress.total + ' lessons complete'
        })
      ]);
      grid.appendChild(card);
    });
    main.appendChild(grid);
```

- [ ] **Step 3: Replace the single-subject page with a subject grid**

Replace the entire `renderSubject` function (lines 170–203) with:

```js
  function subjectImage(subject) {
    const lessons = subject.modules
      .slice().sort((a, b) => a.order - b.order)
      .reduce((all, mod) => all.concat(mod.lessons || []), []);
    for (let i = 0; i < lessons.length; i += 1) {
      const art = (lessons[i].blocks || []).find(
        (block) => block.type === 'illustration' && block.image);
      if (art) return art.image;
    }
    return '';
  }

  function renderTrack(main, track) {
    const subjects = track.subjects.filter(
      (subject) => subject.modules && subject.modules.length);
    if (!subjects.length) return renderNotFound(main);

    main.appendChild(el('a', {
      className: 'learn-backline',
      attrs: { href: '#/' },
      text: 'Back to all tracks'
    }));

    main.appendChild(el('section', { className: 'learn-hero' }, [
      el('p', { className: 'learn-eyebrow', text: track.stage }),
      el('h1', { text: track.label }),
      el('p', {
        className: 'learn-lede',
        text: track.tone + ' Choose a subject to begin.'
      })
    ]));

    const grid = el('div', { className: 'subject-grid' });
    subjects.forEach((subject) => {
      const progress = subjectProgress(track.id, subject.id);
      const image = subjectImage(subject);
      grid.appendChild(el('a', {
        className: 'subject-card',
        attrs: {
          href: core.buildHash([track.id, subject.id]),
          'data-subject': subject.id
        }
      }, [
        image ? el('img', {
          className: 'subject-thumb',
          attrs: { src: image, alt: '', width: 56, height: 56, loading: 'lazy' }
        }) : null,
        el('h2', { text: subject.label }),
        el('p', {
          className: 'learn-muted',
          text: subject.description || 'Six short lessons, one step at a time.'
        }),
        el('p', {
          className: 'learn-count',
          text: progress.done + ' of ' + progress.total + ' lessons complete'
        }),
        el('span', { className: 'learn-cta', text: 'Open modules' })
      ]));
    });
    main.appendChild(grid);

    main.appendChild(el('div', { className: 'learn-how' }, [
      el('p', { text: 'How this works: finish a lesson to unlock the next one. You can retry any quiz.' })
    ]));
  }
```

- [ ] **Step 4: Update the route call**

In `route()`, change:

```js
        else renderSubject(app, track);
```

to:

```js
        else renderTrack(app, track);
```

- [ ] **Step 5: Add grid styles**

Replace:

```css
.learn-app .subject-card { max-width: 620px; }
```

with:

```css
.learn-app .subject-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}

.learn-app .subject-grid .subject-card {
  max-width: none;
  height: 100%;
}

.learn-app .subject-thumb {
  width: 56px;
  height: 56px;
  object-fit: contain;
}
```

- [ ] **Step 6: Update the page description**

In `students/index.html`, replace:

```html
  <meta name="description" content="A calm place to learn school Mathematics from the beginning, one short lesson at a time." />
```

with:

```html
  <meta name="description" content="A calm place to learn school subjects from the beginning, one short lesson at a time." />
```

- [ ] **Step 7: Verify in the browser**

Start the server from `jamb-study/` if it is not already running:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/students/index.html?v=16#/` and check:

- Each track card shows a third chip such as `1 subject`.
- Each track card shows `0 of 6 lessons complete`.
- Opening `#/primary` shows a `subject-grid` with one `Mathematics` card and the text `0 of 6 lessons complete`.
- Clicking the card opens `#/primary/maths` and the module list.
- No console errors.

- [ ] **Step 8: Commit**

```bash
git add students/learn.js students/learn.css students/index.html
git commit -m "feat(learn): add track totals and subject grid"
```

---

### Task 4: Primary English (6 lessons)

**Files:**
- Modify: `students/data/tracks.js:202-204` (append a subject to the Primary track)
- Create: `students/data/primary/english.js`
- Modify: `students/index.html:43` (script tag)
- Modify: `tests/learn/content.test.js:8-16`, `tests/learn/content.test.js` (append subject test)
- Modify: `tools/check-learn-data.js:10`

**Interfaces:**
- Consumes: `window.LEARN_TRACKS` with `tracks[].subjects[]`; lesson ids `primary-english-m1-l1` … `primary-english-m2-l3`
- Produces: Primary English with 2 modules × 3 lessons and 18 questions; counts become 4 subjects / 8 modules / 24 lessons / 72 questions

- [ ] **Step 1: Add the Primary English subject entry**

In `students/data/tracks.js`, replace:

```js
      }]
    },
    {
      id: 'lower-secondary',
```

with:

```js
      }, {
        id: 'english',
        label: 'English',
        description: 'Letters, reading, sentences, and writing a short story.'
      }]
    },
    {
      id: 'lower-secondary',
```

- [ ] **Step 2: Create the Primary English data file**

Create `students/data/primary/english.js` with exactly:

```js
/* Primary English — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'primary');
  const subject = track && track.subjects.find((entry) => entry.id === 'english');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Reading: Letters and Stories',
    description: 'Letters, sounds, simple words, and what happens in a short story. Draft content.',
    lessons: [{
      id: 'primary-english-m1-l1',
      order: 1,
      title: 'Letters and Sounds',
      objective: 'I can match letters to the sounds they make.',
      minutes: 6,
      recap: 'You matched letters to sounds and blended them into words.',
      blocks: [
        { type: 'text', body: 'Letters are symbols. Each letter can make a sound.' },
        { type: 'text', body: 'Blend sounds together to read a word. c-a-t says cat.' },
        { type: 'tip', body: 'Say each sound slowly, then say them faster together.' },
        {
          type: 'illustration',
          alt: 'Three wooden letter tiles showing the letters c, a, and t.',
          image: 'assets/3d/input-latin-letters-3d.png',
          placeholder: 'Letter tiles: c, a, and t blended into cat.'
        },
        { type: 'example', steps: ['Look at the letters c, a, t.', 'Say each sound: c, a, t.', 'Blend them together: cat.'] }
      ],
      vocabulary: [
        { word: 'letter', meaning: 'A written symbol for a sound', example: 'The word cat starts with the letter c.' },
        { word: 'sound', meaning: 'What a letter says when spoken', example: 'The letter m makes the sound mmm.' },
        { word: 'blend', meaning: 'Join sounds to read a word', example: 'Blend c, a, t to read cat.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which word do these sounds make? c-a-t', options: ['cat', 'car', 'cot'], answer: 0, why: 'Blending c, a, and t gives the word cat.' },
        { type: 'multiple_choice', question: 'Which letter starts the word sun?', options: ['n', 's', 'u'], answer: 1, why: 'The word sun begins with the sound s.' },
        { type: 'multiple_choice', question: 'Which sounds blend to make the word map?', options: ['m-a-p', 'm-a-t', 's-a-p'], answer: 0, why: 'm, a, and p blend together to make map.' }
      ]
    }, {
      id: 'primary-english-m1-l2',
      order: 2,
      title: 'Reading Simple Words',
      objective: 'I can read short words by blending their sounds.',
      minutes: 7,
      recap: 'You blended sounds to read short words on your own.',
      blocks: [
        { type: 'text', body: 'Some words are short. You can read them by blending sounds.' },
        { type: 'text', body: 'Point to each letter as you say its sound.' },
        { type: 'text', body: 'Then say the sounds together, without stopping.' },
        { type: 'tip', body: 'If a word is hard, slow down and say each sound again.' },
        {
          type: 'illustration',
          alt: 'An open picture book with large, simple words on the page.',
          image: 'assets/3d/open_book-3d.png',
          placeholder: 'Open book: short words read sound by sound.'
        },
        { type: 'example', steps: ['Read the word hen.', 'Say h-e-n slowly.', 'Blend them: hen.', 'The word is hen.'] }
      ],
      vocabulary: [
        { word: 'read', meaning: 'Look at words and say them', example: 'Read the word hen.' },
        { word: 'word', meaning: 'Letters that make a meaning', example: 'Cat is a short word.' },
        { word: 'sound out', meaning: 'Say each sound in order', example: 'Sound out the word hen.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Read this word: d-o-g. Which word is it?', options: ['dog', 'dig', 'dot'], answer: 0, why: 'The sounds d, o, g blend to make dog.' },
        { type: 'multiple_choice', question: 'Which word rhymes with cat?', options: ['cup', 'hat', 'dog'], answer: 1, why: 'Hat ends with the same sound as cat.' },
        { type: 'multiple_choice', question: 'Which word is short?', options: ['sunshine', 'sunlight', 'sun'], answer: 2, why: 'Sun has three letters, so it is a short word.' }
      ]
    }, {
      id: 'primary-english-m1-l3',
      order: 3,
      title: 'What Happens in a Story',
      objective: 'I can say what happens at the start, middle, and end of a story.',
      minutes: 7,
      recap: 'You found the start, middle, and end of a short story.',
      blocks: [
        { type: 'text', body: 'A story has a beginning, a middle, and an end.' },
        { type: 'text', body: 'The beginning introduces the characters and the place.' },
        { type: 'text', body: 'The middle shows a problem. The end shows how it is solved.' },
        { type: 'tip', body: 'Ask: who, where, what went wrong, and how did it end?' },
        {
          type: 'illustration',
          alt: 'A small stack of storybooks with colourful covers.',
          image: 'assets/3d/books-3d.png',
          placeholder: 'Storybooks: a story opening, a problem, and an ending.'
        },
        { type: 'example', steps: ['Beginning: a boy finds a lost dog.', 'Middle: he searches the park.', 'End: he finds the dog at home.'] }
      ],
      vocabulary: [
        { word: 'character', meaning: 'A person or animal in a story', example: 'The main character is a boy.' },
        { word: 'setting', meaning: 'Where and when a story happens', example: 'The setting is a sunny park.' },
        { word: 'problem', meaning: 'The trouble a character faces', example: 'The lost dog is the problem.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does the beginning of a story usually do?', options: ['Solve the problem', 'Introduce the characters', 'End the story'], answer: 1, why: 'Beginnings introduce who is in the story and where.' },
        { type: 'multiple_choice', question: 'What is the problem in a story?', options: ['The trouble a character faces', 'The title of the book', 'The last page'], answer: 0, why: 'The problem is the difficulty the character must solve.' },
        { type: 'multiple_choice', question: 'A story ends when the character finds her cat. What part is this?', options: ['The end', 'The beginning', 'The middle'], answer: 0, why: 'Finding the cat solves the problem, so it is the ending.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Writing Clearly',
    description: 'Sentences, capital letters, full stops, and a short story of your own. Draft content.',
    lessons: [{
      id: 'primary-english-m2-l1',
      order: 1,
      title: 'Capital Letters and Full Stops',
      objective: 'I can start sentences with a capital letter and end them with a full stop.',
      minutes: 7,
      recap: 'You used capital letters and full stops to write clear sentences.',
      blocks: [
        { type: 'text', body: 'Every sentence starts with a capital letter.' },
        { type: 'text', body: 'Names of people and places also start with capitals.' },
        { type: 'text', body: 'Most sentences end with a full stop.' },
        { type: 'tip', body: 'Read your sentence aloud. A full stop marks a finished thought.' },
        {
          type: 'illustration',
          alt: 'A yellow pencil resting beside a line of large writing.',
          image: 'assets/3d/pencil-3d.png',
          placeholder: 'Pencil: capital at the start, full stop at the end.'
        },
        { type: 'example', steps: ['Read the sentence: the dog runs.', 'Change the first letter to a capital: The.', 'Add a full stop at the end: The dog runs.'] }
      ],
      vocabulary: [
        { word: 'capital', meaning: 'An uppercase letter, like A or B', example: 'The name Sam starts with a capital.' },
        { word: 'full stop', meaning: 'A dot that ends a sentence', example: 'The sentence ends with a full stop.' },
        { word: 'sentence', meaning: 'A complete idea with a capital and stop', example: 'The dog runs is a sentence.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which sentence is correct?', options: ['the cat sleeps.', 'The cat sleeps.', 'The cat sleeps'], answer: 1, why: 'It starts with a capital and ends with a full stop.' },
        { type: 'multiple_choice', question: 'Which word needs a capital letter?', options: ['sam', 'dog', 'run'], answer: 0, why: 'Sam is a person’s name, so it needs a capital.' },
        { type: 'multiple_choice', question: 'What should go at the end of this sentence? I like jam', options: ['A full stop', 'A capital letter', 'Nothing'], answer: 0, why: 'A full stop ends a statement sentence.' }
      ]
    }, {
      id: 'primary-english-m2-l2',
      order: 2,
      title: 'Building a Sentence',
      objective: 'I can build a clear sentence with a subject and a verb.',
      minutes: 7,
      recap: 'You built sentences using a subject and a verb.',
      blocks: [
        { type: 'text', body: 'A sentence needs a subject. The subject tells who or what.' },
        { type: 'text', body: 'A verb tells what the subject does.' },
        { type: 'text', body: 'Put the subject first, then the verb. Tom runs.' },
        { type: 'tip', body: 'Check that your sentence makes sense on its own.' },
        {
          type: 'illustration',
          alt: 'A paper label with a blank line waiting for a name.',
          image: 'assets/3d/label-3d.png',
          placeholder: 'Label: a subject and verb joined into one clear sentence.'
        },
        { type: 'example', steps: ['Choose a subject: the bird.', 'Choose a verb: sings.', 'Join them: The bird sings.'] }
      ],
      vocabulary: [
        { word: 'subject', meaning: 'Who or what the sentence is about', example: 'In The bird sings, the subject is the bird.' },
        { word: 'verb', meaning: 'A word that shows an action', example: 'Sings is a verb.' },
        { word: 'complete', meaning: 'Whole, with nothing missing', example: 'A complete sentence makes sense alone.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which word is the subject in The cat sleeps?', options: ['cat', 'sleeps', 'the'], answer: 0, why: 'The sentence is about the cat.' },
        { type: 'multiple_choice', question: 'Which word is the verb in The rain falls?', options: ['rain', 'falls', 'the'], answer: 1, why: 'Falls tells what the rain does.' },
        { type: 'multiple_choice', question: 'Which group of words is a complete sentence?', options: ['The bus stops.', 'The bus', 'Stops quickly'], answer: 0, why: 'It has a subject and a verb and makes sense.' }
      ]
    }, {
      id: 'primary-english-m2-l3',
      order: 3,
      title: 'Writing a Short Story',
      objective: 'I can plan and write a short story with a beginning, middle, and end.',
      minutes: 8,
      recap: 'You planned and wrote a short story in three parts.',
      blocks: [
        { type: 'text', body: 'Plan first. Decide who is in your story and where it happens.' },
        { type: 'text', body: 'In the middle, give your character a problem to solve.' },
        { type: 'text', body: 'End by showing how the problem is solved.' },
        { type: 'tip', body: 'Use words like first, then, and finally to guide your reader.' },
        {
          type: 'illustration',
          alt: 'A rolled paper scroll with lines of a handwritten story.',
          image: 'assets/3d/scroll-3d.png',
          placeholder: 'Scroll: a story planned in beginning, middle, and end.'
        },
        { type: 'example', steps: ['Beginning: Mia finds a key.', 'Middle: she cannot open the door.', 'End: she tries the back door and it opens.'] }
      ],
      vocabulary: [
        { word: 'plan', meaning: 'Decide what happens before writing', example: 'Plan your story in three parts.' },
        { word: 'plot', meaning: 'The events that happen in a story', example: 'The plot of my story is simple.' },
        { word: 'ending', meaning: 'How the story finishes', example: 'The ending solves the problem.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should you do before writing a story?', options: ['Plan the beginning, middle, and end', 'Write the ending first', 'Count the words'], answer: 0, why: 'A quick plan helps the story stay clear.' },
        { type: 'multiple_choice', question: 'Where does the problem usually appear?', options: ['In the middle', 'In the title', 'On the cover'], answer: 0, why: 'The middle builds the trouble the character must solve.' },
        { type: 'multiple_choice', question: 'Which word helps show order?', options: ['Blue', 'Happy', 'Finally'], answer: 2, why: 'Finally shows that an event comes last.' }
      ]
    }]
  }];
}());
```

- [ ] **Step 3: Load the new data file in the page**

In `students/index.html`, replace:

```html
  <script src="data/tracks.js"></script>
```

with:

```html
  <script src="data/tracks.js"></script>
  <script src="data/primary/english.js"></script>
```

- [ ] **Step 4: Load the new data file in the tests and content gate**

In `tests/learn/content.test.js`, replace:

```js
require('../../students/data/tracks.js');
```

with:

```js
require('../../students/data/tracks.js');
require('../../students/data/primary/english.js');
```

In `tools/check-learn-data.js`, replace:

```js
require('../students/data/tracks.js');
```

with:

```js
require('../students/data/tracks.js');
require('../students/data/primary/english.js');
```

- [ ] **Step 5: Update the counts and add the subject shape test**

In `tests/learn/content.test.js`, change:

```js
  assert.equal(result.stats.lessons, 18);
  assert.equal(result.stats.questions, 54);
```

to:

```js
  assert.equal(result.stats.subjects, 4);
  assert.equal(result.stats.modules, 8);
  assert.equal(result.stats.lessons, 24);
  assert.equal(result.stats.questions, 72);
```

Append this test at the end of the file:

```js
test('english subjects have two modules of three lessons', () => {
  const index = core.createIndex(global.window.LEARN_TRACKS);
  const entries = [
    ['primary', 'english']
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
```

- [ ] **Step 6: Run the gate and tests**

Run: `node tools/check-learn-data.js`
Expected:

```
tracks: 3, subjects: 4, modules: 8, lessons: 24, questions: 72
OK
```

Run: `node --test "tests/learn/*.test.js"`
Expected: PASS — 29 tests, 0 failures.

- [ ] **Step 7: Play the new subject in the browser**

Reload `http://localhost:8000/students/index.html?v=17#/primary` and check:

- Two subject cards: Mathematics and English.
- The English card shows the letter-tile image, the description, and `0 of 6 lessons complete`.
- Opening English shows both modules and six lesson rows.
- Opening `Letters and Sounds` renders four explanation blocks, the letter-tile illustration, the worked example, three vocabulary cards, and the confidence check.
- The quiz accepts the first option on question 1, the second on question 2, and the first on question 3, reaches the result screen, and marks the lesson completed.
- Back on `#/primary`, English shows `1 of 6 lessons complete`; on `#/`, Primary shows `1 of 12 lessons complete`.
- No console errors.

- [ ] **Step 8: Commit**

```bash
git add students/data/tracks.js students/data/primary/english.js students/index.html tests/learn/content.test.js tools/check-learn-data.js
git commit -m "feat(learn): add primary English subject"
```

---

### Task 5: Lower Secondary English (6 lessons)

**Files:**
- Modify: `students/data/tracks.js` (append a subject to the Lower Secondary track)
- Create: `students/data/lower-secondary/english.js`
- Modify: `students/index.html`, `tests/learn/content.test.js`, `tools/check-learn-data.js`

**Interfaces:**
- Consumes: `window.LEARN_TRACKS`; lesson ids `lower-secondary-english-m1-l1` … `lower-secondary-english-m2-l3`
- Produces: Lower Secondary English with 2 modules × 3 lessons and 18 questions; counts become 5 subjects / 10 modules / 30 lessons / 90 questions

- [ ] **Step 1: Add the Lower Secondary English subject entry**

In `students/data/tracks.js`, replace:

```js
      }]
    },
    {
      id: 'upper-secondary',
```

with:

```js
      }, {
        id: 'english',
        label: 'English',
        description: 'Reading for meaning, inference, and writing with purpose.'
      }]
    },
    {
      id: 'upper-secondary',
```

- [ ] **Step 2: Create the Lower Secondary English data file**

Create `students/data/lower-secondary/english.js` with exactly:

```js
/* Lower Secondary English — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'lower-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'english');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Reading for Meaning',
    description: 'Main ideas, inference, evidence, and how writers build characters. Draft content.',
    lessons: [{
      id: 'lower-secondary-english-m1-l1',
      order: 1,
      title: 'Finding the Main Idea',
      objective: 'I can find the main idea and supporting details in a paragraph.',
      minutes: 8,
      recap: 'You found main ideas and the details that support them.',
      blocks: [
        { type: 'text', body: 'The main idea is what a paragraph is mostly about. It is often stated in the first or last sentence.' },
        { type: 'text', body: 'Supporting details explain, prove, or illustrate the main idea. They are usually facts, examples, or reasons.' },
        { type: 'text', body: 'Ask yourself: what single point would be lost if this paragraph disappeared?' },
        { type: 'tip', body: 'A main idea is broader than one detail. If it only names one fact, look again.' },
        {
          type: 'illustration',
          alt: 'A magnifying glass held over lines of printed text.',
          image: 'assets/3d/magnifying-glass-tilted-left-3d.png',
          placeholder: 'Magnifier: the main point underneath the details.'
        },
        { type: 'example', steps: ['Read the paragraph once for meaning.', 'Ask what most sentences have in common.', 'State that shared point in one sentence.'] }
      ],
      vocabulary: [
        { word: 'main idea', meaning: 'The central point of a paragraph', example: 'The main idea is about saving water.' },
        { word: 'detail', meaning: 'A fact or example that supports a point', example: 'The detail gives the amount of water used.' },
        { word: 'summary', meaning: 'A short statement of the main points', example: 'Write a one-sentence summary.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Where is a main idea often stated?', options: ['In the first or last sentence', 'Only in the title', 'In every detail'], answer: 0, why: 'Writers often state it early or sum it up at the end.' },
        { type: 'multiple_choice', question: 'Which sentence is a supporting detail?', options: ['Bees are important.', 'This paragraph is about bees.', 'Bees visit hundreds of flowers a day.'], answer: 2, why: 'The number is a fact that supports the main point.' },
        { type: 'multiple_choice', question: 'A paragraph says gardens need water, weeding, and sunlight. What is the main idea?', options: ['Weeding is hard', 'Gardens need several kinds of care', 'Sunlight is yellow'], answer: 1, why: 'All three details support the same broader point.' }
      ]
    }, {
      id: 'lower-secondary-english-m1-l2',
      order: 2,
      title: 'Inference and Evidence',
      objective: 'I can infer meaning from clues and support my inference with evidence.',
      minutes: 8,
      recap: 'You made inferences and backed them with evidence from the text.',
      blocks: [
        { type: 'text', body: 'An inference is a conclusion you reach from clues in the text.' },
        { type: 'text', body: 'Writers often show feelings through actions instead of naming them.' },
        { type: 'text', body: 'Strong answers link the inference to a quotation or specific detail.' },
        { type: 'tip', body: 'Use the pattern: I think this because the text says...' },
        {
          type: 'illustration',
          alt: 'A white thought bubble floating above an open book.',
          image: 'assets/3d/thought-balloon-3d.png',
          placeholder: 'Thought bubble: clues leading to an unstated idea.'
        },
        { type: 'example', steps: ['Read: Her hands shook as she opened the letter.', 'Infer: she feels nervous.', 'Evidence: her hands shook.'] }
      ],
      vocabulary: [
        { word: 'inference', meaning: 'A conclusion drawn from clues', example: 'My inference is that she is nervous.' },
        { word: 'evidence', meaning: 'Proof taken from the text', example: 'Use a quotation as evidence.' },
        { word: 'imply', meaning: 'Suggest without saying directly', example: 'The shaking hands imply fear.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is an inference?', options: ['A conclusion based on clues', 'A word’s dictionary meaning', 'The title of a text'], answer: 0, why: 'Readers build inferences from evidence in the text.' },
        { type: 'multiple_choice', question: 'Which detail best supports the idea that Tom is tired?', options: ['He wore a blue coat.', 'He walked to school.', 'He yawned and rubbed his eyes.'], answer: 2, why: 'Yawning and rubbing eyes are signs of tiredness.' },
        { type: 'multiple_choice', question: 'A character says “Fine” and slams the door. What can you infer?', options: ['They are sleepy', 'They are angry', 'They are hungry'], answer: 1, why: 'The slammed door suggests strong frustration.' }
      ]
    }, {
      id: 'lower-secondary-english-m1-l3',
      order: 3,
      title: 'Analysing a Character',
      objective: 'I can describe a character using actions, speech, and reactions.',
      minutes: 8,
      recap: 'You built a character picture from actions, speech, and reactions.',
      blocks: [
        { type: 'text', body: 'Writers reveal character through what people do, say, and think.' },
        { type: 'text', body: 'Notice how other characters react. Their responses show us more.' },
        { type: 'text', body: 'Choose two or three details rather than listing everything.' },
        { type: 'tip', body: 'Avoid labelling a character. Explain which detail gives you that impression.' },
        {
          type: 'illustration',
          alt: 'Theatre masks for comedy and tragedy on a dark stage.',
          image: 'assets/3d/performing-arts-3d.png',
          placeholder: 'Theatre masks: character shown through action and speech.'
        },
        { type: 'example', steps: ['Detail: she shares her lunch every day.', 'Detail: she speaks calmly to new pupils.', 'Conclusion: she is generous and kind.'] }
      ],
      vocabulary: [
        { word: 'characterisation', meaning: 'How a writer builds a character', example: 'The writer uses characterisation through speech.' },
        { word: 'impression', meaning: 'The feeling a character gives you', example: 'She creates a warm impression.' },
        { word: 'motive', meaning: 'The reason a character acts', example: 'His motive is to protect his sister.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which detail best reveals character?', options: ['She has brown hair.', 'She always waits for her friend.', 'She lives in Leeds.'], answer: 1, why: 'Actions show personality more than appearance or place.' },
        { type: 'multiple_choice', question: 'What does a character’s speech reveal?', options: ['Their personality and attitude', 'Their height', 'The weather'], answer: 0, why: 'Word choice and tone show how a character thinks and feels.' },
        { type: 'multiple_choice', question: 'A boy gives his last coin to a stranger. What trait does this suggest?', options: ['Jealousy', 'Carelessness', 'Generosity'], answer: 2, why: 'Giving away something precious suggests generosity.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Writing with Purpose',
    description: 'Paragraphs, persuasion, and formal letters with a clear reader in mind. Draft content.',
    lessons: [{
      id: 'lower-secondary-english-m2-l1',
      order: 1,
      title: 'Paragraphs That Flow',
      objective: 'I can organise ideas into paragraphs that connect clearly.',
      minutes: 8,
      recap: 'You organised ideas into paragraphs with clear links.',
      blocks: [
        { type: 'text', body: 'Each paragraph should make one main point.' },
        { type: 'text', body: 'Start with a topic sentence that names the point.' },
        { type: 'text', body: 'Link sentences with connectives such as however, because, and therefore.' },
        { type: 'tip', body: 'If a sentence does not support the paragraph’s point, move or remove it.' },
        {
          type: 'illustration',
          alt: 'A memo pad with a short list of connected points.',
          image: 'assets/3d/memo-3d.png',
          placeholder: 'Memo: one point per paragraph, linked in order.'
        },
        { type: 'example', steps: ['Topic sentence: School gardens improve wellbeing.', 'Evidence: pupils spend time outdoors.', 'Link: As a result, lessons feel calmer.'] }
      ],
      vocabulary: [
        { word: 'paragraph', meaning: 'A group of sentences about one point', example: 'Begin each paragraph with a clear point.' },
        { word: 'connective', meaning: 'A word that links ideas', example: 'However signals a contrast.' },
        { word: 'topic sentence', meaning: 'The sentence that states a paragraph’s point', example: 'The topic sentence comes first.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should each paragraph contain?', options: ['One main point', 'As many ideas as possible', 'Only quotations'], answer: 0, why: 'One point per paragraph keeps writing clear.' },
        { type: 'multiple_choice', question: 'Which word links a cause to its result?', options: ['meanwhile', 'therefore', 'above'], answer: 1, why: 'Therefore introduces a result.' },
        { type: 'multiple_choice', question: 'Which sentence is the best topic sentence?', options: ['We put a bin in the hall.', 'Recycling reduces waste in schools.', 'My teacher is tall.'], answer: 1, why: 'It states a clear point the paragraph can develop.' }
      ]
    }, {
      id: 'lower-secondary-english-m2-l2',
      order: 2,
      title: 'Persuasive Writing',
      objective: 'I can persuade a reader using reasons, evidence, and direct address.',
      minutes: 8,
      recap: 'You persuaded a reader with reasons, evidence, and direct address.',
      blocks: [
        { type: 'text', body: 'State your position clearly in the opening sentence.' },
        { type: 'text', body: 'Give reasons that your reader can check or accept.' },
        { type: 'text', body: 'Use direct address and short rhetorical questions to involve the reader.' },
        { type: 'tip', body: 'A strong argument also acknowledges the other side, then answers it.' },
        {
          type: 'illustration',
          alt: 'A bright speech balloon rising above two speakers.',
          image: 'assets/3d/speech-balloon-3d.png',
          placeholder: 'Speech balloon: a claim, reasons, and a call to action.'
        },
        { type: 'example', steps: ['Claim: Our school should recycle paper.', 'Reason: one tonne of paper saves seventeen trees.', 'Call to action: ask your tutor to add a paper bin today.'] }
      ],
      vocabulary: [
        { word: 'persuade', meaning: 'Convince someone to agree or act', example: 'We persuade readers with reasons.' },
        { word: 'claim', meaning: 'A statement you argue is true', example: 'My claim is that homework helps.' },
        { word: 'rhetorical question', meaning: 'A question asked for effect', example: 'Do we really want more waste?' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which opening best states a position?', options: ['Our town needs a new library.', 'Libraries have books.', 'Some people like reading.'], answer: 0, why: 'It makes a clear, arguable claim.' },
        { type: 'multiple_choice', question: 'Which is the strongest evidence?', options: ['A survey of 200 pupils found 80% wanted later starts.', 'Everyone thinks later starts are nice.', 'I prefer later starts.'], answer: 0, why: 'Survey data is checkable evidence, not just opinion.' },
        { type: 'multiple_choice', question: 'Why use a rhetorical question?', options: ['To give a definition', 'To add a quotation', 'To make the reader think and agree'], answer: 2, why: 'It draws the reader in and points toward your view.' }
      ]
    }, {
      id: 'lower-secondary-english-m2-l3',
      order: 3,
      title: 'Writing a Formal Letter',
      objective: 'I can write a formal letter with the correct layout and tone.',
      minutes: 9,
      recap: 'You wrote a formal letter with a clear layout and polite tone.',
      blocks: [
        { type: 'text', body: 'A formal letter opens with your address and the date.' },
        { type: 'text', body: 'Use a polite greeting such as Dear Ms Patel, and a clear subject line.' },
        { type: 'text', body: 'State your purpose in the first paragraph, then add details and a closing request.' },
        { type: 'tip', body: 'Use Yours sincerely when you know the name, and Yours faithfully when you do not.' },
        {
          type: 'illustration',
          alt: 'A sealed cream envelope with a neat address.',
          image: 'assets/3d/envelope-3d.png',
          placeholder: 'Envelope: address, greeting, purpose, closing.'
        },
        { type: 'example', steps: ['Opening: I am writing to request a new bike rack.', 'Detail: twelve pupils cycle daily with nowhere to park.', 'Closing: I would be grateful for your reply.'] }
      ],
      vocabulary: [
        { word: 'formal', meaning: 'Polite and suitable for official writing', example: 'Use formal language with a headteacher.' },
        { word: 'salutation', meaning: 'The greeting at the start of a letter', example: 'The salutation is Dear Dr Ali.' },
        { word: 'recipient', meaning: 'The person who receives the message', example: 'Our recipient is the headteacher.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which greeting is formal?', options: ['Dear Ms Patel,', 'Hiya!', 'Yo,'], answer: 0, why: 'Dear with a title and surname is formal.' },
        { type: 'multiple_choice', question: 'Where does the purpose of a formal letter belong?', options: ['In the first paragraph', 'In the signature', 'In the address'], answer: 0, why: 'Readers need the reason for writing immediately.' },
        { type: 'multiple_choice', question: 'Which closing matches a named recipient?', options: ['Yours faithfully,', 'See you,', 'Yours sincerely,'], answer: 2, why: 'Sincerely pairs with a named recipient.' }
      ]
    }]
  }];
}());
```

- [ ] **Step 3: Load the file in the page, tests, and gate**

In `students/index.html`, after the Primary English script, add:

```html
  <script src="data/lower-secondary/english.js"></script>
```

In `tests/learn/content.test.js`, after the Primary English require, add:

```js
require('../../students/data/lower-secondary/english.js');
```

In `tools/check-learn-data.js`, after the Primary English require, add:

```js
require('../students/data/lower-secondary/english.js');
```

- [ ] **Step 4: Update counts and the subject test**

In `tests/learn/content.test.js`, change:

```js
  assert.equal(result.stats.subjects, 4);
  assert.equal(result.stats.modules, 8);
  assert.equal(result.stats.lessons, 24);
  assert.equal(result.stats.questions, 72);
```

to:

```js
  assert.equal(result.stats.subjects, 5);
  assert.equal(result.stats.modules, 10);
  assert.equal(result.stats.lessons, 30);
  assert.equal(result.stats.questions, 90);
```

In the `english subjects have two modules of three lessons` test, change:

```js
  const entries = [
    ['primary', 'english']
  ];
```

to:

```js
  const entries = [
    ['primary', 'english'],
    ['lower-secondary', 'english']
  ];
```

- [ ] **Step 5: Run the gate and tests**

Run: `node tools/check-learn-data.js`
Expected:

```
tracks: 3, subjects: 5, modules: 10, lessons: 30, questions: 90
OK
```

Run: `node --test "tests/learn/*.test.js"`
Expected: PASS — 29 tests, 0 failures.

- [ ] **Step 6: Play the new subject in the browser**

Reload `http://localhost:8000/students/index.html?v=18#/lower-secondary` and check:

- Two subject cards: Mathematics and English.
- Opening English shows `Reading for Meaning` and `Writing with Purpose`, with six lessons.
- `Finding the Main Idea` renders its four explanation blocks, magnifier image, example, vocabulary, and confidence check.
- The quiz accepts option 1, option 3, and option 2, reaches the result screen, and marks the lesson completed.
- `#/` shows Lower Secondary with the correct combined total (`1 of 12 lessons complete` after this play-through).
- No console errors.

- [ ] **Step 7: Commit**

```bash
git add students/data/tracks.js students/data/lower-secondary/english.js students/index.html tests/learn/content.test.js tools/check-learn-data.js
git commit -m "feat(learn): add lower secondary English subject"
```

---

### Task 6: GCSE English Language (6 lessons)

**Files:**
- Modify: `students/data/tracks.js` (append `english-language` to the Upper Secondary track)
- Create: `students/data/upper-secondary/english-language.js`
- Modify: `students/index.html`, `tests/learn/content.test.js`, `tools/check-learn-data.js`

**Interfaces:**
- Consumes: `window.LEARN_TRACKS`; lesson ids `upper-secondary-english-language-m1-l1` … `m2-l3`
- Produces: GCSE English Language with 2 modules × 3 lessons and 18 questions; counts become 6 subjects / 12 modules / 36 lessons / 108 questions

- [ ] **Step 1: Add the subject entry**

In `students/data/tracks.js`, replace the final:

```js
      }]
    }
  ]
};
```

with:

```js
      }, {
        id: 'english-language',
        label: 'English Language',
        description: 'Close reading, analysis, comparison, and purposeful writing.'
      }]
    }
  ]
};
```

- [ ] **Step 2: Create the GCSE English Language data file**

Create `students/data/upper-secondary/english-language.js` with exactly:

```js
/* GCSE English Language — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'english-language');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Reading and Analysis',
    description: 'Close reading, language analysis, and comparing two texts with evidence. Draft content.',
    lessons: [{
      id: 'upper-secondary-english-language-m1-l1',
      order: 1,
      title: 'Close Reading of Fiction',
      objective: 'I can analyse how a writer shapes meaning through close reading.',
      minutes: 10,
      recap: 'You read closely and explained how details build meaning.',
      blocks: [
        { type: 'text', body: 'Read the passage twice: once for the story, once for the craft.' },
        { type: 'text', body: 'Track shifts in mood, pace, and focus, and ask why they happen.' },
        { type: 'text', body: 'Select short quotations that carry weight rather than long blocks.' },
        { type: 'tip', body: 'Zoom in on a single word or image, then widen out to the whole passage.' },
        {
          type: 'illustration',
          alt: 'An open novel with a bookmark resting across a marked page.',
          image: 'assets/3d/open_book-3d.png',
          placeholder: 'Open novel: close reading from a single word to the whole passage.'
        },
        { type: 'example', steps: ['Notice: the sentences shorten as the storm begins.', 'Zoom: “cracked” suggests sudden damage.', 'Widen: pace and word choice both create panic.'] }
      ],
      vocabulary: [
        { word: 'close reading', meaning: 'Careful study of a short passage', example: 'Close reading reveals how the tension builds.' },
        { word: 'connotation', meaning: 'An idea a word suggests', example: 'The word snakes has a sinister connotation.' },
        { word: 'nuance', meaning: 'A subtle difference in meaning', example: 'The nuance changes how we judge the character.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should a second reading focus on?', options: ['How the writer shapes meaning', 'The page number', 'The author’s birthday'], answer: 0, why: 'A second reading moves from story to craft.' },
        { type: 'multiple_choice', question: 'Why choose a short quotation?', options: ['It fills more space', 'It lets you analyse each word closely', 'It avoids explaining'], answer: 1, why: 'Short quotations give room for precise analysis.' },
        { type: 'multiple_choice', question: 'Sentences shorten and verbs become harsh. What effect is likely?', options: ['Growing tension and urgency', 'Calm reflection', 'Gentle humour'], answer: 0, why: 'Short, harsh sentences speed up pace and raise tension.' }
      ]
    }, {
      id: 'upper-secondary-english-language-m1-l2',
      order: 2,
      title: 'Analysing Language and Structure',
      objective: 'I can explain how language and structure create effects on the reader.',
      minutes: 10,
      recap: 'You analysed language choices and structural shifts for effect.',
      blocks: [
        { type: 'text', body: 'Language analysis names a technique, quotes it, and explains the effect.' },
        { type: 'text', body: 'Structure is the order of ideas: openings, shifts, repetition, and endings.' },
        { type: 'text', body: 'Link every effect back to the reader’s experience or the writer’s purpose.' },
        { type: 'tip', body: 'Avoid technique spotting. One well-explained choice beats five named devices.' },
        {
          type: 'illustration',
          alt: 'A magnifying glass enlarging a single printed phrase.',
          image: 'assets/3d/magnifying-glass-tilted-left-3d.png',
          placeholder: 'Magnifier: name the choice, quote it, explain the effect.'
        },
        { type: 'example', steps: ['Choice: the writer repeats “again”.', 'Effect: the repetition feels trapped and hopeless.', 'Purpose: it persuades us to pity the speaker.'] }
      ],
      vocabulary: [
        { word: 'structure', meaning: 'The order and arrangement of a text', example: 'The circular structure returns to the opening.' },
        { word: 'effect', meaning: 'The impact a choice has on readers', example: 'The short sentence creates shock.' },
        { word: 'motif', meaning: 'A repeated image or idea', example: 'The river is a motif throughout the novel.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What must follow a quotation in language analysis?', options: ['An explanation of its effect', 'A longer quotation', 'A new paragraph'], answer: 0, why: 'Analysis explains how the words shape meaning.' },
        { type: 'multiple_choice', question: 'Which is a structural feature?', options: ['A simile in one line', 'A shift in time midway through', 'A three-syllable word'], answer: 1, why: 'Structure concerns the arrangement and order of the text.' },
        { type: 'multiple_choice', question: 'A writer repeats “never” three times. What is the likely effect?', options: ['Emphasis and finality', 'Confusion', 'Comedy'], answer: 0, why: 'Repetition stresses the point and closes down hope.' }
      ]
    }, {
      id: 'upper-secondary-english-language-m1-l3',
      order: 3,
      title: 'Comparing Two Texts',
      objective: 'I can compare two texts, explaining similarities and differences with evidence.',
      minutes: 10,
      recap: 'You compared two texts and supported each point with evidence.',
      blocks: [
        { type: 'text', body: 'Read both texts with the same question in mind before you compare.' },
        { type: 'text', body: 'Compare ideas, tone, and method, not just topic.' },
        { type: 'text', body: 'Use connectives such as similarly, whereas, and in contrast.' },
        { type: 'tip', body: 'Balance your response. Give both texts equal attention.' },
        {
          type: 'illustration',
          alt: 'A brass balance scale with two even pans.',
          image: 'assets/3d/balance-scale-3d.png',
          placeholder: 'Balance scale: two texts weighed side by side.'
        },
        { type: 'example', steps: ['Both texts describe city life.', 'Text A is admiring, whereas Text B is critical.', 'Text B uses statistics; Text A uses imagery.'] }
      ],
      vocabulary: [
        { word: 'compare', meaning: 'Show similarities and differences', example: 'Compare the two openings.' },
        { word: 'contrast', meaning: 'Show how things differ', example: 'The contrast in tone is striking.' },
        { word: 'perspective', meaning: 'A viewpoint on an issue', example: 'Each writer offers a different perspective.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should a comparison cover?', options: ['Ideas, tone, and method', 'Only the topic', 'Only the titles'], answer: 0, why: 'Strong comparison analyses how each text works.' },
        { type: 'multiple_choice', question: 'Which connective signals a difference?', options: ['similarly', 'whereas', 'also'], answer: 1, why: 'Whereas introduces a contrast.' },
        { type: 'multiple_choice', question: 'Text A uses facts; Text B uses images. What is this a comparison of?', options: ['Method', 'Topic', 'Audience'], answer: 0, why: 'Facts and imagery are different techniques or methods.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Writing',
    description: 'Description, narrative, and persuasive writing shaped for a clear purpose. Draft content.',
    lessons: [{
      id: 'upper-secondary-english-language-m2-l1',
      order: 1,
      title: 'Descriptive Writing',
      objective: 'I can write description that uses precise imagery and varied sentences.',
      minutes: 10,
      recap: 'You used precise imagery and varied sentences to describe a place.',
      blocks: [
        { type: 'text', body: 'Choose a clear viewpoint and keep it consistent throughout.' },
        { type: 'text', body: 'Use sensory detail, but select two or three strong images rather than listing everything.' },
        { type: 'text', body: 'Vary sentence length. A short sentence can sharpen a key moment.' },
        { type: 'tip', body: 'Avoid clichés. Test each image: could it belong to any place?' },
        {
          type: 'illustration',
          alt: 'An artist’s palette with bright dabs of paint.',
          image: 'assets/3d/artist-palette-3d.png',
          placeholder: 'Palette: precise sensory images painting a scene.'
        },
        { type: 'example', steps: ['Start wide: the market hums under striped awnings.', 'Zoom in: lemons glow beside a cracked blue bowl.', 'Close with a short sentence: Then silence.'] }
      ],
      vocabulary: [
        { word: 'imagery', meaning: 'Language that creates pictures in the mind', example: 'The imagery of heat makes the market vivid.' },
        { word: 'sensory', meaning: 'Relating to sight, sound, smell, taste, or touch', example: 'Sensory detail brings the scene alive.' },
        { word: 'viewpoint', meaning: 'The position from which a scene is described', example: 'Keep a consistent viewpoint.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What makes description effective?', options: ['Selected, precise images', 'Every possible detail', 'Long words only'], answer: 0, why: 'Careful selection creates a clearer picture than a list.' },
        { type: 'multiple_choice', question: 'Why vary sentence length?', options: ['To fill the page', 'To avoid paragraphs', 'To control pace and emphasis'], answer: 2, why: 'Short sentences can slow or sharpen a moment.' },
        { type: 'multiple_choice', question: 'Which line is the strongest sensory image?', options: ['Lemons glow beside a cracked blue bowl.', 'It was a nice market.', 'There were many things.'], answer: 0, why: 'It gives specific visual detail the reader can picture.' }
      ]
    }, {
      id: 'upper-secondary-english-language-m2-l2',
      order: 2,
      title: 'Narrative Writing',
      objective: 'I can shape a narrative with a clear structure and controlled pace.',
      minutes: 10,
      recap: 'You shaped a narrative with a clear structure and deliberate pace.',
      blocks: [
        { type: 'text', body: 'Begin near the moment of change, not with a long explanation.' },
        { type: 'text', body: 'Use a clear sequence: setup, complication, climax, resolution.' },
        { type: 'text', body: 'Show emotion through action and detail rather than naming it.' },
        { type: 'tip', body: 'Plan the ending first so the whole story points toward it.' },
        {
          type: 'illustration',
          alt: 'A weathered scroll holding a handwritten story.',
          image: 'assets/3d/scroll-3d.png',
          placeholder: 'Scroll: a story shaped from setup to resolution.'
        },
        { type: 'example', steps: ['Setup: a girl waits at an empty station.', 'Complication: the last train is cancelled.', 'Resolution: she walks home and notices the town.'] }
      ],
      vocabulary: [
        { word: 'narrative', meaning: 'A story with events and characters', example: 'The narrative follows one night.' },
        { word: 'climax', meaning: 'The moment of greatest tension', example: 'The climax comes at the station.' },
        { word: 'resolution', meaning: 'How the story settles at the end', example: 'The resolution feels quiet but hopeful.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Where should a short narrative often begin?', options: ['Near the moment of change', 'With a family history', 'With the ending'], answer: 0, why: 'Starting close to the action hooks the reader.' },
        { type: 'multiple_choice', question: 'How can a writer show fear?', options: ['Through shaking hands and short breaths', 'By writing “she was scared”', 'By listing fears'], answer: 0, why: 'Actions let readers infer emotion.' },
        { type: 'multiple_choice', question: 'What is the climax?', options: ['The opening description', 'The point of greatest tension', 'The final sentence'], answer: 1, why: 'The climax is the peak moment the story builds toward.' }
      ]
    }, {
      id: 'upper-secondary-english-language-m2-l3',
      order: 3,
      title: 'Writing to Argue and Persuade',
      objective: 'I can argue a clear position using structure, evidence, and persuasive devices.',
      minutes: 10,
      recap: 'You argued a clear position using evidence and persuasive structure.',
      blocks: [
        { type: 'text', body: 'Open with a decisive claim, then signpost your main reasons.' },
        { type: 'text', body: 'Build each paragraph around one reason, supported by evidence.' },
        { type: 'text', body: 'Address the counterargument fairly, then show why your position is stronger.' },
        { type: 'tip', body: 'Rhetoric must serve the argument. Do not let devices replace evidence.' },
        {
          type: 'illustration',
          alt: 'A silver microphone standing before a seated audience.',
          image: 'assets/3d/microphone-3d.png',
          placeholder: 'Microphone: a speech built on claim, reasons, and proof.'
        },
        { type: 'example', steps: ['Claim: school start times should be later.', 'Evidence: sleep research shows teenagers need nine hours.', 'Rebuttal: early buses can be rescheduled.'] }
      ],
      vocabulary: [
        { word: 'argue', meaning: 'Present reasons for a position', example: 'We argue for a later start.' },
        { word: 'counterargument', meaning: 'The opposing view', example: 'Answer the counterargument directly.' },
        { word: 'rhetoric', meaning: 'Language used to persuade', example: 'Her rhetoric is calm but firm.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should open a persuasive speech?', options: ['A clear claim', 'A long story', 'A list of names'], answer: 0, why: 'A claim tells the audience what you will argue.' },
        { type: 'multiple_choice', question: 'How should a counterargument be treated?', options: ['Acknowledged and answered', 'Ignored completely', 'Repeated as fact'], answer: 0, why: 'Answering it makes your own case more convincing.' },
        { type: 'multiple_choice', question: 'Which is evidence rather than rhetoric?', options: ['Sleep research shows teenagers need nine hours.', 'Everyone knows mornings are hard.', 'Imagine a better day.'], answer: 0, why: 'Research findings can be checked and evaluated.' }
      ]
    }]
  }];
}());
```

- [ ] **Step 3: Load the file in the page, tests, and gate**

In `students/index.html`, after the Lower Secondary English script, add:

```html
  <script src="data/upper-secondary/english-language.js"></script>
```

In `tests/learn/content.test.js`, after the Lower Secondary English require, add:

```js
require('../../students/data/upper-secondary/english-language.js');
```

In `tools/check-learn-data.js`, after the Lower Secondary English require, add:

```js
require('../students/data/upper-secondary/english-language.js');
```

- [ ] **Step 4: Update counts and the subject test**

In `tests/learn/content.test.js`, change:

```js
  assert.equal(result.stats.subjects, 5);
  assert.equal(result.stats.modules, 10);
  assert.equal(result.stats.lessons, 30);
  assert.equal(result.stats.questions, 90);
```

to:

```js
  assert.equal(result.stats.subjects, 6);
  assert.equal(result.stats.modules, 12);
  assert.equal(result.stats.lessons, 36);
  assert.equal(result.stats.questions, 108);
```

In the `english subjects have two modules of three lessons` test, change:

```js
  const entries = [
    ['primary', 'english'],
    ['lower-secondary', 'english']
  ];
```

to:

```js
  const entries = [
    ['primary', 'english'],
    ['lower-secondary', 'english'],
    ['upper-secondary', 'english-language']
  ];
```

- [ ] **Step 5: Run the gate and tests**

Run: `node tools/check-learn-data.js`
Expected:

```
tracks: 3, subjects: 6, modules: 12, lessons: 36, questions: 108
OK
```

Run: `node --test "tests/learn/*.test.js"`
Expected: PASS — 29 tests, 0 failures.

- [ ] **Step 6: Play the new subject in the browser**

Reload `http://localhost:8000/students/index.html?v=19#/upper-secondary` and check:

- Two subject cards: Mathematics and English Language. English Literature is not present yet.
- Opening English Language shows `Reading and Analysis` and `Writing`, with six lessons.
- `Close Reading of Fiction` renders its four explanation blocks, the open-book image, example, vocabulary, and confidence check; the read-aloud button appears.
- The quiz accepts option 1, option 2, and option 1, reaches the result screen, and marks the lesson completed.
- No console errors.

- [ ] **Step 7: Commit**

```bash
git add students/data/tracks.js students/data/upper-secondary/english-language.js students/index.html tests/learn/content.test.js tools/check-learn-data.js
git commit -m "feat(learn): add GCSE English Language subject"
```

---

### Task 7: GCSE English Literature (6 lessons) and pack release

**Files:**
- Modify: `students/data/tracks.js` (append `english-literature`)
- Create: `students/data/upper-secondary/english-literature.js`
- Modify: `students/index.html`, `tests/learn/content.test.js`, `tools/check-learn-data.js`
- Modify: `sw.js:8`, `sw.js:63-90`
- Modify: `README.md:88-96`

**Interfaces:**
- Consumes: `window.LEARN_TRACKS`; lesson ids `upper-secondary-english-literature-m1-l1` … `m2-l3`
- Produces: GCSE English Literature with 2 modules × 3 lessons and 18 questions; final pack counts 7 subjects / 14 modules / 42 lessons / 126 questions

- [ ] **Step 1: Add the subject entry**

In `students/data/tracks.js`, replace:

```js
      }, {
        id: 'english-language',
        label: 'English Language',
        description: 'Close reading, analysis, comparison, and purposeful writing.'
      }]
    }
  ]
};
```

with:

```js
      }, {
        id: 'english-language',
        label: 'English Language',
        description: 'Close reading, analysis, comparison, and purposeful writing.'
      }, {
        id: 'english-literature',
        label: 'English Literature',
        description: 'Poetry, Shakespeare, the novel, and essay craft.'
      }]
    }
  ]
};
```

- [ ] **Step 2: Create the GCSE English Literature data file**

Create `students/data/upper-secondary/english-literature.js` with exactly:

```js
/* GCSE English Literature — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'english-literature');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Poetry and Plays',
    description: 'Unseen poetry, Shakespeare, and comparison of poems and their effects. Draft content.',
    lessons: [{
      id: 'upper-secondary-english-literature-m1-l1',
      order: 1,
      title: 'Reading Unseen Poetry',
      objective: 'I can read an unseen poem and explain how it creates meaning.',
      minutes: 10,
      recap: 'You read an unseen poem closely and explained its effects.',
      blocks: [
        { type: 'text', body: 'Read the poem twice: first for the story, then for the feeling.' },
        { type: 'text', body: 'Track who is speaking, what changes, and where the poem turns.' },
        { type: 'text', body: 'Comment on form, imagery, and sound, linking each to meaning.' },
        { type: 'tip', body: 'Uncertainty is acceptable if you explain the effect of the words.' },
        {
          type: 'illustration',
          alt: 'An old scroll with a handwritten poem.',
          image: 'assets/3d/scroll-3d.png',
          placeholder: 'Scroll: an unseen poem read for meaning and effect.'
        },
        { type: 'example', steps: ['Speaker: someone returning to a childhood home.', 'Turn: the poem shifts from joy to loss at line nine.', 'Sound: soft consonants make the ending feel quiet.'] }
      ],
      vocabulary: [
        { word: 'stanza', meaning: 'A group of lines in a poem', example: 'The final stanza returns to the opening image.' },
        { word: 'volta', meaning: 'A turn in a poem’s argument or mood', example: 'The volta changes the tone.' },
        { word: 'enjambment', meaning: 'A sentence running past a line break', example: 'Enjambment quickens the pace.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should a second reading of a poem focus on?', options: ['How the poem creates feeling', 'The poet’s birthday', 'The title’s length'], answer: 0, why: 'A second reading moves from story to technique.' },
        { type: 'multiple_choice', question: 'What is a volta?', options: ['A repeated rhyme', 'A turn in mood or argument', 'A four-line stanza'], answer: 1, why: 'A volta marks a shift in the poem.' },
        { type: 'multiple_choice', question: 'Soft consonants slow the final lines. What effect is likely?', options: ['Calm or sadness', 'Sudden panic', 'Comedy'], answer: 0, why: 'Sound patterns shape the mood of a poem.' }
      ]
    }, {
      id: 'upper-secondary-english-literature-m1-l2',
      order: 2,
      title: 'Analysing a Shakespeare Scene',
      objective: 'I can analyse a Shakespeare scene using language, action, and context.',
      minutes: 10,
      recap: 'You analysed a Shakespeare scene through language, action, and context.',
      blocks: [
        { type: 'text', body: 'Establish what happens in the scene before analysing the language.' },
        { type: 'text', body: 'Track how power shifts between characters through what they say and do.' },
        { type: 'text', body: 'Use context only where it sharpens your reading, not as decoration.' },
        { type: 'tip', body: 'Quote briefly and explain the effect of individual words.' },
        {
          type: 'illustration',
          alt: 'Two theatre masks, one smiling and one frowning.',
          image: 'assets/3d/performing-arts-3d.png',
          placeholder: 'Theatre masks: power and emotion in a Shakespeare scene.'
        },
        { type: 'example', steps: ['Action: Lady Macbeth takes control of the plan.', 'Language: she questions Macbeth’s courage.', 'Effect: her authority grows as his confidence falls.'] }
      ],
      vocabulary: [
        { word: 'soliloquy', meaning: 'A speech revealing a character’s private thoughts', example: 'The soliloquy shows his doubt.' },
        { word: 'dramatic irony', meaning: 'When the audience knows more than a character', example: 'Dramatic irony makes the scene tense.' },
        { word: 'iambic pentameter', meaning: 'A ten-syllable line with a steady beat', example: 'The iambic pentameter sounds controlled.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should you establish before analysing language?', options: ['What happens in the scene', 'The theatre’s address', 'The ticket price'], answer: 0, why: 'Understanding events gives language analysis a purpose.' },
        { type: 'multiple_choice', question: 'What is dramatic irony?', options: ['The audience knows more than a character', 'A character speaks alone', 'A rhyming couplet'], answer: 0, why: 'The gap in knowledge creates tension.' },
        { type: 'multiple_choice', question: 'A character’s confident speech is followed by their failure. What effect is created?', options: ['Rhyme', 'Dramatic irony', 'Alliteration'], answer: 1, why: 'The audience sees the gap between words and outcome.' }
      ]
    }, {
      id: 'upper-secondary-english-literature-m1-l3',
      order: 3,
      title: 'Comparing Poems',
      objective: 'I can compare two poems, analysing methods and effects together.',
      minutes: 10,
      recap: 'You compared two poems, linking methods to effects.',
      blocks: [
        { type: 'text', body: 'Choose two or three points of comparison rather than listing everything.' },
        { type: 'text', body: 'Compare method and effect, not just subject matter.' },
        { type: 'text', body: 'Use comparative connectives to keep both poems in view.' },
        { type: 'tip', body: 'A strong comparison moves back and forth between the poems.' },
        {
          type: 'illustration',
          alt: 'A brass scale balancing two equal pans.',
          image: 'assets/3d/balance-scale-3d.png',
          placeholder: 'Balance scale: two poems compared point by point.'
        },
        { type: 'example', steps: ['Both poems use nature imagery.', 'Poem A uses it to comfort; Poem B uses it to threaten.', 'The contrast shapes each poem’s ending.'] }
      ],
      vocabulary: [
        { word: 'comparison', meaning: 'A point-by-point analysis of similarities and differences', example: 'My comparison focuses on imagery.' },
        { word: 'method', meaning: 'A technique a writer uses', example: 'Both poets use a regular rhythm.' },
        { word: 'contrast', meaning: 'A clear difference', example: 'The contrast in endings is striking.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'How should a poetry comparison be organised?', options: ['By points linking both poems', 'Poem A then Poem B only', 'By line number'], answer: 0, why: 'Point-by-point comparison keeps both poems in view.' },
        { type: 'multiple_choice', question: 'What is a method?', options: ['A technique the poet uses', 'The poem’s title', 'The poet’s home'], answer: 0, why: 'Method means how the writer creates effects.' },
        { type: 'multiple_choice', question: 'Both poems use storms but to different ends. What should you discuss?', options: ['Only the weather', 'The different effects of the same method', 'The poets’ names'], answer: 1, why: 'Comparison should explain how method creates different effects.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'The Novel and Essays',
    description: 'Nineteenth-century novels, themes, context, and essay craft. Draft content.',
    lessons: [{
      id: 'upper-secondary-english-literature-m2-l1',
      order: 1,
      title: 'Exploring a 19th-Century Novel',
      objective: 'I can analyse a 19th-century novel’s characters, setting, and voice.',
      minutes: 10,
      recap: 'You analysed character, setting, and narrative voice in a novel extract.',
      blocks: [
        { type: 'text', body: 'Read extracts closely, tracking how the narrator shapes our judgement.' },
        { type: 'text', body: 'Consider setting as more than background: it can reflect mood and power.' },
        { type: 'text', body: 'Link character choices to the pressures of the society around them.' },
        { type: 'tip', body: 'Use short quotations as evidence, then explain the writer’s choice.' },
        {
          type: 'illustration',
          alt: 'A stack of worn novels with gilded spines.',
          image: 'assets/3d/books-3d.png',
          placeholder: 'Novels: character, setting, and narrative voice analysed.'
        },
        { type: 'example', steps: ['Narrator: the story is told by a servant.', 'Setting: the grand house feels cold and watchful.', 'Effect: readers see the family through an outsider’s eyes.'] }
      ],
      vocabulary: [
        { word: 'narrator', meaning: 'The voice telling the story', example: 'The narrator is a young servant.' },
        { word: 'setting', meaning: 'Where and when a story takes place', example: 'The setting is a remote country house.' },
        { word: 'omniscient', meaning: 'Knowing the thoughts of all characters', example: 'The omniscient narrator judges everyone.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Why does narrative voice matter?', options: ['It shapes how we judge events', 'It sets the cover price', 'It lists the characters'], answer: 0, why: 'The teller’s perspective influences our sympathies.' },
        { type: 'multiple_choice', question: 'What can setting reveal?', options: ['Only the weather', 'Mood and social power', 'The author’s age'], answer: 1, why: 'Places can embody atmosphere and hierarchy.' },
        { type: 'multiple_choice', question: 'An outsider narrates a wealthy family. What is a likely effect?', options: ['Readers notice hidden tensions', 'Readers learn nothing', 'The story loses conflict'], answer: 0, why: 'An outsider sees details the family hides.' }
      ]
    }, {
      id: 'upper-secondary-english-literature-m2-l2',
      order: 2,
      title: 'Themes and Context',
      objective: 'I can explore a theme and connect it to relevant context.',
      minutes: 10,
      recap: 'You explored a theme and linked it to relevant context.',
      blocks: [
        { type: 'text', body: 'A theme is an idea the text explores, not a single moral message.' },
        { type: 'text', body: 'Track a theme across the whole text, noting where it changes.' },
        { type: 'text', body: 'Use context to illuminate the text, and avoid long historical summaries.' },
        { type: 'tip', body: 'Choose the context that best explains a specific moment or choice.' },
        {
          type: 'illustration',
          alt: 'A simple world map with a marked location.',
          image: 'assets/3d/world-map-3d.png',
          placeholder: 'Map: context that shapes a text’s themes.'
        },
        { type: 'example', steps: ['Theme: ambition and its cost.', 'Context: expectations limited women’s choices.', 'Link: the character’s ambition becomes a form of rebellion.'] }
      ],
      vocabulary: [
        { word: 'theme', meaning: 'An idea explored throughout a text', example: 'Ambition is a central theme.' },
        { word: 'context', meaning: 'The background that shapes a text', example: 'Context explains the character’s limits.' },
        { word: 'society', meaning: 'The people and customs around a text', example: 'Society expects her to marry.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a theme?', options: ['An idea explored across a text', 'A single lesson', 'The plot summary'], answer: 0, why: 'Themes are developed ideas, open to interpretation.' },
        { type: 'multiple_choice', question: 'How should context be used?', options: ['To replace quotations', 'To explain specific moments', 'As a long history lesson'], answer: 1, why: 'Context should sharpen analysis of the text itself.' },
        { type: 'multiple_choice', question: 'A character rejects marriage to pursue work. Which context is most relevant?', options: ['Expectations about women’s roles', 'The price of bread', 'The weather'], answer: 0, why: 'That context directly explains the significance of her choice.' }
      ]
    }, {
      id: 'upper-secondary-english-literature-m2-l3',
      order: 3,
      title: 'Writing a Literature Essay',
      objective: 'I can write a literature essay with a clear argument and integrated evidence.',
      minutes: 10,
      recap: 'You built a literature essay around a clear argument and evidence.',
      blocks: [
        { type: 'text', body: 'Turn the question into a clear thesis in your introduction.' },
        { type: 'text', body: 'Plan two or three points, each with evidence from across the text.' },
        { type: 'text', body: 'Embed short quotations in your sentences and explain their effect.' },
        { type: 'tip', body: 'Every paragraph should advance the argument, not just describe the text.' },
        {
          type: 'illustration',
          alt: 'A red bookmark resting in a closed hardback book.',
          image: 'assets/3d/bookmark-3d.png',
          placeholder: 'Bookmark: signposts that keep an essay’s argument on track.'
        },
        { type: 'example', steps: ['Thesis: ambition drives the tragedy.', 'Point: the hero ignores warnings.', 'Evidence: “I will not yield” shows his certainty.', 'Link: certainty becomes his downfall.'] }
      ],
      vocabulary: [
        { word: 'thesis', meaning: 'The central argument of an essay', example: 'My thesis links ambition to downfall.' },
        { word: 'embed', meaning: 'Include a quotation inside your sentence', example: 'Embed the quotation smoothly.' },
        { word: 'analysis', meaning: 'Explaining how evidence supports a point', example: 'The analysis explains the image’s effect.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should an introduction include?', options: ['A full plot summary', 'The author’s biography', 'A clear thesis'], answer: 2, why: 'A thesis states the argument the essay will prove.' },
        { type: 'multiple_choice', question: 'How should a quotation be used?', options: ['Embedded and explained', 'Listed without comment', 'Repeated three times'], answer: 0, why: 'Explanation turns evidence into argument.' },
        { type: 'multiple_choice', question: 'Which sentence advances an argument?', options: ['The warning shows his pride is already blinding him.', 'He meets a witch.', 'The play is long.'], answer: 0, why: 'It interprets evidence rather than describing plot.' }
      ]
    }]
  }];
}());
```

- [ ] **Step 3: Load the file in the page, tests, and gate**

In `students/index.html`, after the English Language script, add:

```html
  <script src="data/upper-secondary/english-literature.js"></script>
```

In `tests/learn/content.test.js`, after the English Language require, add:

```js
require('../../students/data/upper-secondary/english-literature.js');
```

In `tools/check-learn-data.js`, after the English Language require, add:

```js
require('../students/data/upper-secondary/english-literature.js');
```

- [ ] **Step 4: Update final counts and the subject test**

In `tests/learn/content.test.js`, change:

```js
  assert.equal(result.stats.subjects, 6);
  assert.equal(result.stats.modules, 12);
  assert.equal(result.stats.lessons, 36);
  assert.equal(result.stats.questions, 108);
```

to:

```js
  assert.equal(result.stats.subjects, 7);
  assert.equal(result.stats.modules, 14);
  assert.equal(result.stats.lessons, 42);
  assert.equal(result.stats.questions, 126);
```

In the `english subjects have two modules of three lessons` test, change:

```js
  const entries = [
    ['primary', 'english'],
    ['lower-secondary', 'english'],
    ['upper-secondary', 'english-language']
  ];
```

to:

```js
  const entries = [
    ['primary', 'english'],
    ['lower-secondary', 'english'],
    ['upper-secondary', 'english-language'],
    ['upper-secondary', 'english-literature']
  ];
```

- [ ] **Step 5: Bump the cache and precache the pack**

In `sw.js`, change:

```js
const CACHE = 'jamb-study-v15';
```

to:

```js
const CACHE = 'jamb-study-v16';
```

In the `ASSETS` array, after `'./students/data/tracks.js',` add:

```js
  './students/data/primary/english.js',
  './students/data/lower-secondary/english.js',
  './students/data/upper-secondary/english-language.js',
  './students/data/upper-secondary/english-literature.js',
```

After `'./students/assets/3d/counterclockwise-arrows-button-3d.png',` add:

```js
  './students/assets/3d/open_book-3d.png',
  './students/assets/3d/books-3d.png',
  './students/assets/3d/memo-3d.png',
  './students/assets/3d/pencil-3d.png',
  './students/assets/3d/label-3d.png',
  './students/assets/3d/scroll-3d.png',
  './students/assets/3d/magnifying-glass-tilted-left-3d.png',
  './students/assets/3d/thought-balloon-3d.png',
  './students/assets/3d/speech-balloon-3d.png',
  './students/assets/3d/envelope-3d.png',
  './students/assets/3d/artist-palette-3d.png',
  './students/assets/3d/performing-arts-3d.png',
  './students/assets/3d/world-map-3d.png',
  './students/assets/3d/bookmark-3d.png',
  './students/assets/3d/microphone-3d.png',
```

- [ ] **Step 6: Update the README**

In `README.md`, replace:

```markdown
- Three tracks: Primary (Key Stage 1–2), Lower Secondary (Key Stage 3), and
  Upper Secondary (GCSE Foundation Maths & Science).
- Mathematics first: 2 modules × 3 lessons per track.
```

with:

```markdown
- Three tracks: Primary (Key Stage 1–2), Lower Secondary (Key Stage 3), and
  Upper Secondary (GCSE Foundation).
- English and Mathematics first: 2 modules × 3 lessons per subject, per track.
- Subjects: English (Primary and Lower Secondary), GCSE English Language,
  GCSE English Literature, and Mathematics. More subjects follow in packs.
```

- [ ] **Step 7: Run the final gate and tests**

Run: `node tools/check-learn-data.js`
Expected:

```
tracks: 3, subjects: 7, modules: 14, lessons: 42, questions: 126
OK
```

Run: `node --test "tests/learn/*.test.js"`
Expected: PASS — 29 tests, 0 failures.

- [ ] **Step 8: Verify the whole pack in the browser**

Reload `http://localhost:8000/students/index.html?v=20#/` and check:

- Each track card shows `2 subjects` and `0 of 12 lessons complete` in a fresh profile.
- `#/upper-secondary` shows three cards: Mathematics, English Language, English Literature, each with its first lesson image.
- GCSE English Literature opens `Poetry and Plays` and `The Novel and Essays`, six lessons total.
- `Reading Unseen Poetry` renders four explanation blocks, the scroll image, example, vocabulary, and confidence check; its quiz accepts option 1, option 2, option 1.
- An old Mathematics deep link, `#/primary/maths/m1/l1`, still opens `Counting to 20`.
- At 320 px width, the subject grid shows one card per row with no horizontal overflow (load the page in a 320 px iframe and compare `document.documentElement.scrollWidth` with `clientWidth`).
- Dark and light themes both keep card text readable.
- No console errors.

- [ ] **Step 9: Confirm the cache contents**

In the browser, run:

```js
caches.open('jamb-study-v16').then((c) => c.keys()).then((keys) => keys.filter((r) => /english|3d\/(open_book|bookmark)/.test(r.url)).map((r) => r.url))
```

Expected: entries for all four English data files and at least one English 3D image.

- [ ] **Step 10: Commit**

```bash
git add students/data/tracks.js students/data/upper-secondary/english-literature.js students/index.html tests/learn/content.test.js tools/check-learn-data.js sw.js README.md
git commit -m "feat(learn): add GCSE English Literature and release English pack"
```

---

## Self-review

- **Spec coverage:** framework (§4) in Task 3; per-subject files and loaders (§5) in Tasks 4–7; learning design (§6) reflected in every lesson; image sourcing and offline policy (§7) in Tasks 1 and 7; pack 1 (§8) is Tasks 1–7; success criteria (§10) verified in Task 7. Packs 2–6 are out of scope for this plan.
- **Placeholders:** none. Every lesson, quiz, vocabulary entry, and illustration path is written out.
- **Type consistency:** `renderTrack(main, track)` replaces `renderSubject`; `trackProgress(track)` returns `{ done, total }`; all lesson ids follow `<track>-<subject>-m<n>-l<n>`; all image paths match files created in Task 1.
- **Known deliberate reuse:** `input-latin-letters-3d.png` and `balance-scale-3d.png` already exist and are reused where the concept genuinely matches.

## Execution

Pack 1 is executed inline in this session: Tasks 1–7 in order, with the gate and tests after each content task. No push.

---

