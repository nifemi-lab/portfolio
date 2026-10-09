# Maths Dojo — design spec

Date: 2026-10-09
Status: approved design (mockup reviewed and accepted), ready for implementation plan
Project: jamb-study (vanilla HTML/CSS/JS PWA, no build step)

## 1. What this is

Maths Dojo is a maths learning page added to the existing jamb-study tracker. It
teaches the JAMB mathematics syllabus topic by topic, drills past-question-style
items, and explains every question on request — the way China's biggest learning
apps (Onion Academy / 洋葱学园 model) do it: teach the idea first, show the
working one step at a time, treat mistakes as material, never punish asking.

Two product references were studied:

- **Prep50.ng** — the user's benchmark for JAMB study apps: syllabus-organised
  content, past questions, worked answers.
- **Chinese platforms (Onion Academy, Yuanfudao)** — bite-size concept first,
  guided worked example, instant feedback, gamified weak-point-first drilling.

The approved static mockup is
`C:\Users\ADMIN\Documents\Qoder\2026-10-09\a122c17b\maths-dojo-mockup.html`
(self-contained; its calculator parser, panel behaviour and lesson data shapes
are the reference implementation for this build).

## 2. Decisions already made (locked)

| Question | Decision |
|---|---|
| Where does it live? | A separate page `maths.html` inside jamb-study, linked from the tracker's header/dashboard. Not a new tab inside index.html. |
| Scope of subjects? | Mathematics ships first. The architecture must let other subjects join later as data only (syllabus file + lessons file per subject). |
| Questions? | Features first, bank later. Phase 1 uses the existing `js/q-mathematics.js` bank and `js/sol-mathematics.js` solutions. No new question banks in this phase. |
| XP/streak? | Shared with the tracker — no second currency (see §6). |
| Stuck on a question? | "Please explain" side: teach-first explanation panel (see §5E). |

## 3. Existing context (verified against the repo)

Repo root is `C:\Users\ADMIN\Documents\Default Project` (git root); app lives in
`jamb-study/`. Five tabs in `index.html`: dashboard, timetable, subjects,
practice, learn.

- Question bank: `js/q-mathematics.js` sets
  `window.QUESTION_BANK = [...].concat([{ s, q, o:[4], a:idx, e? }])`.
  Loaded via `js/questions.js` before `js/app.js`.
- Worked solutions: `js/sol-mathematics.js` sets
  `window.SOLUTIONS['Mathematics'] = { '<exact question text>': { t: 'Topic', e: 'working' } }`.
  `topicFor(subject, text)` in `app.js` derives a question's topic from `SOLUTIONS[..].t`.
- Notes: `js/notes-*.js` hold `{ subject, type:'note'|'sheet', topic, title, body }`.
- Storage: per-profile localStorage. `db` object (key from `profileKey(STORE_BASE)`)
  holds `logs: []` and `quiz_results: []` among other tables. Streak
  (`streakDays()`) is computed from **minutes in `db.logs`**, not from quiz rows.
  Quiz rows are `{ id, date, subject, topic, correct, total, mode }`, unshifted
  newest-first and capped at 60 (`slice(0, 60)`); log rows are
  `{ id, date, subject, minutes, sessionId, source }`. Cloud sync to Supabase
  (tables: subjects, sessions, logs, quiz_results, questions) when
  `js/config.js` is filled in.
- Service worker `sw.js` has an explicit `ASSETS` list — every new file must be
  added there or offline mode breaks.
- Design tokens live in `css/app.css` (`:root` dark + `html[data-theme="light"]`).
  Fonts: Space Grotesk (display) + Inter (body). No build step, plain ES6.

## 4. Architecture

New page, existing patterns:

```
jamb-study/maths.html            page shell: header (shared look), 3 screens, panels
jamb-study/css/maths.css         dojo-specific styles; imports tokens from app.css
jamb-study/js/syllabus-mathematics.js   window.SYLLABUS['Mathematics'] = [sections]
jamb-study/js/lessons-mathematics.js    window.LESSONS['Mathematics'] = { qText: {idea, steps[], trap} }
jamb-study/js/maths.js           all dojo logic (map, topic, drill, calculator, explain, mastery)
```

Modified files:

- `jamb-study/index.html` — header chip/link "maths dojo" + a dashboard card
  pointing at `maths.html`.
- `jamb-study/sw.js` — add the five new files to `ASSETS` (and bump cache name).
- `jamb-study/supabase-schema.sql` — optional Phase 1.5 migration only (§6);
  not required to ship Phase 1.

`maths.html` loads `css/app.css` (tokens + shared components) then
`css/maths.css`, then data files (`questions.js`, `q-mathematics.js`,
`sol-mathematics.js`, `syllabus-mathematics.js`, `lessons-mathematics.js`),
then `js/maths.js`. It does **not** load `js/app.js` — the dojo is its own small
app that reads/writes the same localStorage `db` shape through its own thin
storage helper (same key scheme, `jamb_study_..._v1`, per profile via the same
`profileKey` convention).

