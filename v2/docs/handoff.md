# Handoff

Written on 2026-11-26, when work moved to another computer. It describes where the project stands and what comes next.

## Where things stand

| Part                    | State                                                                         |
| ----------------------- | ----------------------------------------------------------------------------- |
| Live site, damjanko.com | v1.1.14, built from `v1/`, deployed by hand to Apache on the NAS              |
| `v1/`                   | Frozen. Only touched if the live site needs a fix before v2 replaces it       |
| `v2/`                   | Working page with real layout and partly placeholder content. Not deployed    |
| Version of v2           | `2.0.0-alpha.0` in `v2/package.json`                                          |
| Checks on v2            | Formatting, lint, 14 unit tests and 7 browser tests all pass                  |
| CI                      | `.github/workflows/v2.yml` runs all of the above on every push touching `v2/` |

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
- [Visual design](visual-design.md): dark, minimal, one page; fixed left column and scrolling right column; amber accent; Inter and JetBrains Mono; a portrait; no skill levels, no company logos, no light theme, no credit line.

## What is built in v2

- **Left column:** portrait, name, title, tagline, section links that highlight while scrolling, and GitHub, LinkedIn and email links.
- **About:** one real paragraph and two filler paragraphs.
- **Experience:** all eight jobs from v1, as cards with years and technology tags.
- **Projects:** three filler cards, to show the layout.
- **Footer:** how the site is built, a link to the repository, and the version.
- **Phone layout:** one column, with section headings that stick to the top.

## What is left

### Content

Every placeholder is marked with the word `PLACEHOLDER` in `v2/src/content/`.

1. **Skills or Projects.** The one open design decision. The current lean is to drop the v1 skills grid and show projects. If so, choose three or four projects and describe them without naming clients.
2. **About text.** Replace the two filler paragraphs. AI-assisted development should be mentioned here, since it no longer has a skills tile.
3. **Tagline.** The current one is a stand-in. Decide whether "Metalhead | LEGO fan" from v1 comes back.
4. **Experience clean-up.** The older jobs still carry v1's tags unchanged, such as "Sublime Text", "Photoshop" and "Food delivery", and spell "Typescript" and "Javascript" differently from the newest job.
5. **Job end dates.** v1 stored only start dates, so each job's end is set to the next job's start. Correct any job that was followed by a gap.

### Design

6. **Portrait.** The full square photo is shown in a circle, 176 px on desktop and 128 px on phones, so the corners of the frame are clipped. Still open: larger, or a rounded square that shows the whole frame.
7. **Final look.** Tune the amber shade, spacing and type sizes once the real content is in.

### Release

8. Set the version to `2.0.0`, build, and copy the contents of `v2/dist` to the Apache document root on the NAS, replacing v1.
9. Tag the commit `v2.0.0`.
10. Afterwards, decide whether `v1/` stays in the repository.

## Things worth knowing

- **Run the build before the browser tests.** `npm run test:e2e` tests the contents of `v2/dist`, not the source.
- **v1 cannot run its dev server** on current Node. `npm run build` in `v1/` still works; serve `v1/build` with any static server to look at it.
- **The portrait is a file in the repository,** `v2/src/assets/portrait.jpg`, scaled down from the original photo. Replacing the photo means replacing that file.
- **Line endings.** Files in `v2/` use LF (`v2/.gitattributes`). The root `.gitignore` and the files in `v1/` use CRLF.
- **Conventions.** Commits go straight to `master` with short past-tense messages ("Added…", "Changed…"). A release is a commit named after the version plus a tag of the same name. All project documents are Markdown files in this folder.
- **No client names** anywhere on the site or in this repository.
