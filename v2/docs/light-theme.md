# Light theme

Status: built on 2026-11-27.

## Why

The CV is also published as a PDF, which is light so that it prints well. The page and the PDF should look like the same thing. The page leads: its light theme is designed here first, and the PDF takes its look from it, never the other way around.

## Goals

- The page has a light and a dark theme.
- A first-time visitor sees the theme their device is set to. If the device switches while the page is open, the page follows.
- A toggle switches to the other theme. The choice is saved in the browser's local storage and wins over the device setting from then on.
- Amber stays the accent in both themes.
- No flash of the wrong theme on load.

## Not goals

- Changing the PDF. That is done at the CV source.
- A way back to "follow the device" once a choice is saved.
- A text name for the toggle. It is an icon only, so screen readers announce it as "button". The site's owner decided this. A name can be added later through the generated content file.

## Approaches

1. **Media query plus an attribute (chosen).** CSS follows the device setting. A saved choice is set as `data-theme` on `<html>` and overrides it. Works in every browser and without JavaScript. The dark values are written twice in `tokens.css`.
2. **The CSS `light-dark()` function.** Each color written once with both values. Rejected: browsers from before mid-2024, such as iPhones that stopped at iOS 16, would show the page without colors.
3. **Script decides everything.** Colors written once. Rejected: without JavaScript the page is stuck in one theme.

## Design

### Colors

`tokens.css` holds the light values in `:root`. The dark values apply in two cases: the device prefers dark and no light choice is saved, or `data-theme="dark"` is set. `color-scheme` follows the same rules, so scrollbars and form controls match.

The values as built. `tokens.css` is the source of truth:

| Token                 | Dark                    | Light                   |
| --------------------- | ----------------------- | ----------------------- |
| `--color-bg`          | `#0f1012`               | `#f7f7f5`               |
| `--color-surface`     | `#17191c`               | `#ffffff`               |
| `--color-border`      | `#26292e`               | `#dfe1e4`               |
| `--color-text`        | `#a3a8b0`               | `#4b5159`               |
| `--color-text-strong` | `#eceef1`               | `#16181b`               |
| `--color-text-muted`  | `#868c96`               | `#646a73`               |
| `--color-accent`      | `#f5b83d`               | `#a85100`               |
| `--color-accent-soft` | `rgb(245 184 61 / 12%)` | `rgb(245 184 61 / 30%)` |
| `--color-accent-fill` | `#f5b83d`               | `#f5b83d`               |
| `#9a4a00`             |

Bright amber cannot be read as text on a light background. In the light theme it is therefore used for fills only: the tag backgrounds and the text selection. Links and other amber text use the darker accent, and tag text is a shade darker still so that it stays readable on its amber tint.

Text contrast stays at WCAG AA or better in both themes.

The sticky section heading on phones has the dark background written in directly. It gets a token of its own, `--color-bg-veil`, with a value per theme.

### Saved choice

A few lines of inline script in the `<head>` of `index.html` read `theme` from local storage. If it is `light` or `dark`, they set `data-theme` on `<html>` before the page is drawn. Reading is wrapped so that a browser that blocks storage still shows the page.

### Toggle

- An icon button in the row of contact links, after the language link. The two are one group. Where the row is too narrow for the group to fit beside the contact icons (phones, narrow desktop windows), the group is on its own row.
- It shows a sun in the dark theme and a moon in the light theme (Font Awesome Free, as the other icons).
- Both icons are in the HTML and CSS shows the right one. The prebuilt page is then correct in either theme before any script runs.
- A click works out the theme now shown (the attribute, or else the device setting), sets the other one as `data-theme` and saves it.

### Other

- The `color-scheme` meta tag changes from `dark` to `light dark`.
- The favicon stays as it is.

## Checks

- Unit test for the function that picks the other theme.
- Browser tests: the page is light on a light device and dark on a dark one; the toggle flips the theme; the choice survives a reload and wins over the device setting.

## Documents updated

- [Visual design](visual-design.md): decision 5 ("no light theme") is replaced, and the Look table gets both palettes.
- [Handoff](handoff.md): the toggle in the left column, the test counts.
