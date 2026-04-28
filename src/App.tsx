import { I18nHtmlSync } from '@/components/I18nHtmlSync'
import { BackgroundMesh } from '@/components/BackgroundMesh'
import { ScrollProgress } from '@/components/ScrollProgress'
import { CursorGlow } from '@/components/CursorGlow'
import { Nav } from '@/sections/Nav'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Projects } from '@/sections/Projects'
import { Contact } from '@/sections/Contact'

function App() {
  return (
    <>
      <I18nHtmlSync />
      <ScrollProgress />
      <CursorGlow />
      <BackgroundMesh />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  )
}

export default App
