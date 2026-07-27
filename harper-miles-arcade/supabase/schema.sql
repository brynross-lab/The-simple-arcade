-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query)

-- Profiles table: one row per signed-up user, holds their display name
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Automatically create a profile row whenever a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Games table: registry of games available on the platform
create table if not exists public.games (
  slug text primary key,
  title text not null,
  created_at timestamptz not null default now()
);

alter table public.games enable row level security;

create policy "Games are viewable by everyone"
  on public.games for select
  using (true);

insert into public.games (slug, title)
values
  ('catch-it', 'Catch It!'),
  ('wiggly-tooth', 'Wiggly Tooth!'),
  ('hungry-hippo', 'Hungry Hippo!'),
  ('tap-attack', 'Tap Attack!'),
  ('fly-swatter', 'Fly Swatter!'),
  ('hungry-caterpillar', 'Hungry Caterpillar!'),
  ('number-hunt', 'Number Hunt!')
on conflict (slug) do nothing;

-- Scores table: every submitted score, per user per game
create table if not exists public.scores (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users on delete cascade not null,
  game_slug text references public.games (slug) on delete cascade not null,
  score integer not null,
  created_at timestamptz not null default now()
);

alter table public.scores enable row level security;

create policy "Scores are viewable by everyone"
  on public.scores for select
  using (true);

create policy "Users can insert their own scores"
  on public.scores for insert
  with check (auth.uid() = user_id);

create index if not exists scores_game_slug_idx on public.scores (game_slug);
create index if not exists scores_user_id_idx on public.scores (user_id);
