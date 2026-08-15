import { useEffect, useState } from 'react'
import { AppleLogoIcon, BatteryIcon, LanguageIcon, WifiIcon } from '../icons'
import profile from '../../data/profile.json'

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

const SOCIAL_LINKS = profile.socials

function TopBar({ activeApp = 'Finder' }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-x-0 top-0 z-10 flex h-[26px] select-none items-center justify-between gap-2 overflow-hidden border-b border-white/[0.15] bg-white/10 px-2.5 text-white backdrop-blur-[20px] backdrop-saturate-[1.8] sm:px-3.5">
        <div className="flex min-w-0 items-center gap-2 text-[12px] sm:gap-4 sm:text-[13px]">
        <AppleLogoIcon className="h-3.5 w-3.5" />
        <span className="truncate font-semibold">{activeApp}</span>
        <div className="hidden items-center gap-4 sm:flex">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3.5">
        <WifiIcon className={`${STATUS_ICON_CLASS} hidden sm:block`} />

        <LanguageIcon className={`${STATUS_ICON_CLASS} hidden sm:block`} />

        <span className="hidden items-center gap-1 sm:flex">
          <BatteryIcon className={`${STATUS_ICON_CLASS} h-[13px] w-6`} />
          <span className="text-[12.5px]">82%</span>
        </span>

        <span className="whitespace-nowrap text-[11px] tabular-nums sm:text-[12.5px]">
          {formatDateTime(now)}
        </span>
      </div>
    </div>
  )
}

export default TopBar
