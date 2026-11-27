import { expect, test, type Locator, type Page } from '@playwright/test'

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

    test('the HTML names its own address and both languages', async ({ request }) => {
      const html = await (await request.get(path)).text()
      const own = language === 'en' ? 'https://damjanko.com/' : 'https://damjanko.si/'
      expect(html).toContain(`<link rel="canonical" href="${own}" />`)
      expect(html).toContain('<link rel="alternate" hreflang="en" href="https://damjanko.com/" />')
      expect(html).toContain('<link rel="alternate" hreflang="sl" href="https://damjanko.si/" />')
      expect(html).not.toContain('<meta name="description" content="" />')
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

    test('the last section is highlighted at the bottom and the first at the top', async ({
      page,
    }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop', 'The section navigation is desktop only')
      await page.goto(path)
      const links = page.getByRole('navigation', { name: sections }).getByRole('link')

      await page.evaluate(() => window.scrollTo({ top: 1e6, behavior: 'instant' }))
      await expect(links.last()).toHaveAttribute('aria-current', 'true')
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      await expect(links.first()).toHaveAttribute('aria-current', 'true')
    })

    test('the whole left column fits a low desktop window', async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop', 'The left column is fixed on desktop only')
      const toggle = page.getByTestId('theme-toggle')
      for (const height of [760, 700, 650, 580]) {
        await page.setViewportSize({ width: 1366, height })
        await page.goto(path)
        const bottom = await toggle.evaluate((element) => element.getBoundingClientRect().bottom)
        expect(bottom, `window ${height} px high`).toBeLessThanOrEqual(height)
      }
    })

    test('the left column scrolls with the page in a very low window', async ({
      page,
    }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop', 'The left column is fixed on desktop only')
      await page.setViewportSize({ width: 1366, height: 500 })
      await page.goto(path)
      const position = await page
        .locator('header')
        .evaluate((element) => getComputedStyle(element).position)
      expect(position).toBe('static')
      // Out of view at first, but it can be scrolled to.
      await page.getByTestId('theme-toggle').scrollIntoViewIfNeeded()
      await expect(page.getByTestId('theme-toggle')).toBeInViewport()
    })

    test('a short job row unfolds under the mouse and folds again', async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop', 'Needs a mouse')
      await page.goto(path)
      const row = page.locator('#experience li[tabindex="0"]').first()
      await row.scrollIntoViewIfNeeded()
      const height = async () => Math.round((await row.boundingBox())!.height)
      const folded = await height()

      await row.hover()
      await expect.poll(height).toBeGreaterThan(folded)
      await page.mouse.move(5, 5)
      await expect.poll(height).toBe(folded)
    })

    test('a short job row unfolds on focus and stays open while it has focus', async ({
      page,
    }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop', 'Needs a mouse')
      await page.goto(path)
      const row = page.locator('#experience li[tabindex="0"]').first()
      await row.scrollIntoViewIfNeeded()
      const height = async () => Math.round((await row.boundingBox())!.height)
      const folded = await height()

      await row.hover()
      await row.focus()
      await expect.poll(height).toBeGreaterThan(folded)
      // The mouse leaves, the focus stays: wait longer than the closing delay.
      await page.mouse.move(5, 5)
      await page.waitForTimeout(900)
      expect(await height()).toBeGreaterThan(folded)

      await row.blur()
      await expect.poll(height).toBe(folded)
    })

    test('the folded part of a short job row is not hidden from screen readers', async ({
      page,
    }) => {
      await page.goto(path)
      const row = page.locator('#experience li[tabindex="0"]').first()
      const hidden = await row.evaluate(
        (element) =>
          [...element.querySelectorAll('p, ul, li')].filter(
            (part) => getComputedStyle(part).visibility !== 'visible',
          ).length,
      )
      expect(hidden).toBe(0)
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
    // Without the app's script, only the inline script in the page can set the theme.
    await page.route('**/assets/*.js', (route) => route.abort())
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
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/')
    await page.getByTestId('theme-toggle').click()
    expect(await background(page)).toBe(dark)
    await page.reload()
    expect(await background(page)).toBe(dark)
    await page.emulateMedia({ colorScheme: 'dark' })
    expect(await background(page)).toBe(dark)
    await page.emulateMedia({ colorScheme: 'light' })
    expect(await background(page)).toBe(dark)
  })

  test('the page and the toggle work when storage cannot be read', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        get() {
          throw new DOMException('denied', 'SecurityError')
        },
      })
    })
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    expect(await background(page)).toBe(dark)
    expect(errors).toEqual([])

    await page.getByTestId('theme-toggle').click()
    expect(await background(page)).toBe(light)
    expect(errors).toEqual([])
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

  test('the toggle sits on the same row as the language link', async ({ page }) => {
    await page.goto('/')
    const centre = async (locator: Locator) => {
      const box = await locator.boundingBox()
      return box!.y + box!.height / 2
    }
    const link = page.locator('header').getByRole('link', { name: 'Slovenščina' })
    const difference = Math.abs(
      (await centre(page.getByTestId('theme-toggle'))) - (await centre(link)),
    )
    expect(difference).toBeLessThan(4)
  })
})

