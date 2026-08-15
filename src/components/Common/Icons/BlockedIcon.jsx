import { Ban } from 'lucide-react'

const BlockedIcon = ({ className = 'h-6 w-6' }) => (
  <Ban className={className} strokeWidth={1.5} aria-hidden="true" />
)

export default BlockedIcon
