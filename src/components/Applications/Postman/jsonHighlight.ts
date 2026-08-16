// Tokenizes a single line of pretty-printed JSON (from JSON.stringify(x, null, 2))
// into key/value/punctuation spans — VS Code's generic codeHighlight tokenizer
// treats every quoted string the same, so it can't tell a JSON key apart from
// its value the way this needs to.
export type JsonTokenType = 'key' | 'value' | 'punct'
export type JsonToken = { text: string; type: JsonTokenType }

// Optional "key": prefix (indent, key, colon-with-spacing), then whatever's left.
const LINE_PATTERN = /^(\s*)(?:"([^"]*)"(\s*:\s*))?(.*)$/
// A bare JSON literal — string, number, true/false, or null — at the start
// of the remainder, with any trailing punctuation (comma) captured separately.
const VALUE_PATTERN = /^("(?:[^"\\]|\\.)*"|-?\d+(?:\.\d+)?|true|false|null)(.*)$/

export const tokenizeJsonLine = (line: string): JsonToken[] => {
  const match = line.match(LINE_PATTERN)
  if (!match) return [{ text: line, type: 'punct' }]

  const [, indent, key, colon, rest] = match
  const tokens: JsonToken[] = []

  if (indent) tokens.push({ text: indent, type: 'punct' })
  if (key !== undefined) {
    tokens.push({ text: `"${key}"`, type: 'key' })
    tokens.push({ text: colon, type: 'punct' })
  }

  if (rest) {
    const valueMatch = rest.match(VALUE_PATTERN)
    if (valueMatch) {
      tokens.push({ text: valueMatch[1], type: 'value' })
      if (valueMatch[2]) tokens.push({ text: valueMatch[2], type: 'punct' })
    } else {
      tokens.push({ text: rest, type: 'punct' })
    }
  }

  return tokens
}
