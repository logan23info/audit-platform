import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

// ── Shared render helper ─────────────────────────────────
function ClauseSection({ elements, evidenceItems }) {
  return (
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
      {evidenceItems && (
        <div className="card">
          <h2 className="section-title mb-3">Evidence Required</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {evidenceItems.map((e, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-amber-audit font-mono text-xs flex-shrink-0">{String(i+1).padStart(2,'0')}.</span>
                <span className="text-xs text-steel-300 leading-snug">{e}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── ISO 9001 Clause 5 — Leadership ───────────────────────
export function ISO9001Clause5() {
  const elements = [
    { clause: '5.1', title: 'Leadership & Commitment — Quality', color: 'border-l-emerald-500',
      desc: 'Top management must demonstrate leadership and commitment to the QMS — actively promoting customer focus and quality culture.',
      items: ['Quality policy established and approved by top management', 'QMS integrated into business processes — not a standalone quality function', 'Customer focus promoted — customer requirements understood and met', 'Risk-based thinking embedded across QMS processes', 'Resources provided for the QMS (budget, people, tools)', 'Quality objectives aligned with business strategy'],
      artifact: 'Quality Management Commitment Evidence' },
    { clause: '5.2', title: 'Quality Policy', color: 'border-l-blue-500',
      desc: 'Establish a quality policy appropriate to the organisation\'s context and supporting the QMS strategic direction.',
      items: ['Appropriate to purpose and context of the organisation', 'Provides framework for quality objectives', 'Commitment to satisfy applicable requirements', 'Commitment to continual improvement of QMS', 'Communicated to all employees and relevant parties', 'Reviewed and updated at planned intervals'],
      artifact: 'Quality Policy (signed by top management)' },
    { clause: '5.3', title: 'Roles, Responsibilities & Authorities', color: 'border-l-purple-500',
      desc: 'Assign and communicate QMS roles — ensuring conformity to requirements and performance reporting to top management.',
      items: ['Quality Manager / Management Representative formally designated', 'QMS roles documented in job descriptions and RACI', 'Responsibility for QMS conformity assigned to named role', 'Reporting to top management on QMS performance assigned', 'Roles communicated to all relevant personnel', 'Customer focus responsibility assigned across all levels'],
      artifact: 'QMS RACI Matrix' },
  ]
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 9001:2015" clause="Clause 5" title="Leadership — Quality Management"
        description="Clause 5 requires demonstrable top management leadership of the QMS — active quality culture, formal policy, measurable objectives, and clearly assigned roles with authority."
        badges={['QMS Leadership', 'TOD', 'TOI']} />
      <ClauseSection elements={elements} evidenceItems={['Quality policy with top management signature', 'QMS RACI matrix with named role-holders', 'Evidence of customer focus (CSAT, complaints process)', 'Management review records showing quality discussion', 'Quality objectives with measurable targets']} />
      <AIPanel title="Generate Clause 5 QMS Artifacts"
        systemPrompt="You are an ISO 9001:2015 Clause 5 leadership specialist. Generate quality policies, RACI matrices, and management commitment evidence. Align to ISO 9001:2015 Clause 5 requirements including customer focus and quality culture."
        placeholder="e.g. Generate a Quality Policy for a software development company targeting ISO 9001 certification"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. Software company, 100 staff, B2B SaaS' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Quality Policy', 'QMS RACI Matrix', 'Management Commitment Statement', 'Customer Focus Procedure', 'Quality Objectives Framework'] },
        ]} />
    </div>
  )
}

// ── ISO 9001 Clause 7 — Support ──────────────────────────
export function ISO9001Clause7() {
  const elements = [
    { clause: '7.1', title: 'Resources', color: 'border-l-blue-500',
      desc: 'Provide resources needed for establishing, implementing, maintaining, and continually improving the QMS.',
      items: ['People: adequate staffing with appropriate competence', 'Infrastructure: buildings, equipment, software, IT systems', 'Environment: physical, social, psychological work conditions', 'Monitoring resources: calibrated measurement equipment', 'Organisational knowledge: lessons learned, documented processes'],
      artifact: 'QMS Resource Plan' },
    { clause: '7.2', title: 'Competence', color: 'border-l-purple-500',
      desc: 'Determine required competence, ensure persons are competent, and retain evidence.',
      items: ['Competence requirements defined per quality-impacting role', 'Current competence assessed against requirements', 'Training provided where gaps identified', 'Training records maintained (course, date, result)', 'Effectiveness of training evaluated', 'Qualifications and certifications tracked'],
      artifact: 'QMS Competence Register & Training Records' },
    { clause: '7.3', title: 'Awareness', color: 'border-l-emerald-500',
      desc: 'All staff must be aware of the quality policy, their contribution, and the implications of non-conformity.',
      items: ['Quality policy communicated to all staff', 'Quality objectives communicated to relevant functions', 'Staff aware of their contribution to QMS effectiveness', 'Non-conformity consequences communicated', 'Customer impact of individual roles understood'],
      artifact: 'Quality Awareness Training Records' },
    { clause: '7.4', title: 'Communication', color: 'border-l-amber-500',
      desc: 'Determine internal and external quality communications — what, when, with whom, how.',
      items: ['Communication plan for QMS topics documented', 'Internal: quality updates, metrics, corrective actions, policy changes', 'External: customer notifications, regulatory communications', 'Communication channels identified and used consistently'],
      artifact: 'QMS Communication Plan' },
    { clause: '7.5', title: 'Documented Information', color: 'border-l-red-500',
      desc: 'Create, update, and control documented information required by ISO 9001 and necessary for effective QMS operation.',
      items: ['Document control procedure: creation, approval, version control, distribution', 'All mandatory ISO 9001 documented information maintained', 'Current versions available at point of use', 'External origin documents identified and controlled', 'Obsolete documents removed from circulation', 'Calibration records and quality records retained per defined periods'],
      artifact: 'Document Control Procedure + QMS Document Register' },
  ]
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 9001:2015" clause="Clause 7" title="Support — QMS Infrastructure"
        description="Clause 7 covers QMS support infrastructure — adequate resources including calibrated equipment, competent and trained people, quality awareness, structured communication, and rigorous document control."
        badges={['QMS Support', 'TOD', 'TOI']} />
      <ClauseSection elements={elements} evidenceItems={['Equipment calibration records and schedule', 'Competence register with training completion records', 'Quality awareness training attendance records', 'Document register with version history', 'QMS communication plan and evidence of use']} />
      <AIPanel title="Generate Clause 7 QMS Artifacts"
        systemPrompt="You are an ISO 9001:2015 Clause 7 support specialist. Generate competence registers, quality awareness training content, document control procedures, and communication plans. Align to ISO 9001:2015 Clause 7 requirements."
        placeholder="e.g. Generate a document control procedure for a manufacturing company"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. Manufacturing, 300 staff, automotive supply chain' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Document Control Procedure', 'QMS Competence Register', 'Calibration Schedule Template', 'Quality Awareness Programme', 'QMS Communication Plan'] },
        ]} />
    </div>
  )
}

