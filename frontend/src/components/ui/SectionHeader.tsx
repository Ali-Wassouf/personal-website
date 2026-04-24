import { cn } from '../../lib/cn'

interface SectionHeaderProps {
  text: string
  accent?: 'eng' | 'music'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeader({
  text,
  accent = 'eng',
  className,
  as: Tag = 'h2',
}: SectionHeaderProps) {
  return (
    <Tag
      className={cn(
        'font-bold tracking-tight',
        accent === 'eng' ? 'text-[#00d4ff]' : 'text-[#f5a623]',
        Tag === 'h1' ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl',
        className
      )}
    >
      {text}
    </Tag>
  )
}
