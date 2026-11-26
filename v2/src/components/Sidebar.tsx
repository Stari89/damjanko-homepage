import portrait from '../assets/portrait.jpg'
import { site } from '../content/site.ts'
import { useActiveSection } from '../hooks/useActiveSection.ts'
import styles from './Sidebar.module.css'

const sectionIds = site.sections.map((section) => section.id)

export function Sidebar() {
  const active = useActiveSection(sectionIds)

  return (
    <header className={styles.sidebar}>
      <div>
        <img className={styles.portrait} src={portrait} alt="" width={176} height={176} />
        <h1 className={styles.name}>{site.name}</h1>
        <p className={styles.title}>{site.title}</p>
        <p className={styles.tagline}>{site.tagline}</p>

        <nav className={styles.nav} aria-label="Sections">
          <ul>
            {site.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={styles.navLink}
                  aria-current={section.id === active ? 'true' : undefined}
                >
                  <span className={styles.navLine} aria-hidden="true" />
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <ul className={styles.links} aria-label="Contact">
        {site.links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={styles.link}
              {...(link.href.startsWith('https://') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  )
}
