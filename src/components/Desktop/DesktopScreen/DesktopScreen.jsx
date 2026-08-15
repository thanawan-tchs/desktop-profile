import { useMemo, useState } from 'react'
import DesktopIcon from '../DesktopIcon/DesktopIcon'
import Dock from '../Dock/Dock'
import TopBar from '../TopBar/TopBar'
import Obsidian from '../../Applications/Obsidian/Obsidian'
import ResumePdf from '../../Applications/ResumePdf/ResumePdf'
import Finder from '../../Applications/Finder/Finder'
import ImageViewer from '../../Applications/ImageViewer/ImageViewer'
import VsCode from '../../Applications/VsCode/VsCode'
import Settings from '../../Applications/Settings/Settings'
import Terminal from '../../Applications/Terminal/Terminal'
import Chrome from '../../Applications/Chrome/Chrome'
import { MOCK_DEV_URL } from '../../Applications/Chrome/chromeUrl'
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

const WINDOW_IDS = Object.keys(WINDOW_APP_NAMES)
const BASE_Z_INDEX = 20
const DEFAULT_OPEN_WINDOWS = new Set(['obsidian', 'pdf'])

// Only these are dock apps — 'pdf' and 'image' have no dock icon, so they're
// never part of the running-indicator dot list Dock expects.
const DOCK_TRACKED_WINDOW_IDS = ['obsidian', 'finder', 'vscode', 'settings', 'terminal', 'chrome']

// Every window shares the same open/zIndex/props shape, so one state object
// replaces what would otherwise be a boolean + zIndex entry per app (and, for
// Finder/ImageViewer, a separate ad-hoc "what to show" state too).
const createInitialWindows = () =>
  Object.fromEntries(
    WINDOW_IDS.map((id, index) => [
      id,
      { open: DEFAULT_OPEN_WINDOWS.has(id), zIndex: BASE_Z_INDEX + index, props: {} },
    ]),
  )

const DesktopScreen = () => {
  const [selectedId, setSelectedId] = useState(null)
  const [windows, setWindows] = useState(createInitialWindows)
  const [nextZIndex, setNextZIndex] = useState(BASE_Z_INDEX + WINDOW_IDS.length)
  const [chromeInstanceId, setChromeInstanceId] = useState(0)
  const [chromeOpenTabRequest, setChromeOpenTabRequest] = useState({ url: null, id: 0 })
  const [devServerRunning, setDevServerRunning] = useState(false)
  const [wallpaperId, setWallpaperId] = useState(DEFAULT_WALLPAPER_ID)
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

  const bringToFront = (id) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], zIndex: nextZIndex } }))
    setNextZIndex((z) => z + 1)
    setActiveApp(WINDOW_APP_NAMES[id] ?? 'Finder')
  }

  const openWindow = (id, props) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: true, props: props ?? prev[id].props },
    }))
    bringToFront(id)
  }

  const closeWindow = (id) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], open: false } }))
  }

  const openFinder = (folderLabel) => openWindow('finder', { folderName: folderLabel })

  const handleDockAppClick = (appId) => {
    if (appId === 'obsidian') openWindow('obsidian')
    if (appId === 'finder' || appId === 'folder') openFinder('Desktop')
    if (appId === 'vscode') openWindow('vscode')
    if (appId === 'trash') openFinder('Trash')
    if (appId === 'settings') openWindow('settings')
    if (appId === 'terminal') openWindow('terminal')
    if (appId === 'chrome') openWindow('chrome', { initialUrl: null })
  }

  const openMockDevServer = () => {
    setDevServerRunning(true)
    if (windows.chrome.open) {
      setChromeOpenTabRequest((prev) => ({ url: MOCK_DEV_URL, id: prev.id + 1 }))
      bringToFront('chrome')
    } else {
      setChromeInstanceId((id) => id + 1)
      openWindow('chrome', { initialUrl: MOCK_DEV_URL })
    }
  }

  const stopMockDevServer = () => setDevServerRunning(false)

  const handleDesktopItemOpen = (item) => {
    if (item.type === 'pdf') {
      openWindow('pdf')
    } else if (item.type === 'vscode') {
      openWindow('vscode')
    } else if (item.type === 'folder') {
      openFinder(item.label)
    } else if (item.type === 'image' && item.src) {
      openWindow('image', { src: item.src, title: item.label })
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

        {windows.obsidian.open && (
          <Obsidian
            onClose={() => closeWindow('obsidian')}
            zIndex={windows.obsidian.zIndex}
            onFocus={() => bringToFront('obsidian')}
          />
        )}
        {windows.pdf.open && (
          <ResumePdf
            onClose={() => closeWindow('pdf')}
            zIndex={windows.pdf.zIndex}
            onFocus={() => bringToFront('pdf')}
          />
        )}
        {windows.finder.open && (
          <Finder
            folderName={windows.finder.props.folderName}
            onClose={() => closeWindow('finder')}
            zIndex={windows.finder.zIndex}
            onFocus={() => bringToFront('finder')}
            onOpenItem={handleDesktopItemOpen}
          />
        )}
        {windows.image.open && (
          <ImageViewer
            src={windows.image.props.src}
            title={windows.image.props.title}
            onClose={() => closeWindow('image')}
            zIndex={windows.image.zIndex}
            onFocus={() => bringToFront('image')}
          />
        )}
        {windows.vscode.open && (
          <VsCode
            onClose={() => closeWindow('vscode')}
            zIndex={windows.vscode.zIndex}
            onFocus={() => bringToFront('vscode')}
            onRunDevServer={openMockDevServer}
            onStopDevServer={stopMockDevServer}
          />
        )}
        {windows.settings.open && (
          <Settings
            onClose={() => closeWindow('settings')}
            zIndex={windows.settings.zIndex}
            onFocus={() => bringToFront('settings')}
            wallpaperId={wallpaperId}
            onSelectWallpaper={setWallpaperId}
          />
        )}
        {windows.terminal.open && (
          <Terminal
            onClose={() => closeWindow('terminal')}
            zIndex={windows.terminal.zIndex}
            onFocus={() => bringToFront('terminal')}
          />
        )}
        {windows.chrome.open && (
          <Chrome
            key={chromeInstanceId}
            initialUrl={windows.chrome.props.initialUrl ?? undefined}
            openTabRequest={chromeOpenTabRequest}
            devServerRunning={devServerRunning}
            onClose={() => closeWindow('chrome')}
            zIndex={windows.chrome.zIndex}
            onFocus={() => bringToFront('chrome')}
          />
        )}

        {!isAnyFullscreen && (
          <Dock
            onAppClick={handleDockAppClick}
            extraRunningIds={DOCK_TRACKED_WINDOW_IDS.filter((id) => windows[id].open)}
          />
        )}
      </div>
    </FullscreenContext.Provider>
  )
}

export default DesktopScreen
