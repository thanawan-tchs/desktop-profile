const DownloadIcon = ({ className = 'h-4 w-4' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7" />
      <polyline points="7.9 12.3 12 16.3 16.1 12.3" />
      <line x1="12" x2="12" y1="2.7" y2="14.2" />
    </svg>
  )
}

export default DownloadIcon
