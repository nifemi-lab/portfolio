# Maths Dojo Phase 1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `jamb-study/maths.html` — the Maths Dojo learning page (syllabus map, topic pages, topic drill, scientific calculator with show-working, "Please explain" teach-first panel) wired into the existing tracker's storage, XP, streak and question bank.

**Architecture:** New standalone page inside `jamb-study` that shares `css/app.css` tokens/components and the same per-profile localStorage `db` shape. It does not load `js/app.js`; `js/maths.js` is its own small app with a thin storage helper that read-modify-writes the same `jamb_study_db_v1::<profileId>` key. Subject-specific data lives in two new data files (syllabus + lessons) so future subjects are data-only work.

**Tech Stack:** Vanilla HTML/CSS/ES6, no build step, no npm, no framework. PWA service worker with explicit ASSETS list.

**Spec:** `docs/superpowers/specs/2026-10-09-maths-dojo-design.md` (approved; this plan amends three fact-level details, see Task 0)

**Reference mockup (approved, travels with repo after Task 0):** `docs/superpowers/mockups/maths-dojo-mockup.html` — the calculator parser, explain-panel behaviour, lesson data shapes and all dojo CSS are copied from it.

## Global Constraints

- No framework, no bundler, no npm dependencies. Plain ES6 like the rest of the repo.
- All subject-specific content lives in `js/syllabus-mathematics.js` and `js/lessons-mathematics.js`; `js/maths.js` keys everything off `SUBJECT = 'Mathematics'` so a second subject is a new pair of data files.
- Storage: same key scheme as `app.js` — `jamb_study_db_v1::<profileId>`, profile id from `jamb_study_profiles_v1` (`{active, list}`, fallback `'me'`). Mastery: new key `jamb_study_maths_mastery_v1::<profileId>`.
- Row shapes written into `db` must match `app.js` exactly: `quiz_results` rows `{ id, date, subject, topic, correct, total, mode }` unshifted + capped `slice(0,60)`; `logs` rows `{ id, date, subject, minutes, sessionId, source }`; `missed` rows `{ s, q, o, a, hits, last }` with dedupe-by-`q`, `hits++`, capped `slice(0,60)`.
- uid: `prefix + '_' + Math.random().toString(36).slice(2,9)`. isoDate: local `YYYY-MM-DD`.
- XP shown in the dojo header = `10 × (total correct across the mastery map)`; Level = `1 + floor(XP/100)`; the +10 toast is presentation only. Streak chip = `app.js`'s `streakDays()` logic re-implemented: count back consecutive days with `minutesOn(date) > 0` from `db.logs` (skip today if 0).
- Every new file must be added to `sw.js` `ASSETS` (Task 7) or offline breaks.
- Dojo shares the tracker's theme: read `db.settings.theme`, set `document.documentElement.dataset.theme`, toggle writes back to the same key.
- No full accent-gradient hover fills (user preference); gradients only as the small existing accents.
- `prefers-reduced-motion` respected (mockup already includes the media query).

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `docs/superpowers/mockups/maths-dojo-mockup.html` | create (copy) | Approved visual/behavioural reference, in-repo |
| `jamb-study/js/syllabus-mathematics.js` | create | `window.SYLLABUS['Mathematics']` (9 sections / 34 topics) + `window.Q_TOPIC['Mathematics']` (exact question text → topic) |
| `jamb-study/js/lessons-mathematics.js` | create | `window.LESSON_NOTES['Mathematics']` (10 topic teaching cards) + `window.LESSONS['Mathematics']` (~35 per-question explanations) |
| `jamb-study/tools/check-dojo-data.js` | create | Node sanity check for the two data files (exact-text keys are fragile) |
| `jamb-study/css/maths.css` | create | Dojo-only styles (map, rings, drill, calculator, explain panel, toast); reuses app.css components |
| `jamb-study/maths.html` | create | Page shell: header, 3 screens, calc panel, explain panel, toast |
| `jamb-study/js/maths.js` | create | Boot (profile/db/theme/header), map, topic page, drill, calculator, explain, mastery writes |
| `jamb-study/index.html` | modify | Header link + dashboard card → `maths.html` |
| `jamb-study/sw.js` | modify | 5 new files in `ASSETS`, cache bump `v10 → v11` |
| `docs/superpowers/specs/2026-10-09-maths-dojo-design.md` | modify | 3 fact-level corrections (Task 0), approved behaviour unchanged |

**Topic count note:** the approved mockup shows 9 sections / 32 topic rows. Two topics are added (`Percentages & money`, `Ratio, rates & proportion`) because the question bank contains ~25 questions that only make sense under them — 34 topics total. 8 topics have no bank questions yet and show the spec-mandated "No questions tagged for this topic yet" card (spec §8).

**Question→topic filtering note:** the spec's "via `topicFor()`" line is corrected: `Q_TOPIC` (authored in Task 1) filters the bank by syllabus-topic granularity; the solution file's coarser `t:` labels ('Algebra', 'Number operations', …) cannot express the map's topics. Drill = questions where `Q_TOPIC[q] === topic`. Unmapped questions simply never appear (future bank growth = add map lines; the checker in Task 1 enforces full coverage at 198/198 today (198 = 180 in `q-mathematics.js` + 18 Mathematics entries in `questions.js`, discovered during Task 1 execution)).

