import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ScrollProgress } from '../../components/ui/ScrollProgress'
import { BackLink } from '../../components/ui/BackLink'
import { MetaRow } from '../../components/ui/MetaRow'
import { ArticleSkeleton, NotFoundState } from '../../components/ui/PageState'
import { PostBody } from '../../components/content/PostBody'
import { BookCover, Rating } from '../../components/content/BookCard'
import { formatDate } from '../../lib/dates'
import { api } from '../../lib/api'
import type { Book } from '../../types'

const statusLabel: Record<Book['status'], string> = {
  finished: 'Finished',
  'in-progress': 'Reading now',
  'to-read': 'Up next',
}

export function BookDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!slug) return
    api.books.get(slug)
      .then(setBook)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <ArticleSkeleton />
  if (error || !book) return <NotFoundState message="Book not found." to="/books" label="back to books" />

  return (
    <>
      <ScrollProgress />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
        <BackLink to="/books" label="books" />

        <header className="mt-10 mb-12 flex flex-col sm:flex-row gap-8 items-start">
          <BookCover book={book} className="w-36 sm:w-44 aspect-[2/3] shrink-0" />

          <div className="space-y-4 min-w-0">
            <MetaRow
              items={[
                <span className="text-cyan-400 capitalize">{book.genre.replace('-', ' ')}</span>,
                statusLabel[book.status],
                `Reviewed ${formatDate(book.publishedAt)}`,
              ]}
            />
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-5xl font-medium text-white leading-tight">{book.title}</h1>
              <p className="text-base text-zinc-400">by {book.author}</p>
            </div>
            {book.rating != null && (
              <div className="inline-flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-xs font-mono text-zinc-400">Rating</span>
                <Rating rating={book.rating} className="text-sm tracking-widest" />
                <span className="text-xs font-mono text-zinc-500">{book.rating}/5</span>
              </div>
            )}
          </div>
        </header>

        {book.body ? <PostBody content={book.body} /> : <p className="text-zinc-400 text-sm">{book.excerpt}</p>}
      </article>
    </>
  )
}
