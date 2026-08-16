import { useRef } from 'react'
import { tokenizeJsonLine } from './jsonHighlight'
import { TOKEN_COLORS } from '../VsCode/codeHighlight'
import type { RawSubType } from './PostmanBodyEditor'

const LINE_CLASS = 'font-mono text-xs leading-relaxed'

// A transparent <textarea> stacked over a <pre> that renders the same text
// with color — the textarea stays the real input (caret, selection, typing),
// the <pre> just paints what shows through it. Scroll position is synced by
// hand since the two are independent elements. Mirrors the overlay trick any
// "syntax highlighted textarea" needs when there's no editor library involved.
const PostmanRawBodyEditor = ({
  value,
  onChange,
  subType,
  placeholder,
  isLight,
}: {
  value: string
  onChange: (value: string) => void
  subType: RawSubType
  placeholder: string
  isLight: boolean
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const gutterRef = useRef<HTMLDivElement>(null)

  const lines = value.split('\n')
  const tokenColors = TOKEN_COLORS[isLight ? 'light' : 'dark']
  const valueColor = isLight ? '#0451a5' : '#4fc1ff'
  const plainColor = isLight ? 'rgba(0,0,0,0.8)' : '#dcdcdc'

  const handleScroll = () => {
    const el = textareaRef.current
    if (!el) return
    if (preRef.current) {
      preRef.current.scrollTop = el.scrollTop
      preRef.current.scrollLeft = el.scrollLeft
    }
    if (gutterRef.current) gutterRef.current.scrollTop = el.scrollTop
  }

  return (
    <div className="flex h-full">
      <div
        ref={gutterRef}
        className={`w-8 shrink-0 overflow-hidden px-2 py-2 text-right select-none ${LINE_CLASS} ${
          isLight ? 'text-black/30' : 'text-white/30'
        }`}
      >
        {lines.map((_, index) => (
          <div key={index}>{index + 1}</div>
        ))}
      </div>

      <div className="relative min-w-0 flex-1">
        <pre
          ref={preRef}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 overflow-hidden px-3 py-2 whitespace-pre ${LINE_CLASS}`}
        >
          {lines.map((line, index) => (
            <div key={index}>
              {subType === 'json'
                ? tokenizeJsonLine(line).map((token, tokenIndex) => (
                    <span
                      key={tokenIndex}
                      style={{
                        color:
                          token.type === 'value' ? valueColor : tokenColors[token.type === 'key' ? 'string' : 'plain'],
                      }}
                    >
                      {token.text}
                    </span>
                  ))
                : <span style={{ color: plainColor }}>{line}</span>}
              {line.length === 0 ? ' ' : null}
            </div>
          ))}
        </pre>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onScroll={handleScroll}
          placeholder={placeholder}
          spellCheck={false}
          className={`absolute inset-0 h-full w-full resize-none overflow-auto bg-transparent px-3 py-2 whitespace-pre text-transparent outline-none ${LINE_CLASS} ${
            isLight ? 'caret-black placeholder:text-black/25' : 'caret-white placeholder:text-white/25'
          }`}
        />
      </div>
    </div>
  )
}

export default PostmanRawBodyEditor
