import { Link } from 'react-router-dom'

export function ArticleSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 animate-pulse space-y-5">
      <div className="h-3 w-20 bg-white/[0.05] rounded" />
      <div className="h-3 w-48 bg-white/[0.05] rounded mt-10" />
      <div className="h-10 w-3/4 bg-white/[0.06] rounded-lg" />
      <div className="h-4 w-1/2 bg-white/[0.04] rounded" />
    </div>
  )
}

export function NotFoundState({ message, to, label }: { message: string; to: string; label: string }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center space-y-4">
      <p className="text-zinc-400 text-sm">{message}</p>
      <Link to={to} className="inline-block text-xs font-mono text-cyan-400 hover:text-cyan-300 no-underline">
        ← {label}
      </Link>
    </div>
  )
}
