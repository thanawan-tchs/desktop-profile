import { tokenizeLine } from './codeHighlight'

const VsCodeEditor = ({ fileName, lines, colors, isLight }) => (
  <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
    <div
      className={`flex h-8 shrink-0 items-center border-b text-[12px] ${
        isLight ? 'border-black/10 bg-[#f3f3f3]' : 'border-black/40 bg-[#2d2d2d]'
      }`}
    >
      <div
        className={`flex h-full items-center gap-1.5 border-r px-3 ${
          isLight ? 'border-black/10 bg-white text-black/80' : 'border-black/40 bg-[#1e1e1e] text-white/80'
        }`}
      >
        {fileName}
      </div>
    </div>

    <div
      className={`flex-1 overflow-auto font-mono text-[12.5px] leading-[1.6] ${
        isLight ? 'bg-white' : 'bg-[#1e1e1e]'
      }`}
    >
      {lines.map((line, index) => (
        <div key={index} className="flex">
          <span
            className={`w-10 shrink-0 select-none pr-3 text-right ${
              isLight ? 'text-black/30' : 'text-white/30'
            }`}
          >
            {index + 1}
          </span>
          <span className="whitespace-pre pr-4">
            {tokenizeLine(line).map((token, tokenIndex) => (
              <span key={tokenIndex} style={{ color: colors[token.type] }}>
                {token.text}
              </span>
            ))}
            {line.length === 0 ? ' ' : null}
          </span>
        </div>
      ))}
    </div>
  </div>
)

export default VsCodeEditor
