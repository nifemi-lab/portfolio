/* =========================================================
   JAMB Study Tracker — configuration
   ---------------------------------------------------------
   Cloud sync is switched ON for this deployment.

   Both values below are the *public* pair: the anon key is
   safe to expose in a browser because row-level security in
   the database only ever lets a signed-in student read or
   write their own row.

   Empty them (or set syncEnabled: false) and the app falls
   back to running fully offline on localStorage, with no
   errors — the header chip will read "saved locally".
   ========================================================= */

window.STUDY_CONFIG = {
  supabaseUrl: 'https://mhfxmjaxexgwcyhkoyhz.supabase.co',

  /* the "anon public" key — safe to expose in a browser */
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oZnhtamF4ZXhnd2N5aGtveWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4MDA5MjksImV4cCI6MjEwNjM3NjkyOX0.svtoSR3EUQyW0Du2RPsA6h7eiHNSb6mbub1dYEtbB3A',

  /* set to false to force local-only, even if the keys are set */
  syncEnabled: true
};
