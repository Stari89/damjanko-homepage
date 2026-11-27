// Renders the app to HTML once per language, so the page content is in the
// files Apache serves and does not depend on JavaScript. English is written to
// dist/index.html and Slovenian to dist/sl/index.html. Runs after `vite build`.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'vite'

const root = fileURLToPath(new URL('..', import.meta.url))
const ssrDir = `${root}dist-ssr`
const templatePath = `${root}dist/index.html`
const outputPath = { en: 'dist/index.html', sl: 'dist/sl/index.html' }

const appPlaceholder = '<!--app-html-->'
const languageAttribute = '<html lang="en">'
const descriptionTag = /<meta name="description" content="[^"]*" \/>/
const headEnd = '</head>'

function escapeAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
}

/** Replaces one part of the template, and fails the build if the part is missing. */
function replaceOnce(html, target, replacement) {
  const found = typeof target === 'string' ? html.includes(target) : target.test(html)
  if (!found) {
    throw new Error(`${target} not found in dist/index.html`)
  }
  return html.replace(target, () => replacement)
}

await build({
  root,
  logLevel: 'warn',
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'dist-ssr',
    emptyOutDir: true,
    copyPublicDir: false,
  },
})

try {
  const { render, description, languages, siteUrl } = await import(
    pathToFileURL(`${ssrDir}/entry-server.js`).href
  )
  const template = await readFile(templatePath, 'utf8')

  // Tells search engines that the two addresses are one page in two languages.
  const alternates = languages
    .map(
      (language) => `<link rel="alternate" hreflang="${language}" href="${siteUrl[language]}" />`,
    )
    .join('\n    ')

  for (const language of languages) {
    let html = template
    html = replaceOnce(html, languageAttribute, `<html lang="${language}">`)
    html = replaceOnce(
      html,
      descriptionTag,
      `<meta name="description" content="${escapeAttribute(description(language))}" />`,
    )
    html = replaceOnce(
      html,
      headEnd,
      `  <link rel="canonical" href="${siteUrl[language]}" />\n    ${alternates}\n  ${headEnd}`,
    )
    html = replaceOnce(html, appPlaceholder, render(language))

    const path = `${root}${outputPath[language]}`
    await mkdir(path.slice(0, path.lastIndexOf('/')), { recursive: true })
    await writeFile(path, html)
    console.log(`Prerendered ${outputPath[language]}`)
  }
} finally {
  await rm(ssrDir, { recursive: true, force: true })
}
