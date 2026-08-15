const MaximizeScreenIcon = ({ className = 'h-4 w-4' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3,8V5A2,2,0,0,1,5,3H8" />
      <path d="M21,16v3a2,2,0,0,1-2,2H16" />
      <path d="M3,16v3a2,2,0,0,0,2,2H8" />
      <path d="M21,8V5a2,2,0,0,0-2-2H16" />
    </svg>
  )
}

export default MaximizeScreenIcon
