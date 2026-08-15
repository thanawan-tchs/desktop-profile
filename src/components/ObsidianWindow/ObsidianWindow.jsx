import { useState } from 'react'
import FloatingWindow from '../FloatingWindow/FloatingWindow'
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton'
import { Icon, ICON_NAMES } from '../Icons'
import { VAULT } from './vaultData'
import { renderMarkdown } from './markdown'

const ObsidianWindow = ({ onClose, zIndex, onFocus }) => {
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
        <ThemeToggleButton
          theme={theme}
          onToggle={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        />
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
                <Icon name={ICON_NAMES.CHEVRON_RIGHT} expanded={isExpanded} />
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
