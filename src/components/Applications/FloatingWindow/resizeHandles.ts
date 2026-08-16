import type { ResizeDirection } from './useFloatingWindowGeometry'

export const RESIZE_HANDLES: { dir: ResizeDirection; className: string }[] = [
  { dir: 'n', className: 'inset-x-2 top-0 h-3 cursor-ns-resize touch-none md:h-1.5' },
  { dir: 's', className: 'inset-x-2 bottom-0 h-3 cursor-ns-resize touch-none md:h-1.5' },
  { dir: 'w', className: 'inset-y-2 left-0 w-3 cursor-ew-resize touch-none md:w-1.5' },
  { dir: 'e', className: 'inset-y-2 right-0 w-3 cursor-ew-resize touch-none md:w-1.5' },
  { dir: 'nw', className: 'left-0 top-0 h-5 w-5 cursor-nwse-resize touch-none md:h-3 md:w-3' },
  { dir: 'se', className: 'bottom-0 right-0 h-5 w-5 cursor-nwse-resize touch-none md:h-3 md:w-3' },
  { dir: 'ne', className: 'right-0 top-0 h-5 w-5 cursor-nesw-resize touch-none md:h-3 md:w-3' },
  { dir: 'sw', className: 'bottom-0 left-0 h-5 w-5 cursor-nesw-resize touch-none md:h-3 md:w-3' },
]
