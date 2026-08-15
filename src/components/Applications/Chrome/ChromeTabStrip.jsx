import chromeIcon from '../../../assets/icons/google-chrome-logo.svg'
import { hostnameOf } from './chromeUrl'

const ChromeTabStrip = ({ activeUrl, isLight }) => (
  <div className={`flex h-8 shrink-0 items-end px-2 pt-1.5 ${isLight ? 'bg-[#dee1e6]' : 'bg-[#202124]'}`}>
    <div
      className={`flex h-full min-w-[140px] max-w-[220px] items-center gap-2 rounded-t-md px-3 text-[12px] ${
        isLight ? 'bg-white text-black/80' : 'bg-[#35363a] text-white/80'
      }`}
    >
      <img src={chromeIcon} alt="" className="h-3.5 w-3.5 shrink-0" />
      <span className="flex-1 truncate">{hostnameOf(activeUrl)}</span>
    </div>
  </div>
)

export default ChromeTabStrip
