import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const treatmentOptions = [
  { option: 'Mitigate', desc: 'Implement controls to reduce likelihood or impact below risk appetite', when: 'Risk is above appetite and cost of control is less than cost of risk materialising', examples: ['Patch management programme', 'MFA implementation', 'DLP tool deployment', 'Security awareness training'] },
  { option: 'Accept', desc: 'Formally accept the residual risk — documented and signed off by risk owner', when: 'Residual risk is within appetite OR cost of treatment exceeds benefit', examples: ['Low-scored risks within appetite', 'Risks with no cost-effective control', 'Risks accepted as business necessary'] },
  { option: 'Transfer', desc: 'Transfer financial consequence to a third party — insurance or contract', when: 'Risk cannot be eliminated but financial impact can be shared', examples: ['Cyber insurance policy', 'Contractual liability clauses with suppliers', 'Outsourcing to specialist provider'] },
  { option: 'Avoid', desc: 'Eliminate the risk by stopping the activity that causes it', when: 'Risk is too high and no cost-effective treatment exists', examples: ['Exit high-risk market or geography', 'Decommission vulnerable legacy system', 'Cancel high-risk project'] },
]

const controlMapping = [
  { risk: 'Ransomware / Malware', score: '20', controls: 'A.8.7, A.8.8, A.8.13, A.8.15', treatment: 'Mitigate', residual: '6' },
  { risk: 'Unauthorised Access', score: '16', controls: 'A.5.15, A.5.16, A.5.17, A.8.2, A.8.5', treatment: 'Mitigate', residual: '4' },
  { risk: 'Data Exfiltration', score: '15', controls: 'A.8.12, A.8.20, A.8.22, A.5.14', treatment: 'Mitigate', residual: '6' },
  { risk: 'Supplier / Third Party Breach', score: '12', controls: 'A.5.19, A.5.20, A.5.21, A.5.22', treatment: 'Mitigate + Transfer', residual: '6' },
  { risk: 'Phishing / Social Engineering', score: '15', controls: 'A.6.3, A.8.7, A.8.23, A.5.24', treatment: 'Mitigate', residual: '6' },
  { risk: 'Insider Threat', score: '12', controls: 'A.5.3, A.6.2, A.8.2, A.8.15, A.8.16', treatment: 'Mitigate', residual: '4' },
  { risk: 'DDoS / Availability', score: '9', controls: 'A.8.6, A.8.14, A.5.30', treatment: 'Mitigate + Transfer', residual: '4' },
  { risk: 'Data Loss / Corruption', score: '12', controls: 'A.8.13, A.8.14, A.8.10', treatment: 'Mitigate', residual: '3' },
  { risk: 'Regulatory Non-Compliance', score: '12', controls: 'A.5.31, A.5.34, A.5.36', treatment: 'Mitigate', residual: '4' },
  { risk: 'Misconfiguration', score: '12', controls: 'A.8.9, A.8.25, A.8.32', treatment: 'Mitigate', residual: '4' },
]

const scoreColor = (s) => {
  const n = parseInt(s)
  if (n >= 15) return 'text-red-400 font-bold'
  if (n >= 9) return 'text-amber-audit font-bold'
  return 'text-emerald-400 font-bold'
}

export default function RTP() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 27005:2022" clause="Risk Treatment Plan" title="Risk Treatment Plan (RTP)"
        description="ISO 27005:2022 risk treatment — select treatment options (Mitigate, Accept, Transfer, Avoid), map risks to ISO 27002 Annex A controls, and document residual risk acceptance. The RTP feeds directly into the Statement of Applicability (SoA)."
        badges={['ISO 27005', 'ISO 27002', 'Cl. 6.1.3']} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {treatmentOptions.map(t => (
          <div key={t.option} className="card-sm text-center">
            <div className="text-sm font-bold text-amber-audit mb-1">{t.option}</div>
            <div className="text-xs text-steel-400 leading-snug">{t.desc.split(' — ')[0]}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        {treatmentOptions.map(t => (
          <div key={t.option} className="card border-l-4 border-l-amber-audit">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="clause-tag flex-shrink-0 self-start">{t.option}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-steel-300 mb-2">{t.desc}</p>
                <div className="text-xs text-steel-400 mb-2"><span className="text-steel-300 font-medium">Use when: </span>{t.when}</div>
                <div className="flex flex-wrap gap-1.5">
                  {t.examples.map(e => <span key={e} className="badge badge-steel text-xs">{e}</span>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mb-6">
        <h2 className="section-title mb-3">Risk → Control Mapping — ISO 27002 Annex A</h2>
        <p className="text-xs text-steel-400 mb-4">Common risk scenarios mapped to applicable ISO 27002:2022 controls with indicative inherent and residual scores (1–25 scale).</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b border-navy-700 bg-navy-800/50">
              {['Risk Scenario', 'Inherent', 'ISO 27002 Controls', 'Treatment', 'Residual'].map(h => (
                <th key={h} className="text-left py-2.5 px-3 text-steel-400 font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {controlMapping.map((r, i) => (
                <tr key={r.risk} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                  <td className="py-2.5 px-3 text-white font-medium">{r.risk}</td>
                  <td className={`py-2.5 px-3 ${scoreColor(r.score)}`}>{r.score}</td>
                  <td className="py-2.5 px-3 text-blue-400 font-mono">{r.controls}</td>
                  <td className="py-2.5 px-3"><span className="badge badge-amber text-xs">{r.treatment}</span></td>
                  <td className={`py-2.5 px-3 ${scoreColor(r.residual)}`}>{r.residual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AIPanel title="Generate Risk Treatment Plan"
        systemPrompt="You are an ISO 27005:2022 risk treatment specialist. Generate formal Risk Treatment Plans mapping identified risks to ISO 27002:2022 Annex A controls. Include treatment option justification, control references, implementation guidance, residual risk scores, and risk acceptance statements. All outputs must be audit-ready."
        placeholder="e.g. Generate a risk treatment plan for a cloud-native fintech with 10 high-rated risks"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. AWS SaaS fintech, 200 staff, FCA regulated' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Full Risk Treatment Plan', 'Control Selection Justification', 'Risk Acceptance Statement', 'Residual Risk Register', 'Treatment Implementation Roadmap', 'Risk-to-Control Mapping Table'] },
          { id: 'risks', label: 'Key Risks to Address', type: 'textarea', placeholder: 'e.g. Ransomware, insider threat, cloud misconfiguration...' },
        ]} />
    </div>
  )
}
