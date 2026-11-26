import { expect, test } from '@playwright/test'

test('renders every section without console errors', async ({ page }) => {
  const problems: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') {
      problems.push(message.text())
    }
  })
  page.on('pageerror', (error) => problems.push(error.message))

  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Damjan Kovačič')
  for (const id of ['about', 'experience', 'projects']) {
    await expect(page.locator(`section#${id}`)).toBeAttached()
  }
  await expect(page.locator('#experience li h3').first()).toBeVisible()
  expect(problems).toEqual([])
})

test('the content is in the HTML before JavaScript runs', async ({ request }) => {
  const html = await (await request.get('/')).text()
  expect(html).toContain('Biosistemika')
})

test('the page does not scroll sideways', async ({ page }) => {
  await page.goto('/')
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBeLessThanOrEqual(0)
})

test('section links highlight the section in view', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'The section navigation is desktop only')
  await page.goto('/')

  const link = page.getByRole('navigation', { name: 'Sections' }).getByRole('link', {
    name: 'Experience',
  })
  await expect(link).not.toHaveAttribute('aria-current', 'true')
  await link.click()
  await expect(link).toHaveAttribute('aria-current', 'true')
})