Subject-extensibility rule: everything subject-specific lives in the two data
files (`syllabus-<subject>.js`, `lessons-<subject>.js`). `maths.js` must key all
lookups by `SUBJECT = 'Mathematics'` so a future subject is a new pair of data
files plus one constant.

## 5. Screens and features

### A. Syllabus map (`maths.html` home)

- Hero: "Pick a topic. Turn it green." + one-line explanation of rings.
- Weakest-topics card: top 3 seen topics with lowest accuracy (min 3 questions
  seen), warn-coloured bars. Hidden when fewer than 3 topics qualify.
- Accordion of the 9 JAMB maths sections / 35 topics
  (data: `js/syllabus-mathematics.js`), each topic row showing:
  mastery ring (34px), name, "N questions drilled" or "Not practised yet", %.
- Ring colour: unseen = grey (empty ring), accuracy < 40% = warn, otherwise
  accent-2. Ring % = accuracy for that topic.

### B. Topic page

- Header: section eyebrow + topic name.
- Stats card: big ring, mastery %, accuracy (correct/seen), questions drilled,
  best streak within this topic; primary button "Practice this topic".
- "Quick note" card: the topic's bite-size concept (from `LESSONS` topic
  template — see §6 data) — the teach-first moment before drilling.
- "Worked example" card: 3–5 numbered steps walking one typical question
  (also from `LESSONS`).

### C. Topic drill

- Progress bar + "Question N of M". Questions come from `QUESTION_BANK` filtered
  to the topic via `topicFor('Mathematics', q)`.
- Four option buttons; on answer: disable all, mark correct/wrong, show worked
  solution immediately (from `item.e || SOLUTIONS[...].e`) in the good/bad
  solution panel — same copy as the tracker's practice tab ("Why that is the
  answer" / "How to work it out").
- Correct answer: +10 XP toast, score++. Wrong: question goes to the mistake
  queue (same `recordMistake` semantics as the tracker: local list in `db`).
- Skip = counts as missed (mistake queue) and advances.
- End state: score summary, "missed ones joined your mistake queue", button back
  to the map.
- Every answered question (either way) updates topic mastery in localStorage (§6).

### D. Calculator side (the "be different" feature)

- Scientific calculator in a sticky panel beside the question on wide screens
  (grid: question `minmax(0,1fr)` + 332px aside); below 900px it collapses to a
  "Calculator" toggle button that opens it as a fixed bottom sheet above the
  nav (z-index 130).
- Keys: digits, `.`, `+ − × ÷`, `^`, `√`, `x²`, `1/x`, `π`, `( )`, `sin cos tan`
  (degrees — JAMB convention), `log` (base 10), `ln`, `C`, `DEL`, `=`.
- **Show working**: a "show working" checkbox (on by default). Each evaluation
  appends steps ("2^3 = 8", "8 × 4 = 32") to a scrollable teaching log above the
  keys, final line "= answer".
- Parser: recursive descent (no `eval`): expr → term → power (right-associative
  `^`) → unary → atom. The mockup's `evaluate()` is the reference and is copied
  nearly verbatim, including `fmt()` (integers without trailing zeros, 6-dp
  rounding otherwise) and Error display.

### E. Explain side ("Please explain" — the China-style learning surface)

- A "Please explain" link sits under the question next to Skip. It opens a panel
  that slides in from the right (desktop: `min(480px, 100vw)` dialog over a dim
  backdrop; mobile: full width). Close via ✕, backdrop click, or Escape; focus
  returns to the question.
- Content, in order:
  1. Question restated.
  2. **The idea** — the concept in plain words, 2–4 sentences, before any working.
  3. **Work it together** — numbered steps revealed **one at a time** under a
     "Show next step" button (Onion Academy pacing; each reveal scrolls into view).
  4. **Trap check** — names the most tempting wrong option and exactly why it
     catches people.
  5. Actions: "Back to the question" (primary) + footer line "Asking costs
     nothing — this is how you learn." Reading an explanation never costs XP.
- Available before answering (teach-first) and after answering.
- If no lesson exists for the current question, the "Please explain" link is
  hidden (Phase 1 ships lessons for the highest-yield topics only — see §7).

## 6. Data model and storage

### New data files

`js/syllabus-mathematics.js`:

```js
window.SYLLABUS = window.SYLLABUS || {};
window.SYLLABUS['Mathematics'] = [
  { name: 'Number & Numeration', topics: ['Number bases', 'Fractions & decimals', ...] },
  ...9 sections, 35 topics total (JAMB syllabus)...
];
```

`js/lessons-mathematics.js` — two kinds of entry, keyed differently:

```js
window.LESSONS = window.LESSONS || {};
window.LESSONS['Mathematics'] = {
  /* teach-first explanation for one specific question (Explain side) */
  '<exact question text>': { idea: '...', steps: ['...', '...'], trap: '...' },
  ...
};
window.LESSON_NOTES = window.LESSON_NOTES || {};
window.LESSON_NOTES['Mathematics'] = {
  /* topic-page teaching content, keyed by syllabus topic name (must match SYLLABUS) */
  'Number bases': { note: '...', example: { title: '...', steps: ['...'] } },
  ...
};
```

### Mastery storage (local-first)

