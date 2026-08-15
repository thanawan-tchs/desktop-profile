const WifiIcon = ({ className = 'h-[17px] w-[17px]' }) => {
  return (
    <svg className={className} viewBox="0 0 20 16" role="img" aria-label="Wi-Fi">
      <path d="M10 12.6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="currentColor" />
      <path
        d="M4.8 9.4a7.6 7.6 0 0 1 10.4 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M1.6 5.8a12.2 12.2 0 0 1 16.8 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default WifiIcon
