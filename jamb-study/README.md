# JAMB Study Tracker

A study app for UTME candidates: weekly timetable, per-subject targets, focus
timer, progress charts and a scored practice-question bank.

**What's in it**

- **2,750 practice questions across 14 subjects** (English, Maths, Physics,
  Chemistry, Biology, Economics, Government, Geography, Literature, History,
  Commerce, Further Mathematics, Agricultural Science, Principles of Accounts)
- Practice quizzes, **mixed-subject quizzes**, and a **timed mock exam**
  (60 seconds per question, auto-submits when the clock runs out)
- **Full UTME paper** — the four subjects flagged as UTME in Subjects (Use of
  English always first), every question from each in one sitting under a single
  countdown, then scored and broken down subject by subject
- **Answer review** — every quiz and paper ends with a question-by-question
  review: your answer, the correct answer, and the reasoning underneath
- **The working, the moment you answer** — pick an option and the solution
  opens right under the question, headed *"How to work it out"* when you were
  wrong and *"Why that is the answer"* when you were right, with the topic it
  belongs to. The method lands while the question is still in front of you
  instead of at the end of the paper, and skipped questions are left alone
- **Skip** — not sure? Leave the question without losing a point: it goes
  straight to the mistake queue instead of being marked wrong (Skip button or
  press **S**), and the result screen says how many you skipped
- **Learn tab** — study before you test. Short revision notes plus formula
  sheets for Mathematics, Use of English, Further Mathematics and Chemistry
  (12 notes and 3 sheets each), each note with a one-tap quiz on its topic
- **Worked solutions** — the same four subjects have all 720 of their questions
  with the correct option highlighted and the working underneath, grouped by
  topic the way a printed past-question book is, and each topic group starts a
  quiz on its own questions
- **Mistake queue** — every wrong answer is saved for review; getting it right
  in review removes it
- **Needs-work report** — your lowest-accuracy subjects, recalculated after
  every quiz
- Weekly timetable with tick-off sessions, focus timer, streak, weekly bar
  chart, subject progress bars and a **month study calendar**
- **Ticks have to be earned** — a session can't be marked as studied until
  the focus timer has put real minutes against it. Each slot shows
  `0 / 60 min` filling up as you work, and a slot you haven't started carries
  a ▶ button that jumps to the focus timer with its subject already chosen.
  Ticking no longer awards the planned time by itself, so a week can't be
  ticked off without the study behind it. Only today's slots are tickable —
  past days are history — and unticking keeps the minutes you really logged
- **Next UTME cycle card** — registration, mock, slips, exam and results dates
  projected for the upcoming session. It's computed from today's date, so it
  rolls to the next year's cycle by itself once the current one finishes, with
  a one-click button that adopts the projected exam date for the countdown
- Light/dark themes, installable as a PWA, works offline

> **About the questions.** Every question in this bank was written against the
> UTME syllabus for revision and drill purposes. They are *not* verbatim JAMB
> past questions and are not presented as such — no item here should be treated
> as an official or leaked UTME paper. Answer keys are plain data (`a` = index
> of the correct option), so any of them can be checked and corrected directly
> in the file. All 360 Mathematics and Further Mathematics keys have been
> recomputed question by question and every Use of English key proof-read —
> that pass corrected **13 keyed answers and 3 option texts** across the three
> files. A second pass — writing the worked solutions for Biology, Physics
> and Government — caught **7 more wrong keys** (Mendel's pea plants and
> *Escherichia coli*'s genus in Biology, wave speed in Physics, and four
> items in Nigeria's legislature, fundamental rights, election body and
> Senate age in Government), each corrected in its own file.

Vanilla HTML/CSS/JS — no build step, no framework, no npm.

**Live:** https://nifemi-lab.github.io/portfolio/jamb-study/

---

## How your data is stored

There are two modes, and the app picks automatically:

| Mode | What happens | When |
|---|---|---|
| **Cloud sync** ← *this deployment* | Data is written to this browser first, then pushed to a Supabase (Postgres) table | `js/config.js` has a URL + anon key — **shipped state** |
| **Local fallback** | Data stays in this browser's `localStorage` only | Keys are empty, `syncEnabled` is false, or the network is down |

The live project: `https://mhfxmjaxexgwcyhkoyhz.supabase.co` (region: West EU / Ireland),
table `public.study_data`, protected by row-level security so a browser can only ever
read or write its own row. Sign-in is anonymous by default — no password, no email,
just a per-browser identity stored in `localStorage`. You can optionally sign in with
an **email + password** (header → **Sign in**) so your progress follows you to another
device. Either way, nobody else can read or write your row.

**Several students can share one device.** The picker in the header
(*Who is studying*) switches between named profiles; each one has its own data key
and its own Supabase identity, so nothing bleeds between them. No passwords needed —
switching is instant.

Local-first is deliberate: the UI never waits on a network request, the app
works with no internet, and there is no server to keep alive. Cloud sync is a
belt-and-braces addition on top, so your progress follows you between devices.

The header chip always tells you which one you're in:
`saved locally` · `saving…` · `synced` · `local only`.

---

## Files

