import { useState } from 'react'
import DesktopIcon from '../DesktopIcon/DesktopIcon'
import Dock from '../Dock/Dock'
import TopBar from '../TopBar/TopBar'
import ObsidianWindow from '../ObsidianWindow/ObsidianWindow'
import ResumePdfWindow from '../ResumePdfWindow/ResumePdfWindow'
import FolderWindow from '../FolderWindow/FolderWindow'
import ImageViewerWindow from '../ImageViewerWindow/ImageViewerWindow'
import VsCodeWindow from '../VsCodeWindow/VsCodeWindow'
import SettingsWindow from '../SettingsWindow/SettingsWindow'
import TerminalWindow from '../TerminalWindow/TerminalWindow'
import { DESKTOP_ITEMS } from '../../data/desktopItems'
import { WALLPAPERS, DEFAULT_WALLPAPER_ID } from '../../data/wallpapers'

const WINDOW_APP_NAMES = {
  obsidian: 'Obsidian',
  pdf: 'Finder',
  finder: 'Finder',
  image: 'Preview',
  vscode: 'Visual Studio Code',
  settings: 'System Settings',
  terminal: 'Terminal',
}

const Desktop = () => {
  const [selectedId, setSelectedId] = useState(null)
  const [obsidianOpen, setObsidianOpen] = useState(true)
  const [pdfOpen, setPdfOpen] = useState(true)
  const [finderOpen, setFinderOpen] = useState(false)
  const [finderFolder, setFinderFolder] = useState('Desktop')
  const [imageViewer, setImageViewer] = useState(null)
  const [vscodeOpen, setVscodeOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [wallpaperId, setWallpaperId] = useState(DEFAULT_WALLPAPER_ID)
  const [zIndexes, setZIndexes] = useState({
    obsidian: 20,
    pdf: 21,
    finder: 22,
    image: 23,
    vscode: 24,
    settings: 25,
    terminal: 26,
  })
  const [nextZIndex, setNextZIndex] = useState(27)
  const [activeApp, setActiveApp] = useState('Finder')

  const wallpaper = WALLPAPERS.find((item) => item.id === wallpaperId)?.src

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
    <div
      className="relative h-dvh w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${wallpaper})` }}
      onClick={() => {
        setSelectedId(null)
        setActiveApp('Finder')
      }}
    >
      <TopBar activeApp={activeApp} />

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
        <ObsidianWindow
          onClose={() => setObsidianOpen(false)}
          zIndex={zIndexes.obsidian}
          onFocus={() => bringToFront('obsidian')}
        />
      )}
      {pdfOpen && (
        <ResumePdfWindow
          onClose={() => setPdfOpen(false)}
          zIndex={zIndexes.pdf}
          onFocus={() => bringToFront('pdf')}
        />
      )}
      {finderOpen && (
        <FolderWindow
          folderName={finderFolder}
          onClose={() => setFinderOpen(false)}
          zIndex={zIndexes.finder}
          onFocus={() => bringToFront('finder')}
          onOpenItem={handleDesktopItemOpen}
        />
      )}
      {imageViewer && (
        <ImageViewerWindow
          src={imageViewer.src}
          title={imageViewer.title}
          onClose={() => setImageViewer(null)}
          zIndex={zIndexes.image}
          onFocus={() => bringToFront('image')}
        />
      )}
      {vscodeOpen && (
        <VsCodeWindow
          onClose={() => setVscodeOpen(false)}
          zIndex={zIndexes.vscode}
          onFocus={() => bringToFront('vscode')}
        />
      )}
      {settingsOpen && (
        <SettingsWindow
          onClose={() => setSettingsOpen(false)}
          zIndex={zIndexes.settings}
          onFocus={() => bringToFront('settings')}
          wallpaperId={wallpaperId}
          onSelectWallpaper={setWallpaperId}
        />
      )}
      {terminalOpen && (
        <TerminalWindow
          onClose={() => setTerminalOpen(false)}
          zIndex={zIndexes.terminal}
          onFocus={() => bringToFront('terminal')}
        />
      )}

      <Dock
        onAppClick={handleDockAppClick}
        extraRunningIds={[
          ...(obsidianOpen ? ['obsidian'] : []),
          ...(finderOpen ? ['finder'] : []),
          ...(vscodeOpen ? ['vscode'] : []),
          ...(settingsOpen ? ['settings'] : []),
          ...(terminalOpen ? ['terminal'] : []),
        ]}
      />
    </div>
  )
}

export default Desktop
