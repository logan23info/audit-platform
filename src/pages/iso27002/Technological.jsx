import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'

const netNew = [
  { ref: '8.9', title: 'Configuration management', nist: 'Protect', desc: 'Configurations of hardware, software, services and networks established, documented, monitored and reviewed.' },
  { ref: '8.10', title: 'Information deletion', nist: 'Protect', desc: 'Information stored in systems, devices or in other storage media deleted when no longer required.' },
  { ref: '8.11', title: 'Data masking', nist: 'Protect', desc: 'Data masking used in accordance with access control and other related IS policies, and business requirements.' },
  { ref: '8.12', title: 'Data leakage prevention', nist: 'Protect', desc: 'DLP measures applied to systems, networks and devices that process, store or transmit sensitive information.' },
  { ref: '8.16', title: 'Monitoring activities', nist: 'Detect', desc: 'Networks, systems and applications monitored for anomalous behaviour with appropriate actions taken.' },
  { ref: '8.23', title: 'Web filtering', nist: 'Protect', desc: 'Access to external websites managed to reduce exposure to malicious content.' },
  { ref: '8.28', title: 'Secure coding', nist: 'Protect', desc: 'Secure coding principles applied to software development to reduce IS vulnerabilities.' },
]

const keyControls = [
  { ref: '8.1', title: 'User endpoint devices', type: 'Preventive', cia: 'C-I-A', nist: 'Protect' },
  { ref: '8.2', title: 'Privileged access rights', type: 'Preventive', cia: 'C-I', nist: 'Protect' },
  { ref: '8.3', title: 'Information access restriction', type: 'Preventive', cia: 'C-I', nist: 'Protect' },
  { ref: '8.4', title: 'Access to source code', type: 'Preventive', cia: 'C-I', nist: 'Protect' },
  { ref: '8.5', title: 'Secure authentication', type: 'Preventive', cia: 'C-I', nist: 'Protect' },
  { ref: '8.6', title: 'Capacity management', type: 'Preventive', cia: 'A', nist: 'Protect' },
  { ref: '8.7', title: 'Protection against malware', type: 'Preventive', cia: 'C-I-A', nist: 'Protect' },
  { ref: '8.8', title: 'Management of technical vulnerabilities', type: 'Preventive', cia: 'C-I-A', nist: 'Protect' },
  { ref: '8.15', title: 'Logging', type: 'Detective', cia: 'C-I-A', nist: 'Detect' },
  { ref: '8.20', title: 'Networks security', type: 'Preventive', cia: 'C-I-A', nist: 'Protect' },
  { ref: '8.24', title: 'Use of cryptography', type: 'Preventive', cia: 'C-I', nist: 'Protect' },
  { ref: '8.32', title: 'Change management', type: 'Preventive', cia: 'C-I-A', nist: 'Protect' },
  { ref: '8.33', title: 'Test information', type: 'Preventive', cia: 'C', nist: 'Protect' },
  { ref: '8.34', title: 'Protection of IS during audit testing', type: 'Preventive', cia: 'C-I-A', nist: 'Protect' },
]

export default function Technological() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27002:2022"
        clause="Theme 4"
        title="Technological Controls (8.1–8.34)"
        description="34 technological controls covering endpoints, access, authentication, malware, vulnerability management, logging, encryption, change management, and secure coding. Includes 7 net-new controls."
        badges={['Technological', 'TOD', 'TOI', 'TOE']}
      />

      <div className="card mb-6 border-l-4 border-l-amber-audit">
        <h2 className="section-title mb-3">⭐ Net-New Controls — ISO 27002:2022 (7 of 11 in Tech Theme)</h2>
        <div className="space-y-3">
          {netNew.map(c => (
            <div key={c.ref} className="flex items-start gap-3 bg-navy-800 rounded-lg p-3">
              <span className="font-mono text-amber-audit font-bold text-sm flex-shrink-0 w-8">{c.ref}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white mb-0.5">{c.title}</div>
                <div className="text-xs text-steel-300 leading-snug">{c.desc}</div>
              </div>
              <span className="badge badge-steel flex-shrink-0">{c.nist}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="section-title mb-3">Key Existing Controls — Technological Theme</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-700">
                {['Ref', 'Control', 'Type', 'CIA', 'NIST'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-steel-400 font-medium uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {keyControls.map((c, i) => (
                <tr key={c.ref} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                  <td className="py-2 px-3 font-mono text-amber-audit font-semibold whitespace-nowrap">{c.ref}</td>
                  <td className="py-2 px-3 text-white">{c.title}</td>
                  <td className="py-2 px-3 text-steel-300 whitespace-nowrap">{c.type}</td>
                  <td className="py-2 px-3 text-blue-400 font-mono whitespace-nowrap">{c.cia}</td>
                  <td className="py-2 px-3 text-emerald-400 whitespace-nowrap">{c.nist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AIPanel
        title="Generate Technological Controls Workprogram"
        systemPrompt="You are an ISO 27002:2022 technological controls audit expert with deep knowledge of cloud infrastructure, IAM, vulnerability management, SIEM, and secure development. Generate detailed audit workprograms for Technological Controls (8.1–8.34). Pay special attention to the 7 net-new controls (8.9, 8.10, 8.11, 8.12, 8.16, 8.23, 8.28). Include configuration log parsing instructions, system demonstration steps, and TOE sampling with exception rate thresholds. Tag all outputs with ISO 27002:2022 5 attribute tags."
        placeholder="e.g. Generate a TOE workpaper for A.8.8 Vulnerability Management — patch compliance testing for 500 servers over 12 months"
        contextFields={[
          { id: 'control', label: 'Control Reference', placeholder: 'e.g. A.8.8 Vulnerability Mgmt, A.8.12 DLP, A.8.28 Secure Coding', type: 'text' },
          { id: 'tech', label: 'Technology Stack', placeholder: 'e.g. AWS, Azure AD, Qualys, GitHub, Splunk SIEM', type: 'text' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Full Workprogram (TOD+TOI+TOE)', 'Net-New Controls Audit Script', 'Config Log Parsing Guide', 'Vulnerability Mgmt Test Procedure', 'DLP Testing Script', 'Secure Coding Review Checklist', 'SIEM/Monitoring Audit Script', 'PBC Evidence Request List'] },
        ]}
      />
    </div>
  )
}
