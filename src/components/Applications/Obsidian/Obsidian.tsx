import { useState } from 'react'
import FloatingWindow from '../FloatingWindow/FloatingWindow'
import ThemeToggleButton from '../../Common/ThemeToggleButton/ThemeToggleButton'
import { usePanelResize } from '../../Common/usePanelResize'
import { VAULT } from '../../../data/obsidianData'
import { renderMarkdown } from './markdown'
import NoteList from './NoteList'

const Obsidian = ({ onClose, zIndex, onFocus }) => {
  const [expandedIds, setExpandedIds] = useState(() => new Set(VAULT.map((topic) => topic.id)))
  const [selectedId, setSelectedId] = useState(VAULT[0].children[0].id)
  const [theme, setTheme] = useState('light')
  const isLight = theme === 'light'

  const { size: sidebarWidth, handleResizePointerDown: handleSidebarResizeStart } = usePanelResize({
    axis: 'width',
    initialSize: 176,
    minSize: 140,
    maxSize: 320,
  })

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
      testId="obsidian"
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
      <div className="flex shrink-0" style={{ width: sidebarWidth }}>
        <nav
          className={`min-w-0 flex-1 overflow-y-auto p-2 text-[13px] ${
            isLight ? 'bg-[#f7f7f7]' : 'bg-[#181818]'
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
          onPointerDown={handleSidebarResizeStart}
          className={`w-0.5 shrink-0 cursor-ew-resize touch-none ${
            isLight ? 'bg-black/10 hover:bg-black/20' : 'bg-black/50 hover:bg-white/20'
          }`}
        />
      </div>

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
