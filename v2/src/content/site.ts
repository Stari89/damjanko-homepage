export interface Section {
  /** Used as the element id and the link target, so it must be unique. */
  id: string
  label: string
}

export interface Site {
  name: string
  title: string
  sections: Section[]
}

export const site: Site = {
  name: 'Damjan Kovačič',
  title: 'Senior Software Engineer',
  sections: [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
  ],
}
