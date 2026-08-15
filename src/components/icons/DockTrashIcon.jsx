function DockTrashIcon({ className }) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <rect width="44" height="44" rx="11" fill="#c7ccd4" />
      <path
        d="M14 16h16l-1.4 17a2 2 0 0 1-2 1.8H17.4a2 2 0 0 1-2-1.8z"
        fill="#fff"
        stroke="#8b909a"
        strokeWidth="1.2"
      />
      <path
        d="M12 13h20M18 13V10.6A1.6 1.6 0 0 1 19.6 9h4.8A1.6 1.6 0 0 1 26 10.6V13"
        stroke="#8b909a"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default DockTrashIcon
