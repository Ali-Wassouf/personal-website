import { ExternalLink } from '../ui/ExternalLink'
import { Code2, Briefcase } from 'lucide-react'

const socials = [
  { href: 'https://github.com/Ali-Wassouf', label: 'GitHub', icon: Code2 },
  { href: 'https://www.linkedin.com/in/ali-wassouf/', label: 'LinkedIn', icon: Briefcase },
]

export function Footer() {
  return (
    <footer className="border-t border-[#1a1a2e] mt-20">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs text-[#44446a]">
          <span className="gradient-text font-bold">~/ali</span>
          <span className="ml-2">— software engineer + hip-hop artist</span>
        </p>
        <div className="flex items-center gap-4">
          {socials.map(({ href, label, icon: Icon }) => (
            <ExternalLink key={label} href={href} aria-label={label}
              className="text-[#44446a] hover:text-[#eeeef5] transition-colors duration-200"
            >
              <Icon size={15} />
            </ExternalLink>
          ))}
        </div>
        <p className="text-xs text-[#44446a]">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
