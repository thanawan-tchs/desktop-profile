import { DESKTOP_ITEMS } from './desktopItems'
import ckadCertification from '../assets/images/ckad-certification.png'
import { ICON_NAMES } from '../components/Common/Icons'

export const FINDER_SIDEBAR = [
  { label: '', items: ['Recents'] },
  {
    label: 'Favorites',
    items: ['AirDrop', 'Applications', 'Desktop', 'Projects', 'Documents', 'Downloads'],
  },
  { label: 'iCloud', items: ['iCloud Drive'] },
  { label: '', items: ['Trash'] },
]

export const FINDER_SIDEBAR_ICON_NAMES = {
  Recents: ICON_NAMES.RECENT,
  Applications: ICON_NAMES.GRID,
  Downloads: ICON_NAMES.DOWNLOAD,
  Documents: ICON_NAMES.FILE_REMOVE,
}

export const FINDER_FOLDERS = {
  Desktop: DESKTOP_ITEMS,
  Projects: [{ id: 'my-app', label: 'my-app', type: 'vscode' }],
  Documents: [
    {
      id: 'ckad-certification',
      label: 'ckad-certification.png',
      type: 'image',
      src: ckadCertification,
    },
  ],
  Applications: [],
  Recents: DESKTOP_ITEMS.filter((item) => item.id === 'resume'),
  AirDrop: [],
  Downloads: [],
  'iCloud Drive': [],
  Trash: [],
}
