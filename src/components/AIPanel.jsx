import { useState } from 'react'
import { Sparkles, Send, Copy, Download, Loader2, ChevronDown, ChevronUp } from 'lucide-react'

export default function AIPanel({ title, systemPrompt, placeholder, contextFields = [] }) {
  const [inputs, setInputs] = useState({})
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [collapsed, setCollapsed] = useState(false)

  const buildUserMessage = () => {
    let msg = ''
    contextFields.forEach(f => {
      if (inputs[f.id]) msg += `${f.label}: ${inputs[f.id]}\n`
    })
    if (inputs.query) msg += `\nRequest: ${inputs.query}`
    return msg || inputs.query || 'Generate the artifact for this module.'
  }

  const generate = async () => {
    setLoading(true)
    setError('')
    setOutput('')
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: 'user', content: buildUserMessage() }]
        })
      })
      const data = await response.json()
      const text = data.content?.map(b => b.text || '').join('\n') || ''
      setOutput(text)
    } catch (e) {
      setError('Failed to connect to AI engine. Please try again.')
    }
    setLoading(false)
  }

  const copy = () => navigator.clipboard.writeText(output)

  const download = () => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.replace(/\s+/g, '_')}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="ai-panel mt-6">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between mb-0"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-amber-audit" />
          <span className="text-sm font-semibold text-white">{title}</span>
          <span className="badge badge-amber">AI-Powered</span>
        </div>
        {collapsed ? <ChevronDown size={14} className="text-steel-400" /> : <ChevronUp size={14} className="text-steel-400" />}
      </button>

      {!collapsed && (
        <div className="mt-4 space-y-3">
          {contextFields.map(f => (
            <div key={f.id}>
              <label className="block text-xs text-steel-400 mb-1">{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  className="textarea-field"
                  rows={3}
                  placeholder={f.placeholder}
                  value={inputs[f.id] || ''}
                  onChange={e => setInputs(p => ({ ...p, [f.id]: e.target.value }))}
                />
              ) : f.type === 'select' ? (
                <select
                  className="input-field"
                  value={inputs[f.id] || ''}
                  onChange={e => setInputs(p => ({ ...p, [f.id]: e.target.value }))}
                >
                  <option value="">Select...</option>
                  {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  className="input-field"
                  type="text"
                  placeholder={f.placeholder}
                  value={inputs[f.id] || ''}
                  onChange={e => setInputs(p => ({ ...p, [f.id]: e.target.value }))}
                />
              )}
            </div>
          ))}

          <div>
            <label className="block text-xs text-steel-400 mb-1">Specific Request (optional)</label>
            <textarea
              className="textarea-field"
              rows={2}
              placeholder={placeholder}
              value={inputs.query || ''}
              onChange={e => setInputs(p => ({ ...p, query: e.target.value }))}
            />
          </div>

          <button
            onClick={generate}
            disabled={loading}
            className="btn-primary w-full justify-center"
          >
            {loading ? (
              <><Loader2 size={14} className="animate-spin" /> Generating...</>
            ) : (
              <><Send size={14} /> Generate Artifact</>
            )}
          </button>

          {error && (
            <div className="text-xs text-red-400 bg-red-900/20 border border-red-800 rounded-lg p-3">
              {error}
            </div>
          )}

          {output && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-steel-400 font-medium">Generated Output</span>
                <div className="flex gap-2">
                  <button onClick={copy} className="btn-secondary py-1 px-2.5 text-xs">
                    <Copy size={11} /> Copy
                  </button>
                  <button onClick={download} className="btn-secondary py-1 px-2.5 text-xs">
                    <Download size={11} /> Download
                  </button>
                </div>
              </div>
              <pre className="bg-navy-950 border border-navy-700 rounded-lg p-4 text-xs text-steel-200 whitespace-pre-wrap font-mono overflow-x-auto max-h-96 overflow-y-auto">
                {output}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
