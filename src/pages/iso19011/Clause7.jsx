import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const domains = [
  { title: 'Knowledge Requirements — Cl. 7.2.3', items: ['Management system standards (ISO 27001, 9001)', 'Audit principles & methodology (ISO 19011)', 'Sector-specific regulations & requirements', 'Risk management frameworks (ISO 27005)', 'IT systems, security concepts, and controls'] },
  { title: 'Skills Requirements — Cl. 7.2', items: ['Apply audit methods and sampling techniques', 'Manage audit activities and team dynamics', 'Communicate clearly in writing and verbally', 'Analyse evidence and form objective conclusions', 'Identify and evaluate information security risks'] },
  { title: 'Personal Attributes — Cl. 7.2.2', items: ['Ethical — truthful, honest, discreet', 'Open-minded — considers alternative views', 'Diplomatically assertive — not aggressive', 'Observant and perceptive to detail', 'Adaptable and resilient under pressure'] },
  { title: 'Lead Auditor Additional Skills — Cl. 7.2.4', items: ['Plan and direct the audit team effectively', 'Manage audit time and scope discipline', 'Resolve conflicts between auditors and auditees', 'Represent audit conclusions to senior management', 'Quality-review team workpapers before sign-off'] },
]

const evalMethods = [
  ['Review of records', 'Check education, training certificates, CPD logs', 'Initial auditor qualification'],
  ['Peer feedback', 'Structured peer review post-audit engagement', 'Ongoing performance monitoring'],
  ['Observation on audit', 'Senior auditor observes during live fieldwork', 'First 1–2 audits post-certification'],
  ['Interview', 'Structured competency-based interview session', 'Annual evaluation or new role assessment'],
  ['Testing / examination', 'Written or scenario-based assessment', 'Initial qualification gate'],
]

export default function Clause7() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 19011:2018"
        clause="Clause 7"
        title="Auditor Competence & Evaluation"
        description="ISO 19011 Clause 7 requires auditors to be formally competent — through education, work experience, auditor training, and demonstrated audit experience. Competence must be evaluated initially and maintained through ongoing CPD."
        badges={['Competence', 'ISO 19011 Cl. 7']}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {domains.map(d => (
          <div key={d.title} className="card">
            <h3 className="text-sm font-semibold text-white mb-3">{d.title}</h3>
            <div className="space-y-1.5">
              {d.items.map(i => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={12} className="text-amber-audit flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-steel-300 leading-snug">{i}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="card mb-6">
        <h2 className="section-title mb-3">Evaluation Methods — Cl. 7.3</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-700">
                {['Method', 'How It Works', 'When to Use'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-steel-400 font-medium text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evalMethods.map((row, i) => (
                <tr key={i} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/30'}`}>
                  <td className="py-2 px-3 text-white font-medium">{row[0]}</td>
                  <td className="py-2 px-3 text-steel-300">{row[1]}</td>
                  <td className="py-2 px-3 text-steel-300">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AIPanel
        title="Generate Competence Artifacts"
        systemPrompt="You are an ISO 19011:2018 auditor competence expert. Generate auditor competency frameworks, skills matrices, evaluation forms, CPD tracking templates, and personal attributes checklists. All outputs must be professional HR/audit governance documents aligned to ISO 19011 Clause 7 requirements."
        placeholder="e.g. Generate a CPD Tracking Template for an ISO 27001 Lead Auditor covering 40 hours per year"
        contextFields={[
          { id: 'role', label: 'Auditor Role', type: 'select', options: ['Internal Auditor', 'Lead Auditor', 'IT Audit Specialist', 'Audit Programme Manager', 'External Auditor'] },
          { id: 'standards', label: 'Standards in Scope', placeholder: 'e.g. ISO 27001, 27002, 27005, 9001', type: 'text' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Competency Framework', 'Lead Auditor Skills Matrix', 'Auditor Evaluation Form', 'Personal Attributes Checklist', 'CPD Tracking Template', 'Initial Qualification Checklist', 'Annual Competency Review'] },
        ]}
      />
    </div>
  )
}
