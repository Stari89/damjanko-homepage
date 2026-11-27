## damjanko-homepage v2

Rewrite of the site, in progress. The live site is still built from [`../v1`](../v1).

Decisions are written down in [`docs/`](docs):

- [Tech stack](docs/tech-stack.md)
- [Visual design](docs/visual-design.md)
- [Deployment](docs/deployment.md)
- [Handoff](docs/handoff.md): where the work stands and what is left

### Commands

Run these from the `v2` folder. Node 24 is required. The browser tests need a one-time `npx playwright install chromium`.

| Command                | What it does                                                 |
| ---------------------- | ------------------------------------------------------------ |
| `npm install`          | Installs dependencies                                        |
| `npm run dev`          | Starts the dev server with live reload                       |
| `npm run build`        | Type-checks, builds to `dist/` and prerenders both languages |
| `npm run preview`      | Serves `dist/` locally to check the real build               |
| `npm run lint`         | Lints with Oxlint                                            |
| `npm run format`       | Formats all files with Prettier                              |
| `npm run format:check` | Fails if any file is not formatted                           |
| `npm test`             | Runs the unit tests                                          |
| `npm run test:e2e`     | Builds, then runs the browser tests against `dist/`          |

### Layout

| Path                    | Contents                                                                         |
| ----------------------- | -------------------------------------------------------------------------------- |
| `src/content/`          | The site's text, in one generated JSON file, and the code that reads it          |
| `src/styles/tokens.css` | Colors, fonts and spacing for both themes                                        |
| `src/styles/global.css` | Base styles for the whole page                                                   |
| `src/App.tsx`           | The page                                                                         |
| `src/components/`       | The parts of the page                                                            |
| `e2e/`                  | Browser tests                                                                    |
| `src/entry-server.tsx`  | Renders the page to HTML at build time                                           |
| `scripts/prerender.mjs` | Writes that HTML into `dist/index.html` and `dist/sl/index.html` after the build |
| `public/`               | Files copied to the site root unchanged                                          |
