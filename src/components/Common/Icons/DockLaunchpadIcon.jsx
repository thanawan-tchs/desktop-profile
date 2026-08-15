const DockLaunchpadIcon = ({ className }) => {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <rect width="44" height="44" rx="11" fill="#2b2b33" />
      {[12, 22, 32].flatMap((cx) =>
        [12, 22, 32].map((cy) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.6" fill="#d9d9de" />
        )),
      )}
    </svg>
  )
}

export default DockLaunchpadIcon
