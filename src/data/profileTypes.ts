import profile from './profile.json'

// Derived from profile.json rather than hand-written, so it can't drift from
// the actual data — but named so consumers don't need to trace back to the
// JSON import just to see the shape.
export type Job = (typeof profile.experience)[number]