---

### Task 0: In-repo references + spec fact-corrections

**Files:**
- Create: `docs/superpowers/mockups/maths-dojo-mockup.html` (copy of `C:\Users\ADMIN\Documents\Qoder\2026-10-09\a122c17b\maths-dojo-mockup.html`)
- Modify: `docs/superpowers/specs/2026-10-09-maths-dojo-design.md`

**Interfaces:**
- Produces: the mockup file every later task copies from (exact line references below assume this copy), and a spec whose numbers match reality.

- [ ] **Step 1: Copy the mockup into the repo**

```bash
mkdir -p "docs/superpowers/mockups"
cp "C:/Users/ADMIN/Documents/Qoder/2026-10-09/a122c17b/maths-dojo-mockup.html" "docs/superpowers/mockups/maths-dojo-mockup.html"
```

- [ ] **Step 2: Fix the three spec facts**

Edit `docs/superpowers/specs/2026-10-09-maths-dojo-design.md`:

1. §5A "Accordion of the 9 JAMB maths sections / 35 topics" → "Accordion of the 9 JAMB maths sections / 34 topics (the approved mockup's 32 plus `Percentages & money` and `Ratio, rates & proportion`, added to cover bank questions that had no home; data: `js/syllabus-mathematics.js`)".
2. §5C first bullet: replace "filtered to the topic via `topicFor('Mathematics', q)`" with "filtered to the topic via the dojo's own `Q_TOPIC` map (exact question text → syllabus topic, in `js/syllabus-mathematics.js`; `topicFor`'s coarser labels cannot express the 34 map topics)".
3. §6 XP bullet: "shows `✦ {total correct across the mastery map} XP`" → "shows `✦ {10 × total correct across the mastery map} XP` … the +10 toast matches, Level = `1 + floor(XP/100)`". Also §7 lesson list: drop `Differentiation` (zero bank questions; lessons are keyed by question text) and add `Permutations & combinations` — final ten: Number bases, Fractions & decimals, Indices, Logarithms, Sets, Quadratic equations, Simultaneous equations, Probability, Trigonometric ratios, Permutations & combinations.

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/mockups/maths-dojo-mockup.html docs/superpowers/specs/2026-10-09-maths-dojo-design.md
git commit -m "Add approved Maths Dojo mockup to repo; correct spec topic counts, topic filter and XP detail"
```

---

### Task 1: Syllabus + question-topic map (`js/syllabus-mathematics.js`)

**Files:**
- Create: `jamb-study/js/syllabus-mathematics.js`
- Create: `jamb-study/tools/check-dojo-data.js`

**Interfaces:**
- Consumes: bank (`js/questions.js`, `js/q-mathematics.js`).
- Produces: `window.SYLLABUS['Mathematics']` = `[{ name, topics: ['Number bases', ...] }, ...]` (9 sections, 34 topics, plain strings); `window.Q_TOPIC['Mathematics']` = `{ '<exact question text>': '<syllabus topic>', ... }` (all 198 bank questions). Later tasks do `SYLLABUS['Mathematics']`, `Q_TOPIC['Mathematics'][q]`, and topic drills filter `bank.filter(q => Q_TOPIC[q.q] === topic)`.

- [ ] **Step 1: Write the data file**

Structure (topics exactly these names; 9 sections):

```js
window.SYLLABUS = window.SYLLABUS || {};
window.SYLLABUS['Mathematics'] = [
  { name: 'Number & Numeration', topics: [
    'Number bases', 'Fractions & decimals', 'Percentages & money',
    'Ratio, rates & proportion', 'Indices', 'Logarithms', 'Surds', 'Sets'] },
  { name: 'Algebraic Processes', topics: [
    'Polynomials', 'Quadratic equations', 'Simultaneous equations', 'Variation',
    'Inequalities', 'Matrices & determinants', 'Progressions (AP & GP)'] },
  { name: 'Mensuration', topics: ['Perimeters & areas', 'Volumes & surface areas'] },
  { name: 'Plane Geometry', topics: ['Angles & polygons', 'Circles', 'Constructions & locus'] },
  { name: 'Coordinate Geometry', topics: ['Straight lines', 'Curves & equations'] },
  { name: 'Trigonometry', topics: ['Ratios & identities', 'Bearings & elevations', 'Trigonometric graphs'] },
  { name: 'Introductory Calculus', topics: ['Differentiation', 'Integration', 'Applications of calculus'] },
  { name: 'Statistics & Probability', topics: [
    'Data presentation', 'Central tendency & spread', 'Probability', 'Permutations & combinations'] },
  { name: 'Vectors & Transformation', topics: ['Vectors', 'Transformations'] }
];

