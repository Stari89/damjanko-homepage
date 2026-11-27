import { repositoryUrl, type Ui } from '../content/ui.ts'
import styles from './Footer.module.css'

export function Footer({ ui }: { ui: Ui }) {
  const { before, link, after } = ui.footer
  return (
    <footer className={styles.footer}>
      <p>
        {before}
        <a href={repositoryUrl} target="_blank" rel="noreferrer">
          {link}
        </a>
        {after}
      </p>
      <p className={styles.version}>v{__APP_VERSION__}</p>
    </footer>
  )
}
