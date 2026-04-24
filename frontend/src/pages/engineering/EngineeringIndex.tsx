import { useEffect, useState } from 'react'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { CaseStudyCard } from '../../components/content/CaseStudyCard'
import { api } from '../../lib/api'
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
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-3">
        <span className="text-xs text-[#4a4a6a] tracking-widest">// engineering</span>
      </div>
      <SectionHeader text="Case Studies" as="h1" className="mb-4" />
      <p className="text-sm text-[#8888a8] max-w-xl mb-12 leading-relaxed">
        Deep dives into real engineering problems — architecture decisions, trade-offs made,
        and what I learned in the process.
      </p>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-48 rounded-md bg-[#111118] border border-[#1e1e2e] animate-pulse" />
          ))}
        </div>
      ) : studies.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {studies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#4a4a6a]">Case studies coming soon.</p>
      )}
    </div>
  )
}
