/**
 * Tells the styles where the mouse pointer is. Two effects use it: the patch of
 * amber dots in the page background (global.css) and the glow on the edge of
 * the card or the portrait under the pointer (global.css).
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

  const forget = () => {
    pointer = undefined
    delete root.dataset.pointer
  }

  // Tells the card or portrait under the pointer where on it the pointer is.
  const lightEdge = () => {
    if (!pointer) return
    const lit = document.elementFromPoint(pointer.x, pointer.y)?.closest('[data-glow]')
    if (lit instanceof HTMLElement) {
      const box = lit.getBoundingClientRect()
      lit.style.setProperty('--glow-x', `${pointer.x - box.left}px`)
      lit.style.setProperty('--glow-y', `${pointer.y - box.top}px`)
    }
  }

  const follow = () => {
    if (!moving) {
      moving = true
      requestAnimationFrame(step)
    }
  }

  window.addEventListener('pointermove', (event) => {
    // A finger has no resting place, so touch gets no patch and no glow. A pen
    // hovers like a mouse.
    if (event.pointerType === 'touch') {
      forget()
      return
    }
    const at = { x: event.clientX, y: event.clientY }
    // The patch appears under the pointer; it does not fly in from a corner.
    if (!pointer) patch = target(at)
    pointer = at
    root.dataset.pointer = ''
    follow()
    lightEdge()
  })

  // On a device with both, a touch ends what the mouse started: a tapped card
  // would otherwise glow where the mouse last was.
  window.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') forget()
  })

  // Scrolling moves the page under a pointer that stays still.
  // It also moves another card under it, and so does a card that folds.
  window.addEventListener(
    'scroll',
    () => {
      follow()
      lightEdge()
    },
    { passive: true },
  )
  document.addEventListener('transitionend', lightEdge)

  root.addEventListener('pointerleave', forget)
}
