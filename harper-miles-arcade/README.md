# Harper & Miles's Arcade

A little home arcade platform: email/password accounts, per-player saved high
scores, and a growing shelf of games built together. Six games included so
far: **Catch It!**, **Wiggly Tooth!**, **Hungry Hippo!**, **Tap Attack!**,
**Fly Swatter!**, and **Hungry Caterpillar!**

## How it's built

- **Next.js** (App Router) — pages + API routes, one project
- **Supabase** — free Postgres database + built-in email/password auth
- **Tailwind CSS** — styling
- Games are self-contained HTML files in `public/games-static/`, loaded in an
  iframe. Each game reports its score back to the arcade via
  `window.parent.postMessage({ type: 'GAME_OVER', score })` on game over.

## One-time setup

### 1. Create a free Supabase project

Go to supabase.com, sign up, and create a new project.

### 2. Run the database schema

In your Supabase project, go to **SQL Editor > New query**, paste in the
contents of `supabase/schema.sql`, and run it. This creates:
- `profiles` — one row per signed-up user (auto-created on signup)
- `games` — registry of games (pre-seeded with all six games above)
- `scores` — every submitted score, readable by everyone, writable only by
  the account that earned it (enforced by Postgres row-level security)

### 3. Add your Supabase keys

In your Supabase project, go to **Project Settings > API**. Copy the
**Project URL** and the **anon / public key**.

Copy `.env.local.example` to `.env.local` and fill them in:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### 4. Install and run

```bash
npm install
npm run dev
```

Open http://localhost:3000. You'll be redirected to `/signup` to create the
first account.

## Adding a new game

1. Build the game as a single self-contained HTML file (like `catch-it.html`
   in `public/games-static/`).
2. Before you show the game-over screen, add:
   ```js
   window.parent.postMessage({ type: 'GAME_OVER', score: score }, '*');
   ```
   (wrap in try/catch — it's a no-op if the game is opened outside the arcade)
3. Drop the file into `public/games-static/your-game.html`.
4. Add an entry to `src/lib/games.ts`:
   ```ts
   {
     slug: 'your-game',
     title: 'Your Game',
     description: 'One line describing it.',
     emoji: '🎮',
     color: 'from-blue-400 to-purple-500',
   }
   ```
5. Add the same slug to the `games` table in Supabase (Table Editor, or via
   SQL: `insert into public.games (slug, title) values ('your-game', 'Your Game');`)

That's it — it'll show up on the home page grid automatically, and its
leaderboard will work the same way.

## Deploying so friends can play

1. Push this project to a GitHub repo.
2. Go to vercel.com, sign up (free), and import the repo.
3. Add the same two environment variables from `.env.local` in Vercel's
   project settings (**Settings > Environment Variables**).
4. Deploy. You'll get a URL like `harper-miles-arcade.vercel.app` to share.

## Notes on the prototype

- Passwords are handled entirely by Supabase Auth — this app never sees or
  stores raw passwords.
- Anyone can sign up with any email/password — there's no invite-only gate
  yet. If you want to restrict signups to people you approve, that's a
  reasonable next step (e.g. an allow-list, or switching to invite links).
- Scores are public (anyone can see the leaderboard for a game), but a user
  can only ever submit a score under their own account — this is enforced by
  the database itself, not just the app code.
