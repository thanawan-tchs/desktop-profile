import { ChevronRight } from 'lucide-react'

const ChevronRightIcon = ({ expanded = false, className = 'h-2.5 w-2.5' }) => (
  <ChevronRight
    className={`${className} shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`}
    aria-hidden="true"
  />
)

export default ChevronRightIcon
