import portrait from '../assets/portrait.jpg'
import type { Content } from '../content/content.ts'
import { sectionIds, siteUrl } from '../content/ui.ts'
import { useActiveSection } from '../hooks/useActiveSection.ts'
import { LinkIcon } from './LinkIcon.tsx'
import { linkIcons } from './linkIcons.ts'
import styles from './Sidebar.module.css'
import { ThemeToggle } from './ThemeToggle.tsx'

export function Sidebar({ content }: { content: Content }) {
  const active = useActiveSection(sectionIds)
  const { ui } = content
  const other = ui.otherLanguage

  return (
    <header className={styles.sidebar}>
      <div>
        {/* The frame carries the edge glow, which an image cannot (see global.css). */}
        <div className={styles.portrait} data-glow="">
          <img src={portrait} alt="" width={176} height={176} />
        </div>
        <h1 className={styles.name}>{content.name}</h1>
        <p className={styles.title}>{content.title}</p>
        <p className={styles.location}>{content.location}</p>
        {content.tagline && <p className={styles.tagline}>{content.tagline}</p>}

        <nav className={styles.nav} aria-label={ui.aria.sections}>
          <ul>
            {sectionIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={styles.navLink}
                  aria-current={id === active ? 'true' : undefined}
                >
                  <span className={styles.navLine} aria-hidden="true" />
                  {ui.sections[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <ul className={styles.links} aria-label={ui.aria.contact}>
        {content.links.map((link) => {
          const shape = Object.hasOwn(linkIcons, link.kind) ? linkIcons[link.kind] : undefined
          return (
            <li key={link.href}>
              <a
                href={link.href}
                className={shape ? styles.iconLink : styles.link}
                {...(link.href.startsWith('https://')
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
                {...(shape ? { 'aria-label': link.label, title: link.label } : {})}
              >
                {shape ? <LinkIcon shape={shape} className={styles.icon} /> : link.label}
              </a>
            </li>
          )
        })}
        <li className={styles.language}>
          <a
            href={siteUrl[other.language]}
            className={styles.link}
            lang={other.language}
            hrefLang={other.language}
          >
            {other.label}
          </a>
          <ThemeToggle />
        </li>
      </ul>
    </header>
  )
}
