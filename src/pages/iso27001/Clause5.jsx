import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2 } from 'lucide-react'

const elements = [
  { clause: '5.1', title: 'Leadership & Commitment', color: 'border-l-blue-500',
    desc: 'Top management must demonstrate leadership and commitment to the ISMS — not delegate it entirely.',
    items: [
      'IS policy established, approved, and signed by top management',
      'ISMS objectives aligned with strategic direction of the organisation',
      'ISMS integrated into business processes — not a standalone IT function',
      'Resources required for the ISMS provided (budget, people, tools)',
      'Continual improvement of the ISMS actively promoted',
      'IS roles with authority communicated to all relevant personnel',
      'Top management participates in management review (Cl. 9.3)',
      'Executive accountability for IS demonstrable — not just signed policy',
    ], artifact: 'Leadership Commitment Evidence (board minutes, IS policy sign-off)' },
  { clause: '5.2', title: 'Information Security Policy', color: 'border-l-emerald-500',
    desc: 'Establish a top-level IS policy that sets the direction, objectives, and commitment framework for the entire ISMS.',
    items: [
      'IS policy appropriate to the purpose and context of the organisation',
      'IS policy includes commitment to satisfy applicable IS requirements',
      'IS policy includes commitment to continual improvement of the ISMS',
      'IS objectives established (or framework for setting them) — Cl. 9.4',
      'IS policy communicated to all employees and relevant external parties',
      'IS policy available as documented information',
      'IS policy reviewed at planned intervals and when significant changes occur',
      'IS policy approved and signed by top management',
    ], artifact: 'Information Security Policy' },
  { clause: '5.3', title: 'Organisational Roles, Responsibilities & Authorities', color: 'border-l-purple-500',
    desc: 'Assign and communicate IS roles and responsibilities to ensure the ISMS conforms to requirements and performance is reported to top management.',
    items: [
      'CISO or equivalent role formally assigned with authority',
      'IS responsibilities documented in job descriptions and RACI matrix',
      'Responsibility for ISMS conformity assigned to named role',
      'Responsibility for ISMS performance reporting to top management assigned',
      'Roles communicated throughout the organisation',
      'Segregation of duties applied to conflicting IS responsibilities',
      'Third-party IS responsibilities documented in contracts and SLAs',
      'IS roles reviewed when organisational changes occur',
    ], artifact: 'IS RACI Matrix / IS Roles & Responsibilities Document' },
]

const leadershipTests = [
  { test: 'Does the IS policy have a recent top management signature?', phase: 'TOD' },
  { test: 'Is top management present at management review meetings?', phase: 'TOI' },
  { test: 'Are IS resources (budget, headcount) demonstrably provided?', phase: 'TOI' },
  { test: 'Does the CISO have authority to make IS decisions without business approval?', phase: 'TOI' },
  { test: 'Is IS discussed at board or executive level meetings?', phase: 'TOE' },
  { test: 'Has the IS policy been communicated to all staff? (training records)', phase: 'TOE' },
]

export default function ISO27001Clause5() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 27001:2022" clause="Clause 5" title="Leadership"
        description="Clause 5 requires visible, active leadership from top management — not just a signed policy. The CISO must have authority. IS must be integrated into business processes. Roles and responsibilities must be formally assigned and communicated."
        badges={['Leadership', 'TOD', 'TOI']} />
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
        <h2 className="section-title mb-3">Leadership Audit Tests</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b border-navy-700">{['Audit Test', 'Phase'].map(h => <th key={h} className="text-left py-2 px-3 text-steel-400 font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {leadershipTests.map((t, i) => (
                <tr key={i} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                  <td className="py-2.5 px-3 text-steel-300">{t.test}</td>
                  <td className="py-2.5 px-3"><span className={`badge text-xs ${t.phase === 'TOD' ? 'bg-blue-900/40 text-blue-300' : t.phase === 'TOI' ? 'bg-purple-900/40 text-purple-300' : 'bg-emerald-900/40 text-emerald-300'}`}>{t.phase}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AIPanel title="Generate Clause 5 Artifacts"
        systemPrompt="You are an ISO 27001:2022 Clause 5 leadership specialist. Generate formal IS policy documents, RACI matrices, role descriptions, and leadership commitment evidence. Ensure IS policy meets all Clause 5.2 requirements. RACI must cover all ISMS processes with clear accountability."
        placeholder="e.g. Generate a comprehensive Information Security Policy for a regulated financial services firm"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. Insurance company, 500 staff, Lloyd\'s regulated' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Information Security Policy', 'IS RACI Matrix', 'CISO Role Description', 'IS Roles & Responsibilities Document', 'Leadership Commitment Evidence Template', 'IS Policy Communication Record'] },
        ]} />
    </div>
  )
}
