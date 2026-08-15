import { Icon, ICON_NAMES } from '../../Common/Icons'

const VsCodeStatusBar = ({ language, onToggleTerminal }) => (
  <div className="flex h-[22px] shrink-0 items-center justify-between bg-[#007acc] px-3 text-[11px] text-white">
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1">
        <Icon name={ICON_NAMES.GIT_BRANCH} />
        main
      </span>
      <button type="button" onClick={onToggleTerminal} className="rounded px-1 hover:bg-white/10">
        Terminal
      </button>
    </div>
    <span>{language}</span>
  </div>
)

export default VsCodeStatusBar
