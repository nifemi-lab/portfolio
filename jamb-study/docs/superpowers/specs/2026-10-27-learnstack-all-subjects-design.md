# LearnStack: All-Subjects Expansion Design

**Date:** 2026-10-27
**Status:** Approved by the user
**Builds on:** `2026-10-27-learnstack-design.md` and the completed Mathematics MVP

## 1. Goal

Turn LearnStack from a Mathematics-only section into a calm, complete school
catalogue for the same three tracks, while keeping every lesson playable,
validated, and illustrated with a sourced 3D image.

**Destination:** 40 subject entries across three tracks, 240 lessons, 720 quiz
questions.

**Non-goals:** no AI tutor, no AI-generated content or images, no accounts, no
exam-board branding, no build step, no frameworks.

## 2. Decisions

- Build in subject packs (approach B), not one giant release.
- Ship the full UK-style subject list, including Art, Music, PE, languages,
  Business Studies, Citizenship, and Religious Education.
- A subject appears in the catalogue only when its six lessons exist and pass
  validation. No empty "coming soon" cards.
- Existing Mathematics content and routes keep working; the tracker and its
  storage keys are untouched.
- Pushing remains gated on the user's explicit approval.

## 3. Catalogue

Each subject has 2 modules × 3 lessons = 6 lessons.

| Track | Subjects |
|---|---|
| Primary | English, Mathematics, Science, History, Geography, Computing, Art & Design, Design & Technology, Music, PE, French |
| Lower Secondary | English, Mathematics, Science, History, Geography, Computing, Art & Design, Design & Technology, Music, PE, French, Citizenship, Religious Education |
| Upper Secondary (GCSE) | English Language, English Literature, Mathematics, Biology, Chemistry, Physics, History, Geography, Computing, Art & Design, Music, PE, French, Business Studies, Citizenship, Religious Education |

Counts: 11 + 13 + 16 = 40 subject entries; 10 + 12 + 15 = 37 new subjects;
37 × 6 = 222 new lessons; 240 lessons in total.

## 4. Information architecture

- **Track chooser (`#/`)** — three cards. Each card shows combined progress
  across every subject in that track, plus the subject and lesson counts.
- **Track page (`#/[track]`)** — a subject grid. Each card shows the subject
  name, a short description, its first lesson's 3D image, and that subject's
  progress. Cards link to `#/[track]/[subject]`.
- **Existing routes** — `#/[track]/[subject]` (modules),
  `#/[track]/[subject]/[module]`, and the lesson/review/settings routes are
  unchanged. Old Mathematics links keep working.
- **Progress** — still one `learnstack.v1.progress` object keyed by lesson id.
  Lesson ids are globally unique and include the subject:
  `primary-english-m1-l1`, `upper-secondary-english-literature-m2-l3`.

## 5. Content architecture

- `students/data/tracks.js` keeps track metadata and the existing Mathematics
  modules. New subjects are added to each track's `subjects` array with
  `{ id, label, description }` and no lessons.
- Each new subject ships as its own file under
  `students/data/<track>/<subject>.js`, loaded immediately after `tracks.js`:
  `students/data/primary/english.js`,
  `students/data/upper-secondary/english-literature.js`, and so on.
- A subject file finds its subject in `window.LEARN_TRACKS` and assigns its
  `modules`. The validator therefore fails loudly if a file is missing.
- `index.html` and `tests/learn/content.test.js` load every released subject
  file. `tools/check-learn-data.js` does the same.
- `sw.js` precaches every released data file. Images are cached on first view
  (except the small pack-1 set), so the full catalogue does not download
  hundreds of images on first open.
- Module descriptions keep the visible **Draft content.** marker until an
  adult reviews that subject.

## 6. Learning design

Inspiration taken from established teaching sites, not copied:

- **Turbo AI / TurboLearn** — short, well-organised notes and diagrams, then
  quick recall activities and quizzes.
- **Corbettmaths** — explain, practise, apply; regular short retrieval.
- **BBC Bitesize and Oak National Academy** — step-by-step guides, worked
  activities, and an end-of-topic check.

Applied to the existing lesson template:

1. Objective and time estimate.
2. Three to five short explanation steps (one idea per step).
3. A tip for the common mistake.
4. A sourced 3D illustration with descriptive alt text and a diagram fallback.
5. A worked example with numbered steps.
6. Vocabulary (3–5 words).
7. Confidence check.
8. Three-question quiz: recall, understanding, and **application** in a new
   context. Every answer explains why.

No AI feature, generated text, or generated image is added. The tone and word
limits stay per track: Primary 25 words, Lower Secondary 45, Upper Secondary
60 words per block.

## 7. Images and offline

- Source every 3D image from Microsoft Fluent Emoji (MIT), stored locally under
  `students/assets/3d/`.
- Reuse an image where two lessons genuinely share a concept; otherwise pick a
  related object or metaphor. Where no suitable image exists, use the labelled
  diagram plate.
- The content gate checks every referenced image file exists and is a local
  `assets/3d/*.png|webp` path.
- App shell, lesson data, and pack-1 images are precached. Later images cache
  on first view and then work offline.
- Cache version bumps once per pack.

## 8. Pack order

| Pack | Contents | New subjects | New lessons |
|---|---|---|---|
| 1 | Framework + English (incl. GCSE Language and Literature) | 4 | 24 |
| 2 | Science (incl. GCSE Biology, Chemistry, Physics) | 5 | 30 |
| 3 | History and Geography | 6 | 36 |
| 4 | Computing, Citizenship, Religious Education | 7 | 42 |
| 5 | Art & Design, Music, PE | 9 | 54 |
| 6 | French, Design & Technology, Business Studies | 6 | 36 |

Each pack ends with: content gate green, all tests green, browser play-through
of every new lesson, image check, and one commit. Pack 1 also delivers the
multi-subject framework.

## 9. Risks and mitigations

- **Volume and quality.** 222 lessons is several passes. Mitigate with strict
  per-pack validation, consistent templates, and one pack per commit.
- **Image relevance.** Fluent Emoji does not depict every abstract idea.
  Mitigate with related-object metaphors, reuse, and the diagram plate.
- **Subject duplication across tracks.** English, Science, and History appear
  in more than one track. Differentiate by reading level, examples, and quiz
  application, never by copying the same prose.
- **Growing file count.** 37 small data files are more script tags. The gate
  and service worker make this explicit and maintainable.

## 10. Success criteria

- 40 subject entries, 240 lessons, 720 questions, all validated.
- Subject grid works at 320px, shows correct per-subject progress, and old
  Mathematics deep links still resolve.
- Track chooser totals match the sum of subject progress.
- Every lesson has a local 3D image or an intentional diagram plate.
- No JAMB/UTME/WAEC/NECO content, no external fonts, no AI services.
- The exam tracker remains unchanged.
