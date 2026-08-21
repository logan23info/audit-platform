import AIPanel from '../../components/AIPanel'

export default function Preparation() {
  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">ISO 19011:2018 — Clause 6.3</div>
        <h1 className="page-title">Audit Preparation</h1>
        <p className="page-desc">Document review, formal audit plan, work assignment matrix, and workpaper preparation before fieldwork begins.</p>
      </div>
      <div className="flex gap-1 mb-3" style={{ flexWrap: 'wrap' }}>
        <span className="badge badge-blue">ISO 19011:2018</span><span className="badge badge-gold">Clause 6.3</span>
      </div>
      <div className="grid-2 mb-3">
        <div className="card">
          <div className="card-title">Formal Audit Plan — Cl.6.3.3</div>
          {['Audit Ref', 'Auditee', 'Lead Auditor', 'Audit Criteria (Standards)', 'Audit Scope', 'Audit Objectives', 'On-site / Remote / Hybrid'].map(f => (
            <div className="form-group" key={f}><label className="form-label">{f}</label><input className="form-input" placeholder="Enter…" /></div>
          ))}
          <button className="btn btn-primary btn-sm w-full">Generate Audit Plan</button>
        </div>
        <div className="card">
          <div className="card-title">Work Assignment Matrix — Cl.6.3.4</div>
          <table className="tbl">
            <thead><tr><th>Domain</th><th>Standard</th><th>Assigned Auditor</th><th>Days</th></tr></thead>
            <tbody>
              {[
                ['Governance & Policies', 'ISO 27001 Cl.4–6', 'Auditor A', '2'],
                ['Risk Management', 'ISO 27005', 'Auditor B', '2'],
                ['Org Controls', 'ISO 27002 5.x', 'Auditor A', '2'],
                ['Tech Controls', 'ISO 27002 8.x', 'Auditor C', '3'],
                ['QMS Processes', 'ISO 9001', 'Auditor B', '2'],
              ].map(r => (
                <tr key={r[0]}><td style={{ color: 'var(--text-primary)' }}>{r[0]}</td><td className="text-accent">{r[1]}</td><td>{r[2]}</td><td className="mono">{r[3]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AIPanel
        title="AI — Document Adequacy Review"
        systemPrompt="You are an ISO 19011 audit specialist performing document review (Cl.6.3.2) prior to fieldwork. Review the provided document list or document description against ISO 27001/27002/9001 mandatory documentation requirements. Identify: (1) Missing mandatory documents, (2) Documents present but likely inadequate, (3) Documents requiring update (version/date concerns), (4) Recommended additional documents to request. Provide a structured gap analysis."
        fields={[
          { key: 'docs', label: 'Documents Available / Received', type: 'textarea', placeholder: 'List documents received from auditee, e.g. Information Security Policy v2.1, Access Control Policy v1.0…' },
          { key: 'standard', label: 'Standard in Scope', type: 'select', options: ['ISO 27001:2022', 'ISO 27001 + ISO 9001', 'ISO 27001 + 27002 + 27005'] },
        ]}
      />
    </div>
  )
}
