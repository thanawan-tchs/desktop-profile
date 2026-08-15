import { useRef, useState } from 'react'
import claudeIcon from '../../../assets/icons/claude-ai-icon.webp'
import vscodeIcon from '../../../assets/icons/vscode-logo.png'
import terminalIcon from '../../../assets/icons/terminal-logo.jpeg'
import folderIcon from '../../../assets/icons/folder-logo.png'
import chromeIcon from '../../../assets/icons/google-chrome-logo.svg'
import { Icon, ICON_NAMES } from '../../Common/Icons'
import { APP_IDS } from '../../../data/appIds'

const DOCK_APPS = [
  { id: APP_IDS.FINDER, label: 'Finder' },
  { id: APP_IDS.LAUNCHPAD, label: 'Launchpad' },
  { id: APP_IDS.CHROME, label: 'Google Chrome' },
  { id: APP_IDS.SETTINGS, label: 'System Settings' },
  { id: APP_IDS.NOTES, label: 'Notes' },
  { id: APP_IDS.OBSIDIAN, label: 'Obsidian' },
  { id: APP_IDS.VSCODE, label: 'Visual Studio Code' },
  { id: APP_IDS.TERMINAL, label: 'Terminal' },
  { id: APP_IDS.CLAUDE, label: 'Claude' },
  { id: APP_IDS.FOLDER, label: 'Downloads' },
  { id: APP_IDS.TRASH, label: 'Trash' },
]

const RUNNING_APPS = new Set([APP_IDS.FINDER, APP_IDS.NOTES])

const GLYPH_CLASS = 'block h-full w-full drop-shadow-[0_3px_3px_rgba(0,0,0,0.25)]'

const DockGlyph = ({ id }) => {
  switch (id) {
    case APP_IDS.FINDER:
      return <Icon name={ICON_NAMES.DOCK_FINDER} className={GLYPH_CLASS} />
    case APP_IDS.LAUNCHPAD:
      return <Icon name={ICON_NAMES.DOCK_LAUNCHPAD} className={GLYPH_CLASS} />
    case APP_IDS.NOTES:
      return <Icon name={ICON_NAMES.DOCK_NOTES} className={GLYPH_CLASS} />
    case APP_IDS.SETTINGS:
      return <Icon name={ICON_NAMES.DOCK_SETTINGS} className={GLYPH_CLASS} />
    case APP_IDS.TRASH:
      return <Icon name={ICON_NAMES.DOCK_TRASH} className={GLYPH_CLASS} />
    case APP_IDS.OBSIDIAN:
      return <Icon name={ICON_NAMES.DOCK_OBSIDIAN} className={GLYPH_CLASS} />
    case APP_IDS.CHROME:
      return (
        <img
          src={chromeIcon}
          alt=""
          className={`${GLYPH_CLASS} rounded-[12px] bg-white`}
        />
      )
    case APP_IDS.CLAUDE:
      return (
        <img
          src={claudeIcon}
          alt=""
          className={`${GLYPH_CLASS} rounded-[12px] object-cover`}
        />
      )
    case APP_IDS.VSCODE:
      return (
        <img
          src={vscodeIcon}
          alt=""
          className={`${GLYPH_CLASS} rounded-[12px] object-cover`}
        />
      )
    case APP_IDS.TERMINAL:
      return (
        <img
          src={terminalIcon}
          alt=""
          className={`${GLYPH_CLASS} rounded-[12px] object-cover`}
        />
      )
    case APP_IDS.FOLDER:
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

const Dock = ({ onAppClick, extraRunningIds = [] }) => {
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
