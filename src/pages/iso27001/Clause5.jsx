import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const elements = [
  { clause: '5.1', title: 'Leadership & Commitment', desc: 'Top management must demonstrate active leadership — not just sign off on policies.', items: ['ISMS objectives aligned to organisational strategy', 'Resources for ISMS established and maintained', 'Information security integrated into business processes', 'Management review conducted (Cl. 9.3)'], artifact: 'Management Commitment Evidence Checklist' },
  { clause: '5.2', title: 'Information Security Policy', desc: 'A formal policy statement setting the direction for information security across the organisation.', items: ['Appropriate to the purpose of the organisation', 'Includes information security objectives or framework', 'Commitment to satisfying applicable requirements', 'Commitment to continual improvement of ISMS'], artifact: 'Information Security Policy' },
  { clause: '5.3', title: 'Roles, Responsibilities & Authorities', desc: 'ISMS roles must be formally assigned, documented, and communicated across the organisation.', items: ['CISO or equivalent role designated', 'Responsibilities for ISO 27001 clauses assigned', 'Reporting structure documented (RACI)', 'Authorities communicated to relevant parties'], artifact: 'RACI Matrix — ISMS Roles' },
]

export default function ISO27001Clause5() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Clause 5"
        title="Leadership & Information Security Policy"
        description="Clause 5 requires top management to demonstrate active commitment to the ISMS — through policy, resource allocation, role assignment, and visible leadership behaviours."
        badges={['Leadership', 'TOD', 'TOI']}
      />
      <div className="space-y-4 mb-6">
        {elements.map(el => (
          <div key={el.clause} className="card border-l-4 border-l-purple-500">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="clause-tag flex-shrink-0 self-start">{el.clause}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1">{el.title}</h3>
                <p className="text-sm text-steel-300 mb-3 leading-relaxed">{el.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                  {el.items.map(i => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-steel-300 leading-snug">{i}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-steel-400">Artifact:</span>
                  <span className="badge badge-steel">{el.artifact}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AIPanel
        title="Generate Clause 5 Artifacts"
        systemPrompt="You are an ISO 27001:2022 leadership and governance expert. Generate professional Clause 5 artifacts: Information Security Policies, management commitment evidence checklists, and RACI matrices for ISMS roles. Policies must be appropriately worded for board-level approval, reference ISO 27001:2022, and include all mandatory elements."
        placeholder="e.g. Generate an Information Security Policy for a healthcare organisation processing patient data"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', placeholder: 'e.g. NHS Trust, 2,000 employees', type: 'text' },
          { id: 'ceo', label: 'CEO / Top Management Name', placeholder: 'e.g. Dr. Sarah Johnson, CEO', type: 'text' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Information Security Policy', 'Management Commitment Evidence Checklist', 'RACI Matrix — ISMS Roles', 'CISO Role Description', 'Policy Communication Plan'] },
        ]}
      />
    </div>
  )
}
