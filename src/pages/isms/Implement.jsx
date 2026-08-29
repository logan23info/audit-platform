import { useState, useEffect, useCallback } from 'react'
import { FileDown, Loader2, ExternalLink } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { exportToCSV } from '../../utils/exportCSV'
import { controls, themeColors } from '../../data/iso27002_controls'
import { useProgramme } from '../../context/ProgrammeContext'
import { useAuth } from '../../context/AuthContext'
import { getSoA, getISMSImplementation, upsertISMSControl } from '../../lib/supabase'
import { useToast } from '../../components/Toast'
import { debounce } from '../../lib/debounce'

const debouncedSave = debounce((fn) => fn(), 600)
const TEXT_FIELDS = ['policy_ref', 'owner', 'notes', 'evidence_url']

// Truth table — implementation status classification (Sprint 2 plan)
// SoA Applicable | Impl Status  | Evidence | -> Display
//   No           | —            | —        | Excluded
//   Yes          | Not Started  | —        | Not Started
//   Yes          | In Progress  | any      | In Progress
//   Yes          | Implemented  | No       | Implemented — Unverified
//   Yes          | Implemented  | Yes      | Implemented — Verified
function displayStatus(row) {
  if (!row) return { label: 'Not Started', color: 'text-steel-400 bg-navy-700' }
  if (row.status === 'Implemented' && !row.evidence_url) return { label: 'Implemented — Unverified', color: 'text-amber-audit bg-amber-900/30 border border-amber-700' }
  if (row.status === 'Implemented' && row.evidence_url) return { label: 'Implemented — Verified', color: 'text-emerald-400 bg-emerald-900/30 border border-emerald-700' }
  if (row.status === 'In Progress') return { label: 'In Progress', color: 'text-blue-400 bg-blue-900/30 border border-blue-700' }
  return { label: 'Not Started', color: 'text-steel-400 bg-navy-700' }
}

const IMPL_COLUMNS = [
  { label: 'Control Ref', key: 'ref' }, { label: 'Control Title', key: 'title' },
  { label: 'Policy Ref', key: 'policy_ref' }, { label: 'Owner', key: 'owner' },
  { label: 'Target Date', key: 'target_date' }, { label: 'Status', key: 'status' },
  { label: 'Evidence URL', key: 'evidence_url' }, { label: 'Notes', key: 'notes' },
]

const emptyImpl = () => ({ status: 'Not Started', policy_ref: '', evidence_url: '', owner: '', target_date: '', verified: false, notes: '' })

