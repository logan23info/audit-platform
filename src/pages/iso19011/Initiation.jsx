import AIPanel from '../../components/AIPanel'

export default function Initiation() {
  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">ISO 19011:2018 — Clause 6.2</div>
        <h1 className="page-title">Audit Initiation</h1>
        <p className="page-desc">Formal steps to initiate an audit: appointing the lead auditor, confirming feasibility, and making initial contact with the auditee.</p>
      </div>
      <div className="flex gap-1 mb-3" style={{ flexWrap: 'wrap' }}>
        <span className="badge badge-blue">ISO 19011:2018</span><span className="badge badge-gold">Clause 6.2</span>
      </div>
      <div className="grid-2 mb-3">
        <div className="card">
          <div className="card-title">Lead Auditor Appointment</div>
          {['Lead Auditor Name', 'Audit Reference', 'Auditee Organisation', 'Standards in Scope', 'Planned Start Date', 'Planned End Date'].map(f => (
            <div className="form-group" key={f}><label className="form-label">{f}</label><input className="form-input" placeholder={`Enter…`} /></div>
          ))}
          <div className="form-group"><label className="form-label">Independence Confirmed</label>
            <select className="form-select"><option>Yes — no conflicts identified</option><option>No — reassignment required</option></select>
          </div>
          <button className="btn btn-primary btn-sm w-full">Issue Appointment</button>
        </div>
        <div className="card">
          <div className="card-title">Feasibility Assessment — Cl.6.2.3</div>
          {[
            ['Sufficient information available to plan the audit?', 'Yes', 'No', 'Partial'],
            ['Auditee cooperation confirmed?', 'Yes', 'No', 'TBC'],
            ['Adequate auditor resources available?', 'Yes', 'No', 'Partial'],
            ['Audit objectives achievable within timeframe?', 'Yes', 'No', 'Partial'],
            ['Access to systems and documents confirmed?', 'Yes', 'No', 'TBC'],
          ].map(([q, ...opts]) => (
            <div className="form-group" key={q}>
              <label className="form-label" style={{ fontSize: '0.76rem' }}>{q}</label>
              <select className="form-select">{opts.map(o => <option key={o}>{o}</option>)}</select>
            </div>
          ))}
          <div className="form-group"><label className="form-label">Overall Feasibility</label>
            <select className="form-select"><option>Feasible — proceed to planning</option><option>Feasible with conditions</option><option>Not feasible — defer or cancel</option></select>
          </div>
        </div>
      </div>
      <AIPanel
        title="AI — Auditee Initial Contact Template"
        systemPrompt="You are an ISO 19011 audit professional. Draft a formal initial contact communication to an auditee organisation to notify them of an upcoming management system audit. Include: audit objectives, scope, standards, planned dates, initial document requests (PBC preview), contact details, and next steps. Tone: professional, collaborative, not adversarial."
        fields={[
          { key: 'auditee', label: 'Auditee Organisation', placeholder: 'e.g. Acme Financial Services Ltd' },
          { key: 'standard', label: 'Standard(s) Being Audited', placeholder: 'e.g. ISO 27001:2022 ISMS' },
          { key: 'dates', label: 'Planned Audit Dates', placeholder: 'e.g. 15–19 January 2025' },
          { key: 'scope', label: 'Audit Scope', placeholder: 'e.g. All ISMS controls for UK operations' },
        ]}
      />
    </div>
  )
}
