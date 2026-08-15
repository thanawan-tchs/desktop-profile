import { useState } from 'react'
import FloatingWindow from '../FloatingWindow/FloatingWindow'
import IconGlyph from '../DesktopIcon/IconGlyph'
import { FinderSidebarFolderActiveIcon, FinderSidebarFolderIcon } from '../icons'
import { FINDER_SIDEBAR, FINDER_FOLDERS, FINDER_SIDEBAR_ICONS } from '../../data/finderLocations'
import emptyFolderIcon from '../../assets/icons/empty-folder.webp'

const GRID_ICON_CLASS = 'h-14 w-16 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]'

const SidebarGlyph = ({ label, active }) => {
  const customIcon = FINDER_SIDEBAR_ICONS[label]
  if (customIcon) {
    return <img src={customIcon} alt="" className="h-3.5 w-3.5 shrink-0 object-contain" />
  }
  if (active) {
    return <FinderSidebarFolderActiveIcon />
  }
  return <FinderSidebarFolderIcon />
}

const EmptyFolder = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-black/35">
      <img src={emptyFolderIcon} alt="" className="h-14 w-14 object-contain" />
      <span className="text-[13px]">This folder is empty</span>
    </div>
  )
}

const FolderWindow = ({ onClose, zIndex, onFocus, folderName = 'Desktop', onOpenItem }) => {
  const [location, setLocation] = useState(folderName)
  const items = FINDER_FOLDERS[location] ?? []

  const handleItemOpen = (item) => {
    if (item.type === 'folder') {
      setLocation(item.label)
    } else {
      onOpenItem?.(item)
    }
  }

  return (
    <FloatingWindow
      title={location}
      onClose={onClose}
      zIndex={zIndex}
      onFocus={onFocus}
      widthRatio={0.55}
      heightRatio={0.55}
      horizontalBias={0.5}
      verticalBias={0.35}
      minWidth={480}
      minHeight={320}
      theme="light"
    >
      <nav className="w-40 shrink-0 overflow-y-auto border-r border-black/10 bg-[#f5f5f7] p-2 text-[13px]">
        {FINDER_SIDEBAR.map((section) => (
          <div key={section.label} className="mb-3">
            <div className="px-2 pb-1 text-[11px] font-medium text-black/40">{section.label}</div>
            {section.items.map((item) => {
              const isActive = item === location
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLocation(item)}
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

      <div className="flex-1 overflow-y-auto bg-white p-4">
        {items.length === 0 ? (
          <EmptyFolder />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemOpen(item)}
                className="flex flex-col items-center gap-1.5 rounded-lg px-2 py-3 text-center hover:bg-black/5"
              >
                <IconGlyph type={item.type} src={item.src} className={GRID_ICON_CLASS} />
                <span className="max-w-full truncate text-[11px] text-black/80">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </FloatingWindow>
  )
}

export default FolderWindow
