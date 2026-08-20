import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2, TrendingUp, TrendingDown, Minus } from 'lucide-react'

// ─── Management Review Pack ───────────────────────────────────────────────────
const mgmtInputs = [
  { ref: '9.3.2a', input: 'Status of actions from previous management reviews', status: 'Available', notes: '3 of 5 actions closed, 2 in progress' },
  { ref: '9.3.2b', input: 'Changes in external and internal issues relevant to ISMS', status: 'Available', notes: 'New cloud migration project added to scope' },
  { ref: '9.3.2c', input: 'Changes in needs and expectations of interested parties', status: 'Available', notes: 'New GDPR enforcement guidance issued' },
  { ref: '9.3.2d', input: 'Feedback on IS performance', status: 'Available', notes: '2 High, 3 Medium findings from internal audit' },
  { ref: '9.3.2e', input: 'Feedback from interested parties', status: 'Pending', notes: 'Customer satisfaction results Q4 outstanding' },
  { ref: '9.3.2f', input: 'Results of risk assessment and risk treatment plan status', status: 'Available', notes: 'Risk Register reviewed — 2 risks above appetite' },
  { ref: '9.3.2g', input: 'Opportunities for continual improvement', status: 'Available', notes: '4 improvement suggestions from audit team' },
]

export function ManagementReview() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Clause 9.3"
        title="Management Review Pack"
        description="Top management must review the ISMS at planned intervals. This pack assembles all mandatory Clause 9.3.2 inputs and produces documented outputs per Clause 9.3.3."
        badges={['Management Review', 'ISO 27001 Cl. 9.3', 'Reporting']}
      />

      <div className="card mb-6">
        <h2 className="section-title mb-3">Mandatory Review Inputs — Cl. 9.3.2</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-700">
                {['Ref', 'Mandatory Input', 'Status', 'Notes'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-steel-400 font-medium uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mgmtInputs.map((row, i) => (
                <tr key={row.ref} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                  <td className="py-2.5 px-3 font-mono text-amber-audit font-semibold whitespace-nowrap">{row.ref}</td>
                  <td className="py-2.5 px-3 text-white leading-snug">{row.input}</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className={`badge ${row.status === 'Available' ? 'badge-emerald' : 'badge-amber'}`}>{row.status}</span>
                  </td>
                  <td className="py-2.5 px-3 text-steel-300 leading-snug">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="section-title mb-3">Required Review Outputs — Cl. 9.3.3</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: 'Decisions on continual improvement opportunities', items: ['Specific improvement actions agreed', 'Owner and target date assigned', 'Documented in improvement log'] },
            { title: 'Changes needed to the ISMS', items: ['Scope changes agreed', 'Policy updates required', 'Resource changes approved'] },
            { title: 'Resource needs', items: ['Budget allocation decisions', 'Headcount or tool approvals', 'Training investment agreed'] },
          ].map(o => (
            <div key={o.title} className="bg-navy-800 border border-navy-600 rounded-lg p-3">
              <div className="text-xs font-semibold text-white mb-2 leading-snug">{o.title}</div>
              {o.items.map(i => (
                <div key={i} className="flex items-start gap-2 mb-1.5">
                  <CheckCircle2 size={11} className="text-emerald-audit flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-steel-300 leading-snug">{i}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <AIPanel
        title="Generate Management Review Pack"
        systemPrompt="You are an ISO 27001:2022 management review expert. Generate complete management review packs including all mandatory Clause 9.3.2 inputs and documented outputs per Clause 9.3.3. The pack should be suitable for presentation to a board or senior leadership team. Include an executive dashboard, findings summary, risk status, KPI summary, and clear improvement action table with owners and dates."
        placeholder="e.g. Generate a Q4 2025 management review pack — 2 High findings, risk register shows 2 risks above appetite, 90% audit programme complete"
        contextFields={[
          { id: 'org', label: 'Organisation', placeholder: 'e.g. Acme Ltd, ISO 27001 certified', type: 'text' },
          { id: 'period', label: 'Review Period', placeholder: 'e.g. Q4 2025 / Full Year 2025', type: 'text' },
          { id: 'summary', label: 'ISMS Performance Summary', placeholder: 'e.g. 2 High findings, audit 90% complete, 2 risks above appetite', type: 'textarea' },
          { id: 'artifact', label: 'Pack Component', type: 'select', options: ['Full Management Review Pack', 'Executive Dashboard Slide', 'Findings Summary', 'Risk Status Report', 'Action Tracking Table', 'Management Review Minutes Template'] },
        ]}
      />
    </div>
  )
}

// ─── KPI Dashboard ────────────────────────────────────────────────────────────
const kpis = [
  { metric: 'Audit Programme Completion', value: '90%', target: '100%', trend: 'up', status: 'Amber', domain: 'Audit' },
  { metric: 'CAPA Closure Rate (on time)', value: '72%', target: '90%', trend: 'up', status: 'Amber', domain: 'Improvement' },
  { metric: 'Critical/High Findings Open', value: '2', target: '0', trend: 'same', status: 'Red', domain: 'Findings' },
  { metric: 'IS Awareness Training Completion', value: '96%', target: '100%', trend: 'up', status: 'Green', domain: 'People' },
  { metric: 'Patch Compliance Rate', value: '88%', target: '95%', trend: 'up', status: 'Amber', domain: 'Technology' },
  { metric: 'Risks Above Appetite', value: '2', target: '0', trend: 'down', status: 'Amber', domain: 'Risk' },
  { metric: 'Supplier Reviews Completed', value: '100%', target: '100%', trend: 'same', status: 'Green', domain: 'Suppliers' },
  { metric: 'Security Incidents (Severity 1)', value: '0', target: '0', trend: 'same', status: 'Green', domain: 'Incidents' },
]

const statusColors = { Green: 'text-emerald-400 bg-emerald-900/30', Amber: 'text-amber-audit bg-amber-900/30', Red: 'text-red-400 bg-red-900/30' }
const TrendIcon = ({ trend }) => trend === 'up' ? <TrendingUp size={12} className="text-emerald-400" /> : trend === 'down' ? <TrendingDown size={12} className="text-red-400" /> : <Minus size={12} className="text-steel-400" />

export function KPIDashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27004"
        clause="KPI Dashboard"
        title="ISMS KPI & Metrics Dashboard"
        description="ISO 27004-aligned measurement framework — monitoring ISMS performance across audit programme completion, findings, risk, people, technology, and supplier domains."
        badges={['ISO 27004', 'KPIs', 'Performance']}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {kpis.map(k => (
          <div key={k.metric} className="card-sm">
            <div className="flex items-start justify-between mb-2">
              <span className="badge badge-steel">{k.domain}</span>
              <TrendIcon trend={k.trend} />
            </div>
            <div className={`font-display text-2xl font-bold mb-1 ${statusColors[k.status].split(' ')[0]}`}>{k.value}</div>
            <div className="text-xs text-white font-medium mb-0.5 leading-snug">{k.metric}</div>
            <div className="text-xs text-steel-400">Target: {k.target}</div>
            <span className={`badge mt-2 inline-flex px-2 py-0.5 rounded text-xs font-medium ${statusColors[k.status]}`}>{k.status}</span>
          </div>
        ))}
      </div>

      <AIPanel
        title="Generate KPI Framework & Reports"
        systemPrompt="You are an ISO 27004 information security measurement expert. Generate ISMS KPI frameworks, measurement methodologies, KPI dashboards, and management reporting templates. Each KPI must include: metric name, measurement method, data source, frequency, target, owner, and Red/Amber/Green threshold definitions. Align to ISO 27004:2016 measurement construct model."
        placeholder="e.g. Generate a full ISO 27004-aligned KPI framework for a financial services ISMS — 20 KPIs across 6 domains"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', placeholder: 'e.g. Financial services, 800 employees', type: 'text' },
          { id: 'domains', label: 'KPI Domains to Cover', type: 'select', options: ['All Domains', 'Audit Programme metrics', 'Findings & CAPA metrics', 'Risk metrics', 'People & Awareness metrics', 'Technology & Patching metrics', 'Incident metrics'] },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Full KPI Framework (ISO 27004)', 'KPI Dashboard Template', 'Monthly Metrics Report', 'RAG Status Summary', 'KPI Measurement Procedure'] },
        ]}
      />
    </div>
  )
}

// ─── CAPA Tracker ─────────────────────────────────────────────────────────────
const capas = [
  { id: 'CAPA-001', finding: 'F001 — Access Review Gap', rating: 'High', standard: 'ISO 27002 A.8.2', owner: 'IT Security Manager', dueDate: '30 Sep 2025', status: 'In Progress', rootCause: 'No automated quarterly review workflow', action: 'Implement IGA tool with automated review triggers', progress: 60 },
  { id: 'CAPA-002', finding: 'F002 — Threat Intel Coverage', rating: 'Medium', standard: 'ISO 27002 A.5.7', owner: 'CISO', dueDate: '31 Oct 2025', status: 'In Progress', rootCause: 'No formal threat intelligence subscription or process', action: 'Subscribe to OSINT feed, establish monthly review cadence', progress: 40 },
  { id: 'CAPA-003', finding: 'F003 — DLP Policy Gap', rating: 'Medium', standard: 'ISO 27002 A.8.12', owner: 'Cloud Architect', dueDate: '30 Nov 2025', status: 'Not Started', rootCause: 'DLP not configured for cloud storage (AWS S3)', action: 'Configure Macie/DLP rules for S3 sensitive data detection', progress: 0 },
  { id: 'CAPA-004', finding: 'F004 — Training Completion', rating: 'Low', standard: 'ISO 27002 A.6.3', owner: 'HR Manager', dueDate: '15 Sep 2025', status: 'Closed', rootCause: '4 contractors missed annual training cycle', action: 'Contractors added to LMS auto-enrolment, confirmed complete', progress: 100 },
]

const capaStatusColors = { 'Closed': 'text-emerald-400', 'In Progress': 'text-amber-audit', 'Not Started': 'text-steel-500', 'Overdue': 'text-red-400' }
const ratingBadge = { High: 'bg-red-900/40 text-red-300', Medium: 'bg-amber-900/40 text-amber-300', Low: 'bg-navy-700 text-steel-400' }

export function CAPATracker() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Clause 10.2"
        title="CAPA Closure Tracker"
        description="Tracks corrective actions from audit findings through root cause analysis, implementation, and effectiveness verification — aligned to ISO 27001 Clause 10.2."
        badges={['CAPA', 'ISO 27001 Cl. 10', 'Audit Closure']}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total CAPAs', value: capas.length, color: 'text-white' },
          { label: 'Closed', value: capas.filter(c => c.status === 'Closed').length, color: 'text-emerald-400' },
          { label: 'In Progress', value: capas.filter(c => c.status === 'In Progress').length, color: 'text-amber-audit' },
          { label: 'Not Started', value: capas.filter(c => c.status === 'Not Started').length, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="card-sm text-center">
            <div className={`font-display text-2xl font-bold mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs text-steel-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-6">
        {capas.map(c => (
          <div key={c.id} className="card">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="clause-tag">{c.id}</span>
                <span className={`badge ${ratingBadge[c.rating]}`}>{c.rating}</span>
                <span className="text-sm font-semibold text-white">{c.finding}</span>
              </div>
              <span className={`text-xs font-semibold whitespace-nowrap ${capaStatusColors[c.status]}`}>{c.status}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
              {[
                { label: 'Standard', val: c.standard },
                { label: 'Owner', val: c.owner },
                { label: 'Due Date', val: c.dueDate },
                { label: 'Root Cause', val: c.rootCause },
              ].map(row => (
                <div key={row.label}>
                  <span className="text-steel-400 font-medium">{row.label}: </span>
                  <span className="text-steel-300">{row.val}</span>
                </div>
              ))}
            </div>
            <div className="text-xs mb-3">
              <span className="text-steel-400 font-medium">Corrective Action: </span>
              <span className="text-white">{c.action}</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-steel-400">Progress</span>
                <span className="text-xs font-mono text-white">{c.progress}%</span>
              </div>
              <div className="w-full bg-navy-800 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${c.progress === 100 ? 'bg-emerald-500' : c.progress > 0 ? 'bg-amber-audit' : 'bg-navy-600'}`}
                  style={{ width: `${c.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <AIPanel
        title="Generate CAPA Documents"
        systemPrompt="You are an ISO 27001:2022 CAPA expert. Generate complete corrective action packages including root cause analysis (5-Why method), corrective action plans, implementation evidence templates, and effectiveness verification checklists. CAPAs must be tied to specific audit findings with 4Cs, include realistic implementation steps, and specify measurable effectiveness criteria."
        placeholder="e.g. Generate a full CAPA for a High finding — Access Reviews not completed for 7 of 25 sampled accounts"
        contextFields={[
          { id: 'finding', label: 'Audit Finding', placeholder: 'Paste or describe the audit finding', type: 'textarea' },
          { id: 'owner', label: 'CAPA Owner', placeholder: 'e.g. IT Security Manager', type: 'text' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Full CAPA Package', '5-Why Root Cause Analysis', 'Corrective Action Plan', 'Implementation Evidence Template', 'Effectiveness Verification Checklist', 'CAPA Closure Evidence'] },
        ]}
      />
    </div>
  )
}

// ─── Audit Universe ───────────────────────────────────────────────────────────
const universe = [
  { area: 'ISO 27001 — Full ISMS', risk: 'High', frequency: 'Annual', lastAudit: 'Jan 2025', nextAudit: 'Jan 2026', auditor: 'Internal', status: 'Scheduled' },
  { area: 'ISO 27002 — Technological Controls', risk: 'High', frequency: 'Annual', lastAudit: 'Mar 2025', nextAudit: 'Mar 2026', auditor: 'Internal', status: 'Scheduled' },
  { area: 'ISO 27002 — People Controls', risk: 'Medium', frequency: 'Annual', lastAudit: 'Mar 2025', nextAudit: 'Mar 2026', auditor: 'Internal', status: 'Scheduled' },
  { area: 'ISO 27005 — Risk Management', risk: 'High', frequency: 'Annual', lastAudit: 'Feb 2025', nextAudit: 'Feb 2026', auditor: 'Internal', status: 'Scheduled' },
  { area: 'ISO 9001 — QMS Full Scope', risk: 'Medium', frequency: 'Annual', lastAudit: 'Apr 2025', nextAudit: 'Apr 2026', auditor: 'Internal', status: 'Scheduled' },
  { area: 'Supplier Security Reviews', risk: 'High', frequency: 'Annual', lastAudit: 'Jun 2025', nextAudit: 'Jun 2026', auditor: 'Internal', status: 'Scheduled' },
  { area: 'Cloud Security (AWS)', risk: 'High', frequency: 'Bi-annual', lastAudit: 'Jul 2025', nextAudit: 'Jan 2026', auditor: 'Internal', status: 'Overdue' },
  { area: 'Penetration Testing', risk: 'High', frequency: 'Annual', lastAudit: 'Sep 2024', nextAudit: 'Sep 2025', auditor: 'External', status: 'Overdue' },
  { area: 'BCP / DR Testing', risk: 'High', frequency: 'Annual', lastAudit: 'Oct 2024', nextAudit: 'Oct 2025', auditor: 'Internal', status: 'In Progress' },
  { area: 'Physical Security Audit', risk: 'Medium', frequency: 'Annual', lastAudit: 'Dec 2024', nextAudit: 'Dec 2025', auditor: 'Internal', status: 'Not Started' },
]

const univStatusColors = { Scheduled: 'text-blue-400', Overdue: 'text-red-400', 'In Progress': 'text-amber-audit', 'Not Started': 'text-steel-500', Complete: 'text-emerald-400' }
const riskBadge = { High: 'bg-red-900/30 text-red-300', Medium: 'bg-amber-900/30 text-amber-300', Low: 'bg-navy-700 text-steel-400' }

export function AuditUniverse() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="Audit Governance"
        clause="Audit Universe"
        title="Audit Universe & Annual Plan"
        description="Risk-ranked audit universe — prioritises what gets audited and when across all standards, controls, and domains. Feeds into the ISO 19011 Clause 5 audit programme."
        badges={['Audit Universe', 'Annual Plan', 'ISO 19011 Cl. 5']}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Audit Areas', value: universe.length, color: 'text-white' },
          { label: 'High Risk', value: universe.filter(u => u.risk === 'High').length, color: 'text-red-400' },
          { label: 'Overdue', value: universe.filter(u => u.status === 'Overdue').length, color: 'text-red-400' },
          { label: 'Scheduled', value: universe.filter(u => u.status === 'Scheduled').length, color: 'text-blue-400' },
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
                {['Audit Area', 'Risk', 'Frequency', 'Last Audit', 'Next Audit', 'Auditor', 'Status'].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-steel-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {universe.map((u, i) => (
                <tr key={u.area} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                  <td className="py-2.5 px-3 text-white font-medium leading-snug">{u.area}</td>
                  <td className="py-2.5 px-3 whitespace-nowrap"><span className={`badge ${riskBadge[u.risk]}`}>{u.risk}</span></td>
                  <td className="py-2.5 px-3 text-steel-300 whitespace-nowrap">{u.frequency}</td>
                  <td className="py-2.5 px-3 text-steel-400 whitespace-nowrap">{u.lastAudit}</td>
                  <td className="py-2.5 px-3 text-steel-300 whitespace-nowrap">{u.nextAudit}</td>
                  <td className="py-2.5 px-3 text-steel-300 whitespace-nowrap">{u.auditor}</td>
                  <td className={`py-2.5 px-3 font-semibold whitespace-nowrap ${univStatusColors[u.status]}`}>{u.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AIPanel
        title="Generate Audit Universe & Annual Plan"
        systemPrompt="You are an IT audit governance expert. Generate risk-ranked audit universes and annual audit plans covering all ISO management system areas. Each audit area must include: Area name, risk rating (High/Medium/Low) with justification, recommended audit frequency, suggested auditor (internal/external), estimated audit days, and priority ranking. The annual plan should show a month-by-month schedule balancing resource constraints with risk coverage."
        placeholder="e.g. Generate a risk-ranked audit universe and 12-month schedule for a fintech company with ISO 27001, ISO 9001, and PCI-DSS obligations"
        contextFields={[
          { id: 'org', label: 'Organisation & Obligations', placeholder: 'e.g. Fintech, ISO 27001, ISO 9001, PCI-DSS', type: 'text' },
          { id: 'resources', label: 'Audit Resources Available', placeholder: 'e.g. 2 internal auditors, 10 days/month each', type: 'text' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Full Audit Universe', 'Annual Audit Plan (12-month schedule)', 'Risk-Ranked Priority List', 'Audit Resource Plan', 'Multi-year Audit Cycle'] },
        ]}
      />
    </div>
  )
}