New localStorage key per profile, same convention as the tracker:

```
jamb_study_maths_mastery_v1::<profileId>   →   { '<topic>': { seen, correct, bestStreak, updatedAt } }
```

- Updated on every drill answer: `seen++`, `correct++` when right, streak tracked
  per topic.
- Ring % = `round(correct / seen * 100)`; unseen topics absent from the map.
- Weakest topics: entries with `seen >= 3`, sorted by accuracy ascending, top 3.
- Sharing with the tracker: at the end of a drill session the dojo writes two
  kinds of rows into the same `db`, in the tracker's exact shapes, so every
  existing tracker screen (streak, accuracy chip, weak subjects, history,
  export) reflects dojo work with zero changes to `app.js`:
  - one `quiz_results` row per topic practised this session:
    `{ id, date: <ISO today>, subject: 'Mathematics', topic, correct, total, mode: 'practice' }`,
    unshifted newest-first, same 60-row cap as the tracker;
  - one `logs` row for the session:
    `{ id, date: <ISO today>, subject: 'Mathematics', minutes: <session minutes>, sessionId: null, source: 'dojo' }`
    — this is what feeds `streakDays()`, since the streak counts logged minutes.
- Sync: **Phase 1 is local-only** (offline-first, works with no config); these
  rows ride inside the tracker's existing Supabase sync tables unchanged. An
  optional Phase 1.5 can add a `maths_mastery` Supabase table
  (`supabase-schema.sql`) mirroring the local mastery key; noted here so Phase 1
  does not paint us into a corner.

### XP, levels, streak — reuse, don't duplicate

- Streak: dojo sessions write `db.logs` minutes (see "Sharing with the tracker"
  above), which is exactly what `streakDays()` counts — one streak across both
  pages, no dojo-side streak logic.
- XP: no new currency. The dojo header shows `✦ {total correct across the
  mastery map} XP` and `Level = 1 + floor(XP / 100)`. The mastery map is the XP
  source (not `quiz_results`, whose 60-row cap would let XP shrink when old
  rows age out). The +10 toast on a correct answer is presentation only.

## 7. Phase 1 content scope

- Syllabus: all 9 sections / 35 topics in `syllabus-mathematics.js` (names only —
  small file).
- Lessons: write `LESSONS` + `LESSON_NOTES` entries for the 10 highest-yield
  topics first (Number bases, Fractions & decimals, Indices, Logarithms, Sets,
  Quadratic equations, Simultaneous equations, Probability, Trigonometric ratios,
  Differentiation). Every other topic still drills fine; it just shows no
  "Please explain" link and a "Lesson coming soon" note in place of the
  topic-page teaching cards.
- Phases after this spec (not part of the Phase 1 plan): Phase 2 = remaining 25
  topics' lessons + any new questions; Phase 3 = other subjects as data files.

## 8. Error handling and edge cases

- Calculator: malformed input shows "Error" in danger colour, never throws;
  division by zero / invalid sqrt → Error via the same path.
- Explain panel: opening it mid-quiz and closing it must restore the exact
  question state (answered or not).
- Empty bank for a topic: "No questions tagged for this topic yet" card with a
  back link (possible for untagged syllabus topics at launch).
- localStorage unavailable (private mode): drill still works in-memory; mastery
  silently doesn't persist (same posture as the tracker's storage code).
- All panels: Escape closes; focus moves into the panel on open and back to the
  triggering control on close; `prefers-reduced-motion` respected (transitions
  collapse to ~0ms, as in the mockup).

## 9. Testing plan (manual — no test framework in this repo)

1. Serve `jamb-study/` statically, open `maths.html`: map renders 9 sections,
   accordion toggles, rings grey/warn/green per accuracy.
2. Drill 3 questions in "Number bases": correct → +10 toast + solution;
   wrong → solution shows working; skip → mistake queue. Score end-state and
   "Back to the map" work. Reload page → mastery rings reflect the answers.
3. Calculator: `2^3×4=` → 32 with steps `2^3 = 8`, `8 × 4 = 32`; `√144=` → 12;
   `sin(30)=` → 0.5; `log(100)=` → 2; `1/0=` → Error. "Show working" off hides the log.
4. At ≤900px width: calculator becomes toggle + bottom sheet; explain panel is
   full width; both close correctly.
5. Explain: open, steps reveal one at a time, trap check shows, Escape/backdrop/
   ✕ close, focus returns to "Please explain".
6. Theme toggle on maths.html matches tracker themes; header chip in index.html
   navigates to maths.html and back.
7. Offline: with sw registered and config absent, maths.html and all panels work
   after reload with network off (new files present in `ASSETS`).
8. Data check: a dojo session adds one `quiz_results` row per topic and one
   `logs` row (source `dojo`) to the tracker's data export, and the tracker's
   dashboard streak and accuracy reflect dojo work.

## 10. Explicit non-goals for Phase 1

- No new question banks, no PDF import, no new Supabase tables/migrations.
- No changes to the five existing tabs beyond the header chip + dashboard card link.
- No framework, no bundler, no npm dependencies.
- No full-screen gradient hover fills or new animation systems beyond the
  mockup's existing transitions.
