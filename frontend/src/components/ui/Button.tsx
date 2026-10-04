import { cn } from '../../lib/cn'
import { Link } from 'react-router-dom'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
  asLink?: string
  href?: string
  onClick?: () => void
  className?: string
  accent?: 'eng' | 'music'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  asLink,
  href,
  onClick,
  className,
  accent = 'eng',
}: ButtonProps) {
  const base = cn(
    'group inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-150 cursor-pointer no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500',
    size === 'sm' ? 'px-3.5 py-1.5 text-xs' : 'px-5 py-2.5 text-sm',
    {
      'bg-cyan-400 hover:bg-cyan-300 text-black shadow-sm': variant === 'primary' && accent === 'eng',
      'bg-amber-400 hover:bg-amber-300 text-black shadow-sm': variant === 'primary' && accent === 'music',
      'bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-zinc-200 hover:text-white': variant === 'secondary',
      'text-zinc-400 hover:text-white hover:bg-white/[0.06]': variant === 'ghost',
    },
    className
  )

  if (asLink) return <Link to={asLink} className={base}>{children}</Link>
  if (href) {
    const isMailto = href.startsWith('mailto:')
    return <a href={href} {...(!isMailto && { target: '_blank', rel: 'noopener noreferrer' })} className={base}>{children}</a>
  }
  return <button onClick={onClick} className={base}>{children}</button>
}
