import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const elements = [
  { clause: '7.1', title: 'Resources', color: 'border-l-blue-500',
    desc: 'Determine and provide the resources needed for establishing, implementing, maintaining, and continually improving the ISMS.',
    items: [
      'Budget allocated to IS — tool licences, training, consultancy, headcount',
      'IS team staffing levels adequate for scope and risk profile',
      'Security tools procured and maintained (SIEM, AV, DLP, IAM)',
      'Resource adequacy reviewed at management review (Cl. 9.3)',
      'Resources for corrective actions and improvement projects allocated',
      'External resources (MSSP, consultants) contracted where gaps exist',
    ], artifact: 'IS Resource Plan / Budget Evidence' },
  { clause: '7.2', title: 'Competence', color: 'border-l-purple-500',
    desc: 'Ensure persons doing IS work are competent — appropriate education, training, and experience. Maintain records.',
    items: [
      'IS competence requirements defined per role (job descriptions)',
      'Current competence of IS personnel assessed against requirements',
      'Training provided where competence gaps identified',
      'Training records maintained — courses, certifications, dates',
      'Professional certifications tracked: CISA, CISSP, ISO 27001 LA/LI',
      'Third-party and contractor competence verified before access granted',
      'Competence reviewed annually or when roles change',
      'Evidence of competence retained as documented information',
    ], artifact: 'Competence Register / Training Records' },
  { clause: '7.3', title: 'Awareness', color: 'border-l-emerald-500',
    desc: 'All persons doing work under the ISMS must be aware of the IS policy, their contribution, and the implications of non-conformity.',
    items: [
      'All staff completed IS awareness training — records maintained',
      'IS awareness training covers: policy, threats, responsibilities, reporting',
      'Training completed at onboarding and refreshed annually',
      'Phishing simulation conducted to test awareness effectiveness',
      'IS awareness metrics reported to management',
      'Specialist role-based training delivered (developers, finance, HR)',
      'Third-party and contractor IS awareness verified',
      'Non-conformity consequences communicated to all staff',
    ], artifact: 'IS Awareness Training Completion Records' },
  { clause: '7.4', title: 'Communication', color: 'border-l-amber-500',
    desc: 'Determine internal and external communications relevant to the ISMS — what, when, with whom, and how.',
    items: [
      'IS communication plan documented — what is communicated and to whom',
      'Internal: IS policy updates, incident alerts, awareness campaigns, metrics reports',
      'External: incident notifications to regulators, customers, certification body',
      'IS incident communication process tested (tabletop exercises)',
      'Regulatory notification timelines known and rehearsed (72hr GDPR)',
      'Communication channels secured and verified',
    ], artifact: 'IS Communication Plan' },
  { clause: '7.5', title: 'Documented Information', color: 'border-l-red-500',
    desc: 'Create, update, and control documented information required by ISO 27001 and determined necessary by the organisation.',
    items: [
      'Document control procedure defines: creation, approval, version control, retention',
      'All mandatory ISO 27001 documented information maintained',
      'Documents reviewed and approved before issue',
      'Current versions available at point of use',
      'External origin documents identified and controlled',
      'Obsolete documents removed from circulation or clearly marked',
      'Access controls applied to IS documentation',
      'Document retention periods defined and applied',
    ], artifact: 'Document Control Procedure + Document Register' },
]

const mandatoryDocs = [
  'Scope of the ISMS (Cl. 4.3)', 'Information Security Policy (Cl. 5.2)',
  'Risk Assessment Process (Cl. 6.1.2)', 'Risk Treatment Process (Cl. 6.1.3)',
  'Statement of Applicability (Cl. 6.1.3)', 'IS Objectives (Cl. 6.2)',
  'Competence Evidence (Cl. 7.2)', 'Operational Planning (Cl. 8.1)',
  'Risk Assessment Results (Cl. 8.2)', 'Risk Treatment Results (Cl. 8.3)',
  'Monitoring & Measurement Results (Cl. 9.1)', 'Internal Audit Programme (Cl. 9.2)',
  'Internal Audit Results (Cl. 9.2)', 'Management Review Results (Cl. 9.3)',
  'Nonconformities & Corrective Actions (Cl. 10.2)',
]

export default function ISO27001Clause7() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 27001:2022" clause="Clause 7" title="Support — Resources, Competence & Documentation"
        description="Clause 7 covers the support infrastructure for the ISMS — adequate resources and budget, competent and trained staff, IS awareness across the organisation, clear communication processes, and rigorous document control."
        badges={['Support', 'TOD', 'TOI', 'TOE']} />
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
        <h2 className="section-title mb-3">Mandatory ISO 27001 Documented Information (Cl. 7.5)</h2>
        <p className="text-xs text-steel-400 mb-3">These 15 items are explicitly required by ISO 27001:2022 as documented information. All must be present, current, and controlled during a certification audit.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {mandatoryDocs.map((d, i) => (
            <div key={i} className="flex items-start gap-2 bg-navy-800 rounded-lg p-2">
              <span className="text-amber-audit font-mono text-xs flex-shrink-0 font-bold">{String(i+1).padStart(2,'0')}</span>
              <span className="text-xs text-steel-300 leading-snug">{d}</span>
            </div>
          ))}
        </div>
      </div>
      <AIPanel title="Generate Clause 7 Artifacts"
        systemPrompt="You are an ISO 27001:2022 Clause 7 support specialist. Generate competence registers, IS awareness training content, document control procedures, IS communication plans, and training records templates. All outputs must be audit-ready and aligned to ISO 27001:2022 Clause 7 requirements."
        placeholder="e.g. Generate an IS awareness training programme for 500 staff in a financial services firm"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. NHS Trust, 2000 staff, on-prem + Azure' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['IS Awareness Training Programme', 'Competence Register', 'Document Control Procedure', 'IS Communication Plan', 'Training Needs Analysis', 'Phishing Simulation Report Template', 'IS Document Register'] },
          { id: 'role', label: 'Target Audience (if training)', type: 'text', placeholder: 'e.g. All staff / Developers / Finance team' },
        ]} />
    </div>
  )
}
