create table if not exists public.site_admins (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);

alter table public.site_admins enable row level security;
revoke all on table public.site_admins from anon, authenticated;
grant select on table public.site_admins to authenticated;

drop policy if exists "Admins can read their own allowlist entry" on public.site_admins;
create policy "Admins can read their own allowlist entry"
  on public.site_admins
  for select
  to authenticated
  using (email = lower((select auth.jwt() ->> 'email')));

insert into public.site_admins (email)
values ('jamie.trading.9@gmail.com')
on conflict (email) do nothing;

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.site_admins
    where email = lower((select auth.jwt() ->> 'email'))
  );
$$;

revoke all on function public.is_site_admin() from public, anon, authenticated;
grant execute on function public.is_site_admin() to authenticated;

create table if not exists public.site_pages (
  page_id text primary key,
  draft_project jsonb,
  draft_html text,
  draft_css text,
  published_html text,
  published_css text,
  published boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

alter table public.site_pages enable row level security;
revoke all on table public.site_pages from anon, authenticated;
grant select (page_id, published_html, published_css, published)
  on table public.site_pages to anon;
grant select on table public.site_pages to authenticated;
grant insert, update, delete on table public.site_pages to authenticated;

drop policy if exists "Anyone can read published site pages" on public.site_pages;
create policy "Anyone can read published site pages"
  on public.site_pages
  for select
  to anon
  using (published is true);

drop policy if exists "Signed-in admins can read site pages" on public.site_pages;
create policy "Signed-in admins can read site pages"
  on public.site_pages
  for select
  to authenticated
  using ((select public.is_site_admin()));

drop policy if exists "Admins can create site page drafts" on public.site_pages;
create policy "Admins can create site page drafts"
  on public.site_pages
  for insert
  to authenticated
  with check ((select public.is_site_admin()));

drop policy if exists "Admins can update site page drafts" on public.site_pages;
create policy "Admins can update site page drafts"
  on public.site_pages
  for update
  to authenticated
  using ((select public.is_site_admin()))
  with check ((select public.is_site_admin()));

drop policy if exists "Admins can delete site pages" on public.site_pages;
create policy "Admins can delete site pages"
  on public.site_pages
  for delete
  to authenticated
  using ((select public.is_site_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 8388608, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can view published site media" on storage.objects;
create policy "Anyone can view published site media"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'site-media');

drop policy if exists "Admins can upload site media" on storage.objects;
create policy "Admins can upload site media"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'site-media'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select public.is_site_admin())
  );

drop policy if exists "Admins can update their site media" on storage.objects;
create policy "Admins can update their site media"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'site-media'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select public.is_site_admin())
  )
  with check (
    bucket_id = 'site-media'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select public.is_site_admin())
  );

drop policy if exists "Admins can delete their site media" on storage.objects;
create policy "Admins can delete their site media"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'site-media'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select public.is_site_admin())
  );
