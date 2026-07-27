-- Run this in the Supabase SQL Editor to register the new Number Hunt game
-- (only needs to be run once)

insert into public.games (slug, title)
values ('number-hunt', 'Number Hunt!')
on conflict (slug) do nothing;
