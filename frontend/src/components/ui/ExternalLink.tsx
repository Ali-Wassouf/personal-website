import { cn } from '../../lib/cn'

interface ExternalLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  'aria-label'?: string
}

export function ExternalLink({ href, children, className, 'aria-label': ariaLabel }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        'text-[#8888a8] hover:text-[#e8e8f0] transition-colors duration-200',
        className
      )}
    >
      {children}
    </a>
  )
}
