import { cn } from '../../lib/cn'
import { Link } from 'react-router-dom'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'ghost' | 'outline'
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
    'inline-flex items-center gap-2 font-medium transition-all duration-200 border rounded-lg cursor-pointer no-underline',
    size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-5 py-2.5 text-sm',
    {
      // Primary eng — gradient bg
      'text-[#08080e] border-transparent bg-gradient-to-r from-[#22d3ee] to-[#a855f7] hover:opacity-90 hover:shadow-[0_0_20px_#22d3ee30]':
        variant === 'primary' && accent === 'eng',
      // Primary music — gradient bg
      'text-[#08080e] border-transparent bg-gradient-to-r from-[#a855f7] to-[#fb923c] hover:opacity-90 hover:shadow-[0_0_20px_#fb923c30]':
        variant === 'primary' && accent === 'music',
      // Outline eng
      'bg-transparent text-[#22d3ee] border-[#22d3ee30] hover:border-[#22d3ee60] hover:bg-[#22d3ee0c] hover:shadow-[0_0_16px_#22d3ee18]':
        variant === 'outline' && accent === 'eng',
      // Outline music
      'bg-transparent text-[#fb923c] border-[#fb923c30] hover:border-[#fb923c60] hover:bg-[#fb923c0c] hover:shadow-[0_0_16px_#fb923c18]':
        variant === 'outline' && accent === 'music',
      // Ghost
      'bg-transparent text-[#8080a8] border-transparent hover:text-[#eeeef5] hover:bg-[#ffffff08]':
        variant === 'ghost',
    },
    className
  )

  if (asLink) return <Link to={asLink} className={base}>{children}</Link>
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={base}>{children}</a>
  return <button onClick={onClick} className={base}>{children}</button>
}
