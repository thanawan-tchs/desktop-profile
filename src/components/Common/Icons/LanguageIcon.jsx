const LanguageIcon = ({ className = 'h-[17px] w-[17px]' }) => {
  return (
    <svg className={className} viewBox="0 0 20 20" role="img" aria-label="Language">
      <rect x="2" y="3" width="16" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <text
        x="10"
        y="14"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="currentColor"
        fontFamily="Arial, sans-serif"
      >
        A
      </text>
    </svg>
  )
}

export default LanguageIcon
