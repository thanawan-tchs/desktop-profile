import { Icon, ICON_NAMES } from '../../Common/Icons'
import { hostnameOf } from './chromeUrl'

const BlockedPage = ({ url, isLight, onRetry }) => (
  <div
    className={`flex h-full w-full flex-col items-center justify-center gap-3 px-8 text-center ${
      isLight ? 'bg-white text-black/70' : 'bg-[#202124] text-white/70'
    }`}
  >
    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isLight ? 'bg-black/5' : 'bg-white/5'}`}>
      <Icon name={ICON_NAMES.BLOCKED} className="h-6 w-6" />
    </div>
    <p className="text-sm font-medium">{hostnameOf(url)} refused to connect</p>
    <p className={`max-w-sm text-xs leading-relaxed ${isLight ? 'text-black/45' : 'text-white/45'}`}>
      This site doesn't allow itself to be shown inside another page, so this in-app preview can't
      load it. Try a different address.
    </p>
    <button
      type="button"
      onClick={onRetry}
      className={`mt-1 rounded-full border px-3 py-1 text-xs ${
        isLight ? 'border-black/15 text-black/60 hover:bg-black/5' : 'border-white/15 text-white/60 hover:bg-white/10'
      }`}
    >
      Reload
    </button>
  </div>
)

export default BlockedPage
