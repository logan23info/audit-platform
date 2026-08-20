import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'

const likelihoodScale = [
  { score: 5, label: 'Almost Certain', desc: 'Expected to occur in most circumstances (>90%)' },
  { score: 4, label: 'Likely', desc: 'Will probably occur in most circumstances (60–90%)' },
  { score: 3, label: 'Possible', desc: 'Might occur at some time (30–60%)' },
  { score: 2, label: 'Unlikely', desc: 'Could occur at some time (10–30%)' },
  { score: 1, label: 'Rare', desc: 'May occur only in exceptional circumstances (<10%)' },
]

const impactScale = [
  { score: 5, label: 'Critical', desc: 'Catastrophic — regulatory action, major data breach, business failure' },
  { score: 4, label: 'Major', desc: 'Significant — large financial loss, reputational damage, regulatory fine' },
  { score: 3, label: 'Moderate', desc: 'Noticeable — service disruption, minor data exposure, manageable loss' },
  { score: 2, label: 'Minor', desc: 'Manageable — minor disruption, no regulatory impact, small financial loss' },
  { score: 1, label: 'Negligible', desc: 'Minimal — negligible impact, no data exposure, no financial impact' },
]

const riskMatrix = [
  [5, 10, 15, 20, 25],
  [4, 8, 12, 16, 20],
  [3, 6, 9, 12, 15],
  [2, 4, 6, 8, 10],
  [1, 2, 3, 4, 5],
]

const getRiskColor = (score) => {
  if (score >= 20) return 'bg-red-900 text-red-200'
  if (score >= 12) return 'bg-orange-900 text-orange-200'
  if (score >= 6) return 'bg-amber-900 text-amber-200'
  return 'bg-emerald-900 text-emerald-200'
}

const sampleRisks = [
  { id: 'R001', asset: 'Customer PII Database', threat: 'Ransomware attack', vuln: 'Unpatched systems', inherent: '4×4=16', control: 'A.8.7, A.8.8', residual: '4×2=8', owner: 'CISO', treatment: 'Mitigate' },
  { id: 'R002', asset: 'Admin Credentials', threat: 'Credential theft / phishing', vuln: 'No MFA on admin accounts', inherent: '4×5=20', control: 'A.8.5', residual: '2×5=10', owner: 'IT Manager', treatment: 'Mitigate' },
  { id: 'R003', asset: 'Cloud Storage (AWS S3)', threat: 'Misconfiguration — public exposure', vuln: 'No automated config scanning', inherent: '3×5=15', control: 'A.8.9, A.5.23', residual: '2×5=10', owner: 'Cloud Architect', treatment: 'Mitigate' },
  { id: 'R004', asset: 'Source Code Repository', threat: 'Insider threat — IP theft', vuln: 'No SoD in code review', inherent: '2×4=8', control: 'A.8.4, A.5.3', residual: '2×3=6', owner: 'Dev Lead', treatment: 'Mitigate' },
]

