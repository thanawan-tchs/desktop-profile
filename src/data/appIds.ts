// Central id namespace for every Dock app and every window DesktopScreen can
// render. Both share this set (Finder, VS Code, Chrome, etc. are both a Dock
// icon and a window), so one enum avoids retyping — and risking a typo in —
// the same string across Dock.jsx and DesktopScreen.jsx.
export const APP_IDS = Object.freeze({
  OBSIDIAN: 'obsidian',
  PDF: 'pdf',
  FINDER: 'finder',
  IMAGE: 'image',
  VSCODE: 'vscode',
  SETTINGS: 'settings',
  TERMINAL: 'terminal',
  CHROME: 'chrome',
  POSTMAN: 'postman',
  LAUNCHPAD: 'launchpad',
  NOTES: 'notes',
  CLAUDE: 'claude',
  FOLDER: 'folder',
  TRASH: 'trash',
})
