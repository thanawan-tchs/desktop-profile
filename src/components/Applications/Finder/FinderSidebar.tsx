import { FINDER_SIDEBAR } from '../../../data/finderLocations'
import SidebarGlyph from './SidebarGlyph'

const FinderSidebar = ({ location, onNavigate }: { location: string; onNavigate: (item: string) => void }) => (
  <nav
    data-testid="finder-sidebar"
    className="w-40 shrink-0 overflow-y-auto border-r border-black/10 bg-[#f5f5f7] p-2 text-[13px]"
  >
    {FINDER_SIDEBAR.map((section) => (
      <div key={section.items.join(',')} className="mb-3">
        <div className="px-2 pb-1 text-[11px] font-medium text-black/40">{section.label}</div>
        {section.items.map((item) => {
          const isActive = item === location
          return (
            <button
              key={item}
              type="button"
              onClick={() => onNavigate(item)}
              className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left ${
                isActive ? 'bg-[#0a84ff]/15 text-[#0a58ca]' : 'text-black/70 hover:bg-black/5'
              }`}
            >
              <SidebarGlyph label={item} active={isActive} />
              <span className="truncate">{item}</span>
            </button>
          )
        })}
      </div>
    ))}
  </nav>
)

export default FinderSidebar
