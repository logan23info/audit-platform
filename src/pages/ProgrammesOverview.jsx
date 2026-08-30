import { useNavigate } from 'react-router-dom'
import { FolderOpen, ArrowRight, Plus } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { useProgramme } from '../context/ProgrammeContext'

// Read-only cross-programme list — no new table, reuses ProgrammeContext's
// existing `programmes` (already fetched for the header ProgrammeSelector).
// Switching the active programme here does the same thing the header
// dropdown does; new/edit still happens via that dropdown, not duplicated.
const STATUS_COLORS = { 'In Progress': 'bg-amber-900/40 text-amber-300', 'Complete': 'bg-emerald-900/40 text-emerald-300', 'Planning': 'badge-steel' }

export default function ProgrammesOverview() {
  const { programmes, activeProgramme, setActiveProgramme, loading } = useProgramme()
  const navigate = useNavigate()

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="Overview"
        clause="Programmes"
        title="Audit Programmes"
        description="All audit programmes you have access to, across every role. Switch the active programme from here or from the header selector — both control the same session state."
        badges={['Overview', `${programmes.length} Programme${programmes.length === 1 ? '' : 's'}`]}
      />

      {loading ? (
        <div className="card text-center py-12 text-steel-400 text-sm">Loading…</div>
      ) : programmes.length === 0 ? (
        <div className="card text-center py-12 text-steel-400 text-sm">
          <FolderOpen size={24} className="mx-auto mb-2" />
          No audit programmes yet — create one from the header selector.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {programmes.map(p => (
            <button
              key={p.id}
              onClick={() => { setActiveProgramme(p); navigate('/') }}
              className={`card text-left hover:border-steel-400/50 ${activeProgramme?.id === p.id ? 'border-amber-audit' : ''}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-sm font-bold text-white">{p.programme_id}</span>
                <span className={`badge text-xs ${STATUS_COLORS[p.status] || 'badge-steel'}`}>{p.status}</span>
              </div>
              <div className="text-xs text-steel-300 truncate mb-2">{p.name}</div>
              <div className="flex items-center justify-between text-xs text-steel-500">
                <span>{p.created_at ? new Date(p.created_at).toLocaleDateString() : ''}</span>
                {activeProgramme?.id === p.id ? <span className="text-amber-audit font-medium">Active</span> : <span className="flex items-center gap-1">Switch <ArrowRight size={11} /></span>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
