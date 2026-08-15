import { useState } from 'react'
import jsonFileIcon from '../../assets/icons/json-file-icon.png'
import htmlIcon from '../../assets/icons/html-icon.png'
import { ChevronRightIcon, FileTreeFolderIcon, TextBadgeIcon } from '../icons'

const EXTENSION_COLORS = {
  jsx: '#61dafb',
  js: '#f1c40f',
  css: '#3b82f6',
  json: '#f1c40f',
  html: '#e37933',
}

const EXTENSION_ICONS = {
  json: jsonFileIcon,
  html: htmlIcon,
}

const EXTENSION_BADGES = {
  js: { label: 'JS', color: '#f1c40f' },
  jsx: { label: 'JS', color: '#f1c40f' },
  css: { label: '#', color: '#4fc3f7', fontSize: 12 },
}

function extensionOf(name) {
  const parts = name.split('.')
  return parts.length > 1 ? parts[parts.length - 1] : ''
}

function FileIcon({ name }) {
  const ext = extensionOf(name)
  const badge = EXTENSION_BADGES[ext]
  if (badge) {
    return <TextBadgeIcon label={badge.label} color={badge.color} fontSize={badge.fontSize} />
  }
  const customIcon = EXTENSION_ICONS[ext]
  const color = EXTENSION_COLORS[ext] ?? '#8a8a8a'
  if (customIcon) {
    return (
      <span
        className="h-3.5 w-3.5 shrink-0"
        style={{
          backgroundColor: color,
          WebkitMaskImage: `url(${customIcon})`,
          maskImage: `url(${customIcon})`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        }}
      />
    )
  }
  return (
    <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center">
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
    </span>
  )
}

function FileTree({ node, path = '', activePath, onSelectFile, depth = 0, isLight }) {
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
          <ChevronRightIcon expanded={expanded} />
          <FileTreeFolderIcon isLight={isLight} />
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
