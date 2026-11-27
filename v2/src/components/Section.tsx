import type { ReactNode } from 'react'
import type { SectionId } from '../content/ui.ts'
import styles from './Section.module.css'

interface SectionProps {
  id: SectionId
  label: string
  children: ReactNode
}

export function Section({ id, label, children }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} className={styles.section} aria-labelledby={headingId}>
      <h2 id={headingId} className={styles.heading}>
        {label}
      </h2>
      {children}
    </section>
  )
}
