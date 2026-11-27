import { describe, expect, it } from 'vitest'
import { isTheme, otherTheme } from './theme.ts'

describe('otherTheme', () => {
  it('swaps light and dark', () => {
    expect(otherTheme('light')).toBe('dark')
    expect(otherTheme('dark')).toBe('light')
  })
})

describe('isTheme', () => {
  it('accepts light and dark', () => {
    expect(isTheme('light')).toBe(true)
    expect(isTheme('dark')).toBe(true)
  })

  it.each(['blue', '', null, undefined])('rejects %j', (value) => {
    expect(isTheme(value)).toBe(false)
  })
})
