## damjanko-homepage v2

Rewrite of the site, in progress. The live site is still built from [`../v1`](../v1).

Decisions are written down in [`docs/`](docs):

- [Tech stack](docs/tech-stack.md)
- [Visual design](docs/visual-design.md)

### Commands

Run these from the `v2` folder. Node 24 is required.

| Command                | What it does                                                    |
| ---------------------- | --------------------------------------------------------------- |
| `npm install`          | Installs dependencies                                           |
| `npm run dev`          | Starts the dev server with live reload                          |
| `npm run build`        | Type-checks, builds to `dist/` and prerenders `dist/index.html` |
| `npm run preview`      | Serves `dist/` locally to check the real build                  |
| `npm run lint`         | Lints with Oxlint                                               |
| `npm run format`       | Formats all files with Prettier                                 |
| `npm run format:check` | Fails if any file is not formatted                              |
| `npm test`             | Runs the unit tests                                             |

### Layout

| Path                    | Contents                                                 |
| ----------------------- | -------------------------------------------------------- |
| `src/content/`          | The site's text and data, as typed TypeScript files      |
| `src/styles/tokens.css` | Colors, fonts and spacing; the only place values are set |
| `src/styles/global.css` | Base styles for the whole page                           |
| `src/App.tsx`           | The page                                                 |
| `src/entry-server.tsx`  | Renders the page to HTML at build time                   |
| `scripts/prerender.mjs` | Writes that HTML into `dist/index.html` after the build  |
| `public/`               | Files copied to the site root unchanged                  |
