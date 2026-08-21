import { useLocation } from 'react-router-dom'
import { Construction, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { navSections } from '../navConfig'

function getPageInfo(pathname) {
  for (const section of navSections) {
    for (const item of section.items) {
      if (item.path === pathname) return { label: item.label, section: section.label }
    }
  }
  return { label: 'Module', section: 'Platform' }
}

export default function ComingSoon() {
  const location = useLocation()
  const navigate = useNavigate()
  const info = getPageInfo(location.pathname)

  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="w-16 h-16 rounded-2xl bg-navy-800 border border-navy-600 flex items-center justify-center mx-auto mb-6">
        <Construction size={28} className="text-amber-audit" />
      </div>
      <div className="clause-tag mb-3 inline-block">{info.section}</div>
      <h1 className="font-display text-2xl font-bold text-white mb-3">{info.label}</h1>
      <p className="text-steel-300 text-sm leading-relaxed mb-6">
        This module is part of the complete platform architecture and will be built in the next sprint. The full 58-page platform is being built progressively — ISO 19011 backbone (Sprint 1) is active now.
      </p>
      <div className="card text-left mb-6">
        <div className="text-xs text-steel-400 font-semibold mb-2 uppercase tracking-wide">Build Sequence</div>
        <div className="space-y-1.5 text-xs text-steel-300">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-audit flex-shrink-0" /> Sprint 1 — Dashboard + ISO 19011 Cl. 4, 5, TOD, TOI, TOE (Active)</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-steel-400 flex-shrink-0" /> Sprint 2 — ISO 19011 Cl. 6 full + Findings + Meetings + Reporting</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-steel-400 flex-shrink-0" /> Sprint 3 — ISO 27001 Cl. 4–10</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-steel-400 flex-shrink-0" /> Sprint 4 — ISO 27002 (4 theme pages)</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-steel-400 flex-shrink-0" /> Sprint 5 — ISO 27005 Risk Engine</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-steel-400 flex-shrink-0" /> Sprint 6 — ISO 9001 + IMS Cross-Walk</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-steel-400 flex-shrink-0" /> Sprint 7 — Fieldwork Tracker + PBC List</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-steel-400 flex-shrink-0" /> Sprint 8 — Reporting & Governance</div>
        </div>
      </div>
      <button onClick={() => navigate('/')} className="btn-secondary">
        <ArrowLeft size={14} /> Back to Dashboard
      </button>
    </div>
  )
}
