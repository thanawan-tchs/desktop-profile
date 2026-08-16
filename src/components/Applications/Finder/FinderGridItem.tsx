import IconGlyph from '../../Desktop/DesktopIcon/IconGlyph'
import { DockGlyph } from '../../Desktop/Dock/Dock'
import type { FinderItem } from '../../../data/desktopItems'

const GRID_ICON_CLASS = 'h-14 w-16 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]'

const FinderGridItem = ({ item, onOpen }: { item: FinderItem; onOpen: (item: FinderItem) => void }) => (
  <button
    type="button"
    onClick={() => onOpen(item)}
    className="flex flex-col items-center gap-1.5 rounded-lg px-2 py-3 text-center hover:bg-black/5"
  >
    {item.type === 'app' ? (
      <span className="flex h-14 w-14 items-center justify-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
        <DockGlyph id={item.appId} />
      </span>
    ) : (
      <IconGlyph type={item.type} src={item.src} className={GRID_ICON_CLASS} />
    )}
    <span className="max-w-full truncate text-[11px] text-black/80">{item.label}</span>
  </button>
)

export default FinderGridItem
