import styles from './App.module.css'
import { Card, CardList } from './components/Card.tsx'
import { Footer } from './components/Footer.tsx'
import { Section } from './components/Section.tsx'
import { Sidebar } from './components/Sidebar.tsx'
import { getContent } from './content/content.ts'
import { formatRange, formatYears } from './content/dates.ts'
import type { Language } from './content/ui.ts'

export default function App({ language }: { language: Language }) {
  const content = getContent(language)
  const { ui } = content

  return (
    <div className={styles.page}>
      <Sidebar content={content} />
      <main className={styles.content}>
        <Section id="about" label={ui.sections.about}>
          <div className={styles.prose}>
            {content.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Section>

        <Section id="experience" label={ui.sections.experience}>
          <CardList>
            {content.jobs.map((job) => (
              <Card
                key={job.id}
                meta={formatRange(job.start, job.end, ui.present)}
                title={job.title}
                subtitle={job.company}
                description={job.description}
                tags={job.tags}
                compact={job.compact}
                aria={ui.aria}
              />
            ))}
          </CardList>
        </Section>

        <Section id="projects" label={ui.sections.projects}>
          <CardList>
            {content.projects.map((project) => (
              <Card
                key={project.id}
                meta={formatYears(project.from, project.to)}
                title={project.title}
                links={project.links}
                description={project.description}
                tags={project.tags}
                aria={ui.aria}
              />
            ))}
          </CardList>
        </Section>

        <Footer ui={ui} />
      </main>
    </div>
  )
}
