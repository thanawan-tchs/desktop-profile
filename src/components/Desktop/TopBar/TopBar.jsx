import { useEffect, useState } from 'react'
import TopBarLeft from './TopBarLeft'
import TopBarRight from './TopBarRight'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const formatDateTime = (date) => {
  const weekday = WEEKDAYS[date.getDay()]
  const day = date.getDate()
  const month = MONTHS[date.getMonth()]
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${weekday} ${day} ${month} ${hours}:${minutes}`
}

const TopBar = ({ activeApp = 'Finder', overlayMode = false, visible = true, onMouseEnter, onMouseLeave }) => {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className={`flex h-[26px] select-none items-center justify-between gap-2 overflow-hidden border-b border-white/[0.15] bg-white/10 px-2.5 text-white backdrop-blur-[20px] backdrop-saturate-[1.8] sm:px-3.5 ${
        overlayMode
          ? `fixed inset-x-0 top-0 z-[9999] transition-opacity duration-150 ${visible ? 'opacity-100' : 'opacity-0'}`
          : 'absolute inset-x-0 top-0 z-10'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <TopBarLeft activeApp={activeApp} />
      <TopBarRight dateTime={formatDateTime(now)} />
    </div>
  )
}

export default TopBar
