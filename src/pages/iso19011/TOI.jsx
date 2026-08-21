import { useState } from 'react'
import AIPanel from '../../components/AIPanel'

export default function TOI() {
  const [tab, setTab] = useState('overview')
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'walkthrough', label: 'Walkthrough Scripts' },
    { id: 'demo', label: 'System Demo Guide' },
    { id: 'transaction', label: 'Transaction Trace' },
    { id: 'evidence', label: 'Evidence Capture SOP' },
    { id: 'boundary', label: 'TOI vs TOE Boundary' },
    { id: 'workpaper', label: 'TOI Conclusion' },
  ]

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">ISO 19011:2018 — Clause 6.4 | Audit Execution</div>
        <h1 className="page-title">TOI — Test of Implementation</h1>
        <p className="page-desc">Verify that a control has actually been put into practice. TOI asks: has the designed control been implemented in the live environment?</p>
      </div>
      <div className="flex gap-1 mb-3" style={{ flexWrap: 'wrap' }}>
        <span className="badge badge-blue">TOI Phase</span>
        <span className="badge badge-gold">Implementation Verification</span>
        <span className="badge badge-muted">Stage 1 Fieldwork</span>
      </div>
      <div className="tab-list">
        {tabs.map(t => <button key={t.id} className={`tab-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>)}
      </div>

      {tab === 'overview' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-title">What is TOI?</div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>Test of Implementation confirms that the designed control exists in the operating environment. It uses a single walkthrough instance — one transaction, one example — to confirm the control is live.</p>
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--navy)', borderRadius: 6, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Key Question</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--accent)', fontStyle: 'italic' }}>"Show me the last time this control ran. Walk me through exactly what happened."</p>
            </div>
          </div>
          <div className="card">
            <div className="card-title">TOI Methods (ISO 19011 Annex A)</div>
            {[
              ['Inquiry', 'Interview control owners — ask them to explain and demonstrate'],
              ['Observation', 'Watch the control operate in real time or via screen share'],
              ['Document Review', 'Review evidence of one instance of the control operating'],
              ['Re-performance', 'Auditor independently performs the control to confirm feasibility'],
              ['System Demo', 'Request live system demonstration of the control being active'],
            ].map(([method, desc]) => (
              <div key={method} style={{ marginBottom: '0.6rem' }}>
                <span className="badge badge-blue" style={{ marginRight: '0.5rem', fontSize: '0.6rem' }}>{method}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'walkthrough' && (
        <AIPanel
          title="AI — Walkthrough Script Generator"
          systemPrompt="You are an ISO 19011 audit specialist. Generate a detailed walkthrough script for a specific IT control. Include: (1) Pre-walkthrough preparation (documents to request in advance), (2) Opening questions to set context, (3) Step-by-step walkthrough questions (walk me through…), (4) Evidence to capture at each step, (5) Screenshots/artifacts to request, (6) Challenge questions (what if…), (7) Closing questions to confirm completeness. Format as a numbered script an auditor can follow live during the walkthrough interview."
          fields={[
            { key: 'control', label: 'Control to Walk Through', placeholder: 'e.g. A.8.2 Privileged access provisioning process' },
            { key: 'system', label: 'System / Environment', placeholder: 'e.g. Active Directory, AWS IAM, ServiceNow' },
            { key: 'role', label: 'Interviewee Role', placeholder: 'e.g. IT Security Manager' },
          ]}
        />
      )}

      {tab === 'demo' && (
        <div>
          <div className="card mb-3">
            <div className="card-title">System Demonstration Guide</div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Request the control owner to show the control operating live in the system — screen share or in-person.</p>
            <table className="tbl">
              <thead><tr><th>Control Type</th><th>What to Ask to See</th><th>Evidence to Capture</th></tr></thead>
              <tbody>
                {[
                  ['Access Control', 'Show a live access provisioning request being approved', 'Ticket screenshot + approval record + AD group membership'],
                  ['Change Management', 'Show the last change being raised, approved, and implemented', 'Change ticket + CAB minutes + deployment log'],
                  ['Patch Management', 'Show the patch dashboard and a recent patch deployment report', 'Vulnerability scan export + patch compliance report'],
                  ['Backup & Recovery', 'Show last backup job result and one successful restore test', 'Backup logs + restore test record'],
                  ['Logging & Monitoring', 'Show SIEM dashboard and a recent alert that was investigated', 'SIEM screenshot + incident ticket'],
                  ['DLP', 'Show DLP policy applied and a recent triggered alert', 'DLP console screenshot + alert log'],
                ].map((r, i) => (
                  <tr key={i}><td className="text-accent">{r[0]}</td><td style={{ color: 'var(--text-primary)' }}>{r[1]}</td><td>{r[2]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'transaction' && (
        <AIPanel
          title="AI — Single Transaction Trace Script"
          systemPrompt="You are an ISO 19011 IT audit specialist. Generate a Single Transaction Trace script for a specific control. This traces ONE end-to-end transaction through the entire control process — from initiation to completion. Include: (1) Transaction selection criteria (which instance to trace), (2) Each process step to follow from start to finish, (3) Evidence to verify at each step, (4) System screens / logs to review, (5) People to interview at each stage, (6) Red flags that would indicate control failure. Format as a sequential step-by-step trace script."
          fields={[
            { key: 'control', label: 'Control / Process to Trace', placeholder: 'e.g. User access request from ticket to active account' },
            { key: 'system', label: 'Systems Involved', placeholder: 'e.g. ServiceNow → Active Directory → Azure AD' },
          ]}
        />
      )}

      {tab === 'evidence' && (
        <div className="card">
          <div className="card-title">Evidence Capture SOP — TOI</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Standard operating procedure for capturing, naming, and storing TOI evidence.</p>
          {[
            { step: '01', title: 'Pre-Walkthrough', items: ['Request evidence list sent to auditee 5 days prior', 'Confirm system access / screen share capability', 'Prepare walkthrough script and evidence checklist'] },
            { step: '02', title: 'During Walkthrough', items: ['Capture timestamped screenshots of system state', 'Record audit session where permissible and agreed', 'Note exact system names, versions, settings observed'] },
            { step: '03', title: 'Evidence Naming', items: ['Format: [ControlRef]-[Date]-[Description]-[Auditor]', 'Example: A8-2-20240115-AccessProvisioning-JSmith', 'Store in secure audit file repository immediately'] },
            { step: '04', title: 'Evidence Verification', items: ['Confirm evidence matches the control criterion', 'Note any discrepancies between policy and practice', 'Cross-reference to TOD documentation'] },
          ].map(s => (
            <div key={s.step} style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '2px solid var(--accent)' }}>
              <div className="flex items-center gap-1 mb-1">
                <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>STEP {s.step}</span>
                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{s.title}</span>
              </div>
              {s.items.map((item, i) => <div key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>• {item}</div>)}
            </div>
          ))}
        </div>
      )}

      {tab === 'boundary' && (
        <div className="card">
          <div className="card-title">TOI vs TOE Boundary Guide</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Critical for auditors to know when walkthrough (TOI) ends and sampling (TOE) begins — prevents scope creep and ensures correct conclusions.</p>
          <table className="tbl">
            <thead><tr><th>Dimension</th><th>TOI</th><th>TOE</th></tr></thead>
            <tbody>
              {[
                ['Purpose', 'Confirm control exists and is implemented', 'Confirm control has operated consistently over time'],
                ['Sample Size', '1 instance (single walkthrough)', 'Multiple instances (statistical sample)'],
                ['Time Period', 'Current state / single event', '6–12 month audit window'],
                ['Evidence Type', 'System demo, single document, one observation', 'Population + sample + exception rate'],
                ['Conclusion', 'Implemented / Not Implemented', 'Effective / Ineffective / Effective with Exceptions'],
                ['When to Stop TOI', 'After confirming control is live with one instance', 'After sampling confirms operating frequency met'],
                ['Escalation', 'If control not found → finding + halt TOE', 'If exception rate exceeds threshold → finding'],
              ].map((r, i) => (
                <tr key={i}><td className="text-gold fw-600">{r[0]}</td><td style={{ color: 'var(--accent)' }}>{r[1]}</td><td style={{ color: 'var(--green)' }}>{r[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'workpaper' && (
        <div className="card">
          <div className="card-title">TOI Conclusion Workpaper</div>
          <div className="grid-2" style={{ gap: '0.75rem', marginBottom: '0.75rem' }}>
            {['Control Reference', 'Control Name', 'Auditor Name', 'Walkthrough Date', 'Interviewee', 'Interviewee Role'].map(f => (
              <div className="form-group" key={f} style={{ marginBottom: 0 }}><label className="form-label">{f}</label><input className="form-input" placeholder={`Enter…`} /></div>
            ))}
          </div>
          <div className="form-group">
            <label className="form-label">Walkthrough Procedures Performed</label>
            <textarea className="ai-input" style={{ minHeight: 80 }} placeholder="Describe procedures: inquiry, observation, document review, system demo…" />
          </div>
          <div className="form-group">
            <label className="form-label">Evidence Obtained</label>
            <textarea className="ai-input" style={{ minHeight: 60 }} placeholder="List evidence items captured with file references…" />
          </div>
          <div className="form-group">
            <label className="form-label">TOI Conclusion</label>
            <select className="form-select">
              <option>Implemented — Control is live and operating as designed. Proceed to TOE.</option>
              <option>Partially Implemented — Control present with noted gaps. Proceed with exceptions.</option>
              <option>Not Implemented — Control not found in operation. Finding raised.</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Rationale</label>
            <textarea className="ai-input" style={{ minHeight: 60 }} placeholder="Explain the basis for your TOI conclusion…" />
          </div>
          <button className="btn btn-primary w-full">Save TOI Workpaper</button>
        </div>
      )}
    </div>
  )
}