```
jamb-study/
├── index.html            app shell — 5 tabs (Dashboard, Timetable, Subjects, Practice, Learn)
├── css/app.css           design system (same tokens as the portfolio) + light theme
├── js/questions.js       230 questions → window.QUESTION_BANK (loaded first)
├── js/q-*.js             14 subject files × 180 questions → appended to the same bank
├── js/sol-*.js           4 solution files × 180 entries → window.SOLUTIONS, keyed by question text
├── js/notes-*.js         4 Learn files × (12 notes + 3 formula sheets) → window.NOTES
├── js/config.js          Supabase credentials (already filled in here)
├── js/app.js             all logic + the data layer
├── manifest.webmanifest  makes the app installable (PWA)
├── sw.js                 service worker — network-first, cache fallback
├── icon.svg              + icon-192.png / icon-512.png
├── supabase-schema.sql   table + row-level security, run once
└── README.md             this file
```

To add or correct questions, edit **`js/questions.js`** or the relevant
**`js/q-<subject>.js`** file. They are plain data, loaded before `app.js`:

```js
{ s: 'Physics', q: 'The SI unit of force is the:', o: ['Joule', 'Newton', 'Watt', 'Pascal'], a: 1 }
```

`s` must match the subject name **exactly**, `o` holds four options, and `a` is
the index of the correct one (an optional `e` gives the explanation shown after
you answer). Any new file needs a `<script>` tag in `index.html` after
`questions.js`, and a line in the `ASSETS` list in `sw.js`.

Solutions and revision notes live in their own plain-data files, so the question
bank never has to be edited to study from it:

```js
// js/sol-mathematics.js — window.SOLUTIONS[<subject>][<exact question text>]
{ t: 'Percentages', e: '15/100 x 200 = 30.' }

// js/notes-mathematics.js — pushed onto window.NOTES
{ subject: 'Mathematics', type: 'note', topic: 'Number bases',
  title: 'Converting between number bases', body: 'Paragraph...\n\n- bullet' }
{ subject: 'Mathematics', type: 'sheet', topic: 'Formula sheet',
  title: 'Formulas to know cold', body: '- Circumference = 2 x pi x r\n...' }
```

`t` is both the topic a solutions group is built under and the topic the
"Quiz me on…" button scopes a quiz to; `type` decides whether an entry shows
under Notes or Formula sheets. Bodies are plain text — a blank line starts a new
paragraph and any line beginning with `- ` becomes a bullet.

### Data model

Seven tables (localStorage keys, and JSONB in Supabase):

| Table | Holds |
|---|---|
| `subjects` | name, weekly minute target, UTME flag |
| `sessions` | timetable slots: day, start time, minutes, topic |
| `logs` | one row per completed session or timed study block |
| `quiz_results` | one row per finished quiz: subject, correct, total, mode |
| `questions` | practice questions you authored yourself |
| `missed` | the mistake queue: question, how many times you missed it |
| `settings` | daily goal, exam date, theme, `updatedAt` (sync conflicts) |

---

## Turning on cloud sync — already done for this deployment

The live instance ships with sync switched on (credentials in `js/config.js`).
These are the steps, kept for anyone forking the repo or wanting their own
database:

1. **Create the project** — [supabase.com](https://supabase.com) → *New project*
   (free tier is plenty).
2. **Run the schema** — Studio → **SQL Editor** → paste
   [`supabase-schema.sql`](./supabase-schema.sql) → **Run**.
3. **Allow anonymous sign-ins** — **Authentication → Sign In / Providers →
   “Allow anonymous sign-ins”** → toggle on → **Save changes**. This gives each
   browser its own hidden account, so nobody has to make a password and nobody
   can see anyone else's row.
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

## Signing in with email (optional)

The **Sign in** button in the header opens a small dialog. Anonymous sync stays
the default, so an account is never required — this is only for people who want
their progress on more than one device.

Two things to know about your Supabase project:

1. **Authentication → Sign In / Providers → Email** must be **on** (keep
   **Anonymous** on as well — step 3 above).
2. **Authentication → Providers → Email → Confirm email** — Supabase ships this
   **on**. If you leave it on, an account is created but no session is returned
   until the link in the confirmation email is clicked, and the dialog will say
   *"We emailed you a confirmation link — open it and you'll land back here,
   already signed in."* The link redirects back to whatever page the sign-up
   came from (`emailRedirectTo`), and the app claims the tokens from the URL
   on load, shows *"Email confirmed ✅ — signed in as …"* and starts syncing —
   no second sign-in needed. The project's **Authentication → URL
   Configuration** must allow that origin: Site URL points at the deployed
   app, and the Redirect URLs list includes `https://nifemi-lab.github.io/**`
   plus the `localhost` dev URLs. That email only arrives if the project's
   SMTP is working. Turn confirmation **off** if you would rather sign in
   straight away.

Signing in swaps this browser's identity for the email account's. Your data
stays exactly where it is locally and is pushed to the new row on the next
save. **Sign out of email sync** (in the same dialog) drops back to anonymous.

---

## Not included (and why)

- **Multi-user features** (class groups, leaderboards) — needs a schema
  redesign, not just a new column.
- **Server-side quiz anti-cheat** — pointless for self-study.
