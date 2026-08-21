import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const crossWalkData = [
  { clause: '4', topic: 'Context of the Organisation', iso27001: 'Cl. 4 — ISMS scope, internal/external issues, interested parties', iso9001: 'Cl. 4 — QMS scope, interested parties, context analysis', joint: 'Single context analysis document covering both ISMS and QMS scope', saving: 'High' },
  { clause: '5', topic: 'Leadership', iso27001: 'Cl. 5 — IS Policy, CISO role, ISMS RACI', iso9001: 'Cl. 5 — Quality Policy, Quality Manager role, QMS RACI', joint: 'Joint leadership structure — separate policies, shared RACI where roles overlap', saving: 'Medium' },
  { clause: '6', topic: 'Planning', iso27001: 'Cl. 6 — Risk assessment, SoA, IS objectives', iso9001: 'Cl. 6 — Quality risks & opportunities, quality objectives', joint: 'Integrated risk register with IS and quality risks tagged separately', saving: 'Medium' },
  { clause: '7', topic: 'Support', iso27001: 'Cl. 7 — IS competence, awareness, document control', iso9001: 'Cl. 7 — Quality competence, awareness, calibration, document control', joint: 'Single document control procedure, single awareness programme with IS + quality content', saving: 'High' },
  { clause: '8', topic: 'Operation', iso27001: 'Cl. 8 — Risk assessment/treatment, operational controls', iso9001: 'Cl. 8 — Operational planning, customer requirements, product conformity', joint: 'Integrated operational planning — change management covers both IS change and quality change', saving: 'Medium' },
  { clause: '9', topic: 'Performance Evaluation', iso27001: 'Cl. 9 — IS metrics, internal ISMS audit, management review', iso9001: 'Cl. 9 — Quality metrics, customer satisfaction, internal QMS audit, management review', joint: 'Joint management review agenda covering both ISMS and QMS inputs/outputs', saving: 'High' },
  { clause: '10', topic: 'Improvement', iso27001: 'Cl. 10 — ISMS CAPA, continual improvement', iso9001: 'Cl. 10 — Quality CAPA, continual improvement', joint: 'Single CAPA register with IS and quality nonconformities tagged separately', saving: 'High' },
]

const savingColors = { High: 'bg-emerald-900/40 text-emerald-300', Medium: 'bg-amber-900/40 text-amber-300', Low: 'bg-navy-800 text-steel-400' }

