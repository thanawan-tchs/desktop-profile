import { useState } from 'react'
import FloatingWindow from '../FloatingWindow/FloatingWindow'
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton'
import { GitBranchIcon } from '../icons'
import FileTree from './FileTree'
import { tokenizeLine, TOKEN_COLORS } from './codeHighlight'
import { PROJECT_ROOT, FILES_BY_PATH, DEFAULT_FILE_PATH } from '../../data/vscodeProject'

const VsCodeWindow = ({ onClose, zIndex, onFocus }) => {
  const [theme, setTheme] = useState('dark')
  const [activePath, setActivePath] = useState(DEFAULT_FILE_PATH)
  const isLight = theme === 'light'
  const colors = TOKEN_COLORS[theme]

  const activeFile = FILES_BY_PATH[activePath]
  const lines = activeFile.content.replace(/\n$/, '').split('\n')

  return (
    <FloatingWindow
      title={`${activeFile.name} — ${PROJECT_ROOT.name}`}
      onClose={onClose}
      zIndex={zIndex}
      onFocus={onFocus}
      widthRatio={0.62}
      heightRatio={0.68}
      horizontalBias={0.45}
      verticalBias={0.3}
      minWidth={560}
      minHeight={380}
      theme={theme}
      headerRight={
        <ThemeToggleButton
          theme={theme}
          onToggle={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        />
      }
    >
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          <nav
            className={`w-48 shrink-0 overflow-y-auto border-r py-2 text-[13px] ${
              isLight ? 'border-black/10 bg-[#f3f3f3]' : 'border-black/40 bg-[#252526]'
            }`}
          >
            <div
              className={`px-3 pb-1 text-[10px] font-semibold tracking-wide uppercase ${
                isLight ? 'text-black/40' : 'text-white/40'
              }`}
            >
              Explorer
            </div>
            <FileTree
              node={PROJECT_ROOT}
              activePath={activePath}
              onSelectFile={setActivePath}
              isLight={isLight}
            />
          </nav>

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
                {activeFile.name}
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
                    {line.length === 0 ? ' ' : null}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex h-[22px] shrink-0 items-center justify-between bg-[#007acc] px-3 text-[11px] text-white">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <GitBranchIcon />
              main
            </span>
          </div>
          <span>{activeFile.language.toUpperCase()}</span>
        </div>
      </div>
    </FloatingWindow>
  )
}

export default VsCodeWindow
