import FileTree from './FileTree'

const VsCodeSidebar = ({ node, activePath, onSelectFile, isLight }) => (
  <nav
    className={`w-48 shrink-0 overflow-y-auto border-r py-2 text-[13px] ${
      isLight ? 'border-black/10 bg-[#f3f3f3]' : 'border-black/40 bg-[#252526]'
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
)

export default VsCodeSidebar
