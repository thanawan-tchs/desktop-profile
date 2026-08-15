import { useEffect, useRef, useState } from 'react'
import FloatingWindow from '../FloatingWindow/FloatingWindow'
import ThemeToggleButton from '../../Common/ThemeToggleButton/ThemeToggleButton'
import ChromeTabStrip from './ChromeTabStrip'
import ChromeToolbar from './ChromeToolbar'
import BlockedPage from './BlockedPage'
import MockDevPreview from './MockDevPreview'
import ConnectionRefusedPage from './ConnectionRefusedPage'
import { hostnameOf, isBlockedHost, isMockDevServer } from './chromeUrl'
import { useChromeTabs } from './useChromeTabs'

const Chrome = ({ onClose, zIndex, onFocus, initialUrl, openTabRequest, devServerRunning }) => {
  const [theme, setTheme] = useState('light')
  const isLight = theme === 'light'

  const {
    tabs,
    activeTab,
    activeTabId,
    activeUrl,
    addressInput,
    setAddressInput,
    setActiveTabId,
    navigateTo,
    goBack,
    goForward,
    reload,
    openNewTab,
    openOrFocusTab,
    closeTab,
  } = useChromeTabs(initialUrl, onClose)

  // A parent (e.g. the VS Code terminal's "npm run dev") can ask an already-open
  // Chrome window to show a URL — reusing a matching tab instead of appending a
  // duplicate one, without remounting/losing the window's other tabs.
  const lastSeenRequestId = useRef(openTabRequest?.id ?? 0)
  useEffect(() => {
    if (!openTabRequest || openTabRequest.id === lastSeenRequestId.current) return
    lastSeenRequestId.current = openTabRequest.id
    openOrFocusTab(openTabRequest.url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openTabRequest])

  const isMock = isMockDevServer(activeUrl)
  const blocked = !isMock && isBlockedHost(activeUrl)

  const handleSubmit = (event) => {
    event.preventDefault()
    navigateTo(addressInput)
  }

  return (
    <FloatingWindow
      title={hostnameOf(activeUrl)}
      onClose={onClose}
      zIndex={zIndex}
      onFocus={onFocus}
      widthRatio={0.72}
      heightRatio={0.72}
      horizontalBias={0.5}
      verticalBias={0.35}
      minWidth={480}
      minHeight={360}
      theme={theme}
      headerRight={
        <ThemeToggleButton
          theme={theme}
          onToggle={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        />
      }
    >
      <div className="flex flex-1 flex-col overflow-hidden">
        <ChromeTabStrip
          tabs={tabs}
          activeTabId={activeTabId}
          onSelectTab={setActiveTabId}
          onCloseTab={closeTab}
          onNewTab={() => openNewTab()}
          isLight={isLight}
        />

        <ChromeToolbar
          isLight={isLight}
          canGoBack={activeTab.historyIndex > 0}
          canGoForward={activeTab.historyIndex < activeTab.history.length - 1}
          onBack={goBack}
          onForward={goForward}
          onReload={reload}
          addressInput={addressInput}
          onAddressChange={(event) => setAddressInput(event.target.value)}
          onSubmit={handleSubmit}
          secure={activeUrl.startsWith('https://')}
        />

        <div className="relative flex-1 overflow-hidden">
          {isMock ? (
            devServerRunning ? (
              <MockDevPreview key={`${activeTab.id}::${activeTab.reloadKey}`} />
            ) : (
              <ConnectionRefusedPage url={activeUrl} isLight={isLight} onReload={reload} />
            )
          ) : blocked ? (
            <BlockedPage url={activeUrl} isLight={isLight} onRetry={reload} />
          ) : (
            <iframe
              key={`${activeTab.id}::${activeUrl}::${activeTab.reloadKey}`}
              src={activeUrl}
              title="webview"
              className="h-full w-full border-0 bg-white"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          )}
        </div>
      </div>
    </FloatingWindow>
  )
}

export default Chrome
