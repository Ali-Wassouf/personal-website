import { useEffect, useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { CaseStudyCard } from '../../components/content/CaseStudyCard'
import { api } from '../../lib/api'
import { cn } from '../../lib/cn'
import type { CaseStudy } from '../../types'

export function EngineeringIndex() {
  const [studies, setStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.caseStudies.list()
      .then(setStudies)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
      <PageHeader
        kicker="systems & infrastructure"
        title="Engineering Case Studies"
        description="Deep dives into real engineering problems — architecture decisions, trade-offs made, and what I learned in the process."
      />

      <div className="mt-12">
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-white/[0.03] border border-white/[0.08] animate-pulse" />
            ))}
          </div>
        ) : studies.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {studies.map((study, i) => {
              // Alternate 7/5 and 5/7 rows; a lone trailing card spans the full width
              const lone = i === studies.length - 1 && i % 2 === 0
              const wide = Math.floor(i / 2) % 2 === 0 ? i % 2 === 0 : i % 2 === 1
              return (
                <div
                  key={study.slug}
                  className={cn('flex [&>*]:flex-1', lone ? 'lg:col-span-12' : wide ? 'lg:col-span-7' : 'lg:col-span-5')}
                >
                  <CaseStudyCard study={study} featured={i === 0} />
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-zinc-500">Case studies coming soon.</p>
        )}
      </div>
    </div>
  )
}
