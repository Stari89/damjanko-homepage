import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Built with React, TypeScript and Vite. Served by Apache from a NAS at home. The source is on{' '}
        <a href="https://github.com/Stari89/damjanko-homepage" target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </p>
      <p className={styles.version}>v{__APP_VERSION__}</p>
    </footer>
  )
}
