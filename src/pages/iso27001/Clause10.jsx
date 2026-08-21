import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2, RefreshCw } from 'lucide-react'

const elements = [
  { clause: '10.1', title: 'Continual Improvement', color: 'border-l-emerald-500',
    desc: 'Continually improve the suitability, adequacy, and effectiveness of the ISMS.',
    items: ['Improvement opportunities identified from audit results, incidents, management review', 'Improvement actions documented, prioritised, and assigned owners', 'Implementation of improvements tracked and verified', 'Effectiveness of improvements evaluated after implementation', 'Improvements to ISMS policies, procedures, and controls documented', 'Lessons learned from incidents and near-misses captured', 'Continual improvement programme presented at management review', 'ISMS maturity assessed against industry benchmarks periodically'], artifact: 'Continual Improvement Register' },
  { clause: '10.2', title: 'Nonconformity & Corrective Action', color: 'border-l-red-500',
    desc: 'When a nonconformity occurs, react to control and correct it, evaluate the cause, and take action to prevent recurrence.',
    items: ['Nonconformities identified from audits, incidents, monitoring, or complaints', 'Immediate containment action taken to control the nonconformity', 'Root cause analysis conducted (5-Why, fishbone, or equivalent method)', 'Corrective action implemented to address root cause — not just symptom', 'Corrective action effectiveness reviewed after implementation', 'ISMS updated where necessary to prevent recurrence', 'Nonconformity and corrective action records retained', 'Similar nonconformities reviewed to identify systemic issues'],
    ratingGuide: [
      { rating: 'Major NC', desc: 'Complete absence of a required control or systematic failure across multiple instances' },
      { rating: 'Minor NC', desc: 'Isolated failure of a control that is otherwise designed and implemented correctly' },
      { rating: 'Opportunity for Improvement', desc: 'Control working but could be enhanced — not a current failure' },
      { rating: 'Observation', desc: 'Noted for awareness — no corrective action required' },
    ],
    artifact: 'Corrective Action Register' },
]

const capaTimelines = [
  { rating: 'Critical Finding', timeline: '7 days', action: 'Immediate escalation to executive management + emergency remediation' },
  { rating: 'High Finding', timeline: '30 days', action: 'Root cause analysis + corrective action plan submitted within 14 days' },
  { rating: 'Medium Finding', timeline: '90 days', action: 'Corrective action plan submitted within 30 days, implementation by day 90' },
  { rating: 'Low / Advisory', timeline: '180 days', action: 'Management acceptance or improvement plan within 60 days' },
]

export default function ISO27001Clause10() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Clause 10"
        title="Improvement — Nonconformity & CAPA"
        description="Clause 10 requires the organisation to react to nonconformities, conduct root cause analysis, implement corrective actions, and continually improve the ISMS. All CAPAs must be tracked to verified closure."
        badges={['CAPA', 'Improvement', 'TOE']}
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
                {el.ratingGuide && (
                  <div className="bg-navy-800 rounded-lg p-3 mb-3">
                    <div className="text-xs font-semibold text-steel-400 mb-2">Nonconformity Classification</div>
                    <div className="space-y-1.5">
                      {el.ratingGuide.map(r => (
                        <div key={r.rating} className="flex items-start gap-2">
                          <span className="text-xs font-semibold text-amber-audit flex-shrink-0 w-32">{r.rating}</span>
                          <span className="text-xs text-steel-300">{r.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
        <div className="flex items-center gap-2 mb-3">
          <RefreshCw size={14} className="text-amber-audit" />
          <h2 className="section-title mb-0">CAPA Closure Timelines</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b border-navy-700">{['Finding Rating','Required Closure','Corrective Action'].map(h => <th key={h} className="text-left py-2 px-3 text-steel-400 font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {capaTimelines.map((r, i) => (
                <tr key={r.rating} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                  <td className="py-2.5 px-3 font-semibold text-white">{r.rating}</td>
                  <td className="py-2.5 px-3 text-amber-audit font-mono font-bold">{r.timeline}</td>
                  <td className="py-2.5 px-3 text-steel-300">{r.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AIPanel
        title="Generate Clause 10 Artifacts"
        systemPrompt="You are an ISO 27001:2022 Clause 10 improvement specialist. Generate professional CAPA (Corrective and Preventive Action) documentation, root cause analysis workpapers, nonconformity registers, and continual improvement plans. Use ISO 27001:2022 Clause 10 requirements. Apply 5-Why or fishbone root cause methodology. Produce audit-ready, board-level documentation."
        placeholder="e.g. Generate a root cause analysis workpaper for a finding on incomplete user access reviews using 5-Why methodology"
        contextFields={[
          { id: 'org', label: 'Organisation', type: 'text', placeholder: 'e.g. ABC Financial Services' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['CAPA Register', 'Root Cause Analysis (5-Why)', 'Corrective Action Plan', 'Nonconformity Report', 'Continual Improvement Plan', 'Effectiveness Review Report'] },
          { id: 'finding', label: 'Finding / Nonconformity', type: 'textarea', placeholder: 'Describe the nonconformity or finding requiring CAPA...' },
        ]}
      />
    </div>
  )
}
