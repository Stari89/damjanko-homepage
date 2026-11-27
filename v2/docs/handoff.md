# Handoff

Written on 2026-11-26, when work moved to another computer. It describes where the project stands and what comes next.

## Where things stand

| Part                    | State                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------- |
| Live site, damjanko.com | v1.1.14, built from `v1/`, deployed by hand over FTP to shared hosting                  |
| `v1/`                   | Frozen. Only touched if the live site needs a fix before v2 replaces it                 |
| `v2/`                   | Working page in English and Slovenian with real content. Not deployed                   |
| Version of v2           | `2.0.0-alpha.0` in `v2/package.json`                                                    |
| Checks on v2            | Formatting, lint, 60 unit tests and 77 browser tests pass; 19 browser tests are skipped |
| CI                      | `.github/workflows/v2.yml` runs all of the above on every push touching `v2/`           |

## Setting up on a new computer

1. Clone `https://github.com/Stari89/damjanko-homepage` and check out `master`.
2. Make sure commits and pushes in this repo use the personal GitHub account, not a work account:

   ```
   git config user.name "Damjan Kovačič"
   git config user.email "<personal email>"
   ```

3. Install Node 24.
4. In `v2/`:

   ```
   npm install
   npx playwright install chromium
   npm run dev
   ```

The commands are listed in [`../README.md`](../README.md).

## Decisions already made

These are settled; the reasons are in the linked documents.

- [Tech stack](tech-stack.md): Vite, React, TypeScript, plain CSS with CSS Modules, content in typed data files, prerendered HTML, no router, no analytics, no service worker.
- [Visual design](visual-design.md): light and dark theme following the device, with a toggle; minimal, one page; fixed left column and scrolling right column; amber accent; Inter and JetBrains Mono; a portrait; no skill levels, no company logos, no credit line.

## What is built in v2

- **Two languages:** English and Slovenian, built as two pages from the same code.
- **Left column:** portrait, name, title, location, tagline, section links that highlight while scrolling, six contact links shown as icons, a link to the other language, and the theme toggle (a sun or a moon, saved in local storage per domain).
- **About:** one paragraph, the CV's summary.
- **Experience:** seven jobs. The three newest are cards with years, a short paragraph and technology tags; the four oldest are compact rows with one sentence, which unfold to the full description and tags under the pointer.
- **Projects:** three personal projects with years, links, a description and tags.
- **Footer:** how the site is built, a link to the repository, and the version.
- **Light and dark theme:** the page follows the device, and the toggle overrides it. See [Light theme](light-theme.md).
- **Phone layout:** one column, with section headings that stick to the top.

## What is left

### Content

The page shares its text with a generic CV, which is written elsewhere in English and Slovenian. The text is written and approved there and reaches this repository as a generated file; see "Content and languages" in [Tech stack](tech-stack.md). No placeholder text is left on the page.

1. **About text.** It is the summary of the CVs already sent, which leads with frontend work. It is to be replaced at the source when the generic CV text is written.
2. **Company names.** Which companies carry "d.o.o." may be revisited.

### Design

3. **Portrait.** The full square photo is shown in a circle, 176 px on desktop and 128 px on phones, so the corners of the frame are clipped. Still open: larger, or a rounded square that shows the whole frame.
4. **Final look.** Tune the amber shade, spacing and type sizes now that the real content is in.

### Release

5. Set the version to `2.0.0`, build, and copy the contents of `v2/dist` into the folder of each domain, replacing v1. The steps and the checks are in [Deployment](deployment.md).
6. Tag the commit `v2.0.0`.
7. Remove `v1/` from the repository in the release commit. Decided on 2026-11-27: v1 goes away when v2 is deployed. It stays in the git history and under the tag `v1.1.14`, if that tag exists; otherwise tag its last commit first.

## Things worth knowing

- **The browser tests build first.** `npm run test:e2e` runs the build and then tests the contents of `v2/dist`, not the source. It uses port 4317 and fails if that port is taken.
- **Low desktop windows.** The left column does not scroll. Below 48rem of window height it gets tighter in two steps, and below 36rem it scrolls with the page. The heights are in `Sidebar.module.css`; a new line of text in the column means measuring again.
- **v1 cannot run its dev server** on current Node. `npm run build` in `v1/` still works; serve `v1/build` with any static server to look at it.
- **The portrait is a file in the repository,** `v2/src/assets/portrait.jpg`, scaled down from the original photo. Replacing the photo means replacing that file.
- **Line endings.** Files in `v2/` use LF (`v2/.gitattributes`). The root `.gitignore` and the files in `v1/` use CRLF.
- **Conventions.** Commits go straight to `master` with short past-tense messages ("Added…", "Changed…"). A release is a commit named after the version plus a tag of the same name. All project documents are Markdown files in this folder.
- **No client names** anywhere on the site or in this repository.
