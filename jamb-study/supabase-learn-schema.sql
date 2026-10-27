-- =========================================================
--  LearnStack progress table
--  Run once in Supabase Studio -> SQL Editor -> Run.
--  This table is separate from the tracker's study_data table.
-- =========================================================

create table if not exists public.learn_progress (
  user_id        uuid not null references auth.users (id) on delete cascade,
  lesson_id      text not null,
  status         text not null default 'not_started'
                 check (status in ('not_started', 'in_progress', 'completed')),
  best_score     int  not null default 0 check (best_score between 0 and 100),
  attempts       int  not null default 0 check (attempts >= 0),
  last_seen_at   timestamptz not null default now(),
  review_stage   int  not null default 0 check (review_stage between 0 and 4),
  next_review_at timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create index if not exists learn_progress_review_idx
  on public.learn_progress (user_id, next_review_at);

alter table public.learn_progress enable row level security;

drop policy if exists "learners manage their own progress" on public.learn_progress;
create policy "learners manage their own progress"
  on public.learn_progress
  for all
  using      (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists learn_progress_touch on public.learn_progress;
create trigger learn_progress_touch
  before update on public.learn_progress
  for each row execute function public.touch_updated_at();

-- REQUIRED DASHBOARD SETTING (not SQL):
-- Authentication -> Providers -> Anonymous -> Enable.
-- The tracker already uses anonymous sign-in; do not disable it.
