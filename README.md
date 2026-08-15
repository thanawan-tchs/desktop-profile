# Desktop Profile

A personal portfolio built as a **clone of a macOS-style desktop UI** — Dock, menu bar, draggable/resizable windows, light & dark themes, and a handful of working "apps" — all in React, all in service of showing off my background, skills, and experience in a more interactive way than a typical resume page.

**Live demo:** https://thanawan-tchs.github.io/desktop-profile/

## What's inside

The desktop shell (`src/components/Desktop`) recreates the core macOS chrome:

- A **Dock** with a hover-magnify effect and running-app indicators
- A **menu bar** (TopBar) showing the active app, social links, and system status glyphs
- **Draggable, resizable windows** (`FloatingWindow`) with real fullscreen mode, used by every app below
- A wallpaper-driven desktop background with clickable desktop icons

### Apps

| App | What it does |
| --- | --- |
| **Obsidian** | A notes app for my background, skills, certifications, and experience, rendered from a small in-repo markdown engine. Its sidebar and terminal panels are drag-resizable. |
| **Visual Studio Code** | A working file explorer over a small mock project, syntax-highlighted code view, and an integrated terminal. Typing `npm run dev` and pressing Enter actually opens a live preview in Chrome. |
| **Google Chrome** | A multi-tab browser clone: real address bar, back/forward/reload, per-tab navigation history, and a simulated "site refused to connect" page for domains that block iframing (or when the mock dev server isn't running). |
| **Terminal** | A scripted shell session for a quick, flavorful look. |
| **Finder** | Sidebar locations (Desktop, Projects, Documents, Downloads, Recents, Trash, …) backed by real data, opening folders, images, and the resume PDF. |
| **System Settings** | Pick a desktop wallpaper. |
| **Resume.pdf / Image Viewer** | Preview the resume and other files directly on the desktop. |

Everything is wired together in `DesktopScreen.jsx`, which owns window open/close state, z-index stacking (click-to-focus), and the handful of cross-app interactions (like VS Code's terminal opening a tab in Chrome).

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) for general-purpose icons
- [Oxlint](https://oxc.rs/) for linting
- Deployed to GitHub Pages via [`gh-pages`](https://www.npmjs.com/package/gh-pages)

No general UI kit — window chrome and the Dock are hand-built components. Icons go through a small registry (`src/components/Common/Icons`) that wraps lucide-react for generic icons, while the macOS-specific bits (Dock app tiles, the Apple logo) stay hand-drawn since no icon library has those.

## Project structure

```
src/
  components/
    Desktop/         # Dock, menu bar, desktop icons, the screen that owns window state
    Applications/     # One folder per app (Obsidian, VsCode, Chrome, Finder, Terminal, ...)
    Common/           # Shared bits: Icon registry, theme toggle button
  data/               # Editable content: profile.json, wallpapers, Finder locations, the mock VS Code project, the Obsidian vault, the README note
  context/            # FullscreenContext (coordinates window fullscreen with the menu bar)
```

Most of what makes this "mine" — the resume content, skills, wallpapers, README note inside Obsidian, and the mock VS Code project — lives in `src/data/` as plain JS/JSON, so it can be edited without touching component code.

## Getting started

```bash
npm install
npm run dev       # start the Vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint      # run Oxlint
npm run deploy    # build and publish dist/ to GitHub Pages
```

## Author

Built by [Thanawan Techsai](mailto:thanawan.tchs@gmail.com), a full-stack software engineer.
