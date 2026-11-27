const yearMonth = /^(\d{4})-(0[1-9]|1[0-2])$/

/** Returns the year of a YYYY-MM string, and throws on anything else. */
export function yearOf(value: string): number {
  const match = yearMonth.exec(value)
  if (!match) {
    throw new Error(`Expected a date as YYYY-MM, got "${value}"`)
  }
  return Number(match[1])
}

/** "2020 — 2023", or "2022" when there is no end year or both are the same. */
export function formatYears(from: number, to?: number): string {
  return to === undefined || to === from ? `${from}` : `${from} — ${to}`
}

/**
 * "2021 — 2022", or "2017" when both ends fall in one year. Without an end it
 * is "2022 — Present", with the given word for "Present".
 */
export function formatRange(start: string, end: string | undefined, present: string): string {
  const from = yearOf(start)
  if (end === undefined) {
    return `${from} — ${present}`
  }
  return formatYears(from, yearOf(end))
}
