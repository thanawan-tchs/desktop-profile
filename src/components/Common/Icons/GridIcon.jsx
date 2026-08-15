const GridIcon = ({ className = 'h-4 w-4' }) => {
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
      <rect height="7" width="7" x="14.5" y="2.5" />
      <rect height="7" width="7" x="14.5" y="14.5" />
      <rect height="7" width="7" x="2.5" y="2.5" />
      <rect height="7" width="7" x="2.5" y="14.5" />
    </svg>
  )
}

export default GridIcon
