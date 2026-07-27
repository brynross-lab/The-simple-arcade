import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { GAMES } from '@/lib/games'
import { Logo } from '@/components/Logo'
import { Landing } from '@/components/Landing'

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <Landing />
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', user.id)
    .single()

  const displayName = profile?.display_name ?? user.email

  return (
    <main className="min-h-screen bg-[#FFF6E9]">
      <header className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <Logo size={44} />
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#26265A]">
              The Simple Arcade
            </h1>
            <p className="text-[#26265A]/60 text-sm mt-0.5">
              Welcome back, {displayName}!
            </p>
          </div>
        </div>
        <form action="/logout" method="post">
          <button
            type="submit"
            className="text-sm font-bold text-[#26265A] bg-white hover:bg-white/80 px-4 py-2 rounded-full transition shadow-sm"
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
              <h2 className="font-display text-xl font-bold text-white">{game.title}</h2>
              <p className="text-white/85 text-sm mt-1">{game.description}</p>
              <span className="inline-block mt-4 text-white font-bold text-sm bg-black/20 rounded-full px-3 py-1">
                Play &rarr;
              </span>
            </Link>
          ))}

          <div className="rounded-2xl border-2 border-dashed border-[#26265A]/15 flex items-center justify-center p-6 text-center text-[#26265A]/50 font-bold">
            More games coming soon
          </div>
        </div>
      </section>
    </main>
  )
}
