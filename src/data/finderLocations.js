import { DESKTOP_ITEMS } from './desktopItems'
import ckadCertification from '../assets/images/ckad-certification.png'
import recentIcon from '../assets/icons/recent-logo.png'

export const FINDER_SIDEBAR = [
  {
    label: 'Favorites',
    items: ['AirDrop', 'Recents', 'Applications', 'Desktop', 'Projects', 'Documents', 'Downloads'],
  },
  { label: 'iCloud', items: ['iCloud Drive'] },
  { label: '', items: ['Trash'] },
]

export const FINDER_SIDEBAR_ICONS = {
  Recents: recentIcon,
}

export const FINDER_FOLDERS = {
  Desktop: DESKTOP_ITEMS,
  Projects: [],
  Documents: [
    {
      id: 'ckad-certification',
      label: 'ckad-certification.png',
      type: 'image',
      src: ckadCertification,
    },
  ],
  Applications: [],
  Recents: [],
  AirDrop: [],
  Downloads: [],
  'iCloud Drive': [],
  Trash: [],
}
