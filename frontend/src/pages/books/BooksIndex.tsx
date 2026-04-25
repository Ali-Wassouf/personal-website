import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { BookCard } from '../../components/content/BookCard'
import { api } from '../../lib/api'
import type { Book } from '../../types'
import { cn } from '../../lib/cn'

const genres = [
  { value: '', label: 'all' },
  { value: 'novels', label: 'novels' },
  { value: 'psychology', label: 'psychology' },
  { value: 'self-improvement', label: 'self-improvement' },
  { value: 'political-science', label: 'political science' },
]

const sections: { status: Book['status']; comment: string }[] = [
  { status: 'finished',    comment: '// finished' },
  { status: 'in-progress', comment: '// in progress' },
  { status: 'to-read',     comment: '// to read' },
]

function CollapsibleSection({ comment, books }: { comment: string; books: Book[] }) {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 mb-6 group"
      >
        <h2 className="text-xs text-[#4a4a6a] tracking-widest group-hover:text-[#8888a8] transition-colors">
          {comment}
        </h2>
        <span className="text-xs text-[#4a4a6a] group-hover:text-[#8888a8] transition-colors">
          ({books.length})
        </span>
        <ChevronDown
          size={12}
          className={cn('text-[#4a4a6a] group-hover:text-[#8888a8] transition-all duration-200', !open && '-rotate-90')}
        />
      </button>
      {open && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}

export function BooksIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const genre = searchParams.get('genre') ?? ''
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.books.list(genre || undefined)
      .then(setBooks)
      .finally(() => setLoading(false))
  }, [genre])

  const byStatus = (status: Book['status']) => books.filter((b) => b.status === status)

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-3">
        <span className="text-xs text-[#4a4a6a] tracking-widest">// reading list</span>
      </div>
      <SectionHeader text="Books" as="h1" className="mb-4" />
      <p className="text-sm text-[#8888a8] max-w-xl mb-8 leading-relaxed">
        What I've been reading — novels, psychology, and the books that changed how I think.
      </p>

      {/* Genre filter */}
      <div className="flex flex-wrap gap-1 mb-10">
        {genres.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setSearchParams(value ? { genre: value } : {})}
            className={cn(
              'px-3 py-1.5 text-xs rounded-sm border transition-all duration-150',
              genre === value
                ? 'border-[#00d4ff33] bg-[#00d4ff1a] text-[#00d4ff]'
                : 'border-[#1e1e2e] bg-transparent text-[#8888a8] hover:text-[#e8e8f0] hover:border-[#2a2a3e]'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-64 rounded-md bg-[#111118] border border-[#1e1e2e] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-14">
          {sections.map(({ status, comment }) => {
            const section = byStatus(status)
            if (section.length === 0) return null
            return (
              <CollapsibleSection key={status} comment={comment} books={section} />
            )
          })}
          {books.length === 0 && (
            <p className="text-sm text-[#4a4a6a]">No books added yet.</p>
          )}
        </div>
      )}
    </div>
  )
}
