import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const controls = [
  { ref: 'A.6.1', title: 'Screening', color: 'border-l-blue-500',
    desc: 'Background verification checks on candidates and contractors commensurate with business requirements and applicable laws.',
    audit: ['Background check policy defines scope (criminal, credit, employment, education)', 'Checks conducted before access granted — not after', 'Checks appropriate to role sensitivity and data access', 'Re-checks conducted for privileged role changes', 'Third-party contractors screened via supplier process', 'Screening records retained per legal requirements'],
    evidence: ['Screening policy', 'Completed screening records (redacted)', 'Role-based screening matrix', 'Contractor screening process'] },
  { ref: 'A.6.2', title: 'Terms & Conditions of Employment', color: 'border-l-emerald-500',
    desc: 'Employment contracts include IS responsibilities — acceptable use, confidentiality, and consequences of non-compliance.',
    audit: ['IS responsibilities included in employment contracts', 'Confidentiality/NDA signed at onboarding', 'Acceptable use policy acknowledged', 'Consequences of non-compliance clearly stated', 'Contract updated when IS responsibilities change'],
    evidence: ['Employment contract template', 'NDA/confidentiality agreement', 'Signed acknowledgement records'] },
  { ref: 'A.6.3', title: 'IS Awareness, Education & Training', color: 'border-l-amber-500',
    desc: 'All staff receive appropriate IS awareness training — at onboarding and refreshed at planned intervals.',
    audit: ['IS awareness training completed at onboarding — records maintained', 'Annual refresh training completed — completion rate tracked', 'Phishing simulation conducted at planned intervals', 'Role-based training delivered (developers, finance, HR, IT admin)', 'Training effectiveness evaluated (test scores, simulation results)', 'Training records retained for all employees including contractors'],
    evidence: ['Training completion records', 'Phishing simulation results', 'Training content and curriculum', 'Completion rate metrics'] },
  { ref: 'A.6.4', title: 'Disciplinary Process', color: 'border-l-red-500',
    desc: 'Formal disciplinary process for IS policy violations — consistent, fair, and communicated to all staff.',
    audit: ['Disciplinary process documented and communicated to all staff', 'IS violations subject to formal disciplinary process', 'Graduated sanctions policy (verbal → written → termination)', 'Process applied consistently regardless of seniority', 'IS violations tracked and patterns identified'],
    evidence: ['Disciplinary policy', 'Communication to staff of IS violations process', 'HR records showing process applied (anonymised)'] },
  { ref: 'A.6.5', title: 'Responsibilities After Termination', color: 'border-l-purple-500',
    desc: 'IS responsibilities that continue after termination — return of assets, ongoing confidentiality obligations.',
    audit: ['Exit checklist includes: access removal, asset return, key handover', 'Access removed on day of departure — not delayed', 'Confidentiality obligations communicated and enforced post-exit', 'Leaver briefing covers ongoing IS responsibilities', 'High-risk leavers: immediate access removal and enhanced monitoring'],
    evidence: ['Offboarding checklist', 'Access removal records with timestamps', 'Exit interview records', 'Leaver NDA or ongoing confidentiality notice'] },
  { ref: 'A.6.6', title: 'Confidentiality / NDA Agreements', color: 'border-l-cyan-500',
    desc: 'Confidentiality agreements with employees, contractors, and third parties who have access to information assets.',
    audit: ['NDA/confidentiality agreement signed by all staff at onboarding', 'Contractor and supplier NDAs in place before access granted', 'NDAs reviewed and updated when scope of access changes', 'NDAs legally valid and enforceable in relevant jurisdictions', 'NDA records retained for legal period post-termination'],
    evidence: ['NDA template', 'Signed NDA records', 'Contractor NDA process', 'Legal review of NDA terms'] },
  { ref: 'A.6.7', title: 'Remote Working', color: 'border-l-orange-500',
    desc: 'Controls protecting information accessed, processed, or stored outside the organisation\'s premises.',
    audit: ['Remote working policy documents IS requirements', 'Physical security of remote working location addressed', 'VPN or equivalent secure access required for corporate systems', 'Clear desk/screen policy applied at home working locations', 'Corporate device policy covers home and public location use', 'BYOD controls defined if personal devices permitted'],
    evidence: ['Remote working policy', 'VPN usage logs/enforcement evidence', 'Corporate device policy', 'BYOD policy (if applicable)'] },
  { ref: 'A.6.8', title: 'IS Event Reporting', color: 'border-l-pink-500',
    desc: 'All staff know how to report IS events — clear, accessible, and incentivised reporting channels.',
    audit: ['IS event reporting procedure communicated to all staff', 'Reporting channel easily accessible (hotline, email, portal)', 'Staff aware of what to report — security incidents, weaknesses, near-misses', 'No-blame culture promoted — reporters not penalised', 'Reports acknowledged and followed up within defined timeframe'],
    evidence: ['IS event reporting procedure', 'Communication to staff of reporting channels', 'Incident log showing reports received', 'Staff survey results on reporting culture'] },
]

export default function People() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 27002:2022" clause="A.6.1–A.6.8" title="People Controls (Theme 6)"
        description="8 people controls covering the full employee lifecycle — pre-employment screening through to termination, plus remote working and incident reporting. Critical for HR and IS joint audits."
        badges={['Theme 6', '8 Controls', 'People']} />
      <div className="space-y-4 mb-6">
        {controls.map(c => (
          <div key={c.ref} className={`card border-l-4 ${c.color}`}>
            <div className="flex flex-col sm:flex-row gap-3">
              <span className="clause-tag flex-shrink-0 self-start">{c.ref}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1">{c.title}</h3>
                <p className="text-sm text-steel-300 mb-3 leading-relaxed">{c.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold text-emerald-400 mb-2">Audit Testing Points</div>
                    {c.audit.map(a => (
                      <div key={a} className="flex items-start gap-1.5 mb-1">
                        <CheckCircle2 size={11} className="text-emerald-audit flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-steel-300 leading-snug">{a}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-blue-400 mb-2">Evidence to Request</div>
                    {c.evidence.map(e => (
                      <div key={e} className="flex items-start gap-1.5 mb-1">
                        <span className="text-blue-400 text-xs flex-shrink-0">→</span>
                        <span className="text-xs text-steel-300 leading-snug">{e}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AIPanel title="Generate People Controls Artifacts"
        systemPrompt="You are an ISO 27002:2022 People controls specialist (Theme 6, A.6.1–A.6.8). Generate audit workpapers, HR-IS joint procedures, awareness training content, and offboarding checklists. Align to ISO 27002:2022 and relevant employment law considerations."
        placeholder="e.g. Generate a TOE workpaper for A.6.3 IS Awareness Training — sample 25 training completion records"
        contextFields={[
          { id: 'control', label: 'Control', type: 'select', options: ['A.6.1 — Screening', 'A.6.2 — Terms & Conditions', 'A.6.3 — IS Awareness Training', 'A.6.4 — Disciplinary Process', 'A.6.5 — Termination Responsibilities', 'A.6.6 — Confidentiality Agreements', 'A.6.7 — Remote Working', 'A.6.8 — IS Event Reporting'] },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['TOD Workpaper', 'TOI Walkthrough Script', 'TOE Sampling Plan', 'Awareness Training Programme', 'Offboarding Checklist', 'Remote Working Policy', 'Evidence Checklist'] },
          { id: 'org', label: 'Organisation', type: 'text', placeholder: 'e.g. 500 staff, hybrid working, GDPR applicable' },
        ]} />
    </div>
  )
}
