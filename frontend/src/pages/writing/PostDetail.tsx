import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ScrollProgress } from '../../components/ui/ScrollProgress'
import { Badge } from '../../components/ui/Badge'
import { PostBody } from '../../components/content/PostBody'
import { formatDate } from '../../lib/dates'
import { readingTime } from '../../lib/readingTime'
import { api } from '../../lib/api'
import type { Post } from '../../types'

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!slug) return
    api.posts.get(slug)
      .then(setPost)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div className="max-w-3xl mx-auto px-6 py-16 animate-pulse space-y-4">
      <div className="h-4 w-16 bg-[#111118] rounded" />
      <div className="h-8 w-2/3 bg-[#111118] rounded" />
    </div>
  )

  if (error || !post) return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <p className="text-[#8888a8]">Post not found.</p>
      <Link to="/writing" className="text-xs text-[#00d4ff] mt-4 block">← back to writing</Link>
    </div>
  )

  return (
    <>
      <ScrollProgress />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          to="/writing"
          className="inline-flex items-center gap-1 text-xs text-[#8888a8] hover:text-[#00d4ff] transition-colors no-underline mb-10"
        >
          <ArrowLeft size={12} /> writing
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant={post.category}>{post.category}</Badge>
            <span className="text-xs text-[#4a4a6a]">{formatDate(post.publishedAt)}</span>
            <span className="text-xs text-[#4a4a6a]">·</span>
            <span className="text-xs text-[#4a4a6a]">{readingTime(post.wordCount)}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#e8e8f0] leading-tight">
            {post.title}
          </h1>
        </header>

        {post.body ? (
          <PostBody content={post.body} />
        ) : (
          <p className="text-[#8888a8] text-sm">{post.excerpt}</p>
        )}

        {post.tags.length > 0 && (
          <footer className="mt-12 pt-8 border-t border-[#1e1e2e]">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs text-[#4a4a6a] border border-[#1e1e2e] rounded-sm px-2 py-0.5">
                  #{tag}
                </span>
              ))}
            </div>
          </footer>
        )}
      </div>
    </>
  )
}
