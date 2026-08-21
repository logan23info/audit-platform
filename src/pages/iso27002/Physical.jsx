import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'

const controls = [
  { ref: '7.1', title: 'Physical security perimeters', type: 'Preventive', cia: 'C-I-A', nist: 'Protect', desc: 'Security perimeters defined and used to protect areas containing information and processing facilities.' },
  { ref: '7.2', title: 'Physical entry', type: 'Preventive', cia: 'C-I-A', nist: 'Protect', desc: 'Secure areas protected by appropriate entry controls to authorised personnel only.' },
  { ref: '7.3', title: 'Securing offices, rooms and facilities', type: 'Preventive', cia: 'C-I-A', nist: 'Protect', desc: 'Physical security for offices, rooms, and facilities designed and applied.' },
  { ref: '7.4', title: 'Physical security monitoring', type: 'Detective', cia: 'C-I-A', nist: 'Detect', desc: '⭐ NET-NEW: Premises continually monitored for unauthorised physical access.' },
  { ref: '7.5', title: 'Protecting against physical and environmental threats', type: 'Preventive', cia: 'A', nist: 'Protect', desc: 'Protection against natural disasters, malicious attack, or accidents designed and implemented.' },
  { ref: '7.6', title: 'Working in secure areas', type: 'Preventive', cia: 'C-I-A', nist: 'Protect', desc: 'Security measures for working in secure areas designed and applied.' },
  { ref: '7.7', title: 'Clear desk and clear screen', type: 'Preventive', cia: 'C', nist: 'Protect', desc: 'Clear desk policy for papers and removable storage media and clear screen policy for facilities.' },
  { ref: '7.8', title: 'Equipment siting and protection', type: 'Preventive', cia: 'C-I-A', nist: 'Protect', desc: 'Equipment sited and protected to reduce environmental threats and unauthorised access.' },
  { ref: '7.9', title: 'Security of assets off-premises', type: 'Preventive', cia: 'C-I-A', nist: 'Protect', desc: 'Off-site assets protected taking into account different risks of working outside premises.' },
  { ref: '7.10', title: 'Storage media', type: 'Preventive', cia: 'C-I-A', nist: 'Protect', desc: 'Storage media managed through acquisition, use, transportation and disposal lifecycle.' },
  { ref: '7.11', title: 'Supporting utilities', type: 'Preventive', cia: 'A', nist: 'Protect', desc: 'Information processing facilities protected from power failures and other utility disruptions.' },
  { ref: '7.12', title: 'Cabling security', type: 'Preventive', cia: 'C-I-A', nist: 'Protect', desc: 'Cables carrying power or data protected from interception, interference, or damage.' },
  { ref: '7.13', title: 'Equipment maintenance', type: 'Preventive', cia: 'A', nist: 'Protect', desc: 'Equipment maintained correctly to ensure availability and integrity of information.' },
  { ref: '7.14', title: 'Secure disposal or reuse of equipment', type: 'Preventive', cia: 'C', nist: 'Protect', desc: 'Items of equipment verified to ensure any sensitive data and licensed software is removed before disposal.' },
]

export default function Physical() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27002:2022"
        clause="Theme 3"
        title="Physical Controls (7.1–7.14)"
        description="14 physical security controls covering perimeters, entry controls, environmental threats, equipment, storage media, and secure disposal. Includes net-new A.7.4 Physical Security Monitoring."
        badges={['Physical', 'TOD', 'TOI', 'TOE']}
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
                  <td className="py-2 px-3 font-mono text-amber-audit font-semibold whitespace-nowrap">{c.ref}</td>
                  <td className="py-2 px-3 text-white max-w-xs">
                    <div>{c.title}</div>
                    <div className="text-steel-400 leading-snug mt-0.5">{c.desc}</div>
                  </td>
                  <td className="py-2 px-3 text-steel-300 whitespace-nowrap">{c.type}</td>
                  <td className="py-2 px-3 text-blue-400 font-mono whitespace-nowrap">{c.cia}</td>
                  <td className="py-2 px-3 text-emerald-400 whitespace-nowrap">{c.nist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-steel-400 mt-2">⭐ = Net-new control in ISO 27002:2022</p>
      </div>

      <div className="card mb-6">
        <h2 className="section-title mb-3">Physical Audit Approach</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { phase: 'TOD', color: 'bg-blue-900/40 text-blue-300', steps: ['Review physical security policy and perimeter definitions', 'Verify access control design (key cards, biometrics)', 'Check CCTV monitoring design and coverage plan', 'Confirm media disposal and equipment retirement policy'] },
            { phase: 'TOI', color: 'bg-purple-900/40 text-purple-300', steps: ['Physical site walkthrough — observe entry controls', 'Test access card — attempt entry to restricted zone', 'Observe CCTV camera coverage and monitoring station', 'Review one media disposal record end-to-end'] },
            { phase: 'TOE', color: 'bg-emerald-900/40 text-emerald-300', steps: ['Sample 25 access log entries — verify authorised personnel only', 'Sample 10 equipment disposal certificates', 'Review CCTV alert log — last 90 days', 'Sample 15 clear desk inspections (if logged)'] },
          ].map(t => (
            <div key={t.phase} className="bg-navy-800 border border-navy-600 rounded-lg p-3">
              <span className={`badge ${t.color} mb-3 inline-block`}>{t.phase}</span>
              <div className="space-y-2">
                {t.steps.map(s => (
                  <div key={s} className="flex items-start gap-2">
                    <span className="text-steel-500 flex-shrink-0 mt-0.5 text-xs">▸</span>
                    <span className="text-xs text-steel-300 leading-snug">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AIPanel
        title="Generate Physical Controls Workprogram"
        systemPrompt="You are an ISO 27002:2022 physical security audit expert. Generate detailed physical security audit workprograms, site walkthrough scripts, CCTV and access control test procedures, and media disposal verification checklists. Include TOD, TOI (including physical site walkthrough observation guides), and TOE sampling procedures. Pay special attention to A.7.4 Physical Security Monitoring (net-new control)."
        placeholder="e.g. Generate a physical site walkthrough script for a data centre audit covering perimeter security, CCTV, and access control"
        contextFields={[
          { id: 'control', label: 'Control Reference', placeholder: 'e.g. A.7.2 Physical Entry, A.7.4 Physical Monitoring', type: 'text' },
          { id: 'site', label: 'Site Type', type: 'select', options: ['Corporate office', 'Data centre', 'Manufacturing facility', 'Remote/branch office', 'Co-location facility'] },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Full Physical Audit Workprogram', 'Site Walkthrough Script', 'Access Control Test Procedure', 'CCTV Monitoring Review Checklist', 'Media Disposal Verification', 'Equipment Siting Inspection', 'PBC Evidence Request List'] },
        ]}
      />
    </div>
  )
}
