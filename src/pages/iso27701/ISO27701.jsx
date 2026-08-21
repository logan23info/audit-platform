import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const clauses = [
  {
    clause: '5 — PIMS-Specific Requirements', color: 'border-l-blue-500',
    desc: 'ISO 27701 extends ISO 27001 Clause 4-10 with privacy-specific requirements. All ISO 27001 clauses apply — plus these PIMS additions.',
    items: [
      'Understand privacy-specific context: PII processing activities, regulatory landscape (GDPR, CCPA)',
      'Identify interested parties with privacy interests — data subjects, regulators (ICO, DPA)',
      'Extend ISMS scope to include PII processing activities and systems',
      'Privacy policy established and communicated to all relevant parties',
      'Privacy roles assigned: Data Protection Officer (DPO), Privacy Lead',
      'Privacy objectives aligned with data protection legal requirements',
      'Privacy risks included in risk assessment — data breach, regulatory non-compliance',
      'Privacy controls selected from Annex A (controller) and Annex B (processor)',
    ], artifact: 'PIMS Scope Statement + Privacy Policy' },
  {
    clause: '6 — Privacy Risk Assessment', color: 'border-l-red-500',
    desc: 'Extend ISO 27001 risk assessment to include privacy risks — likelihood and impact of PII processing activities on data subjects.',
    items: [
      'Privacy Impact Assessment (PIA/DPIA) process documented and applied',
      'DPIA mandatory for high-risk processing (large-scale, systematic, sensitive data)',
      'PII processing activities inventoried — Record of Processing Activities (RoPA)',
      'Legal basis for each processing activity documented',
      'Data subject rights mapped to processing activities',
      'Third-party processor agreements include data protection requirements',
      'Privacy risks evaluated: confidentiality breach, unlawful processing, data subject harm',
      'Privacy risk treatment controls selected from Annex A/B',
    ], artifact: 'DPIA Register + Record of Processing Activities (RoPA)' },
  {
    clause: 'Annex A — Controller Controls', color: 'border-l-emerald-500',
    desc: 'Additional controls for organisations acting as PII Controllers — determining purposes and means of processing.',
    items: [
      'A.7.2 — Lawful basis for PII processing documented per activity', 
      'A.7.3 — Consent mechanism records maintained where consent is legal basis',
      'A.7.4 — Privacy notice provided to data subjects at collection point',
      'A.7.5 — Privacy by design applied to new systems and processes',
      'A.7.6 — Data minimisation — only necessary PII collected',
      'A.7.7 — Data retention limits applied — deletion on expiry',
      'A.7.8 — Data subject rights fulfilled: access, rectification, erasure, portability',
      'A.7.9 — Automated decision-making documented and human review available',
    ], artifact: 'Privacy Notice + Consent Records + DSR Log' },
  {
    clause: 'Annex B — Processor Controls', color: 'border-l-purple-500',
    desc: 'Additional controls for organisations acting as PII Processors — processing PII on behalf of controllers.',
    items: [
      'B.8.1 — Processing only on documented controller instructions',
      'B.8.2 — Organisation\'s privacy interests considered in processing agreements',
      'B.8.3 — Privacy contact point established for data subjects',
      'B.8.4 — Controller\'s PIA process supported where requested',
      'B.8.5 — Sub-processor agreements include same data protection obligations',
      'B.8.6 — International data transfers documented and compliant',
      'B.8.7 — PII breach notification to controller within defined timeframe',
      'B.8.8 — Support provided to controller for data subject rights fulfilment',
    ], artifact: 'Data Processing Agreement (DPA) + Sub-processor Register' },
]

const gdprMapping = [
  { gdpr: 'Art. 5 — Data Protection Principles', iso27701: '5.2, A.7.2, A.7.6', req: 'Lawfulness, fairness, transparency, purpose limitation, minimisation, accuracy, storage limits, integrity' },
  { gdpr: 'Art. 6 — Lawful Basis', iso27701: 'A.7.2', req: 'Document legal basis per processing activity in RoPA' },
  { gdpr: 'Art. 12-22 — Data Subject Rights', iso27701: 'A.7.8', req: 'Access, rectification, erasure, restriction, portability, objection — processes and SLAs' },
  { gdpr: 'Art. 25 — Privacy by Design', iso27701: 'A.7.5', req: 'Data protection built into systems and processes by default' },
  { gdpr: 'Art. 30 — Records of Processing', iso27701: '6.1.2, A.7.1', req: 'Maintain RoPA for all processing activities — mandatory for 250+ employees' },
  { gdpr: 'Art. 32 — Security of Processing', iso27701: 'ISO 27001 Cl.8', req: 'Appropriate technical and organisational measures — encryption, pseudonymisation, access control' },
  { gdpr: 'Art. 33-34 — Breach Notification', iso27701: 'A.9.1, B.8.7', req: '72-hour notification to supervisory authority, notification to data subjects for high-risk breaches' },
  { gdpr: 'Art. 35 — DPIA', iso27701: '6.1.2', req: 'Mandatory for high-risk processing — large scale, systematic monitoring, sensitive data' },
  { gdpr: 'Art. 37 — DPO', iso27701: '5.3', req: 'DPO mandatory for public bodies, large-scale systematic monitoring, or sensitive data processing' },
  { gdpr: 'Art. 44-49 — Data Transfers', iso27701: 'B.8.6', req: 'Adequacy decision, SCCs, BCRs, or derogations required for international transfers' },
]

