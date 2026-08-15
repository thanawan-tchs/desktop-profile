import IconGlyph from './IconGlyph'

function DesktopIcon({ label, type = 'folder', src, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`flex w-26 flex-col items-center gap-1.5 rounded-lg border-0 bg-transparent px-1 py-2 cursor-default select-none ${
        selected ? 'bg-white/10' : ''
      }`}
      onClick={onSelect}
    >
      <IconGlyph type={type} src={src} />
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
