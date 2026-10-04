import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ScrollProgress } from '../../components/ui/ScrollProgress'
import { BackLink } from '../../components/ui/BackLink'
import { MetaRow } from '../../components/ui/MetaRow'
import { ArticleSkeleton, NotFoundState } from '../../components/ui/PageState'
import { PostBody } from '../../components/content/PostBody'
import { formatDate } from '../../lib/dates'
import { readingTime } from '../../lib/readingTime'
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

  if (loading) return <ArticleSkeleton />
  if (error || !study) return <NotFoundState message="Case study not found." to="/engineering" label="back to engineering" />

  const facts = [
    { label: 'Role', value: study.role },
    { label: 'Duration', value: study.duration },
    { label: 'Outcome', value: study.outcome },
  ].filter((f) => f.value)

  return (
    <>
      <ScrollProgress />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
        <BackLink to="/engineering" label="engineering" />

        <header className="mt-10 mb-12 space-y-6">
          <MetaRow
            items={[
              <span className="text-cyan-400">case study</span>,
              formatDate(study.publishedAt),
              study.wordCount ? readingTime(study.wordCount) : null,
            ]}
          />

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {study.title}
          </h1>

          {study.excerpt && (
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed border-l-2 border-cyan-400/60 pl-4">
              {study.excerpt}
            </p>
          )}

          {facts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-white/[0.06]">
              {facts.map(({ label, value }) => (
                <div key={label} className="space-y-0.5">
                  <div className="text-xs font-mono text-zinc-400">{label}</div>
                  <div className={label === 'Outcome' ? 'text-sm font-semibold text-cyan-300' : 'text-sm font-semibold text-white'}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          )}

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
        </header>

        {study.body ? <PostBody content={study.body} /> : <p className="text-zinc-400 text-sm">{study.excerpt}</p>}
      </article>
    </>
  )
}
