import { Fragment } from 'react'
import { cn } from '../../lib/cn'

/** Mono metadata separated by middots — e.g. "thoughts · Jan 08, 2025 · 5 min read" */
export function MetaRow({ items, className }: { items: React.ReactNode[]; className?: string }) {
  const visible = items.filter(Boolean)
  return (
    <div className={cn('flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-zinc-400', className)}>
      {visible.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && <span aria-hidden="true">·</span>}
          {item}
        </Fragment>
      ))}
    </div>
  )
}