export default function RiskRegister() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27005:2022"
        clause="Risk Register"
        title="Dynamic Risk Register"
        description="ISO 27005 risk register — Asset × Threat × Vulnerability mapping with inherent and residual risk scoring, risk treatment decisions, and control mapping to ISO 27002 Annex A."
        badges={['Risk Management', 'ISO 27005', 'TOD']}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="section-title mb-3">Likelihood Scale (1–5)</h2>
          <div className="space-y-2">
            {likelihoodScale.map(l => (
              <div key={l.score} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded bg-navy-800 border border-navy-600 text-xs font-bold text-amber-audit flex items-center justify-center flex-shrink-0">{l.score}</span>
                <div>
                  <div className="text-xs font-semibold text-white">{l.label}</div>
                  <div className="text-xs text-steel-400 leading-snug">{l.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="section-title mb-3">Impact Scale (1–5)</h2>
          <div className="space-y-2">
            {impactScale.map(i => (
              <div key={i.score} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded bg-navy-800 border border-navy-600 text-xs font-bold text-amber-audit flex items-center justify-center flex-shrink-0">{i.score}</span>
                <div>
                  <div className="text-xs font-semibold text-white">{i.label}</div>
                  <div className="text-xs text-steel-400 leading-snug">{i.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="section-title mb-3">Risk Matrix — Likelihood × Impact</h2>
        <div className="overflow-x-auto">
          <table className="text-xs border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-steel-400">L\I</th>
                {[1, 2, 3, 4, 5].map(i => <th key={i} className="p-2 text-steel-400 w-12">{i}</th>)}
              </tr>
            </thead>
            <tbody>
              {riskMatrix.map((row, ri) => (
                <tr key={ri}>
                  <td className="p-2 text-steel-400 font-medium">{5 - ri}</td>
                  {row.map((score, ci) => (
                    <td key={ci} className={`p-2 text-center font-bold rounded text-xs ${getRiskColor(score)}`}>{score}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-3 mt-3 flex-wrap">
            {[{ c: 'bg-red-900 text-red-200', l: 'Critical (20–25)' }, { c: 'bg-orange-900 text-orange-200', l: 'High (12–16)' }, { c: 'bg-amber-900 text-amber-200', l: 'Medium (6–10)' }, { c: 'bg-emerald-900 text-emerald-200', l: 'Low (1–5)' }].map(r => (
              <div key={r.l} className={`text-xs px-2 py-0.5 rounded font-medium ${r.c}`}>{r.l}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="section-title mb-3">Sample Risk Register — Asset × Threat × Vulnerability</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-700">
                {['ID', 'Asset', 'Threat', 'Vulnerability', 'Inherent', 'Control', 'Residual', 'Owner', 'Treatment'].map(h => (
                  <th key={h} className="text-left py-2 px-2 text-steel-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampleRisks.map((r, i) => (
                <tr key={r.id} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                  <td className="py-2 px-2 font-mono text-amber-audit">{r.id}</td>
                  <td className="py-2 px-2 text-white">{r.asset}</td>
                  <td className="py-2 px-2 text-steel-300">{r.threat}</td>
                  <td className="py-2 px-2 text-steel-300">{r.vuln}</td>
                  <td className="py-2 px-2 text-red-400 font-bold">{r.inherent}</td>
                  <td className="py-2 px-2 text-blue-400 font-mono">{r.control}</td>
                  <td className="py-2 px-2 text-amber-audit font-bold">{r.residual}</td>
                  <td className="py-2 px-2 text-steel-300">{r.owner}</td>
                  <td className="py-2 px-2 text-emerald-400">{r.treatment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AIPanel
        title="Generate Risk Register Entries"
        systemPrompt="You are an ISO 27005:2022 information security risk management expert. Generate complete risk register entries using Asset × Threat × Vulnerability methodology. Each entry must include: Risk ID, Asset, Threat, Vulnerability, Inherent Risk Score (Likelihood × Impact 1–5), Current Controls (ISO 27002 Annex A references), Residual Risk Score, Risk Owner, Treatment Decision (Mitigate/Accept/Transfer/Avoid), and Target Residual Risk. Generate realistic, sector-specific risk scenarios."
        placeholder="e.g. Generate 5 risk register entries for a healthcare SaaS company — focus on patient data, ransomware, and cloud misconfiguration risks"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', placeholder: 'e.g. Healthcare SaaS, patient records, AWS', type: 'text' },
          { id: 'assets', label: 'Key Assets to Cover', placeholder: 'e.g. Patient records, admin credentials, cloud storage', type: 'text' },
          { id: 'scenario', label: 'Risk Scenario Focus', type: 'select', options: ['General ISMS risks', 'Ransomware & malware', 'Insider threat', 'Cloud misconfiguration', 'Supply chain / third-party', 'Phishing & credential theft', 'Physical security', 'Regulatory compliance'] },
        ]}
      />
    </div>
  )
}
