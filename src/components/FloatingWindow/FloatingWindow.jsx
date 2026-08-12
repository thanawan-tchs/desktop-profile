import { useState } from 'react'

const TOPBAR_HEIGHT = 26
const VIEWPORT_MARGIN = 16
const DOCK_CLEARANCE = 84

function getDefaultSize({ widthRatio, heightRatio, minWidth, minHeight }) {
  const maxWidth = window.innerWidth - VIEWPORT_MARGIN
  const maxHeight = window.innerHeight - TOPBAR_HEIGHT - DOCK_CLEARANCE
  const width = Math.min(maxWidth, Math.max(minWidth, Math.round(window.innerWidth * widthRatio)))
  const height = Math.min(maxHeight, Math.max(minHeight, Math.round(window.innerHeight * heightRatio)))
  return {
    width: Math.max(200, width),
    height: Math.max(160, height),
  }
}

function getDefaultPosition(size, horizontalBias, verticalBias) {
  const x = Math.round((window.innerWidth - size.width) * horizontalBias)
  const y = Math.round((window.innerHeight - size.height) * verticalBias)
  return {
    x: Math.min(Math.max(x, 0), Math.max(0, window.innerWidth - size.width)),
    y: Math.min(
      Math.max(y, TOPBAR_HEIGHT),
      Math.max(TOPBAR_HEIGHT, window.innerHeight - size.height - 8),
    ),
  }
}

const RESIZE_HANDLES = [
  { dir: 'n', className: 'inset-x-2 top-0 h-3 cursor-ns-resize touch-none md:h-1.5' },
  { dir: 's', className: 'inset-x-2 bottom-0 h-3 cursor-ns-resize touch-none md:h-1.5' },
  { dir: 'w', className: 'inset-y-2 left-0 w-3 cursor-ew-resize touch-none md:w-1.5' },
  { dir: 'e', className: 'inset-y-2 right-0 w-3 cursor-ew-resize touch-none md:w-1.5' },
  { dir: 'nw', className: 'left-0 top-0 h-5 w-5 cursor-nwse-resize touch-none md:h-3 md:w-3' },
  { dir: 'se', className: 'bottom-0 right-0 h-5 w-5 cursor-nwse-resize touch-none md:h-3 md:w-3' },
  { dir: 'ne', className: 'right-0 top-0 h-5 w-5 cursor-nesw-resize touch-none md:h-3 md:w-3' },
  { dir: 'sw', className: 'bottom-0 left-0 h-5 w-5 cursor-nesw-resize touch-none md:h-3 md:w-3' },
]

function FloatingWindow({
  title,
  onClose,
  children,
  widthRatio = 0.6,
  heightRatio = 0.6,
  horizontalBias = 0.5,
  verticalBias = 0.5,
  minWidth = 420,
  minHeight = 280,
  zIndex = 20,
  onFocus,
  headerRight,
  theme = 'dark',
}) {
  const isLight = theme === 'light'
  const sizeConfig = { widthRatio, heightRatio, minWidth, minHeight }
  const [size, setSize] = useState(() => getDefaultSize(sizeConfig))
  const [pos, setPos] = useState(() =>
    getDefaultPosition(getDefaultSize(sizeConfig), horizontalBias, verticalBias),
  )

  const handleTitleBarPointerDown = (event) => {
    if (event.button !== 0 || event.target.closest('button')) return
    const el = event.currentTarget
    el.setPointerCapture(event.pointerId)
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

    const handleUp = (upEvent) => {
      el.releasePointerCapture(upEvent.pointerId)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
  }

  const handleResizePointerDown = (direction) => (event) => {
    event.stopPropagation()
    event.preventDefault()
    const el = event.currentTarget
    el.setPointerCapture(event.pointerId)
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
        nextWidth = Math.max(minWidth, startSize.width + dx)
      }
      if (direction.includes('s')) {
        nextHeight = Math.max(minHeight, startSize.height + dy)
      }
      if (direction.includes('w')) {
        nextWidth = Math.max(minWidth, startSize.width - dx)
        nextX = startPos.x + (startSize.width - nextWidth)
      }
      if (direction.includes('n')) {
        nextHeight = Math.max(minHeight, startSize.height - dy)
        nextY = startPos.y + (startSize.height - nextHeight)
      }

      setSize({ width: nextWidth, height: nextHeight })
      setPos({ x: nextX, y: nextY })
    }

    const handleUp = (upEvent) => {
      el.releasePointerCapture(upEvent.pointerId)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
  }

  return (
    <div
      className={`absolute flex flex-col overflow-hidden rounded-xl border shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${
        isLight ? 'border-black/10 bg-white text-[#2a2a2a]' : 'border-black/40 bg-[#1e1e1e] text-[#dcdcdc]'
      }`}
      style={{ left: pos.x, top: pos.y, width: size.width, height: size.height, zIndex }}
      onClick={(event) => event.stopPropagation()}
      onPointerDownCapture={() => onFocus?.()}
    >
      <div
        className={`flex h-9 shrink-0 cursor-grab touch-none items-center border-b px-3 active:cursor-grabbing ${
          isLight ? 'border-black/10 bg-[#e8e8e8]' : 'border-black/50 bg-[#2a2a2a]'
        }`}
        onPointerDown={handleTitleBarPointerDown}
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
        <div
          className={`flex-1 select-none text-center text-xs font-medium ${
            isLight ? 'text-black/60' : 'text-white/60'
          }`}
        >
          {title}
        </div>
        <div className="flex w-14 items-center justify-end">{headerRight}</div>
      </div>

      <div className="flex flex-1 overflow-hidden">{children}</div>

      {RESIZE_HANDLES.map(({ dir, className }) => (
        <div
          key={dir}
          className={`absolute ${className}`}
          onPointerDown={handleResizePointerDown(dir)}
        />
      ))}
    </div>
  )
}

export default FloatingWindow
