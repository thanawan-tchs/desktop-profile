// The Params table and the URL input are two views of the same state — the
// URL string is the source of truth, these just split it apart and rejoin it
// so editing either one stays in sync with the other.
export type ParamRow = { key: string; value: string }

export const splitUrl = (url: string): { base: string; query: string } => {
  const [base, query = ''] = url.split('?')
  return { base, query }
}

export const parseParams = (query: string): ParamRow[] => {
  if (!query) return []
  return query.split('&').map((pair) => {
    const [key, value = ''] = pair.split('=')
    return { key, value }
  })
}

export const buildQuery = (rows: ParamRow[]): string =>
  rows
    .filter((row) => row.key)
    .map((row) => `${row.key}=${row.value}`)
    .join('&')
