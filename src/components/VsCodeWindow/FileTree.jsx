import { useState } from 'react'
import { Icon, ICON_NAMES } from '../icons'
import FileIcon from './FileIcon'

const FileTree = ({ node, path = '', activePath, onSelectFile, depth = 0, isLight }) => {
  const [expanded, setExpanded] = useState(true)
  const fullPath = path ? `${path}/${node.name}` : node.name

  if (node.type === 'folder') {
    return (
      <div>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          style={{ paddingLeft: 8 + depth * 12 }}
          className={`flex w-full items-center gap-1 py-[3px] pr-2 text-left ${
            isLight ? 'text-black/70 hover:bg-black/5' : 'text-white/70 hover:bg-white/5'
          }`}
        >
          <Icon name={ICON_NAMES.CHEVRON_RIGHT} expanded={expanded} />
          <Icon name={ICON_NAMES.FILE_TREE_FOLDER} isLight={isLight} />
          <span className="truncate">{node.name}</span>
        </button>
        {expanded &&
          node.children.map((child) => (
            <FileTree
              key={child.name}
              node={child}
              path={fullPath}
              activePath={activePath}
              onSelectFile={onSelectFile}
              depth={depth + 1}
              isLight={isLight}
            />
          ))}
      </div>
    )
  }

  const isActive = fullPath === activePath

  return (
    <button
      type="button"
      onClick={() => onSelectFile(fullPath)}
      style={{ paddingLeft: 8 + depth * 12 + 14 }}
      className={`flex w-full items-center gap-1.5 py-[3px] pr-2 text-left ${
        isActive
          ? isLight
            ? 'bg-[#0a84ff]/15 text-black'
            : 'bg-[#37373d] text-white'
          : isLight
            ? 'text-black/70 hover:bg-black/5'
            : 'text-white/70 hover:bg-white/5'
      }`}
    >
      <FileIcon name={node.name} />
      <span className="truncate">{node.name}</span>
    </button>
  )
}

export default FileTree
