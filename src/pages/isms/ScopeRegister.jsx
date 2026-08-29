import { useState, useEffect, useCallback } from 'react'
import { Plus, Trash2, Loader2, FileDown, MapPin } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import { useAuth } from '../../context/AuthContext'
import { useProgramme } from '../../context/ProgrammeContext'
import { getSites, createSite, updateSite, deleteSite, getControlSites } from '../../lib/supabase'
import { useToast } from '../../components/Toast'
import ConfirmModal from '../../components/ConfirmModal'
import { exportToCSV } from '../../utils/exportCSV'

const SITE_COLUMNS = [
  { label: 'Site', key: 'site_name' }, { label: 'Type', key: 'site_type' },
  { label: 'Address', key: 'address' }, { label: 'In Scope', key: 'in_scope' },
  { label: 'Exclusion Reason', key: 'exclusion_reason' }, { label: 'Notes', key: 'notes' },
]

const emptyForm = { site_name: '', site_type: 'Office', address: '', in_scope: true, exclusion_reason: '', notes: '' }

export default function ScopeRegister() {
  const { user } = useAuth()
  const { activeProgramme } = useProgramme()
  const { toast } = useToast()
  const [sites, setSites] = useState([])
  const [controlCounts, setControlCounts] = useState({}) // site_id -> count of linked controls (Sprint 5 cross-reference)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [confirmDel, setConfirmDel] = useState(null)

  const load = useCallback(async () => {
    if (!activeProgramme) return
    setLoading(true)
    try {
      const [siteRows, csRows] = await Promise.all([getSites(activeProgramme.id), getControlSites(activeProgramme.id)])
      setSites(siteRows)
      const counts = {}
      csRows.forEach(r => { counts[r.site_id] = (counts[r.site_id] || 0) + 1 })
      setControlCounts(counts)
    } catch (e) { toast('Failed to load: ' + e.message, 'error') }
    setLoading(false)
  }, [activeProgramme])

  useEffect(() => { load() }, [load])

  const add = async () => {
    if (!form.site_name || !activeProgramme) return
    setSaving(true)
    try {
      const row = await createSite({ ...form, programme_id: activeProgramme.id, user_id: user?.id })
      setSites(p => [...p, row])
      setForm(emptyForm)
      toast('Site added')
    } catch (e) { toast('Save failed: ' + e.message, 'error') }
    setSaving(false)
  }

  const toggleScope = async (site) => {
    try { const u = await updateSite(site.id, { in_scope: !site.in_scope }); setSites(p => p.map(s => s.id === site.id ? u : s)) }
    catch (e) { toast('Update failed', 'error') }
  }

  const remove = (id, name) => setConfirmDel({
    title: `Delete ${name}?`, message: 'This site will be removed from the ISMS scope register.',
    onConfirm: async () => { await deleteSite(id); setSites(p => p.filter(s => s.id !== id)) }
  })

  const inScopeCount = sites.filter(s => s.in_scope).length

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Clause 4.3"
        title="Multi-site Scope Register"
        description="Physical sites, data centres, cloud regions, and remote-working arrangements that define the ISMS boundary. Mark each in/out of scope with justification for the SoA and certification scope statement."
        badges={['Cl. 4.3', 'Scope', 'ISMS']}
      />

      {activeProgramme && (
        <div className="card mb-4">
          <div className="text-xs text-steel-400 mb-3">{inScopeCount} of {sites.length} sites in scope</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-3">
            <input className="input-field text-xs" placeholder="Site name *" value={form.site_name} onChange={e => setForm(p => ({ ...p, site_name: e.target.value }))} />
            <select className="input-field text-xs" value={form.site_type} onChange={e => setForm(p => ({ ...p, site_type: e.target.value }))}>
              {['Office', 'Data Centre', 'Cloud Region', 'Remote/WFH', 'Warehouse', 'Other'].map(o => <option key={o}>{o}</option>)}
            </select>
            <input className="input-field text-xs" placeholder="Address / region" value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} />
          </div>
          <div className="flex gap-2">
            <input className="input-field text-xs flex-1" placeholder="Notes" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} />
            <button onClick={add} disabled={saving || !form.site_name} className="btn-primary text-xs py-1.5"><Plus size={12} /> Add Site</button>
            <button onClick={() => exportToCSV(sites, `ISMS_Sites_${activeProgramme?.programme_id}`, SITE_COLUMNS)} disabled={sites.length === 0} className="btn-secondary text-xs py-1.5"><FileDown size={12} /> Export</button>
          </div>
        </div>
      )}

      {!activeProgramme ? (
        <div className="card text-center py-12 text-steel-400 text-sm"><MapPin size={24} className="mx-auto mb-2" />Select an audit programme.</div>
      ) : loading ? (
        <div className="card text-center py-12"><Loader2 size={22} className="animate-spin text-steel-400 mx-auto" /></div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-navy-700 bg-navy-800/50">{['Site', 'Type', 'Address', 'In Scope', 'Linked Controls', 'Notes', ''].map(h => <th key={h} className="text-left py-2.5 px-3 text-steel-400 font-medium whitespace-nowrap">{h}</th>)}</tr></thead>
              <tbody>
                {sites.length === 0 ? <tr><td colSpan={7} className="py-12 text-center text-steel-400">No sites yet — click Add Site</td></tr>
                  : sites.map(s => (
                    <tr key={s.id} className="border-b border-navy-800">
                      <td className="py-2 px-3 text-white font-medium">{s.site_name}</td>
                      <td className="py-2 px-3"><span className="badge badge-steel text-xs">{s.site_type}</span></td>
                      <td className="py-2 px-3 text-steel-300 max-w-xs truncate">{s.address}</td>
                      <td className="py-2 px-3">
                        <button onClick={() => toggleScope(s)} className={`text-xs px-2 py-0.5 rounded border font-semibold ${s.in_scope ? 'bg-emerald-900/40 text-emerald-300 border-emerald-700' : 'bg-navy-700 text-steel-400 border-navy-600'}`}>
                          {s.in_scope ? '✓ In Scope' : '✗ Out of Scope'}
                        </button>
                      </td>
                      <td className="py-2 px-3 text-steel-300">{controlCounts[s.id] ? <span className="badge badge-amber text-xs">{controlCounts[s.id]} excluded control{controlCounts[s.id] > 1 ? 's' : ''}</span> : '—'}</td>
                      <td className="py-2 px-3 text-steel-400 max-w-xs truncate">{s.notes}</td>
                      <td className="py-2 px-3"><button onClick={() => remove(s.id, s.site_name)} className="text-steel-500 hover:text-red-400"><Trash2 size={13} /></button></td>
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
