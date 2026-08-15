import { Icon, ICON_NAMES } from '../../Common/Icons'

const hostOf = (url) => {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

// Mimics Chrome's native ERR_CONNECTION_REFUSED page — shown when the mock
// dev server tab is open but "npm run dev" isn't currently running.
const ConnectionRefusedPage = ({ url, isLight, onReload }) => (
  <div
    className={`h-full w-full overflow-y-auto px-10 py-14 sm:px-16 ${
      isLight ? 'bg-white text-[#202124]' : 'bg-[#202124] text-[#e8eaed]'
    }`}
  >
    <div className="max-w-md">
      <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full ${isLight ? 'bg-black/5' : 'bg-white/5'}`}>
        <Icon name={ICON_NAMES.BLOCKED} className={`h-6 w-6 ${isLight ? 'text-black/30' : 'text-white/30'}`} />
      </div>

      <h1 className="text-xl font-normal">This site can&rsquo;t be reached</h1>
      <p className={`mt-3 text-sm ${isLight ? 'text-black/70' : 'text-white/70'}`}>
        {hostOf(url)} refused to connect.
      </p>

      <p className={`mt-6 text-sm ${isLight ? 'text-black/70' : 'text-white/70'}`}>Try:</p>
      <ul className={`mt-1 list-disc space-y-0.5 pl-5 text-sm ${isLight ? 'text-black/70' : 'text-white/70'}`}>
        <li>Checking the connection</li>
        <li>Checking the proxy and the firewall</li>
      </ul>

      <button
        type="button"
        onClick={onReload}
        className={`mt-6 rounded border px-3 py-1.5 text-xs font-medium tracking-wide uppercase ${
          isLight
            ? 'border-black/15 text-[#1a73e8] hover:bg-black/5'
            : 'border-white/15 text-[#8ab4f8] hover:bg-white/5'
        }`}
      >
        Reload
      </button>

      <p className={`mt-8 text-[11px] tracking-wide uppercase ${isLight ? 'text-black/35' : 'text-white/35'}`}>
        ERR_CONNECTION_REFUSED
      </p>
    </div>
  </div>
)

export default ConnectionRefusedPage
