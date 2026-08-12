import { useState } from 'react'
import { VAULT } from './vaultData'
import { renderMarkdown } from './markdown'

const MIN_WIDTH = 420
const MIN_HEIGHT = 280
const TOPBAR_HEIGHT = 26
const DEFAULT_SIZE_RATIO = 0.6
const HORIZONTAL_BIAS = 0.35 // 0.5 = centered; lower = shifted toward the left edge

function getDefaultSize() {
  return {
    width: Math.max(MIN_WIDTH, Math.round(window.innerWidth * DEFAULT_SIZE_RATIO)),
    height: Math.max(MIN_HEIGHT, Math.round(window.innerHeight * DEFAULT_SIZE_RATIO)),
  }
}

function getDefaultPosition(size) {
  return {
    x: Math.round((window.innerWidth - size.width) * HORIZONTAL_BIAS),
    y: Math.max(TOPBAR_HEIGHT, Math.round((window.innerHeight - size.height) / 2)),
  }
}

const RESIZE_HANDLES = [
  { dir: 'n', className: 'inset-x-2 top-0 h-1.5 cursor-ns-resize' },
  { dir: 's', className: 'inset-x-2 bottom-0 h-1.5 cursor-ns-resize' },
  { dir: 'w', className: 'inset-y-2 left-0 w-1.5 cursor-ew-resize' },
  { dir: 'e', className: 'inset-y-2 right-0 w-1.5 cursor-ew-resize' },
  { dir: 'nw', className: 'left-0 top-0 h-3 w-3 cursor-nwse-resize' },
  { dir: 'se', className: 'bottom-0 right-0 h-3 w-3 cursor-nwse-resize' },
  { dir: 'ne', className: 'right-0 top-0 h-3 w-3 cursor-nesw-resize' },
  { dir: 'sw', className: 'bottom-0 left-0 h-3 w-3 cursor-nesw-resize' },
]

function ObsidianWindow({ onClose }) {
  const [size, setSize] = useState(getDefaultSize)
  const [pos, setPos] = useState(() => getDefaultPosition(getDefaultSize()))
  const [expandedIds, setExpandedIds] = useState(() => new Set(VAULT.map((topic) => topic.id)))
  const [selectedId, setSelectedId] = useState(VAULT[0].children[0].id)

  const toggleTopic = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectedNote = VAULT.flatMap((topic) => topic.children).find(
    (note) => note.id === selectedId,
  )

  const handleTitleBarMouseDown = (event) => {
    if (event.button !== 0 || event.target.closest('button')) return
    const startX = event.clientX
    const startY = event.clientY
    const startPos = pos

    const handleMove = (moveEvent) => {
      const nextX = startPos.x + (moveEvent.clientX - startX)
      const nextY = startPos.y + (moveEvent.clientY - startY)
      setPos({
        x: Math.min(Math.max(nextX, -size.width + 160), window.innerWidth - 160),
        y: Math.min(Math.max(nextY, TOPBAR_HEIGHT), window.innerHeight - 60),
      })
    }

    const handleUp = () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
  }

  const handleResizeMouseDown = (direction) => (event) => {
    event.stopPropagation()
    event.preventDefault()
    const startX = event.clientX
    const startY = event.clientY
    const startSize = size
    const startPos = pos

    const handleMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX
      const dy = moveEvent.clientY - startY
      let nextWidth = startSize.width
      let nextHeight = startSize.height
      let nextX = startPos.x
      let nextY = startPos.y

      if (direction.includes('e')) {
        nextWidth = Math.max(MIN_WIDTH, startSize.width + dx)
      }
      if (direction.includes('s')) {
        nextHeight = Math.max(MIN_HEIGHT, startSize.height + dy)
      }
      if (direction.includes('w')) {
        nextWidth = Math.max(MIN_WIDTH, startSize.width - dx)
        nextX = startPos.x + (startSize.width - nextWidth)
      }
      if (direction.includes('n')) {
        nextHeight = Math.max(MIN_HEIGHT, startSize.height - dy)
        nextY = startPos.y + (startSize.height - nextHeight)
      }

      setSize({ width: nextWidth, height: nextHeight })
      setPos({ x: nextX, y: nextY })
    }

    const handleUp = () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
  }

  return (
    <div
      className="absolute z-20 flex flex-col overflow-hidden rounded-xl border border-black/40 bg-[#1e1e1e] text-[#dcdcdc] shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
      style={{ left: pos.x, top: pos.y, width: size.width, height: size.height }}
      onClick={(event) => event.stopPropagation()}
    >
      <div
        className="flex h-9 shrink-0 cursor-grab items-center border-b border-black/50 bg-[#2a2a2a] px-3 active:cursor-grabbing"
        onMouseDown={handleTitleBarMouseDown}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-3 w-3 rounded-full bg-[#ff5f57] hover:brightness-90"
            aria-label="Close"
          />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 select-none text-center text-xs font-medium text-white/60">
          Obsidian
        </div>
        <div className="w-14" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-44 shrink-0 overflow-y-auto border-r border-black/40 bg-[#181818] p-2 text-[13px]">
          {VAULT.map((topic) => {
            const isExpanded = expandedIds.has(topic.id)
            return (
              <div key={topic.id} className="mb-0.5">
                <button
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className="flex w-full items-center gap-1 rounded px-1.5 py-1 text-left text-white/70 hover:bg-white/5"
                >
                  <svg
                    viewBox="0 0 10 10"
                    className={`h-2.5 w-2.5 shrink-0 transition-transform ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                    aria-hidden="true"
                  >
                    <path d="M2 1l5 4-5 4z" fill="currentColor" />
                  </svg>
                  <span className="truncate font-medium">{topic.label}</span>
                </button>
                {isExpanded && (
                  <div className="ml-3.5 border-l border-white/10 pl-2">
                    {topic.children.map((note) => (
                      <button
                        key={note.id}
                        type="button"
                        onClick={() => setSelectedId(note.id)}
                        className={`block w-full truncate rounded px-1.5 py-1 text-left ${
                          selectedId === note.id
                            ? 'bg-[#7c3aed]/25 text-white'
                            : 'text-white/60 hover:bg-white/5 hover:text-white/85'
                        }`}
                      >
                        {note.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="flex-1 overflow-y-auto bg-[#1e1e1e] px-8 py-6 text-[15px]">
          {selectedNote ? (
            renderMarkdown(selectedNote.content)
          ) : (
            <p className="text-white/40">Select a note to preview it here.</p>
          )}
        </div>
      </div>

      {RESIZE_HANDLES.map(({ dir, className }) => (
        <div
          key={dir}
          className={`absolute ${className}`}
          onMouseDown={handleResizeMouseDown(dir)}
        />
      ))}
    </div>
  )
}

export default ObsidianWindow
