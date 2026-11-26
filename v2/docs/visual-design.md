# Visual design

Status: direction agreed on 2026-11-26. Items under "Open decisions" are not settled.

## Direction

Dark, minimal, one page. The layout is modeled on [brittanychiang.com](https://brittanychiang.com): a fixed column with the name and navigation on the left, and the content scrolling on the right.

The layout is borrowed; the colors, type and details are our own, so the site does not read as a copy.

## Layout

### Desktop (wide screens)

Two columns, centered, with a maximum width of about 1200 px.

**Left column, fixed while the right one scrolls:**

- Name
- Title: Senior Software Engineer
- One-line tagline
- Section navigation: About, Experience, Skills. The section currently in view is highlighted.
- Social links (GitHub, LinkedIn, email) at the bottom

**Right column, scrolling:**

1. About: two or three short paragraphs
2. Experience: one card per job
3. Skills: three groups
4. Footer: how the site is built, version, credit

### Phone and tablet

One column. The left column's content becomes the top of the page, the section navigation is dropped, and each section gets a heading that sticks to the top of the screen while its section scrolls.

## Sections

### Experience card

- Date range on the left, in small muted text
- Title and company on the right, as the card's heading
- Technology tags as small pills under it
- Description text only where the entry has one
- The whole card highlights on hover; the other cards dim slightly

### Skills

The reference site has no skills section, so this part is our own design.

- Three groups, as in v1: Core stack, Also experienced with, How I work
- Each skill is a compact chip: logo and name
- No percentage bars. The group a skill sits in says how strong it is.

## Look

| Element | Choice |
| --- | --- |
| Background | Near-black neutral, not navy |
| Text | Off-white for headings, muted grey for body text |
| Accent | One color, used for links, the active navigation item, tag pills and hover states |
| Body and heading font | Inter |
| Small labels (dates, tags, navigation) | JetBrains Mono |
| Fonts | Served from the site, no third-party requests |
| Corners and borders | Slightly rounded cards, hairline borders, no drop shadows |
| Motion | Short hover transitions only; none when the visitor's system asks for reduced motion |

All colors, spacing and type sizes are defined once as CSS custom properties.

## Accessibility

- Text contrast meets WCAG AA on the dark background.
- Every interactive element is reachable by keyboard and has a visible focus outline.
- Section navigation uses real links and headings, so it works without JavaScript.

## Open decisions

1. **Accent color.** Candidates: amber (a nod to LEGO yellow), ember red (a nod to metal), steel blue (neutral). Recommendation: amber. To be chosen from a mockup, not from a description.
2. **Skill levels.** v1 shows 25/50/75/100 bars. Recommendation: drop them, as described above.
3. **Portrait.** v1 has a photo; the reference site does not. Recommendation: a small round portrait next to the name.
4. **Company logos.** v1 shows a logo per employer. Recommendation: text only, which keeps the cards calm and avoids logos that look wrong on a dark background.
5. **Light theme.** Recommendation: dark only at launch. Colors are custom properties, so a light theme can be added later without touching components.
6. **Credit.** Recommendation: a line in the footer saying the layout is inspired by Brittany Chiang's site, with a link.
