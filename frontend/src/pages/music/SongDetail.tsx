import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { PlatformLink } from '../../components/content/PlatformLink'
import { ScrollProgress } from '../../components/ui/ScrollProgress'
import { api } from '../../lib/api'
import { formatDateShort } from '../../lib/dates'
import type { MusicRelease } from '../../types'

type Platform = 'spotify' | 'youtube' | 'youtubeMusic' | 'appleMusic' | 'soundcloud'

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
      <div className="mt-16 py-12 border-t border-[#1a1a2e] text-center">
        <p className="text-sm text-[#44446a]">Lyrics coming soon.</p>
      </div>
    )
  }

  const count = Math.max(arabicStanzas.length, englishStanzas.length)

  return (
    <div className="mt-16 pt-12 border-t border-[#1a1a2e]">
      {/* Column headers */}
      <div className="grid grid-cols-2 gap-0 mb-8">
        <div className="flex items-center gap-2 pr-8">
          <div className="w-px h-4 bg-gradient-to-b from-[#44446a] to-transparent" />
          <span className="text-xs text-[#44446a] tracking-widest uppercase">english</span>
        </div>
        <div className="flex items-center justify-end gap-2 pl-8 border-l border-[#1a1a2e]">
          <span className="text-xs text-[#fb923c] tracking-widest uppercase">عربي</span>
          <div className="w-px h-4 bg-gradient-to-b from-[#fb923c] to-transparent" />
        </div>
      </div>

      {/* Stanzas — paired row by row */}
      <div className="space-y-10">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="grid grid-cols-2 gap-0 items-start"
          >
            {/* English — left column */}
            <div className="pr-8">
              {englishStanzas[i] ? (
                <p className="text-[#8080a8] text-sm leading-8 whitespace-pre-wrap">
                  {englishStanzas[i]}
                </p>
              ) : (
                <p className="text-[#252540] text-sm">—</p>
              )}
            </div>

            {/* Arabic — right column */}
            <div
              className="pl-8 border-l border-[#1a1a2e] text-right"
              dir="rtl"
              lang="ar"
            >
              {arabicStanzas[i] ? (
                <p
                  className="text-[#eeeef5] leading-10 whitespace-pre-wrap"
                  style={{ fontFamily: 'Amiri, serif', fontSize: '1.2rem' }}
                >
                  {arabicStanzas[i]}
                </p>
              ) : (
                <p className="text-[#252540] text-sm">—</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
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
    <div className="max-w-4xl mx-auto px-6 py-16 animate-pulse space-y-6">
      <div className="h-4 w-16 bg-[#0f0f1a] rounded" />
      <div className="flex gap-8">
        <div className="w-52 h-52 bg-[#0f0f1a] rounded-xl shrink-0" />
        <div className="flex-1 space-y-3 pt-2">
          <div className="h-5 w-24 bg-[#0f0f1a] rounded" />
          <div className="h-9 w-2/3 bg-[#0f0f1a] rounded" />
          <div className="h-5 w-1/3 bg-[#0f0f1a] rounded" />
        </div>
      </div>
    </div>
  )

  if (error || !release) return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
      <p className="text-[#8080a8] text-sm">Release not found.</p>
      <Link to="/music" className="text-xs text-[#fb923c] mt-4 block">← back to music</Link>
    </div>
  )

  const activePlatforms = Object.entries(release.platforms).filter(([, href]) => href) as [string, string][]

  return (
    <>
      <ScrollProgress accent="music" />

      {/* Blurred cover hero wash */}
      {release.coverUrl && (
        <div className="relative h-64 overflow-hidden">
          <img
            src={release.coverUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-3xl opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08080e]/30 via-transparent to-[#08080e]" />
        </div>
      )}

      <div
        className="max-w-4xl mx-auto px-6 pb-24"
        style={{ marginTop: release.coverUrl ? '-90px' : '64px' }}
      >
        <Link
          to="/music"
          className="inline-flex items-center gap-1.5 text-xs text-[#8080a8] hover:text-[#fb923c] transition-colors no-underline mb-10"
        >
          <ArrowLeft size={12} /> music
        </Link>

        {/* Song header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-8 items-start mb-4"
        >
          {release.coverUrl ? (
            <img
              src={release.coverUrl}
              alt={release.title}
              className="w-44 h-44 sm:w-52 sm:h-52 rounded-xl object-cover border border-[#252540] shadow-[0_8px_40px_#00000060] shrink-0"
            />
          ) : (
            <div className="w-44 h-44 rounded-xl bg-[#161625] border border-[#252540] shrink-0 flex items-center justify-center">
              <span className="text-[#44446a] text-5xl">♪</span>
            </div>
          )}

          <div className="flex flex-col gap-4 pt-2">
            <div>
              <p className="text-xs text-[#fb923c] tracking-wider mb-3">
                {release.type} · {formatDateShort(release.releaseDate)}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-[#eeeef5] leading-tight mb-2">
                {release.title}
              </h1>
              {release.titleArabic && (
                <p
                  className="text-2xl text-[#8080a8]"
                  dir="rtl"
                  lang="ar"
                  style={{ fontFamily: 'Amiri, serif' }}
                >
                  {release.titleArabic}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {activePlatforms.map(([platform, href]) => (
                <PlatformLink
                  key={platform}
                  platform={platform as Platform}
                  href={href}
                  size="sm"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {release.lyricsRaw && <LyricsSection raw={release.lyricsRaw} />}
      </div>
    </>
  )
}
