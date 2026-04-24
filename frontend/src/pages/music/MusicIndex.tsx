import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { PlatformLink } from '../../components/content/PlatformLink'
import { Divider } from '../../components/ui/Divider'
import { api } from '../../lib/api'
import type { MusicRelease } from '../../types'
import { formatDateShort } from '../../lib/dates'

type Platform = 'spotify' | 'youtube' | 'youtubeMusic' | 'appleMusic' | 'soundcloud'

function ReleaseCard({ release, index }: { release: MusicRelease; index: number }) {
  const activePlatforms = Object.entries(release.platforms).filter(([, href]) => href) as [string, string][]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="group relative border border-[#1a1a2e] rounded-xl bg-[#0f0f1a] overflow-hidden hover:border-[#fb923c28] transition-all duration-300 glow-amber"
    >
      <Link to={`/music/${release.slug}`} className="block aspect-square overflow-hidden">
        {release.coverUrl ? (
          <img
            src={release.coverUrl}
            alt={release.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[#161625] flex items-center justify-center">
            <span className="text-[#44446a] text-5xl">♪</span>
          </div>
        )}
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <Link
              to={`/music/${release.slug}`}
              className="text-sm font-bold text-[#eeeef5] hover:text-[#fb923c] transition-colors no-underline block leading-snug"
            >
              {release.title}
            </Link>
            {release.titleArabic && (
              <span className="text-xs text-[#44446a]" dir="rtl" lang="ar">
                {release.titleArabic}
              </span>
            )}
          </div>
          <Link to={`/music/${release.slug}`} className="text-[#44446a] hover:text-[#fb923c] transition-colors shrink-0 mt-0.5">
            <ArrowRight size={14} />
          </Link>
        </div>
        <p className="text-xs text-[#fb923c] mb-3">{release.type} · {formatDateShort(release.releaseDate)}</p>
        <div className="flex flex-wrap gap-1.5">
          {activePlatforms.map(([platform, href]) => (
            <PlatformLink key={platform} platform={platform as Platform} href={href} size="sm" />
          ))}
        </div>
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
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="pointer-events-none fixed top-32 right-0 w-96 h-96 rounded-full bg-[#fb923c] opacity-[0.04] blur-[100px]" />

      <div className="mb-3">
        <span className="text-xs text-[#fb923c] tracking-widest">// music</span>
      </div>
      <SectionHeader text="Music" as="h1" accent="music" className="mb-4" />
      <p className="text-sm text-[#8080a8] max-w-xl mb-14 leading-relaxed">
        Music about the things that exist outside of systems. The part of me that feels.
      </p>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-xl bg-[#0f0f1a] border border-[#1a1a2e]">
              <div className="aspect-square bg-[#161625] rounded-t-xl" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-2/3 bg-[#161625] rounded" />
                <div className="h-3 w-1/3 bg-[#161625] rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : releases.length === 0 ? (
        <p className="text-sm text-[#44446a]">Music coming soon. Stay tuned.</p>
      ) : (
        <>
          {featured && (
            <section className="mb-14">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-px h-4 bg-gradient-to-b from-[#fb923c] to-transparent" />
                <h2 className="text-xs text-[#fb923c] tracking-widest uppercase">latest drop</h2>
              </div>

              <div className="group relative flex flex-col sm:flex-row border border-[#1a1a2e] rounded-xl bg-[#0f0f1a] overflow-hidden hover:border-[#fb923c28] transition-all duration-300 glow-amber">
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_right,#fb923c08_0%,transparent_60%)]" />

                <Link to={`/music/${featured.slug}`} className="sm:w-64 shrink-0 block overflow-hidden">
                  {featured.coverUrl ? (
                    <img
                      src={featured.coverUrl}
                      alt={featured.title}
                      className="w-full h-56 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-56 sm:h-full bg-[#161625] flex items-center justify-center">
                      <span className="text-[#44446a] text-6xl">♪</span>
                    </div>
                  )}
                </Link>

                <div className="relative flex flex-col justify-center gap-5 p-8">
                  <div>
                    <p className="text-xs text-[#fb923c] tracking-wider mb-2">
                      {featured.type} · {formatDateShort(featured.releaseDate)}
                    </p>
                    <Link to={`/music/${featured.slug}`} className="no-underline">
                      <h3 className="text-2xl md:text-3xl font-bold text-[#eeeef5] hover:text-[#fb923c] transition-colors leading-tight">
                        {featured.title}
                      </h3>
                    </Link>
                    {featured.titleArabic && (
                      <p className="text-lg text-[#8080a8] mt-1" dir="rtl" lang="ar">
                        {featured.titleArabic}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {Object.entries(featured.platforms).map(([platform, href]) =>
                      href ? (
                        <PlatformLink key={platform} platform={platform as Platform} href={href} size="md" />
                      ) : null
                    )}
                  </div>

                  <Link
                    to={`/music/${featured.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs text-[#44446a] hover:text-[#fb923c] transition-colors no-underline"
                  >
                    lyrics & translation <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </section>
          )}

          {rest.length > 0 && (
            <>
              <Divider />
              <section>
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-px h-4 bg-gradient-to-b from-[#44446a] to-transparent" />
                  <h2 className="text-xs text-[#44446a] tracking-widest uppercase">discography</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((release, i) => (
                    <ReleaseCard key={release.id} release={release} index={i} />
                  ))}
                </div>
              </section>
            </>
          )}
        </>
      )}
    </div>
  )
}
