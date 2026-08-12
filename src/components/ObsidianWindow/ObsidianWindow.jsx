import { useState } from 'react'
import FloatingWindow from '../FloatingWindow/FloatingWindow'
import { VAULT } from './vaultData'
import { renderMarkdown } from './markdown'

function ObsidianWindow({ onClose, zIndex, onFocus }) {
  const [expandedIds, setExpandedIds] = useState(() => new Set(VAULT.map((topic) => topic.id)))
  const [selectedId, setSelectedId] = useState(VAULT[0].children[0].id)
  const [theme, setTheme] = useState('light')
  const isLight = theme === 'light'

  const toggleTopic = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectedNote = VAULT.flatMap((topic) => topic.children).find(
    (note) => note.id === selectedId,
  )

  return (
    <FloatingWindow
      title="Obsidian"
      onClose={onClose}
      zIndex={zIndex}
      onFocus={onFocus}
      widthRatio={0.7}
      heightRatio={0.7}
      horizontalBias={0.35}
      theme={theme}
      headerRight={
        <button
          type="button"
          onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
          className={`flex h-5 w-5 items-center justify-center rounded ${
            isLight ? 'text-black/50 hover:bg-black/5' : 'text-white/50 hover:bg-white/10'
          }`}
          aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
          title={`Switch to ${isLight ? 'dark' : 'light'} theme`}
        >
          {isLight ? (
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.05a1 1 0 011.41 0l.71.71a1 1 0 11-1.42 1.41l-.7-.7a1 1 0 010-1.42zM18 9a1 1 0 110 2h-1a1 1 0 110-2h1zM4.93 4.05a1 1 0 011.41 1.41l-.7.71a1 1 0 11-1.42-1.42l.71-.7zM3 9a1 1 0 110 2H2a1 1 0 110-2h1zm2.64 6.36a1 1 0 010 1.42l-.71.7a1 1 0 11-1.41-1.41l.7-.71a1 1 0 011.42 0zM10 15a5 5 0 100-10 5 5 0 000 10zm0 2a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm5.66-1.64a1 1 0 011.41 0l.71.71a1 1 0 11-1.42 1.41l-.7-.7a1 1 0 010-1.42z" />
            </svg>
          )}
        </button>
      }
    >
      <nav
        className={`w-44 shrink-0 overflow-y-auto border-r p-2 text-[13px] ${
          isLight ? 'border-black/10 bg-[#f7f7f7]' : 'border-black/40 bg-[#181818]'
        }`}
      >
        {VAULT.map((topic) => {
          const isExpanded = expandedIds.has(topic.id)
          return (
            <div key={topic.id} className="mb-0.5">
              <button
                type="button"
                onClick={() => toggleTopic(topic.id)}
                className={`flex w-full items-center gap-1 rounded px-1.5 py-1 text-left ${
                  isLight
                    ? 'text-black/60 hover:bg-black/5'
                    : 'text-white/70 hover:bg-white/5'
                }`}
              >
                <svg
                  viewBox="0 0 10 10"
                  className={`h-2.5 w-2.5 shrink-0 transition-transform ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                  aria-hidden="true"
                >
                  <path d="M2 1l5 4-5 4z" fill="currentColor" />
                </svg>
                <span className="truncate font-medium">{topic.label}</span>
              </button>
              {isExpanded && (
                <div
                  className={`ml-3.5 border-l pl-2 ${
                    isLight ? 'border-black/10' : 'border-white/10'
                  }`}
                >
                  {topic.children.map((note) => (
                    <button
                      key={note.id}
                      type="button"
                      onClick={() => setSelectedId(note.id)}
                      className={`block w-full truncate rounded px-1.5 py-1 text-left ${
                        selectedId === note.id
                          ? isLight
                            ? 'bg-[#7c3aed]/15 text-black'
                            : 'bg-[#7c3aed]/25 text-white'
                          : isLight
                            ? 'text-black/55 hover:bg-black/5 hover:text-black/80'
                            : 'text-white/60 hover:bg-white/5 hover:text-white/85'
                      }`}
                    >
                      {note.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div
        className={`flex-1 overflow-y-auto px-8 py-6 text-[15px] ${
          isLight ? 'bg-white text-[#2a2a2a]' : 'bg-[#1e1e1e] text-[#dcdcdc]'
        }`}
      >
        {selectedNote ? (
          renderMarkdown(selectedNote.content, theme)
        ) : (
          <p className={isLight ? 'text-black/40' : 'text-white/40'}>
            Select a note to preview it here.
          </p>
        )}
      </div>
    </FloatingWindow>
  )
}

export default ObsidianWindow
