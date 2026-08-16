import PostmanParamsTable from './PostmanParamsTable'
import PostmanRawBodyEditor from './PostmanRawBodyEditor'
import type { ParamRow } from './queryParams'

export type BodyType = 'none' | 'form-data' | 'raw'
export type RawSubType = 'json' | 'text' | 'html'

const RAW_PLACEHOLDERS: Record<RawSubType, string> = {
  json: '{\n  "key": "value"\n}',
  text: 'Plain text body',
  html: '<div>\n  \n</div>',
}

const PostmanBodyEditor = ({
  bodyType,
  onChangeBodyType,
  rawSubType,
  onChangeRawSubType,
  rawBody,
  onChangeRawBody,
  formDataRows,
  onChangeFormDataKey,
  onChangeFormDataValue,
  onChangeFormDataDescription,
  onDeleteFormDataRow,
  getFormDataDescription,
  isLight,
}: {
  bodyType: BodyType
  onChangeBodyType: (type: BodyType) => void
  rawSubType: RawSubType
  onChangeRawSubType: (type: RawSubType) => void
  rawBody: string
  onChangeRawBody: (value: string) => void
  formDataRows: ParamRow[]
  onChangeFormDataKey: (index: number, key: string) => void
  onChangeFormDataValue: (index: number, value: string) => void
  onChangeFormDataDescription: (key: string, description: string) => void
  onDeleteFormDataRow: (index: number) => void
  getFormDataDescription: (key: string) => string
  isLight: boolean
}) => {
  const mutedText = isLight ? 'text-black/40' : 'text-white/40'
  const selectClass = `rounded-md border px-2 py-1 text-xs ${
    isLight ? 'border-black/10 bg-[#f5f5f7] text-black/70' : 'border-black/40 bg-[#2a2a2a] text-[#dcdcdc]'
  }`

  // Only offered for JSON — beautifying HTML/plain text would need a real
  // formatter, and JSON.parse already gives us free validation for free.
  const isBeautifiable = rawSubType === 'json' && rawBody.trim().length > 0
  let isValidJson = true
  if (isBeautifiable) {
    try {
      JSON.parse(rawBody)
    } catch {
      isValidJson = false
    }
  }

  const handleBeautify = () => {
    try {
      onChangeRawBody(JSON.stringify(JSON.parse(rawBody), null, 2))
    } catch {
      // Leave invalid JSON untouched — the button is disabled in this case anyway.
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div
        className={`flex items-center gap-4 border-b px-3 py-2 text-xs ${isLight ? 'border-black/10' : 'border-black/40'}`}
      >
        {(['none', 'form-data', 'raw'] as const).map((type) => (
          <label key={type} className="flex cursor-pointer items-center gap-1.5">
            <input
              type="radio"
              name="postman-body-type"
              checked={bodyType === type}
              onChange={() => onChangeBodyType(type)}
              className="accent-[#ff6c37]"
            />
            <span className={bodyType === type ? (isLight ? 'text-black' : 'text-white') : mutedText}>{type}</span>
          </label>
        ))}
        {bodyType === 'raw' && (
          <select
            value={rawSubType}
            onChange={(event) => onChangeRawSubType(event.target.value as RawSubType)}
            className={selectClass}
          >
            <option value="json">JSON</option>
            <option value="text">Text</option>
            <option value="html">HTML</option>
          </select>
        )}
        {bodyType === 'raw' && rawSubType === 'json' && (
          <button
            type="button"
            onClick={handleBeautify}
            disabled={!isBeautifiable || !isValidJson}
            title={!isValidJson ? 'Invalid JSON' : undefined}
            className={`ml-auto rounded-md px-2 py-1 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40 ${
              isLight ? 'text-black/50 hover:bg-black/5' : 'text-white/50 hover:bg-white/10'
            }`}
          >
            Beautify
          </button>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        {bodyType === 'none' && (
          <div className={`flex h-full items-center justify-center text-xs ${mutedText}`}>
            This request does not have a body
          </div>
        )}
        {bodyType === 'form-data' && (
          <PostmanParamsTable
            params={formDataRows}
            onChangeKey={onChangeFormDataKey}
            onChangeValue={onChangeFormDataValue}
            onChangeDescription={onChangeFormDataDescription}
            onDeleteRow={onDeleteFormDataRow}
            getDescription={getFormDataDescription}
            isLight={isLight}
          />
        )}
        {bodyType === 'raw' && (
          <PostmanRawBodyEditor
            value={rawBody}
            onChange={onChangeRawBody}
            subType={rawSubType}
            placeholder={RAW_PLACEHOLDERS[rawSubType]}
            isLight={isLight}
          />
        )}
      </div>
    </div>
  )
}

export default PostmanBodyEditor
