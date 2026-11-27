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

/** The page's title and meta description in one language. */
export function head(language: Language): { title: string; description: string } {
  const content = getContent(language)
  return { title: content.name, description: `${content.name}, ${content.title}` }
}
