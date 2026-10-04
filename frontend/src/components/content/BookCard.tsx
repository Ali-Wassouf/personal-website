import { Link } from 'react-router-dom'
import type { Book } from '../../types'

const genreTint: Record<Book['genre'], string> = {
  novels: '#3b2a52',
  psychology: '#163a45',
  'self-improvement': '#4a3412',
  'political-science': '#4a1d24',
}

export function Rating({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={`font-mono tracking-tighter text-amber-400 ${className ?? ''}`} aria-label={`${rating} out of 5`}>
      {'◆'.repeat(rating)}
      <span className="text-zinc-700">{'◆'.repeat(5 - rating)}</span>
    </span>
  )
}

export function BookCover({ book, className }: { book: Book; className?: string }) {
  if (book.coverUrl) {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-black border border-white/[0.1] shadow-lg ${className ?? ''}`}>
        <img src={book.coverUrl} alt={book.title} loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl p-4 flex flex-col justify-between border border-white/[0.1] shadow-lg ${className ?? ''}`}
      style={{ background: `linear-gradient(135deg, ${genreTint[book.genre] ?? '#1f2937'} 0%, #0d0f14 100%)` }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
      <div className="text-[10px] font-mono tracking-wider uppercase text-zinc-300/80">{book.genre.replace('-', ' ')}</div>
      <div className="space-y-1">
        <div className="font-serif font-medium text-base sm:text-lg text-white leading-tight line-clamp-3">{book.title}</div>
        <div className="text-xs text-zinc-300">{book.author}</div>
      </div>
    </div>
  )
}

export function BookCard({ book }: { book: Book }) {
  return (
    <Link
      to={`/books/${book.slug}`}
      className="group flex flex-col gap-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-cyan-500/30 p-4 transition-all duration-200 no-underline"
    >
      <BookCover book={book} className="aspect-[2/3] w-full transition-transform duration-300 group-hover:-translate-y-1" />

      <div className="space-y-1.5 px-1">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-mono text-zinc-400 capitalize truncate">{book.genre.replace('-', ' ')}</span>
          {book.rating != null && <Rating rating={book.rating} className="text-xs shrink-0" />}
        </div>
        <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
          {book.title}
        </h3>
        <p className="text-xs text-zinc-400 truncate">{book.author}</p>
      </div>
    </Link>
  )
}
