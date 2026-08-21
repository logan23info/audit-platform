import { useState, useEffect, useCallback } from 'react'
import { Plus, Loader2, Save, Trash2, Search, X, Database } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { useAuth } from '../../context/AuthContext'
import { useProgramme } from '../../context/ProgrammeContext'
import { supabase } from '../../lib/supabase'
import { useToast } from '../../components/Toast'
import ConfirmModal from '../../components/ConfirmModal'
import { exportToCSV } from '../../utils/exportCSV'

const CATEGORIES = ['Information', 'Software', 'Physical', 'Services', 'People', 'Intangible']
const CLASSIFICATIONS = ['Public', 'Internal', 'Confidential', 'Restricted']
const CRITICALITIES = ['Critical', 'High', 'Medium', 'Low']

const critColors = {
  Critical: 'bg-red-900/40 text-red-300 border-red-700',
  High: 'bg-orange-900/40 text-orange-300 border-orange-700',
  Medium: 'bg-amber-900/40 text-amber-300 border-amber-700',
  Low: 'bg-navy-700 text-steel-400 border-navy-600',
}
const classColors = {
  Restricted: 'bg-red-900/30 text-red-300',
  Confidential: 'bg-orange-900/30 text-orange-300',
  Internal: 'bg-blue-900/30 text-blue-300',
  Public: 'bg-navy-700 text-steel-400',
}

async function getAssets(programmeId) {
  const { data, error } = await supabase.from('pbc_items').select('*')
    .eq('programme_id', programmeId).eq('domain', 'AssetRegister')
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}
async function createAsset(asset) {
  const { data, error } = await supabase.from('pbc_items').insert({ ...asset, domain: 'AssetRegister' }).select().single()
  if (error) throw error
  return data
}
async function deleteAsset(id) {
  const { error } = await supabase.from('pbc_items').delete().eq('id', id)
  if (error) throw error
}

