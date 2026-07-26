-- Run this in the Supabase SQL Editor if you already ran schema.sql once
-- (back when only Catch It existed) and just need to register the new games.
-- Safe to run even if some of these already exist, thanks to ON CONFLICT.

insert into public.games (slug, title)
values
  ('wiggly-tooth', 'Wiggly Tooth!'),
  ('hungry-hippo', 'Hungry Hippo!'),
  ('tap-attack', 'Tap Attack!'),
  ('fly-swatter', 'Fly Swatter!'),
  ('hungry-caterpillar', 'Hungry Caterpillar!')
on conflict (slug) do nothing;
