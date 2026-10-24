-- ============================================================
-- NVR Supply — team roles
-- ------------------------------------------------------------
-- Run this AFTER supabase.sql, in the Supabase SQL editor.
-- Running it twice is safe: tables, functions and policies are
-- all created with "if not exists" or "drop ... if exists".
--
-- Roles:
--   owner      full access. Bootstrapped by the owner email below.
--   staff      orders and listings, no payouts, no payout accounts.
--   co-seller  only their own listings, payouts and seller row.
--
-- The browser decides what to show; these policies decide what the
-- database will actually return. Do not rely on the UI alone.
-- ============================================================


-- ============================================================
--  TEAM
-- ============================================================

create table if not exists public.team (
  email      text        primary key,
  role       text        not null default 'staff',
  seller_id  uuid        references public.sellers (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint team_role_check check (role in ('owner', 'staff', 'co-seller'))
);

create index if not exists team_seller_idx on public.team (seller_id);

alter table public.team enable row level security;

-- The owner email is the bootstrap owner, even if the team row is missing.
-- That guarantees the owner can always get back into their own console.
-- TODO: keep this in step with the email you sign in to Supabase with.
create or replace function public.console_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select case
    when lower(coalesce(auth.jwt() ->> 'email', '')) = 'ogiehenifemi@gmail.com'
      then 'owner'
    else (
      select t.role
      from public.team t
      where lower(t.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      limit 1
    )
  end;
$$;

create or replace function public.console_seller_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select t.seller_id
  from public.team t
  where lower(t.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  limit 1;
$$;

create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.console_role() = 'owner';
$$;

-- Owner or staff. Used for orders and listings.
create or replace function public.is_console_team()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.console_role() in ('owner', 'staff');
$$;

revoke all on function public.console_role() from public;
revoke all on function public.console_seller_id() from public;
revoke all on function public.is_owner() from public;
revoke all on function public.is_console_team() from public;

grant execute on function public.console_role() to authenticated;
grant execute on function public.console_seller_id() to authenticated;
grant execute on function public.is_owner() to authenticated;
grant execute on function public.is_console_team() to authenticated;

drop policy if exists "team_read_self" on public.team;
create policy "team_read_self"
  on public.team for select
  to authenticated
  using (
    lower(email) = lower(auth.jwt() ->> 'email')
    or public.is_owner()
  );

drop policy if exists "team_write_owner" on public.team;
create policy "team_write_owner"
  on public.team for all
  to authenticated
  using (public.is_owner())
  with check (public.is_owner());

insert into public.team (email, role)
values ('ogiehenifemi@gmail.com', 'owner')
on conflict (email) do nothing;


-- ============================================================
--  SELLERS
-- ------------------------------------------------------------
--  The owner sees the payout account. Staff must not, so staff read
--  the safe view below instead of the table. A co-seller can read
--  their own row.
-- ============================================================

drop policy if exists "sellers_read_owner" on public.sellers;
create policy "sellers_read_owner"
  on public.sellers for select
  to authenticated
  using (public.is_owner());

drop policy if exists "sellers_read_self" on public.sellers;
create policy "sellers_read_self"
  on public.sellers for select
  to authenticated
  using (id = public.console_seller_id());

drop policy if exists "sellers_update_owner" on public.sellers;
create policy "sellers_update_owner"
  on public.sellers for update
  to authenticated
  using (public.is_owner())
  with check (public.is_owner());

-- Safe columns for owner and staff. payout_to is deliberately absent.
create or replace view public.sellers_directory
with (security_invoker = false)
as
  select id, created_at, reference, full_name, phone, email, city,
         handle, bio, status, tier, tier_since, decided_at
  from public.sellers
  where public.is_console_team();

revoke all on public.sellers_directory from public;
grant select on public.sellers_directory to authenticated;


-- ============================================================
--  LISTINGS
-- ============================================================

drop policy if exists "listings_read_owner" on public.listings;
drop policy if exists "listings_read_team" on public.listings;
create policy "listings_read_team"
  on public.listings for select
  to authenticated
  using (public.is_console_team());

drop policy if exists "listings_read_self" on public.listings;
create policy "listings_read_self"
  on public.listings for select
  to authenticated
  using (seller_id = public.console_seller_id());

drop policy if exists "listings_update_owner" on public.listings;
drop policy if exists "listings_update_team" on public.listings;
create policy "listings_update_team"
  on public.listings for update
  to authenticated
  using (public.is_console_team())
  with check (public.is_console_team());


-- ============================================================
--  ORDERS
-- ============================================================

drop policy if exists "orders_read_owner" on public.orders;
drop policy if exists "orders_read_team" on public.orders;
create policy "orders_read_team"
  on public.orders for select
  to authenticated
  using (public.is_console_team());

drop policy if exists "orders_update_owner" on public.orders;
drop policy if exists "orders_update_team" on public.orders;
create policy "orders_update_team"
  on public.orders for update
  to authenticated
  using (public.is_console_team())
  with check (public.is_console_team());


-- ============================================================
--  PAYOUTS
-- ------------------------------------------------------------
--  Only the owner can read the whole ledger or mark anything paid.
--  A co-seller can read their own rows.
-- ============================================================

drop policy if exists "payouts_read_owner" on public.payouts;
create policy "payouts_read_owner"
  on public.payouts for select
  to authenticated
  using (public.is_owner());

drop policy if exists "payouts_read_self" on public.payouts;
create policy "payouts_read_self"
  on public.payouts for select
  to authenticated
  using (seller_id = public.console_seller_id());

drop policy if exists "payouts_insert_owner" on public.payouts;
create policy "payouts_insert_owner"
  on public.payouts for insert
  to authenticated
  with check (public.is_owner());

drop policy if exists "payouts_update_owner" on public.payouts;
create policy "payouts_update_owner"
  on public.payouts for update
  to authenticated
  using (public.is_owner())
  with check (public.is_owner());


-- ============================================================
--  FEATURED
-- ============================================================

drop policy if exists "featured_write_owner" on public.featured;
create policy "featured_write_owner"
  on public.featured for all
  to authenticated
  using (public.is_owner())
  with check (public.is_owner());


-- ============================================================
--  LISTING PHOTOS
-- ------------------------------------------------------------
--  Anyone may submit photos with an application, but only the
--  console team may alter or delete them. Before this, any signed-in
--  account could delete listing photography.
-- ============================================================

drop policy if exists "listing_photos_owner_update" on storage.objects;
create policy "listing_photos_owner_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'listing-photos' and public.is_console_team())
  with check (bucket_id = 'listing-photos' and public.is_console_team());

drop policy if exists "listing_photos_owner_delete" on storage.objects;
create policy "listing_photos_owner_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'listing-photos' and public.is_console_team());


-- Refresh PostgREST so the new team table and sellers_directory view
-- appear immediately instead of after a minute.
notify pgrst, 'reload schema';


-- ============================================================
--  AFTER RUNNING
-- ------------------------------------------------------------
--  1. Create each person's sign-in in Supabase -> Authentication ->
--     Users. An email in public.team is not an account by itself.
--  2. Sign in at admin.html as the owner.
--  3. Add their email under Team, pick staff or co-seller, and link a
--     co-seller to their approved seller row.
-- ============================================================
