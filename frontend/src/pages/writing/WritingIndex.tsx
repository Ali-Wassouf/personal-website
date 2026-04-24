import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { PostCard } from '../../components/content/PostCard'
import { api } from '../../lib/api'
import type { Post } from '../../types'
import { cn } from '../../lib/cn'

const categories = [
  { value: '', label: 'all' },
  { value: 'thoughts', label: 'thoughts' },
  { value: 'personal', label: 'personal' },
]

export function WritingIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') ?? ''
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.posts.list({ category: category || undefined })
      .then(setPosts)
      .finally(() => setLoading(false))
  }, [category])

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-3">
        <span className="text-xs text-[#4a4a6a] tracking-widest">// writing</span>
      </div>
      <SectionHeader text="Writing" as="h1" className="mb-4" />
      <p className="text-sm text-[#8888a8] max-w-xl mb-8 leading-relaxed">
        Thoughts on engineering, the industry, books, and life. Unfiltered.
      </p>

      {/* Filter */}
      <div className="flex gap-1 mb-10">
        {categories.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setSearchParams(value ? { category: value } : {})}
            className={cn(
              'px-3 py-1.5 text-xs rounded-sm border transition-all duration-150',
              category === value
                ? 'border-[#00d4ff33] bg-[#00d4ff1a] text-[#00d4ff]'
                : 'border-[#1e1e2e] bg-transparent text-[#8888a8] hover:text-[#e8e8f0] hover:border-[#2a2a3e]'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 rounded-md bg-[#111118] border border-[#1e1e2e] animate-pulse" />
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#4a4a6a]">No posts yet.</p>
      )}
    </div>
  )
}
