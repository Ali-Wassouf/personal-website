import { Link } from 'react-router-dom'
import { ArrowUp, Briefcase, Code2, Mail } from 'lucide-react'
import { ExternalLink } from '../ui/ExternalLink'
import { NAV_LINKS, SITE } from '../../lib/site'

const socials = [
  { href: SITE.github, label: 'GitHub', Icon: Code2 },
  { href: SITE.linkedin, label: 'LinkedIn', Icon: Briefcase },
]

export function Footer() {
  return (
    <footer className="mt-24 py-16 border-t border-white/[0.06] bg-[#07080b] text-zinc-400 text-xs font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm tracking-tight">{SITE.name}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-cyan-400">{SITE.tagline}</span>
            </div>
            <p className="text-zinc-500 font-sans text-xs max-w-md">
              Distributed systems, software architecture trade-offs, and independent Arabic hip-hop.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socials.map(({ href, label, Icon }) => (
              <ExternalLink key={label} href={href} aria-label={label}>
                <Icon className="w-4 h-4" />
              </ExternalLink>
            ))}
            <a href={`mailto:${SITE.email}`} aria-label="Email" className="hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {NAV_LINKS.map(({ to, label }, i) => (
              <span key={to} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden="true">·</span>}
                <Link to={to} className="hover:text-zinc-300 no-underline transition-colors">{label}</Link>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} {SITE.name}</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              Back to top <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