// ── ISO 9001 Clause 8 — Operations ───────────────────────
export function ISO9001Clause8() {
  const elements = [
    { clause: '8.1', title: 'Operational Planning & Control', color: 'border-l-blue-500',
      desc: 'Plan, implement, control, and maintain processes for product/service provision.',
      items: ['Quality criteria defined for processes and products/services', 'Resources determined and provided', 'Process controls implemented and monitored', 'Documented information retained as evidence of conformity', 'Changes controlled and reviewed for impact', 'Outsourced processes identified and controlled'],
      artifact: 'Quality Plan / Process Control Records' },
    { clause: '8.2', title: 'Customer Requirements', color: 'border-l-emerald-500',
      desc: 'Determine, review, and meet customer requirements including statutory and regulatory requirements.',
      items: ['Customer requirements determined before commitment', 'Organisation ability to meet requirements confirmed', 'Requirements documented and communicated to relevant staff', 'Changes to requirements communicated and records updated', 'Customer communication maintained throughout delivery', 'Post-delivery obligations (warranty, support) addressed'],
      artifact: 'Customer Requirements Review Record' },
    { clause: '8.4', title: 'Supplier & External Provider Control', color: 'border-l-purple-500',
      desc: 'Control externally provided processes, products, and services that affect conformity.',
      items: ['Approved supplier list maintained with evaluation criteria', 'Supplier qualification process documented and applied', 'Supplier performance monitored — audits, scorecards, reviews', 'Contractual quality requirements included in supplier agreements', 'Incoming inspection or verification of externally provided items', 'Supplier non-conformances tracked and resolved'],
      artifact: 'Approved Supplier List + Supplier Evaluation Records' },
    { clause: '8.5', title: 'Production & Service Provision', color: 'border-l-amber-500',
      desc: 'Control conditions for product/service provision — traceability, customer property, preservation, post-delivery.',
      items: ['Controlled conditions for production/service delivery documented', 'Product/service identification and traceability maintained', 'Customer property identified, protected, and safeguarded', 'Preservation of outputs during production and delivery', 'Post-delivery activities defined (warranty, maintenance, recycling)', 'Control of changes to production/service documented'],
      artifact: 'Production/Service Control Records' },
    { clause: '8.7', title: 'Nonconforming Outputs', color: 'border-l-red-500',
      desc: 'Identify and control nonconforming products/services to prevent unintended use or delivery.',
      items: ['Nonconforming outputs identified and segregated', 'Disposition decisions made: correct, accept with concession, reject', 'Disposition authorised by competent personnel', 'Customer notified where nonconforming product delivered', 'Corrective action taken to prevent recurrence', 'Nonconformance records retained'],
      artifact: 'Nonconformance Register' },
  ]
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 9001:2015" clause="Clause 8" title="Operations — Product & Service Delivery"
        description="Clause 8 covers all operational processes — from understanding customer requirements through production/service delivery, supplier control, and managing nonconforming outputs."
        badges={['QMS Operations', 'TOI', 'TOE']} />
      <ClauseSection elements={elements} evidenceItems={['Quality plans and process control records', 'Customer requirements review records', 'Approved supplier list and evaluation records', 'Production/service records with traceability', 'Nonconformance register with dispositions', 'Incoming inspection records']} />
      <AIPanel title="Generate Clause 8 QMS Artifacts"
        systemPrompt="You are an ISO 9001:2015 Clause 8 operations specialist. Generate quality plans, customer requirements procedures, supplier evaluation frameworks, production control records, and nonconformance registers."
        placeholder="e.g. Generate a supplier evaluation procedure for a software company with 50 key vendors"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. Professional services firm, 200 staff' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Quality Plan Template', 'Customer Requirements Procedure', 'Supplier Evaluation Criteria', 'Approved Supplier List Template', 'Nonconformance Register', 'Production Control Checklist'] },
        ]} />
    </div>
  )
}

