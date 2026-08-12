export const VAULT = [
  {
    id: 'welcome',
    label: 'Welcome',
    children: [
      {
        id: 'welcome-readme',
        label: 'README',
        content: `# Desktop Profile

Welcome to my **desktop profile**, cloned in the style of Obsidian.

This vault is a small showcase of how I like to organize things:

- Projects I'm building
- Notes I keep along the way
- Ideas I don't want to lose

Click a note on the left to open it here.`,
      },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    children: [
      {
        id: 'project-desktop-profile',
        label: 'Desktop Profile',
        content: `## Desktop Profile

A React + Tailwind clone of the macOS desktop, dock, and now an **Obsidian-style** window.

- Draggable, resizable window
- Collapsible sidebar of topics
- Markdown-flavored reading pane`,
      },
      {
        id: 'project-ideas',
        label: 'Project Ideas',
        content: `## Project Ideas

- Add a Notes app
- Add a terminal window
- Theme switcher (light / dark)`,
      },
    ],
  },
  {
    id: 'notes',
    label: 'Daily Notes',
    children: [
      {
        id: 'note-today',
        label: 'Today',
        content: `## Daily Note

Working on the desktop profile clone today.

- Added a top bar with clock and status icons
- Migrated styles to Tailwind CSS
- Built an Obsidian-style window with a \`draggable\` title bar`,
      },
    ],
  },
]
