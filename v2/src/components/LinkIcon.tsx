import type { IconShape } from './linkIcons.ts'

/** An icon drawn as inline SVG. It is decoration: the link around it carries the name. */
export function LinkIcon({ shape, className }: { shape: IconShape; className?: string }) {
  const [width, height, , , path] = shape.icon
  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={Array.isArray(path) ? path.join(' ') : path} />
    </svg>
  )
}
