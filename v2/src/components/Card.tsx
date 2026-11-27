import type { ReactNode } from 'react'
import type { Link } from '../content/content.ts'
import styles from './Card.module.css'

interface CardProps {
  /** Small label in the left column, such as a date range. */
  meta?: string
  title: string
  /** Shown after the title, such as a company name. */
  subtitle?: string
  /** All are listed by label under the description; the title also links to the first. */
  links?: Link[]
  description?: string
  /** For a compact card: replaces the description while the card is expanded. */
  details?: string
  tags?: string[]
  /**
   * A short row: title and subtitle on one line, less space around it. Its
   * details and tags are hidden until it is under the pointer or has focus.
   */
  compact?: boolean
  /** Names of the link and tag lists, read out by screen readers. */
  aria: { technologies: string; links: string }
}

export function Card({
  meta,
  title,
  subtitle,
  links = [],
  description,
  details: givenDetails,
  tags = [],
  compact = false,
  aria,
}: CardProps) {
  const titleLink = links[0]
  // Details that only repeat the description would swap a text for itself.
  const details = givenDetails === description ? undefined : givenDetails
  const expandable = compact && (details !== undefined || tags.length > 0)
  const className = [
    styles.card,
    !meta && styles.noMeta,
    compact && styles.compact,
    expandable && styles.expandable,
  ]
    .filter(Boolean)
    .join(' ')

  const tagList = tags.length > 0 && (
    <ul className={styles.tags} aria-label={aria.technologies}>
      {tags.map((tag) => (
        <li key={tag} className={styles.tag}>
          {tag}
        </li>
      ))}
    </ul>
  )

  return (
    // An expandable card takes focus so that it also opens by keyboard and by tap.
    <li className={className} tabIndex={expandable ? 0 : undefined}>
      {meta && <p className={styles.meta}>{meta}</p>}
      <div>
        <h3 className={styles.title}>
          {titleLink ? (
            <a href={titleLink.href} target="_blank" rel="noreferrer">
              {title} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            title
          )}
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </h3>
        {description &&
          (expandable && details ? (
            // Folds away while the details that replace it unfold.
            <div className={styles.less}>
              <div className={styles.fold}>
                <p className={styles.description}>{description}</p>
              </div>
            </div>
          ) : (
            <p className={styles.description}>{description}</p>
          ))}
        {links.length > 0 && (
          <ul className={styles.links} aria-label={aria.links}>
            {links.map((link) => (
              <li key={link.href}>
                <a className={styles.link} href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        {expandable ? (
          <div className={styles.more}>
            <div className={styles.fold}>
              {details && <p className={styles.description}>{details}</p>}
              {tagList}
            </div>
          </div>
        ) : (
          tagList
        )}
      </div>
    </li>
  )
}

export function CardList({ children }: { children: ReactNode }) {
  return <ol className={styles.list}>{children}</ol>
}
