import { useState } from 'react'
import FloatingWindow from '../FloatingWindow/FloatingWindow'
import ThemeToggleButton from '../../Common/ThemeToggleButton/ThemeToggleButton'
import { Icon, ICON_NAMES } from '../../Common/Icons'
import FileTree from './FileTree'
import VsCodeTerminal from './VsCodeTerminal'
import { tokenizeLine, TOKEN_COLORS } from './codeHighlight'
import { PROJECT_ROOT, FILES_BY_PATH, DEFAULT_FILE_PATH } from '../../../data/vscodeProject'

const MIN_TERMINAL_HEIGHT = 96
const MAX_TERMINAL_HEIGHT = 480

const VsCode = ({ onClose, zIndex, onFocus, onRunDevServer, onStopDevServer }) => {
  const [theme, setTheme] = useState('dark')
  const [activePath, setActivePath] = useState(DEFAULT_FILE_PATH)
  const [terminalOpen, setTerminalOpen] = useState(true)
  const [terminalHeight, setTerminalHeight] = useState(160)
  const isLight = theme === 'light'
  const colors = TOKEN_COLORS[theme]

  const activeFile = FILES_BY_PATH[activePath]
  const lines = activeFile.content.replace(/\n$/, '').split('\n')

  const handleTerminalResizePointerDown = (event) => {
    event.preventDefault()
    const el = event.currentTarget
    el.setPointerCapture(event.pointerId)
    const startY = event.clientY
    const startHeight = terminalHeight

    const handleMove = (moveEvent) => {
      const dy = moveEvent.clientY - startY
      const nextHeight = Math.min(MAX_TERMINAL_HEIGHT, Math.max(MIN_TERMINAL_HEIGHT, startHeight - dy))
      setTerminalHeight(nextHeight)
    }

    const handleUp = (upEvent) => {
      el.releasePointerCapture(upEvent.pointerId)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
  }

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

            {terminalOpen && (
              <div className="flex shrink-0 flex-col" style={{ height: terminalHeight }}>
                <div
                  onPointerDown={handleTerminalResizePointerDown}
                  className={`h-1 shrink-0 cursor-ns-resize touch-none ${
                    isLight ? 'bg-black/10 hover:bg-black/20' : 'bg-black/50 hover:bg-white/20'
                  }`}
                />
                <div className="min-h-0 flex-1">
                  <VsCodeTerminal isLight={isLight} onRunDev={onRunDevServer} onStopDev={onStopDevServer} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex h-[22px] shrink-0 items-center justify-between bg-[#007acc] px-3 text-[11px] text-white">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Icon name={ICON_NAMES.GIT_BRANCH} />
              main
            </span>
            <button
              type="button"
              onClick={() => setTerminalOpen((prev) => !prev)}
              className="rounded px-1 hover:bg-white/10"
            >
              Terminal
            </button>
          </div>
          <span>{activeFile.language.toUpperCase()}</span>
        </div>
      </div>
    </FloatingWindow>
  )
}

export default VsCode
