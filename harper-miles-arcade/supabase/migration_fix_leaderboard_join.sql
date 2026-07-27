-- Run this in the Supabase SQL Editor if your leaderboards are showing
-- "No scores yet" even after playing games. This links scores directly to
-- profiles so display names can be joined in, and backfills any missing
-- profile rows for accounts created before the profile-creation trigger
-- existed.

alter table public.scores drop constraint if exists scores_user_id_fkey;
alter table public.scores add constraint scores_user_id_fkey
  foreign key (user_id) references public.profiles (id) on delete cascade;

insert into public.profiles (id, display_name)
select u.id, coalesce(u.raw_user_meta_data->>'display_name', split_part(u.email, '@', 1))
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null;
