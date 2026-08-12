import { useState } from 'react'
import DesktopIcon from '../DesktopIcon/DesktopIcon'
import Dock from '../Dock/Dock'
import TopBar from '../TopBar/TopBar'

const DESKTOP_ITEMS = [
  { id: 'projects', label: 'Projects' },
  { id: 'documents', label: 'Documents' },
  { id: 'screenshots', label: 'Screenshots' },
  { id: 'resume', label: 'Resume.pdf' },
]

function Desktop() {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-[linear-gradient(160deg,#6dd5fa_0%,#4facfe_35%,#7367f0_70%,#a86bd6_100%)]"
      onClick={() => setSelectedId(null)}
    >
      <TopBar />

      <div className="absolute top-10 right-1.5 flex flex-col items-center gap-1">
        {DESKTOP_ITEMS.map((item) => (
          <DesktopIcon
            key={item.id}
            label={item.label}
            selected={selectedId === item.id}
            onSelect={(event) => {
              event.stopPropagation()
              setSelectedId(item.id)
            }}
          />
        ))}
      </div>

      <Dock />
    </div>
  )
}

export default Desktop
