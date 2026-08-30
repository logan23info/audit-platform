import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, Loader2, Layers, ArrowRight } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import { useAuth } from '../../context/AuthContext'
import { useProgramme } from '../../context/ProgrammeContext'
import { getMSRecords, createMSRecord, updateMSRecord, deleteMSRecord } from '../../lib/supabase'
import { useToast } from '../../components/Toast'
import ConfirmModal from '../../components/ConfirmModal'

// Sprint 16 — consolidated Clause 4-10 register. One page, one table
// (isms_ms_records), tabbed by clause. Deliberately thin (cross-link
// only, no data entry) for clauses already covered by a dedicated live
// page elsewhere — Clause 6's risk assessment (iso27005 Risk Register),
// Clause 8's operation (isms/implement + isms/rcm), Clause 9's
// management review (reporting/management-review), and Clause 10's
// corrective actions (reporting/capa) — to avoid duplicate data entry.
const CLAUSES = [
  { id: '4', label: 'Cl. 4 — Context', sections: ['Internal/External Issues', 'Interested Parties & Requirements', 'ISMS Scope Statement'] },
  { id: '5', label: 'Cl. 5 — Leadership', sections: ['Information Security Policy', 'Roles & Responsibilities'] },
  { id: '6', label: 'Cl. 6 — Planning', sections: ['ISMS Objectives'], crossLink: { label: 'Risk Assessment & Treatment', path: '/iso27005/live-register' } },
  { id: '7', label: 'Cl. 7 — Support', sections: ['Competence Register', 'Awareness & Communication Log', 'Documented Information Control'] },
  { id: '8', label: 'Cl. 8 — Operation', sections: [], crossLink: { label: 'Control Implementation (Layer 2) & Risk Control Matrix', path: '/isms/implement' } },
  { id: '9', label: 'Cl. 9 — Performance Evaluation', sections: ['Internal Audit Programme'], crossLink: { label: 'Management Review Pack', path: '/reporting/management-review' } },
  { id: '10', label: 'Cl. 10 — Improvement', sections: ['Continual Improvement Register'], crossLink: { label: 'CAPA Tracker (nonconformities)', path: '/reporting/capa' } },
]

const emptyForm = { section: '', title: '', content: '', owner: '', status: 'Open', target_date: '' }
const STATUS_COLORS = { Open: 'badge-steel', 'In Progress': 'badge-amber', Complete: 'bg-emerald-900/40 text-emerald-300 border-emerald-700' }

