# Light Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The page has a light and a dark theme, follows the device by default, and has an icon toggle whose choice is saved in local storage.

**Architecture:** Color tokens hold the light values; the dark values apply through `prefers-color-scheme` or a `data-theme` attribute on `<html>`. An inline script in the page head applies a saved choice before the first paint. A small module, `src/theme.ts`, holds the logic the toggle button uses.

**Tech Stack:** CSS custom properties, React 19, TypeScript, Vitest, Playwright, Font Awesome Free icon data.

**Spec:** [`light-theme.md`](light-theme.md)

## Global Constraints

- All commands run in `v2/`. Build before browser tests: `npm run build`, then `npm run test:e2e`.
- Local storage key: `theme`. Valid values: `light`, `dark`. Anything else is ignored.
- Attribute: `data-theme` on `<html>`, values `light` or `dark`.
- Color values are the ones in the spec's table, copied exactly.
- The toggle has no text and no accessible name. No new text anywhere; `cv.generated.json` is not edited.
- No hex or `rgb()` color outside `tokens.css`.
- Commits go to `master`, short past-tense messages, with the session's attribution lines. No push.

## Review Focus

1. **Storage is blocked** (private mode, strict settings): the page still renders, and the toggle still switches the theme for this visit. Test in Task 2.
2. **Stored value is not `light` or `dark`:** ignored, the page follows the device. Test in Task 1.
3. **Device switches theme while the page is open, no saved choice:** the page follows. Test in Task 1.
4. **Device switches theme while a choice is saved:** the choice wins. Test in Task 2.
5. **The two languages are on two domains,** so each has its own local storage and a choice made on one is not known on the other. Accepted, no test; say so in the documents (Task 3).

---

### Task 1: Colors and the saved choice

**Files:**

- Modify: `src/styles/tokens.css`, `src/styles/global.css`, `src/components/Section.module.css:8`, `index.html`
- Test: `e2e/page.spec.ts`

**Interfaces:**

- Produces: tokens `--color-bg-veil`, `--show-in-light`, `--show-in-dark` (each `block` or `none`); `data-theme` on `<html>` set from local storage key `theme`.

- [ ] **Step 1: Write the failing browser tests** in a new `test.describe('theme')` in `e2e/page.spec.ts`. Background colors: light `rgb(247, 247, 245)`, dark `rgb(15, 16, 18)`, read as `getComputedStyle(document.body).backgroundColor`.
  - "is light on a light device": `page.emulateMedia({ colorScheme: 'light' })`, go to `/`, expect light.
  - "is dark on a dark device": same with `dark`.
  - "follows the device while open": load as light, call `emulateMedia` with `dark`, expect dark.
  - "applies a saved choice before the device setting": `page.addInitScript(() => localStorage.setItem('theme', 'light'))`, device dark, expect light and `html[data-theme="light"]`.
  - "ignores a saved value it does not know": init script stores `blue`, device dark, expect dark and no `data-theme` attribute.

- [ ] **Step 2: Build and run them.** `npm run build; npm run test:e2e`. Expected: the light-device, saved-choice tests fail.

