import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const controls = [
  { ref: '5.1', title: 'Policies for information security', type: 'Preventive', cia: 'C-I-A', nist: 'Govern', desc: 'IS policies defined, approved by management, published and communicated to staff and relevant parties.' },
  { ref: '5.2', title: 'Information security roles and responsibilities', type: 'Preventive', cia: 'C-I-A', nist: 'Govern', desc: 'IS roles and responsibilities defined and allocated per the organisation\'s needs.' },
  { ref: '5.3', title: 'Segregation of duties', type: 'Preventive', cia: 'C-I', nist: 'Protect', desc: 'Conflicting duties and areas of responsibility segregated to reduce opportunities for unauthorised modification.' },
  { ref: '5.4', title: 'Management responsibilities', type: 'Preventive', cia: 'C-I-A', nist: 'Govern', desc: 'Management require all personnel to apply IS per established policies and procedures.' },
  { ref: '5.5', title: 'Contact with authorities', type: 'Preventive', cia: 'C-I-A', nist: 'Respond', desc: 'Appropriate contacts with relevant authorities maintained.' },
  { ref: '5.6', title: 'Contact with special interest groups', type: 'Preventive', cia: 'C-I-A', nist: 'Identify', desc: 'Appropriate contacts with special interest groups or security forums maintained.' },
  { ref: '5.7', title: 'Threat intelligence', type: 'Preventive', cia: 'C-I-A', nist: 'Identify', desc: '⭐ NET-NEW: IS threat intelligence collected and analysed to produce actionable threat intel.' },
  { ref: '5.8', title: 'IS in project management', type: 'Preventive', cia: 'C-I-A', nist: 'Protect', desc: 'IS integrated into project management throughout the project lifecycle.' },
  { ref: '5.9', title: 'Inventory of information and other assets', type: 'Preventive', cia: 'C-I-A', nist: 'Identify', desc: 'Inventory of information and associated assets developed and maintained.' },
  { ref: '5.10', title: 'Acceptable use of assets', type: 'Preventive', cia: 'C-I-A', nist: 'Protect', desc: 'Rules for acceptable use and procedures for handling information assets identified and documented.' },
  { ref: '5.23', title: 'IS for use of cloud services', type: 'Preventive', cia: 'C-I-A', nist: 'Protect', desc: '⭐ NET-NEW: Processes for acquisition, use, management and exit from cloud services established.' },
  { ref: '5.30', title: 'ICT readiness for business continuity', type: 'Preventive', cia: 'A', nist: 'Recover', desc: '⭐ NET-NEW: ICT readiness planned, implemented, maintained and tested based on BIA and RTO/RPO objectives.' },
]

const testSteps = [
  { phase: 'TOD', steps: ['Verify IS policy exists, is approved, and current', 'Confirm policy covers all required IS topics', 'Check roles and responsibilities are formally assigned', 'Verify SoD conflicts identified and mitigated'] },
  { phase: 'TOI', steps: ['Obtain policy distribution evidence', 'Confirm staff have signed IS policy acknowledgement', 'Walk through role assignment process with HR', 'Review SoD matrix implementation in access system'] },
  { phase: 'TOE', steps: ['Sample 25 staff — confirm IS policy acknowledgement current', 'Review access logs for SoD conflict instances', 'Test threat intelligence process — last 3 outputs', 'Verify cloud services inventory against actual usage'] },
]

export default function Organizational() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27002:2022"
        clause="Theme 1"
        title="Organizational Controls (5.1–5.37)"
        description="37 organizational controls covering governance, policies, roles, project management, supplier relationships, and information classification. Tested across TOD, TOI, and TOE phases."
        badges={['Organizational', 'TOD', 'TOI', 'TOE']}
      />

      <div className="card mb-6">
        <h2 className="section-title mb-3">Control Attribute Tags — ISO 27002:2022</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          {[
            { label: 'Control Type', vals: 'Preventive · Detective · Corrective' },
            { label: 'CIA Properties', vals: 'Confidentiality · Integrity · Availability' },
            { label: 'NIST CSF Concept', vals: 'Identify · Protect · Detect · Respond · Recover' },
            { label: 'Operational Capability', vals: 'Governance · Apps · Infrastructure · HR' },
            { label: 'Security Domain', vals: 'Protection · Defense · Resilience · Governance' },
          ].map(t => (
            <div key={t.label} className="bg-navy-800 border border-navy-600 rounded-lg p-2">
              <div className="font-semibold text-white mb-1">{t.label}</div>
              <div className="text-steel-400 leading-snug">{t.vals}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="section-title mb-3">Key Controls — Organizational Theme</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-700">
                {['Ref', 'Control', 'Type', 'CIA', 'NIST'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-steel-400 font-medium uppercase tracking-wide text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {controls.map((c, i) => (
                <tr key={c.ref} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                  <td className="py-2 px-3 font-mono text-amber-audit font-semibold whitespace-nowrap">{c.ref}</td>
                  <td className="py-2 px-3 text-white max-w-xs">
                    <div>{c.title}</div>
                    <div className="text-steel-400 text-xs leading-snug mt-0.5">{c.desc}</div>
                  </td>
                  <td className="py-2 px-3 text-steel-300 whitespace-nowrap">{c.type}</td>
                  <td className="py-2 px-3 text-blue-400 whitespace-nowrap font-mono">{c.cia}</td>
                  <td className="py-2 px-3 text-emerald-400 whitespace-nowrap">{c.nist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-steel-400 mt-2">⭐ = Net-new controls introduced in ISO 27002:2022. Full 37-control workprograms generated via AI panel below.</p>
      </div>

      <div className="card mb-6">
        <h2 className="section-title mb-3">Audit Test Steps — By Phase</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testSteps.map(t => (
            <div key={t.phase} className="bg-navy-800 border border-navy-600 rounded-lg p-3">
              <div className={`badge mb-3 ${t.phase === 'TOD' ? 'bg-blue-900/40 text-blue-300' : t.phase === 'TOI' ? 'bg-purple-900/40 text-purple-300' : 'bg-emerald-900/40 text-emerald-300'}`}>{t.phase}</div>
              <div className="space-y-2">
                {t.steps.map(s => (
                  <div key={s} className="flex items-start gap-2">
                    <CheckCircle2 size={11} className="text-steel-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-steel-300 leading-snug">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AIPanel
        title="Generate Organizational Controls Workprogram"
        systemPrompt="You are an ISO 27002:2022 organizational controls audit expert. Generate detailed audit workprograms, test scripts, PBC evidence lists, and control-specific interview guides for ISO 27002:2022 Organizational Controls (5.1–5.37). Tag every output with the 5 mandatory attributes: Control Type (Preventive/Detective/Corrective), CIA properties, NIST CSF concept, Operational Capability, and Security Domain. Include TOD, TOI, and TOE test steps per control."
        placeholder="e.g. Generate a full audit workprogram for A.5.7 Threat Intelligence including TOD design check, TOI walkthrough, and TOE sampling methodology"
        contextFields={[
          { id: 'control', label: 'Control Reference', placeholder: 'e.g. A.5.7 Threat Intelligence, A.5.23 Cloud Services', type: 'text' },
          { id: 'org', label: 'Organisation / Tech Stack', placeholder: 'e.g. SaaS, AWS, Microsoft 365, 300 staff', type: 'text' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Full Audit Workprogram (TOD+TOI+TOE)', 'TOD Design Test Script', 'TOI Walkthrough Script', 'TOE Sampling Workpaper', 'PBC Evidence Request List', 'Control Attribute Tag Sheet', 'Interview Guide'] },
        ]}
      />
    </div>
  )
}
