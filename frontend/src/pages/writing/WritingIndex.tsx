import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '../../components/ui/PageHeader'
import { SegmentedControl } from '../../components/ui/SegmentedControl'
import { PostCard } from '../../components/content/PostCard'
import { api } from '../../lib/api'
import type { Post } from '../../types'

const categories = [
  { value: '', label: 'All essays' },
  { value: 'thoughts', label: 'Thoughts' },
  { value: 'personal', label: 'Personal' },
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
      <PageHeader
        kicker="essays & observations"
        title="Writing"
        description="Thoughts on engineering, the industry, books, and life. Unfiltered."
        aside={
          <SegmentedControl
            options={categories}
            value={category}
            onChange={(value) => setSearchParams(value ? { category: value } : {})}
          />
        }
      />

      <div className="mt-8">
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-36 rounded-2xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-500">No posts yet.</p>
        )}
      </div>
    </div>
  )
}
