import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const elements = [
  { clause: '4.1', title: 'Understanding the Organisation & Its Context', color: 'border-l-blue-500',
    desc: 'Identify internal and external issues that are relevant to the organisation\'s purpose and affect the ISMS ability to achieve its intended outcomes.',
    items: [
      'Internal issues: culture, governance structure, roles, capabilities, IT landscape',
      'External issues: legal/regulatory, market, technology, socioeconomic, competitive',
      'Context documented in SWOT, PESTLE, or Context Analysis register',
      'Context reviewed at least annually and when significant changes occur',
      'Internal/external issues feed directly into risk assessment (Cl. 6.1)',
      'Context analysis signed off by top management',
    ], artifact: 'Internal/External Issues Register (SWOT/PESTLE)' },
  { clause: '4.2', title: 'Understanding Needs & Expectations of Interested Parties', color: 'border-l-purple-500',
    desc: 'Identify interested parties relevant to the ISMS and determine their requirements — including contractual, legal, and regulatory obligations.',
    items: [
      'Customers, data subjects, and clients — data protection expectations',
      'Regulators and certification bodies — ICO, FCA, PRA, ISO certification body',
      'Shareholders and board — risk appetite and IS governance expectations',
      'Suppliers and third parties — contractual IS obligations',
      'Employees — acceptable use, training, security responsibilities',
      'Interested party requirements reviewed for ISMS relevance',
      'Requirements that become legal/contractual obligations identified',
      'Interested parties register reviewed annually',
    ], artifact: 'Interested Parties Register' },
  { clause: '4.3', title: 'Determining the Scope of the ISMS', color: 'border-l-emerald-500',
    desc: 'Formally define the boundaries and applicability of the ISMS — what is included and explicitly excluded, with documented justification.',
    items: [
      'Organisational boundaries: departments, functions, legal entities in scope',
      'Technology boundaries: systems, applications, cloud platforms, networks in scope',
      'Physical boundaries: data centres, offices, remote working environments',
      'Geographic boundaries: countries, jurisdictions covered by the ISMS',
      'Interfaces and dependencies with out-of-scope areas documented and controlled',
      'Exclusions justified — excluded items must not affect IS of in-scope assets',
      'Scope statement formally documented and approved by top management',
      'Scope reviewed and updated when organisational or technology changes occur',
    ], artifact: 'ISMS Scope Statement' },
  { clause: '4.4', title: 'Information Security Management System', color: 'border-l-amber-500',
    desc: 'Establish, implement, maintain, and continually improve the ISMS including all required processes and their interactions.',
    items: [
      'ISMS documented — all required processes identified with owners',
      'Process inputs, outputs, and controls defined',
      'ISMS processes integrated into business operations — not a silo',
      'ISMS maintained as documented information per Cl. 7.5',
      'ISMS performance monitored per Cl. 9.1',
      'ISMS continually improved per Cl. 10.1',
    ], artifact: 'ISMS Process Map / ISMS Manual' },
]

const evidenceRequired = [
  'Context analysis document (SWOT, PESTLE, or equivalent)',
  'Interested parties register with requirements mapped',
  'ISMS scope statement — signed by top management',
  'Evidence scope reflects actual operational boundaries',
  'Interface controls for out-of-scope systems documented',
  'Annual review records for context and scope',
]

export default function ISO27001Clause4() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 27001:2022" clause="Clause 4" title="Context of the Organisation"
        description="Clause 4 is the foundation of the ISMS — understanding the internal/external context, identifying interested parties and their requirements, formally defining the ISMS scope, and establishing the ISMS itself. Audited primarily via TOD and TOI."
        badges={['ISMS Foundation', 'TOD', 'TOI']} />
      <div className="space-y-4 mb-6">
        {elements.map(el => (
          <div key={el.clause} className={`card border-l-4 ${el.color}`}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="clause-tag flex-shrink-0 self-start">{el.clause}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1">{el.title}</h3>
                <p className="text-sm text-steel-300 mb-3 leading-relaxed">{el.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                  {el.items.map(i => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-emerald-audit flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-steel-300 leading-snug">{i}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-steel-400">Key Artifact:</span>
                  <span className="badge badge-amber text-xs">{el.artifact}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card mb-6">
        <h2 className="section-title mb-3">Evidence Required — Clause 4 Audit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {evidenceRequired.map((e, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-amber-audit font-mono text-xs flex-shrink-0">{String(i+1).padStart(2,'0')}.</span>
              <span className="text-xs text-steel-300 leading-snug">{e}</span>
            </div>
          ))}
        </div>
      </div>
      <AIPanel title="Generate Clause 4 Artifacts"
        systemPrompt="You are an ISO 27001:2022 Clause 4 specialist. Generate professional context analysis documents, interested parties registers, and ISMS scope statements. Include SWOT and PESTLE frameworks where relevant. All outputs must be formal, audit-ready, and aligned to ISO 27001:2022 Clause 4 requirements."
        placeholder="e.g. Generate an interested parties register for a UK-regulated fintech with FCA, ICO, and AWS as key stakeholders"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. UK fintech, 200 staff, FCA regulated, AWS' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Context Analysis (SWOT/PESTLE)', 'Internal/External Issues Register', 'Interested Parties Register', 'ISMS Scope Statement', 'Scope Exclusion Justification', 'Context Annual Review Record'] },
          { id: 'context', label: 'Key Context', type: 'text', placeholder: 'e.g. ISO 27001 certification target, hybrid cloud, GDPR obligations' },
        ]} />
    </div>
  )
}
