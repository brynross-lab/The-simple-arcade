import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getGame } from '@/lib/games'
import GameFrame from './GameFrame'

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const game = getGame(slug)
  if (!game) notFound()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: topScores } = await supabase
    .from('scores')
    .select('score, created_at, profiles(display_name)')
    .eq('game_slug', slug)
    .order('score', { ascending: false })
    .limit(10)

  return (
    <main className="min-h-screen bg-[#FFF6E9]">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-[#26265A] font-bold text-sm">
          &larr; Back to arcade
        </Link>
        <h1 className="font-display text-lg font-bold text-[#26265A]">{game.title}</h1>
        <div className="w-24" />
      </div>

      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-[1fr_260px] gap-6 pb-10">
        <div className="rounded-2xl overflow-hidden shadow-xl border border-[#26265A]/10 bg-black" style={{ aspectRatio: '9 / 16', maxHeight: '80vh', margin: '0 auto', width: '100%', maxWidth: 480 }}>
          <GameFrame slug={slug} />
        </div>

        <aside className="bg-white rounded-2xl p-4 h-fit shadow-sm">
          <h2 className="font-display font-bold text-[#26265A] mb-3">Top Scores</h2>
          <ol className="space-y-2">
            {topScores && topScores.length > 0 ? (
              topScores.map((s, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-[#26265A]/80">
                    {i + 1}. {(s as unknown as { profiles: { display_name: string } | null }).profiles?.display_name ?? 'Someone'}
                  </span>
                  <span className="font-bold text-[#FF6FA5]">{s.score}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-[#26265A]/50">No scores yet — be the first!</li>
            )}
          </ol>
        </aside>
      </div>
    </main>
  )
}