test.describe('pointer effects', () => {
  const patch = (page: Page) =>
    page.evaluate(() => ({
      x: parseFloat(document.body.style.getPropertyValue('--pointer-x')),
      y: parseFloat(document.body.style.getPropertyValue('--pointer-y')),
      opacity: getComputedStyle(document.body, '::after').opacity,
    }))

  test('the background has a dot grid, with no patch before a pointer moves', async ({ page }) => {
    await page.goto('/')
    const layers = await page.evaluate(() => ({
      grid: getComputedStyle(document.body, '::before').backgroundImage,
      patchOpacity: getComputedStyle(document.body, '::after').opacity,
    }))
    expect(layers.grid).toContain('radial-gradient')
    expect(layers.patchOpacity).toBe('0')
    await expect(page.locator('html')).not.toHaveAttribute('data-pointer')
  })

  test('the patch of amber dots follows the mouse and the scroll position', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Pointer effects need a mouse')
    await page.goto('/')
    await page.mouse.move(300, 200)
    await page.mouse.move(400, 250)
    await expect(page.locator('html')).toHaveAttribute('data-pointer', '')
    await expect.poll(async () => (await patch(page)).opacity).toBe('1')
    await expect.poll(async () => Math.round((await patch(page)).x)).toBe(400)
    await expect.poll(async () => Math.round((await patch(page)).y)).toBe(250)

    await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }))
    await expect.poll(async () => Math.round((await patch(page)).y)).toBe(550)
  })

  test('the patch does not trail when reduced motion is asked for', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Pointer effects need a mouse')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.mouse.move(300, 200)
    await page.mouse.move(700, 500)
    // One frame is enough to arrive.
    await page.evaluate(() => new Promise((done) => requestAnimationFrame(() => done(null))))
    const at = await patch(page)
    expect(Math.round(at.x)).toBe(700)
    expect(Math.round(at.y)).toBe(500)
  })

  test('the card under the mouse knows where the pointer is on it', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Pointer effects need a mouse')
    await page.goto('/')
    const card = page.locator('main [data-glow]').first()
    await card.scrollIntoViewIfNeeded()
    const box = (await card.boundingBox())!
    await page.mouse.move(box.x + 50, box.y + 20)
    const onCard = await card.evaluate((element) => ({
      x: parseFloat((element as HTMLElement).style.getPropertyValue('--glow-x')),
      y: parseFloat((element as HTMLElement).style.getPropertyValue('--glow-y')),
    }))
    expect(Math.round(onCard.x)).toBe(50)
    expect(Math.round(onCard.y)).toBe(20)
    await expect
      .poll(() => card.evaluate((element) => getComputedStyle(element, '::before').opacity))
      .toBe('1')
  })

  test('the portrait under the mouse gets the same glow', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Pointer effects need a mouse')
    await page.goto('/')
    const frame = page.locator('header [data-glow]')
    const box = (await frame.boundingBox())!
    await page.mouse.move(box.x + 30, box.y + 40)
    const onFrame = await frame.evaluate((element) => ({
      x: parseFloat((element as HTMLElement).style.getPropertyValue('--glow-x')),
      y: parseFloat((element as HTMLElement).style.getPropertyValue('--glow-y')),
    }))
    expect(Math.round(onFrame.x)).toBe(30)
    expect(Math.round(onFrame.y)).toBe(40)
    await expect
      .poll(() => frame.evaluate((element) => getComputedStyle(element, '::before').opacity))
      .toBe('1')
  })

  test('the glow follows when the page scrolls under a still mouse', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Pointer effects need a mouse')
    await page.goto('/')
    const first = page.locator('main [data-glow]').first()
    await first.scrollIntoViewIfNeeded()
    const box = (await first.boundingBox())!
    const at = { x: box.x + 50, y: box.y + 20 }
    await page.mouse.move(at.x, at.y)
    await page.mouse.wheel(0, 300)

    // Whatever card is under the pointer now knows where the pointer is on it.
    await expect
      .poll(() =>
        page.evaluate(({ x, y }) => {
          const lit = document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-glow]')
          if (!lit || window.scrollY === 0) return 'not yet'
          const top = lit.getBoundingClientRect().top
          return Math.round(parseFloat(lit.style.getPropertyValue('--glow-y')) - (y - top))
        }, at),
      )
      .toBe(0)
  })

  test('the effects stop when the mouse leaves the page', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Pointer effects need a mouse')
    await page.goto('/')
    await page.mouse.move(300, 200)
    await expect(page.locator('html')).toHaveAttribute('data-pointer', '')
    await page.evaluate(() =>
      document.documentElement.dispatchEvent(new PointerEvent('pointerleave')),
    )
    await expect(page.locator('html')).not.toHaveAttribute('data-pointer')
  })

  test('a touch ends what the mouse started', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Pointer effects need a mouse')
    await page.goto('/')
    await page.mouse.move(300, 200)
    await expect(page.locator('html')).toHaveAttribute('data-pointer', '')
    await page.evaluate(() =>
      window.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'touch' })),
    )
    await expect(page.locator('html')).not.toHaveAttribute('data-pointer')
  })

  test('a moving finger does not start the effects, a mouse does', async ({ page }) => {
    await page.goto('/')
    const move = (pointerType: string) =>
      page.evaluate(
        (type) =>
          window.dispatchEvent(
            new PointerEvent('pointermove', { pointerType: type, clientX: 100, clientY: 100 }),
          ),
        pointerType,
      )
    await move('touch')
    await expect(page.locator('html')).not.toHaveAttribute('data-pointer')
    await move('mouse')
    await expect(page.locator('html')).toHaveAttribute('data-pointer', '')
  })
})
