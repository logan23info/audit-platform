import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const controlGroups = [
  {
    group: 'Policies & Governance (A.5.1–A.5.4)', color: 'border-l-blue-500',
    controls: [
      { ref: 'A.5.1', title: 'IS Policies', audit: ['IS policy approved and signed by top management', 'Policy communicated to all staff — training records', 'Policy reviewed at planned intervals (minimum annually)', 'Policy available as documented information'] },
      { ref: 'A.5.2', title: 'IS Roles & Responsibilities', audit: ['CISO/IS Manager formally designated', 'IS responsibilities in job descriptions', 'RACI matrix covering all ISMS processes', 'Segregation of duties applied'] },
      { ref: 'A.5.3', title: 'Segregation of Duties', audit: ['Conflicting duties identified and separated', 'No single person can initiate and approve transactions', 'Developer access to production restricted', 'IT admin and auditor roles separated'] },
      { ref: 'A.5.4', title: 'Management Responsibilities', audit: ['Management actively enforce IS policy', 'IS responsibilities communicated to all staff', 'Management promote awareness culture', 'Non-compliance addressed through HR process'] },
    ]
  },
  {
    group: 'Threat & Project Management (A.5.7–A.5.8)', color: 'border-l-amber-500',
    controls: [
      { ref: 'A.5.7', title: 'Threat Intelligence ⭐ New', audit: ['Threat intelligence sources defined (feeds, ISACs)', 'Process to consume and action intelligence documented', 'Intelligence integrated into risk assessment', 'Evidence of intelligence actioned in security decisions'] },
      { ref: 'A.5.8', title: 'IS in Project Management', audit: ['IS requirements considered at project initiation', 'Security reviews at key project milestones', 'Security sign-off required before go-live', 'Security testing included in project plans'] },
    ]
  },
  {
    group: 'Asset & Access Management (A.5.9–A.5.18)', color: 'border-l-purple-500',
    controls: [
      { ref: 'A.5.9', title: 'Asset Inventory', audit: ['Asset register complete and current', 'All information assets identified and owned', 'Assets classified by criticality and sensitivity', 'Asset register reviewed at planned intervals'] },
      { ref: 'A.5.10', title: 'Acceptable Use', audit: ['Acceptable use policy exists and communicated', 'Staff awareness of acceptable use confirmed', 'Personal use restrictions defined', 'Policy signed by all employees at onboarding'] },
      { ref: 'A.5.15', title: 'Access Control', audit: ['Access control policy documents need-to-know principle', 'Access request and approval process documented', 'Periodic access reviews conducted', 'Privileged access separately controlled'] },
      { ref: 'A.5.16', title: 'Identity Management', audit: ['Unique user IDs — no shared accounts', 'User registration and de-registration process', 'Identity lifecycle managed (joiner/mover/leaver)', 'Dormant accounts identified and disabled'] },
      { ref: 'A.5.17', title: 'Authentication Information', audit: ['Password policy enforced (length, complexity, rotation)', 'Default passwords changed before deployment', 'Password storage — hashed and salted', 'MFA implemented for privileged and remote access'] },
      { ref: 'A.5.18', title: 'Access Rights', audit: ['Access rights based on job role (RBAC)', 'Least privilege principle applied', 'Access rights reviewed quarterly', 'Joiners/movers/leavers process removes/adjusts access promptly'] },
    ]
  },
  {
    group: 'Supplier & Incident Management (A.5.19–A.5.28)', color: 'border-l-red-500',
    controls: [
      { ref: 'A.5.19', title: 'Supplier IS Policy', audit: ['IS requirements included in supplier contracts', 'Supplier security assessment before onboarding', 'Approved supplier list maintained', 'Sub-contractor IS requirements flowed down'] },
      { ref: 'A.5.20', title: 'Supplier Agreements', audit: ['IS clauses in all supplier contracts', 'Data processing agreements (DPAs) in place', 'Right-to-audit clause included', 'Incident notification requirements defined'] },
      { ref: 'A.5.23', title: 'Cloud Services ⭐ New', audit: ['Cloud services inventory maintained', 'Shared responsibility model documented per provider', 'Data residency requirements verified', 'Cloud exit strategy documented per service'] },
      { ref: 'A.5.24', title: 'IS Incident Management Planning', audit: ['Incident response plan documented and tested', 'IRT roles assigned and trained', 'Incident classification scheme defined', 'Regulatory notification timelines known (72hr GDPR)'] },
      { ref: 'A.5.25', title: 'Assessment of IS Events', audit: ['IS events assessed against classification scheme', 'Triage process documented', 'Escalation criteria defined', 'All events logged in incident register'] },
      { ref: 'A.5.30', title: 'ICT Readiness for BCP ⭐ New', audit: ['RTO/RPO defined per critical system', 'ICT continuity plan documented', 'ICT recovery procedures tested at planned intervals', 'Test results reviewed and lessons learned incorporated'] },
    ]
  },
  {
    group: 'Legal & Compliance (A.5.31–A.5.37)', color: 'border-l-emerald-500',
    controls: [
      { ref: 'A.5.31', title: 'Legal Requirements', audit: ['Applicable laws and regulations identified', 'Legal register maintained and current', 'Compliance calendar with key dates', 'Legal changes monitored and actioned'] },
      { ref: 'A.5.34', title: 'Privacy & PII', audit: ['Personal data inventory (DSAR register)', 'Privacy impact assessments conducted', 'Data subject rights process documented', 'Data retention and deletion schedules applied'] },
      { ref: 'A.5.35', title: 'Independent IS Review', audit: ['Independent review scheduled (internal audit or external)', 'Reviewer independence from IS operations confirmed', 'Review scope covers ISMS effectiveness', 'Results reported to management'] },
      { ref: 'A.5.36', title: 'Compliance with Policies', audit: ['Regular compliance checks against IS policies', 'Technical compliance checks automated where possible', 'Non-compliance tracked and remediated', 'Compliance results reported to management'] },
    ]
  },
]

export default function Organizational() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 27002:2022" clause="A.5.1–A.5.37" title="Organizational Controls (Theme 5)"
        description="37 organizational controls covering policies, governance, threat intelligence, asset management, access control, supplier relationships, incident management, and legal compliance. Controls marked ⭐ are new in ISO 27002:2022."
        badges={['Theme 5', '37 Controls', 'Organizational']} />
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
                  <div className="space-y-1">
                    {c.audit.map(a => (
                      <div key={a} className="flex items-start gap-1.5">
                        <CheckCircle2 size={11} className="text-emerald-audit flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-steel-300 leading-snug">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <AIPanel title="Generate Organizational Controls Artifacts"
        systemPrompt="You are an ISO 27002:2022 Organizational controls specialist (Theme 5, A.5.1–A.5.37). Generate audit workpapers, TOD/TOI/TOE test scripts, gap assessments, and policy templates for organizational controls. Include specific evidence requirements and audit questions per control."
        placeholder="e.g. Generate a TOE workpaper for A.5.18 Access Rights — quarterly access review sample of 25 user accounts"
        contextFields={[
          { id: 'control', label: 'Control Reference', type: 'text', placeholder: 'e.g. A.5.18 — Access Rights' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['TOD Workpaper', 'TOI Walkthrough Script', 'TOE Sampling Plan', 'Gap Assessment', 'Policy Template', 'Audit Questions List', 'Evidence Checklist'] },
          { id: 'org', label: 'Organisation Context', type: 'text', placeholder: 'e.g. AWS SaaS, 200 staff, Okta IAM, Microsoft 365' },
        ]} />
    </div>
  )
}
