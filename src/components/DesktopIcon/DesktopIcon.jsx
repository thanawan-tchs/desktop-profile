function DesktopIcon({ label, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`flex w-26 flex-col items-center gap-1.5 rounded-lg border-0 bg-transparent px-1 py-2 cursor-default select-none ${
        selected ? 'bg-white/10' : ''
      }`}
      onClick={onSelect}
    >
      <svg
        viewBox="0 0 64 52"
        className="h-[39px] w-12 drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
        aria-hidden="true"
      >
        <path
          d="M4 10a4 4 0 0 1 4-4h14l6 6h28a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"
          fill="#8fc4ff"
        />
        <path d="M4 18h56v20a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" fill="#5aa7ff" />
      </svg>
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
