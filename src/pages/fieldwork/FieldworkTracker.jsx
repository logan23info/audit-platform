import { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import { CheckCircle2, Circle, Clock, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'

const controls = [
  { ref: 'ISO 27001 Cl. 5', title: 'Leadership & Policy', auditor: 'Lead Auditor', tod: 'Complete', toi: 'Complete', toe: 'N/A', pbc: 'Received', exceptions: 0, finding: null },
  { ref: 'ISO 27001 Cl. 6', title: 'Planning & SoA', auditor: 'Lead Auditor', tod: 'Complete', toi: 'In Progress', toe: 'Not Started', pbc: 'Received', exceptions: 0, finding: null },
  { ref: 'ISO 27002 A.5.7', title: 'Threat Intelligence', auditor: 'Auditor 1', tod: 'Complete', toi: 'Complete', toe: 'In Progress', pbc: 'Received', exceptions: 1, finding: 'Medium' },
  { ref: 'ISO 27002 A.6.3', title: 'IS Awareness Training', auditor: 'Auditor 1', tod: 'Complete', toi: 'Complete', toe: 'Complete', pbc: 'Received', exceptions: 0, finding: null },
  { ref: 'ISO 27002 A.8.2', title: 'Privileged Access Rights', auditor: 'Auditor 2', tod: 'Complete', toi: 'Complete', toe: 'In Progress', pbc: 'Pending', exceptions: 2, finding: 'High' },
  { ref: 'ISO 27002 A.8.8', title: 'Vulnerability Management', auditor: 'Auditor 2', tod: 'Complete', toi: 'In Progress', toe: 'Not Started', pbc: 'Pending', exceptions: 0, finding: null },
  { ref: 'ISO 27002 A.8.12', title: 'Data Leakage Prevention', auditor: 'Auditor 1', tod: 'In Progress', toi: 'Not Started', toe: 'Not Started', pbc: 'Not Received', exceptions: 0, finding: null },
  { ref: 'ISO 27005', title: 'Risk Register Review', auditor: 'Lead Auditor', tod: 'Complete', toi: 'Complete', toe: 'N/A', pbc: 'Received', exceptions: 0, finding: null },
  { ref: 'ISO 9001 Cl. 7.1.5', title: 'Calibration Register', auditor: 'Auditor 2', tod: 'Complete', toi: 'Not Started', toe: 'Not Started', pbc: 'Not Received', exceptions: 0, finding: null },
  { ref: 'ISO 9001 Cl. 9.1.2', title: 'Customer Satisfaction', auditor: 'Auditor 1', tod: 'Complete', toi: 'Complete', toe: 'Not Started', pbc: 'Received', exceptions: 0, finding: null },
]

const statusConfig = {
  'Complete': { color: 'text-emerald-400', bg: 'bg-emerald-900/30', icon: CheckCircle2 },
  'In Progress': { color: 'text-amber-audit', bg: 'bg-amber-900/30', icon: Clock },
  'Not Started': { color: 'text-steel-500', bg: 'bg-navy-800', icon: Circle },
  'N/A': { color: 'text-steel-600', bg: 'bg-navy-900', icon: Circle },
}

const pbcConfig = {
  'Received': 'bg-emerald-900/30 text-emerald-300',
  'Pending': 'bg-amber-900/30 text-amber-300',
  'Not Received': 'bg-red-900/30 text-red-300',
}

const findingConfig = {
  'High': 'bg-red-900/40 text-red-300 border border-red-700',
  'Medium': 'bg-amber-900/40 text-amber-300 border border-amber-700',
  'Low': 'bg-navy-700 text-steel-400',
}

function StatusCell({ status }) {
  const cfg = statusConfig[status] || statusConfig['Not Started']
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${cfg.bg} ${cfg.color}`}>
      <Icon size={10} />
      {status}
    </span>
  )
}

export default function FieldworkTracker() {
  const [expanded, setExpanded] = useState(null)

  const totalControls = controls.length
  const complete = controls.filter(c => c.tod === 'Complete' && c.toi === 'Complete' && (c.toe === 'Complete' || c.toe === 'N/A')).length
  const inProgress = controls.filter(c => c.tod === 'In Progress' || c.toi === 'In Progress' || c.toe === 'In Progress').length
  const findings = controls.filter(c => c.finding).length
  const exceptions = controls.reduce((sum, c) => sum + c.exceptions, 0)

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        standard="Fieldwork"
        clause="Status Tracker"
        title="Fieldwork Status Tracker"
        description="Live control testing status board — tracks TOD, TOI, and TOE progress per control, PBC receipt status, auditor assignments, exceptions, and findings across all standards."
        badges={['Fieldwork', 'All Standards']}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Controls in Scope', value: totalControls, color: 'text-white' },
          { label: 'Fully Complete', value: complete, color: 'text-emerald-400' },
          { label: 'In Progress', value: inProgress, color: 'text-amber-audit' },
          { label: 'Findings Raised', value: findings, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="card-sm text-center">
            <div className={`font-display text-2xl font-bold mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs text-steel-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card mb-4 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-700 bg-navy-800/50">
                {['Control Ref', 'Area', 'Auditor', 'TOD', 'TOI', 'TOE', 'PBC', 'Exceptions', 'Finding', ''].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-steel-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {controls.map((c, i) => (
                <>
                  <tr
                    key={c.ref}
                    className={`border-b border-navy-800 cursor-pointer hover:bg-navy-800/40 transition-colors ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}
                    onClick={() => setExpanded(expanded === i ? null : i)}
                  >
                    <td className="py-2.5 px-3 font-mono text-amber-audit font-semibold whitespace-nowrap">{c.ref}</td>
                    <td className="py-2.5 px-3 text-white whitespace-nowrap">{c.title}</td>
                    <td className="py-2.5 px-3 text-steel-300 whitespace-nowrap">{c.auditor}</td>
                    <td className="py-2.5 px-3"><StatusCell status={c.tod} /></td>
                    <td className="py-2.5 px-3"><StatusCell status={c.toi} /></td>
                    <td className="py-2.5 px-3"><StatusCell status={c.toe} /></td>
                    <td className="py-2.5 px-3">
                      <span className={`badge ${pbcConfig[c.pbc]}`}>{c.pbc}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {c.exceptions > 0
                        ? <span className="text-red-400 font-bold">{c.exceptions}</span>
                        : <span className="text-steel-600">—</span>}
                    </td>
                    <td className="py-2.5 px-3">
                      {c.finding
                        ? <span className={`badge ${findingConfig[c.finding]}`}>{c.finding}</span>
                        : <span className="text-steel-600 text-xs">—</span>}
                    </td>
                    <td className="py-2.5 px-3 text-steel-400">
                      {expanded === i ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </td>
                  </tr>
                  {expanded === i && (
                    <tr key={`${c.ref}-detail`} className="border-b border-navy-700">
                      <td colSpan={10} className="px-4 py-3 bg-navy-800/50">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <div className="text-steel-400 font-medium mb-1">Testing Notes</div>
                            <div className="text-steel-300 leading-relaxed">
                              {c.tod === 'Complete' ? '✓ TOD concluded — design adequate. ' : ''}
                              {c.toi === 'Complete' ? '✓ TOI concluded — implemented. ' : ''}
                              {c.toe === 'Complete' ? '✓ TOE concluded — effective. ' : ''}
                              {c.exceptions > 0 ? `⚠ ${c.exceptions} exception(s) noted in TOE sample.` : ''}
                              {c.tod === 'Not Started' ? 'TOD pending — awaiting PBC.' : ''}
                            </div>
                          </div>
                          <div>
                            <div className="text-steel-400 font-medium mb-1">PBC Status</div>
                            <div className={`badge ${pbcConfig[c.pbc]} mb-1`}>{c.pbc}</div>
                            <div className="text-steel-300">{c.pbc === 'Not Received' ? 'Chase auditee — outstanding evidence' : c.pbc === 'Pending' ? 'Received — under review' : 'Received and verified'}</div>
                          </div>
                          <div>
                            <div className="text-steel-400 font-medium mb-1">Finding Status</div>
                            {c.finding
                              ? <><span className={`badge ${findingConfig[c.finding]} mb-1`}>{c.finding} Finding</span><div className="text-steel-300">4Cs developed — awaiting management response</div></>
                              : <div className="text-emerald-400">No findings — control testing satisfactory</div>}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title mb-3">Exceptions Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {controls.filter(c => c.exceptions > 0 || c.finding).map(c => (
            <div key={c.ref} className="bg-navy-800 border border-red-900/50 rounded-lg p-3 flex items-start gap-3">
              <AlertTriangle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white mb-0.5">{c.ref} — {c.title}</div>
                <div className="text-xs text-steel-400">
                  {c.exceptions > 0 && `${c.exceptions} TOE exception(s). `}
                  {c.finding && <span className={`badge ${findingConfig[c.finding]} ml-1`}>{c.finding} Finding</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
