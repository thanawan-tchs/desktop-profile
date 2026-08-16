import { useState } from 'react'
import { TOKEN_COLORS } from '../VsCode/codeHighlight'
import { tokenizeJsonLine } from './jsonHighlight'
import type { MockResponse } from './postmanApi'

const statusColor = (status: number, isLight: boolean) => {
  if (status >= 200 && status < 300) return isLight ? 'text-[#1a7f5a]' : 'text-[#4ec9b0]'
  if (status >= 400 && status < 500) return isLight ? 'text-[#b45309]' : 'text-[#f4b942]'
  return isLight ? 'text-[#c0392b]' : 'text-[#f14c4c]'
}

const PostmanResponsePanel = ({
  isSending,
  response,
  isLight,
}: {
  isSending: boolean
  response: MockResponse | null
  isLight: boolean
}) => {
  const [tab, setTab] = useState<'body' | 'headers'>('body')
  const mutedText = isLight ? 'text-black/40' : 'text-white/40'
  const faintText = isLight ? 'text-black/30' : 'text-white/30'

  if (isSending) {
    return <div className={`flex h-full items-center justify-center text-xs ${mutedText}`}>Sending request…</div>
  }

  if (!response) {
    return (
      <div className={`flex h-full items-center justify-center text-xs ${faintText}`}>
        Click Send to get a response
      </div>
    )
  }

  const bodyText = JSON.stringify(response.body, null, 2)
  const bodyLines = bodyText.split('\n')
  const sizeBytes = new Blob([bodyText]).size
  const tokenColors = TOKEN_COLORS[isLight ? 'light' : 'dark']
  const valueColor = isLight ? '#0451a5' : '#4fc1ff'

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div
        className={`flex items-center gap-4 border-b px-3 py-2 text-xs ${isLight ? 'border-black/10' : 'border-black/40'}`}
      >
        <span className={`font-semibold ${statusColor(response.status, isLight)}`}>
          {response.status} {response.statusText}
        </span>
        <span className={mutedText}>{response.durationMs} ms</span>
        <span className={mutedText}>{sizeBytes} B</span>
        <div className="ml-auto flex gap-3">
          {(['body', 'headers'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`capitalize ${
                tab === t
                  ? isLight
                    ? 'text-black'
                    : 'text-white'
                  : isLight
                    ? 'text-black/40 hover:text-black/70'
                    : 'text-white/40 hover:text-white/70'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`flex-1 overflow-auto px-3 py-2 font-mono text-[12.5px] leading-relaxed ${isLight ? 'bg-white' : 'bg-[#1e1e1e]'}`}
      >
        {tab === 'body'
          ? bodyLines.map((line, index) => (
              <div key={index} className="whitespace-pre">
                {tokenizeJsonLine(line).map((token, tokenIndex) => (
                  <span
                    key={tokenIndex}
                    style={{ color: token.type === 'value' ? valueColor : tokenColors[token.type === 'key' ? 'string' : 'plain'] }}
                  >
                    {token.text}
                  </span>
                ))}
                {line.length === 0 ? ' ' : null}
              </div>
            ))
          : Object.entries(response.headers).map(([key, value]) => (
              <div key={key} className={isLight ? 'text-black/70' : 'text-white/70'}>
                <span className={isLight ? 'text-[#0451a5]' : 'text-[#9cdcfe]'}>{key}</span>:{' '}
                <span className={isLight ? 'text-[#a31515]' : 'text-[#ce9178]'}>{value}</span>
              </div>
            ))}
      </div>
    </div>
  )
}

export default PostmanResponsePanel
