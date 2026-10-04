import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Music2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { MetaRow } from '../components/ui/MetaRow'
import { CaseStudyCard } from '../components/content/CaseStudyCard'
import { PostCard } from '../components/content/PostCard'
import { PlatformLink, activePlatforms } from '../components/content/PlatformLink'
import { api } from '../lib/api'
import { formatDateShort } from '../lib/dates'
import { cn } from '../lib/cn'
import type { Book, CaseStudy, Post, MusicRelease } from '../types'

function ViewAll({ to, label, accent = 'eng' }: { to: string; label: string; accent?: 'eng' | 'music' }) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 no-underline transition-colors shrink-0',
        accent === 'music' ? 'hover:text-amber-300' : 'hover:text-cyan-300'
      )}
    >
      {label}
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  )
}

function ReleaseSpotlight({ release }: { release: MusicRelease }) {
  const platforms = activePlatforms(release.platforms)

  return (
    <div className="relative rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/[0.08] p-5 sm:p-6 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Latest release
        </div>
        <ViewAll to="/music" label="Full discography" accent="music" />
      </div>

      <Link to={`/music/${release.slug}`} className="group mt-5 flex gap-4 items-start no-underline">
        <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-white/[0.1] shadow-md bg-black">
          {release.coverUrl ? (
            <img
              src={release.coverUrl}
              alt={release.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600 text-4xl">♪</div>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <MetaRow items={[<span className="capitalize">{release.type}</span>, formatDateShort(release.releaseDate)]} />
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors">
              {release.title}
            </h3>
            {release.titleArabic && (
              <span className="text-xl font-arabic text-amber-300" lang="ar">{release.titleArabic}</span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-zinc-400 group-hover:text-amber-300 transition-colors">
            Lyrics & translation <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </Link>

      {platforms.length > 0 && (
        <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
          {platforms.map(([platform, href]) => (
            <PlatformLink key={platform} platform={platform} href={href} />
          ))}
        </div>
      )}
    </div>
  )
}

export function Home() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [music, setMusic] = useState<MusicRelease[]>([])
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    api.caseStudies.list().then(setCaseStudies).catch(() => {})
    api.posts.list({ limit: 3 }).then(setPosts).catch(() => {})
    api.music.list().then(setMusic).catch(() => {})
    api.books.list().then(setBooks).catch(() => {})
  }, [])

  const featuredRelease = music.find((m) => m.featured) ?? music[0]
  const booksRead = books.filter((b) => b.status === 'finished').length

  const proofs = [
    { value: 'Since 2008', label: 'Writing hip-hop' },
    caseStudies.length > 0 && { value: String(caseStudies.length), label: caseStudies.length === 1 ? 'Case study' : 'Case studies' },
    booksRead > 0 && { value: String(booksRead), label: 'Books read & reviewed' },
  ].filter(Boolean) as { value: string; label: string }[]

  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] max-w-full h-[360px] bg-gradient-to-tr from-cyan-600/10 via-indigo-600/10 to-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>humans first</span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400">engineering & hip-hop</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">Ali Wassouf</h1>
                <p className="text-xl sm:text-2xl font-mono text-cyan-400 font-medium">systems thinker_</p>
              </div>

              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl">
                I write about engineering, the future of software, and life. I also make Arabic hip-hop.
                This is where both worlds live.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button asLink="/engineering">
                  Read engineering work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
                <Button asLink="/music" variant="secondary">
                  <Music2 className="w-4 h-4 text-amber-400" />
                  Hear the music
                </Button>
              </div>

              <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-400 font-mono">
                {proofs.map(({ value, label }, i) => (
                  <div key={label} className="flex items-center gap-6">
                    {i > 0 && <span className="text-zinc-700 hidden sm:inline" aria-hidden="true">·</span>}
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold tabular-nums">{value}</span>
                      <span>{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5"
            >
              {featuredRelease ? (
                <ReleaseSpotlight release={featuredRelease} />
              ) : (
                <div className="h-64 rounded-2xl bg-white/[0.03] border border-white/[0.08] animate-pulse" />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Engineering */}
      {caseStudies.length > 0 && (
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <PageHeader
                as="h2"
                kicker="systems & infrastructure"
                title="Engineering"
                description="Deep dives into real backend problems — architecture decisions, trade-offs, and what held up in production."
              />
              <ViewAll to="/engineering" label="All case studies" />
            </div>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {caseStudies.slice(0, 2).map((study, i) => (
                <div
                  key={study.slug}
                  className={cn('flex [&>*]:flex-1', caseStudies.length > 1 ? (i === 0 ? 'lg:col-span-7' : 'lg:col-span-5') : 'lg:col-span-12')}
                >
                  <CaseStudyCard study={study} featured={i === 0} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Writing */}
      {posts.length > 0 && (
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <PageHeader
                as="h2"
                kicker="essays & observations"
                title="Latest writing"
                description="Thoughts on engineering, the industry, books, and life. Unfiltered."
              />
              <ViewAll to="/writing" label="All writing" />
            </div>
            <div className="mt-10 space-y-4">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
