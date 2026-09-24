import FileTree from './FileTree'
import { REMOTE_PROJECT } from '../../../data/githubProject'

const VsCodeSidebar = ({ roots, repoStatus, onRetryRepo, activePath, onSelectFile, isLight, width, onResizeStart }) => {
  const mutedText = isLight ? 'text-black/40' : 'text-white/40'

  return (
    <div className="flex shrink-0" style={{ width }}>
      <nav
        className={`min-w-0 flex-1 overflow-y-auto py-2 text-[13px] ${
          isLight ? 'bg-[#f3f3f3]' : 'bg-[#252526]'
        }`}
      >
        <div className={`px-3 pb-1 text-[10px] font-semibold tracking-wide uppercase ${mutedText}`}>Explorer</div>

        {repoStatus === 'loading' && <div className={`px-3 py-1 text-[12px] ${mutedText}`}>Loading {REMOTE_PROJECT.repo}…</div>}
        {repoStatus === 'error' && (
          <div className={`px-3 py-1 text-[12px] ${mutedText}`}>
            Couldn&rsquo;t load {REMOTE_PROJECT.repo} from GitHub.{' '}
            <button type="button" onClick={onRetryRepo} className="underline hover:no-underline">
              Retry
            </button>
          </div>
        )}

        {roots.map((root) => (
          <FileTree key={root.name} node={root} activePath={activePath} onSelectFile={onSelectFile} isLight={isLight} />
        ))}
      </nav>
      <div
        onPointerDown={onResizeStart}
        className={`w-0.5 shrink-0 cursor-ew-resize touch-none ${
          isLight ? 'bg-black/10 hover:bg-black/20' : 'bg-black/50 hover:bg-white/20'
        }`}
      />
    </div>
  )
}

export default VsCodeSidebar
