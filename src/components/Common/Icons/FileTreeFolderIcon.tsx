import { Folder } from 'lucide-react'

const FileTreeFolderIcon = ({ isLight, className = 'h-3 w-3.5' }) => (
  <Folder
    className={`${className} shrink-0 ${isLight ? 'text-[#90caf9]' : 'text-[#42a5f5]'}`}
    fill="currentColor"
    strokeWidth={0}
    aria-hidden="true"
  />
)

export default FileTreeFolderIcon
