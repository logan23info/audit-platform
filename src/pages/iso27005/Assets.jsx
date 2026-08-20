import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const assetCategories = [
  { cat: 'Information Assets', color: 'border-l-blue-400', examples: ['Customer personal data (PII)', 'Financial records and reports', 'Intellectual property and trade secrets', 'Authentication credentials and keys', 'Audit logs and monitoring data'], classification: 'Confidential / Internal / Public' },
  { cat: 'Software Assets', color: 'border-l-purple-400', examples: ['Business applications (ERP, CRM)', 'Operating systems and middleware', 'Development tools and repositories', 'Security tools (SIEM, AV, DLP)', 'SaaS subscriptions and APIs'], classification: 'Licensed / Open Source / Custom' },
  { cat: 'Physical Assets', color: 'border-l-amber-400', examples: ['Servers and workstations', 'Network equipment (routers, switches)', 'Mobile devices and laptops', 'Storage media and backups', 'Physical security devices (CCTV, access readers)'], classification: 'Owned / Leased / BYOD' },
  { cat: 'Services', color: 'border-l-emerald-400', examples: ['Cloud platforms (AWS, Azure, GCP)', 'Telecommunications and internet services', 'Managed security services', 'Third-party SaaS platforms', 'Data processing and hosting services'], classification: 'Critical / Important / Supporting' },
  { cat: 'People', color: 'border-l-pink-400', examples: ['Key personnel with specialised knowledge', 'IT and security team members', 'Third-party contractors with access', 'Suppliers with system access', 'Auditors and external assessors'], classification: 'Internal / Contractor / Third-Party' },
]

const assetFields = ['Asset ID', 'Asset Name', 'Asset Category', 'Asset Owner', 'Asset Custodian', 'Classification', 'Location', 'Criticality (High/Med/Low)', 'Associated Risks', 'ISO 27002 Controls Applied']

export default function Assets() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27005:2022"
        clause="Asset Register"
        title="Information Asset Register"
        description="The asset register is the foundation of ISO 27005 risk management. Every risk assessment begins with identifying what assets need to be protected — and who owns them."
        badges={['Risk Foundation', 'ISO 27005', 'TOD']}
      />

      <div className="card mb-6">
        <h2 className="section-title mb-3">Asset Register — Required Fields</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {assetFields.map((f, i) => (
            <div key={f} className="bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 flex items-center gap-2">
              <span className="text-xs font-mono text-amber-audit">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-xs text-steel-300">{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {assetCategories.map(cat => (
          <div key={cat.cat} className={`card border-l-4 ${cat.color}`}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1">{cat.cat}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                  {cat.examples.map(e => (
                    <div key={e} className="flex items-start gap-2">
                      <CheckCircle2 size={11} className="text-steel-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-steel-300 leading-snug">{e}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-steel-400">Classification options:</span>
                  <span className="badge badge-steel">{cat.classification}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AIPanel
        title="Generate Asset Register"
        systemPrompt="You are an ISO 27005:2022 information asset management expert. Generate comprehensive, structured asset registers tailored to the organisation's sector and technology environment. Include all 5 asset categories: information, software, physical, services, and people. Each asset entry must include: Asset ID, Name, Category, Owner, Custodian, Classification, Location, Criticality, Associated Risks, and ISO 27002 controls applied."
        placeholder="e.g. Generate an Asset Register for a cloud-native fintech company using AWS, Salesforce, and GitHub"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', placeholder: 'e.g. Fintech, 200 employees, AWS-native', type: 'text' },
          { id: 'tech', label: 'Key Systems & Platforms', placeholder: 'e.g. AWS, Salesforce, GitHub, Microsoft 365', type: 'text' },
          { id: 'focus', label: 'Asset Category Focus', type: 'select', options: ['All Categories', 'Information Assets only', 'Software Assets only', 'Cloud Services only', 'Critical Assets only (High criticality)'] },
        ]}
      />
    </div>
  )
}