function NewAssetModal({ programmeId, userId, onCreated, onClose }) {
  const { toast } = useToast()
  const [form, setForm] = useState({ description: '', control_ref: '', phase: 'Information', priority: 'Critical', notes: '', received_date: '' })
  const [classif, setClassif] = useState('Confidential')
  const [owner, setOwner] = useState('')
  const [saving, setSaving] = useState(false)

  const save = async () => {
    if (!form.description) return
    setSaving(true)
    try {
      const item = await createAsset({
        user_id: userId, programme_id: programmeId,
        description: form.description,
        control_ref: `${form.phase} | ${classif} | Owner: ${owner}`,
        priority: form.priority,
        notes: form.notes,
        status: 'Not Started',
        pbc_ref: 'AS-TMP',
        phase: form.phase,
        received_date: form.received_date || null,
      })
      onCreated(item); onClose(); toast('Asset added — ' + item.pbc_ref)
    } catch (e) { toast('Failed: ' + e.message, 'error') }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-navy-900 border border-navy-600 rounded-2xl w-full max-w-lg">
        <div className="p-5 border-b border-navy-700 flex items-center justify-between">
          <h2 className="font-semibold text-white">Add Asset</h2>
          <button onClick={onClose} className="text-steel-400 text-lg">×</button>
        </div>
        <div className="p-5 space-y-3">
          <div><label className="block text-xs text-steel-400 mb-1">Asset Name *</label><input className="input-field" placeholder="e.g. Customer PII Database — AWS RDS" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs text-steel-400 mb-1">Category</label>
              <select className="input-field" value={form.phase} onChange={e => setForm(p => ({ ...p, phase: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label className="block text-xs text-steel-400 mb-1">Classification</label>
              <select className="input-field" value={classif} onChange={e => setClassif(e.target.value)}>
                {CLASSIFICATIONS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label className="block text-xs text-steel-400 mb-1">Criticality</label>
              <select className="input-field" value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
                {CRITICALITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label className="block text-xs text-steel-400 mb-1">Asset Owner</label>
              <input className="input-field" placeholder="e.g. Head of Engineering" value={owner} onChange={e => setOwner(e.target.value)} />
            </div>
          </div>
          <div><label className="block text-xs text-steel-400 mb-1">Location / System</label>
            <input className="input-field" placeholder="e.g. AWS eu-west-1, on-prem DC2" value={form.received_date} onChange={e => setForm(p => ({ ...p, received_date: e.target.value }))} />
          </div>
          <div><label className="block text-xs text-steel-400 mb-1">Notes / Associated Risks</label>
            <textarea className="textarea-field" rows={2} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} />
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={save} disabled={saving || !form.description} className="btn-primary flex-1 justify-center">
              {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Save size={14} /> Add Asset</>}
            </button>
            <button onClick={onClose} className="btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ASSET_COLUMNS = [
  { label: 'Ref', key: 'pbc_ref' }, { label: 'Asset Name', key: 'description' },
  { label: 'Category', key: 'phase' }, { label: 'Criticality', key: 'priority' },
  { label: 'Classification / Owner', key: 'control_ref' }, { label: 'Location', key: 'received_date' },
  { label: 'Notes', key: 'notes' },
]

export default function Assets() {
  const { user } = useAuth()
  const { activeProgramme } = useProgramme()
  const { toast } = useToast()
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('All')
  const [filterCrit, setFilterCrit] = useState('All')
  const [confirmDel, setConfirmDel] = useState(null)

  const load = useCallback(async () => {
    if (!activeProgramme) return
    setLoading(true)
    try { setAssets(await getAssets(activeProgramme.id)) }
    catch (e) { console.error(e) }
    setLoading(false)
  }, [activeProgramme])

  useEffect(() => { load() }, [load])

  const handleDelete = (asset) => setConfirmDel({
    title: `Delete ${asset.pbc_ref}?`,
    message: `"${asset.description}" will be permanently removed from the asset register.`,
    onConfirm: async () => {
      try { await deleteAsset(asset.id); setAssets(p => p.filter(a => a.id !== asset.id)); toast('Asset deleted', 'info') }
      catch (e) { toast('Delete failed', 'error') }
    }
  })

  const filtered = assets.filter(a =>
    (filterCat === 'All' || a.phase === filterCat) &&
    (filterCrit === 'All' || a.priority === filterCrit) &&
    (!search || a.description?.toLowerCase().includes(search.toLowerCase()) || a.pbc_ref?.toLowerCase().includes(search.toLowerCase()))
  )

  const stats = {
    total: assets.length,
    critical: assets.filter(a => a.priority === 'Critical').length,
    restricted: assets.filter(a => a.control_ref?.includes('Restricted')).length,
    confidential: assets.filter(a => a.control_ref?.includes('Confidential')).length,
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader standard="ISO 27005:2022" clause="Asset Register" title="Asset Register ⭐ Live"
        description="Information asset inventory — all assets identified, classified, and assigned owners per ISO 27005:2022. Saved permanently to Supabase per audit programme."
        badges={['Live Data', 'ISO 27005', activeProgramme?.programme_id || 'No Programme']} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Assets', value: stats.total, color: 'text-white' },
          { label: 'Critical', value: stats.critical, color: 'text-red-400' },
          { label: 'Restricted', value: stats.restricted, color: 'text-red-400' },
          { label: 'Confidential', value: stats.confidential, color: 'text-orange-400' },
        ].map(s => (
          <div key={s.label} className="card-sm text-center">
            <div className={`font-display text-2xl font-bold mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs text-steel-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card mb-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-40">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-400" />
            <input className="input-field pl-8 text-xs py-1.5" placeholder="Search assets..." value={search} onChange={e => setSearch(e.target.value)} />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-400"><X size={12} /></button>}
          </div>
          {[
            { label: 'Category', value: filterCat, setter: setFilterCat, options: ['All', ...CATEGORIES] },
            { label: 'Criticality', value: filterCrit, setter: setFilterCrit, options: ['All', ...CRITICALITIES] },
          ].map(f => (
            <div key={f.label} className="flex items-center gap-1.5">
              <span className="text-xs text-steel-400">{f.label}:</span>
              <select className="input-field py-1 text-xs" value={f.value} onChange={e => f.setter(e.target.value)}>
                {f.options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <span className="text-xs text-steel-400 ml-auto">{filtered.length} assets</span>
          <button onClick={() => exportToCSV(filtered, `Assets_${activeProgramme?.programme_id}`, ASSET_COLUMNS)} disabled={filtered.length === 0} className="btn-secondary text-xs py-1.5">Export CSV</button>
          <button onClick={() => setShowModal(true)} disabled={!activeProgramme} className="btn-primary text-xs py-1.5"><Plus size={12} /> Add Asset</button>
        </div>
      </div>

      {!activeProgramme ? (
        <div className="card text-center py-12"><Database size={28} className="text-steel-500 mx-auto mb-3" /><div className="text-white font-medium">No programme selected</div></div>
      ) : loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-navy-800 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="card p-0 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-navy-700 bg-navy-800/50">
                {['Ref', 'Asset Name', 'Category', 'Criticality', 'Classification', 'Owner', 'Location', 'Notes', ''].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-steel-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={9} className="py-12 text-center text-steel-400">
                    {assets.length === 0 ? 'No assets yet — click Add Asset to start your inventory' : 'No assets match filter'}
                  </td></tr>
                ) : filtered.map((a, i) => {
                  const parts = a.control_ref?.split(' | ') || []
                  const cat = parts[0] || a.phase
                  const classif = parts[1] || ''
                  const ownerStr = parts[2]?.replace('Owner: ', '') || ''
                  return (
                    <tr key={a.id} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                      <td className="py-2.5 px-3 font-mono text-amber-audit font-semibold whitespace-nowrap">{a.pbc_ref}</td>
                      <td className="py-2.5 px-3 text-white font-medium max-w-xs truncate">{a.description}</td>
                      <td className="py-2.5 px-3 text-steel-300 whitespace-nowrap">{cat}</td>
                      <td className="py-2.5 px-3"><span className={`badge border text-xs ${critColors[a.priority] || 'badge-steel'}`}>{a.priority}</span></td>
                      <td className="py-2.5 px-3"><span className={`badge text-xs ${classColors[classif] || 'badge-steel'}`}>{classif}</span></td>
                      <td className="py-2.5 px-3 text-steel-300 whitespace-nowrap">{ownerStr}</td>
                      <td className="py-2.5 px-3 text-steel-400 whitespace-nowrap">{a.received_date}</td>
                      <td className="py-2.5 px-3 text-steel-400 max-w-xs truncate">{a.notes}</td>
                      <td className="py-2.5 px-3">
                        <button onClick={() => handleDelete(a)} className="text-steel-500 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-navy-700 text-xs text-steel-500">{filtered.length} of {assets.length} assets — {activeProgramme?.programme_id}</div>
        </div>
      )}

      <AIPanel title="Generate Asset Register Artifacts"
        systemPrompt="You are an ISO 27005:2022 asset management specialist. Generate comprehensive asset registers, asset classification schemes, and asset inventory templates. Use ISO 27005 asset categories: Information, Software, Physical, Services, People, Intangible. Include owner, custodian, classification, criticality, and associated risks."
        placeholder="e.g. Generate a complete asset register for a cloud-native fintech with AWS infrastructure"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. AWS SaaS, 200 staff, financial services' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Full Asset Register Template', 'Asset Classification Scheme', 'Asset Criticality Assessment', 'Information Asset Inventory', 'Cloud Asset Inventory', 'Asset Ownership Matrix'] },
          { id: 'focus', label: 'Asset Focus Area', type: 'text', placeholder: 'e.g. Cloud infrastructure, customer data, IP' },
        ]} />

      {confirmDel && <ConfirmModal {...confirmDel} onClose={() => setConfirmDel(null)} />}
      {showModal && <NewAssetModal programmeId={activeProgramme?.id} userId={user?.id} onCreated={a => setAssets(p => [...p, a])} onClose={() => setShowModal(false)} />}
    </div>
  )
}