export default function ISO27701() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 27701:2019" clause="PIMS" title="ISO 27701 — Privacy Information Management"
        description="ISO 27701 extends ISO 27001 and ISO 27002 with privacy-specific requirements for a Privacy Information Management System (PIMS). Covers both PII Controllers and Processors. Aligned to GDPR, CCPA, and global privacy regulations."
        badges={['ISO 27701', 'GDPR', 'Privacy', 'PIMS']} />

      <div className="card mb-6 bg-blue-900/10 border-blue-800/40">
        <div className="text-sm font-semibold text-blue-400 mb-2">ISO 27701 — Extension to ISO 27001</div>
        <p className="text-xs text-steel-300 leading-relaxed mb-3">ISO 27701 is not standalone — it extends ISO 27001. You must have an ISO 27001 ISMS in place first. ISO 27701 adds privacy-specific clauses to each ISO 27001 clause and provides two Annexes: Annex A for Controllers, Annex B for Processors.</p>
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          {[
            { label: 'Prerequisite', value: 'ISO 27001', color: 'text-blue-400' },
            { label: 'Controller Controls', value: 'Annex A', color: 'text-emerald-400' },
            { label: 'Processor Controls', value: 'Annex B', color: 'text-purple-400' },
          ].map(s => (
            <div key={s.label} className="bg-navy-800 rounded-lg p-3">
              <div className={`font-bold text-lg ${s.color}`}>{s.value}</div>
              <div className="text-steel-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {clauses.map(cl => (
          <div key={cl.clause} className={`card border-l-4 ${cl.color}`}>
            <div className="flex flex-col sm:flex-row gap-3">
              <span className="clause-tag flex-shrink-0 self-start">{cl.clause.split(' ')[0]}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1">{cl.clause}</h3>
                <p className="text-sm text-steel-300 mb-3 leading-relaxed">{cl.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                  {cl.items.map(i => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-emerald-audit flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-steel-300 leading-snug">{i}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-steel-400">Key Artifact:</span>
                  <span className="badge badge-amber text-xs">{cl.artifact}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mb-6">
        <h2 className="section-title mb-3">GDPR → ISO 27701 Mapping</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b border-navy-700 bg-navy-800/50">
              {['GDPR Article', 'ISO 27701 Clause', 'Requirement'].map(h => (
                <th key={h} className="text-left py-2.5 px-3 text-steel-400 font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {gdprMapping.map((r, i) => (
                <tr key={r.gdpr} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                  <td className="py-2.5 px-3 text-blue-400 font-medium whitespace-nowrap">{r.gdpr}</td>
                  <td className="py-2.5 px-3 text-amber-audit font-mono whitespace-nowrap">{r.iso27701}</td>
                  <td className="py-2.5 px-3 text-steel-300 leading-snug">{r.req}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AIPanel title="Generate ISO 27701 / Privacy Artifacts"
        systemPrompt="You are an ISO 27701:2019 and GDPR privacy specialist. Generate privacy documentation including DPIAs, Record of Processing Activities (RoPA), privacy notices, data subject rights procedures, data processing agreements, and PIMS gap assessments. Align to ISO 27701, GDPR, and UK GDPR requirements."
        placeholder="e.g. Generate a DPIA for a new AI-powered customer analytics system processing EU resident data"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. UK fintech, processing EU customer data, 50,000 data subjects' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['DPIA Template', 'Record of Processing Activities (RoPA)', 'Privacy Notice', 'Data Subject Rights Procedure', 'Data Processing Agreement', 'PIMS Gap Assessment', 'Consent Management Procedure', 'Data Breach Response Plan', 'DPO Role Description', 'International Transfer Assessment'] },
          { id: 'role', label: 'Organisation Role', type: 'select', options: ['Controller only', 'Processor only', 'Both Controller and Processor', 'Joint Controller'] },
        ]} />
    </div>
  )
}
