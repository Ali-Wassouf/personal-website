import { Music2, PlayCircle, Headphones, Radio, Tv2 } from 'lucide-react'
import { cn } from '../../lib/cn'

type Platform = 'spotify' | 'youtube' | 'youtubeMusic' | 'appleMusic' | 'soundcloud'

interface PlatformLinkProps {
  platform: Platform
  href: string
  size?: 'sm' | 'md' | 'lg'
}

const platforms: Record<Platform, { label: string; Icon: React.ElementType; color: string }> = {
  spotify:      { label: 'Spotify',       Icon: Music2,      color: '#1db954' },
  youtube:      { label: 'YouTube',       Icon: PlayCircle,  color: '#ff0000' },
  youtubeMusic: { label: 'YouTube Music', Icon: Tv2,         color: '#ff0000' },
  appleMusic:   { label: 'Apple Music',   Icon: Headphones,  color: '#fc3c44' },
  soundcloud:   { label: 'SoundCloud',    Icon: Radio,       color: '#fb923c' },
}

export function PlatformLink({ platform, href, size = 'md' }: PlatformLinkProps) {
  const { label, Icon, color } = platforms[platform]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Listen on ${label}`}
      title={`Listen on ${label}`}
      className={cn(
        'inline-flex items-center gap-2 border border-[#252540] rounded-lg bg-[#0f0f1a] transition-all duration-200 no-underline group hover:bg-[#161625]',
        size === 'sm'  ? 'px-3 py-1.5 text-xs' :
        size === 'lg'  ? 'px-5 py-3 text-sm'   : 'px-4 py-2 text-sm',
      )}
      style={{ '--platform-color': color } as React.CSSProperties}
    >
      <Icon
        size={size === 'sm' ? 12 : size === 'lg' ? 18 : 15}
        style={{ color }}
      />
      <span className="text-[#8080a8] group-hover:text-[#eeeef5] transition-colors duration-200">
        {label}
      </span>
    </a>
  )
}
