import chromeIcon from '../../../assets/icons/google-chrome-logo.svg'
import { Icon, ICON_NAMES } from '../../Common/Icons'
import { hostnameOf } from './chromeUrl'

const ChromeTab = ({ url, active, isLight, onSelect, onClose }) => (
  <div
    onClick={onSelect}
    className={`group flex h-full w-[160px] shrink-0 cursor-default items-center gap-2 rounded-t-md px-3 text-[12px] ${
      active
        ? isLight
          ? 'bg-white text-black/80'
          : 'bg-[#35363a] text-white/80'
        : isLight
          ? 'text-black/50 hover:bg-black/10'
          : 'text-white/40 hover:bg-white/5'
    }`}
  >
    <img src={chromeIcon} alt="" className="h-3.5 w-3.5 shrink-0" />
    <span className="flex-1 truncate">{hostnameOf(url)}</span>
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onClose()
      }}
      aria-label="Close tab"
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full opacity-0 group-hover:opacity-100 ${
        active ? 'opacity-100' : ''
      } ${isLight ? 'text-black/50 hover:bg-black/10' : 'text-white/60 hover:bg-white/10'}`}
    >
      <Icon name={ICON_NAMES.CLOSE} className="h-2.5 w-2.5" />
    </button>
  </div>
)

export default ChromeTab
