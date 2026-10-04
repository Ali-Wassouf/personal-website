import { useEffect, useState } from 'react'

export function ScrollProgress({ accent = 'eng' }: { accent?: 'eng' | 'music' }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100
      setProgress(Math.min(100, Math.max(0, pct)))
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-50">
      <div
        className={
          accent === 'eng'
            ? 'h-full bg-gradient-to-r from-cyan-400 to-indigo-500'
            : 'h-full bg-gradient-to-r from-amber-500 to-amber-300'
        }
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
