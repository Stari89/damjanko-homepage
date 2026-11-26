export type SectionId = 'about' | 'experience' | 'projects'

export interface Section {
  /** Used as the element id and the link target, so it must be unique. */
  id: SectionId
  label: string
}

export interface Link {
  label: string
  href: string
}

export interface Site {
  name: string
  title: string
  tagline: string
  sections: Section[]
  links: Link[]
}

export const site: Site = {
  name: 'Damjan Kovačič',
  title: 'Senior Software Engineer',
  // PLACEHOLDER: final tagline to be written.
  tagline: 'Full-stack developer, most at home in the .NET ecosystem.',
  sections: [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/Stari89' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/damjanko/' },
    { label: 'Email', href: 'mailto:letecnez@gmail.com' },
  ],
}
