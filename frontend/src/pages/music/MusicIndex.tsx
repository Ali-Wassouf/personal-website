import { useEffect, useState } from 'react'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { PlatformLink } from '../../components/content/PlatformLink'
import { Divider } from '../../components/ui/Divider'
import { api } from '../../lib/api'
import type { MusicRelease } from '../../types'
import { formatDateShort } from '../../lib/dates'
import { cn } from '../../lib/cn'

function ReleaseCard({ release }: { release: MusicRelease }) {
  return (
    <div className="flex gap-4 p-5 border border-[#1e1e2e] rounded-md bg-[#111118] hover:border-[#f5a62333] transition-all duration-200">
      {release.coverUrl ? (
        <img
          src={release.coverUrl}
          alt={release.title}
          className="w-16 h-16 rounded-sm object-cover border border-[#2a2a3e] shrink-0"
        />
      ) : (
        <div className="w-16 h-16 rounded-sm bg-[#1a1a24] border border-[#2a2a3e] shrink-0 flex items-center justify-center">
          <span className="text-[#4a4a6a] text-xs">♪</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-bold text-[#e8e8f0] truncate">{release.title}</h3>
          <span className="text-xs text-[#4a4a6a] shrink-0">{formatDateShort(release.releaseDate)}</span>
        </div>
        <p className="text-xs text-[#f5a623] mb-3">{release.type}</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(release.platforms).map(([platform, href]) =>
            href ? (
              <PlatformLink
                key={platform}
                platform={platform as 'spotify' | 'youtubeMusic' | 'appleMusic' | 'soundcloud'}
                href={href}
                size="sm"
              />
            ) : null
          )}
        </div>
      </div>
    </div>
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
    <div className="max-w-5xl mx-auto px-6 py-16 music-page">
      <div className="mb-3">
        <span className="text-xs text-[#f5a623] tracking-widest">// music</span>
      </div>
      <SectionHeader text="Music" as="h1" accent="music" className="mb-4" />
      <p className="text-sm text-[#8888a8] max-w-xl mb-12 leading-relaxed">
        Hip-hop from the intersection of code and life. Find me on your platform of choice.
      </p>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 rounded-md bg-[#111118] border border-[#1e1e2e]" />
          ))}
        </div>
      ) : (
        <>
          {/* Featured */}
          {featured && (
            <section className="mb-12">
              <h2 className="text-xs text-[#f5a623] tracking-widest mb-6">// latest drop</h2>
              <div className={cn(
                'flex flex-col sm:flex-row gap-6 p-6 rounded-md border bg-[#111118]',
                'border-[#f5a62333]'
              )}>
                {featured.coverUrl ? (
                  <img
                    src={featured.coverUrl}
                    alt={featured.title}
                    className="w-36 h-36 sm:w-48 sm:h-48 rounded-md object-cover border border-[#2a2a3e] shrink-0"
                  />
                ) : (
                  <div className="w-36 h-36 rounded-md bg-[#1a1a24] border border-[#2a2a3e] shrink-0 flex items-center justify-center">
                    <span className="text-[#4a4a6a] text-3xl">♪</span>
                  </div>
                )}
                <div className="flex flex-col justify-center gap-4">
                  <div>
                    <p className="text-xs text-[#f5a623] mb-1">{featured.type}</p>
                    <h3 className="text-2xl font-bold text-[#e8e8f0]">{featured.title}</h3>
                    <p className="text-sm text-[#4a4a6a] mt-1">{formatDateShort(featured.releaseDate)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(featured.platforms).map(([platform, href]) =>
                      href ? (
                        <PlatformLink
                          key={platform}
                          platform={platform as 'spotify' | 'youtubeMusic' | 'appleMusic' | 'soundcloud'}
                          href={href}
                          size="md"
                        />
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Rest of catalog */}
          {rest.length > 0 && (
            <>
              <Divider />
              <section>
                <h2 className="text-xs text-[#4a4a6a] tracking-widest mb-6">// discography</h2>
                <div className="space-y-3">
                  {rest.map((release) => (
                    <ReleaseCard key={release.id} release={release} />
                  ))}
                </div>
              </section>
            </>
          )}

          {releases.length === 0 && (
            <p className="text-sm text-[#4a4a6a]">Music coming soon. Stay tuned.</p>
          )}
        </>
      )}
    </div>
  )
}
