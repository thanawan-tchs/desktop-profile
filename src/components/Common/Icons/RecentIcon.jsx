const RecentIcon = ({ className = 'h-4 w-4' }) => {
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
      <polyline points="11.9 5.9 11.9 11.9 12 12 14.1 14.1" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

export default RecentIcon
