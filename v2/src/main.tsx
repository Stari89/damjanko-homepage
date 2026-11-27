import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import './styles/tokens.css'
import './styles/global.css'
import App from './App.tsx'
import type { Language } from './content/ui.ts'

/**
 * The language of a built page is the one its HTML was prerendered in.
 * The dev server has one page, so there `?lang=sl` switches it to Slovenian.
 */
function pageLanguage(): Language {
  if (import.meta.env.DEV && new URLSearchParams(location.search).get('lang') === 'sl') {
    document.documentElement.lang = 'sl'
  }
  return document.documentElement.lang === 'sl' ? 'sl' : 'en'
}

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App language={pageLanguage()} />
  </StrictMode>
)

// The production build ships prerendered HTML (see scripts/prerender.mjs);
// the dev server serves an empty root.
if (root.firstElementChild) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
