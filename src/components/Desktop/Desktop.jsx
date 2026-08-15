import { useState } from 'react'
import DesktopIcon from '../DesktopIcon/DesktopIcon'
import Dock from '../Dock/Dock'
import TopBar from '../TopBar/TopBar'
import ObsidianWindow from '../ObsidianWindow/ObsidianWindow'
import PdfViewerWindow from '../PdfViewerWindow/PdfViewerWindow'
import FolderWindow from '../FolderWindow/FolderWindow'
import { DESKTOP_ITEMS } from '../../data/desktopItems'
import wallpaper from '../../assets/images/desktopWallpaperDefault.jpg'

const WINDOW_APP_NAMES = { obsidian: 'Obsidian', pdf: 'Finder', finder: 'Finder' }

function Desktop() {
  const [selectedId, setSelectedId] = useState(null)
  const [obsidianOpen, setObsidianOpen] = useState(true)
  const [pdfOpen, setPdfOpen] = useState(true)
  const [finderOpen, setFinderOpen] = useState(false)
  const [finderFolder, setFinderFolder] = useState('Desktop')
  const [zIndexes, setZIndexes] = useState({ obsidian: 20, pdf: 21, finder: 22 })
  const [nextZIndex, setNextZIndex] = useState(23)
  const [activeApp, setActiveApp] = useState('Finder')

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
  }

  const handleDesktopItemOpen = (item) => {
    if (item.type === 'pdf') {
      setPdfOpen(true)
      bringToFront('pdf')
    } else if (item.type === 'folder') {
      openFinder(item.label)
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
        <PdfViewerWindow
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

      <Dock
        onAppClick={handleDockAppClick}
        extraRunningIds={[
          ...(obsidianOpen ? ['obsidian'] : []),
          ...(finderOpen ? ['finder'] : []),
        ]}
      />
    </div>
  )
}

export default Desktop
