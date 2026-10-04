import { Disc3, Headphones, Play, Radio, Tv2 } from 'lucide-react'
import { cn } from '../../lib/cn'

export type Platform = 'spotify' | 'youtube' | 'youtubeMusic' | 'appleMusic' | 'soundcloud'

interface PlatformLinkProps {
  platform: Platform
  href: string
  variant?: 'pill' | 'compact'
}

const platforms: Record<Platform, { label: string; short: string; Icon: React.ElementType; pill: string }> = {
  spotify:      { label: 'Spotify',       short: 'Spotify',    Icon: Disc3,      pill: 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-300' },
  youtube:      { label: 'YouTube',       short: 'YouTube',    Icon: Play,       pill: 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-300' },
  youtubeMusic: { label: 'YouTube Music', short: 'YT Music',   Icon: Tv2,        pill: 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-300' },
  appleMusic:   { label: 'Apple Music',   short: 'Apple',      Icon: Headphones, pill: 'bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/30 text-pink-300' },
  soundcloud:   { label: 'SoundCloud',    short: 'SoundCloud', Icon: Radio,      pill: 'bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/30 text-orange-300' },
}

export function PlatformLink({ platform, href, variant = 'pill' }: PlatformLinkProps) {
  const { label, short, Icon, pill } = platforms[platform]

  if (variant === 'compact') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Listen on ${label}`}
        className="py-1 px-2 rounded bg-white/[0.03] hover:bg-white/[0.08] text-[11px] font-mono text-center text-zinc-300 hover:text-white transition-colors no-underline"
      >
        {short}
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Listen on ${label}`}
      className={cn('inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-medium transition-colors no-underline', pill)}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </a>
  )
}

const PLATFORM_ORDER: Platform[] = ['spotify', 'youtube', 'youtubeMusic', 'appleMusic', 'soundcloud']

/** Platforms with a URL, in a stable display order. */
export function activePlatforms(platforms: Partial<Record<Platform, string | null>>): [Platform, string][] {
  return PLATFORM_ORDER
    .filter((p) => platforms[p])
    .map((p) => [p, platforms[p] as string])
}
