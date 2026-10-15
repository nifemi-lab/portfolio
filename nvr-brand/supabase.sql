-- ============================================================
-- NVR Supply — orders
-- Run this once in the Supabase SQL editor for your project.
-- ============================================================

create table if not exists public.orders (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  reference   text        not null unique,
  full_name   text,
  email       text,
  phone       text,
  note        text,
  items       jsonb       not null,
  item_count  integer     not null default 0,
  subtotal    numeric(10,2) not null default 0,
  channel     text,
  status      text        not null default 'new',
  constraint orders_status_check
    check (status in ('new', 'confirmed', 'made', 'shipped', 'done', 'cancelled'))
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx     on public.orders (status);

alter table public.orders enable row level security;

-- Customers can submit an order. They can never read, edit or delete one.
drop policy if exists "orders_insert_public" on public.orders;
create policy "orders_insert_public"
  on public.orders for insert
  to anon, authenticated
  with check (true);

-- Only YOU can read or change orders, matched on your Supabase account email.
-- TODO: replace with the email address you sign in to Supabase with.
-- Until this is your real email, nobody can read orders at all - which is
-- safe, just inconvenient for you.
drop policy if exists "orders_read_owner" on public.orders;
create policy "orders_read_owner"
  on public.orders for select
  to authenticated
  using ( (auth.jwt() ->> 'email') = 'REPLACE-WITH-YOUR-SUPABASE-EMAIL' );

drop policy if exists "orders_update_owner" on public.orders;
create policy "orders_update_owner"
  on public.orders for update
  to authenticated
  using ( (auth.jwt() ->> 'email') = 'REPLACE-WITH-YOUR-SUPABASE-EMAIL' )
  with check ( (auth.jwt() ->> 'email') = 'REPLACE-WITH-YOUR-SUPABASE-EMAIL' );

-- No delete policy on purpose: orders are a record. Cancel by setting status.


-- ============================================================
--  Customer order lookup
-- ------------------------------------------------------------
--  Lets a customer check on their own order without an account,
--  by entering their reference AND the phone number they gave.
--
--  This is deliberately a function rather than a plain select:
--  a reference is only 4 characters, so querying on it alone would
--  let anyone enumerate your whole order book. RLS cannot compare
--  the submitted phone to the stored one, so the match has to happen
--  inside the database.
--
--  Phone is compared with non-digits stripped, so "0801 234 5678"
--  matches "08012345678".
-- ============================================================

create or replace function public.lookup_order(p_reference text, p_phone text)
returns jsonb
language sql
security definer
set search_path = public
as $$
  select to_jsonb(o)
  from public.orders o
  where upper(o.reference) = upper(trim(p_reference))
    and p_phone is not null
    and regexp_replace(coalesce(o.phone, ''), '[^0-9]', '', 'g')
      = regexp_replace(coalesce(p_phone, ''), '[^0-9]', '', 'g')
  limit 1;
$$;

revoke all on function public.lookup_order(text, text) from public;
grant execute on function public.lookup_order(text, text) to anon, authenticated;

-- What a customer is allowed to change on their own order: nothing.
-- They can look, not touch.