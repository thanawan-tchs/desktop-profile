import { useState } from 'react'
import FloatingWindow from '../FloatingWindow/FloatingWindow'
import ThemeToggleButton from '../../Common/ThemeToggleButton/ThemeToggleButton'
import ChromeTabStrip from './ChromeTabStrip'
import ChromeToolbar from './ChromeToolbar'
import BlockedPage from './BlockedPage'
import { DEFAULT_URL, normalizeUrl, hostnameOf, isBlockedHost } from './chromeUrl'

const Chrome = ({ onClose, zIndex, onFocus }) => {
  const [theme, setTheme] = useState('light')
  const isLight = theme === 'light'
  const [history, setHistory] = useState([DEFAULT_URL])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [addressInput, setAddressInput] = useState(DEFAULT_URL)
  const [reloadKey, setReloadKey] = useState(0)

  const activeUrl = history[historyIndex]
  const blocked = isBlockedHost(activeUrl)

  const navigateTo = (rawInput) => {
    const nextUrl = normalizeUrl(rawInput)
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), nextUrl])
    setHistoryIndex((index) => index + 1)
    setAddressInput(nextUrl)
  }

  const goBack = () => {
    if (historyIndex === 0) return
    setAddressInput(history[historyIndex - 1])
    setHistoryIndex((index) => index - 1)
  }

  const goForward = () => {
    if (historyIndex >= history.length - 1) return
    setAddressInput(history[historyIndex + 1])
    setHistoryIndex((index) => index + 1)
  }

  const reload = () => setReloadKey((key) => key + 1)

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
        <ChromeTabStrip activeUrl={activeUrl} isLight={isLight} />

        <ChromeToolbar
          isLight={isLight}
          canGoBack={historyIndex > 0}
          canGoForward={historyIndex < history.length - 1}
          onBack={goBack}
          onForward={goForward}
          onReload={reload}
          addressInput={addressInput}
          onAddressChange={(event) => setAddressInput(event.target.value)}
          onSubmit={handleSubmit}
        />

        <div className="relative flex-1 overflow-hidden">
          {blocked ? (
            <BlockedPage url={activeUrl} isLight={isLight} onRetry={reload} />
          ) : (
            <iframe
              key={`${activeUrl}::${reloadKey}`}
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
