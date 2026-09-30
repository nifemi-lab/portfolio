# JAMB Study Tracker

A study app for UTME candidates: weekly timetable, per-subject targets, focus
timer, progress charts and a scored past-question bank.

**What's in it**

- **230 past questions across 14 subjects** (English, Maths, Physics, Chemistry,
  Biology, Economics, Government, Geography, Literature, History, Commerce,
  Further Mathematics, Agricultural Science, Principles of Accounts)
- Practice quizzes, **mixed-subject quizzes**, and a **timed mock exam**
  (60 seconds per question, auto-submits when the clock runs out)
- **Mistake queue** — every wrong answer is saved for review; getting it right
  in review removes it
- **Needs-work report** — your lowest-accuracy subjects, recalculated after
  every quiz
- Weekly timetable with tick-off sessions, focus timer, streak, weekly bar
  chart, subject progress bars and a **month study calendar**
- Light/dark themes, installable as a PWA, works offline

Vanilla HTML/CSS/JS — no build step, no framework, no npm.

**Live:** https://nifemi-lab.github.io/portfolio/jamb-study/

---

## How your data is stored

There are two modes, and the app picks automatically:

| Mode | What happens | When |
|---|---|---|
| **Local (default)** | Data is written to this browser's `localStorage` | `js/config.js` keys are empty — which is the shipped state |
| **Cloud sync** | Data is written locally *first*, then pushed to a Supabase (Postgres) table | You fill in the two keys and run the schema SQL |

Local-first is deliberate: the UI never waits on a network request, the app
works with no internet, and there is no server to keep alive. Cloud sync is a
belt-and-braces addition on top, so your progress follows you between devices.

The header chip always tells you which one you're in:
`saved locally` · `saving…` · `synced` · `local only`.

---

## Files

```
jamb-study/
├── index.html            app shell — 4 tabs (Dashboard, Timetable, Subjects, Practice)
├── css/app.css           design system (same tokens as the portfolio) + light theme
├── js/questions.js       230 past questions → window.QUESTION_BANK
├── js/config.js          ← the only file you edit to enable cloud sync
├── js/app.js             all logic + the data layer
├── manifest.webmanifest  makes the app installable (PWA)
├── sw.js                 service worker — network-first, cache fallback
├── icon.svg              + icon-192.png / icon-512.png
├── supabase-schema.sql   table + row-level security, run once
└── README.md             this file
```

To add or correct questions, edit **`js/questions.js`** only — it is plain data
(`{ s: subject, q: question, o: [four options], a: correct index }`) and is
loaded before `app.js`.

### Data model

Seven tables (localStorage keys, and JSONB in Supabase):

| Table | Holds |
|---|---|
| `subjects` | name, weekly minute target, UTME flag |
| `sessions` | timetable slots: day, start time, minutes, topic |
| `logs` | one row per completed session or timed study block |
| `quiz_results` | one row per finished quiz: subject, correct, total, mode |
| `questions` | past questions you authored yourself |
| `missed` | the mistake queue: question, how many times you missed it |
| `settings` | daily goal, exam date, theme, `updatedAt` (sync conflicts) |

---

## Turning on cloud sync (5 steps, ~3 minutes)

1. **Create the project** — [supabase.com](https://supabase.com) → *New project*
   (free tier is plenty).
2. **Run the schema** — Studio → **SQL Editor** → paste
   [`supabase-schema.sql`](./supabase-schema.sql) → **Run**.
3. **Allow anonymous sign-ins** — **Authentication → Providers → Anonymous →
   Enable**. This gives each browser its own hidden account, so nobody has to
   make a password and nobody can see anyone else's row.
4. **Copy your credentials** — **Project Settings → API** → copy the
   *Project URL* and the *anon public* key.
5. **Paste them into** [`js/config.js`](./js/config.js):

```js
window.STUDY_CONFIG = {
  supabaseUrl: "https://abcdefghijklmn.supabase.co",
  supabaseAnonKey: "eyJhbGciOi...",
  syncEnabled: true
};
```

Commit and push. The chip in the header will change from `saved locally` to
`synced`.

> The `anon` key is designed to be public — it is safe in client-side code.
> Security comes from Row Level Security: the SQL policy
> (`auth.uid() = user_id`) makes the database itself reject any read or write
> against another student's row.

### If sync fails

The chip falls back to `local only` and nothing is lost — everything is still
saved locally. Hover the chip for the reason. The usual causes:

- **`Anonymous sign-ins are disabled`** → step 3 above
- **`relation "public.study_data" does not exist`** → step 2 above
- **`Invalid API key`** → step 4/5, check for a stray space

---

## Moving data by hand

No back-end needed: **Export JSON** in the Subjects tab downloads everything,
**Import JSON** loads it on another device. Use this if you'd rather not set
up Supabase at all.

---

## Not included (and why)

- **Passwords / email login** — anonymous auth keeps it frictionless. Adding
  `supabase.auth` email login is a small change if you ever need it.
- **Multi-user features** (class groups, leaderboards) — needs a schema
  redesign, not just a new column.
- **Server-side quiz anti-cheat** — pointless for self-study.
