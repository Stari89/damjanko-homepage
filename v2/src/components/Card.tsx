import type { ReactNode } from 'react'
import styles from './Card.module.css'

interface CardProps {
  /** Small label in the left column, such as a date range. */
  meta?: string
  title: string
  /** Shown after the title, such as a company name. */
  subtitle?: string
  /** When present, the title links to it. */
  href?: string
  description?: string
  tags: string[]
}

export function Card({ meta, title, subtitle, href, description, tags }: CardProps) {
  return (
    <li className={meta ? styles.card : `${styles.card} ${styles.noMeta}`}>
      {meta && <p className={styles.meta}>{meta}</p>}
      <div>
        <h3 className={styles.title}>
          {href ? (
            <a href={href} target="_blank" rel="noreferrer">
              {title} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            title
          )}
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </h3>
        {description && <p className={styles.description}>{description}</p>}
        {tags.length > 0 && (
          <ul className={styles.tags} aria-label="Technologies">
            {tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

export function CardList({ children }: { children: ReactNode }) {
  return <ol className={styles.list}>{children}</ol>
}
