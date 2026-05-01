import { lazy, Suspense, useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import { I18nHtmlSync } from '@/components/I18nHtmlSync'
import { BackgroundMesh } from '@/components/BackgroundMesh'
import { ScrollProgress } from '@/components/ScrollProgress'
import { CursorGlow } from '@/components/CursorGlow'
import { PageTransition } from '@/components/PageTransition'
import { Nav } from '@/sections/Nav'
import { Hero } from '@/sections/Hero'

const About = lazy(() => import('@/sections/About').then(m => ({ default: m.About })))
const Projects = lazy(() => import('@/sections/Projects').then(m => ({ default: m.Projects })))
const Contact = lazy(() => import('@/sections/Contact').then(m => ({ default: m.Contact })))
const Footer = lazy(() => import('@/sections/Footer').then(m => ({ default: m.Footer })))

function App() {
  const location = useLocation()
  const [langChanging, setLangChanging] = useState(false)

  useEffect(() => {
    const fadeOut = () => setLangChanging(true)
    const fadeIn  = () => setLangChanging(false)
    window.addEventListener("lang-fade-out", fadeOut)
    window.addEventListener("lang-fade-in",  fadeIn)
    return () => {
      window.removeEventListener("lang-fade-out", fadeOut)
      window.removeEventListener("lang-fade-in",  fadeIn)
    }
  }, [])

  return (
    <>
      <I18nHtmlSync />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-violet focus:text-platinum focus:rounded-lg focus:font-mono focus:text-[14px] focus:shadow-lg"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <CursorGlow />
      <BackgroundMesh />
      <Nav />

      {/* Content wrapper — fades on language change.
          Nav is intentionally outside: position:fixed breaks inside transformed parents. */}
      <motion.div
        animate={{ opacity: langChanging ? 0 : 1, y: langChanging ? 6 : 0 }}
        transition={{ duration: 0.16, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <main id="main" tabIndex={-1} style={{ outline: "none" }}>
                    <Hero />
                    <Suspense fallback={null}>
                      <About />
                      <Projects />
                      <Contact />
                    </Suspense>
                  </main>
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </motion.div>

      <SpeedInsights />
      <Analytics />
    </>
  )
}

export default App
