import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const elements = [
  { clause: '8.1', title: 'Operational Planning & Control', desc: 'Plan, implement, and control processes to meet IS requirements and implement risk treatment actions.', items: ['Processes documented and controlled', 'Planned changes managed formally', 'Outsourced processes controlled', 'Process performance monitored'], artifact: 'Operational Control Register' },
  { clause: '8.2', title: 'Information Security Risk Assessment', desc: 'Conduct risk assessments at planned intervals and when significant changes occur.', items: ['Risk assessments conducted at planned intervals', 'Risk assessments triggered by significant changes', 'Risk assessment results documented', 'Risk owners review and sign off results'], artifact: 'Risk Assessment Results Register' },
  { clause: '8.3', title: 'Information Security Risk Treatment', desc: 'Implement the risk treatment plan and retain documented information of results.', items: ['Risk treatment plan implemented', 'Selected controls from Annex A implemented', 'Residual risk accepted by risk owners', 'Treatment results documented and retained'], artifact: 'Risk Treatment Implementation Log' },
]

export default function ISO27001Clause8() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Clause 8"
        title="Operation — Risk Assessment & Treatment"
        description="Clause 8 covers day-to-day ISMS operations — implementing controls, conducting risk assessments, and executing the risk treatment plan."
        badges={['Operations', 'TOI', 'TOE']}
      />
      <div className="space-y-4 mb-6">
        {elements.map(el => (
          <div key={el.clause} className="card border-l-4 border-l-orange-400">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="clause-tag flex-shrink-0 self-start">{el.clause}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1">{el.title}</h3>
                <p className="text-sm text-steel-300 mb-3 leading-relaxed">{el.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                  {el.items.map(i => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-orange-400 flex-shrink-0 mt-0.5" />
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
        title="Generate Clause 8 Artifacts"
        systemPrompt="You are an ISO 27001:2022 operational controls expert. Generate professional Clause 8 artifacts: operational control registers, risk assessment results registers, risk treatment implementation logs. Focus on practical, audit-ready outputs that demonstrate operational control of the ISMS."
        placeholder="e.g. Generate a Risk Treatment Implementation Log for a cloud migration project adding AWS services to ISMS scope"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', placeholder: 'e.g. E-commerce, AWS environment', type: 'text' },
          { id: 'change', label: 'Significant Change / Trigger', placeholder: 'e.g. Cloud migration, new product launch, M&A', type: 'text' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Operational Control Register', 'Risk Assessment Results Register', 'Risk Treatment Implementation Log', 'Change-Triggered Risk Assessment Template', 'Outsourced Process Control List'] },
        ]}
      />
    </div>
  )
}
