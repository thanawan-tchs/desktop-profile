// The repo shown in the VS Code explorer. Its tree and file contents are fetched
// from GitHub at runtime (see components/Applications/VsCode/githubRepo.ts) rather
// than bundled, so the app always shows what's currently on GitHub.
export const REMOTE_PROJECT = {
  owner: 'thanawan-tchs',
  repo: 'sc-order-management-service',
  // HEAD resolves to the repo's default branch for both the API and raw hosts.
  ref: 'HEAD',
  defaultFile: 'src/app.ts',
}

export const REMOTE_PROJECT_URL = `https://github.com/${REMOTE_PROJECT.owner}/${REMOTE_PROJECT.repo}`

// Explorer paths are prefixed with the root folder's name, same as the local mock project.
export const REMOTE_DEFAULT_FILE_PATH = `${REMOTE_PROJECT.repo}/${REMOTE_PROJECT.defaultFile}`
