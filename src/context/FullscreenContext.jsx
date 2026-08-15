import { createContext, useContext } from 'react'

export const FullscreenContext = createContext({
  chromeVisible: false,
  setChromeVisible: () => {},
  registerFullscreen: () => {},
})

export const useFullscreen = () => useContext(FullscreenContext)
