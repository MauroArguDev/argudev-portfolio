import './App.css'
import { I18nHtmlSync } from '@/components/I18nHtmlSync'

function App() {
  return (
    <>
      <I18nHtmlSync />
      <div>
        <h1 className="font-display font-bold text-[clamp(22px,5vw,32px)] tracking-[-0.8px] leading-[1.15] text-platinum px-6 py-4">
          Hello World
        </h1>
      </div>
    </>
  )
}

export default App
