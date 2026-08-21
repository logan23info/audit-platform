import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const controlGroups = [
  {
    group: 'Endpoint & Access (A.8.1–A.8.5)', color: 'border-l-blue-500',
    controls: [
      { ref: 'A.8.1', title: 'User Endpoint Devices', audit: ['Endpoint hardening standard applied (CIS benchmarks)', 'MDM/EDR deployed on all endpoints', 'Auto-lock after inactivity configured', 'Encryption enabled (BitLocker/FileVault)', 'Patch status monitored and enforced'] },
      { ref: 'A.8.2', title: 'Privileged Access Rights', audit: ['Privileged accounts inventoried and minimised', 'Admin accounts separate from standard accounts', 'Just-in-time (JIT) access for privileged operations', 'Privileged access sessions logged and reviewed', 'PAM tool controls privileged credentials'] },
      { ref: 'A.8.3', title: 'Information Access Restriction', audit: ['Access based on need-to-know and job role', 'Application-level access controls enforced', 'Database access restricted — no direct production DB access', 'API access controlled with authentication'] },
      { ref: 'A.8.4', title: 'Access to Source Code', audit: ['Source code access restricted to authorised developers', 'Version control system with access controls', 'Production code changes require peer review', 'No direct production code editing'] },
      { ref: 'A.8.5', title: 'Secure Authentication', audit: ['MFA enforced for all remote access', 'MFA for privileged accounts and sensitive systems', 'Password policy enforced (min 12 chars, complexity)', 'Passwordless or FIDO2 considered for high-risk accounts', 'Failed login attempts monitored and alerted'] },
    ]
  },
  {
    group: 'Infrastructure & Malware (A.8.6–A.8.9)', color: 'border-l-emerald-500',
    controls: [
      { ref: 'A.8.6', title: 'Capacity Management', audit: ['Capacity thresholds monitored (CPU, memory, storage, bandwidth)', 'Alerts configured for capacity warnings', 'Capacity planning process considers growth projections', 'Cloud auto-scaling configured appropriately'] },
      { ref: 'A.8.7', title: 'Protection Against Malware', audit: ['Anti-malware deployed on all endpoints and servers', 'Signatures updated automatically (daily minimum)', 'Email gateway filters malicious attachments and URLs', 'EDR deployed with behavioural detection', 'Malware alerts reviewed and responded to within SLA'] },
      { ref: 'A.8.8', title: 'Technical Vulnerability Management', audit: ['Vulnerability scanning conducted (min monthly, critical systems weekly)', 'Critical CVEs patched within 72 hours, High within 30 days', 'Patch management schedule documented and followed', 'Exception process for unable-to-patch systems', 'Penetration test conducted annually'] },
      { ref: 'A.8.9', title: 'Configuration Management ⭐ New', audit: ['Configuration baseline (golden image) defined per system type', 'Deviations from baseline detected and remediated', 'CIS benchmarks or equivalent hardening applied', 'Configuration changes tracked through change management', 'Configuration audits conducted at planned intervals'] },
    ]
  },
  {
    group: 'Data Protection (A.8.10–A.8.12)', color: 'border-l-purple-500',
    controls: [
      { ref: 'A.8.10', title: 'Information Deletion ⭐ New', audit: ['Data retention schedule defines retention periods per data type', 'Deletion process applied to cloud, backups, and archives', 'Secure deletion methods applied (cryptographic erase for cloud)', 'GDPR right to erasure requests handled within deletion process', 'Deletion certificates obtained for sensitive data'] },
      { ref: 'A.8.11', title: 'Data Masking ⭐ New', audit: ['Masking policy defines which data types require masking', 'Masking applied in all non-production environments', 'Tokenisation or pseudonymisation used for PII', 'Access to unmasked data restricted and logged', 'Masking effectiveness validated'] },
      { ref: 'A.8.12', title: 'Data Leakage Prevention ⭐ New', audit: ['DLP policy defines channels monitored (email, web, USB, cloud)', 'DLP tools deployed across key exfiltration channels', 'DLP alerts reviewed within defined SLA', 'False positive rate managed and tuned', 'DLP incident log maintained and reviewed'] },
    ]
  },
  {
    group: 'Backup, Logging & Monitoring (A.8.13–A.8.16)', color: 'border-l-amber-500',
    controls: [
      { ref: 'A.8.13', title: 'Information Backup', audit: ['Backup schedule documented — frequency matches RPO', 'Backups stored offline or in separate location/account', 'Backup restoration tested at planned intervals (min annually)', 'Backup encryption applied', 'Backup alerts reviewed — failures investigated'] },
      { ref: 'A.8.15', title: 'Logging', audit: ['Logging policy defines what must be logged', 'Security-relevant events logged: login, privilege use, config change', 'Log integrity protected — logs cannot be deleted by users', 'Log retention meets compliance requirements (min 12 months)', 'Log review process defined and evidenced'] },
      { ref: 'A.8.16', title: 'Monitoring Activities ⭐ New', audit: ['Monitoring scope documents what is monitored', 'SIEM or equivalent correlation tool deployed', 'Anomaly detection rules defined and tuned', 'Alerts reviewed by qualified personnel within defined SLA', 'Monitoring effectiveness reviewed periodically'] },
    ]
  },
  {
    group: 'Network & Cryptography (A.8.20–A.8.24)', color: 'border-l-red-500',
    controls: [
      { ref: 'A.8.20', title: 'Networks Security', audit: ['Network security controls documented', 'Firewall rules reviewed periodically — no "any/any" rules', 'Network traffic monitored for anomalies', 'Wireless networks separated from corporate network'] },
      { ref: 'A.8.22', title: 'Segregation of Networks', audit: ['Network segmentation implemented (production/dev/DMZ)', 'Inter-segment traffic controlled and logged', 'Crown jewels (sensitive data) in isolated segments', 'VLANs and firewall rules enforcing segmentation'] },
      { ref: 'A.8.23', title: 'Web Filtering ⭐ New', audit: ['Web filtering policy defines blocked categories', 'Filtering applied to all users including remote workers', 'HTTPS inspection in place or compensating control', 'Exception process requires approval and time-limiting', 'Filtering logs reviewed for violations'] },
      { ref: 'A.8.24', title: 'Use of Cryptography', audit: ['Cryptography policy defines approved algorithms (AES-256, RSA-2048+)', 'TLS 1.2+ enforced — no SSL/TLS 1.0/1.1', 'Certificates managed — no expired certificates in production', 'Key management process documented', 'Data at rest encrypted for sensitive data'] },
    ]
  },
  {
    group: 'Secure Development (A.8.25–A.8.28)', color: 'border-l-pink-500',
    controls: [
      { ref: 'A.8.25', title: 'Secure Development Lifecycle', audit: ['Security requirements defined at project initiation', 'Threat modelling conducted for new systems', 'Security testing at each development stage', 'Security sign-off required before production release'] },
      { ref: 'A.8.28', title: 'Secure Coding ⭐ New', audit: ['Secure coding standards documented (OWASP Top 10)', 'Developers trained in secure coding (annual)', 'SAST scanning integrated into CI/CD pipeline', 'DAST conducted before release', 'Dependency/SCA scanning for known vulnerabilities'] },
    ]
  },
]

