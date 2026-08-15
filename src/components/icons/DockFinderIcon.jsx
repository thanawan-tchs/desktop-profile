function DockFinderIcon({ className }) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <rect width="44" height="44" rx="11" fill="#3fa9ff" />
      <circle cx="16" cy="19" r="3.2" fill="#0b2f52" />
      <circle cx="28" cy="19" r="3.2" fill="#0b2f52" />
      <path
        d="M12 27c4.5 6 15.5 6 20 0"
        stroke="#0b2f52"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default DockFinderIcon
