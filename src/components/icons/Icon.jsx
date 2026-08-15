import { ICON_REGISTRY } from './iconRegistry'

const Icon = ({ name, ...props }) => {
  const IconComponent = ICON_REGISTRY[name]
  if (!IconComponent) return null
  return <IconComponent {...props} />
}

export default Icon
