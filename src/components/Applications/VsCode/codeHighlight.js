const KEYWORDS = new Set([
  'import', 'export', 'default', 'const', 'let', 'var', 'function', 'return',
  'from', 'if', 'else', 'for', 'while', 'new', 'class', 'extends', 'this',
  'true', 'false', 'null', 'undefined', 'async', 'await', 'try', 'catch',
  'typeof', 'of', 'in', 'static', 'get', 'set',
])

const TOKEN_PATTERN =
  /\/\/.*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|<\/?[A-Za-z][\w.-]*>?|\/>|\b\d+(?:\.\d+)?\b/g

const classify = (text) => {
  if (text.startsWith('//')) return 'comment'
  if (text[0] === '"' || text[0] === "'" || text[0] === '`') return 'string'
  if (text[0] === '<' || text === '/>') return 'tag'
  return 'number'
}

const tokenizePlain = (text) => {
  return text
    .split(/(\b[A-Za-z_$][\w$]*\b)/)
    .filter(Boolean)
    .map((part) => ({ text: part, type: KEYWORDS.has(part) ? 'keyword' : 'plain' }))
}

export const tokenizeLine = (line) => {
  const tokens = []
  let lastIndex = 0
  let match

  TOKEN_PATTERN.lastIndex = 0
  while ((match = TOKEN_PATTERN.exec(line))) {
    if (match.index > lastIndex) {
      tokens.push(...tokenizePlain(line.slice(lastIndex, match.index)))
    }
    tokens.push({ text: match[0], type: classify(match[0]) })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < line.length) {
    tokens.push(...tokenizePlain(line.slice(lastIndex)))
  }
  return tokens
}

export const TOKEN_COLORS = {
  dark: {
    comment: '#6a9955',
    string: '#ce9178',
    tag: '#4ec9b0',
    number: '#b5cea8',
    keyword: '#569cd6',
    plain: '#d4d4d4',
  },
  light: {
    comment: '#008000',
    string: '#a31515',
    tag: '#800000',
    number: '#098658',
    keyword: '#0000ff',
    plain: '#1e1e1e',
  },
}
