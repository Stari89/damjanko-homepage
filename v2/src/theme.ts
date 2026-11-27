export type Theme = 'light' | 'dark'

const storageKey = 'theme'

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

export function otherTheme(theme: Theme): Theme {
  return theme === 'light' ? 'dark' : 'light'
}

/** The theme on screen: the chosen one, else the device's. */
export function shownTheme(): Theme {
  const chosen = document.documentElement.dataset.theme
  if (isTheme(chosen)) return chosen
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** Switches to the other theme and remembers it. */
export function toggleTheme(): void {
  const next = otherTheme(shownTheme())
  document.documentElement.dataset.theme = next
  try {
    localStorage.setItem(storageKey, next)
  } catch {
    // Storage can be blocked. The theme still switches, it just is not kept.
  }
}
