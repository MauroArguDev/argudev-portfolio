import { StrictMode } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import './styles/fonts'
import './lib/i18n'
import './styles/globals.css'
import App from './App.tsx'

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
