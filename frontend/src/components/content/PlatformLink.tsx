import { Music2, PlayCircle, Headphones, Radio } from 'lucide-react'
import { cn } from '../../lib/cn'

interface PlatformLinkProps {
  platform: 'spotify' | 'youtubeMusic' | 'appleMusic' | 'soundcloud'
  href: string
  size?: 'sm' | 'md' | 'lg'
}

const platforms = {
  spotify: { label: 'Spotify', Icon: Music2, color: '#1db954' },
  youtubeMusic: { label: 'YouTube Music', Icon: PlayCircle, color: '#ff0000' },
  appleMusic: { label: 'Apple Music', Icon: Headphones, color: '#fc3c44' },
  soundcloud: { label: 'SoundCloud', Icon: Radio, color: '#f5a623' },
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
        'inline-flex items-center gap-2 border border-[#2a2a3e] rounded-sm bg-[#111118] transition-all duration-200 no-underline group',
        size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-5 py-3 text-sm' : 'px-4 py-2 text-sm',
        'hover:border-current'
      )}
      style={{ '--hover-color': color } as React.CSSProperties}
    >
      <Icon
        size={size === 'sm' ? 12 : size === 'lg' ? 18 : 16}
        className="transition-colors duration-200"
        style={{ color }}
      />
      <span className="text-[#8888a8] group-hover:text-[#e8e8f0] transition-colors duration-200">
        {label}
      </span>
    </a>
  )
}
