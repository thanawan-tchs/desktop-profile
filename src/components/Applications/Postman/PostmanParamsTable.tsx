import { X } from 'lucide-react'
import type { ParamRow } from './queryParams'

// Also reused as the form-data editor in the Body tab — it's the same
// key/value/description grid either way.
const PostmanParamsTable = ({
  params,
  onChangeKey,
  onChangeValue,
  onChangeDescription,
  onDeleteRow,
  getDescription,
  isLight = false,
}: {
  params: ParamRow[]
  onChangeKey: (index: number, key: string) => void
  onChangeValue: (index: number, value: string) => void
  onChangeDescription: (key: string, description: string) => void
  onDeleteRow: (index: number) => void
  getDescription: (key: string) => string
  isLight?: boolean
}) => {
  // A trailing blank row is always present so there's somewhere to type the
  // next param — it has no delete button since it isn't a real row yet.
  const rows = [...params, { key: '', value: '' }]

  const cellInputClass = `w-full min-w-0 bg-transparent px-1.5 py-1 outline-none ${
    isLight ? 'placeholder:text-black/25' : 'placeholder:text-white/25'
  }`
  const keyColor = isLight ? 'text-[#0451a5]' : 'text-[#9cdcfe]'
  const valueColor = isLight ? 'text-[#a31515]' : 'text-[#ce9178]'
  const descriptionColor = isLight ? 'text-black/60' : 'text-white/70'

  return (
    <table className="w-full border-collapse text-xs">
      <thead>
        <tr
          className={`border-b text-left ${isLight ? 'border-black/10 text-black/40' : 'border-black/40 text-white/40'}`}
        >
          <th className="w-6 px-2 py-1.5 font-normal" />
          <th className="px-2 py-1.5 font-normal">Key</th>
          <th className="px-2 py-1.5 font-normal">Value</th>
          <th className="px-2 py-1.5 font-normal">Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const isBlankRow = index === params.length
          return (
            <tr key={index} className={`border-b ${isLight ? 'border-black/5' : 'border-black/20'}`}>
              <td className="px-2 py-1 text-center">
                {!isBlankRow && (
                  <button
                    type="button"
                    onClick={() => onDeleteRow(index)}
                    className={isLight ? 'text-black/30 hover:text-black/70' : 'text-white/30 hover:text-white/70'}
                    aria-label="Delete param"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </td>
              <td>
                <input
                  value={row.key}
                  onChange={(event) => onChangeKey(index, event.target.value)}
                  placeholder="key"
                  spellCheck={false}
                  className={`${cellInputClass} font-mono ${keyColor}`}
                />
              </td>
              <td>
                <input
                  value={row.value}
                  onChange={(event) => onChangeValue(index, event.target.value)}
                  placeholder="value"
                  spellCheck={false}
                  className={`${cellInputClass} font-mono ${valueColor}`}
                />
              </td>
              <td>
                <input
                  value={getDescription(row.key)}
                  onChange={(event) => onChangeDescription(row.key, event.target.value)}
                  placeholder="description"
                  disabled={isBlankRow}
                  className={`${cellInputClass} ${descriptionColor} disabled:cursor-not-allowed`}
                />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default PostmanParamsTable
