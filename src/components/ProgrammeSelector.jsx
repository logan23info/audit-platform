import { useState } from 'react'
import { ChevronDown, Plus, Check, FolderOpen, Loader2 } from 'lucide-react'
import { useProgramme } from '../context/ProgrammeContext'
import { useAuth } from '../context/AuthContext'

const STANDARDS = ['ISO 27001', 'ISO 27002', 'ISO 27005', 'ISO 9001', 'ISO 19011']

export default function ProgrammeSelector() {
  const { programmes, activeProgramme, selectProgramme, addProgramme, loading } = useProgramme()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [creating, setCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '', organisation: '', standards: ['ISO 27001'],
    audit_period_start: '', audit_period_end: '', lead_auditor: '', scope: ''
  })
  const [error, setError] = useState('')

  const toggleStandard = (std) => {
    setForm(p => ({
      ...p,
      standards: p.standards.includes(std)
        ? p.standards.filter(s => s !== std)
        : [...p.standards, std]
    }))
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!form.name) { setError('Programme name is required'); return }
    setSaving(true)
    setError('')
    try {
      await addProgramme({ ...form, user_id: user.id })
      setCreating(false)
      setOpen(false)
      setForm({ name: '', organisation: '', standards: ['ISO 27001'], audit_period_start: '', audit_period_end: '', lead_auditor: '', scope: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => { setOpen(!open); setCreating(false) }}
        className="flex items-center gap-2 bg-navy-800 border border-navy-600 rounded-lg px-3 py-1.5 hover:border-steel-500 transition-colors max-w-[200px]"
      >
        <FolderOpen size={13} className="text-amber-audit flex-shrink-0" />
        <span className="text-xs text-white truncate">
          {loading ? 'Loading...' : activeProgramme ? activeProgramme.programme_id : 'Select Programme'}
        </span>
        <ChevronDown size={12} className="text-steel-400 flex-shrink-0" />
      </button>

      {open && (
        <div className="absolute left-0 top-10 w-80 bg-navy-900 border border-navy-600 rounded-xl shadow-2xl overflow-hidden z-50">
          {!creating ? (
            <>
              <div className="px-4 py-3 border-b border-navy-700 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Audit Programmes</span>
                <button
                  onClick={() => setCreating(true)}
                  className="flex items-center gap-1 text-xs text-amber-audit hover:text-amber-300 transition-colors"
                >
                  <Plus size={12} /> New
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto py-1">
                {programmes.length === 0 ? (
                  <div className="px-4 py-6 text-center">
                    <div className="text-xs text-steel-400 mb-2">No audit programmes yet</div>
                    <button onClick={() => setCreating(true)} className="btn-primary text-xs py-1.5 px-3">
                      <Plus size={11} /> Create first programme
                    </button>
                  </div>
                ) : programmes.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { selectProgramme(p); setOpen(false) }}
                    className="w-full flex items-start justify-between px-4 py-3 hover:bg-navy-800 transition-colors text-left"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-amber-audit">{p.programme_id}</span>
                        <span className={`badge text-xs ${p.status === 'Closed' ? 'badge-steel' : p.status === 'In Progress' ? 'bg-amber-900/40 text-amber-300' : 'bg-blue-900/40 text-blue-300'}`}>{p.status}</span>
                      </div>
                      <div className="text-xs text-white truncate mt-0.5">{p.name}</div>
                      <div className="text-xs text-steel-400 mt-0.5">{p.standards?.join(' · ')}</div>
                    </div>
                    {activeProgramme?.id === p.id && <Check size={14} className="text-emerald-400 flex-shrink-0 mt-1" />}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <form onSubmit={handleCreate}>
              <div className="px-4 py-3 border-b border-navy-700 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">New Audit Programme</span>
                <button type="button" onClick={() => setCreating(false)} className="text-xs text-steel-400 hover:text-steel-200">Cancel</button>
              </div>
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {error && <div className="text-xs text-red-400 bg-red-900/20 border border-red-800 rounded p-2">{error}</div>}

                <div>
                  <label className="block text-xs text-steel-400 mb-1">Programme Name *</label>
                  <input className="input-field text-xs" placeholder="e.g. ISMS Internal Audit 2025" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs text-steel-400 mb-1">Organisation</label>
                  <input className="input-field text-xs" placeholder="e.g. Acme Financial Ltd" value={form.organisation} onChange={e => setForm(p => ({ ...p, organisation: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs text-steel-400 mb-1">Standards in Scope</label>
                  <div className="flex flex-wrap gap-1.5">
                    {STANDARDS.map(std => (
                      <button
                        key={std}
                        type="button"
                        onClick={() => toggleStandard(std)}
                        className={`text-xs px-2 py-1 rounded border transition-colors ${form.standards.includes(std) ? 'bg-amber-900/40 border-amber-700 text-amber-300' : 'bg-navy-800 border-navy-600 text-steel-400 hover:border-steel-500'}`}
                      >
                        {std}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-steel-400 mb-1">Period Start</label>
                    <input className="input-field text-xs" type="date" value={form.audit_period_start} onChange={e => setForm(p => ({ ...p, audit_period_start: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs text-steel-400 mb-1">Period End</label>
                    <input className="input-field text-xs" type="date" value={form.audit_period_end} onChange={e => setForm(p => ({ ...p, audit_period_end: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-steel-400 mb-1">Lead Auditor</label>
                  <input className="input-field text-xs" placeholder="e.g. John Smith, CISA" value={form.lead_auditor} onChange={e => setForm(p => ({ ...p, lead_auditor: e.target.value }))} />
                </div>
                <button type="submit" disabled={saving} className="btn-primary w-full justify-center text-xs">
                  {saving ? <><Loader2 size={12} className="animate-spin" /> Creating...</> : 'Create Programme'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
