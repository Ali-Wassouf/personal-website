import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'
import { SegmentedControl } from '../../components/ui/SegmentedControl'
import { BookCard } from '../../components/content/BookCard'
import { api } from '../../lib/api'
import type { Book } from '../../types'
import { cn } from '../../lib/cn'

const genres = [
  { value: '', label: 'All subjects' },
  { value: 'novels', label: 'Novels' },
  { value: 'psychology', label: 'Psychology' },
  { value: 'self-improvement', label: 'Self-improvement' },
  { value: 'political-science', label: 'Politics & philosophy' },
]

const sections: { status: Book['status']; label: string }[] = [
  { status: 'finished',    label: 'Finished' },
  { status: 'in-progress', label: 'Reading now' },
  { status: 'to-read',     label: 'Up next' },
]

function CollapsibleSection({ label, books }: { label: string; books: Book[] }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="space-y-6">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group w-full flex items-center justify-between pb-3 text-xs font-mono border-b border-white/[0.06]"
      >
        <span className="flex items-center gap-2 uppercase tracking-wider font-semibold text-zinc-300 group-hover:text-white transition-colors">
          <ChevronDown size={13} className={cn('text-zinc-500 transition-transform duration-200', !open && '-rotate-90')} />
          {label}
        </span>
        <span className="text-zinc-500">{books.length} {books.length === 1 ? 'book' : 'books'}</span>
      </button>
      {open && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
      <PageHeader
        kicker="reading list & notes"
        title="Books"
        description="What I've been reading — novels, psychology, and the books that changed how I think."
      />

      <div className="mt-8">
        <SegmentedControl
          options={genres}
          value={genre}
          onChange={(value) => setSearchParams(value ? { genre: value } : {})}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[2/3.6] rounded-2xl bg-white/[0.02] border border-white/[0.08] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-14">
            {sections.map(({ status, label }) => {
              const section = books.filter((b) => b.status === status)
              if (section.length === 0) return null
              return <CollapsibleSection key={status} label={label} books={section} />
            })}
            {books.length === 0 && <p className="text-sm text-zinc-500">No books here yet.</p>}
          </div>
        )}
      </div>
    </div>
  )
}
