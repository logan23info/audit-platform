import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2, Sparkles } from 'lucide-react'

const newControls = [
  {
    ref: 'A.5.7', title: 'Threat Intelligence', theme: 'Organizational',
    purpose: 'Collect and analyse information about information security threats to produce threat intelligence.',
    whyNew: 'Formalises proactive threat hunting — not just reactive. Recognises that organisations must actively gather and act on threat data.',
    auditPoints: [
      'Threat intelligence sources defined — commercial feeds, ISACs, government advisories',
      'Process for consuming and actioning threat intelligence documented',
      'Intelligence shared with relevant internal and external parties',
      'Threat intelligence integrated into risk assessment process',
      'Evidence of threat intelligence being used in security decisions',
    ],
    evidence: ['Threat intelligence subscription records', 'Threat intel process/procedure document', 'Examples of intelligence acted upon', 'Integration with SIEM or SOC processes'],
    color: 'border-l-blue-400'
  },
  {
    ref: 'A.5.23', title: 'Information Security for Use of Cloud Services', theme: 'Organizational',
    purpose: 'Manage information security risks associated with acquisition, use, management, and exit from cloud services.',
    whyNew: 'Cloud is now mainstream — previous standard had no specific cloud control. Covers full lifecycle from procurement to exit.',
    auditPoints: [
      'Cloud services inventory maintained — IaaS, PaaS, SaaS documented',
      'Cloud service selection criteria include IS requirements',
      'Shared responsibility model understood and documented per provider',
      'Data residency and sovereignty requirements met and documented',
      'Exit/migration plan exists for each critical cloud service',
      'Cloud service provider security assessments conducted periodically',
    ],
    evidence: ['Cloud services register', 'Shared responsibility matrices per provider', 'Cloud security assessment reports', 'Data residency documentation', 'Exit strategy documentation'],
    color: 'border-l-cyan-400'
  },
  {
    ref: 'A.5.30', title: 'ICT Readiness for Business Continuity', theme: 'Organizational',
    purpose: 'Ensure ICT readiness is planned, implemented, maintained, and tested based on business continuity objectives and ICT continuity requirements.',
    whyNew: 'Previously covered under general BCP — now explicit that ICT must have its own readiness plan with defined RTO/RPO and tested recovery procedures.',
    auditPoints: [
      'ICT continuity requirements derived from business impact analysis',
      'RTO (Recovery Time Objective) and RPO (Recovery Point Objective) defined per system',
      'ICT continuity plan documented and approved',
      'ICT recovery procedures tested at planned intervals',
      'Test results reviewed and lessons learned incorporated',
      'ICT continuity plan kept current with system changes',
    ],
    evidence: ['Business Impact Analysis (BIA)', 'ICT continuity plan', 'RTO/RPO register per critical system', 'ICT recovery test results and reports', 'Test schedule and completion records'],
    color: 'border-l-orange-400'
  },
  {
    ref: 'A.7.4', title: 'Physical Security Monitoring', theme: 'Physical',
    purpose: 'Continuously monitor premises for unauthorised physical access.',
    whyNew: 'Physical security monitoring was implied under entry controls — now explicit. Covers CCTV, alarms, guard patrols, and monitoring of monitoring systems.',
    auditPoints: [
      'Physical security monitoring systems in place (CCTV, alarms, access logs)',
      'Monitoring coverage documented — what is monitored and what is not',
      'Monitoring systems themselves protected from tampering',
      'Retention period for physical access logs and CCTV footage defined',
      'Alerts from monitoring systems reviewed and acted upon',
      'Monitoring effective for remote/cloud-only organisations (visitor logs, shared facility agreements)',
    ],
    evidence: ['Physical security monitoring policy', 'CCTV/alarm system records', 'Physical access logs', 'Monitoring review records', 'Shared facility security agreements'],
    color: 'border-l-red-400'
  },
  {
    ref: 'A.8.9', title: 'Configuration Management', theme: 'Technological',
    purpose: 'Establish, document, implement, monitor, and review configurations for hardware, software, services, and networks.',
    whyNew: 'Configuration management was embedded across multiple controls — now a standalone control recognising its critical role in security posture.',
    auditPoints: [
      'Configuration baseline (golden image) defined for all system types',
      'Configuration management process documented — approval, implementation, verification',
      'Deviations from baseline identified and remediated or risk-accepted',
      'Configuration changes tracked through change management process',
      'Configuration audits conducted at planned intervals',
      'Hardening standards applied and verified (CIS benchmarks or equivalent)',
    ],
    evidence: ['Configuration baseline documents', 'Hardening standards and checklists', 'Configuration audit reports', 'Change management records for config changes', 'Deviation register'],
    color: 'border-l-purple-400'
  },
  {
    ref: 'A.8.10', title: 'Information Deletion', theme: 'Technological',
    purpose: 'Ensure information stored in IT systems and devices is deleted when no longer required.',
    whyNew: 'Data retention and deletion was previously under media disposal — now a standalone control covering all forms of deletion including cloud and end-of-life data.',
    auditPoints: [
      'Data retention schedule exists defining retention periods per data category',
      'Deletion process documented and applied consistently',
      'Deletion includes cloud storage, backups, and archived data',
      'Secure deletion methods used for sensitive data (cryptographic erase, overwrite)',
      'Deletion records maintained as evidence',
      'GDPR/data subject erasure requests handled within deletion process',
    ],
    evidence: ['Data retention and disposal policy', 'Deletion records/certificates', 'Evidence of secure deletion methods', 'Data erasure request handling process', 'Cloud data deletion procedures'],
    color: 'border-l-emerald-400'
  },
  {
    ref: 'A.8.11', title: 'Data Masking', theme: 'Technological',
    purpose: 'Mask data in accordance with the organisation\'s policies and local regulations to protect sensitive information.',
    whyNew: 'Privacy by design principle formalised — data masking in non-production environments and analytics is now explicitly required.',
    auditPoints: [
      'Data masking policy defines which data types require masking',
      'Masking applied in non-production environments (dev, test, UAT)',
      'Masking techniques appropriate to data sensitivity (tokenisation, pseudonymisation)',
      'Access to unmasked data restricted and logged',
      'Masking effectiveness validated — original data not reconstructible from masked version',
      'GDPR/PII data masking requirements met',
    ],
    evidence: ['Data masking policy', 'Non-production environment data handling procedures', 'Evidence of masking in dev/test environments', 'Access controls for unmasked data', 'Masking tool configuration'],
    color: 'border-l-pink-400'
  },
  {
    ref: 'A.8.12', title: 'Data Leakage Prevention (DLP)', theme: 'Technological',
    purpose: 'Detect and prevent the unauthorised disclosure and extraction of information by individuals or systems.',
    whyNew: 'DLP was previously implied under access controls — now explicit. Recognises that insider threat and accidental disclosure are major vectors.',
    auditPoints: [
      'DLP policy defines data types to be protected and channels monitored',
      'DLP controls implemented across key channels — email, web, USB, cloud upload',
      'DLP alerts reviewed and investigated within defined timeframe',
      'False positive rate managed — DLP not blocking legitimate business activity',
      'DLP incidents reported and tracked',
      'DLP coverage map shows all channels where sensitive data could exit',
    ],
    evidence: ['DLP policy and coverage map', 'DLP tool configuration and rules', 'DLP alert review records', 'DLP incident log', 'False positive analysis'],
    color: 'border-l-red-400'
  },
  {
    ref: 'A.8.16', title: 'Monitoring Activities', theme: 'Technological',
    purpose: 'Monitor networks, systems, and applications to detect anomalous behaviour and potential IS incidents.',
    whyNew: 'Monitoring was implied under logging (now A.8.15) — this new control makes continuous monitoring and anomaly detection an explicit requirement.',
    auditPoints: [
      'Monitoring scope defined — which systems, networks, and applications are monitored',
      'Monitoring continuous or at frequent defined intervals',
      'Anomaly detection rules defined and tuned',
      'SIEM or equivalent correlation tool in place',
      'Monitoring alerts reviewed by qualified personnel within defined SLA',
      'Monitoring effectiveness reviewed periodically',
    ],
    evidence: ['Monitoring policy and scope document', 'SIEM/monitoring tool configuration', 'Alert review records', 'Monitoring SLA and KPIs', 'Monitoring effectiveness review'],
    color: 'border-l-amber-400'
  },
  {
    ref: 'A.8.23', title: 'Web Filtering', theme: 'Technological',
    purpose: 'Manage access to external websites to reduce exposure to malicious content.',
    whyNew: 'Web filtering was previously embedded under network controls — now explicit, recognising that web-based threats (phishing, drive-by downloads) are the primary attack vector.',
    auditPoints: [
      'Web filtering policy defines permitted and blocked categories',
      'Web filtering applied to all internet-connected users including remote workers',
      'HTTPS inspection in place or compensating controls documented',
      'Web filtering exceptions process requires approval and time-limiting',
      'Filtering logs reviewed for policy violations',
      'Users informed of web filtering and acceptable use policy',
    ],
    evidence: ['Web filtering policy', 'Web proxy/filter configuration', 'Blocked category list', 'Exception approval records', 'Acceptable use policy'],
    color: 'border-l-blue-400'
  },
  {
    ref: 'A.8.28', title: 'Secure Coding', theme: 'Technological',
    purpose: 'Apply secure coding principles to software development to reduce the number of information security vulnerabilities in software.',
    whyNew: 'Secure development (now A.8.25) covered the lifecycle — this control makes secure coding practices explicitly required, including training and tooling.',
    auditPoints: [
      'Secure coding standards defined and documented (OWASP, SANS)',
      'Developers trained in secure coding practices',
      'SAST (Static Application Security Testing) integrated into CI/CD pipeline',
      'DAST (Dynamic Application Security Testing) conducted before release',
      'Code review process includes security review',
      'Known vulnerable libraries/dependencies managed (SCA scanning)',
      'Security defects tracked and prioritised alongside functional defects',
    ],
    evidence: ['Secure coding standard/policy', 'Developer security training records', 'SAST/DAST scan results', 'Code review checklists with security', 'Dependency scanning reports'],
    color: 'border-l-emerald-400'
  },
]

