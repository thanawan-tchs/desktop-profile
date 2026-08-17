# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal portfolio built as a clone of a macOS-style desktop UI — Dock, menu bar, draggable/resizable windows, light & dark themes, and a handful of working "apps" — all in React, in service of showing off the author's background, skills, and experience.

## Commands

```bash
npm install
npm run dev            # start the Vite dev server
npm run build          # production build to dist/
npm run preview        # preview the production build locally
npm run lint            # run Oxlint
npm run typecheck       # run tsc --noEmit
npm run deploy          # build and publish dist/ to GitHub Pages
npm run cypress:open    # open the Cypress runner against an already-running dev server
npm run cypress:run     # headless Cypress run against an already-running dev server
npm run test:e2e        # starts the dev server, runs Cypress headless, tears it down
npm run test:e2e:open   # starts the dev server, opens the Cypress runner, tears it down on exit
```

`npm run typecheck` and `npm run lint` are the correctness gates for app code — run both after non-trivial changes. Note: `tsconfig.json` has `strict: false` and `noImplicitAny: false`, so `tsc` will not catch everything a strict config would.

E2E coverage lives in `cypress/e2e/` (one spec per journey — desktop shell/dock, window drag/resize/fullscreen, then one per app). Cypress specs type-check against `cypress/tsconfig.json` (separate from the root config, which only includes `src`). `cypress/support/commands.ts` has the shared helpers: `cy.openDockApp(label)` clicks a Dock icon by its `title` attribute, `cy.getWindow(testId)` finds a `FloatingWindow` by the `testId` prop wired through it (see below), and `cy.dragBy(dx, dy)` simulates a pointer drag against `FloatingWindow`'s pointer-capture-based drag/resize handlers.

Deployment happens two ways: `npm run deploy` (gh-pages package, publishes `dist/` directly) and automatically via `.github/workflows/deploy.yml` on every push to `main` (builds and deploys to GitHub Pages). The custom domain is set via `public/CNAME`.

## Architecture

### Window management is centralized in one component

`src/components/Desktop/DesktopScreen/DesktopScreen.tsx` is the single owner of all window state — every app (Obsidian, Finder, VS Code, Chrome, Terminal, Settings, Postman, ResumePdf, ImageViewer) is rendered here, keyed off one `windows` state object of shape `{ [appId]: { open, zIndex, props } }`. There is no per-app open/close state anywhere else. To add a new window-based app: give it an id in `src/data/appIds.ts` (`APP_IDS`), add it to `WINDOW_APP_NAMES`/`WINDOW_IDS` derivation in `DesktopScreen.tsx`, and render it conditionally on `windows[id].open` following the existing pattern.

`APP_IDS` (`src/data/appIds.ts`) is the shared id namespace used by both the Dock (which apps show a running-indicator dot / handle clicks) and `DesktopScreen` (which apps are windows) — this avoids retyping/typo-ing the same string in two places.

Every app window renders through `src/components/Applications/FloatingWindow/FloatingWindow.tsx`, which owns drag/resize/fullscreen chrome. Its logic is split by concern:
- `useFloatingWindowGeometry.ts` — position/size state, pointer drag, resize-from-any-edge, fullscreen snapshot/restore
- `floatingWindowTheme.ts` — light/dark className logic
- `resizeHandles.ts` — static per-edge/corner handle layout
- `WindowControls.tsx` — the traffic-light buttons

Each app passes `FloatingWindow` a `testId` prop matching its `APP_IDS` value (e.g. `testId="obsidian"`), which lands as `data-testid` on the window root, its titlebar (`{testId}-titlebar`), and its resize handles (`{testId}-resize-{n|s|e|w|nw|ne|sw|se}`). This exists solely so Cypress specs can target a specific window unambiguously — keep it wired when adding a new window-based app.

Apps opt into `theme="light"` or the default dark theme; there's no global theme prop threading beyond what each app passes to its own `FloatingWindow`.

### Fullscreen coordination crosses component boundaries

`FullscreenContext` (`src/context/FullscreenContext.tsx`), provided in `DesktopScreen`, tracks `chromeVisible` (should the menu bar/titlebar be shown right now) and a `registerFullscreen` counter (`fullscreenCount`) so multiple things can independently know "is *anything* fullscreen." `TopBar` and any fullscreened `FloatingWindow` both hide/reveal themselves off `chromeVisible`; the Dock hides entirely when `isAnyFullscreen`.

### Cross-app interactions

VS Code's mock terminal supports typing `npm run dev`, which calls `onRunDevServer` (wired in `DesktopScreen` to `openMockDevServer`) — this opens/focuses Chrome and navigates it to `MOCK_DEV_URL` (`src/components/Applications/Chrome/chromeUrl.ts`). `devServerRunning` state gates whether Chrome's mock preview page loads or shows a "connection refused" page — pressing Ctrl+C in the VS Code terminal should call `onStopDevServer` and flip this off.

Finder and the desktop icons share `handleDesktopItemOpen` in `DesktopScreen` — opening a folder navigates Finder, opening a PDF/image/vscode project opens the corresponding app window.

### Content lives in `src/data/`, not in components

`src/data/` holds the editable content as plain JS/JSON/TS: `profile.json` (resume content), `wallpapers.ts`, `finderLocations.ts`, `desktopItems.ts`, `vscodeProject.ts` (the mock VS Code file tree), `obsidianData.ts` + `readme.ts` (the Obsidian vault). This is intentionally decoupled from component code so content edits don't require touching rendering logic.

### Icons

No general UI kit — window chrome, Dock, etc. are hand-built. `src/components/Common/Icons` is a small registry (`iconRegistry.ts` + `iconNames.ts` mapping `ICON_NAMES` to components, `Icon.tsx` as the lookup component) wrapping `lucide-react` for generic icons, while macOS-specific glyphs (Dock app tiles, the Apple logo) are hand-drawn SVG components since no icon library has those.

### Project structure

```
src/
  components/
    Desktop/          # Dock, menu bar, desktop icons, DesktopScreen (owns window state)
    Applications/      # One folder per app (Obsidian, VsCode, Chrome, Finder, Terminal, ...)
    Common/            # Shared bits: Icon registry, theme toggle button
  data/                # Editable content: profile.json, wallpapers, Finder locations, mock VS Code project, Obsidian vault
  context/             # FullscreenContext
```

## Conventions observed in this codebase

- Components with several files split by concern (see `FloatingWindow/` above) put each piece in its own file rather than nesting subcomponents/hooks inline — one export per file, imported by name (no barrel `index.ts` re-exports for these).
- Tailwind classes that depend on theme/state are usually computed as named variables (or extracted to a small `get*ClassName` helper function) above the JSX return rather than inlined as nested ternaries in the markup.
