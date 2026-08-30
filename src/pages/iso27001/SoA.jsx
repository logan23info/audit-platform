import { useState, useEffect, useCallback, useRef } from 'react'
import { CheckCircle2, X, FileDown, Filter, Loader2 } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { exportToCSV } from '../../utils/exportCSV'
import { controls, themeColors } from '../../data/iso27002_controls'
import { useProgramme } from '../../context/ProgrammeContext'
import { useAuth } from '../../context/AuthContext'
import { getSoA, upsertSoAControl, getISMSImplementation, logControlHistory, archiveControl, getSites, getControlSites, linkControlSite, unlinkControlSite } from '../../lib/supabase'
import { useToast } from '../../components/Toast'
import { debounce } from '../../lib/debounce'

const debouncedSave = debounce((fn) => fn(), 600)
const TEXT_FIELDS = ['justification', 'exclusion_reason', 'notes']
// Sprint 7: justification/exclusion_reason now versioned too, not just status fields
const HISTORY_FIELDS = ['applicable', 'status', 'justification', 'exclusion_reason']

const SOA_COLUMNS = [
  { label: 'Control Ref', key: 'ref' }, { label: 'Control Title', key: 'title' },
  { label: 'Theme', key: 'theme' }, { label: 'Applicable', key: 'applicable' },
  { label: 'Justification for Inclusion', key: 'justification' },
  { label: 'Justification for Exclusion', key: 'exclusion_reason' },
  { label: 'Implementation Status', key: 'status' }, { label: 'Notes', key: 'notes' },
]

const emptyRow = () => ({ applicable: 'Yes', justification: '', exclusion_reason: '', status: 'Planned', notes: '' })

