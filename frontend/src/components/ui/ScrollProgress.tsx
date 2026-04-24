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
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-[#1e1e2e]">
      <div
        className="h-full transition-all duration-75"
        style={{
          width: `${progress}%`,
          background: accent === 'eng' ? '#00d4ff' : '#f5a623',
        }}
      />
    </div>
  )
}
