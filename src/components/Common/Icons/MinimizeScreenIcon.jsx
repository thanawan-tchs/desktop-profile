const MinimizeScreenIcon = ({ className = 'h-4 w-4' }) => {
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
      <path d="M8,3V6A2,2,0,0,1,6,8H3" />
      <path d="M16,21V18a2,2,0,0,1,2-2h3" />
      <path d="M8,21V18a2,2,0,0,0-2-2H3" />
      <path d="M16,3V6a2,2,0,0,0,2,2h3" />
    </svg>
  )
}

export default MinimizeScreenIcon
