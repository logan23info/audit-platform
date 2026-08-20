import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ExternalLink, CheckCircle2, Zap, Database, Key, BookOpen, Shield, AlertCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader'

const workflow = [
  {
    phase: 'Phase 1 — Pre-Audit Setup',
    color: 'border-l-steel-400',
    badge: 'bg-steel-400/20 text-steel-300',
    steps: [
      { label: 'Create audit programme', desc: 'Click the folder icon in the header → New → fill in name, standards, period, lead auditor. Gets auto-ID: AP-2025-001.', path: '/', action: 'Header → Folder Icon' },
      { label: 'Sign independence declaration', desc: 'ISO 19011 Cl. 4 — confirm no conflicts of interest before any audit work begins.', path: '/iso19011/clause4', action: 'ISO 19011 → Clause 4' },
      { label: 'Set up audit programme', desc: 'ISO 19011 Cl. 5 — define objectives, risks, resources, and annual schedule.', path: '/iso19011/clause5', action: 'ISO 19011 → Clause 5' },
      { label: 'Issue appointment letter', desc: 'ISO 19011 Cl. 6.2 — generate lead auditor appointment + auditee contact letter.', path: '/iso19011/clause6-initiation', action: 'ISO 19011 → Cl. 6.2' },
      { label: 'Generate audit plan', desc: 'ISO 19011 Cl. 6.3 — formal audit plan, document adequacy review, work assignment matrix.', path: '/iso19011/clause6-preparation', action: 'ISO 19011 → Cl. 6.3' },
    ]
  },
  {
    phase: 'Phase 2 — Fieldwork',
    color: 'border-l-blue-400',
    badge: 'bg-blue-900/40 text-blue-300',
    steps: [
      { label: 'Run opening meeting', desc: 'ISO 19011 Cl. 6.4.2 — generate agenda, capture attendance register, confirm scope with auditee.', path: '/iso19011/meetings', action: 'ISO 19011 → Meetings' },
      { label: 'Issue PBC evidence list', desc: 'Request all evidence from auditee — one master list tagged by phase and domain.', path: '/fieldwork/pbc', action: 'Fieldwork → PBC List' },
      { label: 'Test of Design (TOD)', desc: 'Does the control exist and is it properly designed? Generate design gap analysis, SoD check, TOD interview guide.', path: '/iso19011/tod', action: 'ISO 19011 → TOD' },
      { label: 'Test of Implementation (TOI)', desc: 'Walkthrough — confirm control is in operation. Generate walkthrough scripts and evidence checklists.', path: '/iso19011/toi', action: 'ISO 19011 → TOI' },
      { label: 'Test of Operating Effectiveness (TOE)', desc: 'Sample population — confirm control operated consistently. Generate sampling workpapers and exception calculators.', path: '/iso19011/toe', action: 'ISO 19011 → TOE' },
      { label: 'Track fieldwork status', desc: 'Monitor TOD/TOI/TOE progress per control. Track PBC receipts and exceptions.', path: '/fieldwork/tracker', action: 'Fieldwork → Tracker' },
      { label: 'Upload evidence files', desc: 'Upload screenshots, logs, exports, and workpapers — auto-saved as WP-001, WP-002 in cloud storage.', path: '/fieldwork/library', action: 'Fieldwork → Library' },
    ]
  },
  {
    phase: 'Phase 3 — Findings',
    color: 'border-l-red-400',
    badge: 'bg-red-900/40 text-red-300',
    steps: [
      { label: 'Develop findings using 4Cs', desc: 'Condition → Criteria → Cause → Consequence. Every finding must have all 4Cs before it can be reported.', path: '/iso19011/findings', action: 'ISO 19011 → Findings' },
      { label: 'Rate each finding', desc: 'Critical / High / Medium / Low — based on likelihood and impact. Generate finding rating justification.', path: '/iso19011/findings', action: 'ISO 19011 → Findings' },
      { label: 'Update workpaper index', desc: 'Confirm all workpapers produced, signed off, and cross-referenced to controls and findings.', path: '/fieldwork/workpapers', action: 'Fieldwork → Workpapers' },
    ]
  },
  {
    phase: 'Phase 4 — Reporting & Closure',
    color: 'border-l-emerald-400',
    badge: 'bg-emerald-900/40 text-emerald-300',
    steps: [
      { label: 'Run closing meeting', desc: 'ISO 19011 Cl. 6.4.7 — present findings, capture management responses, handle disputed findings.', path: '/iso19011/meetings', action: 'ISO 19011 → Meetings' },
      { label: 'Generate audit report', desc: 'Full ISO 19011 Cl. 6.5 aligned report with all mandatory sections. Select overall opinion.', path: '/reporting/builder', action: 'Reporting → Report Builder' },
      { label: 'Assemble management review pack', desc: 'ISO 27001 Cl. 9.3 — all mandatory inputs for the board/management review meeting.', path: '/reporting/management-review', action: 'Reporting → Mgmt Review' },
      { label: 'Track CAPAs', desc: 'Log corrective actions, assign owners, track progress through to effectiveness verification.', path: '/reporting/capa', action: 'Reporting → CAPA Tracker' },
      { label: 'Update KPI dashboard', desc: 'ISO 27004 metrics — audit completion, CAPA closure rate, findings open, patch compliance.', path: '/reporting/kpi', action: 'Reporting → KPI Dashboard' },
    ]
  },
]

