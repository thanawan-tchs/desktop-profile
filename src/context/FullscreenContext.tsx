import { createContext, useContext } from 'react'

export const FullscreenContext = createContext({
  chromeVisible: false,
  setChromeVisible: (_visible: boolean) => {},
  registerFullscreen: (_isFullscreen: boolean) => {},
})

export const useFullscreen = () => useContext(FullscreenContext)