window.Q_TOPIC = window.Q_TOPIC || {};
window.Q_TOPIC['Mathematics'] = {
  /* one entry per bank question, exact question text as key */
};
```

Author all 198 `Q_TOPIC` entries: walk `js/q-mathematics.js` (180 questions, file order) then the 18 Mathematics entries in `js/questions.js` (lines 28-45) and assigning exactly one topic per question with these rules (copy the question text character-for-character, including `N` currency and `^` notation):

- solution `t:` = 'Financial arithmetic' → `Percentages & money`
- 'Number operations' → sqrt/rationalise → `Surds`; fractions/decimals/HCF/LCM/standard form → `Fractions & decimals`; ratio/scale/workers/speed → `Ratio, rates & proportion`
- 'Sets and Venn diagrams' → `Sets`
- 'Number bases' → `Number bases`
- 'Indices and logarithms' → mentions `log` → `Logarithms`; otherwise `Indices`
- 'Algebra' → quadratic roots/factorising quadratics/perfect squares/`x^2 = 49`/roots-from-sum-product → `Quadratic equations`; two-equation systems + sum&difference pairs → `Simultaneous equations`; `varies` → `Variation`; `|...|` → `Inequalities`; everything else (simplify, expand, linear equations, change of subject) → `Polynomials`
- 'Geometry' → bearing reversal → `Bearings & elevations`; angle-subtended-by-arc + tangent-radius circle theorems → `Circles`; the rest → `Angles & polygons`
- 'Mensuration' → volume/surface-area questions (cube, cuboid, cone, sphere volume, sphere surface area, cylinder curved surface) → `Volumes & surface areas`; everything else (areas, perimeters, arc, sector, wheel revolutions, trapezium) → `Perimeters & areas`
- 'Trigonometry' → elevation/tower → `Bearings & elevations`; Pythagorean-side questions (hypotenuse, ladder, rectangle diagonal, sin→cos, sin→tan, adjacent+hypotenuse cosine) and ratio/identity value questions → `Ratios & identities`
- 'Statistics' → `Central tendency & spread`
- 'Probability' → `Probability`
- 'Permutations and combinations' → `Permutations & combinations`
- 'Sequences and series' → `Progressions (AP & GP)`
- 'Vectors and matrices' → vector questions → `Vectors`; matrix questions (determinant, scalar multiple) → `Matrices & determinants`
- 'Coordinate geometry' → `Straight lines`

Expected populated topics: 26; empty (no questions yet): Constructions & locus, Curves & equations, Trigonometric graphs, Differentiation, Integration, Applications of calculus, Data presentation, Transformations.

- [ ] **Step 2: Write the checker**

`jamb-study/tools/check-dojo-data.js` (run with `node tools/check-dojo-data.js` from `jamb-study/`; every future lesson/bank edit reruns it):

```js
/* Sanity-checks the dojo data files against the question bank.
   Run from jamb-study/:  node tools/check-dojo-data.js  */
global.window = global;
require('../js/questions.js');
require('../js/q-mathematics.js');
require('../js/syllabus-mathematics.js');
try { require('../js/lessons-mathematics.js'); } catch (e) { /* task 2 not written yet */ }

const bank = window.QUESTION_BANK.filter(q => q.s === 'Mathematics');
const syl = window.SYLLABUS['Mathematics'];
const map = (window.Q_TOPIC || {})['Mathematics'] || {};
const lessons = (window.LESSONS || {})['Mathematics'] || {};
const notes = (window.LESSON_NOTES || {})['Mathematics'] || {};

let fail = 0;
const err = m => { console.error('FAIL: ' + m); fail++; };

const topics = syl.flatMap(s => s.topics);
if (new Set(topics).size !== topics.length) err('duplicate topic names');

const bankSet = new Set(bank.map(q => q.q));
Object.keys(map).forEach(q => {
  if (!bankSet.has(q)) err('Q_TOPIC key not in bank: ' + q);
  if (!topics.includes(map[q])) err('Q_TOPIC value not a topic: ' + map[q]);
});
bank.forEach(q => { if (!map[q.q]) err('bank question not assigned: ' + q.q); });

Object.keys(lessons).forEach(q => {
  const L = lessons[q];
  if (!bankSet.has(q)) err('LESSONS key not in bank: ' + q);
  if (!L.idea || !Array.isArray(L.steps) || !L.steps.length ||
      !Array.isArray(L.board) || !L.board.length || !L.trap)
    err('LESSONS entry missing idea/steps/board/trap: ' + q);
  if (!map[q]) err('LESSONS question has no Q_TOPIC: ' + q);
});
Object.keys(notes).forEach(t => {
  if (!topics.includes(t)) err('LESSON_NOTES key not a syllabus topic: ' + t);
});

const counts = {};
bank.forEach(q => { counts[map[q.q]] = (counts[map[q.q]] || 0) + 1; });
console.log('bank: ' + bank.length + ' questions, assigned: ' +
  bank.filter(q => map[q.q]).length);
console.log('sections: ' + syl.length + ', topics: ' + topics.length +
  ', populated: ' + Object.keys(counts).length);
console.log('lessons: ' + Object.keys(lessons).length +
  ', lesson notes: ' + Object.keys(notes).length);
