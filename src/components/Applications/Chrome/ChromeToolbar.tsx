import { Icon, ICON_NAMES } from '../../Common/Icons'
import ToolbarButton from './ToolbarButton'

const ChromeToolbar = ({
  isLight,
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  onReload,
  addressInput,
  onAddressChange,
  onSubmit,
  secure,
}) => (
  <div
    className={`flex h-11 shrink-0 items-center gap-1 border-b px-2 ${
      isLight ? 'border-black/10 bg-white' : 'border-black/50 bg-[#35363a]'
    }`}
  >
    <ToolbarButton onClick={onBack} disabled={!canGoBack} isLight={isLight} label="Back">
      <Icon name={ICON_NAMES.ARROW_LEFT} className="h-4 w-4" />
    </ToolbarButton>
    <ToolbarButton onClick={onForward} disabled={!canGoForward} isLight={isLight} label="Forward">
      <Icon name={ICON_NAMES.ARROW_RIGHT} className="h-4 w-4" />
    </ToolbarButton>
    <ToolbarButton onClick={onReload} isLight={isLight} label="Reload">
      <Icon name={ICON_NAMES.REFRESH} className="h-4 w-4" />
    </ToolbarButton>

    <form
      onSubmit={onSubmit}
      className={`ml-1 flex flex-1 items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] ${
        isLight ? 'border-black/10 bg-[#f1f3f4] text-black/70' : 'border-white/10 bg-[#202124] text-white/70'
      }`}
    >
      {secure && (
        <Icon
          name={ICON_NAMES.LOCK}
          className={`h-3.5 w-3.5 shrink-0 ${isLight ? 'text-black/40' : 'text-white/40'}`}
        />
      )}
      <input
        value={addressInput}
        onChange={onAddressChange}
        spellCheck={false}
        className="flex-1 bg-transparent outline-none"
      />
    </form>
  </div>
)

export default ChromeToolbar
