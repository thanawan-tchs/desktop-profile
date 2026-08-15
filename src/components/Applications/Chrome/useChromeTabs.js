import { useEffect, useRef, useState } from 'react'
import { DEFAULT_URL, normalizeUrl } from './chromeUrl'

const createTabFactory = () => {
  let nextId = 0
  return (url) => {
    const tab = { id: nextId, history: [url], historyIndex: 0, reloadKey: 0 }
    nextId += 1
    return tab
  }
}

// Owns Chrome's tab list + per-tab navigation history so Chrome.jsx stays layout-only.
export const useChromeTabs = (initialUrl, onLastTabClosed) => {
  const createTabRef = useRef(null)
  if (createTabRef.current === null) createTabRef.current = createTabFactory()
  const createTab = createTabRef.current

  const [tabs, setTabs] = useState(() => [createTab(initialUrl ?? DEFAULT_URL)])
  const [activeTabId, setActiveTabId] = useState(() => tabs[0].id)
  const [addressInput, setAddressInput] = useState(() => tabs[0].history[0])

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0]
  const activeUrl = activeTab.history[activeTab.historyIndex]

  useEffect(() => {
    setAddressInput(activeUrl)
  }, [activeUrl])

  const updateActiveTab = (updater) => {
    setTabs((prev) => prev.map((tab) => (tab.id === activeTabId ? updater(tab) : tab)))
  }

  const navigateTo = (rawInput) => {
    const nextUrl = normalizeUrl(rawInput)
    updateActiveTab((tab) => ({
      ...tab,
      history: [...tab.history.slice(0, tab.historyIndex + 1), nextUrl],
      historyIndex: tab.historyIndex + 1,
    }))
  }

  const goBack = () => {
    if (activeTab.historyIndex === 0) return
    updateActiveTab((tab) => ({ ...tab, historyIndex: tab.historyIndex - 1 }))
  }

  const goForward = () => {
    if (activeTab.historyIndex >= activeTab.history.length - 1) return
    updateActiveTab((tab) => ({ ...tab, historyIndex: tab.historyIndex + 1 }))
  }

  const reload = () => updateActiveTab((tab) => ({ ...tab, reloadKey: tab.reloadKey + 1 }))

  const openNewTab = () => {
    const tab = createTab(DEFAULT_URL)
    setTabs((prev) => [...prev, tab])
    setActiveTabId(tab.id)
  }

  const closeTab = (id) => {
    const index = tabs.findIndex((tab) => tab.id === id)
    if (index === -1) return
    if (tabs.length === 1) {
      onLastTabClosed?.()
      return
    }
    const nextTabs = tabs.filter((tab) => tab.id !== id)
    setTabs(nextTabs)
    if (id === activeTabId) {
      const fallback = nextTabs[index] ?? nextTabs[index - 1]
      setActiveTabId(fallback.id)
    }
  }

  return {
    tabs,
    activeTab,
    activeTabId,
    activeUrl,
    addressInput,
    setAddressInput,
    setActiveTabId,
    navigateTo,
    goBack,
    goForward,
    reload,
    openNewTab,
    closeTab,
  }
}
