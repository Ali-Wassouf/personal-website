import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { cn } from '../../lib/cn'

export function BackLink({ to, label, accent = 'eng' }: { to: string; label: string; accent?: 'eng' | 'music' }) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 transition-colors no-underline',
        accent === 'music' ? 'hover:text-amber-300' : 'hover:text-cyan-300'
      )}
    >
      <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
      {label}
    </Link>
  )
}
