import styles from './App.module.css'
import { Card, CardList } from './components/Card.tsx'
import { Footer } from './components/Footer.tsx'
import { Section } from './components/Section.tsx'
import { Sidebar } from './components/Sidebar.tsx'
import { about } from './content/about.ts'
import { formatRange } from './content/dates.ts'
import { jobs } from './content/experience.ts'
import { projects } from './content/projects.ts'
import { site, type SectionId } from './content/site.ts'

function labelOf(id: SectionId): string {
  const section = site.sections.find((candidate) => candidate.id === id)
  if (!section) {
    throw new Error(`Section "${id}" is not listed in site.sections`)
  }
  return section.label
}

export default function App() {
  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.content}>
        <Section id="about" label={labelOf('about')}>
          <div className={styles.prose}>
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Section>

        <Section id="experience" label={labelOf('experience')}>
          <CardList>
            {jobs.map((job) => (
              <Card
                key={job.id}
                meta={formatRange(job.start, job.end)}
                title={job.title}
                subtitle={job.company}
                description={job.description}
                tags={job.tags}
              />
            ))}
          </CardList>
        </Section>

        <Section id="projects" label={labelOf('projects')}>
          <CardList>
            {projects.map((project) => (
              <Card
                key={project.id}
                title={project.title}
                href={project.href}
                description={project.description}
                tags={project.tags}
              />
            ))}
          </CardList>
        </Section>

        <Footer />
      </main>
    </div>
  )
}
