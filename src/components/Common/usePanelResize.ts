import { useState } from 'react'

// Drag-to-resize a panel's width or height, mirroring FloatingWindow's own
// edge-resize handles (pointer capture + window-level move/up listeners).
// `invert: true` means dragging toward the panel's near edge grows it (e.g. a
// terminal panel whose handle sits above it, where dragging up should grow it).
export const usePanelResize = ({ axis, initialSize, minSize, maxSize, invert = false }) => {
  const [size, setSize] = useState(initialSize)

  const handleResizePointerDown = (event) => {
    event.preventDefault()
    const el = event.currentTarget
    el.setPointerCapture(event.pointerId)
    const isHeight = axis === 'height'
    const startPos = isHeight ? event.clientY : event.clientX
    const startSize = size

    const handleMove = (moveEvent) => {
      const pos = isHeight ? moveEvent.clientY : moveEvent.clientX
      const delta = pos - startPos
      const nextSize = startSize + (invert ? -delta : delta)
      setSize(Math.min(maxSize, Math.max(minSize, nextSize)))
    }

    const handleUp = (upEvent) => {
      el.releasePointerCapture(upEvent.pointerId)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
  }

  return { size, handleResizePointerDown }
}
