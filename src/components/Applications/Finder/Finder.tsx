import { useState } from 'react'
import FloatingWindow from '../FloatingWindow/FloatingWindow'
import { FINDER_FOLDERS } from '../../../data/finderLocations'
import type { FinderItem } from '../../../data/desktopItems'
import FinderSidebar from './FinderSidebar'
import FinderContent from './FinderContent'

type FinderProps = {
  onClose: () => void
  zIndex: number
  onFocus: () => void
  folderName?: string
  onOpenItem?: (item: FinderItem) => void
}

const Finder = ({ onClose, zIndex, onFocus, folderName = 'Desktop', onOpenItem }: FinderProps) => {
  const [location, setLocation] = useState(folderName)
  const items = FINDER_FOLDERS[location] ?? []

  const handleItemOpen = (item: FinderItem) => {
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
      <FinderSidebar location={location} onNavigate={setLocation} />
      <FinderContent items={items} onOpen={handleItemOpen} />
    </FloatingWindow>
  )
}

export default Finder
