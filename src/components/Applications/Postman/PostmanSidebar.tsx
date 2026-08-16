import { COLLECTION, type SavedRequest } from './postmanCollection'

const METHOD_COLORS = {
  GET: 'text-[#2e7d32]',
  POST: 'text-[#f9a825]',
  PUT: 'text-[#1565c0]',
  DELETE: 'text-[#d32f2f]',
}

const PostmanSidebar = ({
  width,
  onResizeStart,
  activeUrl,
  onSelectRequest,
  isLight,
}: {
  width: number
  onResizeStart: (event: React.PointerEvent) => void
  activeUrl: string
  onSelectRequest: (request: SavedRequest) => void
  isLight: boolean
}) => (
  <div
    className={`relative flex shrink-0 flex-col border-r ${isLight ? 'border-black/10 bg-[#f3f3f3]' : 'border-black/40 bg-[#252526]'}`}
    style={{ width }}
  >
    <div
      className={`px-3 py-2.5 text-[11px] font-semibold tracking-wide uppercase ${isLight ? 'text-black/40' : 'text-white/40'}`}
    >
      Collections
    </div>
    <div className="px-2 pb-2 text-xs">
      <div className={`px-1.5 py-1 font-medium ${isLight ? 'text-black/70' : 'text-white/70'}`}>
        {COLLECTION.name}
      </div>
      <div className="mt-0.5 flex flex-col gap-0.5">
        {COLLECTION.requests.map((request) => {
          const isActive = activeUrl === request.url
          return (
            <button
              key={request.id}
              type="button"
              onClick={() => onSelectRequest(request)}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-left ${
                isActive
                  ? isLight
                    ? 'bg-black/10 text-black'
                    : 'bg-white/10 text-white'
                  : isLight
                    ? 'text-black/60 hover:bg-black/5'
                    : 'text-white/60 hover:bg-white/5'
              }`}
            >
              <span className={`w-9 shrink-0 text-[10px] font-bold ${METHOD_COLORS[request.method]}`}>
                {request.method}
              </span>
              <span className="truncate">{request.name}</span>
            </button>
          )
        })}
      </div>
    </div>
    <div
      className={`absolute inset-y-0 right-0 w-1.5 cursor-ew-resize touch-none ${
        isLight ? 'hover:bg-black/10' : 'hover:bg-white/10'
      }`}
      onPointerDown={onResizeStart}
    />
  </div>
)

export default PostmanSidebar
