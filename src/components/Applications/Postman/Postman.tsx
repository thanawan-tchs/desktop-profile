import { useState } from 'react'
import FloatingWindow from '../FloatingWindow/FloatingWindow'
import ThemeToggleButton from '../../Common/ThemeToggleButton/ThemeToggleButton'
import PostmanSidebar from './PostmanSidebar'
import PostmanParamsTable from './PostmanParamsTable'
import PostmanBodyEditor, { type BodyType, type RawSubType } from './PostmanBodyEditor'
import PostmanResponsePanel from './PostmanResponsePanel'
import { usePanelResize } from '../../Common/usePanelResize'
import { sendMockRequest, type MockResponse } from './postmanApi'
import { DEFAULT_REQUEST, type SavedRequest } from './postmanCollection'
import { splitUrl, parseParams, buildQuery, type ParamRow } from './queryParams'

const METHODS = ['GET', 'POST', 'PUT', 'DELETE']

const METHOD_COLORS = {
  GET: 'text-[#2e7d32]',
  POST: 'text-[#f9a825]',
  PUT: 'text-[#1565c0]',
  DELETE: 'text-[#d32f2f]',
}

const REQUEST_TABS = ['params', 'headers', 'body'] as const

const buildRequestBody = (bodyType: BodyType, rawSubType: RawSubType, rawBody: string, formDataRows: ParamRow[]) => {
  if (bodyType === 'none') return undefined
  if (bodyType === 'form-data') {
    return Object.fromEntries(formDataRows.filter((row) => row.key).map((row) => [row.key, row.value]))
  }
  if (rawSubType === 'json') {
    try {
      return JSON.parse(rawBody)
    } catch {
      return rawBody
    }
  }
  return rawBody
}

