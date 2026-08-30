import { useState, useEffect, useCallback } from 'react'
import { Plus, Trash2, Loader2, FileDown, Truck } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import { useAuth } from '../../context/AuthContext'
import { useProgramme } from '../../context/ProgrammeContext'
import { getSupplierAudits, createSupplierAudit, updateSupplierAudit, deleteSupplierAudit } from '../../lib/supabase'
import { useToast } from '../../components/Toast'
import ConfirmModal from '../../components/ConfirmModal'
import { exportToCSV } from '../../utils/exportCSV'

const COLUMNS = [
  { label: 'Supplier', key: 'supplier_name' }, { label: 'Service', key: 'service_description' },
  { label: 'Risk Tier', key: 'risk_tier' }, { label: 'Review Status', key: 'review_status' },
  { label: 'Last Review', key: 'last_review_date' }, { label: 'Next Review Due', key: 'next_review_due' },
  { label: 'Notes', key: 'notes' },
]

const emptyForm = { supplier_name: '', service_description: '', risk_tier: 'Medium', review_status: 'Not Reviewed', last_review_date: '', next_review_due: '', notes: '' }
const RISK_COLORS = { Low: 'badge-steel', Medium: 'badge-amber', High: 'bg-orange-900/40 text-orange-300 border-orange-700', Critical: 'bg-red-900/40 text-red-300 border-red-700' }
const STATUS_COLORS = { 'Not Reviewed': 'badge-steel', 'In Progress': 'badge-amber', 'Reviewed - Satisfactory': 'bg-emerald-900/40 text-emerald-300 border-emerald-700', 'Reviewed - Issues Found': 'bg-red-900/40 text-red-300 border-red-700' }

export default function SupplierAudit() {
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
    try { setRows(await getSupplierAudits(activeProgramme.id)) }
    catch (e) { toast('Failed to load: ' + e.message, 'error') }
    setLoading(false)
  }, [activeProgramme])

  useEffect(() => { load() }, [load])

  const add = async () => {
    if (!form.supplier_name || !activeProgramme) return
    setSaving(true)
    try {
      const row = await createSupplierAudit({ ...form, last_review_date: form.last_review_date || null, next_review_due: form.next_review_due || null, programme_id: activeProgramme.id, user_id: user?.id })
      setRows(p => [...p, row])
      setForm(emptyForm)
      toast('Supplier added')
    } catch (e) { toast('Save failed: ' + e.message, 'error') }
    setSaving(false)
  }

  const updateField = async (id, field, value) => {
    try { const u = await updateSupplierAudit(id, { [field]: value }); setRows(p => p.map(r => r.id === id ? u : r)) }
    catch (e) { toast('Update failed', 'error') }
  }

  const remove = (id, name) => setConfirmDel({
    title: `Delete ${name}?`, message: 'This supplier will be removed from the register.',
    onConfirm: async () => { await deleteSupplierAudit(id); setRows(p => p.filter(r => r.id !== id)) }
  })

  const overdue = rows.filter(r => r.next_review_due && new Date(r.next_review_due) < new Date()).length

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="A.5.19-23"
        title="Supplier Audit Register"
        description="Third-party and supplier security relationships — screening, ICT supply chain risk, monitoring/reviewing supplier services, and cloud service security. Maps to Annex A.5.19–5.23."
        badges={['A.5.19-23', 'Suppliers', 'ISMS']}
      />

      {activeProgramme && (
        <div className="card mb-4">
          <div className="text-xs text-steel-400 mb-3">{rows.length} suppliers{overdue > 0 && <span className="text-red-400 font-semibold"> — {overdue} review{overdue > 1 ? 's' : ''} overdue</span>}</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
            <input className="input-field text-xs" placeholder="Supplier name *" value={form.supplier_name} onChange={e => setForm(p => ({ ...p, supplier_name: e.target.value }))} />
            <input className="input-field text-xs" placeholder="Service provided" value={form.service_description} onChange={e => setForm(p => ({ ...p, service_description: e.target.value }))} />
            <select className="input-field text-xs" value={form.risk_tier} onChange={e => setForm(p => ({ ...p, risk_tier: e.target.value }))}>
              {['Low', 'Medium', 'High', 'Critical'].map(o => <option key={o}>{o}</option>)}
            </select>
            <input className="input-field text-xs" type="date" placeholder="Next review due" value={form.next_review_due} onChange={e => setForm(p => ({ ...p, next_review_due: e.target.value }))} />
          </div>
          <div className="flex gap-2">
            <input className="input-field text-xs flex-1" placeholder="Notes" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} />
            <button onClick={add} disabled={saving || !form.supplier_name} className="btn-primary text-xs py-1.5"><Plus size={12} /> Add Supplier</button>
            <button onClick={() => exportToCSV(rows, `ISMS_Supplier_Audit_${activeProgramme?.programme_id}`, COLUMNS)} disabled={rows.length === 0} className="btn-secondary text-xs py-1.5"><FileDown size={12} /> Export</button>
          </div>
        </div>
      )}

      {!activeProgramme ? (
        <div className="card text-center py-12 text-steel-400 text-sm"><Truck size={24} className="mx-auto mb-2" />Select an audit programme.</div>
      ) : loading ? (
        <div className="card text-center py-12"><Loader2 size={22} className="animate-spin text-steel-400 mx-auto" /></div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-navy-700 bg-navy-800/50">{['Supplier', 'Service', 'Risk Tier', 'Review Status', 'Next Review Due', 'Notes', ''].map(h => <th key={h} className="text-left py-2.5 px-3 text-steel-400 font-medium whitespace-nowrap">{h}</th>)}</tr></thead>
              <tbody>
                {rows.length === 0 ? <tr><td colSpan={7} className="py-12 text-center text-steel-400">No suppliers yet — click Add Supplier</td></tr>
                  : rows.map(r => {
                    const isOverdue = r.next_review_due && new Date(r.next_review_due) < new Date()
                    return (
                      <tr key={r.id} className="border-b border-navy-800">
                        <td className="py-2 px-3 text-white font-medium">{r.supplier_name}</td>
                        <td className="py-2 px-3 text-steel-300 max-w-xs truncate">{r.service_description}</td>
                        <td className="py-2 px-3">
                          <select className={`badge ${RISK_COLORS[r.risk_tier]} text-xs border-0 bg-transparent`} value={r.risk_tier} onChange={e => updateField(r.id, 'risk_tier', e.target.value)}>
                            {['Low', 'Medium', 'High', 'Critical'].map(o => <option key={o}>{o}</option>)}
                          </select>
                        </td>
                        <td className="py-2 px-3">
                          <select className={`badge ${STATUS_COLORS[r.review_status]} text-xs border-0 bg-transparent`} value={r.review_status} onChange={e => updateField(r.id, 'review_status', e.target.value)}>
                            {['Not Reviewed', 'In Progress', 'Reviewed - Satisfactory', 'Reviewed - Issues Found'].map(o => <option key={o}>{o}</option>)}
                          </select>
                        </td>
                        <td className={`py-2 px-3 ${isOverdue ? 'text-red-400 font-bold' : 'text-steel-300'}`}>{r.next_review_due || '—'}</td>
                        <td className="py-2 px-3 text-steel-400 max-w-xs truncate">{r.notes}</td>
                        <td className="py-2 px-3"><button onClick={() => remove(r.id, r.supplier_name)} className="text-steel-500 hover:text-red-400"><Trash2 size={13} /></button></td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {confirmDel && <ConfirmModal {...confirmDel} onClose={() => setConfirmDel(null)} />}
    </div>
  )
}
