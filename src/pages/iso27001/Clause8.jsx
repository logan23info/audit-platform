import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const elements = [
  { clause: '8.1', title: 'Operational Planning & Control', color: 'border-l-blue-500',
    desc: 'Plan, implement, control, and maintain processes to meet IS requirements and implement risk treatment actions.',
    items: ['All ISMS processes documented with inputs, outputs and controls', 'Planned changes formally reviewed and approved before implementation', 'Unintended changes reviewed and corrective action taken where necessary', 'Outsourced processes identified and controlled per supplier agreements', 'Process performance monitored against defined criteria', 'Process records retained as evidence of control'], artifact: 'Operational Control Register' },
  { clause: '8.2', title: 'Information Security Risk Assessment', color: 'border-l-red-500',
    desc: 'Conduct risk assessments at planned intervals and when significant changes occur or are proposed.',
    items: ['Risk assessments conducted at planned intervals (minimum annually)', 'Risk assessments triggered by significant changes to systems, processes, or context', 'Risk assessment methodology applied consistently (ISO 27005)', 'Risk identification covers all assets, threats, and vulnerabilities', 'Risk analysis calculates inherent and residual likelihood × impact scores', 'Risk evaluation compares residual scores to risk acceptance criteria', 'Risk owners assigned and sign off on risk assessment results', 'Risk assessment results documented and retained'], artifact: 'Risk Assessment Results Register' },
  { clause: '8.3', title: 'Information Security Risk Treatment', color: 'border-l-emerald-500',
    desc: 'Implement and maintain the risk treatment plan. Produce a Statement of Applicability.',
    items: ['Risk treatment options selected (Mitigate/Accept/Transfer/Avoid) with justification', 'Statement of Applicability (SoA) produced listing all 93 Annex A controls', 'SoA documents applicable controls, reasons for inclusion/exclusion', 'Risk treatment plan produced and approved by risk owners', 'Controls from SoA implemented and operating', 'Residual risk accepted by authorised risk owners', 'Risk treatment results documented and retained', 'SoA reviewed when risk assessment results change'], artifact: 'Statement of Applicability (SoA) + Risk Treatment Plan' },
]

const evidenceRequired = [
  'Operational procedures and process documentation',
  'Change management records — approved changes and impact assessments',
  'Risk assessment worksheets with inherent and residual scores',
  'Risk register signed off by risk owners',
  'Statement of Applicability — all 93 controls addressed',
  'Risk treatment plan with implementation status',
  'Supplier/outsourcing agreements with IS requirements',
  'Evidence of control implementation (screenshots, configs, policies)',
]

export default function ISO27001Clause8() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Clause 8"
        title="Operation — Risk Assessment & Treatment"
        description="Clause 8 covers day-to-day ISMS operations — operational planning and control, information security risk assessments at planned intervals, and implementing the risk treatment plan including the Statement of Applicability."
        badges={['Operations', 'TOI', 'TOE']}
      />
      <div className="space-y-4 mb-6">
        {elements.map(el => (
          <div key={el.clause} className={`card border-l-4 ${el.color}`}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="clause-tag flex-shrink-0 self-start">{el.clause}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1">{el.title}</h3>
                <p className="text-sm text-steel-300 mb-3 leading-relaxed">{el.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                  {el.items.map(i => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-emerald-audit flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-steel-300 leading-snug">{i}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-steel-400">Key Artifact:</span>
                  <span className="badge badge-amber text-xs">{el.artifact}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mb-6">
        <h2 className="section-title mb-3">Evidence Required — Clause 8 Audit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {evidenceRequired.map((e, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-amber-audit font-mono text-xs flex-shrink-0">{String(i+1).padStart(2,'0')}.</span>
              <span className="text-xs text-steel-300 leading-snug">{e}</span>
            </div>
          ))}
        </div>
      </div>

      <AIPanel
        title="Generate Clause 8 Artifacts"
        systemPrompt="You are an ISO 27001:2022 Clause 8 specialist. Generate professional operational planning and control artifacts — risk assessments, risk treatment plans, Statement of Applicability (SoA), and operational control registers. Align to ISO 27001:2022 Clause 8.1, 8.2, 8.3. Be specific, include clause references, and produce audit-ready documentation."
        placeholder="e.g. Generate a Statement of Applicability for a UK fintech company on AWS with 93 Annex A controls assessed"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. Fintech SaaS, AWS cloud, 200 employees' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Risk Assessment Worksheet', 'Statement of Applicability (SoA)', 'Risk Treatment Plan', 'Operational Control Register', 'Change Management Procedure', 'Supplier IS Requirements', 'Risk Acceptance Record'] },
          { id: 'controls', label: 'Key Controls / Systems', type: 'text', placeholder: 'e.g. IAM, encryption, patch management, DLP' },
        ]}
      />
    </div>
  )
}
