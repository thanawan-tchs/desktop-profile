import { useState } from 'react'
import FloatingWindow from '../FloatingWindow/FloatingWindow'
import ThemeToggleButton from '../../Common/ThemeToggleButton/ThemeToggleButton'
import VsCodeSidebar from './VsCodeSidebar'
import VsCodeEditor from './VsCodeEditor'
import VsCodeTerminalPanel from './VsCodeTerminalPanel'
import VsCodeStatusBar from './VsCodeStatusBar'
import { useTerminalResize } from './useTerminalResize'
import { TOKEN_COLORS } from './codeHighlight'
import { PROJECT_ROOT, FILES_BY_PATH, DEFAULT_FILE_PATH } from '../../../data/vscodeProject'

const VsCode = ({ onClose, zIndex, onFocus, onRunDevServer, onStopDevServer }) => {
  const [theme, setTheme] = useState('dark')
  const [activePath, setActivePath] = useState(DEFAULT_FILE_PATH)
  const [terminalOpen, setTerminalOpen] = useState(true)
  const isLight = theme === 'light'

  const { height: terminalHeight, handleResizePointerDown } = useTerminalResize({
    initialHeight: 160,
    minHeight: 96,
    maxHeight: 480,
  })

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
          <VsCodeSidebar
            node={PROJECT_ROOT}
            activePath={activePath}
            onSelectFile={setActivePath}
            isLight={isLight}
          />

          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <VsCodeEditor
              fileName={activeFile.name}
              lines={lines}
              colors={TOKEN_COLORS[theme]}
              isLight={isLight}
            />

            {terminalOpen && (
              <VsCodeTerminalPanel
                height={terminalHeight}
                onResizeStart={handleResizePointerDown}
                isLight={isLight}
                onRunDev={onRunDevServer}
                onStopDev={onStopDevServer}
              />
            )}
          </div>
        </div>

        <VsCodeStatusBar
          language={activeFile.language.toUpperCase()}
          onToggleTerminal={() => setTerminalOpen((prev) => !prev)}
        />
      </div>
    </FloatingWindow>
  )
}

export default VsCode
