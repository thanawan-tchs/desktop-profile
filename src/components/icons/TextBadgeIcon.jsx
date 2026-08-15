const TextBadgeIcon = ({ label, color, fontSize = 8.5, className = 'h-3.5 w-3.5' }) => {
  return (
    <svg viewBox="0 0 16 16" className={`${className} shrink-0`} aria-hidden="true">
      <text
        x="8"
        y="11.5"
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight="700"
        fill={color}
        fontFamily="Arial, sans-serif"
      >
        {label}
      </text>
    </svg>
  )
}

export default TextBadgeIcon
