import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'

const workpapers = [
  { id: 'WP-001', type: 'Planning', title: 'Audit Programme — Objectives & Scope', phase: 'Pre-Audit', standard: 'ISO 19011 Cl. 5', status: 'Signed Off', auditor: 'Lead Auditor' },
  { id: 'WP-002', type: 'Planning', title: 'Formal Audit Plan', phase: 'Pre-Audit', standard: 'ISO 19011 Cl. 6.3', status: 'Signed Off', auditor: 'Lead Auditor' },
  { id: 'WP-003', type: 'Planning', title: 'Work Assignment Matrix', phase: 'Pre-Audit', standard: 'ISO 19011 Cl. 6.3', status: 'Signed Off', auditor: 'Lead Auditor' },
  { id: 'WP-004', type: 'Meeting', title: 'Opening Meeting Agenda & Minutes', phase: 'Initiation', standard: 'ISO 19011 Cl. 6.4.2', status: 'Signed Off', auditor: 'Lead Auditor' },
  { id: 'WP-005', type: 'TOD', title: 'IS Policy Suite — Design Adequacy Review', phase: 'TOD', standard: 'ISO 27001 Cl. 5', status: 'Signed Off', auditor: 'Lead Auditor' },
  { id: 'WP-006', type: 'TOD', title: 'SoA Design Review — 93 Controls', phase: 'TOD', standard: 'ISO 27001 Cl. 6.1.3', status: 'Signed Off', auditor: 'Lead Auditor' },
  { id: 'WP-007', type: 'TOI', title: 'Access Control Walkthrough — A.8.2', phase: 'TOI', standard: 'ISO 27002 A.8.2', status: 'In Review', auditor: 'Auditor 2' },
  { id: 'WP-008', type: 'TOI', title: 'Threat Intelligence Walkthrough — A.5.7', phase: 'TOI', standard: 'ISO 27002 A.5.7', status: 'Signed Off', auditor: 'Auditor 1' },
  { id: 'WP-009', type: 'TOE', title: 'User Access Review — Sampling Workpaper', phase: 'TOE', standard: 'ISO 27002 A.8.2', status: 'Draft', auditor: 'Auditor 2' },
  { id: 'WP-010', type: 'TOE', title: 'IS Awareness Training — TOE Sampling', phase: 'TOE', standard: 'ISO 27002 A.6.3', status: 'Signed Off', auditor: 'Auditor 1' },
  { id: 'WP-011', type: 'TOE', title: 'Vulnerability Management — TOE Workpaper', phase: 'TOE', standard: 'ISO 27002 A.8.8', status: 'Draft', auditor: 'Auditor 2' },
  { id: 'WP-012', type: 'Finding', title: 'Finding F001 — Access Review Gap (High)', phase: 'Findings', standard: 'ISO 27002 A.8.2', status: 'Draft', auditor: 'Lead Auditor' },
  { id: 'WP-013', type: 'Finding', title: 'Finding F002 — Threat Intel Coverage (Medium)', phase: 'Findings', standard: 'ISO 27002 A.5.7', status: 'Draft', auditor: 'Auditor 1' },
  { id: 'WP-014', type: 'Meeting', title: 'Closing Meeting Agenda & Minutes', phase: 'Closure', standard: 'ISO 19011 Cl. 6.4.7', status: 'Not Started', auditor: 'Lead Auditor' },
  { id: 'WP-015', type: 'Report', title: 'Draft Audit Report', phase: 'Reporting', standard: 'ISO 19011 Cl. 6.5', status: 'Not Started', auditor: 'Lead Auditor' },
]

const typeColors = {
  Planning: 'bg-steel-400/20 text-steel-300',
  Meeting: 'bg-cyan-900/40 text-cyan-300',
  TOD: 'bg-blue-900/40 text-blue-300',
  TOI: 'bg-purple-900/40 text-purple-300',
  TOE: 'bg-emerald-900/40 text-emerald-300',
  Finding: 'bg-red-900/40 text-red-300',
  Report: 'bg-amber-900/40 text-amber-300',
}

