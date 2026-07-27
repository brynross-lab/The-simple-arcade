'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Logo } from '@/components/Logo'

export default function SignupPage() {
  const router = useRouter()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FFF6E9] px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <Logo size={56} />
        </div>
        <h1 className="font-display text-3xl font-extrabold text-center text-[#26265A] mb-1">
          Join the Arcade
        </h1>
        <p className="text-center text-[#26265A]/60 mb-6 text-sm">
          Create an account to play and save your high scores.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#26265A] mb-1">
              Your name
            </label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-xl border-2 border-[#26265A]/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6FA5]"
              placeholder="Harper"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#26265A] mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-2 border-[#26265A]/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6FA5]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#26265A] mb-1">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border-2 border-[#26265A]/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6FA5]"
              placeholder="At least 6 characters"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF6FA5] hover:bg-[#ff5c98] disabled:opacity-50 text-white font-bold py-3 rounded-full shadow-[0_5px_0_#c94b7a] active:translate-y-0.5 active:shadow-[0_2px_0_#c94b7a] transition"
          >
            {loading ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <p className="text-center text-sm text-[#26265A]/60 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#FF6FA5] font-bold">
            Log in
          </Link>
        </p>
      </div>
    </main>
  )
}
