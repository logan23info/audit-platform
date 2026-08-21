import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const elements = [
  { clause: '6.1.1', title: 'General — Actions to Address Risks & Opportunities', color: 'border-l-steel-400',
    desc: 'Determine risks and opportunities that need to be addressed to ensure the ISMS achieves its intended outcomes.',
    items: [
      'Risks and opportunities identified from context (Cl. 4.1) and interested parties (Cl. 4.2)',
      'Actions planned to address identified risks and opportunities',
      'Actions integrated into ISMS processes',
      'Effectiveness of actions evaluated',
    ], artifact: 'Risk & Opportunity Register' },
  { clause: '6.1.2', title: 'Information Security Risk Assessment', color: 'border-l-red-500',
    desc: 'Define and apply a risk assessment process to identify, analyse, and evaluate IS risks.',
    items: [
      'Risk assessment criteria established — risk acceptance and evaluation criteria',
      'Risk assessment methodology consistent and reproducible',
      'IS risks identified using Asset × Threat × Vulnerability approach (ISO 27005)',
      'Risk owners assigned to each identified risk',
      'Inherent likelihood and impact assessed on defined scale (e.g. 1–5)',
      'Risk level determined: inherent score = likelihood × impact',
      'Controls applied documented — mapped to ISO 27002 Annex A',
      'Residual risk calculated after controls applied',
      'Residual risk compared to risk acceptance criteria',
      'Risk assessment results documented and retained',
      'Risk assessment repeated at planned intervals (minimum annually)',
      'Risk assessment triggered by significant changes',
    ], artifact: 'Risk Assessment Results (see ISO 27005 → Risk Register ⭐)' },
  { clause: '6.1.3', title: 'Information Security Risk Treatment', color: 'border-l-emerald-500',
    desc: 'Select and implement risk treatment options. Produce a Statement of Applicability for all 93 Annex A controls.',
    items: [
      'Risk treatment options selected: Mitigate, Accept, Transfer, Avoid',
      'Controls selected from ISO 27002 Annex A where applicable',
      'Statement of Applicability (SoA) produced — all 93 controls addressed',
      'SoA documents: applicable controls, justification for inclusion/exclusion',
      'SoA reviewed and updated when risk assessment results change',
      'Risk treatment plan produced with owners, timelines, and status',
      'Residual risk after treatment accepted by authorised risk owners',
      'Risk treatment results documented and retained',
    ], artifact: 'Statement of Applicability (SoA) + Risk Treatment Plan', soaLink: true },
  { clause: '6.2', title: 'Information Security Objectives & Planning', color: 'border-l-amber-500',
    desc: 'Establish measurable IS objectives at relevant functions and levels, and plan how to achieve them.',
    items: [
      'IS objectives consistent with the information security policy',
      'Objectives are SMART — Specific, Measurable, Achievable, Relevant, Time-bound',
      'Objectives communicated to relevant personnel',
      'IS objectives monitored and progress reported quarterly',
      'Plans documented: what, who, when, resources, evaluation method',
      'Objectives updated when context or risks change',
      'Objectives aligned to risk treatment outcomes',
      'Objectives reviewed at management review (Cl. 9.3)',
    ], artifact: 'IS Objectives Register' },
  { clause: '6.3', title: 'Planning of Changes', color: 'border-l-purple-500',
    desc: 'When the organisation determines the need for changes to the ISMS, carry out changes in a planned manner.',
    items: [
      'Planned ISMS changes documented before implementation',
      'Purpose of change documented — why the change is needed',
      'Potential consequences of change assessed',
      'ISMS integrity maintained throughout the change',
      'Resources available for the change confirmed',
      'Change responsibilities assigned',
    ], artifact: 'ISMS Change Record' },
]

export default function ISO27001Clause6() {
  const navigate = useNavigate()
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 27001:2022" clause="Clause 6" title="Planning — Risk Assessment & SoA"
        description="Clause 6 is the heart of the ISMS — risk assessment, risk treatment, and the Statement of Applicability. The SoA lists all 93 Annex A controls with applicability justification. IS objectives must be SMART and measurable."
        badges={['Risk Assessment', 'SoA', 'TOD', 'TOI']} />
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
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-steel-400">Key Artifact:</span>
                  <span className="badge badge-amber text-xs">{el.artifact}</span>
                  {el.soaLink && (
                    <button onClick={() => navigate('/iso27001/soa')}
                      className="inline-flex items-center gap-1 text-xs text-amber-audit hover:text-amber-300 transition-colors">
                      Open SoA Builder <ArrowRight size={11} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card mb-6 bg-blue-900/10 border-blue-800/40">
        <div className="text-xs font-semibold text-blue-400 mb-2">SoA Builder — ISO 27001 Cl. 6.1.3</div>
        <p className="text-xs text-steel-300 mb-3 leading-relaxed">The Statement of Applicability requires all 93 Annex A controls to be listed with a decision (Applicable/Not Applicable) and justification. Use the built-in SoA Builder to complete this interactively and export to CSV for your certification body.</p>
        <button onClick={() => navigate('/iso27001/soa')} className="btn-primary text-xs">
          Open SoA Builder <ArrowRight size={12} />
        </button>
      </div>
      <AIPanel title="Generate Clause 6 Artifacts"
        systemPrompt="You are an ISO 27001:2022 Clause 6 planning specialist. Generate risk assessment frameworks, risk treatment plans, IS objectives registers, and SoA justifications. Align risk assessment methodology to ISO 27005. Include worked examples. Produce certification-ready documentation."
        placeholder="e.g. Generate a risk treatment plan for 5 high-rated risks in a cloud-native organisation"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. SaaS platform, AWS, 300 staff, SOC2 + ISO 27001' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Risk Assessment Framework', 'Risk Treatment Plan', 'IS Objectives Register', 'SoA Executive Summary', 'Risk Acceptance Record', 'ISMS Change Record Template', 'Risk Assessment Criteria Document'] },
        ]} />
    </div>
  )
}
