import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2, Info } from 'lucide-react'

const elements = [
  { clause: '4.1', title: 'Internal & External Issues', desc: 'Identify factors that affect the ability to achieve ISMS objectives — the operating context of the organisation.', items: ['Internal issues: culture, structure, roles, capabilities, contractual relationships', 'External issues: legal, regulatory, competitive, market, technology, socioeconomic', 'Documented in Context Analysis or SWOT/PESTLE register', 'Reviewed at least annually and when significant changes occur'], artifact: 'Internal/External Issues Register' },
  { clause: '4.2', title: 'Interested Parties', desc: 'Identify stakeholders whose needs and expectations are relevant to the ISMS.', items: ['Customers and clients (data subjects)', 'Regulators and compliance bodies', 'Suppliers, vendors, and third parties', 'Employees, shareholders, and board'], artifact: 'Interested Parties Register' },
  { clause: '4.3', title: 'ISMS Scope', desc: 'Define the boundaries and applicability of the ISMS — what is included and excluded.', items: ['Organisational boundaries (sites, departments, functions)', 'Technology boundaries (systems, networks, cloud services)', 'Physical boundaries (data centres, offices, remote working)', 'Interfaces and dependencies with out-of-scope areas documented'], artifact: 'ISMS Scope Statement' },
  { clause: '4.4', title: 'ISMS Processes', desc: 'Establish, implement, maintain and continually improve the ISMS and its processes.', items: ['All ISMS processes identified and documented', 'Process owners assigned', 'Inputs, outputs, and controls defined per process', 'Process performance monitored per Clause 9'], artifact: 'ISMS Process Map' },
]

export default function ISO27001Clause4() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Clause 4"
        title="Context & Scope of the Organisation"
        description="Clause 4 establishes the foundation of the ISMS — understanding the organisation's context, identifying interested parties, and formally defining the ISMS scope and boundaries."
        badges={['ISMS Foundation', 'TOD']}
      />
      <div className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-4 mb-6 flex gap-3">
        <Info size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-blue-200/80 leading-relaxed">
          <span className="font-semibold text-blue-300">Audit focus: </span>
          Clause 4 is primarily tested at TOD — auditors assess whether the scope is appropriate, complete, and reflects the organisation's actual information security boundaries.
        </div>
      </div>
      <div className="space-y-4 mb-6">
        {elements.map(el => (
          <div key={el.clause} className="card border-l-4 border-l-blue-500">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="clause-tag flex-shrink-0 self-start">{el.clause}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1">{el.title}</h3>
                <p className="text-sm text-steel-300 mb-3 leading-relaxed">{el.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                  {el.items.map(i => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-steel-300 leading-snug">{i}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-steel-400">Artifact:</span>
                  <span className="badge badge-steel">{el.artifact}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AIPanel
        title="Generate Clause 4 Artifacts"
        systemPrompt="You are an ISO 27001:2022 ISMS scoping and context expert. Generate professional Clause 4 artifacts: scope statements, internal/external issues registers, interested parties registers, and ISMS process maps. All outputs must be structured, audit-ready, and tailored to the organisation's sector and technology environment."
        placeholder="e.g. Generate an ISMS Scope Statement for a UK-based SaaS company processing EU personal data under GDPR"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', placeholder: 'e.g. SaaS fintech, 300 employees, UK-based', type: 'text' },
          { id: 'tech', label: 'Technology Environment', placeholder: 'e.g. AWS cloud, Microsoft 365, Salesforce CRM', type: 'text' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['ISMS Scope Statement', 'Internal Issues Register', 'External Issues Register', 'Interested Parties Register', 'ISMS Process Map', 'Full Clause 4 Package'] },
        ]}
      />
    </div>
  )
}
