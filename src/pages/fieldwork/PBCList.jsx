import { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2, Circle, Clock, Filter, Download } from 'lucide-react'

const pbcItems = [
  { id: 'PBC001', control: 'ISO 27001 Cl. 5.2', description: 'Information Security Policy (current approved version)', phase: 'TOD', domain: 'Governance', status: 'Received', priority: 'High' },
  { id: 'PBC002', control: 'ISO 27001 Cl. 5.3', description: 'RACI Matrix — ISMS roles and responsibilities', phase: 'TOD', domain: 'Governance', status: 'Received', priority: 'High' },
  { id: 'PBC003', control: 'ISO 27001 Cl. 6.1.3', description: 'Statement of Applicability (SoA) — signed and current', phase: 'TOD', domain: 'Planning', status: 'Pending', priority: 'High' },
  { id: 'PBC004', control: 'ISO 27001 Cl. 6.1.2', description: 'Risk Assessment results — current cycle', phase: 'TOD', domain: 'Risk', status: 'Pending', priority: 'High' },
  { id: 'PBC005', control: 'ISO 27002 A.5.7', description: 'Threat Intelligence reports — last 3 months', phase: 'TOI', domain: 'Organizational', status: 'Not Started', priority: 'Medium' },
  { id: 'PBC006', control: 'ISO 27002 A.6.3', description: 'IS Awareness Training completion records — all staff, current year', phase: 'TOE', domain: 'People', status: 'Received', priority: 'High' },
  { id: 'PBC007', control: 'ISO 27002 A.7.2', description: 'Physical access control logs — last 90 days', phase: 'TOE', domain: 'Physical', status: 'Pending', priority: 'Medium' },
  { id: 'PBC008', control: 'ISO 27002 A.8.2', description: 'User access review records — last 12 months (quarterly)', phase: 'TOE', domain: 'Technological', status: 'Not Started', priority: 'High' },
  { id: 'PBC009', control: 'ISO 27002 A.8.8', description: 'Vulnerability scan reports — last 12 months', phase: 'TOE', domain: 'Technological', status: 'Not Started', priority: 'High' },
  { id: 'PBC010', control: 'ISO 27002 A.8.12', description: 'DLP policy configuration and alert logs — last 90 days', phase: 'TOI', domain: 'Technological', status: 'Pending', priority: 'Medium' },
  { id: 'PBC011', control: 'ISO 27001 Cl. 9.3', description: 'Management Review minutes and action log — last cycle', phase: 'TOE', domain: 'Governance', status: 'Received', priority: 'High' },
  { id: 'PBC012', control: 'ISO 27005', description: 'Risk Register — current with residual scores', phase: 'TOD', domain: 'Risk', status: 'Pending', priority: 'High' },
  { id: 'PBC013', control: 'ISO 9001 Cl. 7.1.5', description: 'Calibration Register and certificates — current year', phase: 'TOE', domain: 'Quality', status: 'Not Started', priority: 'Medium' },
  { id: 'PBC014', control: 'ISO 9001 Cl. 9.1.2', description: 'Customer satisfaction survey results — last 12 months', phase: 'TOE', domain: 'Quality', status: 'Not Started', priority: 'Medium' },
  { id: 'PBC015', control: 'ISO 27001 Cl. 10.2', description: 'CAPA register with closure evidence — audit period', phase: 'TOE', domain: 'Improvement', status: 'Received', priority: 'High' },
]

const statusConfig = {
  'Received': { color: 'bg-emerald-900/40 text-emerald-300 border-emerald-700', icon: CheckCircle2 },
  'Pending': { color: 'bg-amber-900/40 text-amber-300 border-amber-700', icon: Clock },
  'Not Started': { color: 'bg-navy-700 text-steel-400 border-navy-600', icon: Circle },
}

const phaseColors = {
  'TOD': 'bg-blue-900/40 text-blue-300',
  'TOI': 'bg-purple-900/40 text-purple-300',
  'TOE': 'bg-emerald-900/40 text-emerald-300',
}

