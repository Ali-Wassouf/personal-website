import { Link } from 'react-router-dom'
import { ArrowUpRight, Briefcase, Check, Code2, Copy, Sparkles, Terminal } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { SITE } from '../lib/site'
import { useCopy } from '../lib/useCopy'

const techStack = [
  'Java', 'Spring', 'AWS', 'PostgreSQL', 'Cassandra',
  'Flink', 'Redis', 'Terraform', 'Kafka',
]

const socials = [
  { href: SITE.github, label: 'GitHub', Icon: Code2, tint: 'text-zinc-400' },
  { href: SITE.linkedin, label: 'LinkedIn', Icon: Briefcase, tint: 'text-blue-400' },
]

export function About() {
  const { copied, copy } = useCopy()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
      <PageHeader
        kicker="biography & philosophy"
        title="About Ali Wassouf"
        description="Designing distributed backend systems by day. Writing honest, introspective hip-hop by night."
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <div className="text-lg font-bold text-white">{SITE.name}</div>
            <div className="text-xs font-mono text-cyan-400">Distributed systems · Hip-hop artist</div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
            <div className="text-xs font-mono text-zinc-400">Get in touch directly</div>
            <button
              onClick={() => copy(SITE.email)}
              className="w-full flex items-center justify-between gap-3 p-3 rounded-lg bg-black/40 hover:bg-black/60 border border-white/[0.08] text-xs font-mono text-zinc-200 transition-colors"
            >
              <span className="truncate">{SITE.email}</span>
              {copied ? (
                <span className="text-emerald-400 flex items-center gap-1 shrink-0"><Check className="w-3.5 h-3.5" /> Copied</span>
              ) : (
                <span className="text-cyan-400 flex items-center gap-1 shrink-0"><Copy className="w-3.5 h-3.5" /> Copy</span>
              )}
            </button>
            <a
              href={`mailto:${SITE.email}`}
              className="block w-full py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-medium text-center transition-colors shadow-sm no-underline"
            >
              Send an email
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
            <div className="text-xs font-mono text-zinc-400">Elsewhere</div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {socials.map(({ href, label, Icon, tint }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white transition-colors no-underline"
                >
                  <Icon className={`w-4 h-4 ${tint}`} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Narrative */}
        <div className="lg:col-span-8 space-y-8">
          <section className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <h2 className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              <Terminal className="w-4 h-4" />
              The engineer
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
              <p>
                I'm a software engineer with a focus on distributed systems design and backend infrastructure.
                I design systems that operate at scale — thinking carefully about consistency, fault tolerance,
                data partitioning, and the tradeoffs that live between reliability and performance.
              </p>
              <p>
                Beyond the technical, I lead engineering teams. I care about building the right culture, making
                decisions under ambiguity, and growing engineers who think in systems — not just features.
                Most of my writing comes from real architectural decisions I've faced and the thinking behind them.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
              <div className="text-xs font-mono text-zinc-400">Tools I work with</div>
              <div className="flex flex-wrap items-center gap-2">
                {techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-amber-500/20 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                <Sparkles className="w-4 h-4" />
                The artist
              </h2>
              <span className="text-xs font-mono text-zinc-500">Since 2008</span>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
              <p>
                I've been making hip-hop since 2008. It started as a creative outlet and became something
                I can't separate from who I am. Music is where the part of me that feels gets to speak —
                the unconscious, the emotional, the human — not the logical part I rely on at work.
              </p>
              <p>
                My music explores the human condition. It's about entertainment but also about honesty —
                sitting with difficult feelings, finding language for things that resist it, and sharing
                that with whoever needs to hear it. It's the one space where I don't optimize for anything.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-amber-400/80">Independent Arabic hip-hop</span>
              <Link
                to="/music"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors no-underline"
              >
                Hear the music <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