export default function SoA() {
  const { user } = useAuth()
  const { activeProgramme } = useProgramme()
  const { toast } = useToast()
  const [soaData, setSoaData] = useState(() => controls.reduce((acc, c) => ({ ...acc, [c.ref]: emptyRow() }), {}))
  const [evidenceMap, setEvidenceMap] = useState({}) // control_id -> has Layer 2 evidence, for the applicability-flip safeguard
  const [outOfScopeSites, setOutOfScopeSites] = useState([])
  const [controlSites, setControlSites] = useState({}) // control_id -> [{id, site_id, site_name}]
  const [loading, setLoading] = useState(false)
  const [savingRef, setSavingRef] = useState(null)
  // Sprint 7: snapshot of last-persisted values per control, used to diff at save-time (not per-keystroke)
  // so debounced text fields (justification/exclusion_reason) log one history row per settled edit, not per keystroke.
  const lastSavedRef = useRef({})
  // Sprint 12 fix: separate from lastSavedRef (last *persisted* value, used for
  // history diffing) — this mirrors the live edit state so persist() always
  // writes the CURRENT row, never a stale closure captured before a later
  // immediate field edit. Same bug class found and fixed in RCM.jsx/Implement.jsx.
  const liveDataRef = useRef({})
  const [filterTheme, setFilterTheme] = useState('All')
  const [filterApplicable, setFilterApplicable] = useState('All')
  const [filterNew, setFilterNew] = useState(false)
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    if (!activeProgramme) return
    setLoading(true)
    try {
      const [rows, implRows, sites, csRows] = await Promise.all([getSoA(activeProgramme.id), getISMSImplementation(activeProgramme.id), getSites(activeProgramme.id), getControlSites(activeProgramme.id)])
      const byRef = controls.reduce((acc, c) => ({ ...acc, [c.ref]: emptyRow() }), {})
      rows.forEach(r => { byRef[r.control_id] = { applicable: r.applicable, justification: r.justification || '', exclusion_reason: r.exclusion_reason || '', status: r.status, notes: r.notes || '' } })
      setSoaData(byRef)
      lastSavedRef.current = byRef
      liveDataRef.current = byRef
      const ev = {}
      implRows.forEach(r => { if (r.evidence_url) ev[r.control_id] = true })
      setEvidenceMap(ev)
      setOutOfScopeSites(sites.filter(s => !s.in_scope))
      const siteById = Object.fromEntries(sites.map(s => [s.id, s.site_name]))
      const cs = {}
      csRows.forEach(r => { (cs[r.control_id] ||= []).push({ id: r.id, site_id: r.site_id, site_name: siteById[r.site_id] || 'Unknown site' }) })
      setControlSites(cs)
    } catch (e) { toast('Failed to load SoA: ' + e.message, 'error') }
    setLoading(false)
  }, [activeProgramme])

  useEffect(() => { load() }, [load])

  const persist = (ref, reason = null) => {
    if (!activeProgramme) return
    const row = liveDataRef.current[ref]
    if (!row) return
    setSavingRef(ref)
    const prev = lastSavedRef.current[ref] || emptyRow()
    upsertSoAControl({ programme_id: activeProgramme.id, user_id: user?.id, control_id: ref, ...row })
      .then(() => {
        // Diff against last-persisted snapshot, not per-keystroke state — so debounced text
        // fields log one settled history row instead of one per keystroke.
        HISTORY_FIELDS.forEach(field => {
          if ((prev[field] ?? null) !== (row[field] ?? null)) {
            logControlHistory({
              programme_id: activeProgramme.id, user_id: user?.id, control_id: ref, source: 'soa',
              field, old_value: prev[field] ?? null, new_value: row[field] ?? null,
              reason: field === 'applicable' ? reason : null,
            }).catch(() => {})
          }
        })
        lastSavedRef.current[ref] = row
      })
      .catch(e => toast('Save failed — ' + ref + ': ' + e.message, 'error'))
      .finally(() => setSavingRef(null))
  }

  // Truth table: applicable=No -> status forced Not Applicable; applicable=Yes & status was Not Applicable -> reset to Planned
  const update = (ref, field, value) => {
    const oldValue = soaData[ref]?.[field]
    let reason = null
    // Safeguard + retirement reason capture: flipping to Not Applicable after Layer 2 evidence was attached
    if (field === 'applicable' && value === 'No' && evidenceMap[ref]) {
      const ok = window.confirm(`${ref} already has implementation evidence attached in ISMS Implementation. Marking it Not Applicable will exclude it from Layer 2 tracking. Continue?`)
      if (!ok) return
    }
    if (field === 'applicable' && value === 'No' && oldValue === 'Yes') {
      reason = window.prompt(`Retiring ${ref} (Applicable -> Not Applicable). Reason for the version history? (optional)`) || null
    }
    const row = { ...soaData[ref], [field]: value }
    if (field === 'applicable' && value === 'No') row.status = 'Not Applicable'
    if (field === 'applicable' && value === 'Yes' && row.status === 'Not Applicable') row.status = 'Planned'
    liveDataRef.current = { ...liveDataRef.current, [ref]: row }
    setSoaData(p => ({ ...p, [ref]: row }))
    if (TEXT_FIELDS.includes(field)) {
      debouncedSave(ref, () => persist(ref, reason))
    } else {
      persist(ref, reason)
    }
    // History is now logged inside persist() itself, diffed against the last-persisted
    // snapshot — see lastSavedRef above. This covers debounced text fields correctly.
    // Retirement cascade: archive (not delete) Layer 2 + risk-control-map rows; unarchive on reactivation
    if (field === 'applicable' && oldValue !== value && activeProgramme) {
      archiveControl(activeProgramme.id, ref, value === 'No').catch(() => {})
    }
  }

  const linkSite = (ref, siteId) => {
    if (!siteId || !activeProgramme) return
    linkControlSite({ programme_id: activeProgramme.id, user_id: user?.id, control_id: ref, site_id: siteId })
      .then(row => setControlSites(p => ({ ...p, [ref]: [...(p[ref] || []), { id: row.id, site_id: siteId, site_name: outOfScopeSites.find(s => s.id === siteId)?.site_name }] })))
      .catch(e => toast('Link failed: ' + e.message, 'error'))
  }

  const unlinkSite = (ref, linkId) => {
    unlinkControlSite(linkId)
      .then(() => setControlSites(p => ({ ...p, [ref]: (p[ref] || []).filter(l => l.id !== linkId) })))
      .catch(() => toast('Unlink failed', 'error'))
  }

  const filtered = controls.filter(c =>
    (filterTheme === 'All' || c.theme === filterTheme) &&
    (filterApplicable === 'All' || soaData[c.ref]?.applicable === filterApplicable) &&
    (!filterNew || c.new) &&
    (!search || c.ref.toLowerCase().includes(search.toLowerCase()) || c.title.toLowerCase().includes(search.toLowerCase()))
  )

  const stats = {
    total: controls.length,
    applicable: controls.filter(c => soaData[c.ref]?.applicable === 'Yes').length,
    notApplicable: controls.filter(c => soaData[c.ref]?.applicable === 'No').length,
    implemented: controls.filter(c => soaData[c.ref]?.status === 'Implemented').length,
    newControls: controls.filter(c => c.new).length,
  }

  const exportData = controls.map(c => ({ ...c, ...soaData[c.ref] }))

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Clause 6.1.3"
        title="Statement of Applicability (SoA)"
        description="All 93 ISO 27001:2022 Annex A controls. Mark each as Applicable or Not Applicable, add justification, and track implementation status. Export to CSV for formal SoA document. New controls (⭐) are the 11 additions in ISO 27002:2022."
        badges={['Cl. 6.1.3', '93 Controls', 'SoA']}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {[
          { label: 'Total Controls', value: stats.total, color: 'text-white' },
          { label: 'Applicable', value: stats.applicable, color: 'text-emerald-400' },
          { label: 'Not Applicable', value: stats.notApplicable, color: 'text-steel-400' },
          { label: 'Implemented', value: stats.implemented, color: 'text-blue-400' },
          { label: 'New in 2022', value: stats.newControls, color: 'text-amber-audit' },
        ].map(s => (
          <div key={s.label} className="card-sm text-center">
            <div className={`font-display text-2xl font-bold mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs text-steel-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-40">
            <input className="input-field text-xs py-1.5 pl-3" placeholder="Search ref or title..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-steel-400">Theme:</span>
            <select className="input-field py-1 text-xs" value={filterTheme} onChange={e => setFilterTheme(e.target.value)}>
              {['All', 'Organizational', 'People', 'Physical', 'Technological'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-steel-400">Applicable:</span>
            <select className="input-field py-1 text-xs" value={filterApplicable} onChange={e => setFilterApplicable(e.target.value)}>
              {['All', 'Yes', 'No'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={filterNew} onChange={e => setFilterNew(e.target.checked)} className="accent-amber-audit" />
            <span className="text-xs text-steel-300">New 2022 only</span>
          </label>
          <span className="text-xs text-steel-400 ml-auto">{filtered.length} controls{savingRef ? ' — saving...' : ''}</span>
          <button onClick={() => exportToCSV(exportData, 'SoA_ISO27001', SOA_COLUMNS)} className="btn-secondary text-xs py-1.5">
            <FileDown size={12} /> Export SoA CSV
          </button>
        </div>
      </div>

      {!activeProgramme && (
        <div className="card text-center py-8 mb-6 text-steel-400 text-sm">Select an audit programme to save SoA data — showing unsaved defaults.</div>
      )}
      {loading && <div className="card text-center py-8 mb-6"><Loader2 size={20} className="animate-spin text-steel-400 mx-auto" /></div>}

      {/* SoA Table */}
      <div className="card p-0 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-700 bg-navy-800/50">
                {['Control', 'Title', 'Theme', 'Applicable', 'Justification / Exclusion Reason', 'Status'].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-steel-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => {
                const row = soaData[c.ref]
                const isApplicable = row.applicable === 'Yes'
                return (
                  <tr key={c.ref} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/10'}`}>
                    <td className="py-2 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-amber-audit font-semibold">{c.ref}</span>
                        {c.new && <span className="text-amber-audit text-xs">⭐</span>}
                      </div>
                    </td>
                    <td className="py-2 px-3 text-white max-w-xs">{c.title}</td>
                    <td className="py-2 px-3 whitespace-nowrap">
                      <span className={`badge text-xs ${themeColors[c.theme]}`}>{c.theme}</span>
                    </td>
                    <td className="py-2 px-3 whitespace-nowrap">
                      <select className={`text-xs px-2 py-0.5 rounded border font-semibold ${isApplicable ? 'bg-emerald-900/40 text-emerald-300 border-emerald-700' : 'bg-navy-700 text-steel-400 border-navy-600'}`}
                        value={row.applicable} onChange={e => update(c.ref, 'applicable', e.target.value)}>
                        <option value="Yes">✓ Yes</option>
                        <option value="No">✗ No</option>
                      </select>
                    </td>
                    <td className="py-2 px-3 min-w-64">
                      <input className="input-field text-xs py-0.5 w-full"
                        placeholder={isApplicable ? 'Justification for inclusion...' : 'Reason for exclusion...'}
                        value={isApplicable ? row.justification : row.exclusion_reason}
                        onChange={e => update(c.ref, isApplicable ? 'justification' : 'exclusion_reason', e.target.value)} />
                      {!isApplicable && outOfScopeSites.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap items-center gap-1">
                          {(controlSites[c.ref] || []).map(l => (
                            <span key={l.id} className="badge badge-steel text-xs inline-flex items-center gap-1">
                              {l.site_name}
                              <button onClick={() => unlinkSite(c.ref, l.id)} className="hover:text-red-400"><X size={9} /></button>
                            </span>
                          ))}
                          <select className="input-field text-xs py-0 px-1 h-5 w-32" value=""
                            onChange={e => linkSite(c.ref, e.target.value)}>
                            <option value="">+ link out-of-scope site</option>
                            {outOfScopeSites.filter(s => !(controlSites[c.ref] || []).some(l => l.site_id === s.id)).map(s => (
                              <option key={s.id} value={s.id}>{s.site_name}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-3 whitespace-nowrap">
                      <select className="input-field py-0.5 text-xs w-28" value={row.status}
                        onChange={e => update(c.ref, 'status', e.target.value)}
                        disabled={!isApplicable}>
                        <option>Planned</option>
                        <option>In Progress</option>
                        <option>Implemented</option>
                        <option>Not Applicable</option>
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-navy-700 text-xs text-steel-500">
          {filtered.length} of {controls.length} controls shown — {stats.applicable} applicable, {stats.implemented} implemented
        </div>
      </div>

      <AIPanel
        title="Generate SoA Documentation"
        systemPrompt="You are an ISO 27001:2022 Clause 6.1.3 Statement of Applicability specialist. Generate formal SoA documentation including control applicability justifications, exclusion rationale, and implementation roadmaps. Reference specific ISO 27002:2022 control numbers. Produce board-ready, certification-ready documentation."
        placeholder="e.g. Generate exclusion justification for A.7.4 Physical Security Monitoring for a fully remote organisation with no physical offices"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. AWS-native SaaS, 200 staff, fully remote' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['SoA Executive Summary', 'Control Exclusion Justifications', 'Implementation Roadmap', 'New Controls Assessment (11 new in 2022)', 'Theme Summary — Organizational', 'Theme Summary — People', 'Theme Summary — Physical', 'Theme Summary — Technological'] },
          { id: 'context', label: 'Key Context', type: 'text', placeholder: 'e.g. ISO 27001:2022 certification target Q4 2025, AWS GovCloud, FCA regulated' },
        ]}
      />
    </div>
  )
}
