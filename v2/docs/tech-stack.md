# Tech stack

Status: agreed on 2026-11-26.

## What the site is

A personal developer portfolio: one page of mostly static content (introduction, experience, skills), served as plain files by Apache on a personal NAS. There is no backend, no database and no login.

The stack follows from that. Everything is built ahead of time into static files, and the browser needs no server other than Apache.

## Chosen stack

| Area | Choice | Version at time of writing |
| --- | --- | --- |
| Runtime for building | Node.js | 24 (LTS) |
| Package manager | npm | ships with Node |
| Build tool and dev server | Vite | 8 |
| UI library | React | 19 |
| Language | TypeScript, strict mode | 7 |
| Styling | Plain CSS with CSS Modules and custom properties | built into Vite |
| Content | Typed TypeScript data files in the repo | n/a |
| Linting | ESLint with the TypeScript and React rule sets | 10 |
| Formatting | Prettier | 3 |
| Unit tests | Vitest | 5 |
| Browser checks | Playwright | current |

Exact versions are pinned in `package.json` and `package-lock.json` when the project is scaffolded.

## Why these

**Vite instead of Create React App.** v1 runs on Create React App 1, which is abandoned; its dev server no longer starts on current Node. Vite is the maintained standard for React projects, starts instantly and produces a small static build.

**React and TypeScript.** Both are in the Core stack on the site itself, so the site is also a small sample of the work it describes. TypeScript in strict mode replaces v1's untyped JavaScript and its untyped `data.json`.

**Plain CSS instead of a UI framework.** v1 loads all of Bootstrap and reactstrap for one page. v2 has a handful of components and gets its own look, so a framework would add weight and make the site look like a template. CSS Modules keep styles scoped to a component; custom properties hold the colors, spacing and type scale, including a dark theme.

**Content as typed data files.** Experience entries and skills live in `.ts` files with types, so a typo in a field name or a missing logo fails the build, not the live page. Editing content stays a one-file change, as in v1.

**No router.** The site is one page. Navigation is anchor links and native smooth scrolling, which replaces `react-router-dom` and `react-router-hash-link`.

**No service worker.** v1's service worker serves stale versions after a deploy. v2 relies on hashed file names and normal HTTP caching.

**Self-hosted assets.** Fonts and logos are served from the site itself. No third-party requests, so no cookie banner and nothing that breaks when a CDN changes.

## Dropped from v1

| v1 dependency | Replaced by |
| --- | --- |
| `react-scripts` 1 (Create React App) | Vite |
| Bootstrap 4, reactstrap | Plain CSS |
| `react-router-dom`, `react-router-hash-link` | Anchor links |
| `react-ga` (Universal Analytics, shut down by Google) | See open decisions |
| `react-global-configuration` | A typed constants file; the version comes from `package.json` |
| Service worker | Nothing |

## Build and deploy

- `npm run dev` starts the local dev server.
- `npm run build` type-checks and writes the static site to `v2/dist`.
- `npm run preview` serves `v2/dist` locally to check the real build.
- Deploy is unchanged: copy the contents of `v2/dist` to the Apache document root on the NAS.

## Further decisions

1. **Prerendering.** A plain Vite and React build ships an almost empty `index.html` and draws the page with JavaScript. Search engines and link previews handle real HTML better. The page is therefore rendered to HTML at build time, so the content is in `index.html` and React only adds interactivity on top.
2. **Analytics.** None at launch. v1's Google Analytics property no longer collects anything, and it is not replaced.
3. **Automated deploy.** GitHub Actions builds and lints on every push. Publishing to the NAS stays a manual copy.
4. **Tests.** The site has little logic, so tests are few: Vitest checks on the content data (every skill has a logo file, no duplicate keys) and one Playwright check that the page renders without console errors.
