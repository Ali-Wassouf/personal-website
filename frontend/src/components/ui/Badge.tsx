import { cn } from '../../lib/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'eng' | 'music' | 'default' | 'thoughts' | 'personal'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border',
        {
          'bg-[#22d3ee12] text-[#22d3ee] border-[#22d3ee25]': variant === 'eng' || variant === 'thoughts',
          'bg-[#fb923c12] text-[#fb923c] border-[#fb923c25]': variant === 'music',
          'bg-[#ffffff08] text-[#8080a8] border-[#252540]': variant === 'default',
          'bg-[#a855f712] text-[#a855f7] border-[#a855f725]': variant === 'personal',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
