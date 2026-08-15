import { useEffect, useRef, useState } from 'react'

const PROMPT = '➜  my-app git:(main)'

const DEV_SERVER_OUTPUT = [
  '',
  '> my-app@0.0.0 dev',
  '> vite',
  '',
  '  VITE v5.4.8  ready in 312 ms',
  '',
]

const VsCodeTerminal = ({ isLight, onRunDev, onStopDev }) => {
  const [lines, setLines] = useState([])
  const [input, setInput] = useState('npm run dev')
  const [running, setRunning] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, running])

  useEffect(() => {
    if (!running) return undefined

    const handleKeyDown = (event) => {
      if (!event.ctrlKey || event.key.toLowerCase() !== 'c') return
      event.preventDefault()
      setLines((prev) => [...prev, { type: 'command', text: '^C' }])
      setRunning(false)
      setInput('npm run dev')
      onStopDev?.()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (running) return
    const command = input.trim()
    if (!command) return

    if (command.toLowerCase() === 'npm run dev') {
      setLines((prev) => [
        ...prev,
        { type: 'command', text: command },
        ...DEV_SERVER_OUTPUT.map((text) => ({ type: 'output', text })),
        { type: 'accent', text: '  ➜  Local:   http://localhost:5173/' },
        { type: 'output', text: '  ➜  Network: use --host to expose' },
      ])
      setRunning(true)
      setInput('')
      onRunDev?.()
    } else {
      setLines((prev) => [
        ...prev,
        { type: 'command', text: command },
        { type: 'output', text: `zsh: command not found: ${command}` },
      ])
      setInput('')
    }
  }

  return (
    <div className={`flex h-full flex-col font-mono text-[12px] ${isLight ? 'bg-white text-black/80' : 'bg-[#1e1e1e] text-white/80'}`}>
      <div
        className={`flex h-7 shrink-0 items-center border-b px-3 text-[10px] font-semibold tracking-wide uppercase ${
          isLight ? 'border-black/10 text-black/40' : 'border-black/40 text-white/40'
        }`}
      >
        Terminal
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-2">
        {lines.map((line, index) =>
          line.type === 'command' ? (
            <div key={index}>
              <span className="text-[#5af78e]">{PROMPT}</span> {line.text}
            </div>
          ) : (
            <div
              key={index}
              className={line.type === 'accent' ? 'text-[#4fc3f7]' : isLight ? 'text-black/60' : 'text-white/60'}
            >
              {line.text || ' '}
            </div>
          ),
        )}
        <form onSubmit={handleSubmit} className="flex items-center gap-1">
          <span className="shrink-0 text-[#5af78e]">{PROMPT}</span>
          {running ? (
            <span className={isLight ? 'text-black/30' : 'text-white/30'}>
              process running… (press Ctrl+C to stop)
            </span>
          ) : (
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              spellCheck={false}
              className="flex-1 bg-transparent outline-none"
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default VsCodeTerminal
