import { useState } from 'react'
import { CheckCircle2, X, FileDown, Filter } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { exportToCSV } from '../../utils/exportCSV'

const controls = [
  // Theme 5 — Organizational
  { ref: 'A.5.1', title: 'Policies for information security', theme: 'Organizational', new: false },
  { ref: 'A.5.2', title: 'Information security roles and responsibilities', theme: 'Organizational', new: false },
  { ref: 'A.5.3', title: 'Segregation of duties', theme: 'Organizational', new: false },
  { ref: 'A.5.4', title: 'Management responsibilities', theme: 'Organizational', new: false },
  { ref: 'A.5.5', title: 'Contact with authorities', theme: 'Organizational', new: false },
  { ref: 'A.5.6', title: 'Contact with special interest groups', theme: 'Organizational', new: false },
  { ref: 'A.5.7', title: 'Threat intelligence', theme: 'Organizational', new: true },
  { ref: 'A.5.8', title: 'Information security in project management', theme: 'Organizational', new: false },
  { ref: 'A.5.9', title: 'Inventory of information and other associated assets', theme: 'Organizational', new: false },
  { ref: 'A.5.10', title: 'Acceptable use of information and associated assets', theme: 'Organizational', new: false },
  { ref: 'A.5.11', title: 'Return of assets', theme: 'Organizational', new: false },
  { ref: 'A.5.12', title: 'Classification of information', theme: 'Organizational', new: false },
  { ref: 'A.5.13', title: 'Labelling of information', theme: 'Organizational', new: false },
  { ref: 'A.5.14', title: 'Information transfer', theme: 'Organizational', new: false },
  { ref: 'A.5.15', title: 'Access control', theme: 'Organizational', new: false },
  { ref: 'A.5.16', title: 'Identity management', theme: 'Organizational', new: false },
  { ref: 'A.5.17', title: 'Authentication information', theme: 'Organizational', new: false },
  { ref: 'A.5.18', title: 'Access rights', theme: 'Organizational', new: false },
  { ref: 'A.5.19', title: 'Information security in supplier relationships', theme: 'Organizational', new: false },
  { ref: 'A.5.20', title: 'Addressing IS within supplier agreements', theme: 'Organizational', new: false },
  { ref: 'A.5.21', title: 'Managing IS in ICT supply chain', theme: 'Organizational', new: false },
  { ref: 'A.5.22', title: 'Monitoring, review and change management of supplier services', theme: 'Organizational', new: false },
  { ref: 'A.5.23', title: 'Information security for use of cloud services', theme: 'Organizational', new: true },
  { ref: 'A.5.24', title: 'Information security incident management planning', theme: 'Organizational', new: false },
  { ref: 'A.5.25', title: 'Assessment and decision on IS events', theme: 'Organizational', new: false },
  { ref: 'A.5.26', title: 'Response to information security incidents', theme: 'Organizational', new: false },
  { ref: 'A.5.27', title: 'Learning from IS incidents', theme: 'Organizational', new: false },
  { ref: 'A.5.28', title: 'Collection of evidence', theme: 'Organizational', new: false },
  { ref: 'A.5.29', title: 'IS during disruption', theme: 'Organizational', new: false },
  { ref: 'A.5.30', title: 'ICT readiness for business continuity', theme: 'Organizational', new: true },
  { ref: 'A.5.31', title: 'Legal, statutory, regulatory, and contractual requirements', theme: 'Organizational', new: false },
  { ref: 'A.5.32', title: 'Intellectual property rights', theme: 'Organizational', new: false },
  { ref: 'A.5.33', title: 'Protection of records', theme: 'Organizational', new: false },
  { ref: 'A.5.34', title: 'Privacy and protection of PII', theme: 'Organizational', new: false },
  { ref: 'A.5.35', title: 'Independent review of information security', theme: 'Organizational', new: false },
  { ref: 'A.5.36', title: 'Compliance with policies and standards', theme: 'Organizational', new: false },
  { ref: 'A.5.37', title: 'Documented operating procedures', theme: 'Organizational', new: false },
  // Theme 6 — People
  { ref: 'A.6.1', title: 'Screening', theme: 'People', new: false },
  { ref: 'A.6.2', title: 'Terms and conditions of employment', theme: 'People', new: false },
  { ref: 'A.6.3', title: 'Information security awareness, education and training', theme: 'People', new: false },
  { ref: 'A.6.4', title: 'Disciplinary process', theme: 'People', new: false },
  { ref: 'A.6.5', title: 'Responsibilities after termination or change of employment', theme: 'People', new: false },
  { ref: 'A.6.6', title: 'Confidentiality or NDA agreements', theme: 'People', new: false },
  { ref: 'A.6.7', title: 'Remote working', theme: 'People', new: false },
  { ref: 'A.6.8', title: 'Information security event reporting', theme: 'People', new: false },
  // Theme 7 — Physical
  { ref: 'A.7.1', title: 'Physical security perimeters', theme: 'Physical', new: false },
  { ref: 'A.7.2', title: 'Physical entry', theme: 'Physical', new: false },
  { ref: 'A.7.3', title: 'Securing offices, rooms, and facilities', theme: 'Physical', new: false },
  { ref: 'A.7.4', title: 'Physical security monitoring', theme: 'Physical', new: true },
  { ref: 'A.7.5', title: 'Protecting against physical and environmental threats', theme: 'Physical', new: false },
  { ref: 'A.7.6', title: 'Working in secure areas', theme: 'Physical', new: false },
  { ref: 'A.7.7', title: 'Clear desk and clear screen', theme: 'Physical', new: false },
  { ref: 'A.7.8', title: 'Equipment siting and protection', theme: 'Physical', new: false },
  { ref: 'A.7.9', title: 'Security of assets off-premises', theme: 'Physical', new: false },
  { ref: 'A.7.10', title: 'Storage media', theme: 'Physical', new: false },
  { ref: 'A.7.11', title: 'Supporting utilities', theme: 'Physical', new: false },
  { ref: 'A.7.12', title: 'Cabling security', theme: 'Physical', new: false },
  { ref: 'A.7.13', title: 'Equipment maintenance', theme: 'Physical', new: false },
  { ref: 'A.7.14', title: 'Secure disposal or re-use of equipment', theme: 'Physical', new: false },
  // Theme 8 — Technological
  { ref: 'A.8.1', title: 'User endpoint devices', theme: 'Technological', new: false },
  { ref: 'A.8.2', title: 'Privileged access rights', theme: 'Technological', new: false },
  { ref: 'A.8.3', title: 'Information access restriction', theme: 'Technological', new: false },
  { ref: 'A.8.4', title: 'Access to source code', theme: 'Technological', new: false },
  { ref: 'A.8.5', title: 'Secure authentication', theme: 'Technological', new: false },
  { ref: 'A.8.6', title: 'Capacity management', theme: 'Technological', new: false },
  { ref: 'A.8.7', title: 'Protection against malware', theme: 'Technological', new: false },
  { ref: 'A.8.8', title: 'Management of technical vulnerabilities', theme: 'Technological', new: false },
  { ref: 'A.8.9', title: 'Configuration management', theme: 'Technological', new: true },
  { ref: 'A.8.10', title: 'Information deletion', theme: 'Technological', new: true },
  { ref: 'A.8.11', title: 'Data masking', theme: 'Technological', new: true },
  { ref: 'A.8.12', title: 'Data leakage prevention', theme: 'Technological', new: true },
  { ref: 'A.8.13', title: 'Information backup', theme: 'Technological', new: false },
  { ref: 'A.8.14', title: 'Redundancy of information processing facilities', theme: 'Technological', new: false },
  { ref: 'A.8.15', title: 'Logging', theme: 'Technological', new: false },
  { ref: 'A.8.16', title: 'Monitoring activities', theme: 'Technological', new: true },
  { ref: 'A.8.17', title: 'Clock synchronisation', theme: 'Technological', new: false },
  { ref: 'A.8.18', title: 'Use of privileged utility programs', theme: 'Technological', new: false },
  { ref: 'A.8.19', title: 'Installation of software on operational systems', theme: 'Technological', new: false },
  { ref: 'A.8.20', title: 'Networks security', theme: 'Technological', new: false },
  { ref: 'A.8.21', title: 'Security of network services', theme: 'Technological', new: false },
  { ref: 'A.8.22', title: 'Segregation of networks', theme: 'Technological', new: false },
  { ref: 'A.8.23', title: 'Web filtering', theme: 'Technological', new: true },
  { ref: 'A.8.24', title: 'Use of cryptography', theme: 'Technological', new: false },
  { ref: 'A.8.25', title: 'Secure development life cycle', theme: 'Technological', new: false },
  { ref: 'A.8.26', title: 'Application security requirements', theme: 'Technological', new: false },
  { ref: 'A.8.27', title: 'Secure system architecture and engineering principles', theme: 'Technological', new: false },
  { ref: 'A.8.28', title: 'Secure coding', theme: 'Technological', new: true },
  { ref: 'A.8.29', title: 'Security testing in development and acceptance', theme: 'Technological', new: false },
  { ref: 'A.8.30', title: 'Outsourced development', theme: 'Technological', new: false },
  { ref: 'A.8.31', title: 'Separation of development, test, and production environments', theme: 'Technological', new: false },
  { ref: 'A.8.32', title: 'Change management', theme: 'Technological', new: false },
  { ref: 'A.8.33', title: 'Test information', theme: 'Technological', new: false },
  { ref: 'A.8.34', title: 'Protection of IS systems during audit testing', theme: 'Technological', new: false },
]

