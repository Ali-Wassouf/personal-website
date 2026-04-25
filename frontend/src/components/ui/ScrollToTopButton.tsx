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
      className="fixed bottom-6 right-6 z-50 p-2.5 rounded-full border border-[#252540] bg-[#0f0f1a] text-[#8888a8] hover:text-[#22d3ee] hover:border-[#22d3ee40] hover:bg-[#22d3ee0a] transition-all duration-200 shadow-lg"
    >
      <ArrowUp size={16} />
    </button>
  )
}
