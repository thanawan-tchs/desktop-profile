const ToolbarButton = ({ onClick, disabled = false, isLight, children, label }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full disabled:pointer-events-none disabled:opacity-30 ${
      isLight ? 'text-black/60 hover:bg-black/5' : 'text-white/60 hover:bg-white/10'
    }`}
  >
    {children}
  </button>
)

export default ToolbarButton
