import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Divider } from '../components/ui/Divider'
import { CaseStudyCard } from '../components/content/CaseStudyCard'
import { PostCard } from '../components/content/PostCard'
import { PlatformLink } from '../components/content/PlatformLink'
import { api } from '../lib/api'
import type { CaseStudy, Post, MusicRelease } from '../types'

function TypewriterText({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[index]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed === current) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % texts.length)
    } else {
      timeout = setTimeout(() => {
        setDisplayed(deleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1))
      }, deleting ? 40 : 70)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, index, texts])

  return (
    <span className="gradient-text">
      {displayed}
      <span className="animate-pulse">_</span>
    </span>
  )
}

export function Home() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [music, setMusic] = useState<MusicRelease[]>([])

  useEffect(() => {
    api.caseStudies.list().then(setCaseStudies).catch(() => {})
    api.posts.list({ limit: 3 }).then(setPosts).catch(() => {})
    api.music.list().then(setMusic).catch(() => {})
  }, [])

  const featured = caseStudies[0]
  const featuredRelease = music.find((m) => m.featured) ?? music[0]

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-28 pt-8"
      >
        {/* Ambient glow orbs */}
        <div className="pointer-events-none absolute -top-20 -left-32 w-96 h-96 rounded-full bg-[#22d3ee] opacity-[0.055] blur-[96px]" />
        <div className="pointer-events-none absolute -top-8 left-48 w-72 h-72 rounded-full bg-[#a855f7] opacity-[0.07] blur-[80px]" />
        <div className="pointer-events-none absolute top-20 -right-16 w-64 h-64 rounded-full bg-[#fb923c] opacity-[0.05] blur-[72px]" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-8">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22d3ee] shadow-[0_0_6px_#22d3ee]" />
            <span className="text-xs text-[#44446a] tracking-widest">humans first</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-none mb-5 gradient-text">
            Ali Wassouf
          </h1>

          <p className="text-2xl md:text-3xl text-[#8080a8] mb-4 leading-relaxed font-medium">
            <TypewriterText texts={[
              'software engineer',
              'systems thinker',
              'hip-hop artist',
              'avid reader',
              'builder of things',
            ]} />
          </p>

          <p className="text-base text-[#44446a] max-w-lg mb-12 leading-relaxed">
            I write about engineering, the future of software, and life. I also make hip-hop.
            This is where both worlds live.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asLink="/engineering" variant="primary" accent="eng">
              read my work <ArrowRight size={14} />
            </Button>
            <Button asLink="/music" variant="outline" accent="music">
              hear the music
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Featured Case Study */}
      {featured && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-px h-4 bg-gradient-to-b from-[#22d3ee] to-[#a855f7]" />
              <h2 className="text-xs text-[#8080a8] tracking-widest uppercase">latest case study</h2>
            </div>
            <Link to="/engineering" className="text-xs text-[#44446a] hover:text-[#22d3ee] transition-colors no-underline flex items-center gap-1">
              all case studies <ArrowRight size={11} />
            </Link>
          </div>
          <CaseStudyCard study={featured} />
        </motion.section>
      )}

      <Divider />

      {/* Latest Writing */}
      {posts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-px h-4 bg-gradient-to-b from-[#a855f7] to-[#fb923c]" />
              <h2 className="text-xs text-[#8080a8] tracking-widest uppercase">latest writing</h2>
            </div>
            <Link to="/writing" className="text-xs text-[#44446a] hover:text-[#a855f7] transition-colors no-underline flex items-center gap-1">
              all posts <ArrowRight size={11} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </motion.section>
      )}

      <Divider />

      {/* Music teaser */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-px h-4 bg-gradient-to-b from-[#fb923c] to-transparent" />
            <h2 className="text-xs text-[#fb923c] tracking-widest uppercase">latest drop</h2>
          </div>
          <Link to="/music" className="text-xs text-[#44446a] hover:text-[#fb923c] transition-colors no-underline flex items-center gap-1">
            full discography <ArrowRight size={11} />
          </Link>
        </div>

        {featuredRelease ? (
          <div className="relative flex flex-col sm:flex-row gap-6 p-6 border border-[#1a1a2e] rounded-xl bg-[#0f0f1a] overflow-hidden glow-amber">
            {/* Ambient glow inside card */}
            <div className="pointer-events-none absolute -top-8 -right-8 w-48 h-48 rounded-full bg-[#fb923c] opacity-[0.07] blur-[48px]" />

            {featuredRelease.coverUrl && (
              <img
                src={featuredRelease.coverUrl}
                alt={featuredRelease.title}
                className="w-24 h-24 rounded-lg object-cover border border-[#252540] shrink-0"
              />
            )}
            <div className="flex flex-col gap-3 relative">
              <div>
                <p className="text-xs text-[#fb923c] mb-1 tracking-wider">{featuredRelease.type}</p>
                <h3 className="text-lg font-bold text-[#eeeef5]">{featuredRelease.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(featuredRelease.platforms).map(([platform, href]) =>
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
        ) : (
          <div className="p-6 border border-[#1a1a2e] rounded-xl bg-[#0f0f1a]">
            <p className="text-sm text-[#8080a8]">Music coming soon. Stay tuned.</p>
          </div>
        )}
      </motion.section>
    </div>
  )
}
