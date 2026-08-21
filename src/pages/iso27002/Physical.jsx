import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const controls = [
  { ref: 'A.7.1', title: 'Physical Security Perimeters', audit: ['Physical security perimeters defined and documented', 'Perimeter barriers adequate (walls, fences, secured doors)', 'All entry points identified and controlled', 'Perimeter integrity checked regularly — no gaps or weaknesses'] },
  { ref: 'A.7.2', title: 'Physical Entry', audit: ['Access control at all entry points (card, PIN, biometric)', 'Visitor management process — sign-in, escort, badge', 'Access logs retained and reviewed', 'Tailgating prevention controls in place'] },
  { ref: 'A.7.3', title: 'Securing Offices & Facilities', audit: ['Server rooms and data centres locked at all times', 'Key holder list maintained and current', 'Combination/PIN codes changed when personnel leave', 'Sensitive areas not visible to public or visitors'] },
  { ref: 'A.7.4', title: 'Physical Security Monitoring ⭐ New', audit: ['CCTV covers all entry points and sensitive areas', 'CCTV footage retained for defined period (min 30 days)', 'Alarms installed and tested at planned intervals', 'Physical access logs reviewed regularly for anomalies', 'Monitoring systems themselves protected from tampering'] },
  { ref: 'A.7.5', title: 'Physical & Environmental Threats', audit: ['Environmental threats assessed (flood, fire, power, temperature)', 'UPS installed for critical systems', 'Fire suppression appropriate for IT equipment', 'Water detection sensors near server equipment', 'Temperature and humidity monitoring in server rooms'] },
  { ref: 'A.7.6', title: 'Working in Secure Areas', audit: ['Clean desk policy enforced in secure areas', 'Prohibition on personal devices in secure areas', 'Unaccompanied visitor access prohibited', 'Work in secure areas logged'] },
  { ref: 'A.7.7', title: 'Clear Desk & Clear Screen', audit: ['Clear desk policy documented and communicated', 'Sensitive documents secured when unattended', 'Screen lock activated when workstation unattended', 'Printers and fax machines cleared promptly', 'Whiteboard and meeting room content erased after use'] },
  { ref: 'A.7.8', title: 'Equipment Siting & Protection', audit: ['Equipment positioned to minimise unauthorised access', 'Screens positioned to prevent shoulder surfing', 'Equipment protected from environmental hazards', 'Power cables protected from damage or interference'] },
  { ref: 'A.7.9', title: 'Security of Assets Off-Premises', audit: ['Off-site equipment policy documents requirements', 'Laptops encrypted — full disk encryption verified', 'Remote wipe capability for mobile devices', 'Off-site equipment tracked and inventoried', 'Physical security of home working locations assessed'] },
  { ref: 'A.7.10', title: 'Storage Media', audit: ['Media handling policy documents classification requirements', 'Removable media use restricted or prohibited', 'Media transported securely — encryption required', 'Disposal of media — secure overwrite or physical destruction', 'Media register for sensitive media maintained'] },
  { ref: 'A.7.13', title: 'Equipment Maintenance', audit: ['Maintenance schedule documented per manufacturer guidance', 'Maintenance performed by authorised personnel only', 'Maintenance records retained', 'Equipment checked before and after maintenance', 'Remote maintenance controlled and logged'] },
  { ref: 'A.7.14', title: 'Secure Disposal / Re-use', audit: ['Disposal procedure covers all media types', 'Secure overwrite (NIST 800-88) or physical destruction applied', 'Certificates of destruction obtained for sensitive equipment', 'Disposal vendor assessed and contracted', 'Disposal records retained'] },
]

export default function Physical() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 27002:2022" clause="A.7.1–A.7.14" title="Physical Controls (Theme 7)"
        description="14 physical security controls covering perimeter security, entry controls, secure areas, environmental threats, clear desk, equipment protection, and secure disposal. Controls marked ⭐ are new in ISO 27002:2022."
        badges={['Theme 7', '14 Controls', 'Physical']} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {controls.map(c => (
          <div key={c.ref} className="card border-l-4 border-l-amber-500">
            <div className="flex items-start gap-2 mb-2">
              <span className="font-mono text-amber-audit font-bold text-xs flex-shrink-0">{c.ref}</span>
              <span className="text-sm font-semibold text-white">{c.title}</span>
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
      <AIPanel title="Generate Physical Controls Artifacts"
        systemPrompt="You are an ISO 27002:2022 Physical controls specialist (Theme 7, A.7.1–A.7.14). Generate physical security audit workpapers, site inspection checklists, TOI walkthroughs, and secure disposal procedures. Include specific evidence requirements and observable test steps."
        placeholder="e.g. Generate a physical security site inspection checklist covering all A.7 controls for a Tier 2 data centre"
        contextFields={[
          { id: 'control', label: 'Control', type: 'select', options: controls.map(c => `${c.ref} — ${c.title}`) },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Site Inspection Checklist', 'TOD Workpaper', 'TOI Walkthrough Script', 'TOE Sampling Plan', 'Secure Disposal Procedure', 'Physical Security Assessment', 'Clear Desk Audit Checklist'] },
          { id: 'facility', label: 'Facility Type', type: 'text', placeholder: 'e.g. Head office, co-location DC, remote office, cloud-only' },
        ]} />
    </div>
  )
}
