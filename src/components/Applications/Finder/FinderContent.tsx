import type { FinderItem } from '../../../data/desktopItems'
import EmptyFolder from './EmptyFolder'
import FinderGridItem from './FinderGridItem'

const FinderContent = ({ items, onOpen }: { items: FinderItem[]; onOpen: (item: FinderItem) => void }) => (
  <div data-testid="finder-content" className="flex-1 overflow-y-auto bg-white p-4">
    {items.length === 0 ? (
      <EmptyFolder />
    ) : (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3">
        {items.map((item) => (
          <FinderGridItem key={item.id} item={item} onOpen={onOpen} />
        ))}
      </div>
    )}
  </div>
)

export default FinderContent
