import FloatingWindow from '../FloatingWindow/FloatingWindow'
import profile from '../../../data/profile.json'

const { person } = profile
const PROMPT_USER = `${person.nickname.toLowerCase()}@portfolio ~ %`

const SESSION_LINES = [
  { type: 'system', text: 'Last login: Sat Aug 15 16:42:03 on ttys000' },
  { type: 'command', text: 'whoami' },
  { type: 'output', text: person.name },
  { type: 'command', text: 'cat role.txt' },
  { type: 'output', text: `${person.title} — 6+ years building web, mobile, and backend systems.` },
  { type: 'command', text: 'ls ~/Desktop' },
  { type: 'output', text: 'Projects  Documents  Screenshot.png  Resume.pdf' },
  { type: 'command', text: 'open Resume.pdf' },
]

const Terminal = ({ onClose, zIndex, onFocus }) => {
  return (
    <FloatingWindow
      title={`${person.nickname.toLowerCase()}@portfolio — zsh`}
      testId="terminal"
      onClose={onClose}
      zIndex={zIndex}
      onFocus={onFocus}
      widthRatio={0.5}
      heightRatio={0.25}
      horizontalBias={0.4}
      verticalBias={0.6}
      minWidth={420}
      minHeight={130}
      theme="light"
    >
      <div className="flex-1 overflow-y-auto bg-black px-4 py-3 font-mono text-[13px] leading-relaxed text-[#f2f2f2]">
        {SESSION_LINES.map((line, index) => {
          if (line.type === 'system') {
            return (
              <div key={index} className="text-white/40">
                {line.text}
              </div>
            )
          }
          if (line.type === 'command') {
            return (
              <div key={index}>
                <span className="text-[#5af78e]">{PROMPT_USER}</span> {line.text}
              </div>
            )
          }
          return (
            <div key={index} className="text-white/80">
              {line.text}
            </div>
          )
        })}
        <div>
          <span className="text-[#5af78e]">{PROMPT_USER}</span>{' '}
          <span className="inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-[#f2f2f2]" />
        </div>
      </div>
    </FloatingWindow>
  )
}

export default Terminal