if (fail) { console.error(fail + ' problem(s)'); process.exit(1); }
console.log('OK');
```

- [ ] **Step 3: Run the checker — expect OK, 198/198 assigned**

Run from `jamb-study/`: `node tools/check-dojo-data.js`
Expected: `bank: 198 questions, assigned: 198`, `sections: 9, topics: 34, populated: 26`, `OK`.

- [ ] **Step 4: Commit**

```bash
git add jamb-study/js/syllabus-mathematics.js jamb-study/tools/check-dojo-data.js
git commit -m "Maths Dojo data: full JAMB syllabus map and question-to-topic map (198 questions)"
```

---

### Task 2: Lessons (`js/lessons-mathematics.js`)

**Files:**
- Create: `jamb-study/js/lessons-mathematics.js`

**Interfaces:**
- Consumes: `Q_TOPIC` (Task 1) to pick the right questions per topic; exact bank question text.
- Produces: `window.LESSON_NOTES['Mathematics'] = { '<topic>': { note: '<html-ish string>', example: { title, steps: [...] } } }` for the ten topics below; `window.LESSONS['Mathematics'] = { '<exact question text>': { idea, steps: [...], board: [...], trap } }`. Later tasks: topic page renders note+example when `LESSON_NOTES[topic]` exists (else "Lesson coming soon"); drill shows the "Please explain" link only when `LESSONS[q]` exists.

- [ ] **Step 1: Write LESSON_NOTES for the ten topics**

Topics: Number bases, Fractions & decimals, Indices, Logarithms, Sets, Quadratic equations, Simultaneous equations, Probability, Ratios & identities, Permutations & combinations.

Format (copy the approved mockup's Number-bases note, mockup lines 405–422, as the model):

```js
window.LESSON_NOTES = window.LESSON_NOTES || {};
window.LESSON_NOTES['Mathematics'] = {
  'Number bases': {
    note: '<p>A base is how many digits ...</p><p>To convert to base 10 ...</p>',   // 2 short paragraphs, may use <code> and <sup>
    example: { title: 'Convert 1011 base 2 to base 10', steps: ['Write the place values...', 'Multiply each digit...', 'Add: 8 + 0 + 2 + 1 = <b>11</b>.'] }
  },
  /* ...one entry per topic above... */
};
```

Quality bar per note: plain words first (what the idea really is), then one worked element; 2–4 sentences per paragraph; formulas as plain text powers (`2<sup>3</sup>`, `x<sup>2</sup>`); naira as `N`; no marketing tone.

- [ ] **Step 2: Write LESSONS for ~35 questions (3–5 per topic)**

Pick each topic's foundation questions from the bank (first encounters: the converting/reading questions before the twist questions) — roughly 35 entries. Format exactly the mockup's shape (mockup lines 583–630 are the gold example, and the three mockup lessons are ported into this phase by matching their questions):

```js
'Convert 1011 base 2 to base 10.': {
  idea: 'In base 2, every column is worth double the one before it...',
  steps: ['Write the columns...', 'Multiply each digit...', 'Add the results...'],
  board: ['1011₂ = 1×2³ + 0×2² + 1×2¹ + 1×2⁰', '      = 8 + 0 + 2 + 1', '      = 11'],
  trap: 'Option C is waiting if you count the columns from the left...'
},
```

Rules: keys copied character-for-character from the bank; `steps` 3–5, each one action, may contain inline `<code>`/`<b>`; `board` 2–4 monospace lines with the real arithmetic, last line the answer (rendered with the `ans` class); `trap` names the actual tempting wrong option from the bank by its letter where the wrong option is obvious, and explains the exact mistake; `board` uses `₂`/`²`/`×`/`→` typography like the mockup. Questions WITHOUT a lesson are fine — the explain link just stays hidden (spec §5E).

- [ ] **Step 3: Run the checker — expect OK and lesson counts**

Run from `jamb-study/`: `node tools/check-dojo-data.js`
Expected: `lessons: 35` (or however many authored, ≥ 30), `lesson notes: 10`, `OK`.

- [ ] **Step 4: Commit**

```bash
git add jamb-study/js/lessons-mathematics.js
git commit -m "Maths Dojo content: teaching notes for 10 topics and per-question explanations"
```

---

### Task 3: Page shell + map + topic pages (`maths.html`, `css/maths.css`, `js/maths.js` part 1)

**Files:**
- Create: `jamb-study/maths.html`
- Create: `jamb-study/css/maths.css`
- Create: `jamb-study/js/maths.js`

**Interfaces:**
- Consumes: app.css tokens/components; `SYLLABUS`, `Q_TOPIC`, `LESSON_NOTES`; db + profile (global constraint).
- Produces: `window.DOJO = { state, showScreen, openTopic, ... }` used by later tasks; DOM ids that Tasks 4–6 attach to.

- [ ] **Step 1: `css/maths.css` — port the dojo styles from the mockup**

Copy from `docs/superpowers/mockups/maths-dojo-mockup.html` `<style>` these blocks (mockup line numbers): page-head (126–133, minus `.grad` which app.css already has), weak rows (135–141), sections accordion (143–153), topic rows + rings (155–173), topic page extras (188–206: `.topic-hero`, `.stat-line`, `.steps`, check `.note-body` — app.css already styles it, keep only if needed), quiz block (208–243: `.q-progress` → rename `.q-progress` OK; `.opt*`, `.solution`, `.skip-row`, `.toast`), quiz layout (245–253), calculator (255–281), explain (283–325), reduced-motion block (342–344).

Adaptations:
- Class collisions with app.css: dojo markup uses `class="btn btn-primary"` / `"btn btn-ghost"` (app.css names) — delete the mockup `.btn` copies (175–186) and use app.css. Inline text links: use app.css `.linklike` instead of mockup `.link-btn`.
- Keep dojo-only class names (`ring`, `topic`, `section`, `opt`, `toast`, `calc-*`, `explain-*`, `workboard`, `trap`, `weak-row`) — none exist in app.css; state that check in the commit message.
- Header: reuse app.css `app-header/header-inner/logo/chip/theme-btn`; add only `.chip-xp b { color: var(--accent-2); }`.
- Buttons use app.css `btn-primary` (tracker's gradient) so the dojo feels native.

- [ ] **Step 2: `maths.html` — page shell**

Skeleton (head mirrors `index.html` lines 3–21 with `css/app.css` + `css/maths.css`, title `Maths Dojo — jamb_study`, theme-color meta):

```html
<body>
  <header class="app-header">
    <div class="container header-inner">
      <a class="logo" href="index.html#dashboard"><span class="logo-text">jamb_study</span> <span class="sub">/ maths dojo</span></a>
      <div class="header-right">
        <span class="chip" id="streakChip" title="Days in a row with any study logged">🔥 <b id="streakVal">0</b> day streak</span>
        <span class="chip chip-xp" title="XP from correct answers in the dojo">✦ <b id="xpVal">0</b> XP · Level <span id="lvlVal">1</span></span>
        <button class="theme-btn" id="themeToggle" type="button" aria-label="Switch theme">☀</button>
      </div>
    </div>
  </header>
  <main class="container">
    <section id="screen-map"> <!-- page-head + weakest card + #sections --> </section>
    <section id="screen-topic" hidden> <!-- filled by JS: eyebrow, stats card, note card, example card, or empty-bank card --> </section>
    <section id="screen-quiz" hidden> <!-- Task 4 fills the drill; structure copied from the mockup: q-progress, calc-toggle, quiz-layout(card + aside.calc-panel), toast, explain panel --> </section>
  </main>
  <p class="faint" style="text-align:center;padding:1.2rem 0 2rem">Maths Dojo · part of jamb_study · progress saves to your device</p>
  <script src="js/questions.js"></script>
  <script src="js/q-mathematics.js"></script>
  <script src="js/sol-mathematics.js"></script>
  <script src="js/syllabus-mathematics.js"></script>
  <script src="js/lessons-mathematics.js"></script>
  <script src="js/maths.js"></script>