- [ ] **Step 3: Rewrite the color block of `tokens.css`.** `:root` holds the light values plus `--color-bg-veil: rgb(247 247 245 / 85%)`, `--show-in-light: block`, `--show-in-dark: none`. The dark values (today's, plus `--color-bg-veil: rgb(15 16 18 / 85%)` and the two `--show-in-*` swapped) go in two rules with identical contents:

  ```css
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme='light']) { … }
  }
  :root[data-theme='dark'] { … }
  ```

  Add `color-scheme: light` to the light block and `color-scheme: dark` to both dark blocks. A comment says the two dark blocks must stay identical.

- [ ] **Step 4:** In `global.css` remove `color-scheme: dark` from `html`. In `Section.module.css` replace the written-in background with `var(--color-bg-veil)`. In `index.html` set the `color-scheme` meta to `light dark` and add, before the icon link, an inline script: in a `try`, read `localStorage.getItem('theme')`; if it is `light` or `dark`, set `document.documentElement.dataset.theme`; the `catch` is empty.

- [ ] **Step 5: Check the prerender keeps the script.** `npm run build`, then confirm `dist/index.html` and `dist/sl/index.html` both contain `localStorage`.

- [ ] **Step 6: Run all checks.** `npm run format:check; npm run lint; npm test; npm run test:e2e` (use the script names in `package.json`). Expected: all pass.

- [ ] **Step 7: Commit** "Added a light theme that follows the device".

### Task 2: The toggle

**Files:**

- Create: `src/theme.ts`, `src/theme.test.ts`, `src/components/ThemeToggle.tsx`, `src/components/ThemeToggle.module.css`
- Modify: `src/components/linkIcons.ts` (export sun and moon shapes), `src/components/Sidebar.tsx:59-68`, `src/components/Sidebar.module.css`
- Test: `src/theme.test.ts`, `e2e/page.spec.ts`

**Interfaces:**

- Consumes: `--show-in-light`, `--show-in-dark`, `data-theme`, storage key `theme` from Task 1; `LinkIcon({ shape, className })` and `IconShape`.
- Produces, in `src/theme.ts`:
  - `type Theme = 'light' | 'dark'`
  - `isTheme(value: unknown): value is Theme`
  - `otherTheme(theme: Theme): Theme`
  - `shownTheme(): Theme` — the `data-theme` attribute if valid, else `matchMedia('(prefers-color-scheme: dark)')`
  - `toggleTheme(): void` — sets the other theme as `data-theme`, then saves it; a failing save is swallowed.

- [ ] **Step 1: Write the failing unit tests** in `src/theme.test.ts`: `otherTheme('light')` is `'dark'` and the reverse; `isTheme` accepts `'light'` and `'dark'` and rejects `'blue'`, `''`, `null`, `undefined`.

- [ ] **Step 2: Run them.** `npm test`. Expected: fail, module not found.

- [ ] **Step 3: Implement `src/theme.ts`** with the signatures above. Run `npm test`. Expected: pass.

- [ ] **Step 4: Write the failing browser tests** in the `theme` describe. The toggle is `page.getByTestId('theme-toggle')`.
  - "the toggle switches the theme and saves it": device dark, click, expect light and `localStorage.theme === 'light'`; click again, expect dark and `'dark'`.
  - "a saved choice survives a reload and a device change": device dark, click, reload, expect light; `emulateMedia` dark again, still light.
  - "the toggle shows a sun in dark and a moon in light": exactly one of `[data-icon="sun"]`, `[data-icon="moon"]` inside the toggle is visible, sun when dark, moon when light.
  - "the toggle works when storage is blocked": init script replaces `Storage.prototype.setItem` with a function that throws; click; expect the theme switched and no page error (`page.on('pageerror')`).

- [ ] **Step 5: Build `ThemeToggle`.** A `<button type="button" data-testid="theme-toggle" onClick={toggleTheme}>` holding two `LinkIcon`s, each in a span with `data-icon` and `display: var(--show-in-dark)` (sun) or `var(--show-in-light)` (moon). No state, no effect, no label. Icons: `faSun` and `faMoon` from `@fortawesome/free-solid-svg-icons`, exported from `linkIcons.ts` as `themeIcons`. Style it like `.iconLink` in `Sidebar.module.css` (same size, grey, amber on hover, no button border or background, pointer cursor). Place it in `Sidebar.tsx` as a new `<li>` after the language item.

- [ ] **Step 6: Run all checks** as in Task 1 Step 6. Expected: all pass.

- [ ] **Step 7: Look at it.** In the dev server at http://localhost:5173/, in both themes, at desktop and phone width: contact row, toggle, cards on hover, tags, focus outline, sticky phone heading, text selection. Fix what looks wrong using tokens only.

- [ ] **Step 8: Commit** "Added a theme toggle".

### Task 3: Documents

**Files:**

- Modify: `docs/visual-design.md`, `docs/handoff.md`, `docs/light-theme.md`

- [ ] **Step 1:** In `visual-design.md`: Direction says light and dark; the left column list gets the toggle; the Look table gets both values per color; decision 5 is marked as replaced on 2026-11-27 by a new decision ("Light and dark, following the device, with a toggle"). Note that the two domains remember the choice separately.
- [ ] **Step 2:** In `handoff.md`: left column mentions the toggle, test counts updated to the real numbers, "no light theme" removed from the decisions summary.
- [ ] **Step 3:** In `light-theme.md`: status becomes "built", and the color table shows the final values.
- [ ] **Step 4:** `npm run format:check`, then commit "Documented the light theme".
