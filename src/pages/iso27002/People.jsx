import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const controls = [
  { ref: '6.1', title: 'Screening', type: 'Preventive', cia: 'C-I-A', nist: 'Protect', desc: 'Background verification checks on candidates performed prior to joining, in line with laws and ethics.' },
  { ref: '6.2', title: 'Terms and conditions of employment', type: 'Preventive', cia: 'C-I-A', nist: 'Protect', desc: 'Employment contracts state IS responsibilities of personnel and the organisation.' },
  { ref: '6.3', title: 'Information security awareness, education and training', type: 'Preventive', cia: 'C-I-A', nist: 'Protect', desc: 'All personnel receive appropriate IS awareness and training relevant to their role.' },
  { ref: '6.4', title: 'Disciplinary process', type: 'Corrective', cia: 'C-I-A', nist: 'Govern', desc: 'A formal disciplinary process in place and communicated for IS policy violations.' },
  { ref: '6.5', title: 'Responsibilities after termination or change of employment', type: 'Preventive', cia: 'C-I-A', nist: 'Protect', desc: 'IS responsibilities remaining valid after termination or change of employment defined and enforced.' },
  { ref: '6.6', title: 'Confidentiality or non-disclosure agreements', type: 'Preventive', cia: 'C', nist: 'Protect', desc: 'NDAs reflecting the organisation\'s need for information protection identified, documented and reviewed.' },
  { ref: '6.7', title: 'Remote working', type: 'Preventive', cia: 'C-I-A', nist: 'Protect', desc: 'Security measures implemented when personnel work remotely to protect information outside premises.' },
  { ref: '6.8', title: 'Information security event reporting', type: 'Detective', cia: 'C-I-A', nist: 'Detect', desc: 'Personnel report IS events through appropriate channels as quickly as possible.' },
]

const pbcList = [
  'Background screening policy and process documentation',
  'Sample of 10 employee screening records (new hires in audit period)',
  'Employment contract template with IS obligations clause',
  'IS awareness training completion records — all staff',
  'Training curriculum and content for current year',
  'Disciplinary policy for IS violations',
  'Leaver checklist — sample 10 leavers (access revocation evidence)',
  'NDA register and signed NDA samples (10)',
  'Remote working policy and remote access security controls',
  'IS event reporting procedure and incident log',
]

export default function People() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27002:2022"
        clause="Theme 2"
        title="People Controls (6.1–6.8)"
        description="8 people controls covering pre-employment screening, IS training, disciplinary process, termination procedures, NDAs, remote working, and incident reporting."
        badges={['People', 'TOD', 'TOI', 'TOE']}
      />

      <div className="card mb-6">
        <h2 className="section-title mb-3">Controls Overview</h2>
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
              {controls.map((c, i) => (
                <tr key={c.ref} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                  <td className="py-2 px-3 font-mono text-amber-audit font-semibold">{c.ref}</td>
                  <td className="py-2 px-3 text-white max-w-xs">
                    <div>{c.title}</div>
                    <div className="text-steel-400 leading-snug mt-0.5">{c.desc}</div>
                  </td>
                  <td className="py-2 px-3 text-steel-300">{c.type}</td>
                  <td className="py-2 px-3 text-blue-400 font-mono">{c.cia}</td>
                  <td className="py-2 px-3 text-emerald-400">{c.nist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="section-title mb-3">PBC Evidence Request List — People Controls</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {pbcList.map((item, i) => (
            <div key={i} className="flex items-start gap-2 bg-navy-800 rounded-lg px-3 py-2">
              <span className="text-xs font-mono text-amber-audit flex-shrink-0 w-5">{i + 1}.</span>
              <span className="text-xs text-steel-300 leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <AIPanel
        title="Generate People Controls Workprogram"
        systemPrompt="You are an ISO 27002:2022 people controls audit expert. Generate detailed audit workprograms, walkthrough scripts, PBC lists, and sampling workpapers for People Controls (6.1–6.8). Include TOD design checks, TOI walkthrough steps, and TOE sampling procedures. Tag controls with 5 ISO 27002:2022 attributes. Focus on HR processes, employment lifecycle, and security culture testing."
        placeholder="e.g. Generate a TOE sampling workpaper for A.6.3 IS Awareness Training — test that all 300 staff completed training in the audit period"
        contextFields={[
          { id: 'control', label: 'Control Reference', placeholder: 'e.g. A.6.3 IS Awareness Training, A.6.5 Termination', type: 'text' },
          { id: 'org', label: 'Organisation', placeholder: 'e.g. 500 employees, hybrid working, UK-based', type: 'text' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Full Workprogram (All 8 Controls)', 'TOD Design Script', 'TOI Walkthrough Script', 'TOE Sampling Workpaper', 'PBC Evidence Request List', 'HR Interview Guide', 'Leaver Access Revocation Checklist'] },
        ]}
      />
    </div>
  )
}
