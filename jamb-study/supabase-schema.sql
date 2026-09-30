-- =========================================================
--  JAMB Study Tracker — Supabase (Postgres) schema
--  Run this once in:  Supabase Studio → SQL Editor → Run
-- =========================================================

-- 1. The table: one row per student, holding their whole
--    study database as JSONB (subjects, sessions, logs,
--    quiz_results, questions, settings).
create table if not exists public.study_data (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb        not null default '{}'::jsonb,
  updated_at timestamptz  not null default now()
);

create index if not exists study_data_updated_at_idx
  on public.study_data (updated_at desc);

-- 2. Row Level Security: a student can only ever read or
--    write their own row. Enforced by the database itself.
alter table public.study_data enable row level security;

drop policy if exists "students manage their own data" on public.study_data;
create policy "students manage their own data"
  on public.study_data
  for all
  using      (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 3. Keep updated_at honest even if a row is written directly.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists study_data_touch on public.study_data;
create trigger study_data_touch
  before update on public.study_data
  for each row execute function public.touch_updated_at();

-- =========================================================
--  ALSO REQUIRED (dashboard, not SQL):
--  Authentication → Providers → Anonymous  →  Enable
--  The app signs each browser in anonymously so rows are
--  separated without anyone having to create a password.
-- =========================================================
