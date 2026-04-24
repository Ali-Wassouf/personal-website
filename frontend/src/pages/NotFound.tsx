import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-32 text-center">
      <p className="text-xs text-[#00d4ff] tracking-widest mb-4">// error</p>
      <h1 className="text-8xl font-bold text-[#1e1e2e] mb-4">404</h1>
      <p className="text-[#8888a8] text-sm mb-8">page not found</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs text-[#00d4ff] border border-[#00d4ff33] rounded-sm px-4 py-2 hover:bg-[#00d4ff1a] transition-colors no-underline"
      >
        return home
      </Link>
    </div>
  )
}
