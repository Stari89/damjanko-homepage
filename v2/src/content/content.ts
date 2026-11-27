// Turns the generated CV file into the content of the page in one language.
// cv.generated.json is written by the CV build and is never edited here.
import generated from './cv.generated.json'
import { languages, type Language, type SectionId, type Ui } from './ui.ts'

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
  /** The page's own text, which the CV does not use. */
  web: {
    sections: Record<SectionId, Localized>
    /** One label for every kind of link in the file, and one for "email". */
    linkLabels: Record<string, Localized>
    present: Localized
    /** Not a translation: each value is that language's name in that language. */
    languageName: Localized
    /** A sentence with the text of the repository link in square brackets. */
    footer: Localized
    aria: Record<keyof Ui['aria'], Localized>
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
  /** What the link leads to, such as "github". Used to pick an icon. */
  kind: string
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

/** Splits "The source is on [GitHub]." into the text before, inside and after the brackets. */
export function parseFooter(sentence: string): Ui['footer'] {
  const match = /^([^[\]]*)\[([^[\]]+)\]([^[\]]*)$/.exec(sentence)
  if (!match) {
    throw new Error(`Expected exactly one [bracketed] link text in the footer, got "${sentence}"`)
  }
  return { before: match[1], link: match[2], after: match[3] }
}

function getUi(language: Language): Ui {
  const { web } = cv
  const other = languages.find((candidate) => candidate !== language)!
  return {
    sections: {
      about: web.sections.about[language],
      experience: web.sections.experience[language],
      projects: web.sections.projects[language],
    },
    present: web.present[language],
    otherLanguage: { language: other, label: web.languageName[other] },
    footer: parseFooter(web.footer[language]),
    aria: {
      sections: web.aria.sections[language],
      contact: web.aria.contact[language],
      technologies: web.aria.technologies[language],
      links: web.aria.links[language],
    },
  }
}

export function getContent(language: Language): Content {
  const labelOf = (kind: string): string => {
    if (!Object.hasOwn(cv.web.linkLabels, kind)) {
      throw new Error(`cv.generated.json has no label for links of kind "${kind}"`)
    }
    return cv.web.linkLabels[kind][language]
  }

  const toLink = ({ kind, href }: GeneratedLink): Link => ({
    kind,
    label: labelOf(kind),
    href,
  })

  return {
    language,
    name: cv.person.name,
    title: cv.person.title[language],
    location: cv.person.location[language],
    tagline: cv.person.tagline?.[language],
    links: [
      ...cv.person.links.map(toLink),
      { kind: 'email', label: labelOf('email'), href: `mailto:${cv.person.email}` },
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
    ui: getUi(language),
  }
}
