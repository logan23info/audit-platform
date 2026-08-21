import { useState } from 'react'
import AIPanel from '../../components/AIPanel'

export default function TOD() {
  const [tab, setTab] = useState('overview')
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'objective', label: 'Control Objectives' },
    { id: 'gap', label: 'Design Gap Analyzer' },
    { id: 'sod', label: 'SoD Design Check' },
    { id: 'compensating', label: 'Compensating Controls' },
    { id: 'dependency', label: 'Control Dependencies' },
    { id: 'interview', label: 'TOD Interview Guide' },
    { id: 'workpaper', label: 'TOD Conclusion' },
  ]

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">ISO 19011:2018 — Clause 6.4 | Audit Execution</div>
        <h1 className="page-title">TOD — Test of Design</h1>
        <p className="page-desc">Assess whether controls are properly designed to mitigate stated risks. TOD asks: does this control exist and is it adequately designed to achieve its objective?</p>
      </div>
      <div className="flex gap-1 mb-3" style={{ flexWrap: 'wrap' }}>
        <span className="badge badge-gold">TOD Phase</span>
        <span className="badge badge-blue">Design Adequacy</span>
        <span className="badge badge-muted">Pre-Fieldwork</span>
      </div>

      <div className="tab-list">
        {tabs.map(t => <button key={t.id} className={`tab-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>)}
      </div>

      {tab === 'overview' && (
        <div>
          <div className="grid-2 mb-3">
            <div className="card">
              <div className="card-title">What is TOD?</div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>Test of Design evaluates whether a control is appropriately designed to prevent or detect a risk. A control can be implemented and operating but still fail TOD if the design is fundamentally flawed.</p>
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--navy)', borderRadius: 6, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Key Question</div>
                <p style={{ fontSize: '0.88rem', color: 'var(--accent)', fontStyle: 'italic' }}>"If this control operates exactly as designed, will it adequately mitigate the target risk?"</p>
              </div>
            </div>
            <div className="card">
              <div className="card-title">TOD vs TOI vs TOE</div>
              <table className="tbl">
                <thead><tr><th>Phase</th><th>Question</th><th>Method</th></tr></thead>
                <tbody>
                  <tr><td className="text-gold fw-600">TOD</td><td>Is it designed correctly?</td><td>Document review, walkthroughs</td></tr>
                  <tr><td className="text-accent fw-600">TOI</td><td>Has it been implemented?</td><td>Observation, single instance</td></tr>
                  <tr><td className="text-green fw-600">TOE</td><td>Is it operating effectively?</td><td>Sampling, multi-period testing</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="card">
            <div className="card-title">TOD Execution Checklist</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
              {[
                'Obtain current policy and procedure documents',
                'Confirm control objective is clearly stated',
                'Verify control addresses identified risk',
                'Check authority/approval of control design',
                'Confirm roles responsible for control operation',
                'Assess whether design frequency matches risk',
                'Review if design includes detection capability',
                'Check design covers all relevant scenarios',
                'Assess SoD in control design',
                'Review compensating controls where primary absent',
                'Map control dependencies',
                'Document TOD conclusion with rationale',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '0.7rem' }}>◆</span>{item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'objective' && (
        <div>
          <div className="card mb-3">
            <div className="card-title">Control Objective Library</div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Each control must have a stated objective before design can be assessed.</p>
            <div style={{ overflowX: 'auto' }}>
              <table className="tbl">
                <thead><tr><th>Control Ref</th><th>Control Name</th><th>Control Objective</th><th>Risk Addressed</th></tr></thead>
                <tbody>
                  {[
                    ['A.5.1', 'Policies for info security', 'Provide management direction and support for information security', 'Governance failure'],
                    ['A.5.15', 'Access control', 'Limit access to information assets to authorised users', 'Unauthorised access'],
                    ['A.8.2', 'Privileged access rights', 'Restrict and control allocation of privileged access rights', 'Privilege abuse'],
                    ['A.8.5', 'Secure authentication', 'Ensure secure authentication of users', 'Identity compromise'],
                    ['A.5.23', 'Cloud services security', 'Specify and manage information security for use of cloud services', 'Cloud risk'],
                    ['A.8.12', 'Data leakage prevention', 'Detect and prevent unauthorised disclosure of information', 'Data breach'],
                  ].map(r => (
                    <tr key={r[0]}><td className="mono text-accent">{r[0]}</td><td style={{ color: 'var(--text-primary)' }}>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <AIPanel
            title="AI — Control Objective Generator"
            systemPrompt="You are an ISO 27002:2022 audit specialist. For a given ISO 27002 control, generate: (1) a clear control objective statement, (2) the primary risk it addresses, (3) the CIA triad properties it protects (Confidentiality/Integrity/Availability), (4) the NIST CSF function it maps to (Identify/Protect/Detect/Respond/Recover), and (5) key design requirements an auditor should look for."
            fields={[
              { key: 'control', label: 'ISO 27002 Control Reference', placeholder: 'e.g. A.8.2 Privileged Access Rights' },
              { key: 'context', label: 'Organisation Context', placeholder: 'e.g. Cloud-hosted SaaS, 200 users, financial sector' },
            ]}
          />
        </div>
      )}

      {tab === 'gap' && (
        <AIPanel
          title="AI — Policy & Design Gap Analyzer"
          systemPrompt="You are an ISO 27001/27002 audit specialist performing Test of Design (TOD). Analyse the provided policy or control description against ISO 27002:2022 requirements. Identify: (1) Missing mandatory elements, (2) Design weaknesses that could fail TOD, (3) Scope gaps (scenarios not covered), (4) Approval and authority gaps, (5) Frequency/timing design issues. Rate each gap as Critical/High/Medium/Low and provide specific recommendations. Reference the relevant ISO 27002 control guidance for each finding."
          fields={[
            { key: 'control', label: 'Control / Policy Being Assessed', placeholder: 'e.g. Access Control Policy, Change Management Procedure' },
            { key: 'content', label: 'Policy / Control Description', type: 'textarea', placeholder: 'Paste the policy text or describe the control design…' },
            { key: 'risk', label: 'Risk This Control Should Mitigate', placeholder: 'e.g. Unauthorised access to production systems' },
          ]}
        />
      )}

      {tab === 'sod' && (
        <div>
          <div className="card mb-3">
            <div className="card-title">Segregation of Duties — Design Check</div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Before testing SoD implementation, verify the organisational design allows for proper segregation.</p>
            <table className="tbl">
              <thead><tr><th>Process</th><th>Role A (Initiator)</th><th>Role B (Approver)</th><th>Role C (Reviewer)</th><th>SoD Risk</th></tr></thead>
              <tbody>
                {[
                  ['Access Provisioning', 'Service Desk', 'IT Manager', 'Security Team', 'Low'],
                  ['Change Management', 'Developer', 'Change Manager', 'CAB', 'Low'],
                  ['Financial Transactions', 'Requester', 'Finance Manager', 'CFO/Auditor', 'Low'],
                  ['User Account Creation', 'HR', 'IT Admin', 'Security', 'Medium'],
                  ['System Configuration', 'Sysadmin', 'IT Manager', 'CISO', 'Medium'],
                ].map(r => (
                  <tr key={r[0]}>
                    <td style={{ color: 'var(--text-primary)' }}>{r[0]}</td>
                    <td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td>
                    <td><span className={`badge ${r[4]==='Low'?'badge-green':'badge-amber'}`}>{r[4]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AIPanel
            title="AI — SoD Design Analyzer"
            systemPrompt="You are an IT audit specialist assessing Segregation of Duties (SoD) design. Given an organisational structure and process description, identify: (1) SoD conflicts where one person controls multiple steps, (2) Missing approval roles, (3) Compensating controls required where SoD is not feasible due to organisation size, (4) Specific design recommendations to achieve adequate SoD. Reference ISO 27002 A.5.3 (Segregation of duties)."
            fields={[
              { key: 'process', label: 'Process / Function', placeholder: 'e.g. User access provisioning, payment processing' },
              { key: 'roles', label: 'Current Role Structure', type: 'textarea', placeholder: 'Describe who does what in this process…' },
              { key: 'size', label: 'Team Size', placeholder: 'e.g. 3-person IT team' },
            ]}
          />
        </div>
      )}

      {tab === 'compensating' && (
        <div>
          <div className="card mb-3">
            <div className="card-title">Compensating Control Register</div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Where primary controls are absent or inadequate, compensating controls must be documented, assessed for design adequacy, and formally accepted.</p>
            <table className="tbl">
              <thead><tr><th>Primary Control</th><th>Gap Reason</th><th>Compensating Control</th><th>Design Adequate?</th><th>Accepted By</th></tr></thead>
              <tbody>
                {[
                  ['SoD in access reviews', 'Small team — 2 IT staff only', 'Monthly privileged access review by CISO', 'Yes', 'CISO'],
                  ['Dedicated DLP tool', 'Budget constraint', 'Email gateway DLP + USB blocking policy', 'Partial', 'IT Manager'],
                  ['24/7 SOC monitoring', 'Not feasible for size', 'SIEM alerts to on-call + weekly log review', 'Yes', 'CISO'],
                ].map((r, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--text-primary)' }}>{r[0]}</td>
                    <td>{r[1]}</td><td>{r[2]}</td>
                    <td><span className={`badge ${r[3]==='Yes'?'badge-green':r[3]==='Partial'?'badge-amber':'badge-red'}`}>{r[3]}</span></td>
                    <td>{r[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AIPanel
            title="AI — Compensating Control Assessor"
            systemPrompt="You are an ISO 27001/27002 audit specialist. Assess whether a proposed compensating control is adequately designed to compensate for a primary control gap. Evaluate: (1) Does it address the same risk? (2) Is it as effective as the primary? (3) What residual risk remains? (4) What additional evidence is needed for TOD/TOI/TOE? Provide a clear design adequacy conclusion: Adequate / Partially Adequate / Inadequate."
            fields={[
              { key: 'primary', label: 'Primary Control Gap', placeholder: 'e.g. No SoD in access provisioning due to small team' },
              { key: 'compensating', label: 'Proposed Compensating Control', placeholder: 'e.g. Monthly CISO review of all access changes' },
              { key: 'risk', label: 'Underlying Risk', placeholder: 'e.g. Unauthorised access provisioning' },
            ]}
          />
        </div>
      )}

      {tab === 'dependency' && (
        <div className="card">
          <div className="card-title">Control Dependency Map</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Some controls only function correctly if upstream controls are also properly designed and operating. Mapping dependencies prevents false positives in TOD conclusions.</p>
          <table className="tbl">
            <thead><tr><th>Control</th><th>Depends On</th><th>Why</th><th>Dependency Risk</th></tr></thead>
            <tbody>
              {[
                ['A.8.16 Monitoring Activities', 'A.8.9 Configuration Mgmt', 'Monitoring only works if assets are inventoried and configured correctly', 'High'],
                ['A.8.2 Privileged Access Rights', 'A.5.15 Access Control Policy', 'Privilege management requires a defined access control framework', 'High'],
                ['A.8.12 DLP', 'A.5.12 Classification of Information', 'DLP rules require data to be classified before it can be monitored', 'High'],
                ['A.5.7 Threat Intelligence', 'A.8.16 Monitoring Activities', 'Threat intel is only actionable if monitoring is in place to detect indicators', 'Medium'],
                ['A.5.23 Cloud Security', 'A.5.19 Info Sec in Supplier Relationships', 'Cloud security policies depend on the broader supplier security framework', 'Medium'],
              ].map((r, i) => (
                <tr key={i}>
                  <td className="text-accent">{r[0]}</td>
                  <td style={{ color: 'var(--text-primary)' }}>{r[1]}</td>
                  <td>{r[2]}</td>
                  <td><span className={`badge ${r[3]==='High'?'badge-red':'badge-amber'}`}>{r[3]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'interview' && (
        <AIPanel
          title="AI — TOD Interview Guide Generator"
          systemPrompt="You are an ISO 19011 audit specialist. Generate a structured TOD (Test of Design) interview guide for a specific control. Include: (1) Opening context-setting questions, (2) Control design questions (how was this designed and why?), (3) Risk coverage questions (what risks does this address?), (4) Authority/approval questions (who approved this design?), (5) Scenario challenge questions (what happens if X occurs?), (6) Documentation verification questions. Format as numbered questions with auditor notes on what to look for in responses."
          fields={[
            { key: 'control', label: 'Control Being Assessed', placeholder: 'e.g. A.8.2 Privileged Access Rights Management' },
            { key: 'context', label: 'Organisation Context', placeholder: 'e.g. AWS cloud environment, 50 privileged users' },
            { key: 'interviewee', label: 'Interviewee Role', placeholder: 'e.g. IT Security Manager, System Administrator' },
          ]}
        />
      )}

      {tab === 'workpaper' && (
        <div>
          <div className="card mb-3">
            <div className="card-title">TOD Conclusion Workpaper</div>
            <div className="grid-2" style={{ gap: '0.75rem', marginBottom: '0.75rem' }}>
              {['Control Reference', 'Control Name', 'Auditor Name', 'Review Date'].map(f => (
                <div className="form-group" key={f} style={{ marginBottom: 0 }}><label className="form-label">{f}</label><input className="form-input" placeholder={`Enter ${f.toLowerCase()}…`} /></div>
              ))}
            </div>
            <div className="form-group">
              <label className="form-label">Design Testing Procedures Performed</label>
              <textarea className="ai-input" style={{ minHeight: 80 }} placeholder="Describe the TOD procedures performed (document review, inquiry, walkthroughs)…" />
            </div>
            <div className="form-group">
              <label className="form-label">Design Observations</label>
              <textarea className="ai-input" style={{ minHeight: 80 }} placeholder="Document what was observed about the control design…" />
            </div>
            <div className="form-group">
              <label className="form-label">TOD Conclusion</label>
              <select className="form-select">
                <option>Design Adequate — Proceed to TOI</option>
                <option>Design Partially Adequate — Proceed with noted weaknesses</option>
                <option>Design Inadequate — Finding raised, halt TOI</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Rationale for Conclusion</label>
              <textarea className="ai-input" style={{ minHeight: 60 }} placeholder="Explain the basis for your TOD conclusion…" />
            </div>
            <button className="btn btn-primary w-full">Save TOD Workpaper</button>
          </div>
        </div>
      )}
    </div>
  )
}
