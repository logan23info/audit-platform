import { useState, useEffect, useCallback } from 'react'
import { Plus, Trash2, Loader2, FileDown, CalendarClock } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import { useAuth } from '../../context/AuthContext'
import { useProgramme } from '../../context/ProgrammeContext'
import { getSurveillanceAudits, createSurveillanceAudit, updateSurveillanceAudit, deleteSurveillanceAudit } from '../../lib/supabase'
import { useToast } from '../../components/Toast'
import ConfirmModal from '../../components/ConfirmModal'
import { exportToCSV } from '../../utils/exportCSV'

// Distinct from Stage 1/2 initial certification readiness
// (fieldwork/isms-audit) — this tracks periodic post-certification
// surveillance visits (typically annual, over a 3-year cert cycle).
const COLUMNS = [
  { label: 'Type', key: 'audit_type' }, { label: 'Audit Date', key: 'audit_date' },
  { label: 'Auditor', key: 'auditor' }, { label: 'Scope Sampled', key: 'scope_sampled' },
  { label: 'Findings', key: 'findings_summary' }, { label: 'Status', key: 'status' },
  { label: 'Next Due', key: 'next_due_date' },
]

const emptyForm = { audit_type: 'Surveillance 1', audit_date: '', auditor: '', scope_sampled: '', findings_summary: '', status: 'Scheduled', next_due_date: '' }
const STATUS_COLORS = { Scheduled: 'badge-steel', 'In Progress': 'badge-amber', Complete: 'bg-emerald-900/40 text-emerald-300 border-emerald-700', Overdue: 'bg-red-900/40 text-red-300 border-red-700' }

export default function SurveillanceAudit() {
  const { user } = useAuth()
  const { activeProgramme } = useProgramme()
  const { toast } = useToast()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [confirmDel, setConfirmDel] = useState(null)

  const load = useCallback(async () => {
    if (!activeProgramme) return
    setLoading(true)
    try { setRows(await getSurveillanceAudits(activeProgramme.id)) }
    catch (e) { toast('Failed to load: ' + e.message, 'error') }
    setLoading(false)
  }, [activeProgramme])

  useEffect(() => { load() }, [load])

  const add = async () => {
    if (!activeProgramme) return
    setSaving(true)
    try {
      const row = await createSurveillanceAudit({ ...form, audit_date: form.audit_date || null, next_due_date: form.next_due_date || null, programme_id: activeProgramme.id, user_id: user?.id })
      setRows(p => [...p, row])
      setForm(emptyForm)
      toast('Surveillance audit added')
    } catch (e) { toast('Save failed: ' + e.message, 'error') }
    setSaving(false)
  }

  const updateStatus = async (id, status) => {
    try { const u = await updateSurveillanceAudit(id, { status }); setRows(p => p.map(r => r.id === id ? u : r)) }
    catch (e) { toast('Update failed', 'error') }
  }

  const remove = (id, type) => setConfirmDel({
    title: `Delete ${type} record?`, message: 'This surveillance audit record will be removed.',
    onConfirm: async () => { await deleteSurveillanceAudit(id); setRows(p => p.filter(r => r.id !== id)) }
  })

  const overdue = rows.filter(r => r.next_due_date && new Date(r.next_due_date) < new Date() && r.status !== 'Complete').length

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Surveillance"
        title="Surveillance Audit Schedule"
        description="Periodic post-certification surveillance visits (typically annual across the 3-year certification cycle) — distinct from the initial Stage 1/2 certification readiness workflow."
        badges={['Surveillance', 'Certification Cycle', 'ISMS']}
      />

      {activeProgramme && (
        <div className="card mb-4">
          <div className="text-xs text-steel-400 mb-3">{rows.length} records{overdue > 0 && <span className="text-red-400 font-semibold"> — {overdue} overdue</span>}</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
            <select className="input-field text-xs" value={form.audit_type} onChange={e => setForm(p => ({ ...p, audit_type: e.target.value }))}>
              {['Surveillance 1', 'Surveillance 2', 'Recertification'].map(o => <option key={o}>{o}</option>)}
            </select>
            <input className="input-field text-xs" type="date" placeholder="Audit date" value={form.audit_date} onChange={e => setForm(p => ({ ...p, audit_date: e.target.value }))} />
            <input className="input-field text-xs" placeholder="Auditor" value={form.auditor} onChange={e => setForm(p => ({ ...p, auditor: e.target.value }))} />
            <input className="input-field text-xs" type="date" placeholder="Next due" value={form.next_due_date} onChange={e => setForm(p => ({ ...p, next_due_date: e.target.value }))} />
          </div>
          <div className="flex gap-2">
            <input className="input-field text-xs flex-1" placeholder="Scope sampled" value={form.scope_sampled} onChange={e => setForm(p => ({ ...p, scope_sampled: e.target.value }))} />
            <input className="input-field text-xs flex-1" placeholder="Findings summary" value={form.findings_summary} onChange={e => setForm(p => ({ ...p, findings_summary: e.target.value }))} />
            <button onClick={add} disabled={saving} className="btn-primary text-xs py-1.5"><Plus size={12} /> Add</button>
            <button onClick={() => exportToCSV(rows, `ISMS_Surveillance_${activeProgramme?.programme_id}`, COLUMNS)} disabled={rows.length === 0} className="btn-secondary text-xs py-1.5"><FileDown size={12} /> Export</button>
          </div>
        </div>
      )}

      {!activeProgramme ? (
        <div className="card text-center py-12 text-steel-400 text-sm"><CalendarClock size={24} className="mx-auto mb-2" />Select an audit programme.</div>
      ) : loading ? (
        <div className="card text-center py-12"><Loader2 size={22} className="animate-spin text-steel-400 mx-auto" /></div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-navy-700 bg-navy-800/50">{['Type', 'Audit Date', 'Auditor', 'Scope Sampled', 'Findings', 'Status', 'Next Due', ''].map(h => <th key={h} className="text-left py-2.5 px-3 text-steel-400 font-medium whitespace-nowrap">{h}</th>)}</tr></thead>
              <tbody>
                {rows.length === 0 ? <tr><td colSpan={8} className="py-12 text-center text-steel-400">No surveillance audits scheduled yet</td></tr>
                  : rows.map(r => (
                    <tr key={r.id} className="border-b border-navy-800">
                      <td className="py-2 px-3 text-white font-medium">{r.audit_type}</td>
                      <td className="py-2 px-3 text-steel-300">{r.audit_date || '—'}</td>
                      <td className="py-2 px-3 text-steel-300">{r.auditor || '—'}</td>
                      <td className="py-2 px-3 text-steel-300 max-w-xs truncate">{r.scope_sampled}</td>
                      <td className="py-2 px-3 text-steel-300 max-w-xs truncate">{r.findings_summary}</td>
                      <td className="py-2 px-3">
                        <select className={`badge ${STATUS_COLORS[r.status]} text-xs border-0 bg-transparent`} value={r.status} onChange={e => updateStatus(r.id, e.target.value)}>
                          {['Scheduled', 'In Progress', 'Complete', 'Overdue'].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </td>
                      <td className="py-2 px-3 text-steel-300">{r.next_due_date || '—'}</td>
                      <td className="py-2 px-3"><button onClick={() => remove(r.id, r.audit_type)} className="text-steel-500 hover:text-red-400"><Trash2 size={13} /></button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {confirmDel && <ConfirmModal {...confirmDel} onClose={() => setConfirmDel(null)} />}
    </div>
  )
}
