'use client'

import { useEffect, useRef } from 'react'

export default function GameFrame({ slug }: { slug: string }) {
  const savedRef = useRef(false)

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const data = event.data
      if (!data || data.type !== 'GAME_OVER' || typeof data.score !== 'number') return

      // simple guard against duplicate posts from a single game-over
      if (savedRef.current) return
      savedRef.current = true
      setTimeout(() => (savedRef.current = false), 500)

      fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameSlug: slug, score: data.score }),
      }).catch(() => {
        // best-effort; a failed score save shouldn't break the game
      })
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [slug])

  return (
    <iframe
      src={`/games-static/${slug}.html`}
      className="w-full h-full border-0"
      title={slug}
    />
  )
}
