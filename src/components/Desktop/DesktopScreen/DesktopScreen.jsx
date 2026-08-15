import { useMemo, useState } from 'react'
import DesktopIcon from '../DesktopIcon/DesktopIcon'
import Dock from '../Dock/Dock'
import TopBar from '../TopBar/TopBar'
import Obsidian from '../../Applications/Obsidian/Obsidian'
import ResumePdf from '../../Applications/ResumePdf/ResumePdf'
import Folder from '../../Applications/Folder/Folder'
import ImageViewer from '../../Applications/ImageViewer/ImageViewer'
import VsCode from '../../Applications/VsCode/VsCode'
import Settings from '../../Applications/Settings/Settings'
import Terminal from '../../Applications/Terminal/Terminal'
import Chrome from '../../Applications/Chrome/Chrome'
import { DESKTOP_ITEMS } from '../../../data/desktopItems'
import { WALLPAPERS, DEFAULT_WALLPAPER_ID } from '../../../data/wallpapers'
import { FullscreenContext } from '../../../context/FullscreenContext'

const WINDOW_APP_NAMES = {
  obsidian: 'Obsidian',
  pdf: 'Finder',
  finder: 'Finder',
  image: 'Preview',
  vscode: 'Visual Studio Code',
  settings: 'System Settings',
  terminal: 'Terminal',
  chrome: 'Google Chrome',
}

