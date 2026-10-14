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

-- NOTE: these two let any signed-in Supabase user see and update every order.
-- That is fine while the only account is yours, but if you ever add customer
-- accounts to this project, lock these down first — otherwise any signed-in
-- customer could read your whole order book.
drop policy if exists "orders_read_admin" on public.orders;
create policy "orders_read_admin"
  on public.orders for select
  to authenticated
  using (true);

drop policy if exists "orders_update_admin" on public.orders;
create policy "orders_update_admin"
  on public.orders for update
  to authenticated
  using (true)
  with check (true);

-- No delete policy on purpose: orders are a record. Cancel by setting status.