import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { GAMES } from '@/lib/games'

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', user.id)
    .single()

  const displayName = profile?.display_name ?? user.email

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300">
      <header className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-orange-700">
            Harper & Miles&rsquo;s Arcade
          </h1>
          <p className="text-orange-800/70 text-sm mt-0.5">
            Welcome back, {displayName}!
          </p>
        </div>
        <form action="/logout" method="post">
          <button
            type="submit"
            className="text-sm font-medium text-orange-700 bg-white/70 hover:bg-white px-4 py-2 rounded-full transition"
          >
            Log out
          </button>
        </form>
      </header>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {GAMES.map((game) => (
            <Link
              key={game.slug}
              href={`/games/${game.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${game.color} p-6 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-transform`}
            >
              <div className="text-5xl mb-3">{game.emoji}</div>
              <h2 className="text-xl font-bold text-white">{game.title}</h2>
              <p className="text-white/85 text-sm mt-1">{game.description}</p>
              <span className="inline-block mt-4 text-white font-semibold text-sm bg-black/20 rounded-full px-3 py-1">
                Play &rarr;
              </span>
            </Link>
          ))}

          <div className="rounded-2xl border-2 border-dashed border-orange-400/50 flex items-center justify-center p-6 text-center text-orange-700/60 font-medium">
            More games coming soon
          </div>
        </div>
      </section>
    </main>
  )
}
