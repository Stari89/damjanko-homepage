import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Link } from '../content/content.ts'
import styles from './Card.module.css'

/** How long the pointer has to rest on a compact card before it opens. */
const OPEN_DELAY_MS = 120

/** How long a compact card stays open after the pointer or focus has left it. */
const CLOSE_DELAY_MS = 500

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
   * details and tags are shown while the pointer rests on it or it has focus.
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
  const [open, setOpen] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  // Opening and closing both wait, and each cancels the other. The pointer can
  // then pass over a card without opening it, and the cards below an open one
  // do not move the moment the pointer leaves it.
  const setOpenAfter = (next: boolean, delay: number) => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(next), delay)
  }
  const openSoon = () => setOpenAfter(true, OPEN_DELAY_MS)
  const closeLater = () => setOpenAfter(false, CLOSE_DELAY_MS)

  const className = [
    styles.card,
    !meta && styles.noMeta,
    compact && styles.compact,
    expandable && styles.expandable,
    open && styles.open,
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
    <li
      className={className}
      // Lets the pointer effects light the edge (see pointerEffects.ts).
      data-glow=""
      tabIndex={expandable ? 0 : undefined}
      {...(expandable
        ? {
            onMouseEnter: openSoon,
            onMouseLeave: closeLater,
            onFocus: () => setOpenAfter(true, 0),
            onBlur: closeLater,
          }
        : {})}
    >
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
