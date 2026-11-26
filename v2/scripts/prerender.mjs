// Renders the app to HTML and writes it into dist/index.html, so the page
// content is in the file Apache serves and does not depend on JavaScript.
// Runs after `vite build`.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'vite'

const root = fileURLToPath(new URL('..', import.meta.url))
const ssrDir = `${root}dist-ssr`
const htmlPath = `${root}dist/index.html`
const placeholder = '<!--app-html-->'

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
  const { render } = await import(pathToFileURL(`${ssrDir}/entry-server.js`).href)
  const html = await readFile(htmlPath, 'utf8')
  if (!html.includes(placeholder)) {
    throw new Error(`${placeholder} not found in dist/index.html`)
  }
  await writeFile(htmlPath, html.replace(placeholder, render()))
  console.log('Prerendered dist/index.html')
} finally {
  await rm(ssrDir, { recursive: true, force: true })
}
