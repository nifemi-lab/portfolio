/* =========================================================
   JAMB Study Tracker — configuration
   ---------------------------------------------------------
   The app runs fully offline with NO back-end by default:
   your data is saved in this browser (localStorage).

   To switch on cloud sync, create a free Supabase project
   and paste the two values below, then run the SQL in
   supabase-schema.sql. See README.md — it's 5 steps.

   Nothing else in the app needs to change; if these are
   empty the app simply stays local-only.
   ========================================================= */

window.STUDY_CONFIG = {
  /* e.g. "https://abcdefghijklmn.supabase.co" */
  supabaseUrl: '',

  /* the "anon public" key — safe to expose in a browser */
  supabaseAnonKey: '',

  /* set to false to force local-only, even if the keys are set */
  syncEnabled: true
};
