import { REMOTE_PROJECT } from '../../../data/githubProject'

const { owner, repo, ref } = REMOTE_PROJECT

const TREE_URL = `https://api.github.com/repos/${owner}/${repo}/git/trees/${ref}?recursive=1`
const rawUrl = (path: string) => `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`

const MAX_FILE_BYTES = 200_000
const HIDDEN_FILES = new Set(['package-lock.json', '.DS_Store'])

export type RemoteFileNode = { name: string; type: 'file'; language: string; remotePath: string }
export type RemoteFolderNode = { name: string; type: 'folder'; children: RemoteNode[] }
export type RemoteNode = RemoteFileNode | RemoteFolderNode

type TreeEntry = { path: string; type: 'blob' | 'tree' | 'commit'; size?: number }

export const languageOf = (fileName: string) => {
  if (fileName === 'Dockerfile') return 'dockerfile'
  const ext = fileName.includes('.') ? (fileName.split('.').pop() as string) : ''
  return ext === 'yml' ? 'yaml' : ext
}

// Folders first, then files, each alphabetical — the same order VS Code's explorer uses.
const compareNodes = (a: RemoteNode, b: RemoteNode) => {
  if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
  return a.name.localeCompare(b.name)
}

const sortTree = (folder: RemoteFolderNode) => {
  folder.children.sort(compareNodes)
  folder.children.forEach((child) => {
    if (child.type === 'folder') sortTree(child)
  })
}

const buildTree = (entries: TreeEntry[]): RemoteFolderNode => {
  const root: RemoteFolderNode = { name: repo, type: 'folder', children: [] }

  entries
    .filter((entry) => entry.type === 'blob' && (entry.size ?? 0) <= MAX_FILE_BYTES)
    .filter((entry) => !HIDDEN_FILES.has(entry.path.split('/').pop() as string) && !entry.path.endsWith('.drawio'))
    .forEach((entry) => {
      const segments = entry.path.split('/')
      const fileName = segments.pop() as string

      let folder = root
      segments.forEach((segment) => {
        let next = folder.children.find(
          (child): child is RemoteFolderNode => child.type === 'folder' && child.name === segment,
        )
        if (!next) {
          next = { name: segment, type: 'folder', children: [] }
          folder.children.push(next)
        }
        folder = next
      })
      folder.children.push({ name: fileName, type: 'file', language: languageOf(fileName), remotePath: entry.path })
    })

  sortTree(root)
  return root
}

// Module-level caches so reopening the window (or reselecting a file) doesn't
// refetch — the unauthenticated GitHub API is limited to 60 requests/hour per IP.
let treePromise: Promise<RemoteFolderNode> | null = null
const filePromises = new Map<string, Promise<string>>()
const fileCache = new Map<string, string>()

export const fetchRepoTree = () => {
  if (!treePromise) {
    treePromise = fetch(TREE_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub API responded ${response.status}`)
        return response.json()
      })
      .then((data: { tree: TreeEntry[] }) => buildTree(data.tree))
      .catch((error) => {
        treePromise = null
        throw error
      })
  }
  return treePromise
}

export const getCachedRepoFile = (path: string) => fileCache.get(path)

export const fetchRepoFile = (path: string) => {
  let promise = filePromises.get(path)
  if (!promise) {
    promise = fetch(rawUrl(path))
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub responded ${response.status} for ${path}`)
        return response.text()
      })
      .then((text) => {
        fileCache.set(path, text)
        return text
      })
      .catch((error) => {
        filePromises.delete(path)
        throw error
      })
    filePromises.set(path, promise)
  }
  return promise
}
