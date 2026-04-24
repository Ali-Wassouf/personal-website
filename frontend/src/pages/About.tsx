import { Code2, MessageSquare, Briefcase, Music } from 'lucide-react'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Divider } from '../components/ui/Divider'
import { Badge } from '../components/ui/Badge'
import { ExternalLink } from '../components/ui/ExternalLink'
import { Button } from '../components/ui/Button'

const techStack = [
  'TypeScript', 'Node.js', 'React', 'Python', 'AWS', 'PostgreSQL',
  'Redis', 'Docker', 'Kubernetes', 'GraphQL', 'Kafka', 'Terraform',
]

const socials = [
  { href: 'https://github.com', label: 'GitHub', Icon: Code2 },
  { href: 'https://twitter.com', label: 'Twitter / X', Icon: MessageSquare },
  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Briefcase },
  { href: 'https://soundcloud.com', label: 'SoundCloud', Icon: Music },
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
            I'm a software engineer with a deep interest in distributed systems, developer tooling,
            and the craft of building things that scale — technically and organizationally. I've worked
            across the stack, but I gravitate toward backend infrastructure and the interesting problems
            that live at system boundaries.
          </p>
          <p>
            I care about writing code that is legible to future maintainers, designing APIs that don't
            surprise their callers, and understanding the "why" behind technical decisions — not just
            the "what." Most of my writing here comes from real problems I've encountered and the
            frameworks I've developed for thinking through them.
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
          <Button href="/resume.pdf" variant="outline" accent="eng" size="sm">
            view resume
          </Button>
        </div>
      </section>

      <Divider />

      {/* Artist */}
      <section className="mb-12">
        <h2 className="text-xs text-[#f5a623] tracking-widest mb-6">// the artist</h2>
        <div className="space-y-4 text-[#8888a8] text-sm leading-relaxed">
          <p>
            I've been making hip-hop for as long as I've been writing code. Both pursuits are, at
            their core, about building something from nothing — arranging units (words, beats, functions,
            abstractions) into something that communicates an idea clearly and, if you're lucky,
            with some style.
          </p>
          <p>
            My music explores the intersection of technical life and everything outside of it —
            ambition, identity, late nights, and the questions that don't have Stack Overflow answers.
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
