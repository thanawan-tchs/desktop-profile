import folderIcon from '../../assets/icons/folder-logo.png'
import pdfIcon from '../../assets/icons/pdf-file-format.png'

export const ICON_GLYPH_CLASS = 'h-[39px] w-12 drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]'

function IconGlyph({ type, src, className = ICON_GLYPH_CLASS }) {
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
      return (
        <svg viewBox="0 0 44 52" className={className} aria-hidden="true">
          <path
            d="M6 2h22l10 10v36a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
            fill="#ffffff"
            stroke="#c7ccd4"
            strokeWidth="1"
          />
          <path d="M28 2v8a2 2 0 0 0 2 2h8z" fill="#e3e6ea" />
          <rect x="6" y="16" width="28" height="20" rx="1.5" fill="#eaf3ff" />
          <circle cx="14" cy="23" r="3" fill="#ffce54" />
          <path d="M6 34l8-9 6 6 6-8 8 11v2H6z" fill="#7bb3f2" />
        </svg>
      )
    case 'pdf':
      return <img src={pdfIcon} alt="" className={`${className} object-contain`} />
    case 'folder':
    default:
      return <img src={folderIcon} alt="" className={`${className} object-contain`} />
  }
}

export default IconGlyph
