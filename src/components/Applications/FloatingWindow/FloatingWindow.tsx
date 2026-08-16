import type { ReactNode } from 'react'
import WindowControls from './WindowControls'
import { useFloatingWindowGeometry } from './useFloatingWindowGeometry'
import { RESIZE_HANDLES } from './resizeHandles'
import { getContainerClassName, getTitleBarClassName, getTitleTextClassName } from './floatingWindowTheme'

type FloatingWindowProps = {
  title: ReactNode
  onClose: () => void
  children: ReactNode
  widthRatio?: number
  heightRatio?: number
  horizontalBias?: number
  verticalBias?: number
  minWidth?: number
  minHeight?: number
  zIndex?: number
  onFocus?: () => void
  headerRight?: ReactNode
  theme?: string
}

const FloatingWindow = ({
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
  headerRight = null,
  theme = 'dark',
}: FloatingWindowProps) => {
  const {
    size,
    pos,
    isFullscreen,
    chromeVisible,
    setChromeVisible,
    toggleFullscreen,
    handleTitleBarPointerDown,
    handleResizePointerDown,
  } = useFloatingWindowGeometry({ widthRatio, heightRatio, minWidth, minHeight, horizontalBias, verticalBias })

  const containerClassName = getContainerClassName(theme, isFullscreen)
  const titleBarClassName = getTitleBarClassName(theme, isFullscreen, chromeVisible)

  const containerStyle = isFullscreen
    ? { zIndex }
    : { left: pos.x, top: pos.y, width: size.width, height: size.height, zIndex }

  return (
    <div
      className={containerClassName}
      style={containerStyle}
      onClick={(event) => event.stopPropagation()}
      onPointerDownCapture={() => onFocus?.()}
    >
      <div
        className={titleBarClassName}
        onPointerDown={isFullscreen ? undefined : handleTitleBarPointerDown}
        onMouseEnter={isFullscreen ? () => setChromeVisible(true) : undefined}
        onMouseLeave={isFullscreen ? () => setChromeVisible(false) : undefined}
      >
        <WindowControls onClose={onClose} isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />
        <div className={getTitleTextClassName(theme)}>{title}</div>
        <div className="flex w-14 items-center justify-end">{headerRight}</div>
      </div>

      <div className="flex flex-1 overflow-hidden">{children}</div>

      {!isFullscreen &&
        RESIZE_HANDLES.map(({ dir, className }) => (
          <div key={dir} className={`absolute ${className}`} onPointerDown={handleResizePointerDown(dir)} />
        ))}
    </div>
  )
}

export default FloatingWindow
