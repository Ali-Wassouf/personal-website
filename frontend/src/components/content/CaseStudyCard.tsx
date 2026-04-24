import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { formatDate } from '../../lib/dates'
import type { CaseStudy } from '../../types'

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      to={`/engineering/${study.slug}`}
      className="group relative block p-6 border border-[#1a1a2e] rounded-xl bg-[#0f0f1a] hover:border-[#22d3ee28] hover:bg-[#161625] transition-all duration-300 no-underline overflow-hidden glow-cyan accent-bar-cyan"
    >
      {/* Subtle inner glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,#22d3ee08_0%,transparent_60%)]" />

      <div className="relative flex items-center justify-between gap-4 mb-4">
        <span className="text-xs text-[#44446a]">{formatDate(study.publishedAt)}</span>
        <Badge variant="eng">case study</Badge>
      </div>

      <h3 className="relative text-lg font-bold text-[#eeeef5] mb-2 leading-snug group-hover:text-[#22d3ee] transition-colors duration-200">
        {study.title}
      </h3>

      {study.outcome && (
        <p className="relative text-xs text-[#22d3ee] bg-[#22d3ee08] border border-[#22d3ee18] rounded-md px-3 py-2 mb-3 font-medium">
          ↗ {study.outcome}
        </p>
      )}

      <p className="relative text-sm text-[#8080a8] line-clamp-2 mb-4">{study.excerpt}</p>

      <div className="relative flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {study.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="default">{tech}</Badge>
          ))}
          {study.techStack.length > 4 && (
            <Badge variant="default">+{study.techStack.length - 4}</Badge>
          )}
        </div>
        <ArrowRight size={14} className="text-[#44446a] group-hover:text-[#22d3ee] group-hover:translate-x-1 transition-all duration-200 shrink-0" />
      </div>
    </Link>
  )
}
