export const DEFAULT_URL = 'https://react.dev/'

// Address the VS Code integrated terminal "opens" after `npm run dev` — rendered
// as a live preview of the mock project's App.jsx instead of a real network request.
export const MOCK_DEV_URL = 'http://localhost:5173/'

// Sites known to send X-Frame-Options / CSP frame-ancestors headers that block
// embedding entirely — the iframe would just stay blank, so we short-circuit
// to a friendlier explanation instead.
const BLOCKED_HOSTS = [
  'google.com',
  'youtube.com',
  'facebook.com',
  'instagram.com',
  'twitter.com',
  'x.com',
  'linkedin.com',
  'amazon.com',
  'github.com',
  'chatgpt.com',
  'openai.com',
  'anthropic.com',
  'apple.com',
  'netflix.com',
]

export const normalizeUrl = (input) => {
  const trimmed = input.trim()
  if (!trimmed) return DEFAULT_URL
  const looksLikeUrl = /^https?:\/\//i.test(trimmed) || /^[\w-]+(\.[\w-]+)+(\/|$)/.test(trimmed)
  if (looksLikeUrl) return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  return `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`
}

export const hostnameOf = (url) => {
  if (url === MOCK_DEV_URL) return 'My App'
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return 'New Tab'
  }
}

export const isBlockedHost = (url) => {
  try {
    const { hostname } = new URL(url)
    return BLOCKED_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`))
  } catch {
    return false
  }
}

export const isMockDevServer = (url) => url === MOCK_DEV_URL
