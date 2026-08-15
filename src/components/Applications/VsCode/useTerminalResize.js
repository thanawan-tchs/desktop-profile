import { useState } from 'react'

// Drag-to-resize for the terminal panel, mirroring FloatingWindow's own
// edge-resize handles (pointer capture + window-level move/up listeners).
export const useTerminalResize = ({ initialHeight, minHeight, maxHeight }) => {
  const [height, setHeight] = useState(initialHeight)

  const handleResizePointerDown = (event) => {
    event.preventDefault()
    const el = event.currentTarget
    el.setPointerCapture(event.pointerId)
    const startY = event.clientY
    const startHeight = height

    const handleMove = (moveEvent) => {
      const dy = moveEvent.clientY - startY
      setHeight(Math.min(maxHeight, Math.max(minHeight, startHeight - dy)))
    }

    const handleUp = (upEvent) => {
      el.releasePointerCapture(upEvent.pointerId)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
  }

  return { height, handleResizePointerDown }
}