export default function NetNew() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27002:2022"
        clause="Net-New 11 Controls"
        title="11 New Controls — ISO 27002:2022"
        description="ISO 27002:2022 introduced 11 brand-new controls not present in the 2013 version. These reflect modern threats — cloud, supply chain, physical monitoring, data leakage, and secure coding. All 11 must be assessed in your SoA (Cl. 6.1.3) with applicability justified."
        badges={['ISO 27002:2022', 'New in 2022', '11 Controls']}
      />

      <div className="card mb-6 bg-amber-900/10 border-amber-800/50">
        <div className="flex items-start gap-3">
          <Sparkles size={16} className="text-amber-audit flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-white mb-1">Upgrading from ISO 27001:2013 → 2022?</div>
            <p className="text-xs text-steel-300 leading-relaxed">These 11 controls are the primary gap to address. Conduct a gap assessment against each, update your Statement of Applicability, and implement or justify exclusion. The SoA Builder (<span className="text-amber-audit">ISO 27001 → Clause 6 → SoA Builder</span>) covers all 93 controls including these 11.</p>
          </div>
        </div>
      </div>

      <div className="space-y-5 mb-6">
        {newControls.map((c, idx) => (
          <div key={c.ref} className={`card border-l-4 ${c.color}`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 text-center">
                <span className="clause-tag block mb-1">{c.ref}</span>
                <span className={`badge text-xs ${c.theme === 'Organizational' ? 'bg-blue-900/40 text-blue-300' : c.theme === 'People' ? 'bg-purple-900/40 text-purple-300' : c.theme === 'Physical' ? 'bg-amber-900/40 text-amber-300' : 'bg-emerald-900/40 text-emerald-300'}`}>{c.theme}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1 text-base">{c.title}</h3>
                <p className="text-sm text-steel-300 mb-2 leading-relaxed"><span className="text-steel-400 font-medium">Purpose: </span>{c.purpose}</p>
                <div className="bg-navy-800/60 border border-navy-600 rounded-lg p-3 mb-3">
                  <div className="text-xs font-semibold text-amber-audit mb-1">Why is this new?</div>
                  <p className="text-xs text-steel-300 leading-relaxed">{c.whyNew}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold text-emerald-400 mb-2">Audit Testing Points</div>
                    <div className="space-y-1">
                      {c.auditPoints.map(p => (
                        <div key={p} className="flex items-start gap-2">
                          <CheckCircle2 size={11} className="text-emerald-audit flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-steel-300 leading-snug">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-blue-400 mb-2">Evidence to Request</div>
                    <div className="space-y-1">
                      {c.evidence.map(e => (
                        <div key={e} className="flex items-start gap-2">
                          <span className="text-blue-400 font-mono text-xs flex-shrink-0">→</span>
                          <span className="text-xs text-steel-300 leading-snug">{e}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AIPanel
        title="Generate Net-New Control Artifacts"
        systemPrompt="You are an ISO 27002:2022 specialist focusing on the 11 new controls introduced in the 2022 revision. Generate detailed audit workpapers, gap assessments, implementation guidance, and SoA justifications for the new controls. Be specific about what evidence is required and how to test each control. Reference the specific control number and title."
        placeholder="e.g. Generate a gap assessment workpaper for A.8.12 Data Leakage Prevention for a financial services organisation"
        contextFields={[
          { id: 'control', label: 'Control', type: 'select', options: newControls.map(c => `${c.ref} — ${c.title}`) },
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. UK bank, 2000 staff, hybrid cloud' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Gap Assessment Workpaper', 'TOD Workpaper', 'TOI Walkthrough Script', 'TOE Sampling Plan', 'SoA Applicability Justification', 'Implementation Guidance', 'Management Briefing'] },
        ]}
      />
    </div>
  )
}
