const ICON_GLYPH_CLASS = 'h-[39px] w-12 drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]'

function DesktopIconGlyph({ type }) {
  switch (type) {
    case 'image':
      return (
        <svg viewBox="0 0 44 52" className={ICON_GLYPH_CLASS} aria-hidden="true">
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
      return (
        <svg viewBox="0 0 44 52" className={ICON_GLYPH_CLASS} aria-hidden="true">
          <path
            d="M6 2h22l10 10v36a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
            fill="#ffffff"
            stroke="#c7ccd4"
            strokeWidth="1"
          />
          <path d="M28 2v8a2 2 0 0 0 2 2h8z" fill="#e3e6ea" />
          <rect x="4" y="29" width="30" height="13" rx="2" fill="#e6483c" />
          <text
            x="19"
            y="38.5"
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="#ffffff"
            fontFamily="Arial, sans-serif"
          >
            PDF
          </text>
        </svg>
      )
    case 'folder':
    default:
      return (
        <svg viewBox="0 0 64 52" className={ICON_GLYPH_CLASS} aria-hidden="true">
          <path
            d="M4 10a4 4 0 0 1 4-4h14l6 6h28a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"
            fill="#8fc4ff"
          />
          <path d="M4 18h56v20a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" fill="#5aa7ff" />
        </svg>
      )
  }
}

function DesktopIcon({ label, type = 'folder', selected, onSelect }) {
  return (
    <button
      type="button"
      className={`flex w-26 flex-col items-center gap-1.5 rounded-lg border-0 bg-transparent px-1 py-2 cursor-default select-none ${
        selected ? 'bg-white/10' : ''
      }`}
      onClick={onSelect}
    >
      <DesktopIconGlyph type={type} />
      <span
        className={`max-w-full whitespace-nowrap rounded px-1.5 text-center text-xs leading-[1.3] text-white ${
          selected ? 'bg-[#2f7bd6]' : '[text-shadow:0_1px_2px_rgba(0,0,0,0.6)]'
        }`}
      >
        {label}
      </span>
    </button>
  )
}

export default DesktopIcon
