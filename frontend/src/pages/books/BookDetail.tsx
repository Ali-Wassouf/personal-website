import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ScrollProgress } from '../../components/ui/ScrollProgress'
import { Badge } from '../../components/ui/Badge'
import { PostBody } from '../../components/content/PostBody'
import { formatDate } from '../../lib/dates'
import { api } from '../../lib/api'
import type { Book } from '../../types'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-sm ${i < rating ? 'text-[#f5a623]' : 'text-[#2a2a3e]'}`}>◆</span>
      ))}
      <span className="text-xs text-[#4a4a6a] ml-1">{rating}/5</span>
    </div>
  )
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

  if (loading) return (
    <div className="max-w-3xl mx-auto px-6 py-16 animate-pulse space-y-4">
      <div className="h-4 w-16 bg-[#111118] rounded" />
      <div className="h-8 w-2/3 bg-[#111118] rounded" />
    </div>
  )

  if (error || !book) return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <p className="text-[#8888a8]">Book not found.</p>
      <Link to="/books" className="text-xs text-[#00d4ff] mt-4 block">← back to books</Link>
    </div>
  )

  return (
    <>
      <ScrollProgress />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          to="/books"
          className="inline-flex items-center gap-1 text-xs text-[#8888a8] hover:text-[#00d4ff] transition-colors no-underline mb-10"
        >
          <ArrowLeft size={12} /> books
        </Link>

        <header className="flex flex-col sm:flex-row gap-8 mb-12">
          {book.coverUrl && (
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-32 h-48 object-cover rounded-sm border border-[#2a2a3e] shrink-0"
            />
          )}
          <div className="flex flex-col justify-center gap-3">
            <Badge variant="default">{book.genre}</Badge>
            <h1 className="text-3xl font-bold text-[#e8e8f0] leading-tight">{book.title}</h1>
            <p className="text-sm text-[#8888a8]">{book.author}</p>
            <Stars rating={book.rating} />
            <p className="text-xs text-[#4a4a6a]">reviewed {formatDate(book.publishedAt)}</p>
          </div>
        </header>

        {book.body ? (
          <PostBody content={book.body} />
        ) : (
          <p className="text-[#8888a8] text-sm">{book.excerpt}</p>
        )}
      </div>
    </>
  )
}
