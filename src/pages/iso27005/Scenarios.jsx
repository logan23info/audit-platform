import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'

const scenarios = [
  { name: 'Ransomware Attack', threat: 'External attacker', asset: 'Critical business systems', vuln: 'Unpatched systems, no offline backups', impact: 'Business disruption, data loss, ransom demand', controls: 'A.8.7, A.8.8, A.5.30', rating: 'Critical' },
  { name: 'Insider Threat — Data Exfiltration', threat: 'Malicious employee', asset: 'Customer data, IP, financial records', vuln: 'Excessive access rights, no DLP', impact: 'Data breach, regulatory fine, reputational damage', controls: 'A.8.12, A.5.3, A.6.5', rating: 'High' },
  { name: 'Supply Chain Compromise', threat: 'Compromised vendor/software', asset: 'IT infrastructure, software', vuln: 'Insufficient supplier security assessment', impact: 'Backdoor access, widespread system compromise', controls: 'A.5.19, A.5.20, A.5.21', rating: 'Critical' },
  { name: 'Cloud Misconfiguration', threat: 'Internal error / attacker', asset: 'Cloud storage (S3, Blob)', vuln: 'No automated config scanning', impact: 'Public data exposure, regulatory breach', controls: 'A.8.9, A.5.23, A.8.20', rating: 'High' },
  { name: 'Phishing & Credential Theft', threat: 'External attacker via email', asset: 'User credentials, email access', vuln: 'No MFA, poor security awareness', impact: 'Account takeover, lateral movement, data breach', controls: 'A.8.5, A.6.3, A.5.7', rating: 'High' },
  { name: 'Zero-Day Exploit', threat: 'Advanced persistent threat', asset: 'Perimeter systems, web applications', vuln: 'Unpatched unknown vulnerability', impact: 'System compromise, data exfiltration', controls: 'A.8.8, A.8.16, A.5.7', rating: 'Critical' },
]

const ratingColors = { Critical: 'bg-red-900/40 text-red-300 border border-red-700', High: 'bg-orange-900/40 text-orange-300 border border-orange-700' }

export default function Scenarios() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27005:2022"
        clause="Scenario Generator"
        title="Threat Scenario Generator"
        description="AI-powered generation of realistic threat scenarios using Asset × Threat × Vulnerability methodology. Each scenario maps directly to ISO 27002 controls and risk scores."
        badges={['Threat Scenarios', 'ISO 27005', 'AI-Powered']}
      />

      <div className="card mb-6">
        <h2 className="section-title mb-4">Pre-Built Threat Scenarios</h2>
        <div className="space-y-4">
          {scenarios.map(s => (
            <div key={s.name} className="bg-navy-800 border border-navy-600 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-sm font-semibold text-white">{s.name}</h3>
                <span className={`badge flex-shrink-0 ${ratingColors[s.rating]}`}>{s.rating}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { label: 'Threat Actor', val: s.threat },
                  { label: 'Targeted Asset', val: s.asset },
                  { label: 'Vulnerability', val: s.vuln },
                  { label: 'Business Impact', val: s.impact },
                ].map(row => (
                  <div key={row.label}>
                    <span className="text-steel-400 font-medium">{row.label}: </span>
                    <span className="text-steel-300">{row.val}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-navy-700 flex items-center gap-2">
                <span className="text-xs text-steel-400">Mapped Controls:</span>
                {s.controls.split(', ').map(c => (
                  <span key={c} className="badge badge-steel font-mono">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AIPanel
        title="Generate Custom Threat Scenarios"
        systemPrompt="You are an ISO 27005:2022 threat scenario expert with deep knowledge of current cyber threats, attack vectors, and risk assessment methodology. Generate detailed, realistic threat scenarios using the Asset × Threat × Vulnerability framework. Each scenario must include: Scenario Name, Threat Actor, Attack Vector, Targeted Assets, Exploited Vulnerability, Attack Sequence (step-by-step), Business Impact (CIA triad), Likelihood Score (1-5 with justification), Impact Score (1-5 with justification), Inherent Risk Score, Recommended ISO 27002:2022 Controls (with clause references), and Residual Risk after controls. Generate sector-specific, plausible scenarios."
        placeholder="e.g. Generate 3 ransomware attack scenarios for a hospital — covering entry via phishing, RDP exploit, and supply chain compromise"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', placeholder: 'e.g. NHS hospital, 3,000 staff, on-premise + cloud', type: 'text' },
          { id: 'assets', label: 'Critical Assets', placeholder: 'e.g. Patient records, medical devices, PACS system', type: 'text' },
          { id: 'scenario', label: 'Threat Scenario Type', type: 'select', options: ['Ransomware Attack', 'Insider Threat', 'Supply Chain Compromise', 'Cloud Misconfiguration', 'Phishing & Credential Theft', 'Zero-Day Exploit', 'Physical Security Breach', 'DDoS Attack', 'Custom — describe below'] },
          { id: 'count', label: 'Number of Scenarios', type: 'select', options: ['1 scenario (detailed)', '3 scenarios', '5 scenarios', '10 scenarios (summary)'] },
        ]}
      />
    </div>
  )
}
