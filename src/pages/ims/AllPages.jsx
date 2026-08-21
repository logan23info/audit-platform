import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const crosswalkData = [
  { iso27001: '4.1 — Context', iso9001: '4.1 — Context', alignment: 'Identical requirement', saving: 'One combined context analysis document serves both' },
  { iso27001: '4.2 — Interested Parties', iso9001: '4.2 — Interested Parties', alignment: 'Identical requirement', saving: 'One interested parties register — add IS-specific requirements alongside QMS' },
  { iso27001: '4.3 — Scope', iso9001: '4.3 — Scope', alignment: 'Near-identical — IS scope + QMS scope', saving: 'Combined IMS scope statement with IS and QMS boundaries defined' },
  { iso27001: '5.1 — Leadership', iso9001: '5.1 — Leadership', alignment: 'Identical requirement', saving: 'One leadership commitment statement covering both. Combined policy framework.' },
  { iso27001: '5.2 — IS Policy', iso9001: '5.2 — Quality Policy', alignment: 'Same structure — different focus', saving: 'Separate policies but single sign-off process and combined communication' },
  { iso27001: '5.3 — Roles', iso9001: '5.3 — Roles', alignment: 'Identical structure', saving: 'One RACI matrix covering both IS and QMS roles' },
  { iso27001: '6.1 — Risk Assessment', iso9001: '6.1 — Risk & Opportunity', alignment: 'Similar — IS is more prescriptive', saving: 'Combined risk register: IS risks + quality/operational risks in one register' },
  { iso27001: '6.2 — IS Objectives', iso9001: '6.2 — Quality Objectives', alignment: 'Identical structure', saving: 'Combined objectives register — IS objectives alongside quality objectives' },
  { iso27001: '7.1 — Resources', iso9001: '7.1 — Resources', alignment: 'Identical requirement', saving: 'One resource plan and budget covering both management systems' },
  { iso27001: '7.2 — Competence', iso9001: '7.2 — Competence', alignment: 'Identical requirement', saving: 'Single competence register covering IS and QMS role requirements' },
  { iso27001: '7.3 — Awareness', iso9001: '7.3 — Awareness', alignment: 'Identical requirement', saving: 'Combined awareness training covering IS policy and quality policy' },
  { iso27001: '7.4 — Communication', iso9001: '7.4 — Communication', alignment: 'Identical structure', saving: 'One communication plan — IS and QMS communications combined' },
  { iso27001: '7.5 — Doc Control', iso9001: '7.5 — Doc Control', alignment: 'Identical requirement', saving: 'Single document control procedure and document register for both' },
  { iso27001: '9.1 — Monitoring', iso9001: '9.1 — Monitoring', alignment: 'Similar — both require measurement', saving: 'Combined KPI dashboard: IS metrics (ISO 27004) + quality metrics' },
  { iso27001: '9.2 — Internal Audit', iso9001: '9.2 — Internal Audit', alignment: 'Identical — both reference ISO 19011', saving: 'Joint audit programme: combined IS + QMS audits save 30-40% audit time' },
  { iso27001: '9.3 — Mgmt Review', iso9001: '9.3 — Mgmt Review', alignment: 'Identical structure', saving: 'Single management review meeting — IS + QMS inputs and outputs combined' },
  { iso27001: '10.1 — Improvement', iso9001: '10.3 — Improvement', alignment: 'Identical requirement', saving: 'One continual improvement register covering both systems' },
  { iso27001: '10.2 — Corrective Action', iso9001: '10.2 — Corrective Action', alignment: 'Identical requirement', saving: 'Single CAPA register: IS nonconformities + quality nonconformities' },
]

const worksheets = [
  { title: 'IMS Joint Audit Worksheet — Change Management', refs: 'ISO 27001 A.8.32 / ISO 9001 Cl.8.5.6',
    checkpoints: ['Change request raised and documented before implementation', 'Risk/impact assessment completed and approved', 'Change approved by authorised Change Advisory Board (CAB)', 'Test plan executed in non-production environment', 'Rollback plan documented and tested', 'Change implemented and post-implementation review completed', 'Change record updated with actual outcome', 'Audit trail of change maintained in change management system'] },
  { title: 'IMS Joint Audit Worksheet — Supplier Management', refs: 'ISO 27001 A.5.19–A.5.22 / ISO 9001 Cl.8.4',
    checkpoints: ['Approved supplier list maintained and current', 'Supplier security assessment conducted before onboarding', 'IS and quality requirements included in supplier contracts', 'Supplier performance reviewed — security incidents, quality KPIs, SLA', 'Annual supplier re-assessment conducted', 'Supplier access to systems logged and controlled', 'Sub-contractor IS requirements flowed down through supply chain', 'Supplier offboarding process removes all access'] },
  { title: 'IMS Joint Audit Worksheet — Incident Management', refs: 'ISO 27001 A.5.24–A.5.28 / ISO 9001 Cl.10.2',
    checkpoints: ['IS incident classification scheme defined and communicated', 'Incident response team roles assigned and trained', 'IS incidents reported, logged, and tracked to closure', 'Root cause analysis completed for significant incidents', 'Corrective actions implemented and effectiveness verified', 'Lessons learned shared with relevant teams', 'Regulatory notification timelines known and rehearsed', 'Incident metrics reported at management review'] },
  { title: 'IMS Joint Audit Worksheet — SDLC Security', refs: 'ISO 27001 A.8.25–A.8.29 / ISO 9001 Cl.8.1, 8.5',
    checkpoints: ['Security requirements defined at project initiation', 'Threat modelling conducted for new systems', 'Secure coding standards applied and developers trained', 'SAST/DAST scanning integrated into CI/CD pipeline', 'Security testing conducted before release to production', 'Vulnerability findings tracked and remediated', 'Security sign-off required for production deployment', 'Post-deployment security review conducted'] },
]

