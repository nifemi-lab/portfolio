-- NVR Coding — run this once in Supabase (SQL editor) to enable cloud accounts
create table if not exists nvr_progress (
  email text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

alter table nvr_progress enable row level security;

-- Each signed-in user can only touch their own row
create policy "own row" on nvr_progress
  for all
  using (email = (auth.jwt() ->> 'email'))
  with check (email = (auth.jwt() ->> 'email'));