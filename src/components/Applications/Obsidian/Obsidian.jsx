import { useState } from 'react'
import FloatingWindow from '../FloatingWindow/FloatingWindow'
import ThemeToggleButton from '../../Common/ThemeToggleButton/ThemeToggleButton'
import { VAULT } from './vaultData'
import { renderMarkdown } from './markdown'
import NoteList from './NoteList'

const Obsidian = ({ onClose, zIndex, onFocus }) => {
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
        <NoteList
          topics={VAULT}
          expandedIds={expandedIds}
          onToggleTopic={toggleTopic}
          selectedId={selectedId}
          onSelectNote={setSelectedId}
          isLight={isLight}
        />
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

export default Obsidian
