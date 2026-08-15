import { useState } from 'react'
import DesktopIcon from '../DesktopIcon/DesktopIcon'
import Dock from '../Dock/Dock'
import TopBar from '../TopBar/TopBar'
import ObsidianWindow from '../ObsidianWindow/ObsidianWindow'
import PdfViewerWindow from '../PdfViewerWindow/PdfViewerWindow'
import wallpaper from '../../assets/images/desktopWallpaperDefault.jpg'

const DESKTOP_ITEMS = [
  { id: 'projects', label: 'Projects', type: 'folder' },
  { id: 'documents', label: 'Documents', type: 'folder' },
  { id: 'screenshot', label: 'Screenshot.png', type: 'image' },
  { id: 'resume', label: 'Resume.pdf', type: 'pdf' },
]

const WINDOW_APP_NAMES = { obsidian: 'Obsidian', pdf: 'Finder' }

function Desktop() {
  const [selectedId, setSelectedId] = useState(null)
  const [obsidianOpen, setObsidianOpen] = useState(true)
  const [pdfOpen, setPdfOpen] = useState(true)
  const [zIndexes, setZIndexes] = useState({ obsidian: 20, pdf: 21 })
  const [nextZIndex, setNextZIndex] = useState(22)
  const [activeApp, setActiveApp] = useState('Finder')

  const bringToFront = (windowId) => {
    setZIndexes((prev) => ({ ...prev, [windowId]: nextZIndex }))
    setNextZIndex((z) => z + 1)
    setActiveApp(WINDOW_APP_NAMES[windowId] ?? 'Finder')
  }

  const handleDockAppClick = (appId) => {
    if (appId === 'obsidian') {
      setObsidianOpen(true)
      bringToFront('obsidian')
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
              if (item.type === 'pdf') {
                setPdfOpen(true)
                bringToFront('pdf')
              }
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

      <Dock
        onAppClick={handleDockAppClick}
        extraRunningIds={obsidianOpen ? ['obsidian'] : []}
      />
    </div>
  )
}

export default Desktop
