import {
  faFacebookF,
  faGithub,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

/** The part of a Font Awesome icon that is drawn: its width, height and path. */
export interface IconShape {
  icon: [number, number, unknown, unknown, string | string[]]
}

/**
 * The icon for each kind of link that has one. A kind that is not listed here
 * is shown by its name.
 *
 * Icons by Font Awesome Free, https://fontawesome.com, licence CC BY 4.0.
 */
export const linkIcons: Record<string, IconShape | undefined> = {
  github: faGithub,
  linkedin: faLinkedinIn,
  facebook: faFacebookF,
  instagram: faInstagram,
  youtube: faYoutube,
  email: faEnvelope,
}
