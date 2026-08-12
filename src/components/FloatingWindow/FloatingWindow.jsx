import { useState } from 'react'

const TOPBAR_HEIGHT = 26

function getDefaultSize({ widthRatio, heightRatio, minWidth, minHeight }) {
  return {
    width: Math.max(minWidth, Math.round(window.innerWidth * widthRatio)),
    height: Math.max(minHeight, Math.round(window.innerHeight * heightRatio)),
  }
}

function getDefaultPosition(size, horizontalBias, verticalBias) {
  return {
    x: Math.round((window.innerWidth - size.width) * horizontalBias),
    y: Math.max(
      TOPBAR_HEIGHT,
      Math.round((window.innerHeight - size.height) * verticalBias),
    ),
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
}) {
  const sizeConfig = { widthRatio, heightRatio, minWidth, minHeight }
  const [size, setSize] = useState(() => getDefaultSize(sizeConfig))
  const [pos, setPos] = useState(() =>
    getDefaultPosition(getDefaultSize(sizeConfig), horizontalBias, verticalBias),
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

    const handleUp = () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
  }

  return (
    <div
      className="absolute flex flex-col overflow-hidden rounded-xl border border-black/40 bg-[#1e1e1e] text-[#dcdcdc] shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
      style={{ left: pos.x, top: pos.y, width: size.width, height: size.height, zIndex }}
      onClick={(event) => event.stopPropagation()}
      onMouseDownCapture={() => onFocus?.()}
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
          {title}
        </div>
        <div className="w-14" />
      </div>

      <div className="flex flex-1 overflow-hidden">{children}</div>

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

export default FloatingWindow
