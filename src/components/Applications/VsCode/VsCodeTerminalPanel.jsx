import VsCodeTerminal from './VsCodeTerminal'

const VsCodeTerminalPanel = ({ height, onResizeStart, isLight, onRunDev, onStopDev }) => (
  <div className="flex shrink-0 flex-col" style={{ height }}>
    <div
      onPointerDown={onResizeStart}
      className={`h-1 shrink-0 cursor-ns-resize touch-none ${
        isLight ? 'bg-black/10 hover:bg-black/20' : 'bg-black/50 hover:bg-white/20'
      }`}
    />
    <div className="min-h-0 flex-1">
      <VsCodeTerminal isLight={isLight} onRunDev={onRunDev} onStopDev={onStopDev} />
    </div>
  </div>
)

export default VsCodeTerminalPanel
