import { lazy, Suspense, useState, useEffect } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import { useTranslation } from 'react-i18next'
import { I18nHtmlSync } from '@/components/I18nHtmlSync'
import { Backdrop } from '@/components/Backdrop'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Nav } from '@/sections/Nav'
import { Hero } from '@/sections/Hero'

const About = lazy(() => import('@/sections/About').then(m => ({ default: m.About })))
const Work = lazy(() => import('@/sections/Work').then(m => ({ default: m.Work })))
const Contact = lazy(() => import('@/sections/Contact').then(m => ({ default: m.Contact })))
const Footer = lazy(() => import('@/sections/Footer').then(m => ({ default: m.Footer })))

function App() {
  const [langChanging, setLangChanging] = useState(false)
  const { t } = useTranslation()

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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-violet focus:text-platinum focus:font-mono focus:text-[14px] focus:shadow-lg"
      >
        {t('a11y.skip_to_content')}
      </a>
      <ScrollProgress />
      <Backdrop />
      <Nav />

      {/* Content wrapper — fades on language change.
          Nav is intentionally outside: position:fixed breaks inside transformed parents. */}
      <div
        className={[
          "transition-[opacity,translate] duration-150 ease-in-out",
          langChanging ? "opacity-0 translate-y-1.5" : "",
        ].join(" ")}
      >
        <main id="main" tabIndex={-1} style={{ outline: "none" }}>
          <Hero />
          <Suspense fallback={null}>
            <Work />
            <About />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>

      <SpeedInsights />
      <Analytics />
    </>
  )
}

export default App
