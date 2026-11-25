import { StrictMode } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import './styles/fonts'
import './lib/i18n'
import './styles/globals.css'
import App from './App.tsx'
import { initialHashTarget, revealArrival } from './lib/hashTarget'

// Opened at /#work and the like (the links back from the blog): the content stays hidden until
// the lazy sections exist and ScrollToHash has scrolled to the section, then rises in
// (globals.css), instead of showing the hero and jumping. Shown anyway after 3s in case a chunk
// fails to load.
if (initialHashTarget()) {
  document.documentElement.dataset.arriving = ''
  setTimeout(revealArrival, 3000)
}

// Rendered synchronously so the first frame (captured by the page transition from the blog)
// already has Nav and Hero; the lazy sections follow.
const root = createRoot(document.getElementById('root')!)
flushSync(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
