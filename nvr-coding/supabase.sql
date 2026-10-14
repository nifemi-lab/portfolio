-- =========================================================
--  NVR Coding — Supabase schema
--  Run once in: Supabase Studio → SQL Editor → Run
--  (Same Supabase project as your JAMB Study tracker.)
-- =========================================================

-- One row per learner, holding their whole progress as JSONB
-- (xp, streak, completed lessons, review schedule, activity).
create table if not exists public.nvr_progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb        not null default '{}'::jsonb,
  updated_at timestamptz  not null default now()
);

-- Security: a learner can only ever read/write their own row.
alter table public.nvr_progress enable row level security;

drop policy if exists "learners manage their own progress" on public.nvr_progress;
create policy "learners manage their own progress"
  on public.nvr_progress
  for all
  using      (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Keep updated_at honest (reuses the function from JAMB Study,
-- created again here in case that project is ever separate).
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists nvr_progress_touch on public.nvr_progress;
create trigger nvr_progress_touch
  before update on public.nvr_progress
  for each row execute function public.touch_updated_at();