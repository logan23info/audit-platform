import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const programmeElements = [
  {
    clause: '5.2', title: 'Audit Programme Objectives',
    description: 'Define measurable objectives for the entire audit programme — aligned to ISMS/QMS strategic goals.',
    items: ['Alignment to management system objectives', 'Regulatory and contractual requirements', 'Risk appetite and risk levels of auditees', 'Availability of resources'],
    artifact: 'Programme Objective Setting Template',
  },
  {
    clause: '5.3', title: 'Audit Programme Risks & Opportunities',
    description: 'Identify and manage risks to the audit programme itself — separate from the ISMS risk register.',
    items: ['Inadequate planning of audit activities', 'Insufficient competent audit resources', 'Failure to achieve audit programme objectives', 'Threats to auditor independence'],
    artifact: 'Audit Programme Risk Register',
  },
  {
    clause: '5.4', title: 'Audit Programme Procedures',
    description: 'Establish consistent SOPs governing how audits are planned, resourced, conducted, and closed.',
    items: ['Audit method selection and justification', 'Audit team selection and assignment', 'Conducting audits per ISO 19011 Cl. 6', 'Maintaining and retaining records'],
    artifact: 'Audit Programme SOP Set',
  },
  {
    clause: '5.4.3', title: 'Audit Programme Resources',
    description: 'Plan and allocate the resources required to deliver the audit programme effectively.',
    items: ['Auditor hours per engagement', 'Tools, technology, and platform access', 'Training and competence development budget', 'Travel and remote audit provisions'],
    artifact: 'Resource Planning Template',
  },
  {
    clause: '5.5', title: 'Implementing the Audit Programme',
    description: 'Execute planned audit activities — scheduling, team assignment, and communication.',
    items: ['Annual audit schedule with dates and scope', 'Audit team assignment matrix', 'Communication plan for auditees', 'Coordination of remote and on-site activities'],
    artifact: 'Audit Schedule & Team Assignment Matrix',
  },
  {
    clause: '5.6', title: 'Monitoring & Reviewing the Programme',
    description: 'Monitor KPIs to assess whether the audit programme is achieving its objectives.',
    items: ['Audit completion rates vs. schedule', 'Finding closure timeliness', 'Auditor competence and performance', 'Auditee feedback on audit process'],
    artifact: 'Programme KPI Dashboard',
  },
  {
    clause: '5.7', title: 'Maintaining & Improving the Programme',
    description: 'Continually improve the audit programme based on monitoring results and lessons learned.',
    items: ['Lessons learned log per audit cycle', 'Audit methodology updates', 'Corrective actions on programme nonconformities', 'Annual programme review outcomes'],
    artifact: 'Programme Improvement Log',
  },
]

const programmeLifecycle = [
  { step: 'Establish', desc: 'Objectives & Scope', clause: '5.2' },
  { step: 'Plan', desc: 'Resources & Schedule', clause: '5.4–5.5' },
  { step: 'Execute', desc: 'Conduct Audits (Cl. 6)', clause: '5.5' },
  { step: 'Monitor', desc: 'KPIs & Progress', clause: '5.6' },
  { step: 'Improve', desc: 'Lessons & Updates', clause: '5.7' },
]

export default function Clause5() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 19011:2018"
        clause="Clause 5"
        title="Managing an Audit Programme"
        description="The governance layer above individual audits. Clause 5 defines how an organisation plans, resources, executes, monitors, and continually improves its entire portfolio of audit activity — covering both ISO 27001 and ISO 9001 under an IMS."
        badges={['Programme Governance', 'Pre-Audit']}
      />

      {/* Programme Lifecycle Flow */}
      <div className="card mb-6">
        <h2 className="section-title mb-4">Programme Lifecycle</h2>
        <div className="flex flex-col sm:flex-row gap-2 overflow-x-auto">
          {programmeLifecycle.map((step, i) => (
            <div key={step.step} className="flex sm:flex-col items-center gap-2 flex-shrink-0 sm:flex-1">
              <div className="bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-center min-w-[100px] sm:min-w-0 sm:w-full">
                <div className="text-xs font-bold text-white">{step.step}</div>
                <div className="text-xs text-steel-400 mt-0.5">{step.desc}</div>
                <span className="clause-tag mt-1 inline-block">{step.clause}</span>
              </div>
              {i < programmeLifecycle.length - 1 && (
                <ArrowRight size={14} className="text-steel-500 flex-shrink-0 sm:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Programme Elements */}
      <div className="space-y-4 mb-6">
        {programmeElements.map(el => (
          <div key={el.clause} className="card">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="clause-tag flex-shrink-0 self-start">{el.clause}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1">{el.title}</h3>
                <p className="text-sm text-steel-300 mb-3 leading-relaxed">{el.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                  {el.items.map(item => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-amber-audit flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-steel-300 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-steel-400">Core Artifact:</span>
                  <span className="badge badge-amber">{el.artifact}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AIPanel
        title="Generate Audit Programme Artifacts"
        systemPrompt={`You are an ISO 19011:2018 audit programme management expert. Generate professional, structured audit programme documents aligned to Clause 5 requirements. All outputs must be ready for immediate use by audit teams. Use tables, numbered lists, and clear section headings. Be specific and practical — avoid generic placeholders where possible. Tailor outputs to the organisation and sector provided.`}
        placeholder="e.g. Generate a 12-month IT audit programme schedule for an ISO 27001 certified SaaS company with 3 internal auditors"
        contextFields={[
          { id: 'org', label: 'Organisation / Sector', placeholder: 'e.g. Healthcare provider, 1,200 employees, ISO 27001 certified', type: 'text' },
          { id: 'auditorCount', label: 'Number of Auditors', placeholder: 'e.g. 2 internal auditors + 1 lead', type: 'text' },
          { id: 'standards', label: 'Standards in Scope', type: 'select', options: [
            'ISO 27001 only',
            'ISO 27001 + ISO 9001 (IMS)',
            'ISO 27001 + ISO 9001 + ISO 27005',
            'Full platform scope'
          ]},
          { id: 'artifact', label: 'Programme Artifact Required', type: 'select', options: [
            'Audit Programme Objectives Template',
            'Audit Programme Risk Register',
            'Audit Programme SOPs',
            'Resource Planning Template',
            'Annual Audit Schedule',
            'Team Assignment Matrix',
            'Communication Plan',
            'Programme KPI Dashboard',
            'Programme Improvement Log',
          ]},
        ]}
      />
    </div>
  )
}
