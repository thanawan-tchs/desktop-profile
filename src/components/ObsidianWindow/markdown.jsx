function renderInline(text, keyPrefix) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${keyPrefix}-${index}`}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={`${keyPrefix}-${index}`}
          className="rounded bg-white/10 px-1 py-0.5 text-[0.85em]"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}

export function renderMarkdown(markdown) {
  const lines = markdown.trim().split('\n')
  const blocks = []
  let listBuffer = []

  const flushList = () => {
    if (!listBuffer.length) return
    const items = listBuffer
    blocks.push(
      <ul key={`list-${blocks.length}`} className="mb-3 list-disc space-y-1 pl-5">
        {items.map((item, index) => (
          <li key={index}>{renderInline(item, `li-${blocks.length}-${index}`)}</li>
        ))}
      </ul>,
    )
    listBuffer = []
  }

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim()
    if (line.startsWith('- ')) {
      listBuffer.push(line.slice(2))
      return
    }
    flushList()
    if (!line) return
    if (line.startsWith('### ')) {
      blocks.push(
        <h3 key={index} className="mb-1 mt-4 text-base font-semibold text-white">
          {renderInline(line.slice(4), `h${index}`)}
        </h3>,
      )
    } else if (line.startsWith('## ')) {
      blocks.push(
        <h2 key={index} className="mb-2 mt-5 text-lg font-semibold text-white">
          {renderInline(line.slice(3), `h${index}`)}
        </h2>,
      )
    } else if (line.startsWith('# ')) {
      blocks.push(
        <h1 key={index} className="mb-3 mt-2 text-2xl font-bold text-white">
          {renderInline(line.slice(2), `h${index}`)}
        </h1>,
      )
    } else {
      blocks.push(
        <p key={index} className="mb-3 leading-relaxed">
          {renderInline(line, `p${index}`)}
        </p>,
      )
    }
  })
  flushList()

  return blocks
}
