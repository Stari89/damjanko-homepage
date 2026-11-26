import { useEffect, useState } from 'react'

/** How far down the viewport a section's top has to be to count as "in view". */
const ACTIVATION_LINE = 0.35

/**
 * Returns the id of the section the visitor is currently reading: the last one
 * whose top has passed the activation line, or the last section at the bottom of the page.
 */
export function useActiveSection<Id extends string>(ids: readonly Id[]): Id {
  const [active, setActive] = useState<Id>(ids[0])

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) {
        setActive(ids[ids.length - 1])
        return
      }
      const line = window.innerHeight * ACTIVATION_LINE
      let current = ids[0]
      for (const id of ids) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= line) {
          current = id
        }
      }
      setActive(current)
    }

    const schedule = () => {
      if (frame === 0) {
        frame = requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids])

  return active
}
