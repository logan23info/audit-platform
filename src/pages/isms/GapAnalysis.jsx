import { useState, useEffect, useCallback } from 'react'
import { Loader2, FileDown, Target } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import { useProgramme } from '../../context/ProgrammeContext'
import { getSoA, getISMSImplementation } from '../../lib/supabase'
import { controls } from '../../data/iso27002_controls'
import { useToast } from '../../components/Toast'
import { exportToCSV } from '../../utils/exportCSV'

// Gap = applicable control not yet Implemented/Verified. Read-only report —
// computed from existing SoA (Layer 1) + Implementation (Layer 2) data,
// same source of truth as every other ISMS page. No new table.
const GAP_STATUSES = ['Not Started', 'Planned', 'In Progress']
const COLUMNS = [
  { label: 'Ref', key: 'ref' }, { label: 'Title', key: 'title' },
  { label: 'Applicable', key: 'applicable' }, { label: 'Implementation Status', key: 'status' },
  { label: 'Gap', key: 'gap' },
]

export default function GapAnalysis() {
  const { activeProgramme } = useProgramme()
  const { toast } = useToast()
  const [soaMap, setSoaMap] = useState({})
  const [implData, setImplData] = useState({})
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    if (!activeProgramme) return
    setLoading(true)
    try {
      const [soaRows, implRows] = await Promise.all([getSoA(activeProgramme.id), getISMSImplementation(activeProgramme.id)])
      const soa = {}
      soaRows.forEach(r => { soa[r.control_id] = r.applicable })
      const impl = {}
      implRows.forEach(r => { impl[r.control_id] = r.status })
      setSoaMap(soa); setImplData(impl)
    } catch (e) { toast('Failed to load: ' + e.message, 'error') }
    setLoading(false)
  }, [activeProgramme])

  useEffect(() => { load() }, [load])

  const applicableControls = controls.filter(c => (soaMap[c.ref] ?? 'Yes') === 'Yes')
  const gaps = applicableControls.filter(c => GAP_STATUSES.includes(implData[c.ref] || 'Not Started'))
  const exportRows = applicableControls.map(c => ({ ref: c.ref, title: c.title, applicable: soaMap[c.ref] || 'Yes', status: implData[c.ref] || 'Not Started', gap: GAP_STATUSES.includes(implData[c.ref] || 'Not Started') ? 'Yes' : 'No' }))

  const byCategory = {}
  gaps.forEach(c => { (byCategory[c.theme || 'Other'] ||= []).push(c) })

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Gap Analysis"
        title="Gap Analysis"
        description="Applicable controls (per SoA) that are not yet Implemented or Verified (per Layer 2). Read-only report computed from existing SoA + Implementation data — no separate data entry."
        badges={['Report', 'Reads SoA + Layer 2', 'ISMS']}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Applicable Controls', value: applicableControls.length, color: 'text-white' },
          { label: 'Gaps (Not Started/Planned/In Progress)', value: gaps.length, color: 'text-amber-audit' },
          { label: 'Gap-Free', value: applicableControls.length - gaps.length, color: 'text-emerald-400' },
        ].map(s => (
          <div key={s.label} className="card-sm text-center">
            <div className={`font-display text-2xl font-bold mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs text-steel-400">{s.label}</div>
          </div>
        ))}
      </div>

      {activeProgramme && (
        <div className="mb-4 flex justify-end">
          <button onClick={() => exportToCSV(exportRows, `ISMS_Gap_Analysis_${activeProgramme?.programme_id}`, COLUMNS)} disabled={exportRows.length === 0} className="btn-secondary text-xs py-1.5"><FileDown size={12} /> Export Full CSV</button>
        </div>
      )}

      {!activeProgramme ? (
        <div className="card text-center py-12 text-steel-400 text-sm"><Target size={24} className="mx-auto mb-2" />Select an audit programme.</div>
      ) : loading ? (
        <div className="card text-center py-12"><Loader2 size={22} className="animate-spin text-steel-400 mx-auto" /></div>
      ) : gaps.length === 0 ? (
        <div className="card text-center py-12 text-emerald-400 text-sm">No gaps — every applicable control is Implemented or Verified.</div>
      ) : (
        Object.entries(byCategory).map(([cat, items]) => (
          <div key={cat} className="card mb-4">
            <h3 className="section-title mb-3">{cat} <span className="text-steel-400 font-normal">({items.length})</span></h3>
            <div className="space-y-1.5">
              {items.map(c => (
                <div key={c.ref} className="flex items-center justify-between text-xs border-b border-navy-800 py-1.5 last:border-0">
                  <div><span className="font-mono text-amber-audit">{c.ref}</span> <span className="text-steel-300 ml-2">{c.title}</span></div>
                  <span className="badge badge-steel text-xs">{implData[c.ref] || 'Not Started'}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
