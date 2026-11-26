const yearMonth = /^(\d{4})-(0[1-9]|1[0-2])$/

/** Returns the year of a YYYY-MM string, and throws on anything else. */
export function yearOf(value: string): number {
  const match = yearMonth.exec(value)
  if (!match) {
    throw new Error(`Expected a date as YYYY-MM, got "${value}"`)
  }
  return Number(match[1])
}

/** "2021 — 2022", "2022 — Present", or "2017" when both ends fall in one year. */
export function formatRange(start: string, end?: string): string {
  const from = yearOf(start)
  if (end === undefined) {
    return `${from} — Present`
  }
  const to = yearOf(end)
  return from === to ? `${from}` : `${from} — ${to}`
}
