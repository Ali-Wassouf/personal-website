import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { MetaRow } from '../ui/MetaRow'
import { cn } from '../../lib/cn'
import { formatDate } from '../../lib/dates'
import { readingTime } from '../../lib/readingTime'
import type { CaseStudy } from '../../types'

export function CaseStudyCard({ study, featured = false }: { study: CaseStudy; featured?: boolean }) {
  return (
    <Link
      to={`/engineering/${study.slug}`}
      className={cn(
        'group flex flex-col justify-between rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-200 no-underline',
        featured ? 'p-6 sm:p-8' : 'p-6'
      )}
    >
      <div className="space-y-5">
        <MetaRow
          items={[
            <span className="text-cyan-400 font-medium">case study</span>,
            formatDate(study.publishedAt),
            study.wordCount ? readingTime(study.wordCount) : null,
          ]}
        />

        <div className="space-y-2">
          <h3 className={cn(
            'font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug',
            featured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
          )}>
            {study.title}
          </h3>
          {(study.role || study.duration) && (
            <p className="text-xs font-mono text-zinc-400">
              {[study.role, study.duration].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>

        {study.outcome && (
          <div className="p-3.5 rounded-lg bg-black/50 border border-cyan-500/20 space-y-1">
            <div className="text-[11px] font-mono text-cyan-300/80">Outcome</div>
            <div className="text-sm font-semibold text-cyan-100">{study.outcome}</div>
          </div>
        )}

        <p className={cn('text-sm text-zinc-300 leading-relaxed', !featured && 'line-clamp-3')}>
          {study.excerpt}
        </p>

        {study.techStack.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono">
            <span className="text-zinc-400 font-medium">Stack:</span>
            {study.techStack.map((tech, i) => (
              <Fragment key={tech}>
                <span className="text-zinc-300">{tech}</span>
                {i < study.techStack.length - 1 && <span className="text-zinc-600">/</span>}
              </Fragment>
            ))}
          </div>
        )}
      </div>

      <div className="pt-5 mt-6 border-t border-white/[0.06] flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
          Read case study
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  )
}
