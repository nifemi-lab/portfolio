# 🧠 NVR Coding

A psychology-backed coding school in the browser. Front-end, back-end, SQL, Git, and projects — taught in confetti-bite-sized chunks.

## Run it
Just open `index.html` in a browser. No build step, no server needed.
(For offline/PWA install support, serve the folder with any static server, e.g. `npx serve`.)

## What's inside
| Feature | Psychology it uses |
|---|---|
| Chunked micro-lessons | Cognitive load theory |
| Quizzes before proceeding | Active recall |
| Spaced Review page | Spacing effect |
| ✍️ "Write it yourself" monitored steps | Retrieval practice + feedback |
| XP, streaks, badges | Operant conditioning (ethical) |
| Playground sandbox | Autonomy (self-determination theory) |
| Analogy boxes (🍳) | Dual coding |
| Progress bars + open lesson counts | Zeigarnik effect |

## Files
- `index.html` — landing, progress dashboard, badges, roadmap
- `lesson.html` — lesson player
- `review.html` — spaced repetition
- `playground.html` — free sandbox
- `data/lessons.js` — all curriculum content
- `js/app.js` — XP, streaks, badges, progress, theme
- `js/lesson.js` — lesson engine
- `js/review.js` — review engine
- `js/playground.js` — sandbox
- `js/celebrate.js` — confetti + chime
- `sw.js`, `manifest.webmanifest` — PWA

Progress lives in localStorage (`nvr_*` keys).
