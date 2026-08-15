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
import { APP_IDS } from '../../../data/appIds'
import { FullscreenContext } from '../../../context/FullscreenContext'

const WINDOW_APP_NAMES = {
  [APP_IDS.OBSIDIAN]: 'Obsidian',
  [APP_IDS.PDF]: 'Finder',
  [APP_IDS.FINDER]: 'Finder',
  [APP_IDS.IMAGE]: 'Preview',
  [APP_IDS.VSCODE]: 'Visual Studio Code',
  [APP_IDS.SETTINGS]: 'System Settings',
  [APP_IDS.TERMINAL]: 'Terminal',
  [APP_IDS.CHROME]: 'Google Chrome',
}

const WINDOW_IDS = Object.keys(WINDOW_APP_NAMES)
const BASE_Z_INDEX = 20
const DEFAULT_OPEN_WINDOWS = new Set<string>([APP_IDS.OBSIDIAN, APP_IDS.PDF])

// Only these are dock apps — 'pdf' and 'image' have no dock icon, so they're
// never part of the running-indicator dot list Dock expects.
const DOCK_TRACKED_WINDOW_IDS = [
  APP_IDS.OBSIDIAN,
  APP_IDS.FINDER,
  APP_IDS.VSCODE,
  APP_IDS.SETTINGS,
  APP_IDS.TERMINAL,
  APP_IDS.CHROME,
]

type WindowState = { open: boolean; zIndex: number; props: Record<string, any> }

// Every window shares the same open/zIndex/props shape, so one state object
// replaces what would otherwise be a boolean + zIndex entry per app (and, for
// Finder/ImageViewer, a separate ad-hoc "what to show" state too).
const createInitialWindows = (): Record<string, WindowState> =>
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

  // Every other window update is "merge this patch into windows[id]" — keep that
  // immutable-update mechanics in one place so the functions below can just state
  // what changes.
  const updateWindow = (id, patch) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }))
  }

  const bringToFront = (id) => {
    updateWindow(id, { zIndex: nextZIndex })
    setNextZIndex((z) => z + 1)
    setActiveApp(WINDOW_APP_NAMES[id] ?? 'Finder')
  }

  // Omitting `props` leaves the window's existing props untouched (the patch
  // merge only overwrites keys that are present).
  const openWindow = (id, props = null) => {
    updateWindow(id, props ? { open: true, props } : { open: true })
    bringToFront(id)
  }

  const closeWindow = (id) => updateWindow(id, { open: false })

  const openFinder = (folderLabel) => openWindow(APP_IDS.FINDER, { folderName: folderLabel })

  const handleDockAppClick = (appId) => {
    if (appId === APP_IDS.OBSIDIAN) openWindow(APP_IDS.OBSIDIAN)
    if (appId === APP_IDS.FINDER || appId === APP_IDS.FOLDER) openFinder('Desktop')
    if (appId === APP_IDS.VSCODE) openWindow(APP_IDS.VSCODE)
    if (appId === APP_IDS.TRASH) openFinder('Trash')
    if (appId === APP_IDS.SETTINGS) openWindow(APP_IDS.SETTINGS)
    if (appId === APP_IDS.TERMINAL) openWindow(APP_IDS.TERMINAL)
    if (appId === APP_IDS.CHROME) openWindow(APP_IDS.CHROME, { initialUrl: null })
  }

  const openMockDevServer = () => {
    setDevServerRunning(true)
    if (windows.chrome.open) {
      setChromeOpenTabRequest((prev) => ({ url: MOCK_DEV_URL, id: prev.id + 1 }))
      bringToFront(APP_IDS.CHROME)
    } else {
      setChromeInstanceId((id) => id + 1)
      openWindow(APP_IDS.CHROME, { initialUrl: MOCK_DEV_URL })
    }
  }

  const stopMockDevServer = () => setDevServerRunning(false)

  const handleDesktopItemOpen = (item) => {
    if (item.type === 'pdf') {
      openWindow(APP_IDS.PDF)
    } else if (item.type === 'vscode') {
      openWindow(APP_IDS.VSCODE)
    } else if (item.type === 'folder') {
      openFinder(item.label)
    } else if (item.type === 'image' && item.src) {
      openWindow(APP_IDS.IMAGE, { src: item.src, title: item.label })
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
            onClose={() => closeWindow(APP_IDS.OBSIDIAN)}
            zIndex={windows.obsidian.zIndex}
            onFocus={() => bringToFront(APP_IDS.OBSIDIAN)}
          />
        )}
        {windows.pdf.open && (
          <ResumePdf
            onClose={() => closeWindow(APP_IDS.PDF)}
            zIndex={windows.pdf.zIndex}
            onFocus={() => bringToFront(APP_IDS.PDF)}
          />
        )}
        {windows.finder.open && (
          <Finder
            folderName={windows.finder.props.folderName}
            onClose={() => closeWindow(APP_IDS.FINDER)}
            zIndex={windows.finder.zIndex}
            onFocus={() => bringToFront(APP_IDS.FINDER)}
            onOpenItem={handleDesktopItemOpen}
          />
        )}
        {windows.image.open && (
          <ImageViewer
            src={windows.image.props.src}
            title={windows.image.props.title}
            onClose={() => closeWindow(APP_IDS.IMAGE)}
            zIndex={windows.image.zIndex}
            onFocus={() => bringToFront(APP_IDS.IMAGE)}
          />
        )}
        {windows.vscode.open && (
          <VsCode
            onClose={() => closeWindow(APP_IDS.VSCODE)}
            zIndex={windows.vscode.zIndex}
            onFocus={() => bringToFront(APP_IDS.VSCODE)}
            onRunDevServer={openMockDevServer}
            onStopDevServer={stopMockDevServer}
          />
        )}
        {windows.settings.open && (
          <Settings
            onClose={() => closeWindow(APP_IDS.SETTINGS)}
            zIndex={windows.settings.zIndex}
            onFocus={() => bringToFront(APP_IDS.SETTINGS)}
            wallpaperId={wallpaperId}
            onSelectWallpaper={setWallpaperId}
          />
        )}
        {windows.terminal.open && (
          <Terminal
            onClose={() => closeWindow(APP_IDS.TERMINAL)}
            zIndex={windows.terminal.zIndex}
            onFocus={() => bringToFront(APP_IDS.TERMINAL)}
          />
        )}
        {windows.chrome.open && (
          <Chrome
            key={chromeInstanceId}
            initialUrl={windows.chrome.props.initialUrl ?? undefined}
            openTabRequest={chromeOpenTabRequest}
            devServerRunning={devServerRunning}
            onClose={() => closeWindow(APP_IDS.CHROME)}
            zIndex={windows.chrome.zIndex}
            onFocus={() => bringToFront(APP_IDS.CHROME)}
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
