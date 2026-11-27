/**
 * Tells the styles where the mouse pointer is. Two effects use it: the patch of
 * amber dots in the page background (global.css) and the glow on the edge of
 * the card under the pointer (Card.module.css).
 */

/** Share of the remaining distance the patch of dots covers per frame. */
const FOLLOW_SHARE = 0.18

/** Closer than this, in pixels, the patch counts as having arrived. */
const ARRIVED_PX = 0.5

/** Moves `current` towards `target` by the given share of the distance between them. */
export function approach(current: number, target: number, share: number): number {
  return current + (target - current) * share
}

export function startPointerEffects(): void {
  const root = document.documentElement
  const body = document.body
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  // The pointer's place in the window, and the patch's place on the page.
  let pointer: { x: number; y: number } | undefined
  let patch = { x: 0, y: 0 }
  let moving = false

  // The dots scroll with the page, so the patch is placed in page coordinates.
  const target = (at: { x: number; y: number }) => ({
    x: at.x + window.scrollX,
    y: at.y + window.scrollY,
  })

  const step = () => {
    if (!pointer) {
      moving = false
      return
    }
    const goal = target(pointer)
    // The patch trails the pointer a little, unless reduced motion is asked for.
    const share = reducedMotion.matches ? 1 : FOLLOW_SHARE
    patch = { x: approach(patch.x, goal.x, share), y: approach(patch.y, goal.y, share) }
    body.style.setProperty('--pointer-x', `${patch.x}px`)
    body.style.setProperty('--pointer-y', `${patch.y}px`)
    moving = Math.abs(goal.x - patch.x) + Math.abs(goal.y - patch.y) > ARRIVED_PX
    if (moving) requestAnimationFrame(step)
  }

  const follow = () => {
    if (!moving) {
      moving = true
      requestAnimationFrame(step)
    }
  }

  window.addEventListener('pointermove', (event) => {
    // A finger has no resting place, so touch gets no patch and no glow.
    if (event.pointerType !== 'mouse') return
    const at = { x: event.clientX, y: event.clientY }
    // The patch appears under the pointer; it does not fly in from a corner.
    if (!pointer) patch = target(at)
    pointer = at
    root.dataset.pointer = ''
    follow()

    const card = event.target instanceof Element ? event.target.closest('[data-card]') : null
    if (card instanceof HTMLElement) {
      const box = card.getBoundingClientRect()
      card.style.setProperty('--card-pointer-x', `${at.x - box.left}px`)
      card.style.setProperty('--card-pointer-y', `${at.y - box.top}px`)
    }
  })

  // Scrolling moves the page under a pointer that stays still.
  window.addEventListener('scroll', follow, { passive: true })

  root.addEventListener('pointerleave', () => {
    pointer = undefined
    delete root.dataset.pointer
  })
}
