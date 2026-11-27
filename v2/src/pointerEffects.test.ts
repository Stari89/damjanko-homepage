import { describe, expect, it } from 'vitest'
import { approach } from './pointerEffects.ts'

describe('approach', () => {
  it('covers the given share of the distance', () => {
    expect(approach(0, 100, 0.25)).toBe(25)
    expect(approach(100, 0, 0.25)).toBe(75)
  })

  it('arrives at once with a share of 1', () => {
    expect(approach(40, -12, 1)).toBe(-12)
  })

  it('stays put when it is already there', () => {
    expect(approach(7, 7, 0.18)).toBe(7)
  })
})