export default function Technological() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 27002:2022" clause="A.8.1–A.8.34" title="Technological Controls (Theme 8)"
        description="34 technological controls — the most tested theme in IS audits. Covers endpoints, access management, infrastructure hardening, data protection, backup, monitoring, network security, cryptography, and secure development. Controls marked ⭐ are new in ISO 27002:2022."
        badges={['Theme 8', '34 Controls', 'Technological']} />
      <div className="space-y-5 mb-6">
        {controlGroups.map(grp => (
          <div key={grp.group} className={`card border-l-4 ${grp.color}`}>
            <h3 className="font-semibold text-white mb-4">{grp.group}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {grp.controls.map(c => (
                <div key={c.ref} className="bg-navy-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-amber-audit font-bold text-xs">{c.ref}</span>
                    <span className="text-xs font-semibold text-white">{c.title}</span>
                  </div>
                  {c.audit.map(a => (
                    <div key={a} className="flex items-start gap-1.5 mb-1">
                      <CheckCircle2 size={11} className="text-emerald-audit flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-steel-300 leading-snug">{a}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <AIPanel title="Generate Technological Controls Artifacts"
        systemPrompt="You are an ISO 27002:2022 Technological controls specialist (Theme 8, A.8.1–A.8.34). Generate detailed audit workpapers, technical test scripts, sampling plans, and configuration review checklists. Include specific technical evidence requirements, tool outputs to request, and technical audit commands where relevant."
        placeholder="e.g. Generate a TOE workpaper for A.8.8 Vulnerability Management — sample 25 critical/high CVEs from the last 90 days"
        contextFields={[
          { id: 'control', label: 'Control Reference', type: 'text', placeholder: 'e.g. A.8.8 — Vulnerability Management' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['TOD Workpaper', 'TOI Walkthrough Script', 'TOE Sampling Plan', 'Technical Configuration Review', 'Penetration Test Scope', 'SIEM Query Examples', 'Evidence Checklist'] },
          { id: 'stack', label: 'Technology Stack', type: 'text', placeholder: 'e.g. AWS, Qualys, CrowdStrike, Okta, GitHub, Kubernetes' },
        ]} />
    </div>
  )
}
