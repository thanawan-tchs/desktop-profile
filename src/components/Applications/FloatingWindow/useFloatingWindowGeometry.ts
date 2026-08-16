import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { useFullscreen } from '../../../context/FullscreenContext'

export const TOPBAR_HEIGHT = 26
const VIEWPORT_MARGIN = 16
const DOCK_CLEARANCE = 84

export type Size = { width: number; height: number }
export type Position = { x: number; y: number }
export type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'nw' | 'ne' | 'sw' | 'se'
type SizeConfig = { widthRatio: number; heightRatio: number; minWidth: number; minHeight: number }

const getDefaultSize = ({ widthRatio, heightRatio, minWidth, minHeight }: SizeConfig): Size => {
  const maxWidth = window.innerWidth - VIEWPORT_MARGIN
  const maxHeight = window.innerHeight - TOPBAR_HEIGHT - DOCK_CLEARANCE
  const width = Math.min(maxWidth, Math.max(minWidth, Math.round(window.innerWidth * widthRatio)))
  const height = Math.min(maxHeight, Math.max(minHeight, Math.round(window.innerHeight * heightRatio)))
  return {
    width: Math.max(200, width),
    height: Math.max(160, height),
  }
}

const getDefaultPosition = (size: Size, horizontalBias: number, verticalBias: number): Position => {
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

// Shared drag lifecycle for the titlebar and resize handles: captures the pointer,
// forwards moves to the caller, and tears down listeners on release.
const startPointerDrag = (event: ReactPointerEvent<HTMLElement>, onMove: (moveEvent: PointerEvent) => void) => {
  const el = event.currentTarget
  el.setPointerCapture(event.pointerId)

  const handleMove = (moveEvent: PointerEvent) => onMove(moveEvent)
  const handleUp = (upEvent: PointerEvent) => {
    el.releasePointerCapture(upEvent.pointerId)
    window.removeEventListener('pointermove', handleMove)
    window.removeEventListener('pointerup', handleUp)
  }

  window.addEventListener('pointermove', handleMove)
  window.addEventListener('pointerup', handleUp)
}

type UseFloatingWindowGeometryArgs = SizeConfig & { horizontalBias: number; verticalBias: number }

// Owns everything about where and how big the window is: initial placement,
// dragging by the titlebar, resizing from any edge/corner, and the fullscreen
// toggle (which snapshots the pre-fullscreen size/position to restore later).
export const useFloatingWindowGeometry = ({
  widthRatio,
  heightRatio,
  minWidth,
  minHeight,
  horizontalBias,
  verticalBias,
}: UseFloatingWindowGeometryArgs) => {
  const sizeConfig = { widthRatio, heightRatio, minWidth, minHeight }
  const [size, setSize] = useState(() => getDefaultSize(sizeConfig))
  const [pos, setPos] = useState(() =>
    getDefaultPosition(getDefaultSize(sizeConfig), horizontalBias, verticalBias),
  )
  const [isFullscreen, setIsFullscreen] = useState(false)
  const fullscreenSnapshotRef = useRef<{ size: Size; pos: Position } | null>(null)
  const isFullscreenRef = useRef(false)
  const { chromeVisible, setChromeVisible, registerFullscreen } = useFullscreen()

  useEffect(() => {
    isFullscreenRef.current = isFullscreen
  }, [isFullscreen])

  useEffect(() => {
    return () => {
      if (isFullscreenRef.current) registerFullscreen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleFullscreen = () => {
    const next = !isFullscreen
    if (next) {
      fullscreenSnapshotRef.current = { size, pos }
    } else if (fullscreenSnapshotRef.current) {
      setSize(fullscreenSnapshotRef.current.size)
      setPos(fullscreenSnapshotRef.current.pos)
    }
    setIsFullscreen(next)
    setChromeVisible(false)
    registerFullscreen(next)
  }

  const handleTitleBarPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest('button')) return
    const startX = event.clientX
    const startY = event.clientY
    const startPos = pos

    startPointerDrag(event, (moveEvent) => {
      const nextX = startPos.x + (moveEvent.clientX - startX)
      const nextY = startPos.y + (moveEvent.clientY - startY)
      setPos({
        x: Math.min(Math.max(nextX, -size.width + 160), window.innerWidth - 160),
        y: Math.min(Math.max(nextY, TOPBAR_HEIGHT), window.innerHeight - 60),
      })
    })
  }

  const handleResizePointerDown = (direction: ResizeDirection) => (event: ReactPointerEvent<HTMLElement>) => {
    event.stopPropagation()
    event.preventDefault()
    const startX = event.clientX
    const startY = event.clientY
    const startSize = size
    const startPos = pos

    startPointerDrag(event, (moveEvent) => {
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
    })
  }

  return {
    size,
    pos,
    isFullscreen,
    chromeVisible,
    setChromeVisible,
    toggleFullscreen,
    handleTitleBarPointerDown,
    handleResizePointerDown,
  }
}
