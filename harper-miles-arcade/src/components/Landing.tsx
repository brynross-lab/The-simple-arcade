import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { GAMES } from '@/lib/games'

export function Landing() {
  return (
    <main className="min-h-screen bg-[#FFF6E9] relative overflow-hidden flex flex-col">
      {/* decorative rainbow arcs behind the hero */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 flex justify-center">
        <svg width="720" height="360" viewBox="0 0 720 360" className="opacity-70">
          <path d="M40 360 A320 320 0 0 1 680 360" fill="none" stroke="#FFC93C" strokeWidth="26" />
          <path d="M90 360 A270 270 0 0 1 630 360" fill="none" stroke="#4ECDC4" strokeWidth="26" />
          <path d="M140 360 A220 220 0 0 1 580 360" fill="none" stroke="#FF6FA5" strokeWidth="26" />
          <path d="M190 360 A170 170 0 0 1 530 360" fill="none" stroke="#6BCB77" strokeWidth="26" />
        </svg>
      </div>

      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="animate-[bounce_2.2s_ease-in-out_infinite]">
          <Logo size={88} />
        </div>

        <h1 className="font-display mt-5 text-5xl sm:text-6xl font-extrabold text-[#26265A] tracking-tight">
          The Simple Arcade
        </h1>
        <p className="mt-3 text-lg text-[#26265A]/70 max-w-md">
          A homemade arcade, built one game at a time — jump in and play!
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/signup"
            className="px-8 py-3.5 rounded-full bg-[#FF6FA5] text-white font-bold text-lg shadow-[0_6px_0_#c94b7a] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_#c94b7a] transition"
          >
            Start Playing
          </Link>
          <Link
            href="/login"
            className="px-8 py-3.5 rounded-full bg-white text-[#26265A] font-bold text-lg border-2 border-[#26265A]/10 shadow-[0_6px_0_#e3dbc9] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_#e3dbc9] transition"
          >
            I Have an Account
          </Link>
        </div>

        <div className="mt-14 w-full max-w-lg">
          <p className="text-sm font-bold text-[#26265A]/50 uppercase tracking-wide mb-3">
            Games inside
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {GAMES.map((game) => (
              <div
                key={game.slug}
                className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl"
                title={game.title}
              >
                {game.emoji}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
