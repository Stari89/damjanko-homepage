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
      {/* The footer is beside the main content, not in it, so that it is a landmark of its own. */}
      <div className={styles.content}>
        <main className={styles.sections}>
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
                  details={job.details}
                  tags={job.tags}
                  compact={job.compact}
                  aria={ui.aria}
                />
              ))}
            </CardList>
            {ui.resume && (
              // The label says "download", so the browser saves the file and does not open it.
              <a className={styles.resume} href={ui.resume.href} download>
                {ui.resume.label} <span aria-hidden="true">↓</span>
              </a>
            )}
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
        </main>
        <Footer ui={ui} />
      </div>
    </div>
  )
}
