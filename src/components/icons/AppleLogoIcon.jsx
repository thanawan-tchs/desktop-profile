import appleIcon from '../../assets/icons/appleIcon.webp'

const AppleLogoIcon = ({ className = 'h-3.5 w-3.5' }) => {
  return (
    <svg viewBox="0 0 2000 2200" className={`${className} shrink-0`} aria-hidden="true">
      <mask id="apple-icon-mask">
        <image href={appleIcon} width="2000" height="2200" filter="invert(1)" />
      </mask>
      <rect width="2000" height="2200" fill="#ffffff" mask="url(#apple-icon-mask)" />
    </svg>
  )
}

export default AppleLogoIcon
