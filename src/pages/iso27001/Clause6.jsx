import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const elements = [
  { clause: '6.1.1', title: 'Actions to Address Risks & Opportunities', desc: 'Plan how to address risks and opportunities identified from Clause 4 context analysis.', items: ['Risks and opportunities identified from Cl. 4', 'Actions planned to address each', 'Actions integrated into ISMS processes', 'Effectiveness evaluation planned'], artifact: 'Risk & Opportunity Action Plan' },
  { clause: '6.1.2', title: 'Information Security Risk Assessment', desc: 'Establish and apply a risk assessment process to identify, analyse, and evaluate risks.', items: ['Risk acceptance criteria established', 'Asset-threat-vulnerability methodology applied', 'Risk owners assigned per identified risk', 'Inherent and residual risk scores calculated'], artifact: 'Risk Assessment Methodology' },
  { clause: '6.1.3', title: 'Statement of Applicability (SoA)', desc: 'Document all 93 Annex A controls — with justification for inclusion or exclusion of each.', items: ['All 93 controls listed and assessed', 'Inclusion/exclusion justification per control', 'Implementation status per control', 'Cross-reference to risk treatment decisions'], artifact: 'Statement of Applicability (SoA) — 93 Controls' },
  { clause: '6.2', title: 'Information Security Objectives', desc: 'Establish measurable ISMS objectives aligned to the Information Security Policy.', items: ['Objectives consistent with IS policy', 'Objectives measurable where practicable', 'Resources, responsibility, and timeline assigned', 'Monitored, communicated, and updated as needed'], artifact: 'ISMS Objectives Register' },
]

export default function ISO27001Clause6() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Clause 6"
        title="Planning & Statement of Applicability"
        description="Clause 6 is the planning heart of the ISMS — establishing the risk assessment process, risk treatment decisions, the Statement of Applicability, and measurable ISMS objectives."
        badges={['Planning', 'SoA', 'TOD']}
      />
      <div className="space-y-4 mb-6">
        {elements.map(el => (
          <div key={el.clause} className="card border-l-4 border-l-amber-audit">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="clause-tag flex-shrink-0 self-start">{el.clause}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1">{el.title}</h3>
                <p className="text-sm text-steel-300 mb-3 leading-relaxed">{el.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                  {el.items.map(i => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-amber-audit flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-steel-300 leading-snug">{i}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-steel-400">Artifact:</span>
                  <span className="badge badge-amber">{el.artifact}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AIPanel
        title="Generate Clause 6 Artifacts"
        systemPrompt="You are an ISO 27001:2022 planning and risk expert. Generate professional Clause 6 artifacts including Statements of Applicability (with justifications for all 93 controls), risk assessment methodologies, ISMS objectives registers, and risk treatment plans. SoA must list controls by Annex A theme, include implementation status, and provide clear inclusion/exclusion rationale."
        placeholder="e.g. Generate a Statement of Applicability for a cloud-based SaaS company — exclude physical security controls A.7.1 to A.7.3 with justification"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', placeholder: 'e.g. Cloud SaaS, fully remote, 150 employees', type: 'text' },
          { id: 'exclusions', label: 'Known Control Exclusions', placeholder: 'e.g. A.7.1–A.7.3 (no physical premises), A.8.22 (no web filtering)', type: 'text' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Statement of Applicability (SoA)', 'Risk Assessment Methodology', 'ISMS Objectives Register', 'Risk & Opportunity Action Plan', 'Risk Acceptance Criteria'] },
        ]}
      />
    </div>
  )
}
