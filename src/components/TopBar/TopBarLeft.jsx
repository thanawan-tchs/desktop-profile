import { Icon, ICON_NAMES } from '../icons'
import profile from '../../data/profile.json'

const SOCIAL_LINKS = profile.socials

const TopBarLeft = ({ activeApp }) => {
  return (
    <div className="flex min-w-0 items-center gap-2 text-[13px] sm:gap-4 sm:text-[14px]">
      <Icon name={ICON_NAMES.APPLE_LOGO} className="h-3.5 w-3.5" />
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
  )
}

export default TopBarLeft
