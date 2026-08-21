import { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'

const strideCategories = [
  { id: 'S', label: 'Spoofing', color: 'border-l-red-400', desc: 'Attacker impersonates a user, system, or service', example: 'Phishing email spoofing CEO identity to authorise wire transfer' },
  { id: 'T', label: 'Tampering', color: 'border-l-orange-400', desc: 'Attacker modifies data or code without authorisation', example: 'SQL injection modifying financial transaction records' },
  { id: 'R', label: 'Repudiation', color: 'border-l-amber-400', desc: 'Attacker denies performing an action — no audit trail', example: 'Admin deletes audit logs covering unauthorised access' },
  { id: 'I', label: 'Information Disclosure', color: 'border-l-blue-400', desc: 'Sensitive data exposed to unauthorised parties', example: 'Misconfigured S3 bucket exposes customer PII publicly' },
  { id: 'D', label: 'Denial of Service', color: 'border-l-purple-400', desc: 'Attacker disrupts availability of a service', example: 'DDoS attack takes down payment processing API' },
  { id: 'E', label: 'Elevation of Privilege', color: 'border-l-pink-400', desc: 'Attacker gains higher permissions than authorised', example: 'Exploiting unpatched vulnerability to gain root access' },
]

const scenarios = [
  { id: 1, title: 'Ransomware Attack via Phishing', category: 'S + T + D', likelihood: 4, impact: 5, score: 20,
    asset: 'All IT systems and data', threat: 'Organised cybercriminal group', vulnerability: 'Unpatched systems, insufficient email filtering, lack of MFA',
    attack: 'Phishing email → malicious attachment → code execution → lateral movement → encryption of files and backups',
    controls: ['A.8.7 — Anti-malware', 'A.6.3 — Awareness training', 'A.8.8 — Patch management', 'A.8.13 — Backup', 'A.8.23 — Web filtering'],
    indicators: ['Unusual file encryption activity', 'Spike in CPU usage', 'Ransom note files appearing', 'Backup failures'] },
  { id: 2, title: 'Insider Data Theft', category: 'I + R', likelihood: 3, impact: 4, score: 12,
    asset: 'Customer PII, IP, financial data', threat: 'Malicious or negligent employee', vulnerability: 'Excessive access rights, no DLP, poor offboarding process',
    attack: 'Privileged user accesses data beyond job need → copies to USB or personal email → leaves organisation with data',
    controls: ['A.5.3 — Segregation of duties', 'A.8.2 — Privileged access rights', 'A.8.12 — DLP', 'A.6.5 — Termination controls', 'A.8.15 — Logging'],
    indicators: ['Large data downloads outside business hours', 'USB device connections', 'Personal email usage for business data', 'Access to unusual systems before resignation'] },
  { id: 3, title: 'Cloud Misconfiguration — Data Exposure', category: 'I', likelihood: 3, impact: 5, score: 15,
    asset: 'Cloud-hosted databases, storage buckets', threat: 'External attacker or automated scanner', vulnerability: 'Misconfigured IAM policies, public storage buckets, exposed APIs',
    attack: 'Automated scanner finds publicly accessible S3 bucket or open port → data downloaded → sold or published',
    controls: ['A.8.9 — Configuration management', 'A.5.15 — Access control', 'A.8.20 — Network security', 'A.8.3 — Information access restriction'],
    indicators: ['Unexpected public access to storage', 'Unusual API calls from unknown IPs', 'Security scanner alerts', 'Cloud provider anomaly detection alerts'] },
  { id: 4, title: 'Supply Chain Compromise', category: 'T + I', likelihood: 2, impact: 5, score: 10,
    asset: 'All systems using the compromised supplier', threat: 'Nation-state or sophisticated attacker', vulnerability: 'Insufficient supplier security assessment, lack of software integrity verification',
    attack: 'Attacker compromises software supplier → malicious code inserted into software update → distributed to all customers',
    controls: ['A.5.19 — Supplier IS policy', 'A.5.21 — ICT supply chain', 'A.8.25 — Secure SDLC', 'A.8.29 — Security testing'],
    indicators: ['Unexpected software behaviour after update', 'Unusual outbound connections', 'Supplier security incident notification', 'Integrity check failures'] },
  { id: 5, title: 'Credential Stuffing / Account Takeover', category: 'S + E', likelihood: 4, impact: 4, score: 16,
    asset: 'User accounts, customer portal', threat: 'Automated bots using leaked credential databases', vulnerability: 'No MFA, password reuse, no rate limiting on login',
    attack: 'Attacker purchases leaked credential list → automated testing against login portal → successful logins used for fraud or data access',
    controls: ['A.8.5 — Secure authentication / MFA', 'A.5.17 — Authentication information', 'A.5.16 — Identity management', 'A.8.16 — Monitoring'],
    indicators: ['High volume of failed login attempts', 'Logins from unusual geographies', 'Multiple accounts accessed from same IP', 'Anomalous account activity after login'] },
  { id: 6, title: 'Unpatched Vulnerability Exploitation', category: 'T + E', likelihood: 3, impact: 4, score: 12,
    asset: 'Web applications, servers, endpoints', threat: 'External attacker or automated exploit kit', vulnerability: 'Delayed patching cycle, no vulnerability scanning, exposed internet-facing systems',
    attack: 'CVE published → attacker scans for vulnerable systems → exploit deployed → remote code execution → lateral movement',
    controls: ['A.8.8 — Vulnerability management', 'A.8.9 — Configuration management', 'A.8.19 — Software installation controls', 'A.8.20 — Network security'],
    indicators: ['Exploit attempts in WAF/IDS logs', 'Unexpected processes running', 'Outbound connections to C2 servers', 'Vulnerability scanner findings not remediated'] },
]

function ScenarioCard({ s }) {
  const [expanded, setExpanded] = useState(false)
  const scoreColor = s.score >= 15 ? 'text-red-400' : s.score >= 9 ? 'text-amber-audit' : 'text-emerald-400'
  return (
    <div className="card p-0 overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-start justify-between p-4 text-left hover:bg-navy-800/30 transition-colors">
        <div className="flex items-center gap-3 flex-wrap flex-1 min-w-0">
          <span className="text-xs font-mono text-steel-400 flex-shrink-0">S{String(s.id).padStart(2,'0')}</span>
          <span className="badge bg-blue-900/40 text-blue-300 text-xs flex-shrink-0">{s.category}</span>
          <span className="text-sm font-semibold text-white">{s.title}</span>
          <span className={`text-xs font-bold ${scoreColor}`}>Score: {s.score}</span>
        </div>
        {expanded ? <ChevronUp size={14} className="text-steel-400 flex-shrink-0" /> : <ChevronDown size={14} className="text-steel-400 flex-shrink-0" />}
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-navy-700 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {[{ label: 'Asset', value: s.asset }, { label: 'Threat Actor', value: s.threat }, { label: 'Vulnerability', value: s.vulnerability }].map(f => (
              <div key={f.label} className="bg-navy-800 rounded-lg p-3">
                <div className="text-xs font-semibold text-steel-400 mb-1">{f.label}</div>
                <div className="text-xs text-steel-200 leading-relaxed">{f.value}</div>
              </div>
            ))}
          </div>
          <div className="bg-navy-800 rounded-lg p-3">
            <div className="text-xs font-semibold text-amber-audit mb-1">Attack Path</div>
            <div className="text-xs text-steel-300 leading-relaxed">{s.attack}</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-semibold text-emerald-400 mb-2">Applicable Controls</div>
              {s.controls.map(c => <div key={c} className="flex items-start gap-1.5 mb-1"><CheckCircle2 size={11} className="text-emerald-audit flex-shrink-0 mt-0.5" /><span className="text-xs text-steel-300">{c}</span></div>)}
            </div>
            <div>
              <div className="text-xs font-semibold text-blue-400 mb-2">Indicators of Compromise</div>
              {s.indicators.map(i => <div key={i} className="flex items-start gap-1.5 mb-1"><span className="text-blue-400 text-xs flex-shrink-0">→</span><span className="text-xs text-steel-300">{i}</span></div>)}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[{ label: 'Likelihood', value: s.likelihood, color: 'text-orange-400' }, { label: 'Impact', value: s.impact, color: 'text-red-400' }, { label: 'Risk Score', value: s.score, color: scoreColor }].map(m => (
              <div key={m.label} className="bg-navy-800 rounded-lg p-2">
                <div className={`font-display text-xl font-bold ${m.color}`}>{m.value}</div>
                <div className="text-xs text-steel-400">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Scenarios() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 27005:2022" clause="Threat Scenarios" title="Threat Scenario Generator"
        description="Pre-built threat scenarios using STRIDE methodology — each with asset, threat actor, vulnerability, attack path, applicable ISO 27002 controls, and indicators of compromise. Use as a starting point for your risk assessment."
        badges={['ISO 27005', 'STRIDE', 'Threat Modelling']} />

      <div className="card mb-6">
        <h2 className="section-title mb-3">STRIDE Threat Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {strideCategories.map(s => (
            <div key={s.id} className={`card-sm border-l-4 ${s.color}`}>
              <div className="text-lg font-bold text-white mb-1">{s.id}</div>
              <div className="text-xs font-semibold text-steel-200 mb-1">{s.label}</div>
              <div className="text-xs text-steel-400 leading-snug">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="section-title mb-0">Pre-Built Threat Scenarios</h2>
        <span className="text-xs text-steel-400">{scenarios.length} scenarios — click to expand</span>
      </div>
      <div className="space-y-3 mb-6">
        {scenarios.map(s => <ScenarioCard key={s.id} s={s} />)}
      </div>

      <AIPanel title="Generate Custom Threat Scenarios"
        systemPrompt="You are an ISO 27005:2022 threat modelling specialist using STRIDE methodology. Generate detailed threat scenarios including: asset, threat actor profile, vulnerability, full attack path, applicable ISO 27002:2022 controls, likelihood and impact scores (1-5), and indicators of compromise. Make scenarios specific to the organisation's technology stack and sector."
        placeholder="e.g. Generate 3 threat scenarios for a healthcare organisation using Epic EHR on Azure"
        contextFields={[
          { id: 'org', label: 'Organisation & Tech Stack', type: 'text', placeholder: 'e.g. NHS Trust, Azure, Epic EHR, 3000 staff' },
          { id: 'stride', label: 'STRIDE Category', type: 'select', options: ['All categories', 'S — Spoofing', 'T — Tampering', 'R — Repudiation', 'I — Information Disclosure', 'D — Denial of Service', 'E — Elevation of Privilege'] },
          { id: 'count', label: 'Number of Scenarios', type: 'select', options: ['3 scenarios', '5 scenarios', '10 scenarios', '15 scenarios'] },
        ]} />
    </div>
  )
}
