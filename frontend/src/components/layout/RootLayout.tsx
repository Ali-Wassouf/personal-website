import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { ScrollToTopButton } from '../ui/ScrollToTopButton'

export function RootLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
