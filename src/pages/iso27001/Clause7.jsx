import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const elements = [
  { clause: '7.1', title: 'Resources', desc: 'Determine and provide resources for establishing, implementing, maintaining and improving the ISMS.', items: ['ISMS budget allocated', 'Tool and technology resources confirmed', 'Audit programme resources planned', 'Third-party support resources identified'], artifact: 'ISMS Resource Plan' },
  { clause: '7.2', title: 'Competence', desc: 'Ensure persons doing ISMS work are competent based on education, training, or experience.', items: ['Competence requirements per ISMS role defined', 'Evidence of competence maintained', 'Training actions taken where gaps identified', 'Competence records retained'], artifact: 'ISMS Competence Register' },
  { clause: '7.3', title: 'Awareness', desc: 'All relevant persons must be aware of the IS policy, their contribution to ISMS, and consequences of non-conformance.', items: ['IS policy communicated to all staff', 'Security awareness training programme', 'Consequences of non-compliance communicated', 'Awareness records maintained'], artifact: 'Security Awareness Programme' },
  { clause: '7.4', title: 'Communication', desc: 'Establish what to communicate, when, to whom, and how regarding the ISMS.', items: ['Internal communication plan for ISMS', 'External communication plan (regulators, customers)', 'Communication channels and frequency defined', 'Communication records maintained'], artifact: 'ISMS Communication Plan' },
  { clause: '7.5', title: 'Documented Information', desc: 'Maintain and control documented information required by ISO 27001 and determined as necessary.', items: ['Document control procedure in place', 'Version control and approval process', 'Distribution and access controls', 'Retention and disposal schedule'], artifact: 'Document Control Procedure' },
]

export default function ISO27001Clause7() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Clause 7"
        title="Support — Resources, Competence & Communication"
        description="Clause 7 ensures the ISMS has adequate resources, competent people, effective awareness programmes, and controlled documentation."
        badges={['Support', 'TOD', 'TOI']}
      />
      <div className="space-y-4 mb-6">
        {elements.map(el => (
          <div key={el.clause} className="card border-l-4 border-l-cyan-500">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="clause-tag flex-shrink-0 self-start">{el.clause}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1">{el.title}</h3>
                <p className="text-sm text-steel-300 mb-3 leading-relaxed">{el.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                  {el.items.map(i => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-cyan-400 flex-shrink-0 mt-0.5" />
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
        title="Generate Clause 7 Artifacts"
        systemPrompt="You are an ISO 27001:2022 support and documentation expert. Generate professional Clause 7 artifacts: competence registers, security awareness programmes, communication plans, and document control procedures. All outputs must be structured, practical, and audit-ready."
        placeholder="e.g. Generate a Security Awareness Programme for a 500-person financial services firm"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', placeholder: 'e.g. Financial services, 500 employees', type: 'text' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['ISMS Resource Plan', 'ISMS Competence Register', 'Security Awareness Programme', 'ISMS Communication Plan', 'Document Control Procedure', 'Documented Information Register'] },
        ]}
      />
    </div>
  )
}
