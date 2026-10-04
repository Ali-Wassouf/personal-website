import { cn } from '../../lib/cn'

interface PageHeaderProps {
  kicker: string
  title: string
  description?: string
  accent?: 'eng' | 'music'
  as?: 'h1' | 'h2'
  /** Rendered beside the title block on wide screens (filters, counts, …) */
  aside?: React.ReactNode
  className?: string
}

export function PageHeader({
  kicker,
  title,
  description,
  accent = 'eng',
  as: Tag = 'h1',
  aside,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-end justify-between gap-6',
        aside && 'pb-10 border-b border-white/[0.06]',
        className
      )}
    >
      <div className="space-y-3 max-w-2xl">
        <div className={cn('text-xs font-mono tracking-wide', accent === 'music' ? 'text-amber-400' : 'text-cyan-400')}>
          {kicker}
        </div>
        <Tag className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          {title}
        </Tag>
        {description && (
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">{description}</p>
        )}
      </div>
      {aside && <div className="self-start md:self-end">{aside}</div>}
    </div>
  )
}
