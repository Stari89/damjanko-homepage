import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { getContent } from './content/content.ts'
import { languages, siteUrl, type Language } from './content/ui.ts'

// Used only at build time by scripts/prerender.mjs.

export { languages, siteUrl }

/** Renders the page in one language to an HTML string. */
export function render(language: Language): string {
  return renderToString(
    <StrictMode>
      <App language={language} />
    </StrictMode>,
  )
}

/** The text of the page's meta description in one language. */
export function description(language: Language): string {
  const content = getContent(language)
  return `${content.name}, ${content.title}`
}
