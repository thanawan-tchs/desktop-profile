import { Icon, ICON_NAMES } from '../icons'

const STATUS_ICON_CLASS = 'block h-[17px] w-[17px] text-white'

const TopBarRight = ({ dateTime }) => {
  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-3.5">
      <Icon name={ICON_NAMES.LANGUAGE} className={`${STATUS_ICON_CLASS} hidden sm:block`} />
      <Icon name={ICON_NAMES.WIFI} className={`${STATUS_ICON_CLASS} hidden sm:block`} />

      <span className="hidden items-center gap-1 sm:flex">
        <Icon name={ICON_NAMES.BATTERY} className={`${STATUS_ICON_CLASS} h-[13px] w-6`} />
        <span className="text-[13.5px] font-medium">82%</span>
      </span>

      <span className="whitespace-nowrap text-[12px] font-medium tabular-nums sm:text-[13.5px]">{dateTime}</span>
    </div>
  )
}

export default TopBarRight
