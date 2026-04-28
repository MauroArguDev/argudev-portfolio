import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { I18nHtmlSync } from '@/components/I18nHtmlSync'
import { BackgroundMesh } from '@/components/BackgroundMesh'
import { ScrollProgress } from '@/components/ScrollProgress'
import { CursorGlow } from '@/components/CursorGlow'
import { PageTransition } from '@/components/PageTransition'
import { Nav } from '@/sections/Nav'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Projects } from '@/sections/Projects'
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'

function App() {
  const location = useLocation()

  return (
    <>
      <I18nHtmlSync />
      <ScrollProgress />
      <CursorGlow />
      <BackgroundMesh />
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <main>
                  <Hero />
                  <About />
                  <Projects />
                  <Contact />
                </main>
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default App
