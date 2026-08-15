const BatteryIcon = ({ className = 'h-[17px] w-[17px]' }) => {
  return (
    <svg className={className} viewBox="0 0 26 14" role="img" aria-label="Battery">
      <rect x="1" y="1" width="21" height="12" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <rect x="23" y="4.5" width="2" height="5" rx="1" fill="currentColor" />
      <rect x="3" y="3" width="14.5" height="8" rx="1.2" fill="currentColor" />
    </svg>
  )
}

export default BatteryIcon
