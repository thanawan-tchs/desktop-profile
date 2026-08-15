const ChevronRightIcon = ({ expanded = false, className = 'h-2.5 w-2.5' }) => {
  return (
    <svg
      viewBox="0 0 10 10"
      className={`${className} shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`}
      aria-hidden="true"
    >
      <path d="M2 1l5 4-5 4z" fill="currentColor" />
    </svg>
  )
}

export default ChevronRightIcon
