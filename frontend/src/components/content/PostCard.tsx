import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { formatDate } from '../../lib/dates'
import { readingTime } from '../../lib/readingTime'
import type { Post } from '../../types'

export function PostCard({ post }: { post: Post }) {
  const isThoughts = post.category === 'thoughts'

  return (
    <Link
      to={`/writing/${post.slug}`}
      className={`group relative block p-5 border border-[#1a1a2e] rounded-xl bg-[#0f0f1a] transition-all duration-300 no-underline overflow-hidden ${isThoughts ? 'hover:border-[#22d3ee28] glow-cyan accent-bar-cyan' : 'hover:border-[#a855f728] glow-violet accent-bar-violet'}`}
    >
      {/* Inner radial glow */}
      <div className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isThoughts ? 'bg-[radial-gradient(ellipse_at_top_left,#22d3ee07_0%,transparent_60%)]' : 'bg-[radial-gradient(ellipse_at_top_left,#a855f707_0%,transparent_60%)]'}`} />

      <div className="relative flex items-start justify-between gap-4 mb-3">
        <Badge variant={post.category}>{post.category}</Badge>
        <span className="text-xs text-[#44446a] shrink-0">{formatDate(post.publishedAt)}</span>
      </div>

      <h3 className={`relative text-base font-semibold text-[#eeeef5] mb-2 leading-snug transition-colors duration-200 ${isThoughts ? 'group-hover:text-[#22d3ee]' : 'group-hover:text-[#a855f7]'}`}>
        {post.title}
      </h3>

      <p className="relative text-sm text-[#8080a8] line-clamp-2 mb-4">{post.excerpt}</p>

      <div className="relative flex items-center justify-between">
        <span className="text-xs text-[#44446a]">{readingTime(post.wordCount)}</span>
        <ArrowRight size={14} className={`text-[#44446a] group-hover:translate-x-1 transition-all duration-200 ${isThoughts ? 'group-hover:text-[#22d3ee]' : 'group-hover:text-[#a855f7]'}`} />
      </div>
    </Link>
  )
}
