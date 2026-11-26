import { describe, expect, test } from 'vitest'
import { about } from './about.ts'
import { formatRange, yearOf } from './dates.ts'
import { jobs } from './experience.ts'
import { projects } from './projects.ts'
import { site } from './site.ts'

function expectUnique(values: string[]) {
  expect(new Set(values).size).toBe(values.length)
}

describe('site', () => {
  test('section ids are unique', () => {
    expectUnique(site.sections.map((section) => section.id))
  })

  test('links have a label and a target', () => {
    for (const link of site.links) {
      expect(link.label).not.toBe('')
      expect(link.href).toMatch(/^(https:\/\/|mailto:)/)
    }
  })
})

describe('about', () => {
  test('has at least one non-empty paragraph', () => {
    expect(about.length).toBeGreaterThan(0)
    for (const paragraph of about) {
      expect(paragraph.trim()).not.toBe('')
    }
  })
})

describe('jobs', () => {
  test('ids are unique', () => {
    expectUnique(jobs.map((job) => job.id))
  })

  test('dates are valid and each job ends after it starts', () => {
    for (const job of jobs) {
      expect(() => yearOf(job.start)).not.toThrow()
      if (job.end !== undefined) {
        expect(() => yearOf(job.end!)).not.toThrow()
        expect(job.end >= job.start).toBe(true)
      }
    }
  })

  test('are listed newest first', () => {
    const starts = jobs.map((job) => job.start)
    expect(starts).toEqual([...starts].sort().reverse())
  })

  test('only the first job is current', () => {
    expect(jobs.filter((job) => job.end === undefined)).toEqual([jobs[0]])
  })

  test('no job repeats a tag', () => {
    for (const job of jobs) {
      expectUnique(job.tags)
    }
  })
})

describe('projects', () => {
  test('ids are unique', () => {
    expectUnique(projects.map((project) => project.id))
  })

  test('no project repeats a tag', () => {
    for (const project of projects) {
      expectUnique(project.tags)
    }
  })
})

describe('formatRange', () => {
  test('shows both years', () => {
    expect(formatRange('2021-02', '2022-06')).toBe('2021 — 2022')
  })

  test('shows Present for a job without an end', () => {
    expect(formatRange('2022-06')).toBe('2022 — Present')
  })

  test('shows one year when both ends fall in it', () => {
    expect(formatRange('2017-02', '2017-08')).toBe('2017')
  })

  test('rejects a malformed date', () => {
    expect(() => formatRange('June 2022')).toThrow()
    expect(() => formatRange('2022-13')).toThrow()
  })
})
