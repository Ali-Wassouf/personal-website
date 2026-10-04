import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Mic2 } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'
import { MetaRow } from '../../components/ui/MetaRow'
import { PlatformLink, activePlatforms } from '../../components/content/PlatformLink'
import { api } from '../../lib/api'
import type { MusicRelease } from '../../types'
import { formatDateShort } from '../../lib/dates'

function Cover({ release, className }: { release: MusicRelease; className?: string }) {
  return release.coverUrl ? (
    <img
      src={release.coverUrl}
      alt={release.title}
      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${className ?? ''}`}
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-5xl">♪</div>
  )
}

function FeaturedRelease({ release }: { release: MusicRelease }) {
  const platforms = activePlatforms(release.platforms)

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-amber-500/[0.02] border border-white/[0.08] hover:border-amber-500/30 p-6 sm:p-8 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-start">
          <Link
            to={`/music/${release.slug}`}
            className="group relative block w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border border-white/[0.12] shadow-2xl bg-black"
          >
            <Cover release={release} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
          </Link>
        </div>

        <div className="md:col-span-7 lg:col-span-8 space-y-6">
          <div className="space-y-2">
            <MetaRow items={[<span className="text-amber-400 capitalize">{release.type}</span>, formatDateShort(release.releaseDate)]} />
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <Link to={`/music/${release.slug}`} className="no-underline">
                <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight hover:text-amber-200 transition-colors">
                  {release.title}
                </h3>
              </Link>
              {release.titleArabic && (
                <span className="text-3xl sm:text-4xl font-arabic text-amber-300" lang="ar">{release.titleArabic}</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {platforms.map(([platform, href]) => (
              <PlatformLink key={platform} platform={platform} href={href} />
            ))}
            <Link
              to={`/music/${release.slug}`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-zinc-200 text-xs font-medium transition-colors no-underline sm:ml-auto"
            >
              <Mic2 className="w-3.5 h-3.5 text-amber-400" />
              Lyrics & translation
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReleaseCard({ release, index }: { release: MusicRelease; index: number }) {
  const platforms = activePlatforms(release.platforms)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/[0.2] p-5 flex flex-col justify-between gap-4 transition-all duration-200"
    >
      <Link to={`/music/${release.slug}`} className="block space-y-3 no-underline">
        <div className="aspect-square w-full rounded-xl overflow-hidden bg-black border border-white/[0.1]">
          <Cover release={release} />
        </div>
        <div className="space-y-1">
          <div className="flex items-baseline justify-between gap-2">
            <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors truncate">
              {release.title}
            </h4>
            {release.titleArabic && (
              <span className="text-lg font-arabic text-amber-300 shrink-0" lang="ar">{release.titleArabic}</span>
            )}
          </div>
          <MetaRow items={[<span className="capitalize">{release.type}</span>, formatDateShort(release.releaseDate)]} />
        </div>
      </Link>

      <div className="space-y-2 pt-3 border-t border-white/[0.06]">
        {platforms.length > 0 && (
          <div className="grid grid-cols-3 gap-1.5">
            {platforms.slice(0, 3).map(([platform, href]) => (
              <PlatformLink key={platform} platform={platform} href={href} variant="compact" />
            ))}
          </div>
        )}
        <Link
          to={`/music/${release.slug}`}
          className="block w-full text-center py-1.5 text-xs text-amber-400 hover:text-amber-300 font-mono transition-colors no-underline"
        >
          View lyrics & translation
        </Link>
      </div>
    </motion.div>
  )
}

export function MusicIndex() {
  const [releases, setReleases] = useState<MusicRelease[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.music.list().then(setReleases).finally(() => setLoading(false))
  }, [])

  const featured = releases.find((r) => r.featured) ?? releases[0]
  const rest = releases.filter((r) => r !== featured)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
      <PageHeader
        accent="music"
        kicker="discography & lyrics"
        title="Music"
        description="Music about the things that exist outside of systems. The part of me that feels. Independent Arabic hip-hop since 2008."
      />

      {loading ? (
        <div className="mt-12 h-80 rounded-2xl bg-white/[0.03] border border-white/[0.08] animate-pulse" />
      ) : releases.length === 0 ? (
        <p className="mt-12 text-sm text-zinc-500">Music coming soon. Stay tuned.</p>
      ) : (
        <>
          {featured && (
            <section className="mt-12">
              <div className="flex items-center justify-between pb-3 text-xs font-mono text-zinc-400 border-b border-white/[0.06]">
                <span className="text-amber-400 uppercase tracking-wider font-semibold">Latest drop</span>
                <span className="hidden sm:inline text-zinc-500">Audio & lyrics</span>
              </div>
              <div className="mt-6">
                <FeaturedRelease release={featured} />
              </div>
            </section>
          )}

          {rest.length > 0 && (
            <section className="mt-16 space-y-6">
              <div className="flex items-center justify-between pb-3 text-xs font-mono text-zinc-400 border-b border-white/[0.06]">
                <span className="uppercase tracking-wider font-semibold text-zinc-300">Discography</span>
                <span className="text-zinc-500">{rest.length} {rest.length === 1 ? 'release' : 'releases'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((release, i) => (
                  <ReleaseCard key={release.id} release={release} index={i} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
