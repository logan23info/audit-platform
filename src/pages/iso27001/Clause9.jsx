import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const elements = [
  { clause: '9.1', title: 'Monitoring, Measurement & Analysis', desc: 'Evaluate IS performance and effectiveness of the ISMS through defined KPIs and metrics.', items: ['What to monitor and measure defined', 'Methods for monitoring and measurement', 'When results are analysed and evaluated', 'Results documented and retained (ISO 27004 basis)'], artifact: 'ISMS KPI & Metrics Framework (ISO 27004)' },
  { clause: '9.2', title: 'Internal Audit Programme', desc: 'Conduct internal audits at planned intervals to confirm ISMS conforms to requirements.', items: ['Audit programme planned (frequency, scope, methods)', 'Auditor independence maintained', 'Audit results reported to management', 'Nonconformities raised and tracked to closure'], artifact: 'Internal Audit Programme & Schedule' },
  { clause: '9.3', title: 'Management Review', desc: 'Top management reviews the ISMS at planned intervals to ensure suitability, adequacy, and effectiveness.', items: ['Status of previous review actions', 'Changes in external/internal issues (Cl. 4)', 'IS performance — metrics, audits, incidents', 'Opportunities for continual improvement'], artifact: 'Management Review Pack (Inputs & Outputs)' },
]

const mgmtReviewInputs = ['Status of actions from previous management reviews', 'Changes in external and internal issues relevant to the ISMS', 'Feedback on IS performance — nonconformities, monitoring results, audit results', 'Feedback from interested parties', 'Results of risk assessment and status of risk treatment plan', 'Opportunities for continual improvement']

export default function ISO27001Clause9() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Clause 9"
        title="Performance Evaluation"
        description="Clause 9 covers how the ISMS measures and monitors its own performance — through KPIs, internal audits, and formal management review."
        badges={['Performance', 'TOE', 'ISO 27004']}
      />
      <div className="space-y-4 mb-6">
        {elements.map(el => (
          <div key={el.clause} className="card border-l-4 border-l-emerald-500">
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
                  <span className="text-xs text-steel-400">Artifact:</span>
                  <span className="badge badge-emerald">{el.artifact}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card mb-6">
        <h2 className="section-title mb-3">Management Review — Mandatory Inputs (Cl. 9.3.2)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {mgmtReviewInputs.map((input, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="w-4 h-4 rounded bg-emerald-900/40 text-emerald-300 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">{i + 1}</span>
              <span className="text-xs text-steel-300 leading-snug">{input}</span>
            </div>
          ))}
        </div>
      </div>
      <AIPanel
        title="Generate Clause 9 Artifacts"
        systemPrompt="You are an ISO 27001:2022 performance evaluation expert aligned to ISO 27004 measurement principles. Generate professional Clause 9 artifacts: ISMS KPI frameworks, internal audit programmes, management review packs with all mandatory inputs and outputs. Management review packs must include all Cl. 9.3.2 mandatory inputs and produce documented outputs per Cl. 9.3.3."
        placeholder="e.g. Generate a Management Review Pack for a Q4 2025 ISMS review — 3 High findings raised, audit programme 90% complete"
        contextFields={[
          { id: 'org', label: 'Organisation', placeholder: 'e.g. Acme Healthcare, ISO 27001 certified since 2023', type: 'text' },
          { id: 'period', label: 'Review Period', placeholder: 'e.g. Q4 2025 / Full year 2025', type: 'text' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['ISMS KPI & Metrics Framework', 'Internal Audit Programme', 'Annual Audit Schedule', 'Management Review Agenda', 'Management Review Pack (Full)', 'Management Review Minutes Template'] },
        ]}
      />
    </div>
  )
}
