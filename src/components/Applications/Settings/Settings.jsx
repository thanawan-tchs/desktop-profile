import FloatingWindow from '../FloatingWindow/FloatingWindow'
import { WALLPAPERS } from '../../../data/wallpapers'

const Settings = ({ onClose, zIndex, onFocus, wallpaperId, onSelectWallpaper }) => {
  return (
    <FloatingWindow
      title="Wallpaper"
      onClose={onClose}
      zIndex={zIndex}
      onFocus={onFocus}
      widthRatio={0.4}
      heightRatio={0.42}
      horizontalBias={0.5}
      verticalBias={0.5}
      minWidth={380}
      minHeight={280}
      theme="light"
    >
      <div className="flex-1 overflow-y-auto bg-[#f5f5f7] p-6">
        <h2 className="mb-4 text-sm font-semibold text-black/70">Choose a wallpaper</h2>
        <div className="grid grid-cols-2 gap-4">
          {WALLPAPERS.map((item) => {
            const isSelected = item.id === wallpaperId
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectWallpaper(item.id)}
                className="flex flex-col items-center gap-2"
              >
                <span
                  className={`block aspect-video w-full overflow-hidden rounded-lg border-2 ${
                    isSelected ? 'border-[#0a84ff]' : 'border-transparent'
                  }`}
                >
                  <img src={item.src} alt={item.label} className="h-full w-full object-cover" />
                </span>
                <span className={`text-xs ${isSelected ? 'font-semibold text-[#0a58ca]' : 'text-black/70'}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </FloatingWindow>
  )
}

export default Settings
