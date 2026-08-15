import { useState } from 'react'
import FloatingWindow from '../FloatingWindow/FloatingWindow'
import ThemeToggleButton from '../../Common/ThemeToggleButton/ThemeToggleButton'
import VsCodeSidebar from './VsCodeSidebar'
import VsCodeEditor from './VsCodeEditor'
import VsCodeTerminalPanel from './VsCodeTerminalPanel'
import VsCodeStatusBar from './VsCodeStatusBar'
import { usePanelResize } from '../../Common/usePanelResize'
import { TOKEN_COLORS } from './codeHighlight'
import { PROJECT_ROOT, FILES_BY_PATH, DEFAULT_FILE_PATH } from '../../../data/vscodeProject'

const VsCode = ({ onClose, zIndex, onFocus, onRunDevServer, onStopDevServer }) => {
  const [theme, setTheme] = useState('dark')
  const [activePath, setActivePath] = useState(DEFAULT_FILE_PATH)
  const [terminalOpen, setTerminalOpen] = useState(true)
  const isLight = theme === 'light'

  const { size: terminalHeight, handleResizePointerDown: handleTerminalResizeStart } = usePanelResize({
    axis: 'height',
    initialSize: 160,
    minSize: 96,
    maxSize: 480,
    invert: true,
  })

  const { size: sidebarWidth, handleResizePointerDown: handleSidebarResizeStart } = usePanelResize({
    axis: 'width',
    initialSize: 192,
    minSize: 140,
    maxSize: 360,
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
            width={sidebarWidth}
            onResizeStart={handleSidebarResizeStart}
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
                onResizeStart={handleTerminalResizeStart}
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
