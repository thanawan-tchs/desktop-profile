import { Icon, ICON_NAMES } from '../../Common/Icons'
import ChromeTab from './ChromeTab'

const ChromeTabStrip = ({ tabs, activeTabId, onSelectTab, onCloseTab, onNewTab, isLight }) => (
  <div
    className={`flex h-8 shrink-0 items-end gap-0.5 overflow-x-auto px-2 pt-1.5 ${
      isLight ? 'bg-[#dee1e6]' : 'bg-[#202124]'
    }`}
  >
    {tabs.map((tab) => (
      <ChromeTab
        key={tab.id}
        url={tab.history[tab.historyIndex]}
        active={tab.id === activeTabId}
        isLight={isLight}
        onSelect={() => onSelectTab(tab.id)}
        onClose={() => onCloseTab(tab.id)}
      />
    ))}
    <button
      type="button"
      onClick={onNewTab}
      aria-label="New tab"
      className={`mb-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
        isLight ? 'text-black/50 hover:bg-black/10' : 'text-white/50 hover:bg-white/10'
      }`}
    >
      <Icon name={ICON_NAMES.PLUS} className="h-3.5 w-3.5" />
    </button>
  </div>
)

export default ChromeTabStrip
