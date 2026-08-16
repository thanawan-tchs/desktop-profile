import { DESKTOP_ITEMS, type FinderItem } from './desktopItems'
import ckadCertification from '../assets/images/ckad-certification.jpg'
import { ICON_NAMES } from '../components/Common/Icons'
import { APP_IDS } from './appIds'

// Only the Dock apps that actually open a window belong here — Launchpad,
// Notes, and Claude are decorative dock icons with no window behind them.
const APPLICATIONS: FinderItem[] = [
  { id: 'app-finder', label: 'Finder', type: 'app', appId: APP_IDS.FINDER },
  { id: 'app-chrome', label: 'Google Chrome', type: 'app', appId: APP_IDS.CHROME },
  { id: 'app-postman', label: 'Postman', type: 'app', appId: APP_IDS.POSTMAN },
  { id: 'app-projects', label: 'Projects', type: 'app', appId: APP_IDS.PROJECTS },
  { id: 'app-settings', label: 'System Settings', type: 'app', appId: APP_IDS.SETTINGS },
  { id: 'app-obsidian', label: 'Obsidian', type: 'app', appId: APP_IDS.OBSIDIAN },
  { id: 'app-vscode', label: 'Visual Studio Code', type: 'app', appId: APP_IDS.VSCODE },
  { id: 'app-terminal', label: 'Terminal', type: 'app', appId: APP_IDS.TERMINAL },
]

export const FINDER_SIDEBAR: { label: string; items: string[] }[] = [
  { label: '', items: ['Recents'] },
  {
    label: 'Favorites',
    items: ['AirDrop', 'Applications', 'Desktop', 'Projects', 'Documents', 'Downloads'],
  },
  { label: 'iCloud', items: ['iCloud Drive'] },
  { label: '', items: ['Trash'] },
]

export const FINDER_SIDEBAR_ICON_NAMES: Record<string, string> = {
  Recents: ICON_NAMES.RECENT,
  Applications: ICON_NAMES.GRID,
  Downloads: ICON_NAMES.DOWNLOAD,
  Documents: ICON_NAMES.FILE_REMOVE,
}

export const FINDER_FOLDERS: Record<string, FinderItem[]> = {
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
  Applications: APPLICATIONS,
  Recents: DESKTOP_ITEMS.filter((item) => item.id === 'resume'),
  AirDrop: [],
  Downloads: [],
  'iCloud Drive': [],
  Trash: [],
}
