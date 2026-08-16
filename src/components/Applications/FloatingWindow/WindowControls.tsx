import { Icon, ICON_NAMES } from '../../Common/Icons'

const WindowControls = ({
  onClose,
  isFullscreen,
  onToggleFullscreen,
}: {
  onClose: () => void
  isFullscreen: boolean
  onToggleFullscreen: () => void
}) => (
  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={onClose}
      className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] hover:brightness-90"
      aria-label="Close"
    >
      <Icon name={ICON_NAMES.CLOSE} className="h-2.5 w-2.5 text-black/90 opacity-0 group-hover:opacity-100" />
    </button>
    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
    <button
      type="button"
      onClick={onToggleFullscreen}
      className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] hover:brightness-90"
      aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'}
    >
      <Icon
        name={isFullscreen ? ICON_NAMES.MINIMIZE_SCREEN : ICON_NAMES.MAXIMIZE_SCREEN}
        className="h-2.5 w-2.5 text-black/90 opacity-0 group-hover:opacity-100"
      />
    </button>
  </div>
)

export default WindowControls
