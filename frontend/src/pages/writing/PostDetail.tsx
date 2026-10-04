import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ScrollProgress } from '../../components/ui/ScrollProgress'
import { BackLink } from '../../components/ui/BackLink'
import { MetaRow } from '../../components/ui/MetaRow'
import { ArticleSkeleton, NotFoundState } from '../../components/ui/PageState'
import { PostBody } from '../../components/content/PostBody'
import { SITE } from '../../lib/site'
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

  if (loading) return <ArticleSkeleton />
  if (error || !post) return <NotFoundState message="Post not found." to="/writing" label="back to writing" />

  const isPersonal = post.category === 'personal'

  return (
    <>
      <ScrollProgress />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
        <BackLink to="/writing" label="writing" />

        <header className="mt-10 mb-12 space-y-5">
          <MetaRow
            items={[
              <span className={isPersonal ? 'text-indigo-300 capitalize' : 'text-cyan-400 capitalize'}>{post.category}</span>,
              formatDate(post.publishedAt),
              readingTime(post.wordCount),
            ]}
          />
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className={`font-serif text-lg sm:text-xl text-zinc-300 italic leading-relaxed border-l-2 pl-4 py-1 ${isPersonal ? 'border-indigo-400/60' : 'border-cyan-400/60'}`}>
              {post.excerpt}
            </p>
          )}
        </header>

        {post.body ? <PostBody content={post.body} /> : <p className="text-zinc-400 text-sm">{post.excerpt}</p>}

        <footer className="mt-16 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">{SITE.name}</span>
            <span>·</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <BackLink to="/writing" label="All writing" />
        </footer>
      </article>
    </>
  )
}
