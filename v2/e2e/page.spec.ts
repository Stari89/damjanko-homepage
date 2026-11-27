import { expect, test, type Page } from '@playwright/test'

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

test.describe('theme', () => {
  const light = 'rgb(247, 247, 245)'
  const dark = 'rgb(15, 16, 18)'
  const background = (page: Page) =>
    page.evaluate(() => getComputedStyle(document.body).backgroundColor)

  test('is light on a light device', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/')
    expect(await background(page)).toBe(light)
  })

  test('is dark on a dark device', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    expect(await background(page)).toBe(dark)
  })

  test('follows the device while open', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/')
    expect(await background(page)).toBe(light)
    await page.emulateMedia({ colorScheme: 'dark' })
    expect(await background(page)).toBe(dark)
  })

  test('applies a saved choice before the device setting', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('theme', 'light'))
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    expect(await background(page)).toBe(light)
  })

  test('ignores a saved value it does not know', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('theme', 'blue'))
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await expect(page.locator('html')).not.toHaveAttribute('data-theme')
    expect(await background(page)).toBe(dark)
  })

  test('the toggle switches the theme and saves it', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    const toggle = page.getByTestId('theme-toggle')
    const saved = () => page.evaluate(() => localStorage.getItem('theme'))

    await toggle.click()
    expect(await background(page)).toBe(light)
    expect(await saved()).toBe('light')

    await toggle.click()
    expect(await background(page)).toBe(dark)
    expect(await saved()).toBe('dark')
  })

  test('a saved choice survives a reload and a device change', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await page.getByTestId('theme-toggle').click()
    await page.reload()
    expect(await background(page)).toBe(light)
    await page.emulateMedia({ colorScheme: 'dark' })
    expect(await background(page)).toBe(light)
  })

  test('the toggle shows a sun in dark and a moon in light', async ({ page }) => {
    const toggle = page.getByTestId('theme-toggle')
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await expect(toggle.locator('[data-icon="sun"]')).toBeVisible()
    await expect(toggle.locator('[data-icon="moon"]')).toBeHidden()

    await toggle.click()
    await expect(toggle.locator('[data-icon="moon"]')).toBeVisible()
    await expect(toggle.locator('[data-icon="sun"]')).toBeHidden()
  })

  test('the toggle works when storage is blocked', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.addInitScript(() => {
      Storage.prototype.setItem = () => {
        throw new Error('blocked')
      }
    })
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await page.getByTestId('theme-toggle').click()
    expect(await background(page)).toBe(light)
    expect(errors).toEqual([])
  })
})
