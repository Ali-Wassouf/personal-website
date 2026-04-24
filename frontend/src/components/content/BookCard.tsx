import { Link } from 'react-router-dom'
import { Badge } from '../ui/Badge'
import type { Book } from '../../types'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-xs ${i < rating ? 'text-[#f5a623]' : 'text-[#2a2a3e]'}`}
        >
          ◆
        </span>
      ))}
    </div>
  )
}

export function BookCard({ book }: { book: Book }) {
  return (
    <Link
      to={`/books/${book.slug}`}
      className="group block p-5 border border-[#1e1e2e] rounded-md bg-[#111118] hover:border-[#2a2a3e] hover:bg-[#1a1a24] transition-all duration-200 no-underline"
    >
      {book.coverUrl && (
        <div className="aspect-[2/3] mb-4 overflow-hidden rounded-sm border border-[#1e1e2e] bg-[#0d1117]">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <Badge variant="default" className="mb-2">{book.genre}</Badge>
      <h3 className="text-sm font-bold text-[#e8e8f0] mb-1 leading-snug group-hover:text-[#00d4ff] transition-colors">
        {book.title}
      </h3>
      <p className="text-xs text-[#8888a8] mb-3">{book.author}</p>
      <Stars rating={book.rating} />
    </Link>
  )
}
