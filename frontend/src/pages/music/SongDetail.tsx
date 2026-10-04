import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlatformLink, activePlatforms } from '../../components/content/PlatformLink'
import { ScrollProgress } from '../../components/ui/ScrollProgress'
import { BackLink } from '../../components/ui/BackLink'
import { MetaRow } from '../../components/ui/MetaRow'
import { NotFoundState } from '../../components/ui/PageState'
import { api } from '../../lib/api'
import { formatDateShort } from '../../lib/dates'
import type { MusicRelease } from '../../types'

/** Split a lyrics block into stanzas using --- as separator */
function parseStanzas(block: string): string[] {
  return block
    .split(/\n---\n/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function LyricsSection({ raw }: { raw: string }) {
  const arabicMatch = raw.match(/##\s*Lyrics\s*\n([\s\S]*?)(?=\n##|$)/)
  const translationMatch = raw.match(/##\s*English Translation\s*\n([\s\S]*?)(?=\n##|$)/)

  const arabicStanzas = parseStanzas(arabicMatch?.[1] ?? '')
  const englishStanzas = parseStanzas(translationMatch?.[1] ?? '')

  if (arabicStanzas.length === 0 && englishStanzas.length === 0) {
    return (
      <div className="mt-16 py-12 border-t border-white/[0.06] text-center">
        <p className="text-sm text-zinc-500">Lyrics coming soon.</p>
      </div>
    )
  }

  const count = Math.max(arabicStanzas.length, englishStanzas.length)

  return (
    <section className="mt-16 space-y-4">
      <div className="grid grid-cols-2 gap-6 items-center text-xs font-mono uppercase tracking-wider py-2.5 px-4 rounded-lg bg-white/[0.03] border border-white/[0.06]">
        <span className="text-zinc-400">English translation</span>
        <span className="text-right text-amber-400/90 font-arabic text-sm normal-case tracking-normal">النص الأصلي</span>
      </div>

      <div className="divide-y divide-white/[0.04]">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(i, 12) * 0.03 }}
            className="grid grid-cols-2 gap-6 py-4 px-4 rounded-lg hover:bg-white/[0.02] transition-colors items-center"
          >
            <p className="font-serif italic text-base sm:text-lg text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {englishStanzas[i] ?? <span className="text-zinc-700 not-italic">—</span>}
            </p>
            <p className="font-arabic text-lg sm:text-xl text-right text-white leading-loose whitespace-pre-wrap" dir="rtl" lang="ar">
              {arabicStanzas[i] ?? <span className="text-zinc-700">—</span>}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function SongDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [release, setRelease] = useState<MusicRelease & { lyricsRaw?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!slug) return
    api.music.get(slug)
      .then((data) => setRelease(data as MusicRelease & { lyricsRaw?: string }))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 animate-pulse">
      <div className="h-3 w-16 bg-white/[0.05] rounded" />
      <div className="mt-10 flex flex-col sm:flex-row gap-8">
        <div className="w-44 h-44 sm:w-56 sm:h-56 bg-white/[0.05] rounded-2xl shrink-0" />
        <div className="flex-1 space-y-3 pt-2">
          <div className="h-3 w-28 bg-white/[0.05] rounded" />
          <div className="h-10 w-2/3 bg-white/[0.06] rounded-lg" />
          <div className="h-8 w-1/3 bg-white/[0.04] rounded" />
        </div>
      </div>
    </div>
  )

  if (error || !release) return <NotFoundState message="Release not found." to="/music" label="back to music" />

  const platforms = activePlatforms(release.platforms)

  return (
    <>
      <ScrollProgress accent="music" />

      <div className="relative">
        {/* Soft amber wash from the cover art */}
        {release.coverUrl && (
          <div className="absolute inset-x-0 top-0 h-80 overflow-hidden pointer-events-none [mask-image:linear-gradient(to_bottom,black_30%,transparent)]">
            <img src={release.coverUrl} alt="" className="w-full h-full object-cover scale-110 blur-3xl opacity-20" />
          </div>
        )}

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
          <BackLink to="/music" label="music" accent="music" />

          <motion.header
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-8 items-start"
          >
            <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-white/[0.12] shadow-2xl bg-black shrink-0">
              {release.coverUrl ? (
                <img src={release.coverUrl} alt={release.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600 text-5xl">♪</div>
              )}
            </div>

            <div className="space-y-5 pt-1 min-w-0">
              <div className="space-y-2">
                <MetaRow items={[<span className="text-amber-400 capitalize">{release.type}</span>, formatDateShort(release.releaseDate)]} />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">{release.title}</h1>
                  {release.titleArabic && (
                    <span className="text-3xl sm:text-4xl font-arabic text-amber-300" lang="ar">{release.titleArabic}</span>
                  )}
                </div>
              </div>

              {platforms.length > 0 && (
                <div className="flex flex-wrap gap-2.5">
                  {platforms.map(([platform, href]) => (
                    <PlatformLink key={platform} platform={platform} href={href} />
                  ))}
                </div>
              )}
            </div>
          </motion.header>

          {release.lyricsRaw && <LyricsSection raw={release.lyricsRaw} />}
        </div>
      </div>
    </>
  )
}