export default function PBCList() {
  const [filterPhase, setFilterPhase] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterDomain, setFilterDomain] = useState('All')

  const filtered = pbcItems.filter(item => {
    return (filterPhase === 'All' || item.phase === filterPhase) &&
      (filterStatus === 'All' || item.status === filterStatus) &&
      (filterDomain === 'All' || item.domain === filterDomain)
  })

  const stats = {
    total: pbcItems.length,
    received: pbcItems.filter(i => i.status === 'Received').length,
    pending: pbcItems.filter(i => i.status === 'Pending').length,
    notStarted: pbcItems.filter(i => i.status === 'Not Started').length,
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        standard="Fieldwork"
        clause="PBC Master List"
        title="Provided By Client — Master Evidence List"
        description="Single metadata-tagged evidence tracker covering all standards and all testing phases. Filter by Phase (TOD/TOI/TOE), Domain, or Status. One list — no per-phase duplication."
        badges={['PBC', 'Evidence Tracker', 'All Standards']}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Items', value: stats.total, color: 'text-white' },
          { label: 'Received', value: stats.received, color: 'text-emerald-400' },
          { label: 'Pending', value: stats.pending, color: 'text-amber-audit' },
          { label: 'Not Started', value: stats.notStarted, color: 'text-steel-400' },
        ].map(s => (
          <div key={s.label} className="card-sm text-center">
            <div className={`font-display text-2xl font-bold mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs text-steel-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={13} className="text-steel-400" />
            <span className="text-xs text-steel-400 font-medium">Filter:</span>
          </div>
          {[
            { label: 'Phase', value: filterPhase, setter: setFilterPhase, options: ['All', 'TOD', 'TOI', 'TOE'] },
            { label: 'Status', value: filterStatus, setter: setFilterStatus, options: ['All', 'Received', 'Pending', 'Not Started'] },
            { label: 'Domain', value: filterDomain, setter: setFilterDomain, options: ['All', 'Governance', 'Planning', 'Risk', 'Organizational', 'People', 'Physical', 'Technological', 'Quality', 'Improvement'] },
          ].map(f => (
            <div key={f.label} className="flex items-center gap-1.5">
              <span className="text-xs text-steel-400">{f.label}:</span>
              <select
                className="input-field py-1 text-xs w-auto"
                value={f.value}
                onChange={e => f.setter(e.target.value)}
              >
                {f.options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <span className="text-xs text-steel-400 ml-auto">{filtered.length} items</span>
        </div>
      </div>

      <div className="card mb-6 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-700 bg-navy-800/50">
                {['ID', 'Control Ref', 'Evidence Required', 'Phase', 'Domain', 'Priority', 'Status'].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-steel-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => {
                const sc = statusConfig[item.status]
                const StatusIcon = sc.icon
                return (
                  <tr key={item.id} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                    <td className="py-2.5 px-3 font-mono text-amber-audit font-semibold whitespace-nowrap">{item.id}</td>
                    <td className="py-2.5 px-3 text-steel-300 whitespace-nowrap font-mono text-xs">{item.control}</td>
                    <td className="py-2.5 px-3 text-white leading-snug max-w-xs">{item.description}</td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className={`badge ${phaseColors[item.phase]}`}>{item.phase}</span>
                    </td>
                    <td className="py-2.5 px-3 text-steel-300 whitespace-nowrap">{item.domain}</td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className={`badge ${item.priority === 'High' ? 'bg-red-900/30 text-red-300' : 'bg-navy-700 text-steel-400'}`}>{item.priority}</span>
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-medium ${sc.color}`}>
                        <StatusIcon size={10} />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AIPanel
        title="Generate Custom PBC Request List"
        systemPrompt="You are an IT audit evidence management expert. Generate comprehensive Provided By Client (PBC) evidence request lists for ISO management system audits. Each PBC item must include: PBC ID, Control Reference (standard + clause/control), Description of evidence required, Testing Phase (TOD/TOI/TOE), Control Domain, Priority (High/Medium/Low), and specific instructions for the auditee on format and scope of evidence. Group by domain and phase for clarity."
        placeholder="e.g. Generate a PBC list for an ISO 27001 Annex A Technological Controls audit — AWS environment, 12-month audit period"
        contextFields={[
          { id: 'scope', label: 'Audit Scope', placeholder: 'e.g. Full ISO 27001 + ISO 9001 IMS audit', type: 'text' },
          { id: 'tech', label: 'Technology Environment', placeholder: 'e.g. AWS, Azure AD, Qualys, Microsoft 365', type: 'text' },
          { id: 'period', label: 'Audit Period', placeholder: 'e.g. 1 Jan 2025 – 31 Dec 2025', type: 'text' },
          { id: 'focus', label: 'Domain Focus', type: 'select', options: ['All Domains', 'Governance & Policies only', 'Technological Controls only', 'People Controls only', 'Physical Controls only', 'Risk Management only', 'Quality (ISO 9001) only'] },
        ]}
      />
    </div>
  )
}
