import type { Ui } from '../content/ui.ts'
import styles from './Footer.module.css'

export function Footer({ ui }: { ui: Ui }) {
  const { built, sourcePrefix, sourceLink, sourceSuffix } = ui.footer
  return (
    <footer className={styles.footer}>
      <p>
        {built} {sourcePrefix}
        <a href="https://github.com/Stari89/damjanko-homepage" target="_blank" rel="noreferrer">
          {sourceLink}
        </a>
        {sourceSuffix}
      </p>
      <p className={styles.version}>v{__APP_VERSION__}</p>
    </footer>
  )
}
