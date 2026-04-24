import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '../../lib/cn'

const links = [
  { to: '/engineering', label: 'engineering' },
  { to: '/writing', label: 'writing' },
  { to: '/books', label: 'books' },
  { to: '/music', label: 'music' },
  { to: '/about', label: 'about' },
]

export function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[#1a1a2e] bg-[#08080e]/90 backdrop-blur-sm">
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="text-sm font-bold no-underline group"
        >
          <span className="text-[#8080a8] group-hover:text-[#eeeef5] transition-colors duration-200">~/</span>
          <span className="gradient-text">ali</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {links.map(({ to, label }) => {
            const active = pathname === to || pathname.startsWith(to + '/')
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={cn(
                    'px-3 py-1.5 text-xs rounded-sm transition-colors no-underline',
                    active
                      ? 'text-[#22d3ee] bg-[#22d3ee12] border border-[#22d3ee22]'
                      : 'text-[#8080a8] hover:text-[#eeeef5] hover:bg-[#ffffff08] border border-transparent'
                  )}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#8888a8] hover:text-[#e8e8f0] p-1"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#1a1a2e] bg-[#08080e]">
          <ul className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-1 list-none m-0 p-0 px-6 py-4">
            {links.map(({ to, label }) => {
              const active = pathname === to || pathname.startsWith(to + '/')
              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block px-3 py-2 text-sm rounded-sm transition-colors no-underline',
                      active
                        ? 'text-[#22d3ee] bg-[#22d3ee12]'
                        : 'text-[#8080a8] hover:text-[#eeeef5]'
                    )}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}
