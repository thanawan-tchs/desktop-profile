import FloatingWindow from '../FloatingWindow/FloatingWindow'

const ImageViewer = ({ onClose, zIndex, onFocus, src, title = 'Preview' }) => {
  return (
    <FloatingWindow
      title={title}
      testId="image"
      onClose={onClose}
      zIndex={zIndex}
      onFocus={onFocus}
      widthRatio={0.45}
      heightRatio={0.65}
      horizontalBias={0.5}
      verticalBias={0.4}
      minWidth={320}
      minHeight={320}
      theme="light"
    >
      <div className="flex flex-1 items-center justify-center overflow-auto bg-[#3a3a3c] p-4">
        <img src={src} alt={title} className="max-h-full max-w-full rounded-sm object-contain shadow-[0_10px_30px_rgba(0,0,0,0.4)]" />
      </div>
    </FloatingWindow>
  )
}

export default ImageViewer
