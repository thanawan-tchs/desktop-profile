import FileTree from './FileTree'

const VsCodeSidebar = ({ node, activePath, onSelectFile, isLight, width, onResizeStart }) => (
  <div className="flex shrink-0" style={{ width }}>
    <nav
      className={`min-w-0 flex-1 overflow-y-auto py-2 text-[13px] ${
        isLight ? 'bg-[#f3f3f3]' : 'bg-[#252526]'
      }`}
    >
      <div
        className={`px-3 pb-1 text-[10px] font-semibold tracking-wide uppercase ${
          isLight ? 'text-black/40' : 'text-white/40'
        }`}
      >
        Explorer
      </div>
      <FileTree node={node} activePath={activePath} onSelectFile={onSelectFile} isLight={isLight} />
    </nav>
    <div
      onPointerDown={onResizeStart}
      className={`w-0.5 shrink-0 cursor-ew-resize touch-none ${
        isLight ? 'bg-black/10 hover:bg-black/20' : 'bg-black/50 hover:bg-white/20'
      }`}
    />
  </div>
)

export default VsCodeSidebar