</body>
```

Copy the drill/calc/explain markup verbatim from the mockup body (mockup lines 432–514) with renames: `btn primary`→`btn btn-primary`, `btn ghost`→`btn btn-ghost`, `link-btn`→`linklike`. Remove the mockup's demo-nav, ribbon, `.demo-note`, and the `onclick=` attributes (wire listeners in maths.js instead — keep `onclick` only on static in-page controls exactly as the mockup does where convenient; prevent inline handlers referencing not-yet-defined functions from throwing by loading maths.js at body end).

- [ ] **Step 3: `js/maths.js` part 1 — boot, map, topic pages**

Full code for the boot block (this is the exact pattern; write it as-is, then the rendering functions per description):

```js
/* Maths Dojo — standalone page logic. Shares the tracker's localStorage
   shape (jamb_study_db_v1::<profile>) and design tokens; loads no app.js. */
(function () {
  'use strict';
  const SUBJECT = 'Mathematics';
  const STORE_BASE = 'jamb_study_db_v1';
  const PROFILES_KEY = 'jamb_study_profiles_v1';
  const MASTERY_BASE = 'jamb_study_maths_mastery_v1';

  function activeProfile() {
    try {
      const p = JSON.parse(localStorage.getItem(PROFILES_KEY) || 'null');
      if (p && Array.isArray(p.list) && p.list.length) {
        return p.list.some(x => x.id === p.active) ? p.active : p.list[0].id;
      }
    } catch (e) { /* storage blocked */ }
    return 'me';
  }
  const PID = activeProfile();
  const DB_KEY = STORE_BASE + '::' + PID;
  const MASTERY_KEY = MASTERY_BASE + '::' + PID;

  let memoryDB = null;               // used when localStorage is blocked
  function readJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || 'null') || fallback; }
    catch (e) { return fallback; }
  }
  function writeJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch (e) { return false; }
  }
  function db() {
    if (memoryDB) return memoryDB;
    const d = readJSON(DB_KEY, null);
    if (!d) { memoryDB = { logs: [], quiz_results: [], missed: [], questions: [], settings: {} }; return memoryDB; }
    /* normalise only what the dojo touches; never clobber other tables */
    if (!Array.isArray(d.logs)) d.logs = [];
    if (!Array.isArray(d.quiz_results)) d.quiz_results = [];
    if (!Array.isArray(d.missed)) d.missed = [];
    if (!d.settings || typeof d.settings !== 'object') d.settings = {};
    return d;
  }
  function saveDB(d) { if (!writeJSON(DB_KEY, d)) memoryDB = d; }
  function mastery() { return readJSON(MASTERY_KEY, {}); }
  function saveMastery(m) { writeJSON(MASTERY_KEY, m); }

  const uid = p => p + '_' + Math.random().toString(36).slice(2, 9);
  function isoDate(d) {
    const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  const SYL = (window.SYLLABUS || {})[SUBJECT] || [];
  const Q_TOPIC = ((window.Q_TOPIC || {})[SUBJECT]) || {};
  const BANK = (window.QUESTION_BANK || []).filter(q => q.s === SUBJECT);
  const SOLS = (window.SOLUTIONS || {})[SUBJECT] || {};
  const LESSONS = (window.LESSONS || {})[SUBJECT] || {};
  const NOTES = (window.LESSON_NOTES || {})[SUBJECT] || {};
  function questionsFor(topic) { return BANK.filter(q => Q_TOPIC[q.q] === topic); }

  const $ = sel => document.querySelector(sel);
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  /* XP = 10 × corrects across the mastery map; streak = tracker's streakDays() over db.logs minutes */
  function xpTotal() { const m = mastery(); return Object.keys(m).reduce((s, t) => s + (m[t].correct || 0), 0) * 10; }
  function minutesOn(iso) { return db().logs.filter(l => l.date === iso).reduce((s, l) => s + (l.minutes || 0), 0); }
  function streakDays() {
    let streak = 0; const d = new Date();
    if (minutesOn(isoDate(d)) === 0) d.setDate(d.getDate() - 1);
    while (minutesOn(isoDate(d)) > 0) { streak++; d.setDate(d.getDate() - 1); }
    return streak;
  }

  function applyTheme() { /* read db().settings.theme, set documentElement.dataset.theme + toggle glyph, exactly like app.js applyTheme() */ }
  function paintHeader() { $('#streakVal').textContent = streakDays(); const xp = xpTotal(); $('#xpVal').textContent = xp; $('#lvlVal').textContent = 1 + Math.floor(xp / 100); }
  /* ... screen switching (showScreen), map render (renderMap), weakest topics card,
         openTopic(topic) → stats card + LESSON_NOTES cards or 'Lesson coming soon' +
         'No questions tagged…' state, all per spec §5A/§5B ... */
  window.DOJO = { state: {}, showScreen, openTopic, questionsFor, ... };
})();
```

Rendering rules (spec §5A/§5B):
- Map: one `.section` per syllabus section, first open; header count "N/M started" where started = topics with `seen > 0`; topic row = 34px ring (`--p` = accuracy %, `warn` class when < 40), name, "N questions drilled"/"Not practised yet", "%". Ring never shown for `seen === 0` (grey empty).
- Weakest topics card: entries from mastery with `seen >= 3`, accuracy ascending, top 3, warn bars; hidden entirely when fewer than 3 qualify. Caption: "From your last 5 quizzes — drill these first." → change to "Your lowest accuracy so far — drill these first." (the dojo has no 'last 5 quizzes' concept; spec §5A says "top 3 seen topics with lowest accuracy").
- Topic page: eyebrow = section name, h1 = topic; stats card (big ring, mastery %, accuracy `correct/seen`, drilled count, best streak); "Quick note" + "Worked example" cards from `LESSON_NOTES[topic]`; when topic has 0 questions → card "No questions tagged for this topic yet" + "Lesson coming soon" text in place of both teaching cards (spec §5B/§8), and the practice button disabled.
- Back navigation: a "← All topics" link-btn at top of topic screen; screens via `hidden` toggling.

- [ ] **Step 4: Manual verification (serve + browser)**

Serve `jamb-study` statically (e.g. `python -m http.server 8080` from `jamb-study/`, or any static server) and open `maths.html`:
- 9 sections render, first open, accordion toggles; grey rings everywhere (no mastery yet); "Not practised yet" labels; weakest card absent (fewer than 3 entries).
- Open "Number bases" → stats card + Quick note + Worked example render; "Practice this topic" present.
- Open an empty topic (e.g. "Differentiation") → "No questions tagged for this topic yet" + "Lesson coming soon"; button disabled.
- Theme toggle flips and matches `index.html`'s theme on the same device (same `db.settings.theme`).
- Browser console: no errors; `node tools/check-dojo-data.js` still OK.

- [ ] **Step 5: Commit**

```bash
git add jamb-study/maths.html jamb-study/css/maths.css jamb-study/js/maths.js
git commit -m "Maths Dojo: page shell, syllabus map and topic pages"
```

---

### Task 4: Drill + mastery + tracker writes (`js/maths.js` part 2)

**Files:**
- Modify: `jamb-study/js/maths.js`

**Interfaces:**
- Consumes: `questionsFor(topic)`, `mastery()/saveMastery()`, `db()/saveDB()`, DOM from Task 3.
- Produces: `startQuiz(topic)` (called by "Practice this topic"), `answer(i)`, `nextQuestion()`, end-state writer. Writes the exact row shapes from Global Constraints.

- [ ] **Step 1: Implement the drill**

Port the mockup's quiz block (mockup lines 578–703 as behaviour reference) with these exact changes:
- Question list = `questionsFor(topic)`; if empty, never started (button disabled in Task 3).
- On answer: disable all options; mark correct/wrong; show solution `item.e || (SOLS[item.q] || {}).e` with the tracker's copy — "✓ Why that is the answer" / "✗ How to work it out".
- Correct: show "+10 XP" toast, `score++`, and mastery `seen++/correct++/bestStreak` update + `saveMastery`. Wrong or skip: mastery `seen++`, no `correct++`; record mistake with tracker's exact semantics:

```js
function recordMistake(item) {
  const d = db(); const i = d.missed.findIndex(m => m.q === item.q);
  if (i !== -1) { d.missed[i].hits += 1; d.missed[i].last = isoDate(new Date()); }
  else d.missed.push({ s: item.s, q: item.q, o: item.o, a: item.a, hits: 1, last: isoDate(new Date()) });
  d.missed = d.missed.slice(0, 60);
  saveDB(d); paintHeader();
}
```

- Session bookkeeping: `session = { start: Date.now(), perTopic: {} }`; each answered question bumps `perTopic[state.topic]`. On end state (after last question OR "Back to the map" pressed), write:

```js
function finishSession() {
  const d = db(); const mins = Math.max(1, Math.round((Date.now() - session.start) / 60000));
  Object.keys(session.perTopic).forEach(topic => {
    const c = session.perTopic[topic];
    d.quiz_results.unshift({ id: uid('qr'), date: isoDate(new Date()), subject: SUBJECT, topic, correct: c.correct, total: c.total, mode: 'practice' });
  });
  d.quiz_results = d.quiz_results.slice(0, 60);
  d.logs.push({ id: uid('log'), date: isoDate(new Date()), subject: SUBJECT, minutes: mins, sessionId: null, source: 'dojo' });
  saveDB(d); paintHeader();
}
```

- Skip and "finish explain on unanswered" both = missed (recordMistake + perTopic.total++), advance.
- End state: "Done · X of M correct", ring text "This topic's ring just moved." / "Session complete — missed ones joined your mistake queue."; button "Back to the map" → `finishSession()` then map re-render (rings now reflect saved mastery) — pressing "Back to the map" BEFORE the last question also calls `finishSession()` only if at least one answer happened (guard with a `written` flag so a re-entry can't double-write).

- [ ] **Step 2: Manual verification**

- Drill "Number bases" (4 questions): correct → +10 toast + solution; wrong → solution; skip → advances. End card shows score.
- Reload `maths.html` → map ring for Number bases shows the new %; topic page stats match; header XP/streak update.
- Open `index.html` → dashboard streak and accuracy chip reflect the dojo session; export JSON (Subjects tab) shows one `quiz_results` row per topic with `mode:'practice'` and one `logs` row with `source:'dojo'`.
- Wrong answers appear in the tracker's Practice tab "Mistakes to review" count.

- [ ] **Step 3: Commit**

```bash
git add jamb-study/js/maths.js
git commit -m "Maths Dojo: topic drill with mastery, mistake queue and tracker-compatible session rows"
```

---

### Task 5: Calculator (`js/maths.js` part 3 + already-placed markup)

**Files:**
- Modify: `jamb-study/js/maths.js`

**Interfaces:**
- Consumes: calc markup already in `maths.html` (Task 3 step 2).
- Produces: `evaluate(src) -> { value, steps }`, `fmt`, `pretty`, `calcPress`, `calcSolve` — copied nearly verbatim from the mockup.

- [ ] **Step 1: Port the calculator**

Copy mockup lines 705–846 (`CALC_KEYS`, `calcPress`, `pretty`, `fmt`, `renderCalc`, `evaluate`, `calcSolve`, the toggle listener) into maths.js, referencing the already-present DOM ids. No changes except: `workToggle` default checked (already in markup), and keep the degrees convention + `log` base 10 + `ln`.

- [ ] **Step 2: Manual verification (with "show working" on)**

- `2^3×4=` → 32, steps include `2^3 = 8` and `8 × 4 = 32`, final `= 32`.
- `√144=` → 12. `sin(30)=` → 0.5. `log(100)=` → 2. `1/0=` → Error (danger colour, nothing thrown).
- Working toggle off hides the steps log; `C` and `DEL` work; below 900px width the toggle button opens it as a bottom sheet above the page bottom and closes again.

- [ ] **Step 3: Commit**

```bash
git add jamb-study/js/maths.js
git commit -m "Maths Dojo: scientific calculator with show-working log"
```

---

### Task 6: Explain side (`js/maths.js` part 4 + already-placed markup)

**Files:**
- Modify: `jamb-study/js/maths.js`

**Interfaces:**
- Consumes: explain markup already in `maths.html` (panel, backdrop, `#xSteps`, `#xBoard`, `#xBoardLabel`, `#xTrap`, `#xNextStep`); `LESSONS`; `state.topic`, current question.
- Produces: `openExplain()`, `closeExplain()`, `revealStep()`, `finishExplain()` per spec §5E.

