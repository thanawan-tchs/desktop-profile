const LanguageIcon = ({ className = 'h-[17px] w-[17px]' }) => {
  return (
    <svg className={className} viewBox="0 0 20 20" role="img" aria-label="Language">
      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="10" cy="10" rx="3.4" ry="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export default LanguageIcon
