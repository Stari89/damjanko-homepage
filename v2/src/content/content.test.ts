import { describe, expect, test } from 'vitest'
import { getContent, parseFooter } from './content.ts'
import { formatRange, formatYears, yearOf } from './dates.ts'
import { languages, sectionIds, siteUrl } from './ui.ts'

function expectUnique(values: string[]) {
  expect(new Set(values).size).toBe(values.length)
}

function expectText(value: string | undefined) {
  expect(value?.trim()).toBeTruthy()
}

describe.each(languages)('content in "%s"', (language) => {
  const content = getContent(language)

  test('has a name, title and location', () => {
    expectText(content.name)
    expectText(content.title)
    expectText(content.location)
  })

  test('a tagline, when there is one, is not empty', () => {
    if (content.tagline !== undefined) {
      expectText(content.tagline)
    }
  })

  test('contact links have a label and a target', () => {
    expect(content.links.length).toBeGreaterThan(0)
    for (const link of content.links) {
      expectText(link.label)
      expect(link.href).toMatch(/^(https:\/\/|mailto:)/)
    }
  })

  test('about has at least one non-empty paragraph', () => {
    expect(content.about.length).toBeGreaterThan(0)
    content.about.forEach(expectText)
  })

  test('every job has a title and a company', () => {
    for (const job of content.jobs) {
      expectText(job.title)
      expectText(job.company)
    }
  })

  test('a job description, when there is one, is not empty', () => {
    for (const job of content.jobs) {
      if (job.description !== undefined) {
        expectText(job.description)
      }
    }
  })

  test('every project has a title and a description', () => {
    for (const project of content.projects) {
      expectText(project.title)
      expectText(project.description)
    }
  })

  test('project links have a label and a target', () => {
    for (const project of content.projects) {
      expect(project.links.length).toBeGreaterThan(0)
      for (const link of project.links) {
        expectText(link.label)
        expect(link.href).toMatch(/^https:\/\//)
      }
    }
  })

  test('every section has a name', () => {
    for (const id of sectionIds) {
      expectText(content.ui.sections[id])
    }
  })

  test('the page has its own text', () => {
    expectText(content.ui.present)
    expectText(content.ui.otherLanguage.label)
    expectText(content.ui.footer.link)
    Object.values(content.ui.aria).forEach(expectText)
  })
})

describe('parseFooter', () => {
  test('splits the sentence around the bracketed link text', () => {
    expect(parseFooter('The source is on [GitHub].')).toEqual({
      before: 'The source is on ',
      link: 'GitHub',
      after: '.',
    })
  })

  test('rejects a sentence without exactly one bracketed part', () => {
    expect(() => parseFooter('The source is on GitHub.')).toThrow()
    expect(() => parseFooter('[One] and [two].')).toThrow()
    expect(() => parseFooter('Empty [].')).toThrow()
  })
})

// These do not depend on the language, so they are checked once.
describe('jobs', () => {
  const { jobs } = getContent('en')

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

  test('compact jobs have no tags', () => {
    for (const job of jobs.filter((candidate) => candidate.compact)) {
      expect(job.tags).toEqual([])
    }
  })

  // How many jobs are shown in full is set in the CV source and can be any number.
  test('no full job comes after a compact one', () => {
    const firstCompact = jobs.findIndex((job) => job.compact)
    if (firstCompact !== -1) {
      expect(jobs.slice(firstCompact).every((job) => job.compact)).toBe(true)
    }
  })
})

describe('projects', () => {
  const { projects } = getContent('en')

  test('ids are unique', () => {
    expectUnique(projects.map((project) => project.id))
  })

  test('no project repeats a tag', () => {
    for (const project of projects) {
      expectUnique(project.tags)
    }
  })

  test('each project ends in or after the year it starts', () => {
    for (const project of projects) {
      if (project.to !== undefined) {
        expect(project.to).toBeGreaterThanOrEqual(project.from)
      }
    }
  })
})

describe('languages', () => {
  test('each language links to the other one', () => {
    for (const language of languages) {
      const other = getContent(language).ui.otherLanguage.language
      expect(other).not.toBe(language)
      expect(getContent(other).ui.otherLanguage.language).toBe(language)
    }
  })

  test('each language has its own address', () => {
    expectUnique(languages.map((language) => siteUrl[language]))
  })

  test('the two languages have the same jobs and projects', () => {
    const [first, second] = languages.map(getContent)
    expect(first.jobs.map((job) => job.id)).toEqual(second.jobs.map((job) => job.id))
    expect(first.projects.map((project) => project.id)).toEqual(
      second.projects.map((project) => project.id),
    )
  })
})

describe('formatYears', () => {
  test('shows both years', () => {
    expect(formatYears(2020, 2023)).toBe('2020 — 2023')
  })

  test('shows one year when there is no end or both are the same', () => {
    expect(formatYears(2022)).toBe('2022')
    expect(formatYears(2022, 2022)).toBe('2022')
  })
})

describe('formatRange', () => {
  test('shows both years', () => {
    expect(formatRange('2021-02', '2022-06', 'Present')).toBe('2021 — 2022')
  })

  test('shows the given word for a job without an end', () => {
    expect(formatRange('2022-06', undefined, 'Present')).toBe('2022 — Present')
    expect(formatRange('2022-06', undefined, 'danes')).toBe('2022 — danes')
  })

  test('shows one year when both ends fall in it', () => {
    expect(formatRange('2017-02', '2017-08', 'Present')).toBe('2017')
  })

  test('rejects a malformed date', () => {
    expect(() => formatRange('June 2022', undefined, 'Present')).toThrow()
    expect(() => formatRange('2022-13', undefined, 'Present')).toThrow()
  })
})
