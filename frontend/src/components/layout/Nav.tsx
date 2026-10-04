import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Check, Mail, Menu, X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { NAV_LINKS, SITE } from '../../lib/site'
import { useCopy } from '../../lib/useCopy'

export function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { copied, copy } = useCopy()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const isActive = (to: string) => pathname === to || pathname.startsWith(to + '/')

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-200 border-b',
        scrolled || open
          ? 'bg-[#090b0e]/85 backdrop-blur-md border-white/[0.06] shadow-sm'
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-2.5 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
        >
          <span className="font-mono text-base font-semibold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
            ~/ali
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
          <span className="hidden sm:inline-block text-xs font-mono text-zinc-400">wassouf</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                'relative py-1 text-sm font-medium no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded',
                isActive(to) ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
              )}
            >
              {label}
              {isActive(to) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => copy(SITE.email)}
            title="Copy email to clipboard"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-md transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <span className="hidden lg:inline">{SITE.email}</span>
                <span className="lg:hidden">Copy email</span>
              </>
            )}
          </button>
          <a
            href={`mailto:${SITE.email}`}
            className="px-3.5 py-1.5 text-xs font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors shadow-sm no-underline whitespace-nowrap"
          >
            Get in touch
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/[0.06] px-4 pt-3 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md no-underline transition-colors',
                  isActive(to) ? 'bg-white/[0.08] text-white' : 'text-zinc-400 hover:text-white'
                )}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
            <button onClick={() => copy(SITE.email)} className="flex items-center gap-1.5 hover:text-white">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5" />}
              <span>{copied ? 'Email copied' : 'Copy email'}</span>
            </button>
            <div className="flex items-center gap-4">
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:text-white no-underline">GitHub</a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white no-underline">LinkedIn</a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
