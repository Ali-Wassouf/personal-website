import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ScrollProgress } from '../../components/ui/ScrollProgress'
import { Badge } from '../../components/ui/Badge'
import { PostBody } from '../../components/content/PostBody'
import { formatDate } from '../../lib/dates'
import { api } from '../../lib/api'
import type { CaseStudy } from '../../types'

export function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [study, setStudy] = useState<CaseStudy | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!slug) return
    api.caseStudies.get(slug)
      .then(setStudy)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="space-y-4 animate-pulse">
        <div className="h-6 w-24 bg-[#111118] rounded" />
        <div className="h-10 w-3/4 bg-[#111118] rounded" />
        <div className="h-4 w-1/2 bg-[#111118] rounded" />
      </div>
    </div>
  )

  if (error || !study) return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <p className="text-[#8888a8]">Case study not found.</p>
      <Link to="/engineering" className="text-xs text-[#00d4ff] mt-4 block">← back to engineering</Link>
    </div>
  )

  return (
    <>
      <ScrollProgress />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          to="/engineering"
          className="inline-flex items-center gap-1 text-xs text-[#8888a8] hover:text-[#00d4ff] transition-colors no-underline mb-10"
        >
          <ArrowLeft size={12} /> engineering
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-5 text-xs text-[#4a4a6a]">
            <span>{formatDate(study.publishedAt)}</span>
            <span>·</span>
            <span>{study.role}</span>
            <span>·</span>
            <span>{study.duration}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#e8e8f0] mb-5 leading-tight">
            {study.title}
          </h1>

          {study.outcome && (
            <div className="px-4 py-3 bg-[#00d4ff0d] border border-[#00d4ff1a] rounded-md mb-6">
              <span className="text-xs text-[#4a4a6a] block mb-1">outcome</span>
              <p className="text-sm text-[#00d4ff] font-medium">{study.outcome}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {study.techStack.map((tech) => (
              <Badge key={tech} variant="eng">{tech}</Badge>
            ))}
          </div>
        </header>

        {study.body ? (
          <PostBody content={study.body} />
        ) : (
          <p className="text-[#8888a8] text-sm">{study.excerpt}</p>
        )}
      </div>
    </>
  )
}
