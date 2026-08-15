const FinderSidebarTrashIcon = ({ className = 'h-3.5 w-3.5 shrink-0 text-black/35' }) => {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path
        d="M5.5 6.5h9l-.7 9.3a1.4 1.4 0 0 1-1.4 1.3H7.6a1.4 1.4 0 0 1-1.4-1.3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M4 6.5h12M7.5 6.5V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default FinderSidebarTrashIcon
