// Text that belongs to the page itself and not to the CV: section names, link
// labels and the footer. The CV text comes from cv.generated.json.

export type Language = 'en' | 'sl'

export const languages: readonly Language[] = ['en', 'sl']

/** The address each language is published at. */
export const siteUrl: Record<Language, string> = {
  en: 'https://damjanko.com/',
  sl: 'https://damjanko.si/',
}

export type SectionId = 'about' | 'experience' | 'projects'

/** The sections of the page, in the order they appear. */
export const sectionIds: readonly SectionId[] = ['about', 'experience', 'projects']

export type LinkKind = 'github' | 'linkedin' | 'email' | 'source' | 'website' | 'video'

export interface Ui {
  sections: Record<SectionId, string>
  links: Record<LinkKind, string>
  /** Shown as the end of the current job's date range. */
  present: string
  /** The link to the page in the other language. */
  otherLanguage: { language: Language; label: string }
  footer: { built: string; sourcePrefix: string; sourceLink: string; sourceSuffix: string }
  /** Names read out by screen readers. */
  aria: { sections: string; contact: string; technologies: string; links: string }
}

export const ui: Record<Language, Ui> = {
  en: {
    sections: { about: 'About', experience: 'Experience', projects: 'Projects' },
    links: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'Email',
      source: 'Source',
      website: 'Website',
      video: 'Video',
    },
    present: 'Present',
    otherLanguage: { language: 'sl', label: 'Slovensko' },
    footer: {
      built: 'Built with React, TypeScript and Vite.',
      sourcePrefix: 'The source is on ',
      sourceLink: 'GitHub',
      sourceSuffix: '.',
    },
    aria: {
      sections: 'Sections',
      contact: 'Contact',
      technologies: 'Technologies',
      links: 'Links',
    },
  },
  sl: {
    sections: { about: 'O meni', experience: 'Izkušnje', projects: 'Projekti' },
    links: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'E-pošta',
      source: 'Koda',
      website: 'Spletna stran',
      video: 'Video',
    },
    present: 'danes',
    otherLanguage: { language: 'en', label: 'English' },
    footer: {
      built: 'Narejeno z orodji React, TypeScript in Vite.',
      sourcePrefix: 'Izvorna koda je na ',
      sourceLink: 'GitHubu',
      sourceSuffix: '.',
    },
    aria: {
      sections: 'Razdelki',
      contact: 'Kontakt',
      technologies: 'Tehnologije',
      links: 'Povezave',
    },
  },
}
