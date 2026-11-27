# Tech stack

Status: agreed on 2026-11-26.

## What the site is

A personal developer portfolio: one page of mostly static content (introduction, experience, skills), served as plain files by Apache on a personal NAS. There is no backend, no database and no login.

The stack follows from that. Everything is built ahead of time into static files, and the browser needs no server other than Apache.

## Chosen stack

| Area                      | Choice                                           | Version at time of writing |
| ------------------------- | ------------------------------------------------ | -------------------------- |
| Runtime for building      | Node.js                                          | 24 (LTS)                   |
| Package manager           | npm                                              | ships with Node            |
| Build tool and dev server | Vite                                             | 8                          |
| UI library                | React                                            | 19                         |
| Language                  | TypeScript, strict mode                          | 7                          |
| Styling                   | Plain CSS with CSS Modules and custom properties | built into Vite            |
| Content                   | Typed TypeScript data files in the repo          | n/a                        |
| Linting                   | Oxlint with the TypeScript and React rule sets   | 1                          |
| Formatting                | Prettier                                         | 3                          |
| Unit tests                | Vitest                                           | 5                          |
| Browser checks            | Playwright                                       | current                    |

Exact versions are pinned in `package.json` and `package-lock.json` when the project is scaffolded.

## Why these

**Vite instead of Create React App.** v1 runs on Create React App 1, which is abandoned; its dev server no longer starts on current Node. Vite is the maintained standard for React projects, starts instantly and produces a small static build.

**React and TypeScript.** Both are in the Core stack on the site itself, so the site is also a small sample of the work it describes. TypeScript in strict mode replaces v1's untyped JavaScript and its untyped `data.json`.

**Plain CSS instead of a UI framework.** v1 loads all of Bootstrap and reactstrap for one page. v2 has a handful of components and gets its own look, so a framework would add weight and make the site look like a template. CSS Modules keep styles scoped to a component; custom properties hold the colors, spacing and type scale, including a dark theme.

**Content as typed data files.** Experience entries and skills live in `.ts` files with types, so a typo in a field name or a missing logo fails the build, not the live page. Editing content stays a one-file change, as in v1.

**No router.** The site is one page. Navigation is anchor links and native smooth scrolling, which replaces `react-router-dom` and `react-router-hash-link`.

**No service worker.** v1's service worker serves stale versions after a deploy. v2 relies on hashed file names and normal HTTP caching.

**Self-hosted assets.** Fonts and logos are served from the site itself. No third-party requests, so no cookie banner and nothing that breaks when a CDN changes.

**Oxlint instead of ESLint.** The official Vite template for React and TypeScript now ships with Oxlint, a much faster linter that needs almost no configuration. v2 follows the template.

## Content and languages

Added on 2026-11-27.

**All text comes from one file.** The page shares its text with a CV that is kept outside this repository. The CV's build writes the public part of that text to `src/content/cv.generated.json`, in English and Slovenian. The file also holds the page's own text, such as section names, link labels and the footer, in its `web` part. That file is never edited here: a change is made at the source and arrives with the next CV build, and the changed file is then committed. Prettier skips it.

**What stays in this repository.** No text. `src/content/ui.ts` holds configuration: the languages, the two site addresses, the repository link and the order of the sections. `src/content/content.ts` turns the generated file into the content of the page in one language.

**Two pages, one build.** `npm run build` writes the English page to `dist/index.html` and the Slovenian page to `dist/sl/index.html`. Both use the same scripts, styles and images. A page's language is the `lang` attribute of its HTML, so there is still no router.

**One folder, two domains.** Both domains are served from the same folder. `public/.htaccess` makes the .si domain show the Slovenian page at its root address; it needs Apache's `mod_rewrite` and `AllowOverride`. Each page names the other as its translation, with `hreflang` links.

**Trying Slovenian locally.** `npm run dev` shows English; add `?lang=sl` to the address for Slovenian. `npm run preview` serves the built pages at `/` and `/sl/`.

## Dropped from v1

| v1 dependency                                         | Replaced by                                                   |
| ----------------------------------------------------- | ------------------------------------------------------------- |
| `react-scripts` 1 (Create React App)                  | Vite                                                          |
| Bootstrap 4, reactstrap                               | Plain CSS                                                     |
| `react-router-dom`, `react-router-hash-link`          | Anchor links                                                  |
| `react-ga` (Universal Analytics, shut down by Google) | See open decisions                                            |
| `react-global-configuration`                          | A typed constants file; the version comes from `package.json` |
| Service worker                                        | Nothing                                                       |

## Build and deploy

- `npm run dev` starts the local dev server.
- `npm run build` type-checks and writes the static site to `v2/dist`.
- `npm run preview` serves `v2/dist` locally to check the real build.
- Deploy is unchanged: copy the contents of `v2/dist` to the Apache document root on the NAS.

## Further decisions

1. **Prerendering.** A plain Vite and React build ships an almost empty `index.html` and draws the page with JavaScript. Search engines and link previews handle real HTML better. The page is therefore rendered to HTML at build time, so the content is in `index.html` and React only adds interactivity on top.
2. **Analytics.** None at launch. v1's Google Analytics property no longer collects anything, and it is not replaced.
3. **Automated deploy.** GitHub Actions builds and lints on every push. Publishing to the NAS stays a manual copy.
4. **Tests.** The site has little logic, so tests are few: Vitest checks on the content data (every skill has a logo file, no duplicate keys) and a few Playwright checks on the built site, on a desktop and a phone screen: the page renders without console errors, the content is in the HTML before JavaScript runs, and nothing scrolls sideways.
