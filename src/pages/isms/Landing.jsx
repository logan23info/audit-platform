import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { CheckSquare, ClipboardList, ShieldCheck, Loader2 } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import { useProgramme } from '../../context/ProgrammeContext'
import { getSoA, getISMSImplementation } from '../../lib/supabase'
import { controls } from '../../data/iso27002_controls'

export default function ISMSLanding() {
  const { activeProgramme } = useProgramme()
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ applicable: 0, verified: 0, total: controls.length })

  const load = useCallback(async () => {
    if (!activeProgramme) return
    setLoading(true)
    try {
      const [soaRows, implRows] = await Promise.all([getSoA(activeProgramme.id), getISMSImplementation(activeProgramme.id)])
      const applicable = soaRows.filter(r => r.applicable === 'Yes').length
      const verified = implRows.filter(r => r.status === 'Implemented' && r.evidence_url).length
      setStats({ applicable, verified, total: controls.length })
    } catch (e) { /* silent — landing is summary-only */ }
    setLoading(false)
  }, [activeProgramme])

  useEffect(() => { load() }, [load])

  const pct = stats.applicable > 0 ? Math.round((stats.verified / stats.applicable) * 100) : 0

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        title="ISMS Implementation"
        description="Two-layer ISMS build: Layer 1 marks applicability (SoA), Layer 2 tracks implementation evidence per applicable control."
        badges={['ISMS', activeProgramme?.programme_id || 'No Programme']}
      />

      {activeProgramme && (
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-steel-300">Implementation Readiness (verified / applicable)</span>
            <span className="text-sm font-bold text-white">{loading ? <Loader2 size={14} className="animate-spin inline" /> : `${pct}%`}</span>
          </div>
          <div className="w-full h-2 bg-navy-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="text-xs text-steel-500 mt-2">{stats.verified} verified of {stats.applicable} applicable controls ({stats.total} total in Annex A)</div>
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-4">
        <Link to="/iso27001/soa" className="card hover:border-steel-500 transition-colors">
          <CheckSquare size={20} className="text-amber-audit mb-2" />
          <div className="font-semibold text-white mb-1">Layer 1 — SoA</div>
          <div className="text-xs text-steel-400">Mark applicability, justification, and target status for all 93 controls.</div>
        </Link>
        <Link to="/isms/implement" className="card hover:border-steel-500 transition-colors">
          <ClipboardList size={20} className="text-blue-400 mb-2" />
          <div className="font-semibold text-white mb-1">Layer 2 — Implement</div>
          <div className="text-xs text-steel-400">Track policy refs, owners, target dates, and evidence per applicable control.</div>
        </Link>
        <Link to="/iso27005/rtp" className="card hover:border-steel-500 transition-colors">
          <ShieldCheck size={20} className="text-emerald-400 mb-2" />
          <div className="font-semibold text-white mb-1">Risk ↔ Control Map</div>
          <div className="text-xs text-steel-400">Cl. 6.1.3 — link risk register entries to the controls that treat them.</div>
        </Link>
      </div>
    </div>
  )
}
