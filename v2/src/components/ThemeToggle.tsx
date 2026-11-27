import { toggleTheme } from '../theme.ts'
import { LinkIcon } from './LinkIcon.tsx'
import { themeIcons } from './linkIcons.ts'
import styles from './ThemeToggle.module.css'

/**
 * Switches between the light and dark theme. It has no state so that the server
 * and the browser render the same markup: both icons are always in the HTML and
 * the theme tokens show one of them.
 */
export function ThemeToggle() {
  return (
    <button
      type="button"
      className={styles.toggle}
      data-testid="theme-toggle"
      onClick={toggleTheme}
    >
      <span className={styles.sun} data-icon="sun">
        <LinkIcon shape={themeIcons.sun} className={styles.icon} />
      </span>
      <span className={styles.moon} data-icon="moon">
        <LinkIcon shape={themeIcons.moon} className={styles.icon} />
      </span>
    </button>
  )
}