const DesktopScreen = () => {
  const [selectedId, setSelectedId] = useState(null)
  const [obsidianOpen, setObsidianOpen] = useState(true)
  const [pdfOpen, setPdfOpen] = useState(true)
  const [finderOpen, setFinderOpen] = useState(false)
  const [finderFolder, setFinderFolder] = useState('Desktop')
  const [imageViewer, setImageViewer] = useState(null)
  const [vscodeOpen, setVscodeOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [chromeOpen, setChromeOpen] = useState(false)
  const [wallpaperId, setWallpaperId] = useState(DEFAULT_WALLPAPER_ID)
  const [zIndexes, setZIndexes] = useState({
    obsidian: 20,
    pdf: 21,
    finder: 22,
    image: 23,
    vscode: 24,
    settings: 25,
    terminal: 26,
    chrome: 27,
  })
  const [nextZIndex, setNextZIndex] = useState(28)
  const [activeApp, setActiveApp] = useState('Finder')
  const [fullscreenCount, setFullscreenCount] = useState(0)
  const [chromeVisible, setChromeVisible] = useState(false)
  const isAnyFullscreen = fullscreenCount > 0

  const wallpaper = WALLPAPERS.find((item) => item.id === wallpaperId)?.src

  const fullscreenContextValue = useMemo(
    () => ({
      chromeVisible,
      setChromeVisible,
      registerFullscreen: (isFullscreen) => {
        setFullscreenCount((count) => count + (isFullscreen ? 1 : -1))
      },
    }),
    [chromeVisible],
  )

  const bringToFront = (windowId) => {
    setZIndexes((prev) => ({ ...prev, [windowId]: nextZIndex }))
    setNextZIndex((z) => z + 1)
    setActiveApp(WINDOW_APP_NAMES[windowId] ?? 'Finder')
  }

  const openFinder = (folderLabel) => {
    setFinderFolder(folderLabel)
    setFinderOpen(true)
    bringToFront('finder')
  }

  const handleDockAppClick = (appId) => {
    if (appId === 'obsidian') {
      setObsidianOpen(true)
      bringToFront('obsidian')
    }
    if (appId === 'finder' || appId === 'folder') {
      openFinder('Desktop')
    }
    if (appId === 'vscode') {
      setVscodeOpen(true)
      bringToFront('vscode')
    }
    if (appId === 'trash') {
      openFinder('Trash')
    }
    if (appId === 'settings') {
      setSettingsOpen(true)
      bringToFront('settings')
    }
    if (appId === 'terminal') {
      setTerminalOpen(true)
      bringToFront('terminal')
    }
    if (appId === 'chrome') {
      setChromeOpen(true)
      bringToFront('chrome')
    }
  }

  const handleDesktopItemOpen = (item) => {
    if (item.type === 'pdf') {
      setPdfOpen(true)
      bringToFront('pdf')
    } else if (item.type === 'vscode') {
      setVscodeOpen(true)
      bringToFront('vscode')
    } else if (item.type === 'folder') {
      openFinder(item.label)
    } else if (item.type === 'image' && item.src) {
      setImageViewer({ src: item.src, title: item.label })
      bringToFront('image')
    }
  }

  return (
    <FullscreenContext.Provider value={fullscreenContextValue}>
      <div
        className="relative h-dvh w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${wallpaper})` }}
        onClick={() => {
          setSelectedId(null)
          setActiveApp('Finder')
        }}
      >
        <TopBar
          activeApp={activeApp}
          overlayMode={isAnyFullscreen}
          visible={chromeVisible}
          onMouseEnter={() => setChromeVisible(true)}
          onMouseLeave={() => setChromeVisible(false)}
        />

        <div className="absolute top-10 right-1.5 flex flex-col items-center gap-1">
          {DESKTOP_ITEMS.map((item) => (
            <DesktopIcon
              key={item.id}
              label={item.label}
              type={item.type}
              src={item.src}
              selected={selectedId === item.id}
              onSelect={(event) => {
                event.stopPropagation()
                setSelectedId(item.id)
                handleDesktopItemOpen(item)
              }}
            />
          ))}
        </div>

        {obsidianOpen && (
          <Obsidian
            onClose={() => setObsidianOpen(false)}
            zIndex={zIndexes.obsidian}
            onFocus={() => bringToFront('obsidian')}
          />
        )}
        {pdfOpen && (
          <ResumePdf
            onClose={() => setPdfOpen(false)}
            zIndex={zIndexes.pdf}
            onFocus={() => bringToFront('pdf')}
          />
        )}
        {finderOpen && (
          <Folder
            folderName={finderFolder}
            onClose={() => setFinderOpen(false)}
            zIndex={zIndexes.finder}
            onFocus={() => bringToFront('finder')}
            onOpenItem={handleDesktopItemOpen}
          />
        )}
        {imageViewer && (
          <ImageViewer
            src={imageViewer.src}
            title={imageViewer.title}
            onClose={() => setImageViewer(null)}
            zIndex={zIndexes.image}
            onFocus={() => bringToFront('image')}
          />
        )}
        {vscodeOpen && (
          <VsCode
            onClose={() => setVscodeOpen(false)}
            zIndex={zIndexes.vscode}
            onFocus={() => bringToFront('vscode')}
          />
        )}
        {settingsOpen && (
          <Settings
            onClose={() => setSettingsOpen(false)}
            zIndex={zIndexes.settings}
            onFocus={() => bringToFront('settings')}
            wallpaperId={wallpaperId}
            onSelectWallpaper={setWallpaperId}
          />
        )}
        {terminalOpen && (
          <Terminal
            onClose={() => setTerminalOpen(false)}
            zIndex={zIndexes.terminal}
            onFocus={() => bringToFront('terminal')}
          />
        )}
        {chromeOpen && (
          <Chrome
            onClose={() => setChromeOpen(false)}
            zIndex={zIndexes.chrome}
            onFocus={() => bringToFront('chrome')}
          />
        )}

        {!isAnyFullscreen && (
          <Dock
            onAppClick={handleDockAppClick}
            extraRunningIds={[
              ...(obsidianOpen ? ['obsidian'] : []),
              ...(finderOpen ? ['finder'] : []),
              ...(vscodeOpen ? ['vscode'] : []),
              ...(settingsOpen ? ['settings'] : []),
              ...(terminalOpen ? ['terminal'] : []),
              ...(chromeOpen ? ['chrome'] : []),
            ]}
          />
        )}
      </div>
    </FullscreenContext.Provider>
  )
}

export default DesktopScreen
