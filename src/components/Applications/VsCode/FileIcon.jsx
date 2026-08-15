import jsonFileIcon from '../../../assets/icons/json-file-icon.png'
import htmlIcon from '../../../assets/icons/html-icon.png'
import { Icon, ICON_NAMES } from '../../Icons'

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

const extensionOf = (name) => {
  const parts = name.split('.')
  return parts.length > 1 ? parts[parts.length - 1] : ''
}

const FileIcon = ({ name }) => {
  const ext = extensionOf(name)
  const badge = EXTENSION_BADGES[ext]
  if (badge) {
    return <Icon name={ICON_NAMES.TEXT_BADGE} label={badge.label} color={badge.color} fontSize={badge.fontSize} />
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

export default FileIcon
