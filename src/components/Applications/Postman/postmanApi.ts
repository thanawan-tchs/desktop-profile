import profile from '../../../data/profile.json'

// Backs the Postman clone's "Send" button — a tiny fake HTTP layer so the
// app has something real to route/respond to instead of a hardcoded string.
export type MockResponse = {
  status: number
  statusText: string
  headers: Record<string, string>
  body: unknown
  durationMs: number
}

const { person, socials } = profile

const PROFILE_BODY = {
  name: person.name,
  nickname: person.nickname,
  title: person.title,
  email: person.email,
  location: person.location,
  socials: Object.fromEntries(socials.map((social) => [social.label.toLowerCase(), social.href])),
}

const JSON_HEADERS = { 'Content-Type': 'application/json' }

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

type RouteHandler = (body: unknown) => unknown

const ROUTES: Record<string, Partial<Record<string, RouteHandler>>> = {
  '/profile': {
    GET: () => PROFILE_BODY,
    // Echoes whatever the request body sent back in the response, so the
    // Body tab has something real to demonstrate rather than being inert.
    POST: (body) => ({
      message: 'Profile updated',
      profile: { ...PROFILE_BODY, ...(isPlainObject(body) ? body : {}) },
    }),
  },
}

// Strips scheme + host (e.g. "localhost:8080") and any query string from a
// Postman-style address bar value, leaving just the routable path.
const extractPath = (url: string): string => {
  const withoutQuery = url.split('?')[0]
  const withoutScheme = withoutQuery.replace(/^https?:\/\//, '')
  if (withoutScheme.startsWith('/')) return withoutScheme
  const slashIndex = withoutScheme.indexOf('/')
  return slashIndex === -1 ? `/${withoutScheme}` : withoutScheme.slice(slashIndex)
}

// Simulates a network round trip: known route + method -> 200/201, known
// route with an unsupported method -> 405, unknown route -> 404.
export const sendMockRequest = (method: string, url: string, body?: unknown): Promise<MockResponse> => {
  const normalizedPath = extractPath(url)
  const route = ROUTES[normalizedPath]
  const handler = route?.[method]

  let response: MockResponse
  if (!route) {
    response = {
      status: 404,
      statusText: 'Not Found',
      headers: JSON_HEADERS,
      body: { error: 'Not Found', message: `No mock configured for ${normalizedPath}` },
      durationMs: 0,
    }
  } else if (!handler) {
    response = {
      status: 405,
      statusText: 'Method Not Allowed',
      headers: JSON_HEADERS,
      body: { error: 'Method Not Allowed', allowed: Object.keys(route) },
      durationMs: 0,
    }
  } else {
    response = {
      status: method === 'POST' ? 201 : 200,
      statusText: method === 'POST' ? 'Created' : 'OK',
      headers: JSON_HEADERS,
      body: handler(body),
      durationMs: 0,
    }
  }

  const durationMs = 120 + Math.round(Math.random() * 180)
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...response, durationMs }), durationMs)
  })
}