const standards = [
  { std: 'ISO 19011:2018', color: 'text-amber-audit', role: 'Audit backbone — governs HOW you audit', pages: 'Cl. 4, 5, 6.2, 6.3, TOD, TOI, TOE, Findings, Meetings, Reporting, Cl. 7' },
  { std: 'ISO 27001:2022', color: 'text-blue-400', role: 'ISMS requirements — WHAT the org must do', pages: 'Clause 4 through 10' },
  { std: 'ISO 27002:2022', color: 'text-purple-400', role: 'Controls guidance — HOW to implement Annex A', pages: 'Organizational, People, Physical, Technological + Net-New 11' },
  { std: 'ISO 27005:2022', color: 'text-red-400', role: 'Risk management — Asset × Threat × Vulnerability', pages: 'Asset Register, Risk Register, RTP, Scenarios' },
  { std: 'ISO 9001:2015', color: 'text-emerald-400', role: 'QMS — separate from ISMS under IMS', pages: 'Clause 5, 7, 8, 9, 10' },
  { std: 'IMS Cross-Walk', color: 'text-cyan-400', role: 'ISO 27001 × ISO 9001 joint audit integration', pages: 'Cross-Walk Matrix, Joint Worksheets' },
]

export default function Wiki() {
  const navigate = useNavigate()
  const [activePhase, setActivePhase] = useState(0)

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="AuditIQ"
        clause="Wiki & Guide"
        title="How to Use AuditIQ"
        description="Complete guide to using the platform day to day — from setting up your first audit programme through to generating your final report."
        badges={['Guide', 'Documentation', 'Wiki']}
      />

      {/* Quick links */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { label: 'GitHub README', href: 'https://github.com/logan23info/audit-platform#readme' },
          { label: 'GitHub Repo', href: 'https://github.com/logan23info/audit-platform' },
          { label: 'FAQ', path: '/faq' },
          { label: 'Live Platform', href: 'https://auditiq-it.vercel.app' },
        ].map(l => l.href ? (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="btn-secondary text-xs">
            <ExternalLink size={11} /> {l.label}
          </a>
        ) : (
          <button key={l.label} onClick={() => navigate(l.path)} className="btn-secondary text-xs">
            <ArrowRight size={11} /> {l.label}
          </button>
        ))}
      </div>

      {/* Workflow */}
      <div className="card mb-6">
        <h2 className="section-title mb-4">Audit Workflow — Step by Step</h2>
        <div className="flex flex-wrap gap-2 mb-5">
          {workflow.map((phase, i) => (
            <button
              key={i}
              onClick={() => setActivePhase(i)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${activePhase === i ? `${phase.badge} border-current` : 'bg-navy-800 border-navy-600 text-steel-400 hover:border-steel-500'}`}
            >
              {phase.phase.split(' — ')[0]}
            </button>
          ))}
        </div>

        <div className={`border-l-4 ${workflow[activePhase].color} pl-4`}>
          <div className="text-sm font-bold text-white mb-4">{workflow[activePhase].phase}</div>
          <div className="space-y-3">
            {workflow[activePhase].steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3 bg-navy-800 border border-navy-600 rounded-lg p-3 hover:border-steel-500 transition-colors">
                <span className="w-6 h-6 rounded-full bg-navy-700 text-steel-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white mb-0.5">{step.label}</div>
                  <div className="text-xs text-steel-400 leading-snug mb-1.5">{step.desc}</div>
                  <button
                    onClick={() => navigate(step.path)}
                    className="inline-flex items-center gap-1 text-xs text-amber-audit hover:text-amber-300 transition-colors font-mono"
                  >
                    {step.action} <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Standards reference */}
      <div className="card mb-6">
        <h2 className="section-title mb-3">Standards Quick Reference</h2>
        <div className="space-y-2">
          {standards.map(s => (
            <div key={s.std} className="flex flex-col sm:flex-row sm:items-start gap-2 bg-navy-800 rounded-lg p-3">
              <span className={`text-xs font-mono font-bold flex-shrink-0 w-32 ${s.color}`}>{s.std}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-white mb-0.5">{s.role}</div>
                <div className="text-xs text-steel-500">Pages: {s.pages}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI & Storage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={15} className="text-purple-400" />
            <h2 className="section-title mb-0">AI Generation</h2>
          </div>
          <div className="space-y-2 text-xs text-steel-300">
            {[
              'Fill in context fields on any page',
              'Select the artifact type you need',
              'Click Generate → Claude API called',
              'Review, Copy or Download the output',
              'Upload to Workpaper Library for permanent storage',
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-purple-400 font-bold flex-shrink-0">{i + 1}.</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-amber-900/20 border border-amber-800/50 rounded p-2">
            <div className="text-xs text-amber-200/80 flex gap-1.5">
              <AlertCircle size={11} className="flex-shrink-0 mt-0.5" />
              Requires VITE_ANTHROPIC_API_KEY in Vercel environment variables
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <Database size={15} className="text-emerald-400" />
            <h2 className="section-title mb-0">File Storage</h2>
          </div>
          <div className="space-y-1.5 text-xs text-steel-300 mb-3">
            {[
              'Files saved permanently in Supabase cloud',
              'Auto-structured: Programme → Standard → Phase',
              'Auto-prefixed: WP-001_Standard_Phase_File_Date',
              'Download anytime via signed secure URL',
              'Max 50MB per file — PDF, Word, Excel, PNG',
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 size={11} className="text-emerald-audit flex-shrink-0 mt-0.5" />
                <span>{s}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/fieldwork/library')} className="btn-secondary text-xs w-full justify-center">
            <ArrowRight size={11} /> Open Workpaper Library
          </button>
        </div>
      </div>

      {/* Key setup requirements */}
      <div className="card mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Key size={15} className="text-red-400" />
          <h2 className="section-title mb-0">Required Setup — Environment Variables</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-700">
                {['Variable', 'Where to get it', 'Required for'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-steel-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { var: 'VITE_SUPABASE_URL', source: 'Supabase → Settings → API → Project URL', req: 'Login, file storage, data persistence' },
                { var: 'VITE_SUPABASE_ANON_KEY', source: 'Supabase → Settings → API Keys → Publishable key', req: 'Login, file storage, data persistence' },
                { var: 'VITE_ANTHROPIC_API_KEY', source: 'console.anthropic.com → API Keys', req: 'All AI Generate buttons' },
              ].map(r => (
                <tr key={r.var} className="border-b border-navy-800">
                  <td className="py-2.5 px-3 font-mono text-amber-audit text-xs">{r.var}</td>
                  <td className="py-2.5 px-3 text-steel-300">{r.source}</td>
                  <td className="py-2.5 px-3 text-steel-400">{r.req}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card text-center">
        <div className="text-xs text-steel-400 mb-2">AuditIQ — IT Audit Intelligence Platform</div>
        <div className="text-xs text-steel-500 mb-4">ISO 19011 · 27001 · 27002 · 27005 · 9001 · Built with Claude AI</div>
        <div className="flex flex-wrap gap-2 justify-center">
          <button onClick={() => navigate('/faq')} className="btn-secondary text-xs">FAQ</button>
          <a href="https://github.com/logan23info/audit-platform#readme" target="_blank" rel="noreferrer" className="btn-secondary text-xs">
            <ExternalLink size={11} /> GitHub README
          </a>
        </div>
      </div>
    </div>
  )
}
