# NVR CODING — Plan
A coding school website built on learning psychology.

## 1. Vision
Teach front-end and back-end web development so effectively that it feels easy.
Every feature is justified by learning science, not trend-chasing.

## 2. Psychological Principles → Features
| Principle | Feature on the site |
|---|---|
| Chunking (Miller 7±2) | Lessons split into micro-steps (2–4 min each) |
| Active recall | Every lesson ends with a quiz BEFORE moving on |
| Spaced repetition | Review mode resurfaces old concepts on a schedule |
| Cognitive load theory | Progressive disclosure; one idea per screen; minimal UI |
| Flow (Csikszentmihalyi) | Difficulty adapts: hints if struggling, bonus if gliding |
| Self-determination theory | Autonomy (choose track), competence (visible XP), relatedness (showcase gallery later) |
| Growth mindset (Dweck) | Error messages say "Errors are data 🔍", never "Wrong!" |
| Operant conditioning (ethical) | XP, streaks, skill tree, badges tied to *mastery*, not grind |
| Dual coding | Every concept = diagram + analogy (Backend = kitchen, API = waiter) |
| Zeigarnik effect | Progress bars and "lesson 3 of 5" open loops |
| Feynman technique | "Explain it back" prompts after each unit |
| Friction reduction | "Start now" drops you straight into a live lesson, no signup wall |
| IKEA effect | Every unit ends by building something you keep |

## 3. Content Curriculum
- **Track 0 — How the Web Works** (client, server, HTTP, browser mental model)
- **Track 1 — Front-End**: HTML → CSS → JS → DOM → Forms → Fetch/APIs → Mini-projects (portfolio, todo app)
- **Track 2 — Back-End**: How servers work → Node basics → Express API → Databases (SQL basics) → Auth → Capstone API
- Each lesson = Explain (analogy+diagram) → Example → Try-it (live editor) → Quiz → Summary
- Each unit ends with a build-along project saved to your portfolio page

## 4. Tech Stack (matches your existing jamb-study setup)
- Vanilla HTML + CSS + JS (no build step, fast, easy to edit)
- `lessons.json` — content as data, easy to add lessons
- Service worker + manifest → installable PWA, works offline
- localStorage for progress, XP, streaks, review schedule
- In-browser JS playground (textarea editor + Run button + console output)
- Accessible (keyboard nav, contrast, reduced-motion option)

## 5. File Structure
```
nvr-coding/
├── index.html          # Landing page
├── lesson.html         # Lesson player
├── css/styles.css      # Design system (dark/light, whitespace, type scale)
├── js/app.js           # Navigation, XP, streaks
├── js/lesson.js        # Lesson engine + editor + quiz
├── js/review.js        # Spaced repetition scheduler
├── data/lessons.json   # Full curriculum content
├── img/                # Diagrams, icons
├── manifest.webmanifest
└── sw.js
```

## 6. Design Language
- Calm dark theme (low cognitive load), accent color for progress, generous whitespace
- One idea per screen, big readable type, chunked steps with progress dots
- Encouraging micro-copy everywhere

## 7. Build Phases
1. ✅ Plan (this document)
2. Shell: landing page + lesson player + design system
3. Curriculum v1: Track 0 + Track 1 first lessons in `lessons.json`
4. Interactive exercises: live editor, Run, quizzes, immediate gentle feedback
5. Motivation layer: XP, streaks, skill tree, badges
6. Spaced-repetition review mode
7. Polish: PWA, offline, a11y, mobile
8. Launch + iterate from feedback

## 8. Success Metrics (later)
- Finish-a-lesson rate, streak retention, review completion
- "Did it feel easy?" feedback prompt after each unit
