import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const reportStructure = [
  { section: '1', title: 'Executive Summary', content: ['Overall audit opinion (Effective / Partially Effective / Ineffective)', 'Scope and audit period', 'Summary of findings by rating', 'Key recommendations'], required: true },
  { section: '2', title: 'Background & Scope', content: ['Organisation overview', 'Standards audited (ISO 19011, 27001, 27002, 27005, 9001)', 'Audit objectives and scope boundaries', 'Limitations and caveats'], required: true },
  { section: '3', title: 'Audit Methodology', content: ['ISO 19011 auditing principles applied', 'Testing phases used (TOD / TOI / TOE)', 'Sampling methodology and standards referenced', 'Evidence collection methods'], required: true },
  { section: '4', title: 'Conformity Findings', content: ['Controls operating effectively', 'Areas of strength observed', 'Positive observations and best practice', 'Maturity indicators'], required: true },
  { section: '5', title: 'Nonconformity Findings', content: ['4Cs per finding (Condition, Criteria, Cause, Consequence)', 'Finding rating (Critical / High / Medium / Low)', 'Management response and agreed action', 'Target remediation date'], required: true },
  { section: '6', title: 'Management Responses', content: ['Auditee response to each finding', 'Agreed / Disputed status', 'Corrective action owner', 'Commitment date for remediation'], required: true },
  { section: '7', title: 'Conclusion & Recommendations', content: ['Overall ISMS / QMS effectiveness opinion', 'Priority recommendations', 'Follow-up audit scope (Cl. 6.6)', 'Continual improvement suggestions'], required: true },
  { section: 'App A', title: 'Workpaper Index', content: ['Complete list of workpapers produced', 'WP ID, title, phase, status', 'Reference to audit file location'], required: false },
]

const opinions = [
  { label: 'Effective', desc: 'ISMS/QMS is operating effectively. Minor observations noted. No significant findings.', color: 'bg-emerald-900/30 border-emerald-700 text-emerald-300' },
  { label: 'Partially Effective', desc: 'ISMS/QMS is partially effective. Medium findings noted. Improvement required in specific areas.', color: 'bg-amber-900/30 border-amber-700 text-amber-300' },
  { label: 'Ineffective', desc: 'ISMS/QMS has significant gaps. High or Critical findings noted. Immediate remediation required.', color: 'bg-red-900/30 border-red-700 text-red-300' },
]

export default function ReportBuilder() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 19011:2018"
        clause="Clause 6.5"
        title="Audit Report Builder"
        description="Structured audit report template aligned to ISO 19011 Clause 6.5 — covering all mandatory report elements from executive summary through findings, management responses, and overall audit opinion."
        badges={['Reporting', 'ISO 19011 Cl. 6.5', 'AI-Powered']}
      />

      <div className="card mb-6">
        <h2 className="section-title mb-3">Overall Audit Opinion Framework</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {opinions.map(o => (
            <div key={o.label} className={`border rounded-xl p-4 ${o.color}`}>
              <div className="text-sm font-bold mb-2">{o.label}</div>
              <div className="text-xs opacity-80 leading-relaxed">{o.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="section-title mb-4">Report Structure — ISO 19011 Cl. 6.5.2</h2>
        <div className="space-y-3">
          {reportStructure.map(s => (
            <div key={s.section} className="flex items-start gap-3 bg-navy-800 border border-navy-600 rounded-lg p-3">
              <span className="w-12 h-6 flex-shrink-0 rounded bg-navy-700 border border-navy-600 text-xs font-mono text-amber-audit flex items-center justify-center">{s.section}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm font-semibold text-white">{s.title}</span>
                  {s.required && <span className="badge badge-crimson text-xs">Required</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {s.content.map(c => (
                    <div key={c} className="flex items-start gap-1.5">
                      <CheckCircle2 size={11} className="text-steel-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-steel-400 leading-snug">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AIPanel
        title="Generate Audit Report"
        systemPrompt="You are an ISO 19011:2018 audit reporting expert. Generate complete, professional audit reports following the mandatory structure: Executive Summary, Background & Scope, Methodology (TOD/TOI/TOE), Conformity Findings, Nonconformity Findings (4Cs format), Management Responses, and Conclusion. The overall audit opinion must be clearly stated as Effective / Partially Effective / Ineffective with justification. All findings must reference the specific ISO standard clause or control. Management responses must include owner name, agreed action, and target date."
        placeholder="e.g. Generate a full audit report for an ISO 27001 ISMS internal audit — 2 High findings, 3 Medium findings, overall opinion: Partially Effective"
        contextFields={[
          { id: 'org', label: 'Organisation', placeholder: 'e.g. Acme Financial Ltd, London', type: 'text' },
          { id: 'period', label: 'Audit Period', placeholder: 'e.g. 1 January – 31 December 2025', type: 'text' },
          { id: 'findings', label: 'Findings Summary', placeholder: 'e.g. 2 High: access review, patch mgmt. 3 Medium: logging, DLP, training', type: 'textarea' },
          { id: 'opinion', label: 'Overall Audit Opinion', type: 'select', options: ['Effective', 'Partially Effective', 'Ineffective'] },
          { id: 'section', label: 'Generate Which Section', type: 'select', options: ['Full Audit Report', 'Executive Summary only', 'Nonconformity Findings Section', 'Conformity Findings Section', 'Conclusion & Recommendations', 'Management Response Tracker'] },
        ]}
      />
    </div>
  )
}
