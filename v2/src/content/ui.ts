// The parts of the page that are configuration and not text: its languages,
// addresses and sections. All text comes from cv.generated.json.

export type Language = 'en' | 'sl'

export const languages: readonly Language[] = ['en', 'sl']

/** The address each language is published at. */
export const siteUrl: Record<Language, string> = {
  en: 'https://damjanko.com/',
  sl: 'https://damjanko.si/',
}

export const repositoryUrl = 'https://github.com/Stari89/damjanko-homepage'

export type SectionId = 'about' | 'experience' | 'projects'

/** The sections of the page, in the order they appear. */
export const sectionIds: readonly SectionId[] = ['about', 'experience', 'projects']

/** The page's own text in one language: section names, labels and the footer. */
export interface Ui {
  sections: Record<SectionId, string>
  /** Shown as the end of the current job's date range. */
  present: string
  /** The link to the page in the other language, named in that language. */
  otherLanguage: { language: Language; label: string }
  /** One sentence around a link to the repository. */
  footer: { before: string; link: string; after: string }
  /** Names read out by screen readers. */
  aria: { sections: string; contact: string; technologies: string; links: string }
}
