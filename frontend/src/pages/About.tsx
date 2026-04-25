import { Code2, Briefcase } from 'lucide-react'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Divider } from '../components/ui/Divider'
import { Badge } from '../components/ui/Badge'
import { ExternalLink } from '../components/ui/ExternalLink'
import { Button } from '../components/ui/Button'

const techStack = [
  'Java', 'Spring', 'AWS', 'PostgreSQL', 'Cassandra',
  'Flink', 'Redis', 'Terraform', 'Kafka',
]

const socials = [
  { href: 'https://github.com/Ali-Wassouf', label: 'GitHub', Icon: Code2 },
  { href: 'https://www.linkedin.com/in/ali-wassouf/', label: 'LinkedIn', Icon: Briefcase },
]

export function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-3">
        <span className="text-xs text-[#4a4a6a] tracking-widest">// about me</span>
      </div>
      <SectionHeader text="Ali Wassouf" as="h1" className="mb-8" />

      {/* Engineer */}
      <section className="mb-12">
        <h2 className="text-xs text-[#00d4ff] tracking-widest mb-6">// the engineer</h2>
        <div className="space-y-4 text-[#8888a8] text-sm leading-relaxed">
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

        <div className="mt-8">
          <p className="text-xs text-[#4a4a6a] tracking-widest mb-3">// tools I work with</p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="eng">{tech}</Badge>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs text-[#4a4a6a] tracking-widest">// get in touch</p>
          <p className="text-sm text-[#22d3ee] mt-1">wassouf.ali.eng@gmail.com</p>
        </div>
      </section>

      <Divider />

      {/* Artist */}
      <section className="mb-12">
        <h2 className="text-xs text-[#f5a623] tracking-widest mb-6">// the artist</h2>
        <div className="space-y-4 text-[#8888a8] text-sm leading-relaxed">
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

        <div className="mt-6">
          <Button asLink="/music" variant="outline" accent="music" size="sm">
            hear the music
          </Button>
        </div>
      </section>

      <Divider />

      {/* Elsewhere */}
      <section>
        <h2 className="text-xs text-[#4a4a6a] tracking-widest mb-6">// elsewhere</h2>
        <div className="flex flex-wrap gap-4">
          {socials.map(({ href, label, Icon }) => (
            <ExternalLink
              key={label}
              href={href}
              aria-label={label}
              className="flex items-center gap-2 text-sm text-[#8888a8] hover:text-[#e8e8f0]"
            >
              <Icon size={14} />
              {label}
            </ExternalLink>
          ))}
        </div>
      </section>
    </div>
  )
}
