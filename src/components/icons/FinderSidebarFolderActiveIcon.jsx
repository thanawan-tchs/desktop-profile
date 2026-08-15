function FinderSidebarFolderActiveIcon({ className = 'h-3.5 w-3.5 shrink-0 text-[#0a84ff]' }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <rect x="2" y="3" width="16" height="11" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 17h6M10 14v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export default FinderSidebarFolderActiveIcon
