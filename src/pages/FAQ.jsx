import { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import PageHeader from '../components/PageHeader'

const faqs = [
  {
    category: 'Getting Started',
    color: 'border-l-amber-audit',
    items: [
      {
        q: 'What is AuditIQ and who is it for?',
        a: 'AuditIQ is an AI-powered IT audit engineering platform built for IT auditors, information security professionals, and compliance managers. It covers the full audit lifecycle across ISO 19011 (audit methodology), ISO 27001 (ISMS), ISO 27002 (controls), ISO 27005 (risk management), and ISO 9001 (QMS). Instead of blank templates, every module generates tailored, professional-grade audit artifacts using the Claude AI engine.'
      },
      {
        q: 'How do I start my first audit?',
        a: 'Follow the ISO 19011 backbone in sequence: (1) Clause 4 — sign your independence declaration. (2) Clause 5 — create an audit programme. (3) Clause 6.2 — issue the lead auditor appointment letter. (4) Clause 6.3 — generate your formal audit plan. Then move into fieldwork using the TOD, TOI, and TOE pages.'
      },
      {
        q: 'Do I need to create an account?',
        a: 'Yes — AuditIQ requires a free account to use the platform. Authentication is handled via Supabase and your data is stored privately in your own workspace. Go to auditiq-it.vercel.app and click "Create one" to register with your email address.'
      },
      {
        q: 'What is an Audit Programme and how do I create one?',
        a: 'An Audit Programme (AP-2025-001) is the root container for all your audit work — workpapers, findings, risk entries, and uploaded files are all linked to it. Create one by clicking the folder icon in the top header bar and selecting "New". Give it a name, select your standards in scope, set the audit period, and assign a lead auditor.'
      },
    ]
  },
  {
    category: 'AI Generation',
    color: 'border-l-purple-400',
    items: [
      {
        q: 'How does the AI artifact generation work?',
        a: 'Every page has an AI Panel at the bottom. Fill in the context fields (organisation, sector, technology stack, specific control or clause), select the artifact type, and click Generate. The platform calls the Claude claude-sonnet-4-6 API and returns a structured, ready-to-use audit artifact tailored to your inputs — workpapers, policies, findings, risk register entries, reports, and more.'
      },
      {
        q: 'The Generate button is not working — what do I do?',
        a: 'The Generate button requires a valid Anthropic API key configured in your Vercel environment variables as VITE_ANTHROPIC_API_KEY. Get your key from console.anthropic.com → API Keys. Add it to Vercel → Settings → Environment Variables, then redeploy. If it still fails, check the browser console for the specific error.'
      },
      {
        q: 'How specific should my inputs be for better AI outputs?',
        a: 'The more specific your inputs, the better the output. Instead of "tech company", use "AWS-native SaaS fintech, 200 employees, processing EU payment data under GDPR, Microsoft 365 for email and collaboration". Include the specific control reference (e.g. ISO 27002 A.8.8), the technology tested (e.g. Qualys vulnerability scanner), and the audit period (e.g. 1 Jan–31 Dec 2025).'
      },
      {
        q: 'Can I save AI-generated outputs?',
        a: 'Yes — every AI panel has a Copy button and a Download button. Download saves the output as a .txt file. You can also upload the file back into the Workpaper Library (Fieldwork → Workpaper Library) to permanently save it against your audit programme in the cloud with a structured workpaper ID (WP-001).'
      },
      {
        q: 'Should I use AI outputs directly in formal audit reports?',
        a: 'AI outputs are structured starting points — not final deliverables. Always review, validate against your actual evidence, and apply professional judgement before including any AI-generated content in formal audit reports. The AI does not have access to your client systems — it generates based on your inputs only.'
      },
    ]
  },
  {
    category: 'TOD / TOI / TOE — Audit Testing',
    color: 'border-l-blue-400',
    items: [
      {
        q: 'What is the difference between TOD, TOI, and TOE?',
        a: 'TOD (Test of Design) — does the control exist and is it properly designed to mitigate the risk? TOI (Test of Implementation) — has the control actually been put into practice? (one walkthrough instance). TOE (Test of Operating Effectiveness) — has the control operated consistently over the audit period? (statistical sampling over 6–12 months). You must complete them in order — TOD before TOI, TOI before TOE.'
      },
      {
        q: 'What happens if TOD concludes "Design Inadequate"?',
        a: 'If TOD concludes Design Inadequate, you raise a design finding immediately. You must then assess whether TOI and TOE are feasible — if the control is not designed properly, there is nothing to test for implementation or effectiveness. In most cases a design inadequacy means the control is treated as failed without further testing.'
      },
      {
        q: 'How many samples do I need for TOE?',
        a: 'Sample sizes depend on control frequency: Real-time/automated controls → 25–60 items. Daily → 25–40. Weekly → 10–25. Monthly → 3–6. Quarterly → 2–4. Annual → census (all items). See the full sampling reference table on the TOE page. Use the AI panel to generate a population definition workpaper for your specific control.'
      },
      {
        q: 'What is the TOI vs TOE boundary?',
        a: 'TOI uses exactly ONE instance to confirm the control is implemented — the walkthrough. TOE uses a SAMPLE POPULATION over the audit period to confirm it operated consistently. Evidence collected in TOI must NOT be reused in the TOE sample population. The TOI → TOE Boundary Guidance Note on the TOI page explains this in detail.'
      },
    ]
  },
  {
    category: 'File Upload & Storage',
    color: 'border-l-emerald-400',
    items: [
      {
        q: 'Where are uploaded files stored?',
        a: 'Files are stored permanently in a private Supabase cloud storage bucket. The folder structure is: UserID / ProgrammeID / Standard / Phase / WP-NNN_Standard_Phase_Filename_Date.ext. Files never expire and are only accessible to your account. Supabase uses AWS S3 infrastructure under the hood.'
      },
      {
        q: 'What file types can I upload?',
        a: 'Supported: PDF, Word (.doc/.docx), Excel (.xls/.xlsx), PowerPoint (.ppt/.pptx), plain text (.txt), PNG, and JPG. Maximum file size is 50MB per file. If you need to upload a file type not listed, convert it to PDF first.'
      },
      {
        q: 'How are workpaper IDs assigned?',
        a: 'Workpaper IDs (WP-001, WP-002...) are automatically assigned by the database when you upload a file. They are sequential per audit programme — so WP-001 is always the first file uploaded to that programme. The full file name follows the convention: WP-NNN_Standard_Phase_OriginalName_Date.ext'
      },
      {
        q: 'Can I download files I previously uploaded?',
        a: 'Yes — go to Fieldwork → Workpaper Library, find your file, and click the open/download icon. This generates a secure signed URL valid for 1 hour that opens the file in a new tab. The file itself is permanently stored in Supabase.'
      },
      {
        q: 'How do I organise files across a large audit?',
        a: 'Files are automatically organised by Standard and Phase within each Audit Programme. When uploading, select the correct Standard (e.g. ISO 27002), Clause/Control (e.g. A.8.8), and Phase (e.g. TOE). The Workpaper Library page groups all files into a folder tree — Standard → Phase → Files — making it easy to navigate a large audit.'
      },
    ]
  },
  {
    category: 'Standards — ISO 19011, 27001, 27002, 27005, 9001',
    color: 'border-l-cyan-400',
    items: [
      {
        q: 'Why is ISO 19011 the backbone — not ISO 27001?',
        a: 'ISO 19011:2018 defines HOW to audit management systems. ISO 27001 defines WHAT the ISMS must contain. In AuditIQ, ISO 19011 governs the entire audit process — from programme management (Cl. 5) through conducting audits (Cl. 6) including TOD/TOI/TOE, findings, meetings, and reporting. ISO 27001 is what you are auditing against. You cannot run a proper ISO 27001 audit without ISO 19011 methodology.'
      },
      {
        q: 'Is ISO 27002 a separate standard to audit against?',
        a: 'No — ISO 27002 is the implementation guidance for ISO 27001 Annex A controls. It is not a separate audit target. In AuditIQ, ISO 27002 controls are tested as part of the ISO 27001 audit — specifically when evaluating the 93 Annex A controls in the Statement of Applicability (SoA). The 4 theme pages (Organizational, People, Physical, Technological) structure your control testing.'
      },
      {
        q: 'What are the 11 net-new controls in ISO 27002:2022?',
        a: 'ISO 27002:2022 introduced 11 new controls not in the 2013 version: A.5.7 Threat Intelligence, A.5.23 Cloud Services, A.5.30 ICT Readiness for BCP, A.7.4 Physical Security Monitoring, A.8.9 Configuration Management, A.8.10 Information Deletion, A.8.11 Data Masking, A.8.12 DLP, A.8.16 Monitoring Activities, A.8.23 Web Filtering, A.8.28 Secure Coding. These are flagged with ⭐ throughout the platform.'
      },
      {
        q: 'How do I use ISO 27005 with ISO 27001?',
        a: 'ISO 27005 provides the risk management methodology that feeds into ISO 27001 Clause 6 (Planning). Use ISO 27005 pages in this order: (1) Asset Register — catalogue all assets. (2) Risk Register — identify risks using Asset × Threat × Vulnerability. (3) Risk Treatment Plan — map risks to ISO 27002 controls. (4) Scenario Generator — test realistic threat scenarios. The outputs feed directly into your ISO 27001 SoA.'
      },
      {
        q: 'Can I run an IMS audit covering both ISO 27001 and ISO 9001?',
        a: 'Yes — use the IMS Cross-Walk page to map the clause alignment between the two standards, then use the Joint Audit Worksheets page for shared processes like Change Management, Vendor Onboarding, and SDLC. ISO 9001 has its own separate pages for clauses 5, 7, 8, 9, and 10 — including unique requirements like calibration (Cl. 7.1.5) and customer satisfaction (Cl. 9.1.2) that are not in ISO 27001.'
      },
    ]
  },
  {
    category: 'Findings & Reporting',
    color: 'border-l-red-400',
    items: [
      {
        q: 'What is the 4Cs framework for findings?',
        a: 'The 4Cs are: Condition (what the auditor found — the factual observation), Criteria (what should be happening — the standard or policy requirement), Cause (why the gap exists — root cause, not symptom), Consequence (the risk or impact if not remediated). Every audit finding must have all 4Cs before it can be formally reported. A finding missing any one C is incomplete.'
      },
      {
        q: 'What are the finding ratings and what do they mean?',
        a: 'Critical — immediate risk, escalate to executive management, remediate within 7 days. High — significant control failure, remediate within 30 days. Medium — partial control failure, remediate within 90 days. Low/Advisory — minor gap or improvement opportunity, remediate within 180 days. Ratings are based on likelihood × impact and must be justified in the finding workpaper.'
      },
      {
        q: 'What if the auditee disputes a finding at the closing meeting?',
        a: 'ISO 19011 Cl. 6.4.7 requires a formal disputed findings process. The lead auditor documents the dispute verbatim, the auditor presents supporting evidence, the auditee presents counter-evidence. If unresolved, the finding is reported as "Disputed" in the audit report — it is never simply removed. The Meetings page has a disputed findings process template.'
      },
      {
        q: 'How do I generate the audit report?',
        a: 'Go to Reporting → Audit Report Builder. Fill in the organisation, audit period, and findings summary, select the overall opinion (Effective / Partially Effective / Ineffective), and choose which section to generate. The AI produces a full ISO 19011 Cl. 6.5-aligned report with all mandatory sections: Executive Summary, Scope, Methodology, Conformity Findings, Nonconformity Findings, Management Responses, and Conclusion.'
      },
    ]
  },
  {
    category: 'Technical & Deployment',
    color: 'border-l-steel-400',
    items: [
      {
        q: 'Why do I get a 404 error when I refresh the page?',
        a: 'AuditIQ is a React SPA (Single Page Application). When you refresh, the browser asks Vercel for a real file at that path — there is none. The fix is a vercel.json file in your repo root with a rewrite rule: { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }. This file was included in the fixes zip — make sure it is in your GitHub repo root.'
      },
      {
        q: 'The notifications bell is not opening — what is wrong?',
        a: 'This was a bug in the original Header.jsx — setNotifOpen was called twice in the same click handler, causing it to toggle open then immediately closed. The fixed Header.jsx was included in the header-notification-fix.zip download. Replace your src/components/Header.jsx with the fixed version.'
      },
      {
        q: 'How do I add the Supabase environment variables to Vercel?',
        a: 'Go to Vercel Dashboard → your project → Settings → Environment Variables. Add three variables: VITE_SUPABASE_URL (your Supabase project URL), VITE_SUPABASE_ANON_KEY (the publishable key from Supabase → Settings → API Keys), and VITE_ANTHROPIC_API_KEY (from console.anthropic.com). Set all three to Production + Preview + Development, then redeploy.'
      },
      {
        q: 'What tech stack is AuditIQ built on?',
        a: 'React 18 + Vite (frontend), Tailwind CSS v3 (styling), React Router v6 (routing), Supabase (auth + PostgreSQL + file storage), Anthropic Claude API / claude-sonnet-4-6 (AI generation), Vercel (deployment), GitHub (source control).'
      },
      {
        q: 'Is there a mobile app?',
        a: 'AuditIQ is a mobile-responsive web app — it works on phones and tablets through the browser. The sidebar collapses to a hamburger menu on mobile. There is no separate iOS or Android app currently, but the web version is fully functional on mobile devices.'
      },
    ]
  },
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState({})

  const toggle = (key) => setOpenItems(p => ({ ...p, [key]: !p[key] }))

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        standard="AuditIQ"
        clause="Help & FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about using AuditIQ — from starting your first audit to troubleshooting technical issues."
        badges={['Help', 'FAQ', 'Documentation']}
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {faqs.map(section => (
          <a
            key={section.category}
            href={`#${section.category.replace(/\s+/g, '-').toLowerCase()}`}
            className="badge badge-steel text-xs hover:bg-navy-700 transition-colors"
          >
            {section.category}
          </a>
        ))}
      </div>

      <div className="space-y-6">
        {faqs.map(section => (
          <div key={section.category} id={section.category.replace(/\s+/g, '-').toLowerCase()}>
            <div className={`flex items-center gap-3 mb-3 pb-2 border-b border-navy-700`}>
              <div className={`w-1 h-5 rounded-full ${section.color.replace('border-l-', 'bg-')}`} />
              <h2 className="text-sm font-bold text-white uppercase tracking-wide">{section.category}</h2>
              <span className="text-xs text-steel-500">{section.items.length} questions</span>
            </div>

            <div className="space-y-2">
              {section.items.map((item, idx) => {
                const key = `${section.category}-${idx}`
                const isOpen = openItems[key]
                return (
                  <div key={key} className={`card border-l-4 ${section.color} p-0 overflow-hidden`}>
                    <button
                      onClick={() => toggle(key)}
                      className="w-full flex items-start justify-between p-4 text-left hover:bg-navy-800/30 transition-colors gap-3"
                    >
                      <span className="text-sm font-medium text-white leading-snug">{item.q}</span>
                      {isOpen
                        ? <ChevronUp size={14} className="text-steel-400 flex-shrink-0 mt-0.5" />
                        : <ChevronDown size={14} className="text-steel-400 flex-shrink-0 mt-0.5" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4">
                        <p className="text-sm text-steel-300 leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-8 text-center">
        <div className="text-sm font-semibold text-white mb-2">Still have questions?</div>
        <div className="text-xs text-steel-400 mb-4">Check the full documentation on GitHub or raise an issue in the repository.</div>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="https://github.com/logan23info/audit-platform#readme" target="_blank" rel="noreferrer" className="btn-secondary text-xs">
            <ExternalLink size={12} /> GitHub README
          </a>
          <a href="https://github.com/logan23info/audit-platform/issues" target="_blank" rel="noreferrer" className="btn-secondary text-xs">
            <ExternalLink size={12} /> Raise an Issue
          </a>
        </div>
      </div>
    </div>
  )
}
