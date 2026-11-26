export interface Project {
  /** Unique, used as the React key. */
  id: string
  title: string
  description: string
  /** Optional. When present, the title links to it. */
  href?: string
  tags: string[]
}

// PLACEHOLDER: every project below is filler until the real projects are chosen.
export const projects: Project[] = [
  {
    id: 'placeholder-1',
    title: 'Lorem ipsum dolor',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    tags: ['Lorem', 'Ipsum', 'Dolor'],
  },
  {
    id: 'placeholder-2',
    title: 'Sit amet consectetur',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    tags: ['Sit', 'Amet', 'Consectetur', 'Adipiscing'],
  },
  {
    id: 'placeholder-3',
    title: 'Adipiscing elit',
    description:
      'Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    href: 'https://github.com/Stari89/damjanko-homepage',
    tags: ['Elit', 'Tempor'],
  },
]
