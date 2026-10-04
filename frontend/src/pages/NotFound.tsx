import { ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/Button'

export function NotFound() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] max-w-full h-[240px] bg-gradient-to-tr from-cyan-600/10 via-indigo-600/10 to-transparent blur-[100px] pointer-events-none rounded-full" />
      <div className="relative space-y-5">
        <p className="text-xs font-mono text-cyan-400 tracking-wide">error / 404</p>
        <h1 className="text-6xl sm:text-8xl font-bold tracking-tight text-white">404</h1>
        <p className="text-zinc-400 text-sm sm:text-base">This page doesn't exist — or it moved.</p>
        <div className="pt-2">
          <Button asLink="/" variant="secondary">
            <ArrowLeft className="w-4 h-4" />
            Back home
          </Button>
        </div>
      </div>
    </div>
  )
}
