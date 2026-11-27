// Turns the generated CV file into the content of the page in one language.
// cv.generated.json is written by the CV build and is never edited here.
import generated from './cv.generated.json'
import { ui, type Language, type LinkKind, type Ui } from './ui.ts'

type Localized = Record<Language, string>

interface GeneratedLink {
  kind: string
  href: string
}

/** The shape of cv.generated.json. */
interface GeneratedCv {
  person: {
    name: string
    title: Localized
    location: Localized
    /** Shown on the page only. Left out of the page while it is missing. */
    tagline?: Localized
    email: string
    links: GeneratedLink[]
  }
  about: Localized[]
  jobs: {
    id: string
    compact: boolean
    /** First month in the job, as YYYY-MM. */
    start: string
    /** Last month in the job, as YYYY-MM. Missing for the current job. */
    end?: string
    title: Localized
    company: Localized
    description?: Localized
    tags: string[]
  }[]
  projects: {
    id: string
    title: Localized
    /** First year of work on the project. */
    from: number
    /** Last year of work. Missing when it is the same as the first. */
    to?: number
    description: Localized
    links: GeneratedLink[]
    tags: string[]
  }[]
}

export interface Link {
  label: string
  href: string
}

export interface Job {
  id: string
  start: string
  end?: string
  title: string
  company: string
  description?: string
  /** Shown as a short row without tags. Used for the oldest jobs, which come last. */
  compact: boolean
  tags: string[]
}

export interface Project {
  id: string
  title: string
  from: number
  to?: number
  description: string
  /** The title links to the first; the others are listed under the description. */
  links: Link[]
  tags: string[]
}

export interface Content {
  language: Language
  name: string
  title: string
  location: string
  tagline?: string
  /** Contact links shown under the name. */
  links: Link[]
  /** Paragraphs of the About section, in order. */
  about: string[]
  /** Newest first. */
  jobs: Job[]
  projects: Project[]
  ui: Ui
}

const cv: GeneratedCv = generated

function isLinkKind(kind: string, labels: Record<LinkKind, string>): kind is LinkKind {
  return Object.hasOwn(labels, kind)
}

export function getContent(language: Language): Content {
  const text = ui[language]

  const toLink = ({ kind, href }: GeneratedLink): Link => {
    if (!isLinkKind(kind, text.links)) {
      throw new Error(`cv.generated.json has a link of unknown kind "${kind}"`)
    }
    return { label: text.links[kind], href }
  }

  return {
    language,
    name: cv.person.name,
    title: cv.person.title[language],
    location: cv.person.location[language],
    tagline: cv.person.tagline?.[language],
    links: [
      ...cv.person.links.map(toLink),
      { label: text.links.email, href: `mailto:${cv.person.email}` },
    ],
    about: cv.about.map((paragraph) => paragraph[language]),
    jobs: cv.jobs.map((job) => ({
      id: job.id,
      start: job.start,
      end: job.end,
      title: job.title[language],
      company: job.company[language],
      description: job.description?.[language],
      compact: job.compact,
      tags: job.tags,
    })),
    projects: cv.projects.map((project) => ({
      id: project.id,
      title: project.title[language],
      from: project.from,
      to: project.to,
      description: project.description[language],
      links: project.links.map(toLink),
      tags: project.tags,
    })),
    ui: text,
  }
}
