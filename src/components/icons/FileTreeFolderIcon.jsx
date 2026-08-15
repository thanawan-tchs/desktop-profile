function FileTreeFolderIcon({ isLight, className = 'h-3 w-3.5' }) {
  return (
    <svg viewBox="0 0 16 14" className={`${className} shrink-0`} aria-hidden="true">
      <path
        d="M1 2.4A1.4 1.4 0 0 1 2.4 1h3.2l1.4 1.4h6.6A1.4 1.4 0 0 1 15 3.8v8.8A1.4 1.4 0 0 1 13.6 14H2.4A1.4 1.4 0 0 1 1 12.6z"
        fill={isLight ? '#90caf9' : '#42a5f5'}
      />
    </svg>
  )
}

export default FileTreeFolderIcon