export default function ISMSImplement() {
  const { user } = useAuth()
  const { activeProgramme } = useProgramme()
  const { toast } = useToast()
  const [soaMap, setSoaMap] = useState({})
  const [implData, setImplData] = useState({})
  const [loading, setLoading] = useState(false)
  const [savingRef, setSavingRef] = useState(null)
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    if (!activeProgramme) return
    setLoading(true)
    try {
      const [soaRows, implRows] = await Promise.all([getSoA(activeProgramme.id), getISMSImplementation(activeProgramme.id)])
      const soa = {}
      soaRows.forEach(r => { soa[r.control_id] = r.applicable })
      const impl = controls.reduce((acc, c) => ({ ...acc, [c.ref]: emptyImpl() }), {})
      implRows.forEach(r => { impl[r.control_id] = { status: r.status, policy_ref: r.policy_ref || '', evidence_url: r.evidence_url || '', owner: r.owner || '', target_date: r.target_date || '', verified: r.verified, notes: r.notes || '' } })
      setSoaMap(soa)
      setImplData(impl)
    } catch (e) { toast('Failed to load: ' + e.message, 'error') }
    setLoading(false)
  }, [activeProgramme])

  useEffect(() => { load() }, [load])

  const persist = (ref, row) => {
    if (!activeProgramme) return
    setSavingRef(ref)
    upsertISMSControl({ programme_id: activeProgramme.id, user_id: user?.id, control_id: ref, ...row, target_date: row.target_date || null })
      .catch(e => toast('Save failed — ' + ref + ': ' + e.message, 'error'))
      .finally(() => setSavingRef(null))
  }

  const update = (ref, field, value) => {
    const row = { ...implData[ref], [field]: value }
    setImplData(p => ({ ...p, [ref]: row }))
    if (TEXT_FIELDS.includes(field)) {
      debouncedSave(ref, () => persist(ref, row))
    } else {
      persist(ref, row)
    }
  }

  // Layer 2 reads Layer 1 (SoA) applicability as source of truth — non-applicable controls excluded
  const applicableControls = controls.filter(c => (soaMap[c.ref] ?? 'Yes') === 'Yes')
  const filtered = applicableControls.filter(c =>
    !search || c.ref.toLowerCase().includes(search.toLowerCase()) || c.title.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    applicable: applicableControls.length,
    notStarted: applicableControls.filter(c => (implData[c.ref]?.status || 'Not Started') === 'Not Started').length,
    inProgress: applicableControls.filter(c => implData[c.ref]?.status === 'In Progress').length,
    verified: applicableControls.filter(c => implData[c.ref]?.status === 'Implemented' && implData[c.ref]?.evidence_url).length,
    unverified: applicableControls.filter(c => implData[c.ref]?.status === 'Implemented' && !implData[c.ref]?.evidence_url).length,
  }

  const exportData = applicableControls.map(c => ({ ...c, ...implData[c.ref] }))

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Clause 8.1 / Annex A"
        title="ISMS Implementation — Layer 2"
        description="Control-by-control implementation tracking for every control marked Applicable in the Statement of Applicability. Applicability is inherited from SoA (Layer 1) — mark a control Not Applicable there to exclude it here."
        badges={['Layer 2', 'Reads SoA', 'ISMS']}
      />

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {[
          { label: 'Applicable Controls', value: stats.applicable, color: 'text-white' },
          { label: 'Not Started', value: stats.notStarted, color: 'text-steel-400' },
          { label: 'In Progress', value: stats.inProgress, color: 'text-blue-400' },
          { label: 'Implemented — Unverified', value: stats.unverified, color: 'text-amber-audit' },
          { label: 'Implemented — Verified', value: stats.verified, color: 'text-emerald-400' },
        ].map(s => (
          <div key={s.label} className="card-sm text-center">
            <div className={`font-display text-2xl font-bold mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs text-steel-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card mb-4">
        <div className="flex flex-wrap gap-3 items-center">
          <input className="input-field text-xs py-1.5 pl-3 flex-1 min-w-40" placeholder="Search ref or title..." value={search} onChange={e => setSearch(e.target.value)} />
          <span className="text-xs text-steel-400 ml-auto">{filtered.length} controls{savingRef ? ' — saving...' : ''}</span>
          <button onClick={() => exportToCSV(exportData, 'ISMS_Implementation', IMPL_COLUMNS)} className="btn-secondary text-xs py-1.5">
            <FileDown size={12} /> Export CSV
          </button>
        </div>
      </div>

      {!activeProgramme && <div className="card text-center py-8 mb-6 text-steel-400 text-sm">Select an audit programme to load implementation data.</div>}
      {loading && <div className="card text-center py-8 mb-6"><Loader2 size={20} className="animate-spin text-steel-400 mx-auto" /></div>}

      {!loading && activeProgramme && (
        <div className="card p-0 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-navy-700 bg-navy-800/50">
                  {['Control', 'Title', 'Theme', 'Policy Ref', 'Owner', 'Target Date', 'Status', 'Evidence'].map(h => (
                    <th key={h} className="text-left py-3 px-3 text-steel-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="py-12 text-center text-steel-400">No applicable controls match — check SoA if none are marked Applicable</td></tr>
                ) : filtered.map((c, i) => {
                  const row = implData[c.ref] || emptyImpl()
                  const ds = displayStatus(row)
                  return (
                    <tr key={c.ref} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/10'}`}>
                      <td className="py-2 px-3 whitespace-nowrap font-mono text-amber-audit font-semibold">{c.ref}</td>
                      <td className="py-2 px-3 text-white max-w-xs">{c.title}</td>
                      <td className="py-2 px-3 whitespace-nowrap"><span className={`badge text-xs ${themeColors[c.theme]}`}>{c.theme}</span></td>
                      <td className="py-2 px-3 min-w-32"><input className="input-field text-xs py-0.5 w-full" placeholder="e.g. POL-05" value={row.policy_ref} onChange={e => update(c.ref, 'policy_ref', e.target.value)} /></td>
                      <td className="py-2 px-3 min-w-28"><input className="input-field text-xs py-0.5 w-full" placeholder="Owner" value={row.owner} onChange={e => update(c.ref, 'owner', e.target.value)} /></td>
                      <td className="py-2 px-3 whitespace-nowrap"><input type="date" className="input-field text-xs py-0.5" value={row.target_date || ''} onChange={e => update(c.ref, 'target_date', e.target.value)} /></td>
                      <td className="py-2 px-3 whitespace-nowrap">
                        <select className="input-field py-0.5 text-xs w-28" value={row.status} onChange={e => update(c.ref, 'status', e.target.value)}>
                          <option>Not Started</option><option>In Progress</option><option>Implemented</option>
                        </select>
                        <div className={`mt-1 text-xs px-1.5 py-0.5 rounded inline-block ${ds.color}`}>{ds.label}</div>
                      </td>
                      <td className="py-2 px-3 min-w-40">
                        <div className="flex items-center gap-1">
                          <input className="input-field text-xs py-0.5 w-full" placeholder="Evidence URL / link" value={row.evidence_url} onChange={e => update(c.ref, 'evidence_url', e.target.value)} />
                          {row.evidence_url && <a href={row.evidence_url} target="_blank" rel="noreferrer" className="text-steel-400 hover:text-amber-audit flex-shrink-0"><ExternalLink size={12} /></a>}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-navy-700 text-xs text-steel-500">
            {filtered.length} applicable controls — {stats.verified} verified, {stats.unverified} unverified, {stats.notStarted} not started
          </div>
        </div>
      )}

      <AIPanel
        title="Generate Implementation Guidance"
        systemPrompt="You are an ISO 27001:2022 ISMS implementation specialist. Generate practical implementation guidance for Annex A controls: policy language, procedure steps, evidence types auditors expect, and a realistic implementation roadmap. Reference specific ISO 27002:2022 control numbers. Do not fabricate clause text — describe intent and practice only."
        placeholder="e.g. What evidence should I collect to verify A.8.7 Protection against malware is operating effectively?"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. SaaS, 150 staff, AWS-hosted' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Policy Outline', 'Procedure Steps', 'Evidence Checklist', 'Implementation Roadmap', 'Verification Test Approach'] },
          { id: 'context', label: 'Key Context', type: 'text', placeholder: 'e.g. Control A.8.7, target certification Q2 2027' },
        ]}
      />
    </div>
  )
}
