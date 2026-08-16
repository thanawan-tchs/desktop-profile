export type SavedRequest = { id: string; name: string; method: string; url: string }

export const COLLECTION: { name: string; requests: SavedRequest[] } = {
  name: 'Portfolio API',
  requests: [{ id: 'get-profile', name: 'Get Profile', method: 'GET', url: 'localhost:8080/profile' }],
}

export const DEFAULT_REQUEST = COLLECTION.requests[0]
