import { Icon, ICON_NAMES } from '../../Common/Icons'
import { FINDER_SIDEBAR_ICON_NAMES } from '../../../data/finderLocations'

const SidebarGlyph = ({ label, active }: { label: string; active: boolean }) => {
  const iconClassName = `h-3.5 w-3.5 shrink-0 ${active ? 'text-[#0a58ca]' : 'text-black/50'}`
  const customIconName = FINDER_SIDEBAR_ICON_NAMES[label]

  if (customIconName) {
    return <Icon name={customIconName} className={iconClassName} />
  }
  if (label === 'Trash') {
    return <Icon name={ICON_NAMES.TRASH_DELETE} className={iconClassName} />
  }
  return <Icon name={ICON_NAMES.FOLDER_OUTLINE} />
}

export default SidebarGlyph
