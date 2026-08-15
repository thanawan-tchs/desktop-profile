import { useRef, useState } from 'react'
import claudeIcon from '../../assets/icons/claude-ai-icon.webp'
import vscodeIcon from '../../assets/icons/vscode-logo.png'
import terminalIcon from '../../assets/icons/terminal-logo.jpeg'
import folderIcon from '../../assets/icons/folder-logo.png'
import {
  DockFinderIcon,
  DockLaunchpadIcon,
  DockNotesIcon,
  DockObsidianIcon,
  DockSettingsIcon,
  DockTrashIcon,
} from '../icons'

const DOCK_APPS = [
  { id: 'finder', label: 'Finder' },
  { id: 'launchpad', label: 'Launchpad' },
  { id: 'settings', label: 'System Settings' },
  { id: 'notes', label: 'Notes' },
  { id: 'obsidian', label: 'Obsidian' },
  { id: 'vscode', label: 'Visual Studio Code' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'claude', label: 'Claude' },
  { id: 'folder', label: 'Downloads' },
  { id: 'trash', label: 'Trash' },
]

const RUNNING_APPS = new Set(['finder', 'safari', 'notes'])

const GLYPH_CLASS = 'block h-full w-full drop-shadow-[0_3px_3px_rgba(0,0,0,0.25)]'

function DockGlyph({ id }) {
  switch (id) {
    case 'finder':
      return <DockFinderIcon className={GLYPH_CLASS} />
    case 'launchpad':
      return <DockLaunchpadIcon className={GLYPH_CLASS} />
    case 'notes':
      return <DockNotesIcon className={GLYPH_CLASS} />
    case 'settings':
      return <DockSettingsIcon className={GLYPH_CLASS} />
    case 'trash':
      return <DockTrashIcon className={GLYPH_CLASS} />
    case 'obsidian':
      return <DockObsidianIcon className={GLYPH_CLASS} />
    case 'claude':
      return (
        <img
          src={claudeIcon}
          alt=""
          className={`${GLYPH_CLASS} rounded-[12px] object-cover`}
        />
      )
    case 'vscode':
      return (
        <img
          src={vscodeIcon}
          alt=""
          className={`${GLYPH_CLASS} rounded-[12px] object-cover`}
        />
      )
    case 'terminal':
      return (
        <img
          src={terminalIcon}
          alt=""
          className={`${GLYPH_CLASS} rounded-[12px] object-cover`}
        />
      )
    case 'folder':
    default:
      return (
        <img
          src={folderIcon}
          alt=""
          className={`${GLYPH_CLASS} rounded-[12px] object-cover`}
        />
      )
  }
}

const MAGNIFY_RADIUS = 90
const MAX_SCALE = 1.7

function Dock({ onAppClick, extraRunningIds = [] }) {
  const dockRef = useRef(null)
  const [hoverX, setHoverX] = useState(null)

  const handleMouseMove = (event) => {
    const rect = dockRef.current.getBoundingClientRect()
    setHoverX(event.clientX - rect.left)
  }

  const handleMouseLeave = () => setHoverX(null)

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-2.5 z-[999] flex justify-center">
      <div
        className="pointer-events-auto flex items-end gap-2.5 rounded-[20px] border border-white/30 bg-white/25 px-2.5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-[20px] backdrop-saturate-[1.8]"
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {DOCK_APPS.map((app, index) => {
          let scale = 1
          if (hoverX !== null && dockRef.current) {
            const itemWidth = dockRef.current.offsetWidth / DOCK_APPS.length
            const itemCenter = itemWidth * index + itemWidth / 2
            const distance = Math.abs(hoverX - itemCenter)
            scale =
              distance < MAGNIFY_RADIUS
                ? 1 + (MAX_SCALE - 1) * (1 - distance / MAGNIFY_RADIUS)
                : 1
          }
          return (
            <button
              key={app.id}
              type="button"
              className="relative h-12 w-12 origin-bottom cursor-default border-0 bg-transparent p-0 transition-transform duration-[120ms] ease-out"
              style={{ transform: `scale(${scale})` }}
              title={app.label}
              onClick={() => onAppClick?.(app.id)}
            >
              <DockGlyph id={app.id} />
              {(RUNNING_APPS.has(app.id) || extraRunningIds.includes(app.id)) && (
                <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#3a3a3c]" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Dock
