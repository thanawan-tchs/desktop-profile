import { useCallback, useEffect, useState } from 'react'
import { fetchRepoTree, type RemoteFolderNode } from './githubRepo'

export type RepoStatus = 'loading' | 'ready' | 'error'

// `enabled` is false when the open project is a local one and the repo isn't needed.
export const useRepoTree = (enabled = true) => {
  const [root, setRoot] = useState<RemoteFolderNode | null>(null)
  const [status, setStatus] = useState<RepoStatus>('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!enabled) return undefined
    let cancelled = false
    fetchRepoTree()
      .then((tree) => {
        if (cancelled) return
        setRoot(tree)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [attempt, enabled])

  const retry = useCallback(() => {
    setStatus('loading')
    setAttempt((count) => count + 1)
  }, [])

  return { root, status, retry }
}
