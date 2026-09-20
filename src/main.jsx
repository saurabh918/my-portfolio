import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

const navigationEntry = performance.getEntriesByType('navigation')[0]

if (navigationEntry?.type === 'reload') {
  if (window.location.hash) {
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
  }
  window.scrollTo(0, 0)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
