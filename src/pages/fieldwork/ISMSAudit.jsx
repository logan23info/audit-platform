import { useState, useEffect, useCallback } from 'react'
import { ShieldCheck, Loader2, ClipboardList, CheckCircle2, AlertTriangle } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { useProgramme } from '../../context/ProgrammeContext'
import { useAuth } from '../../context/AuthContext'
import { getSoA, getISMSImplementation, getSites, createPBCItem } from '../../lib/supabase'
import { controls as annexAControls } from '../../data/iso27002_controls'
import { useToast } from '../../components/Toast'

// Truth table — certification stage readiness
// Stage 1 (documentation review): every control has an applicability decision + justification/exclusion reason
// Stage 2 (implementation audit): every applicable control is Implemented with evidence
function stage1Ready(soaRows) {
  if (soaRows.length < annexAControls.length) return false
  return soaRows.every(r => r.applicable === 'No' ? !!r.exclusion_reason : !!r.justification)
}

export default function ISMSAudit() {
  const { user } = useAuth()
  const { activeProgramme } = useProgramme()
  const { toast } = useToast()
  const [soaRows, setSoaRows] = useState([])
  const [implRows, setImplRows] = useState([])
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)

  const load = useCallback(async () => {
    if (!activeProgramme) return
    setLoading(true)
    try {
      const [soa, impl, siteRows] = await Promise.all([getSoA(activeProgramme.id), getISMSImplementation(activeProgramme.id), getSites(activeProgramme.id)])
      setSoaRows(soa); setImplRows(impl); setSites(siteRows)
    } catch (e) { toast('Failed to load: ' + e.message, 'error') }
    setLoading(false)
  }, [activeProgramme])

  useEffect(() => { load() }, [load])

  const implByControl = Object.fromEntries(implRows.map(r => [r.control_id, r]))
  const applicableRows = soaRows.filter(r => r.applicable === 'Yes')
  const gaps = applicableRows.filter(r => {
    const impl = implByControl[r.control_id]
    return !impl || impl.status !== 'Implemented' || !impl.evidence_url
  })
  const s1 = stage1Ready(soaRows)
  const s2Pct = applicableRows.length > 0 ? Math.round(((applicableRows.length - gaps.length) / applicableRows.length) * 100) : 0
  const scopedOut = sites.filter(s => !s.in_scope).length

  const generatePBC = async () => {
    if (!activeProgramme || gaps.length === 0) return
    setGenerating(true)
    try {
      for (const g of gaps) {
        const meta = annexAControls.find(c => c.ref === g.control_id)
        await createPBCItem({
          programme_id: activeProgramme.id, user_id: user?.id, status: 'Not Started',
          description: `Evidence of implementation — ${meta?.title || g.control_id}`,
          control_ref: g.control_id, phase: 'PBC Evidence', domain: meta?.theme || 'Organizational', priority: 'High',
        })
      }
      toast(`${gaps.length} PBC evidence requests generated`)
    } catch (e) { toast('PBC generation failed: ' + e.message, 'error') }
    setGenerating(false)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Stage 1 / Stage 2"
        title="ISMS Certification Audit — Readiness"
        description="Composes SoA, ISMS Implementation, and Scope Register into a certification readiness view. Stage 1 checks documentation completeness; Stage 2 checks implementation evidence. Generates PBC evidence requests for outstanding applicable controls."
        badges={['Conduct', 'ISMS', 'Composed — no new data']}
      />

      {!activeProgramme ? (
        <div className="card text-center py-12 text-steel-400 text-sm">Select an audit programme.</div>
      ) : loading ? (
        <div className="card text-center py-12"><Loader2 size={22} className="animate-spin text-steel-400 mx-auto" /></div>
      ) : (
        <>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="card-sm text-center">
              <ClipboardList size={18} className={`mx-auto mb-2 ${s1 ? 'text-emerald-400' : 'text-amber-audit'}`} />
              <div className={`font-display text-lg font-bold ${s1 ? 'text-emerald-400' : 'text-amber-audit'}`}>{s1 ? 'Ready' : 'Not Ready'}</div>
              <div className="text-xs text-steel-400">Stage 1 — SoA documentation complete</div>
            </div>
            <div className="card-sm text-center">
              <ShieldCheck size={18} className="mx-auto mb-2 text-blue-400" />
              <div className="font-display text-lg font-bold text-blue-400">{s2Pct}%</div>
              <div className="text-xs text-steel-400">Stage 2 — applicable controls verified</div>
            </div>
            <div className="card-sm text-center">
              <AlertTriangle size={18} className="mx-auto mb-2 text-steel-400" />
              <div className="font-display text-lg font-bold text-white">{gaps.length}</div>
              <div className="text-xs text-steel-400">Outstanding controls{scopedOut ? ` · ${scopedOut} sites out of scope` : ''}</div>
            </div>
          </div>

          {!s1 && (
            <div className="card mb-6 border-l-4 border-l-amber-audit">
              <div className="text-sm text-white font-medium mb-1">Stage 1 blocked</div>
              <div className="text-xs text-steel-400">Every Annex A control needs an applicability decision with a justification (if Applicable) or exclusion reason (if Not Applicable) in the SoA before Stage 1 documentation review can proceed.</div>
            </div>
          )}

          <div className="card mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="section-title mb-0">Outstanding Controls — Stage 2</h2>
              <button onClick={generatePBC} disabled={generating || gaps.length === 0} className="btn-primary text-xs py-1.5">
                {generating ? <><Loader2 size={12} className="animate-spin" /> Generating...</> : `Generate PBC for ${gaps.length} gaps`}
              </button>
            </div>
            {gaps.length === 0 ? (
              <div className="text-center py-8 text-emerald-400 text-sm flex items-center justify-center gap-2"><CheckCircle2 size={16} /> All applicable controls implemented and verified</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-navy-700 bg-navy-800/50">{['Control', 'Title', 'Status'].map(h => <th key={h} className="text-left py-2 px-3 text-steel-400 font-medium">{h}</th>)}</tr></thead>
                  <tbody>
                    {gaps.map(g => {
                      const meta = annexAControls.find(c => c.ref === g.control_id)
                      const impl = implByControl[g.control_id]
                      return (
                        <tr key={g.control_id} className="border-b border-navy-800">
                          <td className="py-2 px-3 font-mono text-amber-audit font-semibold">{g.control_id}</td>
                          <td className="py-2 px-3 text-white">{meta?.title}</td>
                          <td className="py-2 px-3 text-steel-400">{impl ? (impl.status === 'Implemented' ? 'Implemented — Unverified' : impl.status) : 'Not Started'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <AIPanel
            title="Generate Certification Audit Guidance"
            systemPrompt="You are an ISO 27001:2022 certification body lead auditor. Generate Stage 1/Stage 2 audit planning guidance: documentation review checklists, sampling approach for Stage 2, and typical nonconformity patterns for the controls described. Do not fabricate certification body procedures — describe general good practice only."
            placeholder="e.g. What should I prepare before Stage 1 documentation review for a 150-person SaaS company?"
            contextFields={[
              { id: 'stage', label: 'Audit Stage', type: 'select', options: ['Stage 1 — Documentation Review', 'Stage 2 — Implementation Audit', 'Surveillance Audit', 'Recertification'] },
              { id: 'context', label: 'Key Context', type: 'text', placeholder: 'e.g. First certification, target date, certification body' },
            ]}
          />
        </>
      )}
    </div>
  )
}
