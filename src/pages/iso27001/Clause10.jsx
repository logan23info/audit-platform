import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const elements = [
  { clause: '10.1', title: 'Continual Improvement', desc: 'Continually improve the suitability, adequacy and effectiveness of the ISMS.', items: ['Improvement opportunities identified from audits', 'Management review outputs actioned', 'ISMS maturity progression tracked', 'Improvement actions documented and closed'], artifact: 'Continual Improvement Log' },
  { clause: '10.2', title: 'Nonconformity & Corrective Action (CAPA)', desc: 'When nonconformity occurs — react, evaluate root cause, and implement corrective action to prevent recurrence.', items: ['Nonconformity documented immediately', 'Immediate containment action taken', 'Root cause analysis performed (5-Why/Fishbone)', 'Corrective action implemented and effectiveness verified'], artifact: 'CAPA Register & Workflow' },
]

const capaSteps = [
  { step: '1. Identify', desc: 'Document the nonconformity — from audit, incident, or management review' },
  { step: '2. Contain', desc: 'Take immediate action to limit the impact or exposure' },
  { step: '3. Root Cause', desc: 'Apply 5-Why or fishbone analysis to identify the true root cause' },
  { step: '4. Corrective Action', desc: 'Design corrective action that addresses the root cause — not just the symptom' },
  { step: '5. Implement', desc: 'Assign owner, set target date, implement the corrective action' },
  { step: '6. Verify Effectiveness', desc: 'Test that the corrective action has resolved the issue and prevented recurrence' },
  { step: '7. Close', desc: 'Document closure evidence and close the CAPA in the register' },
]

export default function ISO27001Clause10() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="Clause 10"
        title="Improvement & CAPA"
        description="Clause 10 drives continual improvement of the ISMS — through formal nonconformity management, root cause analysis, and corrective action tracking."
        badges={['CAPA', 'Improvement', 'Audit Closure']}
      />
      <div className="space-y-4 mb-6">
        {elements.map(el => (
          <div key={el.clause} className="card border-l-4 border-l-pink-500">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="clause-tag flex-shrink-0 self-start">{el.clause}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1">{el.title}</h3>
                <p className="text-sm text-steel-300 mb-3 leading-relaxed">{el.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                  {el.items.map(i => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-pink-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-steel-300 leading-snug">{i}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-steel-400">Artifact:</span>
                  <span className="badge badge-crimson">{el.artifact}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card mb-6">
        <h2 className="section-title mb-4">CAPA Workflow — 7 Steps</h2>
        <div className="space-y-3">
          {capaSteps.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="w-7 h-7 rounded-full bg-pink-900/40 border border-pink-700 text-pink-300 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                {i < capaSteps.length - 1 && <div className="w-0.5 h-4 bg-navy-600 mt-1" />}
              </div>
              <div className="pb-3">
                <div className="text-sm font-semibold text-white mb-0.5">{s.step}</div>
                <div className="text-xs text-steel-300 leading-snug">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AIPanel
        title="Generate Clause 10 Artifacts"
        systemPrompt="You are an ISO 27001:2022 CAPA and continual improvement expert. Generate professional Clause 10 artifacts: CAPA registers, root cause analysis templates (5-Why and fishbone), corrective action workflows, nonconformity reports, and continual improvement logs. CAPA outputs must include all 7 steps from identification through effectiveness verification and formal closure."
        placeholder="e.g. Generate a CAPA for a High finding — User access reviews not performed for 7 accounts over 12 months"
        contextFields={[
          { id: 'finding', label: 'Nonconformity / Finding', placeholder: 'Describe the finding or nonconformity', type: 'text' },
          { id: 'root', label: 'Initial Root Cause Hypothesis', placeholder: 'e.g. No automated reminder, manual process failed', type: 'text' },
          { id: 'owner', label: 'CAPA Owner', placeholder: 'e.g. IT Security Manager', type: 'text' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Full CAPA Report', '5-Why Root Cause Analysis', 'Fishbone Diagram Worksheet', 'CAPA Register Template', 'Corrective Action Plan', 'Effectiveness Verification Checklist', 'Continual Improvement Log'] },
        ]}
      />
    </div>
  )
}
