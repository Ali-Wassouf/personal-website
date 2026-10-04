import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { MetaRow } from '../ui/MetaRow'
import { cn } from '../../lib/cn'
import { formatDate } from '../../lib/dates'
import { readingTime } from '../../lib/readingTime'
import type { Post } from '../../types'

export function PostCard({ post }: { post: Post }) {
  const isPersonal = post.category === 'personal'

  return (
    <Link
      to={`/writing/${post.slug}`}
      className={cn(
        'group flex flex-col md:flex-row md:items-start justify-between gap-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] p-6 sm:p-7 transition-all duration-200 no-underline',
        isPersonal ? 'hover:border-indigo-400/30' : 'hover:border-cyan-500/30'
      )}
    >
      <div className="space-y-3 flex-1 min-w-0">
        <MetaRow
          items={[
            <span className={cn('capitalize', isPersonal ? 'text-indigo-300' : 'text-cyan-400')}>{post.category}</span>,
            formatDate(post.publishedAt),
            readingTime(post.wordCount),
          ]}
        />
        <h3 className={cn(
          'text-xl sm:text-2xl font-bold text-white transition-colors leading-snug',
          isPersonal ? 'group-hover:text-indigo-200' : 'group-hover:text-cyan-300'
        )}>
          {post.title}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl line-clamp-2">{post.excerpt}</p>
      </div>

      <div className={cn(
        'hidden md:flex items-center gap-1.5 text-xs font-mono text-zinc-400 shrink-0 self-center transition-colors',
        isPersonal ? 'group-hover:text-indigo-300' : 'group-hover:text-cyan-400'
      )}>
        Read essay
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}
