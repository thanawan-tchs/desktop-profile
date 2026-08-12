import { useRef, useState } from 'react'
import claudeIcon from '../../assets/claude-ai-icon.webp'

const DOCK_APPS = [
  { id: 'finder', label: 'Finder' },
  { id: 'launchpad', label: 'Launchpad' },
  { id: 'safari', label: 'Safari' },
  { id: 'notes', label: 'Notes' },
  { id: 'obsidian', label: 'Obsidian' },
  { id: 'claude', label: 'Claude' },
  { id: 'settings', label: 'System Settings' },
  { id: 'folder', label: 'Downloads' },
  { id: 'trash', label: 'Trash' },
]

const RUNNING_APPS = new Set(['finder', 'safari', 'notes'])

const GLYPH_CLASS = 'block h-full w-full drop-shadow-[0_3px_3px_rgba(0,0,0,0.25)]'

function DockGlyph({ id }) {
  switch (id) {
    case 'finder':
      return (
        <svg viewBox="0 0 44 44" className={GLYPH_CLASS} aria-hidden="true">
          <rect width="44" height="44" rx="11" fill="#3fa9ff" />
          <circle cx="16" cy="19" r="3.2" fill="#0b2f52" />
          <circle cx="28" cy="19" r="3.2" fill="#0b2f52" />
          <path
            d="M12 27c4.5 6 15.5 6 20 0"
            stroke="#0b2f52"
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'launchpad':
      return (
        <svg viewBox="0 0 44 44" className={GLYPH_CLASS} aria-hidden="true">
          <rect width="44" height="44" rx="11" fill="#2b2b33" />
          {[12, 22, 32].flatMap((cx) =>
            [12, 22, 32].map((cy) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.6" fill="#d9d9de" />
            )),
          )}
        </svg>
      )
    case 'safari':
      return (
        <svg viewBox="0 0 44 44" className={GLYPH_CLASS} aria-hidden="true">
          <circle cx="22" cy="22" r="20" fill="#e7eef5" stroke="#9db4c7" />
          <path d="M22 8l4 14-4 14-4-14z" fill="#ff5b4d" />
          <path d="M22 8l-4 14 4 14 4-14z" fill="#e9e9ee" />
        </svg>
      )
    case 'notes':
      return (
        <svg viewBox="0 0 44 44" className={GLYPH_CLASS} aria-hidden="true">
          <rect width="44" height="44" rx="11" fill="#ffcf3f" />
          <rect x="10" y="12" width="24" height="4" rx="2" fill="#8a6d00" opacity="0.55" />
          <rect x="10" y="20" width="24" height="4" rx="2" fill="#8a6d00" opacity="0.4" />
          <rect x="10" y="28" width="16" height="4" rx="2" fill="#8a6d00" opacity="0.3" />
        </svg>
      )
    case 'settings':
      return (
        <svg viewBox="0 0 44 44" className={GLYPH_CLASS} aria-hidden="true">
          <rect width="44" height="44" rx="11" fill="#8e8e96" />
          <line x1="9" y1="15" x2="35" y2="15" stroke="#e8e8ec" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="27" cy="15" r="3.4" fill="#e8e8ec" />
          <line x1="9" y1="22" x2="35" y2="22" stroke="#e8e8ec" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="17" cy="22" r="3.4" fill="#e8e8ec" />
          <line x1="9" y1="29" x2="35" y2="29" stroke="#e8e8ec" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="24" cy="29" r="3.4" fill="#e8e8ec" />
        </svg>
      )
    case 'trash':
      return (
        <svg viewBox="0 0 44 44" className={GLYPH_CLASS} aria-hidden="true">
          <rect width="44" height="44" rx="11" fill="#c7ccd4" />
          <path
            d="M14 16h16l-1.4 17a2 2 0 0 1-2 1.8H17.4a2 2 0 0 1-2-1.8z"
            fill="#fff"
            stroke="#8b909a"
            strokeWidth="1.2"
          />
          <path
            d="M12 13h20M18 13V10.6A1.6 1.6 0 0 1 19.6 9h4.8A1.6 1.6 0 0 1 26 10.6V13"
            stroke="#8b909a"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'obsidian':
      return (
        <svg viewBox="0 0 44 44" className={GLYPH_CLASS} aria-hidden="true">
          <rect width="44" height="44" rx="11" fill="#2b2b31" />
          <polygon points="22,8 32,17 22,22" fill="#a78bfa" />
          <polygon points="12,17 22,8 22,22" fill="#7c3aed" />
          <polygon points="12,17 22,22 22,36" fill="#6d28d9" />
          <polygon points="32,17 22,22 22,36" fill="#7c3aed" />
        </svg>
      )
    case 'claude':
      return (
        <img
          src={claudeIcon}
          alt=""
          className={`${GLYPH_CLASS} rounded-[12px] object-cover`}
        />
      )
    case 'folder':
    default:
      return (
        <svg viewBox="0 0 44 44" className={GLYPH_CLASS} aria-hidden="true">
          <rect width="44" height="44" rx="11" fill="#eef3f8" />
          <path
            d="M8 15a2.4 2.4 0 0 1 2.4-2.4h7l3.2 3.2H33.6A2.4 2.4 0 0 1 36 18.2V31a2.4 2.4 0 0 1-2.4 2.4H10.4A2.4 2.4 0 0 1 8 31z"
            fill="#8fc4ff"
          />
          <path d="M8 19h28v12a2.4 2.4 0 0 1-2.4 2.4H10.4A2.4 2.4 0 0 1 8 31z" fill="#5aa7ff" />
        </svg>
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
