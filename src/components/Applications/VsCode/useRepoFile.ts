import { useEffect, useState } from 'react'
import { fetchRepoFile, getCachedRepoFile } from './githubRepo'

type Result = { path: string; content?: string; failed?: boolean }

// Content of one file in the GitHub repo. `remotePath` is undefined for local
// mock-project files, which carry their content inline.
export const useRepoFile = (remotePath?: string) => {
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    if (!remotePath || getCachedRepoFile(remotePath) !== undefined) return undefined
    let cancelled = false
    fetchRepoFile(remotePath)
      .then((content) => {
        if (!cancelled) setResult({ path: remotePath, content })
      })
      .catch(() => {
        if (!cancelled) setResult({ path: remotePath, failed: true })
      })
    return () => {
      cancelled = true
    }
  }, [remotePath])

  if (!remotePath) return { content: undefined, status: 'idle' as const }
  const cached = getCachedRepoFile(remotePath)
  if (cached !== undefined) return { content: cached, status: 'ready' as const }
  if (result?.path === remotePath) {
    return result.failed
      ? { content: undefined, status: 'error' as const }
      : { content: result.content, status: 'ready' as const }
  }
  return { content: undefined, status: 'loading' as const }
}