// ── ISO 9001 Clause 9 — Performance ──────────────────────
export function ISO9001Clause9() {
  const elements = [
    { clause: '9.1', title: 'Monitoring, Measurement & Analysis', color: 'border-l-blue-500',
      desc: 'Monitor and measure processes, products/services, and customer satisfaction. Analyse and evaluate results.',
      items: ['Quality KPIs defined and monitored: defect rate, OTIF, CSAT, complaints', 'Customer satisfaction measured — surveys, NPS, complaint analysis', 'Process performance measured against defined criteria', 'Product/service conformity measured at defined checkpoints', 'Analysis results used to evaluate QMS effectiveness', 'Data analysis feeds into management review and improvement'],
      artifact: 'Quality KPI Dashboard + Customer Satisfaction Data' },
    { clause: '9.2', title: 'Internal Audit', color: 'border-l-amber-500',
      desc: 'Conduct internal audits per ISO 19011 to determine QMS conformity and effective implementation.',
      items: ['Audit programme planned based on process importance and previous results', 'Auditor independence from auditee maintained', 'Audit scope, criteria, and methods defined per audit', 'Findings reported to relevant management promptly', 'Corrective actions taken without undue delay', 'Audit programme records retained'],
      artifact: 'QMS Internal Audit Programme + Audit Reports' },
    { clause: '9.3', title: 'Management Review', color: 'border-l-emerald-500',
      desc: 'Top management reviews QMS at planned intervals to ensure continuing suitability, adequacy, and effectiveness.',
      items: ['Review includes: previous actions, changes, quality performance, customer feedback', 'Customer satisfaction trends reviewed', 'Process performance and product conformity reviewed', 'Supplier performance reviewed', 'Improvement opportunities identified and resourced', 'Management review minutes retained as documented information'],
      artifact: 'QMS Management Review Minutes + Action Register' },
  ]
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 9001:2015" clause="Clause 9" title="Performance Evaluation — QMS Measurement"
        description="Clause 9 requires monitoring customer satisfaction, measuring process and product performance, conducting internal audits per ISO 19011, and formal management review with documented outputs."
        badges={['QMS Performance', 'TOE']} />
      <ClauseSection elements={elements} evidenceItems={['Quality KPI reports (monthly/quarterly)', 'Customer satisfaction survey results and trends', 'Internal audit reports and corrective actions', 'Management review minutes with attendees and decisions', 'Complaint log with resolution records']} />
      <AIPanel title="Generate Clause 9 QMS Artifacts"
        systemPrompt="You are an ISO 9001:2015 Clause 9 performance specialist. Generate quality KPI dashboards, customer satisfaction measurement procedures, management review agendas, and internal audit programmes."
        placeholder="e.g. Generate a QMS management review agenda with all mandatory inputs for a professional services firm"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. IT consultancy, 150 staff' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Quality KPI Dashboard', 'Customer Satisfaction Procedure', 'QMS Management Review Agenda', 'Internal Audit Programme', 'Management Review Minutes Template', 'Quality Performance Report'] },
        ]} />
    </div>
  )
}