export default function ManagementSystem() {
  const { user } = useAuth()
  const { activeProgramme } = useProgramme()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [activeClause, setActiveClause] = useState('4')
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [confirmDel, setConfirmDel] = useState(null)

  const load = useCallback(async () => {
    if (!activeProgramme) return
    setLoading(true)
    try { setRecords(await getMSRecords(activeProgramme.id)) }
    catch (e) { toast('Failed to load: ' + e.message, 'error') }
    setLoading(false)
  }, [activeProgramme])

  useEffect(() => { load() }, [load])

  const clause = CLAUSES.find(c => c.id === activeClause)
  const clauseRecords = records.filter(r => r.clause === activeClause)

  const switchClause = (id) => {
    setActiveClause(id)
    const c = CLAUSES.find(x => x.id === id)
    setForm({ ...emptyForm, section: c.sections[0] || '' })
  }

  const add = async () => {
    if (!form.title || !form.section || !activeProgramme) return
    setSaving(true)
    try {
      const row = await createMSRecord({ ...form, target_date: form.target_date || null, clause: activeClause, programme_id: activeProgramme.id, user_id: user?.id })
      setRecords(p => [...p, row])
      setForm({ ...emptyForm, section: clause.sections[0] || '' })
      toast('Record added')
    } catch (e) { toast('Save failed: ' + e.message, 'error') }
    setSaving(false)
  }

  const updateStatus = async (id, status) => {
    try { const u = await updateMSRecord(id, { status }); setRecords(p => p.map(r => r.id === id ? u : r)) }
    catch (e) { toast('Update failed', 'error') }
  }

  const remove = (id, title) => setConfirmDel({
    title: `Delete "${title}"?`, message: 'This record will be removed from the register.',
    onConfirm: async () => { await deleteMSRecord(id); setRecords(p => p.filter(r => r.id !== id)) }
  })

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Cl. 4-10"
        title="Management System — Clauses 4-10"
        description="Context, Leadership, Planning, Support, Operation, Performance Evaluation, and Improvement — the management-system clauses that sit alongside Annex A control implementation. Clauses already covered by a dedicated live page (risk assessment, control implementation, management review, CAPA) cross-link there instead of duplicating data entry."
        badges={['Cl. 4-10', 'Management System', 'ISMS']}
      />

      <div className="flex flex-wrap gap-1.5 mb-4">
        {CLAUSES.map(c => (
          <button key={c.id} onClick={() => switchClause(c.id)} className={`text-xs px-3 py-1.5 rounded-md border font-medium ${activeClause === c.id ? 'bg-amber-audit/15 border-amber-audit text-amber-audit' : 'border-navy-700 text-steel-400 hover:text-white'}`}>
            {c.label}
          </button>
        ))}
      </div>

      {clause.crossLink && (
        <button onClick={() => navigate(clause.crossLink.path)} className="card mb-4 w-full flex items-center justify-between text-left hover:border-steel-400/50">
          <span className="text-xs text-steel-300">This clause's primary evidence already lives in <span className="text-white font-medium">{clause.crossLink.label}</span> — no duplicate entry needed here.</span>
          <ArrowRight size={14} className="text-amber-audit flex-shrink-0" />
        </button>
      )}

      {clause.sections.length === 0 ? null : !activeProgramme ? (
        <div className="card text-center py-12 text-steel-400 text-sm"><Layers size={24} className="mx-auto mb-2" />Select an audit programme.</div>
      ) : (
        <>
          <div className="card mb-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
              <select className="input-field text-xs" value={form.section} onChange={e => setForm(p => ({ ...p, section: e.target.value }))}>
                {clause.sections.map(s => <option key={s}>{s}</option>)}
              </select>
              <input className="input-field text-xs" placeholder="Title *" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
              <input className="input-field text-xs" placeholder="Owner" value={form.owner} onChange={e => setForm(p => ({ ...p, owner: e.target.value }))} />
              <input className="input-field text-xs" type="date" placeholder="Target date" value={form.target_date} onChange={e => setForm(p => ({ ...p, target_date: e.target.value }))} />
            </div>
            <div className="flex gap-2">
              <input className="input-field text-xs flex-1" placeholder="Details" value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} />
              <button onClick={add} disabled={saving || !form.title} className="btn-primary text-xs py-1.5"><Plus size={12} /> Add</button>
            </div>
          </div>

          {loading ? (
            <div className="card text-center py-12"><Loader2 size={22} className="animate-spin text-steel-400 mx-auto" /></div>
          ) : clauseRecords.length === 0 ? (
            <div className="card text-center py-12 text-steel-400 text-sm">No records yet for {clause.label}.</div>
          ) : (
            clause.sections.map(section => {
              const items = clauseRecords.filter(r => r.section === section)
              if (items.length === 0) return null
              return (
                <div key={section} className="card mb-4">
                  <h3 className="section-title mb-3">{section} <span className="text-steel-400 font-normal">({items.length})</span></h3>
                  <div className="space-y-2">
                    {items.map(r => (
                      <div key={r.id} className="flex items-start justify-between gap-3 text-xs border-b border-navy-800 pb-2 last:border-0">
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium">{r.title}{r.owner && <span className="text-steel-400 font-normal"> — {r.owner}</span>}</div>
                          {r.content && <div className="text-steel-400 mt-0.5">{r.content}</div>}
                          {r.target_date && <div className="text-steel-500 mt-0.5">Target: {r.target_date}</div>}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <select className={`badge ${STATUS_COLORS[r.status]} text-xs border-0 bg-transparent`} value={r.status} onChange={e => updateStatus(r.id, e.target.value)}>
                            {['Open', 'In Progress', 'Complete'].map(o => <option key={o}>{o}</option>)}
                          </select>
                          <button onClick={() => remove(r.id, r.title)} className="text-steel-500 hover:text-red-400"><Trash2 size={13} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
          )}
        </>
      )}
      {confirmDel && <ConfirmModal {...confirmDel} onClose={() => setConfirmDel(null)} />}
    </div>
  )
}
