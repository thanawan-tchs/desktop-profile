import { MoonIcon, SunIcon } from '../icons'

function ThemeToggleButton({ theme, onToggle }) {
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex h-5 w-5 items-center justify-center rounded ${
        isLight ? 'text-black/50 hover:bg-black/5' : 'text-white/50 hover:bg-white/10'
      }`}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      title={`Switch to ${isLight ? 'dark' : 'light'} theme`}
    >
      {isLight ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}

export default ThemeToggleButton