const statusColors = {
  'Signed Off': 'text-emerald-400',
  'In Review': 'text-amber-audit',
  'Draft': 'text-blue-400',
  'Not Started': 'text-steel-500',
}

export default function WorkpaperIndex() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="Fieldwork"
        clause="Workpaper Index"
        title="Audit Workpaper Index"
        description="Master index of all workpapers produced — cross-referenced to controls, standards, and findings. Every workpaper must appear here before the audit file can be closed."
        badges={['Workpapers', 'Audit File', 'ISO 19011']}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Workpapers', value: workpapers.length, color: 'text-white' },
          { label: 'Signed Off', value: workpapers.filter(w => w.status === 'Signed Off').length, color: 'text-emerald-400' },
          { label: 'In Review / Draft', value: workpapers.filter(w => ['In Review', 'Draft'].includes(w.status)).length, color: 'text-amber-audit' },
          { label: 'Not Started', value: workpapers.filter(w => w.status === 'Not Started').length, color: 'text-steel-400' },
        ].map(s => (
          <div key={s.label} className="card-sm text-center">
            <div className={`font-display text-2xl font-bold mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs text-steel-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card mb-6 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-700 bg-navy-800/50">
                {['WP ID', 'Type', 'Workpaper Title', 'Phase', 'Standard / Control', 'Status', 'Auditor'].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-steel-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {workpapers.map((wp, i) => (
                <tr key={wp.id} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                  <td className="py-2.5 px-3 font-mono text-amber-audit font-semibold whitespace-nowrap">{wp.id}</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className={`badge ${typeColors[wp.type]}`}>{wp.type}</span>
                  </td>
                  <td className="py-2.5 px-3 text-white leading-snug">{wp.title}</td>
                  <td className="py-2.5 px-3 text-steel-300 whitespace-nowrap">{wp.phase}</td>
                  <td className="py-2.5 px-3 text-steel-400 font-mono whitespace-nowrap">{wp.standard}</td>
                  <td className={`py-2.5 px-3 font-medium whitespace-nowrap ${statusColors[wp.status]}`}>{wp.status}</td>
                  <td className="py-2.5 px-3 text-steel-300 whitespace-nowrap">{wp.auditor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="section-title mb-3">Audit File Closure Checklist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            'All workpapers signed off by assigned auditor', 'All workpapers reviewed by lead auditor', 'All TOD conclusions documented and signed', 'All TOI conclusions documented and signed', 'All TOE conclusions documented and signed', 'All findings have 4Cs fully documented', 'Management responses received for all findings', 'Draft report reviewed and approved', 'Closing meeting completed and minutes signed', 'PBC evidence stored securely in audit file', 'Confidential information returned or destroyed', 'Audit programme manager sign-off obtained',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 bg-navy-800 rounded-lg px-3 py-2">
              <span className="text-xs font-mono text-amber-audit flex-shrink-0 w-4">{i + 1}.</span>
              <span className="text-xs text-steel-300 leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <AIPanel
        title="Generate Workpaper Templates"
        systemPrompt="You are an ISO 19011:2018 audit workpaper expert. Generate professional audit workpaper templates including headers, control references, evidence sections, testing steps, exception recording, and auditor conclusion fields. All workpapers must include: Workpaper ID, control reference, audit objective, testing approach, evidence obtained, exceptions noted, conclusion (TOD/TOI/TOE result), auditor name, date, and reviewer sign-off field."
        placeholder="e.g. Generate a TOE sampling workpaper template for Patch Management control — monthly frequency, 12-month period"
        contextFields={[
          { id: 'type', label: 'Workpaper Type', type: 'select', options: ['TOD Conclusion Workpaper', 'TOI Walkthrough Workpaper', 'TOE Sampling Workpaper', 'Finding Workpaper (4Cs)', 'Meeting Minutes Template', 'Audit Closure Checklist', 'Quality Review Checklist'] },
          { id: 'control', label: 'Control / Area', placeholder: 'e.g. ISO 27002 A.8.8 Vulnerability Management', type: 'text' },
          { id: 'auditor', label: 'Auditor Name', placeholder: 'e.g. Jane Smith, CISA', type: 'text' },
        ]}
      />
    </div>
  )
}
