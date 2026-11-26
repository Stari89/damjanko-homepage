import styles from './App.module.css'
import { site } from './content/site.ts'

export default function App() {
  return (
    <div className={styles.page}>
      <header className={styles.sidebar}>
        <h1 className={styles.name}>{site.name}</h1>
        <p className={styles.title}>{site.title}</p>
        <nav aria-label="Sections">
          <ul className={styles.nav}>
            {site.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className={styles.content}>
        {site.sections.map((section) => (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
            <h2 id={`${section.id}-heading`} className={styles.sectionHeading}>
              {section.label}
            </h2>
            <p>Content to come.</p>
          </section>
        ))}
      </main>
    </div>
  )
}
