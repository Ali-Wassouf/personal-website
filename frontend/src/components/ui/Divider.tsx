import { cn } from '../../lib/cn'

export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn('relative flex items-center my-16', className)}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#252540] to-transparent" />
      <div className="mx-4 flex items-center gap-1.5">
        <div className="w-1 h-1 rounded-full bg-[#22d3ee] opacity-50" />
        <div className="w-1 h-1 rounded-full bg-[#a855f7] opacity-50" />
        <div className="w-1 h-1 rounded-full bg-[#fb923c] opacity-50" />
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#252540] to-transparent" />
    </div>
  )
}
