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
import { REMOTE_PROJECT, REMOTE_DEFAULT_FILE_PATH } from '../../../data/githubProject'
import { languageOf } from './githubRepo'
import { useRepoTree } from './useRepoTree'
import { useRepoFile } from './useRepoFile'

const REPO_PATH_PREFIX = `${REMOTE_PROJECT.repo}/`

// Local mock-project files carry their content inline; anything else is a file in
// the GitHub repo and gets its content fetched on demand.
const resolveFile = (path: string) => {
  const local = FILES_BY_PATH[path]
  if (local) return { name: local.name, language: local.language, content: local.content as string | undefined, remotePath: undefined }
  const remotePath = path.slice(REPO_PATH_PREFIX.length)
  const name = remotePath.split('/').pop() as string
  return { name, language: languageOf(name), content: undefined, remotePath }
}

const LOADING_LINES = ['// Loading from GitHub…']
const ERROR_LINES = [
  '// Could not load this file from GitHub.',
  '// Check your connection, then select another file and come back to retry.',
]

// Each window shows one project: the local mock `my-app` by default, or the GitHub
// repo. `cascadeIndex` offsets the default position so a second window doesn't
// open exactly on top of the first.
const VsCode = ({
  onClose,
  zIndex,
  onFocus,
  onRunDevServer,
  onStopDevServer,
  projectName = PROJECT_ROOT.name,
  testId = 'vscode',
  cascadeIndex = 0,
}) => {
  const isRemoteProject = projectName === REMOTE_PROJECT.repo
  const [theme, setTheme] = useState('dark')
  const [activePath, setActivePath] = useState(isRemoteProject ? REMOTE_DEFAULT_FILE_PATH : DEFAULT_FILE_PATH)
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

  const { root: repoRoot, status: repoStatus, retry: retryRepo } = useRepoTree(isRemoteProject)
  const activeFile = resolveFile(activePath)
  const remoteFile = useRepoFile(activeFile.remotePath)
  const content = activeFile.content ?? remoteFile.content
  const lines =
    content !== undefined
      ? content.replace(/\n$/, '').split('\n')
      : remoteFile.status === 'error'
        ? ERROR_LINES
        : LOADING_LINES
  const roots = isRemoteProject ? (repoRoot ? [repoRoot] : []) : [PROJECT_ROOT]

  return (
    <FloatingWindow
      title={`${activeFile.name} — ${activePath.split('/')[0]}`}
      testId={testId}
      onClose={onClose}
      zIndex={zIndex}
      onFocus={onFocus}
      widthRatio={0.62}
      heightRatio={0.68}
      horizontalBias={0.45 + 0.1 * cascadeIndex}
      verticalBias={0.3 + 0.1 * cascadeIndex}
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
            roots={roots}
            repoStatus={isRemoteProject ? repoStatus : 'ready'}
            onRetryRepo={retryRepo}
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
