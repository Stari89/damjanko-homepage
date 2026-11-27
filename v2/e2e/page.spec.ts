import { expect, test } from '@playwright/test'

// The built site has one page per language. On the live site each is the root
// of its own domain; here both are reached by path.
const pages = [
  {
    language: 'en',
    path: '/',
    experience: 'Experience',
    sections: 'Sections',
    otherLabel: 'Slovenščina',
    otherUrl: 'https://damjanko.si/',
  },
  {
    language: 'sl',
    path: '/sl/',
    experience: 'Izkušnje',
    sections: 'Razdelki',
    otherLabel: 'English',
    otherUrl: 'https://damjanko.com/',
  },
]

for (const { language, path, experience, sections, otherLabel, otherUrl } of pages) {
  test.describe(`the page in "${language}"`, () => {
    test('renders every section without console errors', async ({ page }) => {
      const problems: string[] = []
      page.on('console', (message) => {
        if (message.type() === 'error' || message.type() === 'warning') {
          problems.push(message.text())
        }
      })
      page.on('pageerror', (error) => problems.push(error.message))

      await page.goto(path)

      await expect(page.locator('html')).toHaveAttribute('lang', language)
      await expect(page).toHaveTitle('Damjan Kovačič')
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Damjan Kovačič')
      for (const id of ['about', 'experience', 'projects']) {
        await expect(page.locator(`section#${id}`)).toBeAttached()
      }
      await expect(page.locator('#experience li h3').first()).toBeVisible()
      expect(problems).toEqual([])
    })

    test('the content is in the HTML before JavaScript runs', async ({ request }) => {
      const html = await (await request.get(path)).text()
      expect(html).toContain('BioSistemika')
      expect(html).toContain(`<html lang="${language}">`)
      expect(html).toContain(`>${experience}</h2>`)
    })

    test('links to the page in the other language', async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('link', { name: otherLabel })).toHaveAttribute('href', otherUrl)
    })

    test('the page does not scroll sideways', async ({ page }) => {
      await page.goto(path)
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow).toBeLessThanOrEqual(0)
    })

    test('section links highlight the section in view', async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop', 'The section navigation is desktop only')
      await page.goto(path)

      const link = page.getByRole('navigation', { name: sections }).getByRole('link', {
        name: experience,
      })
      await expect(link).not.toHaveAttribute('aria-current', 'true')
      await link.click()
      await expect(link).toHaveAttribute('aria-current', 'true')
    })
  })
}
