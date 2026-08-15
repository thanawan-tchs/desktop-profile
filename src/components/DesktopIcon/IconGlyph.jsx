import folderIcon from '../../assets/icons/folder-logo.png'
import pdfIcon from '../../assets/icons/pdf-file-format.png'
import { Icon } from '../icons'

export const ICON_GLYPH_CLASS = 'h-14 w-16 drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]'

const IconGlyph = ({ type, src, className = ICON_GLYPH_CLASS }) => {
  switch (type) {
    case 'image':
      if (src) {
        return (
          <span
            className={`${className} block overflow-hidden rounded-[3px] border border-black/10 bg-white`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </span>
        )
      }
      return <Icon name="file-document" className={className} />
    case 'pdf':
      return <img src={pdfIcon} alt="" className={`${className} object-contain`} />
    case 'folder':
    default:
      return <img src={folderIcon} alt="" className={`${className} object-contain`} />
  }
}

export default IconGlyph
