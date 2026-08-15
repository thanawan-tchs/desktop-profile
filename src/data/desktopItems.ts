import screenshotImage from '../assets/images/screenshot.jpg'

// Shared by the desktop, Finder windows, and IconGlyph — anywhere an openable
// desktop/Finder entry (folder, file, or image) gets rendered or clicked.
export type FinderItem = {
  id: string
  label: string
  type: string
  src?: string
}

export const DESKTOP_ITEMS: FinderItem[] = [
  { id: 'projects', label: 'Projects', type: 'folder' },
  { id: 'documents', label: 'Documents', type: 'folder' },
  { id: 'screenshot', label: 'Screenshot.png', type: 'image', src: screenshotImage },
  { id: 'resume', label: 'Resume.pdf', type: 'pdf' },
]
