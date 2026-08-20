import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'

const treatments = [
  { option: 'Mitigate', color: 'border-l-blue-400 bg-blue-900/10', desc: 'Apply controls to reduce likelihood and/or impact to an acceptable level.', when: 'Risk score is above appetite and controls are available and cost-effective.', controls: 'ISO 27002 Annex A controls selected and implemented' },
  { option: 'Accept', color: 'border-l-emerald-400 bg-emerald-900/10', desc: 'Accept the risk without further action — residual risk is within appetite.', when: 'Cost of mitigation exceeds potential impact. Risk is within accepted tolerance.', controls: 'Documented risk acceptance by authorised risk owner' },
  { option: 'Transfer', color: 'border-l-amber-400 bg-amber-900/10', desc: 'Transfer the risk to a third party — typically through insurance or outsourcing.', when: 'Risk is better managed externally or financial impact can be insured.', controls: 'Cyber insurance policy, third-party contract with SLA/liability clauses' },
  { option: 'Avoid', color: 'border-l-red-400 bg-red-900/10', desc: 'Eliminate the risk by ceasing the activity that gives rise to it.', when: 'Risk is too high and cannot be adequately controlled or transferred.', controls: 'Business decision to discontinue process or product' },
]

const rtpFields = ['Risk ID', 'Risk Description', 'Inherent Risk Score', 'Treatment Option', 'Selected Controls (ISO 27002)', 'Implementation Owner', 'Target Completion Date', 'Target Residual Score', 'Acceptance Signed Off By', 'Status']

export default function RTP() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27005:2022"
        clause="Risk Treatment"
        title="Risk Treatment Plan (RTP)"
        description="For each risk identified in the Risk Register, a treatment decision must be made. The RTP documents selected controls, implementation owners, timelines, and target residual risk scores."
        badges={['Risk Treatment', 'ISO 27005', 'ISO 27002']}
      />

      <div className="space-y-4 mb-6">
        {treatments.map(t => (
          <div key={t.option} className={`card border-l-4 ${t.color}`}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="badge badge-steel flex-shrink-0 self-start">{t.option}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-steel-200 font-medium mb-1 leading-relaxed">{t.desc}</p>
                <p className="text-xs text-steel-400 mb-2 leading-relaxed"><span className="text-steel-300 font-medium">When to use: </span>{t.when}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-steel-400">Control mechanism:</span>
                  <span className="badge badge-steel">{t.controls}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mb-6">
        <h2 className="section-title mb-3">RTP Required Fields</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {rtpFields.map((f, i) => (
            <div key={f} className="bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 flex items-center gap-2">
              <span className="text-xs font-mono text-amber-audit">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-xs text-steel-300">{f}</span>
            </div>
          ))}
        </div>
      </div>

      <AIPanel
        title="Generate Risk Treatment Plan"
        systemPrompt="You are an ISO 27005:2022 risk treatment expert. Generate comprehensive Risk Treatment Plans (RTPs) mapping identified risks to treatment decisions (Mitigate/Accept/Transfer/Avoid) with specific ISO 27002:2022 control references for mitigated risks. Each RTP entry must include: Risk ID, description, inherent score, treatment option, selected Annex A controls with clause references, implementation owner, target date, target residual score, and acceptance authority."
        placeholder="e.g. Generate an RTP for the top 5 critical and high risks from a cloud-native fintech ISMS risk assessment"
        contextFields={[
          { id: 'risks', label: 'Risk IDs / Descriptions to Treat', placeholder: 'e.g. R001 Ransomware (16), R002 Credential theft (20)', type: 'textarea' },
          { id: 'appetite', label: 'Risk Appetite Threshold', placeholder: 'e.g. Residual risk must be ≤8 (Medium or below)', type: 'text' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Full Risk Treatment Plan', 'Control Selection Matrix (Risk → Annex A)', 'Risk Acceptance Register', 'Risk Transfer Assessment', 'Residual Risk Summary'] },
        ]}
      />
    </div>
  )
}
