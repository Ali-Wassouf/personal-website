import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full border border-white/[0.1] bg-[#0d1017]/90 backdrop-blur-md text-zinc-400 hover:text-white hover:border-white/[0.2] transition-colors shadow-lg"
    >
      <ArrowUp size={16} />
    </button>
  )
}
