import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2, TrendingUp } from 'lucide-react'

const elements = [
  { clause: '9.1', title: 'Monitoring, Measurement, Analysis & Evaluation', color: 'border-l-blue-500',
    desc: 'Determine what to monitor, how to measure it, when to analyse results, and who is responsible.',
    items: ['Information security objectives defined and measurable', 'KPIs defined per ISO 27004 — availability, patch compliance, incident response time', 'Monitoring methods documented and applied consistently', 'Results analysed and evaluated at defined intervals', 'Evidence of monitoring and measurement retained', 'Trends reported to management with root cause analysis', 'Metrics dashboard maintained and reviewed quarterly', 'Monitoring results feed into management review'], artifact: 'IS Metrics Dashboard (ISO 27004)' },
  { clause: '9.2', title: 'Internal Audit', color: 'border-l-amber-500',
    desc: 'Conduct internal audits at planned intervals to determine ISMS conformity and effective implementation.',
    items: ['Audit programme planned — frequency based on risk and previous results', 'Audit scope, criteria, and methods defined before each audit', 'Auditors selected to ensure objectivity and impartiality (independence)', 'Audit conducted per ISO 19011 methodology (TOD → TOI → TOE)', 'Audit findings reported to relevant management promptly', 'Corrective actions taken without undue delay', 'Audit results reported to top management', 'Audit programme records retained as documented information'], artifact: 'Internal Audit Programme + Audit Reports' },
  { clause: '9.3', title: 'Management Review', color: 'border-l-emerald-500',
    desc: 'Top management must review the ISMS at planned intervals to ensure continuing suitability, adequacy, and effectiveness.',
    inputs: ['Results of previous management review actions', 'Changes affecting the ISMS (internal/external context)', 'Information security performance — incidents, metrics, objectives', 'Results of risk assessment and risk treatment plan status', 'Audit results — internal and external', 'Feedback from interested parties', 'Opportunities for continual improvement', 'Resource adequacy assessment'],
    outputs: ['Decisions on continual improvement opportunities', 'Any changes to the ISMS needed', 'Resource requirements for next period', 'Actions to address risks above appetite'],
    items: ['Management review scheduled at planned intervals (minimum annually)', 'All mandatory inputs addressed per Cl. 9.3.2', 'Top management present and participating', 'Outputs documented and actioned per Cl. 9.3.3', 'Meeting minutes retained as documented information', 'Actions from review tracked to completion'],
    artifact: 'Management Review Minutes + Action Register' },
  { clause: '9.4', title: 'Information Security Objectives', color: 'border-l-purple-500',
    desc: 'Establish, maintain, and communicate measurable information security objectives aligned to the IS Policy.',
    items: ['IS objectives established at relevant functions and levels', 'Objectives are SMART — Specific, Measurable, Achievable, Relevant, Time-bound', 'Objectives consistent with the information security policy', 'Objectives communicated to relevant personnel', 'Objectives monitored and progress reported', 'Objectives updated when context or risks change', 'Resources needed to achieve objectives identified and allocated', 'Documented information on objectives retained'], artifact: 'IS Objectives Register' },
]

export default function ISO27001Clause9() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Clause 9"
        title="Performance Evaluation"
        description="Clause 9 requires the organisation to monitor, measure, analyse, and evaluate ISMS performance — through KPIs, internal audits per ISO 19011, and regular management review with all mandatory inputs and outputs."
        badges={['Performance', 'ISO 27004', 'TOE']}
      />
      <div className="space-y-4 mb-6">
        {elements.map(el => (
          <div key={el.clause} className={`card border-l-4 ${el.color}`}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="clause-tag flex-shrink-0 self-start">{el.clause}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1">{el.title}</h3>
                <p className="text-sm text-steel-300 mb-3 leading-relaxed">{el.desc}</p>
                {el.inputs && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div className="bg-navy-800 rounded-lg p-3">
                      <div className="text-xs font-semibold text-blue-400 mb-2">Mandatory Inputs (Cl. 9.3.2)</div>
                      {el.inputs.map(i => <div key={i} className="flex items-start gap-1.5 mb-1"><CheckCircle2 size={11} className="text-blue-400 flex-shrink-0 mt-0.5" /><span className="text-xs text-steel-300">{i}</span></div>)}
                    </div>
                    <div className="bg-navy-800 rounded-lg p-3">
                      <div className="text-xs font-semibold text-emerald-400 mb-2">Required Outputs (Cl. 9.3.3)</div>
                      {el.outputs.map(o => <div key={o} className="flex items-start gap-1.5 mb-1"><CheckCircle2 size={11} className="text-emerald-audit flex-shrink-0 mt-0.5" /><span className="text-xs text-steel-300">{o}</span></div>)}
                    </div>
                  </div>
                )}
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

      <AIPanel
        title="Generate Clause 9 Artifacts"
        systemPrompt="You are an ISO 27001:2022 Clause 9 performance evaluation specialist. Generate professional performance measurement, audit, and management review artifacts. Align to ISO 27004 for metrics. Include all mandatory inputs and outputs for management review per Cl. 9.3.2 and 9.3.3. Reference ISO 19011 for internal audit requirements."
        placeholder="e.g. Generate an IS metrics dashboard with 10 KPIs per ISO 27004 for a cloud-based organisation"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. Insurance company, hybrid cloud, 1000 staff' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['IS Metrics Dashboard (ISO 27004)', 'Management Review Agenda', 'Management Review Minutes Template', 'IS Objectives Register', 'Internal Audit Programme', 'Performance Evaluation Report'] },
          { id: 'period', label: 'Review Period', type: 'text', placeholder: 'e.g. Q4 2025 — January to December 2025' },
        ]}
      />
    </div>
  )
}
