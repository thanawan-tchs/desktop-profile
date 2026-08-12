import { useEffect, useState } from 'react'
import appleIcon from '../../assets/appleIcon.webp'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

function formatDateTime(date) {
  const weekday = WEEKDAYS[date.getDay()]
  const day = date.getDate()
  const month = MONTHS[date.getMonth()]
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${weekday} ${day} ${month} ${hours}:${minutes}`
}

const STATUS_ICON_CLASS = 'block h-[17px] w-[17px] text-white'

const MENU_ITEMS = ['File', 'Edit', 'Insert', 'Format', 'View', 'Window', 'Help']

function TopBar() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-x-0 top-0 z-10 flex h-[26px] select-none items-center justify-between border-b border-white/[0.15] bg-white/10 px-3.5 text-white backdrop-blur-[20px] backdrop-saturate-[1.8]">
        <div className="flex items-center gap-4 text-[13px]">
        <svg viewBox="0 0 2000 2200" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
          <mask id="apple-icon-mask">
            <image href={appleIcon} width="2000" height="2200" filter="invert(1)" />
          </mask>
          <rect width="2000" height="2200" fill="#ffffff" mask="url(#apple-icon-mask)" />
        </svg>
        <span className="font-semibold">Obsidian</span>
        {MENU_ITEMS.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="flex items-center gap-3.5">
        <svg className={STATUS_ICON_CLASS} viewBox="0 0 20 16" role="img" aria-label="Wi-Fi">
          <path d="M10 12.6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="currentColor" />
          <path
            d="M4.8 9.4a7.6 7.6 0 0 1 10.4 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M1.6 5.8a12.2 12.2 0 0 1 16.8 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>

        <svg className={STATUS_ICON_CLASS} viewBox="0 0 20 20" role="img" aria-label="Language">
          <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <ellipse cx="10" cy="10" rx="3.4" ry="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.4" />
        </svg>

        <span className="flex items-center gap-1">
          <svg
            className={`${STATUS_ICON_CLASS} h-[13px] w-6`}
            viewBox="0 0 26 14"
            role="img"
            aria-label="Battery"
          >
            <rect x="1" y="1" width="21" height="12" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <rect x="23" y="4.5" width="2" height="5" rx="1" fill="currentColor" />
            <rect x="3" y="3" width="14.5" height="8" rx="1.2" fill="currentColor" />
          </svg>
          <span className="text-[12.5px]">82%</span>
        </span>

        <span className="whitespace-nowrap text-[12.5px] tabular-nums">{formatDateTime(now)}</span>
      </div>
    </div>
  )
}

export default TopBar