- [ ] **Step 1: Port the explain side**

Copy mockup lines 848–910 (`openExplain`, `closeExplain`, `finishExplain`, `revealStep`, Escape handler) with:
- `L = LESSONS[currentItem.q]`; if absent, the trigger link is hidden in `renderQuestion()` (class `hidden` on the link).
- Finish: if unanswered → toast "Added to your mistake queue" + recordMistake + perTopic.total++; if answered → just advance; then `nextQuestion()`. Never awards XP.
- Focus: on open move focus to the panel close button; on close return focus to the "Please explain" link (mockup doesn't do this; spec §5E requires it). Add the two lines.

- [ ] **Step 2: Manual verification**

- Drill a question WITH a lesson: "Please explain" opens; step 1 shown; "Show next step" reveals one at a time; after the last step the button disappears and the Worked answer board + trap check appear together; board's last line is accent-green bold.
- "Back to the question" returns without changing state (answer options still enabled if unanswered).
- "Got it — next question" → toast "Added to your mistake queue" + next question loads (unanswered case); on an already-answered question it just advances with no toast.
- Escape, backdrop click and ✕ close; focus returns to the trigger. On a question WITHOUT a lesson the link is absent.
- At ≤900px the panel is full width.

- [ ] **Step 3: Commit**

```bash
git add jamb-study/js/maths.js
git commit -m "Maths Dojo: Please-explain side with worked-answer board and advance-on-finish"
```

---

### Task 7: Tracker links + offline (`index.html`, `sw.js`)

**Files:**
- Modify: `jamb-study/index.html` (header-right, dashboard)
- Modify: `jamb-study/sw.js`

**Interfaces:**
- Produces: two-way navigation between tracker and dojo; dojo available offline.

- [ ] **Step 1: Header link + dashboard card in `index.html`**

In `header-right`, before the theme button (line 36), add:

```html
<a class="who-pick" href="maths.html" title="Maths dojo — learn Mathematics topic by topic">🔢 Maths dojo</a>
```

After the "Next UTME cycle" card (closes at line 76), add:

```html
<section class="card" aria-labelledby="dojo-title">
  <div class="card-head">
    <h2 id="dojo-title">Maths dojo</h2>
    <span class="chip chip-quiet">topic by topic</span>
  </div>
  <p class="hint" style="margin-top:0">Learn each JAMB Mathematics topic, drill it with the calculator beside you, and ask for a full explanation any time — your progress feeds the streak and accuracy here.</p>
  <div class="btn-row">
    <a class="btn btn-primary" href="maths.html">Open the maths dojo</a>
  </div>
</section>
```

- [ ] **Step 2: `sw.js` — ASSETS + cache bump**

`const CACHE = 'jamb-study-v10'` → `'jamb-study-v11'`; append to `ASSETS` after `'./index.html'`:

```js
  './maths.html',
  './css/maths.css',
  './js/syllabus-mathematics.js',
  './js/lessons-mathematics.js',
  './js/maths.js',
```

- [ ] **Step 3: Manual verification**

- `index.html` header shows "🔢 Maths dojo" and goes to the dojo; dojo logo goes back to the tracker dashboard.
- Hard-reload once with devtools → Application → Service Workers shows the new cache `jamb-study-v11` populated with the five new entries; then go offline (devtools Network → Offline) and reload `maths.html`: map, drill, calculator and explain all work.

- [ ] **Step 4: Commit**

```bash
git add jamb-study/index.html jamb-study/sw.js
git commit -m "Tracker: maths dojo link + dashboard card; offline cache includes dojo files"
```

---

### Task 8: Full manual sweep (spec §9) + wrap-up

**Files:** none new (fix any failures in place, commit separately).

- [ ] **Step 1: Walk the spec's §9 checklist end to end on a clean profile** (fresh browser profile or cleared localStorage): map → drill 3 → calculator cases → mobile widths → explain flow → theme parity → offline → tracker dashboard/export unchanged except the new dojo rows.

- [ ] **Step 2: Run the data checker one last time**

Run from `jamb-study/`: `node tools/check-dojo-data.js` → expect `OK`.

- [ ] **Step 3: Fix + commit anything the sweep found; final commit**

```bash
git status   # confirm only intended files
git add <fixed files>
git commit -m "Maths Dojo: manual sweep fixes"
```

---

## Self-Review Notes (completed during plan writing)

- Spec coverage: §5A→Task 3, §5B→Task 3, §5C→Task 4, §5D→Task 5, §5E→Task 6, §6 data incl. quiz_results/logs/missed shapes→Task 4 global constraints, §7 lesson scope→Task 2, §8 edge cases→Tasks 3 (empty topic, storage-blocked helpers), 4 (skip=missed), 6 (no-lesson hides link); §9→Task 8. sw.js/index.html→Task 7.
- The three spec amendments (topic count, Q_TOPIC filter, XP=10×correct) are recorded in Task 0 and were necessitated by facts found while reading the repo (bank coverage, `topicFor` granularity, mockup +10 toast).
- Type consistency: `Q_TOPIC[q.q]`, `LESSONS[q.q]`, row shapes, `MASTERY_KEY` name used identically across tasks.
- Known execution risk: `Q_TOPIC` keys are exact question text — Task 1's checker fails loudly if any key drifts; rerun it after every content edit.
