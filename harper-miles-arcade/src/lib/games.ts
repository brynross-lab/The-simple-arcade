export type GameDef = {
  slug: string
  title: string
  description: string
  emoji: string
  color: string // tailwind gradient classes for the tile
}

export const GAMES: GameDef[] = [
  {
    slug: 'catch-it',
    title: 'Catch It!',
    description: 'Catch the apples and oranges before the gummy worms get them.',
    emoji: '🍎',
    color: 'from-red-400 to-orange-500',
  },
  {
    slug: 'wiggly-tooth',
    title: 'Wiggly Tooth!',
    description: 'Grab the loose tooth and wiggle it out as fast as you can.',
    emoji: '🦷',
    color: 'from-pink-400 to-rose-500',
  },
  {
    slug: 'hungry-hippo',
    title: 'Hungry Hippo!',
    description: 'Tap watermelons to send the hippo running to gobble them up.',
    emoji: '🦛',
    color: 'from-lime-400 to-green-600',
  },
  {
    slug: 'tap-attack',
    title: 'Tap Attack!',
    description: 'Tap the button as many times as you can in 30 seconds.',
    emoji: '👆',
    color: 'from-amber-400 to-orange-600',
  },
  {
    slug: 'fly-swatter',
    title: 'Fly Swatter!',
    description: 'Swat the buzzing, darting flies before they get away.',
    emoji: '🪰',
    color: 'from-stone-400 to-neutral-600',
  },
  {
    slug: 'hungry-caterpillar',
    title: 'Hungry Caterpillar!',
    description: 'Drag the caterpillar to eat fruit and treats — don\'t run into yourself!',
    emoji: '🐛',
    color: 'from-green-400 to-emerald-600',
  },
]

export function getGame(slug: string): GameDef | undefined {
  return GAMES.find((g) => g.slug === slug)
}