const themeColors = {
  Organizational: 'bg-blue-900/40 text-blue-300',
  People: 'bg-purple-900/40 text-purple-300',
  Physical: 'bg-amber-900/40 text-amber-300',
  Technological: 'bg-emerald-900/40 text-emerald-300',
}

const SOA_COLUMNS = [
  { label: 'Control Ref', key: 'ref' }, { label: 'Control Title', key: 'title' },
  { label: 'Theme', key: 'theme' }, { label: 'Applicable', key: 'applicable' },
  { label: 'Justification for Inclusion', key: 'justification' },
  { label: 'Justification for Exclusion', key: 'exclusion_reason' },
  { label: 'Implementation Status', key: 'status' }, { label: 'Notes', key: 'notes' },
]

export default function SoA() {
  const [soaData, setSoaData] = useState(() => {
    try {
      const saved = localStorage.getItem('auditiq-soa-data')
      if (saved) return JSON.parse(saved)
    } catch (e) {}
    return controls.reduce((acc, c) => ({ ...acc, [c.ref]: { applicable: 'Yes', justification: '', exclusion_reason: '', status: 'Planned', notes: '' } }), {})
  })
  const [filterTheme, setFilterTheme] = useState('All')
  const [filterApplicable, setFilterApplicable] = useState('All')
  const [filterNew, setFilterNew] = useState(false)
  const [search, setSearch] = useState('')
  const [lastSaved, setLastSaved] = useState(null)

  const update = (ref, field, value) => setSoaData(p => {
    const next = { ...p, [ref]: { ...p[ref], [field]: value } }
    try { localStorage.setItem('auditiq-soa-data', JSON.stringify(next)); setLastSaved(new Date()) } catch (e) {}
    return next
  })

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
          <span className="text-xs text-steel-400 ml-auto">{filtered.length} controls</span>
          {lastSaved && (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              ✓ Auto-saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button onClick={() => { if (window.confirm('Reset all SoA data?')) { localStorage.removeItem('auditiq-soa-data'); window.location.reload() } }} className="btn-secondary text-xs py-1.5 text-red-400 hover:text-red-300">Reset</button>
          <button onClick={() => exportToCSV(exportData, 'SoA_ISO27001', SOA_COLUMNS)} className="btn-secondary text-xs py-1.5">
            <FileDown size={12} /> Export SoA CSV
          </button>
        </div>
      </div>

      {/* SoA Table */}
      <div className="card p-0 overflow-hidden mb-6">
        <div className="overflow-x-auto table-scroll-wrap">
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
