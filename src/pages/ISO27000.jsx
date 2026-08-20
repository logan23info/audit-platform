import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'

const terms = [
  { term: 'Asset', definition: 'Anything that has value to the organisation. Information assets, software, physical equipment, services, and people.', ref: '3.2' },
  { term: 'Attack', definition: 'Attempt to destroy, expose, alter, disable, steal or gain unauthorised access to or make unauthorised use of an asset.', ref: '3.3' },
  { term: 'Audit', definition: 'Systematic, independent and documented process for obtaining audit evidence and evaluating it objectively.', ref: '3.4' },
  { term: 'Availability', definition: 'Property of being accessible and usable on demand by an authorised entity.', ref: '3.7' },
  { term: 'Competence', definition: 'Ability to apply knowledge and skills to achieve intended results.', ref: '3.10' },
  { term: 'Confidentiality', definition: 'Property that information is not made available or disclosed to unauthorised individuals, entities, or processes.', ref: '3.11' },
  { term: 'Conformity', definition: 'Fulfilment of a requirement.', ref: '3.12' },
  { term: 'Context of the organisation', definition: 'Combination of internal and external issues that can have an effect on an organisation\'s approach to developing and achieving its objectives.', ref: '3.13' },
  { term: 'Control', definition: 'Measure that maintains and/or modifies risk. Includes any process, policy, device, practice or other actions which modify risk.', ref: '3.14' },
  { term: 'Control objective', definition: 'Statement describing what is to be achieved as a result of implementing controls.', ref: '3.15' },
  { term: 'Corrective action', definition: 'Action to eliminate the cause of a nonconformity and to prevent recurrence.', ref: '3.16' },
  { term: 'Documented information', definition: 'Information required to be controlled and maintained by an organisation and the medium on which it is contained.', ref: '3.18' },
  { term: 'Effectiveness', definition: 'Extent to which planned activities are realised and planned results achieved.', ref: '3.19' },
  { term: 'Event', definition: 'Occurrence or change of a particular set of circumstances.', ref: '3.20' },
  { term: 'Governance of information security', definition: 'System by which an organisation\'s information security activities are directed and controlled.', ref: '3.22' },
  { term: 'Impact', definition: 'Change to objectives, adverse or beneficial, resulting from an event.', ref: '3.23' },
  { term: 'Information processing facility', definition: 'Any information processing system, service or infrastructure, or the physical locations housing it.', ref: '3.25' },
  { term: 'Information security', definition: 'Preservation of confidentiality, integrity and availability of information. In addition, other properties such as authenticity, accountability, non-repudiation, and reliability can also be involved.', ref: '3.26' },
  { term: 'Information security continuity', definition: 'Processes and procedures for ensuring continued information security operations.', ref: '3.27' },
  { term: 'Information security event', definition: 'Identified occurrence of a system, service or network state indicating a possible breach of information security policy or failure of controls.', ref: '3.28' },
  { term: 'Information security incident', definition: 'Single or a series of unwanted or unexpected information security events that have a significant probability of compromising business operations and threatening information security.', ref: '3.29' },
  { term: 'Information security incident management', definition: 'Set of processes for detecting, reporting, assessing, responding to, dealing with, and learning from information security incidents.', ref: '3.30' },
  { term: 'Information security management system (ISMS)', definition: 'Part of the overall management system, based on a business risk approach, to establish, implement, operate, monitor, review, maintain and improve information security.', ref: '3.31' },
  { term: 'Information security risk', definition: 'Potential that a given threat will exploit vulnerabilities of an asset or group of assets and thereby cause harm to the organisation.', ref: '3.32' },
  { term: 'Integrity', definition: 'Property of accuracy and completeness.', ref: '3.36' },
  { term: 'Interested party (stakeholder)', definition: 'Person or organisation that can affect, be affected by, or perceive itself to be affected by a decision or activity.', ref: '3.37' },
  { term: 'Likelihood', definition: 'Chance of something happening.', ref: '3.39' },
  { term: 'Management system', definition: 'Set of interrelated or interacting elements of an organisation to establish policies and objectives and processes to achieve those objectives.', ref: '3.41' },
  { term: 'Monitoring', definition: 'Determining the status of a system, a process or an activity.', ref: '3.45' },
  { term: 'Nonconformity', definition: 'Non-fulfilment of a requirement.', ref: '3.46' },
  { term: 'Objective', definition: 'Result to be achieved. Can be strategic, tactical, or operational.', ref: '3.47' },
  { term: 'Policy', definition: 'Intentions and direction of an organisation, as formally expressed by its top management.', ref: '3.50' },
  { term: 'Process', definition: 'Set of interrelated or interacting activities that transforms inputs into outputs.', ref: '3.51' },
  { term: 'Residual risk', definition: 'Risk remaining after risk treatment.', ref: '3.54' },
  { term: 'Risk', definition: 'Effect of uncertainty on objectives. Often characterised by reference to potential events and consequences, or a combination of these.', ref: '3.55' },
  { term: 'Risk acceptance', definition: 'Informed decision to take a particular risk.', ref: '3.56' },
  { term: 'Risk assessment', definition: 'Overall process of risk identification, risk analysis and risk evaluation.', ref: '3.57' },
  { term: 'Risk communication', definition: 'Exchange or sharing of information about risk between the decision-maker and other stakeholders.', ref: '3.58' },
  { term: 'Risk criteria', definition: 'Terms of reference against which the significance of a risk is evaluated.', ref: '3.59' },
  { term: 'Risk evaluation', definition: 'Process of comparing the results of risk analysis with risk criteria to determine whether the risk and/or its magnitude is acceptable or tolerable.', ref: '3.60' },
  { term: 'Risk identification', definition: 'Process of finding, recognising and describing risks.', ref: '3.61' },
  { term: 'Risk management', definition: 'Coordinated activities to direct and control an organisation with regard to risk.', ref: '3.62' },
  { term: 'Risk owner', definition: 'Person or entity with the accountability and authority to manage a risk.', ref: '3.63' },
  { term: 'Risk treatment', definition: 'Process to modify risk. Can involve avoiding, taking, removing source, changing likelihood, changing consequences, sharing, or retaining risk.', ref: '3.64' },
  { term: 'Scope', definition: 'Extent and boundaries of the management system.', ref: '3.67' },
  { term: 'Threat', definition: 'Potential cause of an unwanted incident, which can result in harm to a system or organisation.', ref: '3.74' },
  { term: 'Top management', definition: 'Person or group of people who directs and controls an organisation at the highest level.', ref: '3.75' },
  { term: 'Vulnerability', definition: 'Weakness of an asset or control that can be exploited by one or more threats.', ref: '3.77' },
]

