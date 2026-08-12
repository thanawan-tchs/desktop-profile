import { useState } from 'react'
import FloatingWindow from '../FloatingWindow/FloatingWindow'
import { VAULT } from './vaultData'
import { renderMarkdown } from './markdown'

function ObsidianWindow({ onClose, zIndex, onFocus }) {
  const [expandedIds, setExpandedIds] = useState(() => new Set(VAULT.map((topic) => topic.id)))
  const [selectedId, setSelectedId] = useState(VAULT[0].children[0].id)

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
    >
      <nav className="w-44 shrink-0 overflow-y-auto border-r border-black/40 bg-[#181818] p-2 text-[13px]">
        {VAULT.map((topic) => {
          const isExpanded = expandedIds.has(topic.id)
          return (
            <div key={topic.id} className="mb-0.5">
              <button
                type="button"
                onClick={() => toggleTopic(topic.id)}
                className="flex w-full items-center gap-1 rounded px-1.5 py-1 text-left text-white/70 hover:bg-white/5"
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
                <div className="ml-3.5 border-l border-white/10 pl-2">
                  {topic.children.map((note) => (
                    <button
                      key={note.id}
                      type="button"
                      onClick={() => setSelectedId(note.id)}
                      className={`block w-full truncate rounded px-1.5 py-1 text-left ${
                        selectedId === note.id
                          ? 'bg-[#7c3aed]/25 text-white'
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

      <div className="flex-1 overflow-y-auto bg-[#1e1e1e] px-8 py-6 text-[15px]">
        {selectedNote ? (
          renderMarkdown(selectedNote.content)
        ) : (
          <p className="text-white/40">Select a note to preview it here.</p>
        )}
      </div>
    </FloatingWindow>
  )
}

export default ObsidianWindow
