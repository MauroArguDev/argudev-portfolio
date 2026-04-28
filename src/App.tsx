import './App.css'
import { I18nHtmlSync } from '@/components/I18nHtmlSync'
import { BackgroundMesh } from '@/components/BackgroundMesh'
import { ScrollProgress } from '@/components/ScrollProgress'
import { CursorGlow } from '@/components/CursorGlow'
import { Nav } from '@/sections/Nav'

function App() {
  return (
    <>
      <I18nHtmlSync />
      <ScrollProgress />
      <CursorGlow />
      <BackgroundMesh />
      <Nav />
      <main>
        <section id="hero" className="min-h-screen" />
        <section id="about" className="min-h-screen" />
        <section id="projects" className="min-h-screen" />
        <section id="contact" className="min-h-screen" />
      </main>
    </>
  )
}

export default App