// ── ISO 9001 Clause 10 — Improvement ─────────────────────
export function ISO9001Clause10() {
  const elements = [
    { clause: '10.1', title: 'General — Continual Improvement', color: 'border-l-emerald-500',
      desc: 'Determine and select opportunities for improvement to meet customer requirements and enhance satisfaction.',
      items: ['Improvement opportunities identified from: audits, customer feedback, metrics, management review', 'Improvements prioritised by impact on customer satisfaction and quality', 'Improvement actions documented, owned, and tracked', 'Results of improvements evaluated', 'Successful improvements embedded into QMS processes', 'Improvement programme presented at management review'],
      artifact: 'Continual Improvement Register' },
    { clause: '10.2', title: 'Nonconformity & Corrective Action', color: 'border-l-red-500',
      desc: 'React to nonconformities, control and correct them, evaluate root cause, and take action to prevent recurrence.',
      items: ['Nonconformities identified from: customer complaints, internal audit, inspection, returns', 'Immediate containment action taken — stop, contain, notify', 'Root cause analysis conducted: 5-Why, Ishikawa, Pareto', 'Corrective action addresses root cause — not just the symptom', 'Similar processes reviewed for same potential nonconformity', 'Effectiveness of corrective action verified after implementation', 'Nonconformity and CA records retained as documented information', 'ISMS/QMS updated where necessary to prevent recurrence'],
      artifact: 'Corrective Action Register' },
    { clause: '10.3', title: 'Continual Improvement', color: 'border-l-blue-500',
      desc: 'Continually improve the suitability, adequacy, and effectiveness of the QMS.',
      items: ['Analysis of data identifies systemic improvement opportunities', 'Lessons learned from nonconformities shared across relevant processes', 'Benchmarking against industry peers used to drive improvement', 'Innovation in processes and products/services encouraged', 'Customer feedback cycle embedded — feedback → action → verification'],
      artifact: 'QMS Improvement Programme' },
  ]
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 9001:2015" clause="Clause 10" title="Improvement — Nonconformity & CAPA"
        description="Clause 10 requires reaction to nonconformities with root cause analysis and corrective action, and systematic continual improvement of QMS effectiveness. All CAPAs tracked to verified closure."
        badges={['QMS Improvement', 'CAPA', 'TOE']} />
      <ClauseSection elements={elements} evidenceItems={['Corrective action register with root cause and status', 'Nonconformance reports with disposition records', 'Customer complaint log with resolution evidence', 'Continual improvement register', 'Evidence of CAPA effectiveness review']} />
      <AIPanel title="Generate Clause 10 QMS Artifacts"
        systemPrompt="You are an ISO 9001:2015 Clause 10 improvement specialist. Generate corrective action registers, root cause analysis workpapers (5-Why, Ishikawa), continual improvement plans, and CAPA effectiveness reviews."
        placeholder="e.g. Generate a root cause analysis for repeated late delivery complaints using 5-Why methodology"
        contextFields={[
          { id: 'org', label: 'Organisation', type: 'text', placeholder: 'e.g. Product company, 200 staff' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Corrective Action Register', 'Root Cause Analysis (5-Why)', 'Ishikawa / Fishbone Template', 'CAPA Effectiveness Review', 'Continual Improvement Plan', 'Customer Complaint Procedure'] },
          { id: 'nc', label: 'Nonconformity / Issue', type: 'textarea', placeholder: 'Describe the nonconformity requiring CAPA...' },
        ]} />
    </div>
  )
}
