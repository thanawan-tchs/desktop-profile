import { Icon, ICON_NAMES } from '../../Common/Icons'

const NoteList = ({ topics, expandedIds, onToggleTopic, selectedId, onSelectNote, isLight }) => {
  return topics.map((topic) => {
    const isExpanded = expandedIds.has(topic.id)
    return (
      <div key={topic.id} className="mb-0.5">
        <button
          type="button"
          onClick={() => onToggleTopic(topic.id)}
          className={`flex w-full items-center gap-1 rounded px-1.5 py-1 text-left ${
            isLight ? 'text-black/60 hover:bg-black/5' : 'text-white/70 hover:bg-white/5'
          }`}
        >
          <Icon name={ICON_NAMES.CHEVRON_RIGHT} expanded={isExpanded} />
          <span className="truncate font-medium">{topic.label}</span>
        </button>
        {isExpanded && (
          <div
            className={`ml-3.5 border-l pl-2 ${isLight ? 'border-black/10' : 'border-white/10'}`}
          >
            {topic.children.map((note) => (
              <button
                key={note.id}
                type="button"
                onClick={() => onSelectNote(note.id)}
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
  })
}

export default NoteList