export function IMSCrosswalk() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="IMS"
        clause="ISO 27001 × ISO 9001"
        title="IMS Clause Alignment — Cross-Walk Matrix"
        description="ISO 27001:2022 and ISO 9001:2015 share a common High Level Structure (HLS) — Clauses 4 through 10 align. This cross-walk identifies where joint documentation and joint auditing can eliminate redundancy without compromising standard compliance."
        badges={['IMS', 'Cross-Walk', 'Dual Standard']}
      />

      <div className="card mb-6">
        <h2 className="section-title mb-1">HLS Clause Alignment</h2>
        <p className="text-xs text-steel-400 mb-4">Both standards use Annex SL High Level Structure — enabling a genuine Integrated Management System.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-700">
                {['Cl.', 'Topic', 'ISO 27001 Requirement', 'ISO 9001 Requirement', 'Joint IMS Approach', 'Saving'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-steel-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {crossWalkData.map((row, i) => (
                <tr key={row.clause} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                  <td className="py-3 px-3 font-mono text-amber-audit font-bold">{row.clause}</td>
                  <td className="py-3 px-3 text-white font-medium">{row.topic}</td>
                  <td className="py-3 px-3 text-blue-300 leading-snug max-w-xs">{row.iso27001}</td>
                  <td className="py-3 px-3 text-emerald-300 leading-snug max-w-xs">{row.iso9001}</td>
                  <td className="py-3 px-3 text-steel-300 leading-snug max-w-xs">{row.joint}</td>
                  <td className="py-3 px-3"><span className={`badge ${savingColors[row.saving]}`}>{row.saving}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AIPanel
        title="Generate IMS Cross-Walk Artifacts"
        systemPrompt="You are an Integrated Management System (IMS) expert specialising in ISO 27001:2022 and ISO 9001:2015 integration. Generate IMS cross-walk matrices, gap analyses between the two standards, unified document lists, and joint audit programme frameworks. Clearly identify where documents should be unified versus kept separate. Reference the Annex SL High Level Structure alignment."
        placeholder="e.g. Generate a unified IMS document list identifying which policies should be joint and which should be separate"
        contextFields={[
          { id: 'org', label: 'Organisation', placeholder: 'e.g. Software company, ISO 27001 certified, seeking ISO 9001', type: 'text' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Full IMS Cross-Walk Matrix', 'Unified IMS Document List', 'Joint Audit Programme Framework', 'IMS Gap Analysis', 'Duplicate Elimination Map', 'Joint Management Review Agenda'] },
        ]}
      />
    </div>
  )
}

const worksheets = [
  { process: 'Change Management', is27001: ['IS impact assessment for all changes (A.8.32)', 'Security testing before production deployment', 'Rollback plan for IS-critical changes'], iso9001: ['Quality impact assessment for all changes', 'Product conformity verification post-change', 'Customer communication for service-affecting changes'], joint: ['Single change request form covering IS + quality fields', 'Combined IS/quality review gate before approval', 'Unified post-implementation review'] },
  { process: 'Vendor Onboarding', is27001: ['IS risk assessment of vendor (A.5.19)', 'Vendor IS audit rights and NDA (A.5.20)', 'Vendor monitoring and review (A.5.22)'], iso9001: ['Vendor quality capability assessment', 'Supplier performance criteria defined (Cl. 8.4)', 'Supplier monitoring and periodic review'], joint: ['Single vendor assessment covering IS + quality criteria', 'Combined vendor scorecard (IS risk + quality KPIs)', 'Unified vendor register with IS and quality status'] },
  { process: 'SDLC / Development', is27001: ['Secure coding standards (A.8.28)', 'Security testing in CI/CD pipeline', 'IS requirements in development specification'], iso9001: ['Quality in design and development (Cl. 8.3)', 'Product acceptance criteria and testing', 'Design review gates and sign-off records'], joint: ['Combined SDLC gate checklist — IS + quality at each phase', 'Unified testing evidence covering security and quality', 'Joint release sign-off — IS team + QA team'] },
]

export function IMSWorksheets() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="IMS"
        clause="Joint Audit Worksheets"
        title="Joint Audit Worksheets"
        description="Single audit checklists that test both ISO 27001 (Information Security) and ISO 9001 (Quality) requirements for shared processes — eliminating duplicate fieldwork."
        badges={['IMS', 'TOD', 'TOI', 'TOE']}
      />

      <div className="space-y-6 mb-6">
        {worksheets.map(w => (
          <div key={w.process} className="card">
            <h2 className="section-title mb-4">{w.process}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-navy-800 border border-blue-800/50 rounded-lg p-3">
                <div className="text-xs font-semibold text-blue-300 mb-2">ISO 27001 Requirements</div>
                {w.is27001.map(i => <div key={i} className="flex items-start gap-2 mb-1.5"><CheckCircle2 size={11} className="text-blue-400 flex-shrink-0 mt-0.5" /><span className="text-xs text-steel-300 leading-snug">{i}</span></div>)}
              </div>
              <div className="bg-navy-800 border border-emerald-800/50 rounded-lg p-3">
                <div className="text-xs font-semibold text-emerald-300 mb-2">ISO 9001 Requirements</div>
                {w.iso9001.map(i => <div key={i} className="flex items-start gap-2 mb-1.5"><CheckCircle2 size={11} className="text-emerald-audit flex-shrink-0 mt-0.5" /><span className="text-xs text-steel-300 leading-snug">{i}</span></div>)}
              </div>
              <div className="bg-navy-800 border border-amber-800/50 rounded-lg p-3">
                <div className="text-xs font-semibold text-amber-300 mb-2">Joint IMS Audit Approach</div>
                {w.joint.map(i => <div key={i} className="flex items-start gap-2 mb-1.5"><CheckCircle2 size={11} className="text-amber-audit flex-shrink-0 mt-0.5" /><span className="text-xs text-steel-300 leading-snug">{i}</span></div>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AIPanel
        title="Generate Joint Audit Worksheets"
        systemPrompt="You are an IMS joint audit expert. Generate combined audit worksheets that test both ISO 27001:2022 and ISO 9001:2015 requirements in a single fieldwork activity. Worksheets must include: IS test steps (referencing ISO 27001 clause and ISO 27002 control), Quality test steps (referencing ISO 9001 clause), combined evidence requirements, single PBC list, and unified workpaper conclusion covering both standards."
        placeholder="e.g. Generate a joint audit worksheet for Vendor Onboarding — testing ISO 27001 A.5.19-5.22 and ISO 9001 Cl. 8.4 simultaneously"
        contextFields={[
          { id: 'process', label: 'Process to Audit', type: 'select', options: ['Change Management', 'Vendor Onboarding', 'SDLC / Software Development', 'Incident Management', 'Document Control', 'Internal Audit Process', 'Management Review', 'Training & Competence'] },
          { id: 'org', label: 'Organisation', placeholder: 'e.g. SaaS company, 200 staff, AWS', type: 'text' },
          { id: 'phase', label: 'Testing Phase', type: 'select', options: ['TOD — Design only', 'TOI — Implementation walkthrough', 'TOE — Operating effectiveness', 'Full workpaper (TOD + TOI + TOE)'] },
        ]}
      />
    </div>
  )
}
