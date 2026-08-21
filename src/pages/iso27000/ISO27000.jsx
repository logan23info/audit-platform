import { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { Search, X } from 'lucide-react'

const terms = [
  { term: 'Asset', definition: 'Anything that has value to the organisation — information, software, physical equipment, services, people, and intangibles.', ref: '3.2', category: 'Core' },
  { term: 'Attack', definition: 'Attempt to destroy, expose, alter, disable, steal, or gain unauthorised access to an asset.', ref: '3.3', category: 'Threat' },
  { term: 'Audit', definition: 'Systematic, independent, and documented process for obtaining audit evidence and evaluating it objectively to determine the extent to which criteria are fulfilled.', ref: '3.4', category: 'Audit' },
  { term: 'Audit criteria', definition: 'Set of requirements used as a reference against which objective evidence is compared. Includes standards, policies, procedures, and legal requirements.', ref: '3.5', category: 'Audit' },
  { term: 'Audit evidence', definition: 'Records, statements of fact, or other information relevant to the audit criteria and verifiable. The basis for audit conclusions.', ref: '3.6', category: 'Audit' },
  { term: 'Availability', definition: 'Property of being accessible and usable on demand by an authorised entity. One of the CIA triad.', ref: '3.7', category: 'Core' },
  { term: 'Baseline', definition: 'Reference point used for comparison. In IS, often refers to a security configuration baseline or control baseline.', ref: '—', category: 'Risk' },
  { term: 'Business continuity', definition: 'Capability of the organisation to continue delivery of products or services at acceptable predefined levels following a disruptive incident.', ref: '—', category: 'Risk' },
  { term: 'CIA Triad', definition: 'Confidentiality, Integrity, and Availability — the three core properties of information security that the ISMS must protect.', ref: '—', category: 'Core' },
  { term: 'Competence', definition: 'Ability to apply knowledge and skills to achieve intended results. Required for auditors per ISO 19011 Clause 7.', ref: '3.10', category: 'Audit' },
  { term: 'Confidentiality', definition: 'Property that information is not made available or disclosed to unauthorised individuals, entities, or processes.', ref: '3.11', category: 'Core' },
  { term: 'Conformity', definition: 'Fulfilment of a requirement. The opposite of nonconformity.', ref: '3.12', category: 'Audit' },
  { term: 'Context of the organisation', definition: 'Combination of internal and external issues that affect the organisation\'s approach to its objectives. Assessed per ISO 27001 Clause 4.', ref: '3.13', category: 'ISMS' },
  { term: 'Control', definition: 'Measure that maintains or modifies risk. Includes processes, policies, devices, and practices. ISO 27002 defines 93 controls across 4 themes.', ref: '3.14', category: 'Controls' },
  { term: 'Control objective', definition: 'Statement describing what is to be achieved as a result of implementing controls.', ref: '3.15', category: 'Controls' },
  { term: 'Corrective action', definition: 'Action to eliminate the cause of a nonconformity and prevent recurrence. Required per ISO 27001 Clause 10.2.', ref: '3.16', category: 'ISMS' },
  { term: 'Cybersecurity', definition: 'Preservation of confidentiality, integrity, and availability of information in cyberspace. Broader than IS — includes cyber resilience and threat intelligence.', ref: '—', category: 'Core' },
  { term: 'Documented information', definition: 'Information required to be controlled and maintained by an organisation. ISO 27001 mandates 15 specific documented information items.', ref: '3.18', category: 'ISMS' },
  { term: 'Effectiveness', definition: 'Extent to which planned activities are realised and planned results achieved. Measured per ISO 27001 Clause 9.1.', ref: '3.19', category: 'ISMS' },
  { term: 'Event', definition: 'Occurrence or change of a particular set of circumstances. A security event may or may not become an incident.', ref: '3.20', category: 'Threat' },
  { term: 'Finding', definition: 'Result of evaluating collected audit evidence against audit criteria. Can be conformity, nonconformity, or observation.', ref: '—', category: 'Audit' },
  { term: 'Governance', definition: 'System by which an organisation\'s IS activities are directed and controlled. Includes policies, roles, and accountability structures.', ref: '3.22', category: 'ISMS' },
  { term: 'Impact', definition: 'Change to objectives resulting from an event. In risk assessment: consequence of a threat materialising. Score 1-5 in likelihood × impact model.', ref: '3.23', category: 'Risk' },
  { term: 'Incident', definition: 'Unwanted or unexpected IS event that has a significant probability of compromising business operations or IS. Assessed from IS events.', ref: '3.24', category: 'Threat' },
  { term: 'Information security', definition: 'Preservation of confidentiality, integrity, and availability of information. May also involve authenticity, accountability, and reliability.', ref: '3.28', category: 'Core' },
  { term: 'Information security risk', definition: 'Potential that a given threat will exploit vulnerabilities and cause harm to the organisation. Expressed as likelihood × impact.', ref: '—', category: 'Risk' },
  { term: 'Integrity', definition: 'Property of accuracy and completeness. Information has not been modified by unauthorised parties. One of the CIA triad.', ref: '3.31', category: 'Core' },
  { term: 'ISMS', definition: 'Information Security Management System. A systematic approach to managing sensitive information, applying risk management processes per ISO 27001.', ref: '3.32', category: 'ISMS' },
  { term: 'Likelihood', definition: 'Chance of something happening. In risk assessment: probability a threat will materialise. Score 1-5 in likelihood × impact model.', ref: '3.33', category: 'Risk' },
  { term: 'Management system', definition: 'Set of interrelated or interacting elements to establish policies, objectives, and processes to achieve those objectives.', ref: '3.41', category: 'ISMS' },
  { term: 'Nonconformity', definition: 'Non-fulfilment of a requirement. Can be major (systematic failure) or minor (isolated failure). Requires corrective action per Clause 10.2.', ref: '3.43', category: 'Audit' },
  { term: 'Objective evidence', definition: 'Data supporting the existence or verity of something. The basis for audit conclusions — must be verifiable and factual.', ref: '—', category: 'Audit' },
  { term: 'Policy', definition: 'Intentions and direction of an organisation as formally expressed by its top management. IS policy required per ISO 27001 Clause 5.2.', ref: '3.47', category: 'ISMS' },
  { term: 'Residual risk', definition: 'Risk remaining after risk treatment. Must be formally accepted by risk owner. Should be within the organisation\'s risk appetite.', ref: '3.51', category: 'Risk' },
  { term: 'Risk', definition: 'Effect of uncertainty on objectives. In IS: combination of likelihood of a threat exploiting a vulnerability and the resulting impact.', ref: '3.52', category: 'Risk' },
  { term: 'Risk acceptance', definition: 'Informed decision to take a particular risk. Must be formally documented and signed off by an authorised risk owner.', ref: '3.53', category: 'Risk' },
  { term: 'Risk appetite', definition: 'Amount and type of risk an organisation is willing to pursue or retain. Defines the threshold above which risks must be treated.', ref: '—', category: 'Risk' },
  { term: 'Risk assessment', definition: 'Overall process of risk identification, risk analysis, and risk evaluation. Conducted per ISO 27005 methodology.', ref: '3.55', category: 'Risk' },
  { term: 'Risk owner', definition: 'Person or entity with the accountability and authority to manage a risk. Must formally accept residual risks.', ref: '3.56', category: 'Risk' },
  { term: 'Risk treatment', definition: 'Process to modify risk. Options: Mitigate, Accept, Transfer, Avoid. Documented in the Risk Treatment Plan.', ref: '3.59', category: 'Risk' },
  { term: 'SoA', definition: 'Statement of Applicability. Document listing all 93 ISO 27002 Annex A controls with applicability decision and justification. Required per ISO 27001 Cl. 6.1.3.', ref: '—', category: 'Controls' },
  { term: 'Threat', definition: 'Potential cause of an unwanted incident that may result in harm to a system or organisation. Examples: ransomware, insider threat, phishing.', ref: '3.74', category: 'Threat' },
  { term: 'TOD', definition: 'Test of Design. Audit testing phase confirming a control is properly designed — existence of policy, procedure, and configuration.', ref: '—', category: 'Audit' },
  { term: 'TOI', definition: 'Test of Implementation. Walkthrough confirming a control has been put into practice — one instance of the control operating.', ref: '—', category: 'Audit' },
  { term: 'TOE', definition: 'Test of Effectiveness. Statistical sampling confirming a control operated consistently over the audit period.', ref: '—', category: 'Audit' },
  { term: 'Vulnerability', definition: 'Weakness of an asset or control that can be exploited by one or more threats. Identified through vulnerability scanning and assessment.', ref: '3.77', category: 'Threat' },
]

const categories = ['All', 'Core', 'ISMS', 'Risk', 'Controls', 'Threat', 'Audit']
const catColors = {
  Core: 'bg-blue-900/40 text-blue-300', ISMS: 'bg-purple-900/40 text-purple-300',
  Risk: 'bg-red-900/40 text-red-300', Controls: 'bg-emerald-900/40 text-emerald-300',
  Threat: 'bg-orange-900/40 text-orange-300', Audit: 'bg-amber-900/40 text-amber-300',
}

export default function ISO27000() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')

  const filtered = terms.filter(t =>
    (cat === 'All' || t.category === cat) &&
    (!search || t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 27000:2018" clause="Terminology" title="IS Audit Terminology Dictionary"
        description={`${terms.length} key terms from ISO 27000:2018 and the broader IS audit lexicon. Covers core IS concepts, ISMS requirements, risk management, controls, threat terminology, and audit methodology.`}
        badges={[`${terms.length} Terms`, 'ISO 27000:2018', 'Reference']} />

      <div className="card mb-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-400" />
            <input className="input-field pl-8 text-xs py-1.5" placeholder="Search terms or definitions..."
              value={search} onChange={e => setSearch(e.target.value)} />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-400 hover:text-steel-200"><X size={12} /></button>}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${cat === c ? 'bg-navy-700 border-steel-400 text-white' : 'bg-navy-800 border-navy-600 text-steel-400 hover:border-steel-400'}`}>
                {c}
              </button>
            ))}
          </div>
          <span className="text-xs text-steel-400 ml-auto">{filtered.length} terms</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {filtered.map(t => (
          <div key={t.term} className="card-sm">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <span className="text-sm font-bold text-white">{t.term}</span>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {t.ref !== '—' && <span className="font-mono text-xs text-steel-500">{t.ref}</span>}
                <span className={`badge text-xs ${catColors[t.category]}`}>{t.category}</span>
              </div>
            </div>
            <p className="text-xs text-steel-300 leading-relaxed">{t.definition}</p>
          </div>
        ))}
      </div>

      <AIPanel title="Generate Terminology Guidance"
        systemPrompt="You are an ISO 27000:2018 terminology specialist. Explain IS audit terms in context, generate glossaries for specific audiences, create terminology quizzes, and produce plain-English explanations of complex IS concepts for non-technical audiences."
        placeholder="e.g. Explain the difference between a Threat, Vulnerability, and Risk in plain English for a board audience"
        contextFields={[
          { id: 'term', label: 'Term / Concept', type: 'text', placeholder: 'e.g. Residual risk vs inherent risk' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Plain English Explanation', 'Board-Level Glossary', 'Technical Glossary', 'Term Comparison', 'IS Terminology Quiz', 'Audit Report Glossary Section'] },
          { id: 'audience', label: 'Audience', type: 'select', options: ['Technical IS team', 'Board / Executive', 'Non-technical staff', 'Audit committee', 'Certification body'] },
        ]} />
    </div>
  )
}