const ciaTriad = [
  { prop: 'Confidentiality', def: 'Information is not made available to unauthorised parties', icon: '🔒', color: 'border-l-blue-400' },
  { prop: 'Integrity', def: 'Information is accurate, complete, and not altered by unauthorised parties', icon: '✅', color: 'border-l-emerald-400' },
  { prop: 'Availability', def: 'Information is accessible and usable on demand by authorised parties', icon: '⚡', color: 'border-l-amber-400' },
]

export default function ISO27000() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27000:2018"
        clause="Terminology"
        title="ISMS Audit Taxonomy Dictionary"
        description="Standardised terminology for all ISO 27000 series standards. All internal audit reports, findings, risk registers, and workpapers must use these definitions consistently."
        badges={['Terminology', 'All Standards', 'Pre-Audit']}
      />

      <div className="card mb-6">
        <h2 className="section-title mb-3">CIA Triad — Core Information Security Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ciaTriad.map(c => (
            <div key={c.prop} className={`card border-l-4 ${c.color}`}>
              <div className="text-2xl mb-2">{c.icon}</div>
              <div className="text-sm font-bold text-white mb-1">{c.prop}</div>
              <div className="text-xs text-steel-300 leading-relaxed">{c.def}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-6 p-0 overflow-hidden">
        <div className="px-5 py-3 border-b border-navy-700 bg-navy-800/50">
          <h2 className="section-title mb-0">Full Terminology — ISO 27000:2018 ({terms.length} terms)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-700">
                {['Ref', 'Term', 'Definition'].map(h => (
                  <th key={h} className="text-left py-2.5 px-4 text-steel-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {terms.map((t, i) => (
                <tr key={t.ref} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                  <td className="py-2.5 px-4 font-mono text-amber-audit font-semibold whitespace-nowrap">{t.ref}</td>
                  <td className="py-2.5 px-4 text-white font-semibold whitespace-nowrap">{t.term}</td>
                  <td className="py-2.5 px-4 text-steel-300 leading-relaxed max-w-lg">{t.definition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AIPanel
        title="Generate Terminology Glossary"
        systemPrompt="You are an ISO 27000:2018 terminology expert. Generate standardised audit glossaries, term definition tables, and terminology cross-reference guides for ISO management system audits. Ensure all definitions align exactly to ISO 27000:2018. Output in structured table format with term reference numbers."
        placeholder="e.g. Generate a one-page glossary of the 20 most critical ISMS terms for use in an audit report appendix"
        contextFields={[
          { id: 'focus', label: 'Glossary Focus', type: 'select', options: ['Full ISMS Glossary (all terms)', 'Risk Management Terms only', 'Audit Terms only', 'CIA Triad and Security Properties', 'Top 20 Critical Terms', 'Custom — describe below'] },
          { id: 'format', label: 'Output Format', type: 'select', options: ['Table (Term | Definition)', 'Alphabetical list', 'Grouped by category', 'Audit report appendix format'] },
        ]}
      />
    </div>
  )
}
