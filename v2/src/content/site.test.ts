import { expect, test } from 'vitest'
import { site } from './site.ts'

test('section ids are unique', () => {
  const ids = site.sections.map((section) => section.id)
  expect(new Set(ids).size).toBe(ids.length)
})

test('section ids are valid link targets', () => {
  for (const section of site.sections) {
    expect(section.id).toMatch(/^[a-z][a-z0-9-]*$/)
  }
})