export function IMSCrosswalk() {
  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader standard="IMS" clause="Cross-Walk" title="ISO 27001 × ISO 9001 — Clause Alignment"
        description="Integrated Management System cross-walk — all 18 shared clauses between ISO 27001:2022 and ISO 9001:2015 mapped with alignment assessment and documentation savings. Running a joint IMS typically saves 30–40% vs separate systems."
        badges={['IMS', 'ISO 27001', 'ISO 9001']} />

      <div className="card mb-6 bg-emerald-900/10 border-emerald-800/40">
        <div className="text-sm font-semibold text-emerald-400 mb-2">IMS Efficiency — Key Savings</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-steel-300">
          {[
            { label: 'Shared Clauses', value: '18 of 30', desc: '18 clauses are functionally identical or near-identical between the two standards' },
            { label: 'Audit Saving', value: '30–40%', desc: 'Joint internal audits using ISO 19011 cover both standards simultaneously' },
            { label: 'Documentation Saving', value: '40–50%', desc: 'Combined procedures, policies, and registers serve both management systems' },
          ].map(s => (
            <div key={s.label} className="bg-navy-800 rounded-lg p-3">
              <div className="text-emerald-400 font-bold text-lg mb-1">{s.value}</div>
              <div className="font-semibold text-white mb-0.5">{s.label}</div>
              <div className="text-steel-400">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-0 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b border-navy-700 bg-navy-800/50">
              {['ISO 27001:2022', 'ISO 9001:2015', 'Alignment', 'IMS Saving'].map(h => (
                <th key={h} className="text-left py-3 px-3 text-steel-400 font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {crosswalkData.map((row, i) => (
                <tr key={i} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                  <td className="py-2.5 px-3 text-blue-400 font-mono font-medium whitespace-nowrap">{row.iso27001}</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-mono font-medium whitespace-nowrap">{row.iso9001}</td>
                  <td className="py-2.5 px-3"><span className={`badge text-xs ${row.alignment === 'Identical requirement' ? 'bg-emerald-900/40 text-emerald-300' : 'bg-amber-900/40 text-amber-300'}`}>{row.alignment}</span></td>
                  <td className="py-2.5 px-3 text-steel-300 max-w-xs">{row.saving}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AIPanel title="Generate IMS Documentation"
        systemPrompt="You are an Integrated Management System (IMS) specialist combining ISO 27001:2022 and ISO 9001:2015. Generate combined IMS documentation that satisfies both standards simultaneously — unified policies, combined procedures, joint registers, and shared management review templates. Identify clause alignments and maximise documentation efficiency."
        placeholder="e.g. Generate a combined IMS Context Analysis document satisfying ISO 27001 Cl.4 and ISO 9001 Cl.4 simultaneously"
        contextFields={[
          { id: 'org', label: 'Organisation', type: 'text', placeholder: 'e.g. UK professional services firm, 300 staff' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['IMS Policy Framework', 'Combined Context Analysis', 'Joint Interested Parties Register', 'IMS Scope Statement', 'Combined RACI Matrix', 'Joint Management Review Agenda', 'Combined Objectives Register', 'IMS Document Register'] },
        ]} />
    </div>
  )
}

export function IMSWorksheets() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="IMS" clause="Joint Worksheets" title="IMS Joint Audit Worksheets"
        description="Pre-built joint audit worksheets covering key processes that span both ISO 27001 and ISO 9001 — Change Management, Supplier Control, Incident Management, and SDLC. Each checkpoint satisfies both standards simultaneously."
        badges={['IMS', 'Joint Audit', 'ISO 19011']} />

      <div className="space-y-5 mb-6">
        {worksheets.map((ws, idx) => (
          <div key={idx} className="card border-l-4 border-l-cyan-400">
            <div className="flex items-start gap-3 mb-3">
              <span className="clause-tag flex-shrink-0 self-start">WS-{String(idx+1).padStart(2,'0')}</span>
              <div>
                <h3 className="font-semibold text-white mb-1">{ws.title}</h3>
                <span className="badge bg-cyan-900/40 text-cyan-300 text-xs">{ws.refs}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {ws.checkpoints.map((cp, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={12} className="text-emerald-audit flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-steel-300 leading-snug">{cp}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AIPanel title="Generate Joint Audit Worksheets"
        systemPrompt="You are an IMS joint audit specialist. Generate detailed joint audit worksheets covering both ISO 27001:2022 and ISO 9001:2015 requirements simultaneously. Include specific test steps (TOD, TOI, TOE), evidence to request, and audit questions. Reference both standard clause numbers for each checkpoint."
        placeholder="e.g. Generate a joint IMS audit worksheet for Business Continuity covering ISO 27001 A.5.29/A.5.30 and ISO 9001 Cl.8.1"
        contextFields={[
          { id: 'process', label: 'Process to Audit', type: 'text', placeholder: 'e.g. Business continuity, HR onboarding, software development' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Joint Audit Worksheet', 'TOD Checklist — both standards', 'TOI Walkthrough Script', 'TOE Sampling Plan', 'Joint Audit Finding Template', 'Process RACI — both standards'] },
          { id: 'org', label: 'Organisation', type: 'text', placeholder: 'e.g. Manufacturing company, 500 staff' },
        ]} />
    </div>
  )
}