const Postman = ({ onClose, zIndex, onFocus }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const isLight = theme === 'light'

  const [method, setMethod] = useState(DEFAULT_REQUEST.method)
  const [url, setUrl] = useState(DEFAULT_REQUEST.url)
  const [descriptions, setDescriptions] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState<(typeof REQUEST_TABS)[number]>('params')
  const [isSending, setIsSending] = useState(false)
  const [response, setResponse] = useState<MockResponse | null>(null)

  const [bodyType, setBodyType] = useState<BodyType>('none')
  const [rawSubType, setRawSubType] = useState<RawSubType>('json')
  const [rawBody, setRawBody] = useState('')
  const [formDataRows, setFormDataRows] = useState<ParamRow[]>([])
  const [formDataDescriptions, setFormDataDescriptions] = useState<Record<string, string>>({})

  const { size: sidebarWidth, handleResizePointerDown } = usePanelResize({
    axis: 'width',
    initialSize: 220,
    minSize: 160,
    maxSize: 340,
  })

  // Handle sits above the response panel, so dragging up (toward the request
  // section) should grow it — same invert:true trick as VS Code's terminal.
  const { size: responseHeight, handleResizePointerDown: handleResponseResizeStart } = usePanelResize({
    axis: 'height',
    initialSize: 260,
    minSize: 140,
    maxSize: 560,
    invert: true,
  })

  // The URL is the single source of truth — the Params table below is just
  // parsed out of its query string, and writing to the table rebuilds it.
  const { base, query } = splitUrl(url)
  const paramRows = parseParams(query)

  const applyParamRows = (rows: ParamRow[]) => {
    const nextQuery = buildQuery(rows)
    setUrl(nextQuery ? `${base}?${nextQuery}` : base)
  }

  const handleChangeParamKey = (index: number, key: string) => {
    const rows = [...paramRows]
    rows[index] = { ...(rows[index] ?? { key: '', value: '' }), key }
    applyParamRows(rows)
  }

  const handleChangeParamValue = (index: number, value: string) => {
    const rows = [...paramRows]
    rows[index] = { ...(rows[index] ?? { key: '', value: '' }), value }
    applyParamRows(rows)
  }

  const handleDeleteParamRow = (index: number) => {
    applyParamRows(paramRows.filter((_, i) => i !== index))
  }

  const handleChangeDescription = (key: string, description: string) => {
    setDescriptions((prev) => ({ ...prev, [key]: description }))
  }

  const handleChangeFormDataKey = (index: number, key: string) => {
    setFormDataRows((prev) => {
      const rows = [...prev]
      rows[index] = { ...(rows[index] ?? { key: '', value: '' }), key }
      return rows
    })
  }

  const handleChangeFormDataValue = (index: number, value: string) => {
    setFormDataRows((prev) => {
      const rows = [...prev]
      rows[index] = { ...(rows[index] ?? { key: '', value: '' }), value }
      return rows
    })
  }

  const handleDeleteFormDataRow = (index: number) => {
    setFormDataRows((prev) => prev.filter((_, i) => i !== index))
  }

  const handleChangeFormDataDescription = (key: string, description: string) => {
    setFormDataDescriptions((prev) => ({ ...prev, [key]: description }))
  }

  const handleSelectRequest = (request: SavedRequest) => {
    setMethod(request.method)
    setUrl(request.url)
    setDescriptions({})
    setBodyType('none')
    setRawBody('')
    setFormDataRows([])
    setFormDataDescriptions({})
    setResponse(null)
  }

  const handleSend = async () => {
    setIsSending(true)
    const result = await sendMockRequest(method, url, buildRequestBody(bodyType, rawSubType, rawBody, formDataRows))
    setResponse(result)
    setIsSending(false)
  }

  const borderClass = isLight ? 'border-black/10' : 'border-black/40'

  return (
    <FloatingWindow
      title="Portfolio API — Postman"
      testId="postman"
      onClose={onClose}
      zIndex={zIndex}
      onFocus={onFocus}
      widthRatio={0.62}
      heightRatio={0.68}
      horizontalBias={0.5}
      verticalBias={0.35}
      minWidth={620}
      minHeight={420}
      theme={theme}
      headerRight={
        <ThemeToggleButton theme={theme} onToggle={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))} />
      }
    >
      <div
        className={`flex min-w-0 flex-1 overflow-hidden ${isLight ? 'bg-white text-[#2a2a2a]' : 'bg-[#1e1e1e] text-[#dcdcdc]'}`}
      >
        <PostmanSidebar
          width={sidebarWidth}
          onResizeStart={handleResizePointerDown}
          activeUrl={url}
          onSelectRequest={handleSelectRequest}
          isLight={isLight}
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className={`flex items-center gap-2 border-b px-3 py-2.5 ${borderClass}`}>
            <select
              value={method}
              onChange={(event) => setMethod(event.target.value)}
              className={`shrink-0 rounded-md border px-2 py-1.5 text-xs font-bold ${METHOD_COLORS[method]} ${
                isLight ? 'border-black/10 bg-[#f5f5f7]' : 'border-black/40 bg-[#2a2a2a]'
              }`}
            >
              {METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              spellCheck={false}
              className={`min-w-0 flex-1 rounded-md border px-3 py-1.5 font-mono text-xs outline-none focus:border-[#ff6c37] ${
                isLight ? 'border-black/10 bg-[#f5f5f7] text-black/80' : 'border-black/40 bg-[#2a2a2a] text-[#dcdcdc]'
              }`}
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={isSending}
              className="shrink-0 rounded-md bg-[#ff6c37] px-4 py-1.5 text-xs font-semibold text-white hover:brightness-110 disabled:opacity-60"
            >
              {isSending ? 'Sending…' : 'Send'}
            </button>
          </div>

          <div
            data-testid="postman-request-tabs"
            className={`flex gap-4 border-b px-3 text-xs ${borderClass} ${isLight ? 'text-black/50' : 'text-white/50'}`}
          >
            {REQUEST_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 py-2 capitalize ${
                  activeTab === tab
                    ? `border-[#ff6c37] ${isLight ? 'text-black' : 'text-white'}`
                    : `border-transparent ${isLight ? 'hover:text-black/80' : 'hover:text-white/80'}`
                }`}
              >
                {tab}
                {tab === 'params' && paramRows.length > 0 && (
                  <span className="ml-1 text-[#ff6c37]">{paramRows.length}</span>
                )}
                {tab === 'body' && bodyType !== 'none' && <span className="ml-1 text-[#ff6c37]">●</span>}
              </button>
            ))}
          </div>

          <div className={`min-h-0 flex-1 overflow-auto border-b ${borderClass}`}>
            {activeTab === 'params' && (
              <PostmanParamsTable
                params={paramRows}
                onChangeKey={handleChangeParamKey}
                onChangeValue={handleChangeParamValue}
                onChangeDescription={handleChangeDescription}
                onDeleteRow={handleDeleteParamRow}
                getDescription={(key) => descriptions[key] ?? ''}
                isLight={isLight}
              />
            )}
            {activeTab === 'headers' && (
              <div className={`px-3 py-2 font-mono text-xs ${isLight ? 'text-black/70' : 'text-white/70'}`}>
                Accept: application/json
              </div>
            )}
            {activeTab === 'body' && (
              <PostmanBodyEditor
                bodyType={bodyType}
                onChangeBodyType={setBodyType}
                rawSubType={rawSubType}
                onChangeRawSubType={setRawSubType}
                rawBody={rawBody}
                onChangeRawBody={setRawBody}
                formDataRows={formDataRows}
                onChangeFormDataKey={handleChangeFormDataKey}
                onChangeFormDataValue={handleChangeFormDataValue}
                onChangeFormDataDescription={handleChangeFormDataDescription}
                onDeleteFormDataRow={handleDeleteFormDataRow}
                getFormDataDescription={(key) => formDataDescriptions[key] ?? ''}
                isLight={isLight}
              />
            )}
          </div>

          <div className="flex shrink-0 flex-col" style={{ height: responseHeight }}>
            <div
              onPointerDown={handleResponseResizeStart}
              className={`h-0.5 shrink-0 cursor-ns-resize touch-none ${
                isLight ? 'bg-black/10 hover:bg-black/20' : 'bg-black/50 hover:bg-white/20'
              }`}
            />
            <div className="min-h-0 flex-1">
              <PostmanResponsePanel isSending={isSending} response={response} isLight={isLight} />
            </div>
          </div>
        </div>
      </div>
    </FloatingWindow>
  )
}

export default Postman
