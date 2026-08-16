const isLightTheme = (theme: string) => theme === 'light'

export const getContainerClassName = (theme: string, isFullscreen: boolean) => {
  const isLight = isLightTheme(theme)
  return isFullscreen
    ? `absolute inset-0 flex flex-col overflow-hidden ${isLight ? 'bg-white text-[#2a2a2a]' : 'bg-[#1e1e1e] text-[#dcdcdc]'}`
    : `absolute flex flex-col overflow-hidden rounded-xl border shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${
        isLight ? 'border-black/10 bg-white text-[#2a2a2a]' : 'border-black/40 bg-[#1e1e1e] text-[#dcdcdc]'
      }`
}

export const getTitleBarClassName = (theme: string, isFullscreen: boolean, chromeVisible: boolean) => {
  const isLight = isLightTheme(theme)
  return `flex h-9 shrink-0 items-center border-b px-3 ${
    isLight ? 'border-black/10 bg-[#e8e8e8]' : 'border-black/50 bg-[#2a2a2a]'
  } ${
    isFullscreen
      ? // 26px matches TOPBAR_HEIGHT — sits directly under the revealed desktop menu bar
        `absolute inset-x-0 top-[26px] z-[9999] transition-opacity duration-150 ${
          chromeVisible ? 'opacity-100' : 'opacity-0'
        }`
      : 'cursor-grab touch-none active:cursor-grabbing'
  }`
}

export const getTitleTextClassName = (theme: string) =>
  `flex-1 select-none text-center text-xs font-medium ${isLightTheme(theme) ? 'text-black/60' : 'text-white/60'}`
