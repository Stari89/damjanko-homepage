# Visual design

Status: direction and look agreed on 2026-11-26, sections and languages on 2026-11-27.

## Direction

Dark, minimal, one page. The layout is modeled on [brittanychiang.com](https://brittanychiang.com): a fixed column with the name and navigation on the left, and the content scrolling on the right.

The layout is borrowed; the colors, type and details are our own, so the site does not read as a copy.

## Layout

### Desktop (wide screens)

Two columns, centered, with a maximum width of about 1200 px.

**Left column, fixed while the right one scrolls:**

- Small round portrait
- Name
- Title: Senior Software Engineer
- Location, as a small label
- One-line tagline
- Section navigation: About, Experience, Projects. The section currently in view is highlighted.
- Contact links at the bottom, shown as small icons (Font Awesome Free), followed by a text link to the page in the other language. A link's name is its tooltip and what screen readers read; a kind of link without an icon shows its name as text.

**Right column, scrolling:**

1. About: two or three short paragraphs
2. Experience: one card per recent job, one compact row per older job
3. Projects: one card per personal project
4. Footer: how the site is built, and the version

Each section starts with its name as a small heading.

### Phone and tablet

One column. The left column's content becomes the top of the page, the section navigation is dropped, and each section's heading sticks to the top of the screen while its section scrolls.

## Sections

### Experience card

- Date range on the left, in small muted text
- Title and company on the right, as the card's heading
- Technology tags as small pills under it
- Description text only where the entry has one
- The whole card highlights on hover; the other cards dim slightly

### Compact job row

Used for the older jobs, so the page stays short. How many jobs are shown as full cards is set in the CV source; it is three at present.

- Date range on the left, as on a card
- Title and company on one line, in smaller text
- One optional sentence under it
- When the pointer rests on the row, or it gets keyboard focus or a tap, the row unfolds: the job's full description takes the place of the sentence and its technology tags appear. It then stays open, because folding it again would move the rows below it under the pointer.

### Project card

- Years on the left, in the same style as a job's date range
- Title as the heading, linking to the project's first link
- Description of two or three sentences
- All links as small labels under the description
- Two to four technology tags

### What the page leaves out

The page shares its text with the CV but is shorter. It has no skills list, no bullet points per job, no education, no languages, no references and no phone number, and it shows years, not months.

## Look

| Element                                | Choice                                                                               |
| -------------------------------------- | ------------------------------------------------------------------------------------ |
| Background                             | Near-black neutral, not navy                                                         |
| Text                                   | Off-white for headings, muted grey for body text                                     |
| Accent                                 | Amber, used for links, the active navigation item, tag pills and hover states        |
| Body and heading font                  | Inter                                                                                |
| Small labels (dates, tags, navigation) | JetBrains Mono                                                                       |
| Fonts                                  | Served from the site, no third-party requests                                        |
| Corners and borders                    | Slightly rounded cards, hairline borders, no drop shadows                            |
| Motion                                 | Short hover transitions only; none when the visitor's system asks for reduced motion |

All colors, spacing and type sizes are defined once as CSS custom properties.

## Accessibility

- Text contrast meets WCAG AA on the dark background.
- Every interactive element is reachable by keyboard and has a visible focus outline.
- Section navigation uses real links and headings, so it works without JavaScript.

## Decisions

Agreed on 2026-11-26.

1. **Accent color.** Amber. The exact shade is picked from a mockup.
2. **Skill levels.** Dropped. v1's 25/50/75/100 bars are not carried over.
3. **Portrait.** A small round portrait next to the name.
4. **Company logos.** Dropped. Employers are shown as text.
5. **Light theme.** None. The site is dark only.
6. **Credit.** None. The footer does not mention the reference site.

Agreed on 2026-11-27.

7. **Projects, not Skills.** The third section shows personal projects. v1's skills grid is not carried over.
8. **Older jobs.** The four oldest jobs are compact rows without tags. The student delivery job is dropped.
9. **Current job.** Shown as "Present".
10. **Languages.** The page is published in English and in Slovenian; the .com and the .si domain are both available.
11. **Shared text with the CV.** The page and the CV use nearly the same text. The CV's print layout follows the look of this page.

12. **How the two languages are served.** The .com domain shows English and the .si domain shows Slovenian, each at its root address. A link next to the contact links leads to the other language.
13. **Tagline.** "Programmer. Metalhead. LEGO fan." It is on the page only, not in the CV.

## Open decisions

None.
