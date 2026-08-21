import { useState } from 'react'
import AIPanel from '../../components/AIPanel'

const sampleTable = [
  { freq: 'Daily (365/yr)', low: 5, moderate: 15, high: 25 },
  { freq: 'Weekly (52/yr)', low: 5, moderate: 10, high: 15 },
  { freq: 'Monthly (12/yr)', low: 2, moderate: 3, high: 5 },
  { freq: 'Quarterly (4/yr)', low: 1, moderate: 2, high: 3 },
  { freq: 'Annual (1/yr)', low: 1, moderate: 1, high: 1 },
]

export default function TOE() {
  const [tab, setTab] = useState('overview')
  const [sampleFreq, setSampleFreq] = useState('')
  const [sampleRisk, setSampleRisk] = useState('')
  const [excTotal, setExcTotal] = useState('')
  const [excFailed, setExcFailed] = useState('')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'frequency', label: 'Control Frequency' },
    { id: 'population', label: 'Population Definition' },
    { id: 'sampling', label: 'Sampling Methodology' },
    { id: 'calculator', label: 'Exception Calculator' },
    { id: 'reperformance', label: 'Re-performance' },
    { id: 'itgc', label: 'ITGC Automated' },
    { id: 'rollforward', label: 'Rollforward/Rollback' },
    { id: 'workpaper', label: 'TOE Conclusion' },
  ]

  const selectedRow = sampleTable.find(r => r.freq.toLowerCase().startsWith(sampleFreq.toLowerCase().split(' ')[0])) || null
  const sampleSize = selectedRow ? (sampleRisk === 'Low' ? selectedRow.low : sampleRisk === 'Moderate' ? selectedRow.moderate : selectedRow.high) : null
  const excRate = excTotal && excFailed ? ((parseFloat(excFailed) / parseFloat(excTotal)) * 100).toFixed(1) : null

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">ISO 19011:2018 — Clause 6.4 | Audit Execution</div>
        <h1 className="page-title">TOE — Test of Operating Effectiveness</h1>
        <p className="page-desc">Confirm the control has operated consistently and effectively over the full audit period. TOE asks: has this control operated as designed throughout the 6–12 month window?</p>
      </div>
      <div className="flex gap-1 mb-3" style={{ flexWrap: 'wrap' }}>
        <span className="badge badge-green">TOE Phase</span>
        <span className="badge badge-gold">Operating Effectiveness</span>
        <span className="badge badge-muted">Multi-Period Testing</span>
      </div>

      <div className="tab-list">
        {tabs.map(t => <button key={t.id} className={`tab-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>)}
      </div>

      {tab === 'overview' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-title">What is TOE?</div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>Test of Operating Effectiveness confirms that a control has been functioning consistently and correctly over the audit period. It uses statistical sampling to draw conclusions about the entire population of control executions.</p>
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--navy)', borderRadius: 6, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Key Question</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--green)', fontStyle: 'italic' }}>"Pull me all access reviews from the last 12 months. Let's test a sample."</p>
            </div>
          </div>
          <div className="card">
            <div className="card-title">TOE Prerequisite Checklist</div>
            {[
              'TOD completed — design confirmed adequate',
              'TOI completed — control confirmed implemented',
              'Audit period defined (start/end dates confirmed)',
              'Population source system identified',
              'Population completeness verified',
              'Sampling methodology determined',
              'Exception rate threshold defined',
              'Senior auditor approval of sample plan',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1 mb-1" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--green)', fontSize: '0.7rem' }}>◆</span>{item}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'frequency' && (
        <div className="card">
          <div className="card-title">Control Frequency Matrix</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Maps controls to their operating frequency — determines population size and required sample size for TOE.</p>
          <div style={{ overflowX: 'auto' }}>
            <table className="tbl">
              <thead><tr><th>Control</th><th>Description</th><th>Frequency</th><th>Annual Pop.</th><th>Risk Level</th></tr></thead>
              <tbody>
                {[
                  ['A.8.16', 'Security log monitoring', 'Daily', '365', 'High'],
                  ['A.8.2', 'Privileged access review', 'Monthly', '12', 'High'],
                  ['A.5.15', 'Access rights review', 'Quarterly', '4', 'High'],
                  ['A.5.1', 'Policy review & approval', 'Annual', '1', 'Medium'],
                  ['A.8.8', 'Vulnerability assessment', 'Monthly', '12', 'High'],
                  ['A.5.30', 'BCP/DR test', 'Annual', '1', 'High'],
                  ['A.8.9', 'Config baseline review', 'Quarterly', '4', 'Medium'],
                  ['A.6.1', 'Security awareness training', 'Annual', '1', 'Medium'],
                ].map(r => (
                  <tr key={r[0]}>
                    <td className="mono text-accent">{r[0]}</td>
                    <td style={{ color: 'var(--text-primary)' }}>{r[1]}</td>
                    <td>{r[2]}</td>
                    <td className="mono">{r[3]}</td>
                    <td><span className={`badge ${r[4]==='High'?'badge-red':'badge-amber'}`}>{r[4]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'population' && (
        <div>
          <div className="card mb-3">
            <div className="card-title">Population Definition Workpaper</div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Formally define the full population before sampling. Completeness of population is critical to TOE validity.</p>
            {[
              { label: 'Control Reference', placeholder: 'e.g. A.8.2 Privileged Access Review' },
              { label: 'Audit Period Start', placeholder: 'e.g. 01 January 2024' },
              { label: 'Audit Period End', placeholder: 'e.g. 31 December 2024' },
              { label: 'Population Source System', placeholder: 'e.g. ServiceNow, Active Directory, Splunk' },
              { label: 'Total Population Count', placeholder: 'e.g. 52 weekly access reviews' },
              { label: 'Population Completeness Verification Method', placeholder: 'e.g. System report vs manual log reconciliation' },
            ].map(f => (
              <div className="form-group" key={f.label}><label className="form-label">{f.label}</label><input className="form-input" placeholder={f.placeholder} /></div>
            ))}
            <button className="btn btn-primary btn-sm w-full">Save Population Definition</button>
          </div>
        </div>
      )}

      {tab === 'sampling' && (
        <div>
          <div className="card mb-3">
            <div className="card-title">Sample Size Reference — AICPA/IIA Standard</div>
            <div style={{ overflowX: 'auto' }}>
              <table className="tbl">
                <thead><tr><th>Control Frequency</th><th>Low Risk</th><th>Moderate Risk</th><th>High Risk</th></tr></thead>
                <tbody>
                  {sampleTable.map(r => (
                    <tr key={r.freq}>
                      <td style={{ color: 'var(--text-primary)' }}>{r.freq}</td>
                      <td className="text-green">{r.low}</td>
                      <td className="text-amber">{r.moderate}</td>
                      <td className="text-red">{r.high}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-title">Sample Size Calculator</div>
            <div className="grid-2" style={{ gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Control Frequency</label>
                <select className="form-select" value={sampleFreq} onChange={e => setSampleFreq(e.target.value)}>
                  <option value="">Select frequency…</option>
                  {sampleTable.map(r => <option key={r.freq} value={r.freq}>{r.freq}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Risk Level</label>
                <select className="form-select" value={sampleRisk} onChange={e => setSampleRisk(e.target.value)}>
                  <option value="">Select risk level…</option>
                  <option>Low</option><option>Moderate</option><option>High</option>
                </select>
              </div>
            </div>
            {sampleSize && (
              <div style={{ padding: '0.85rem', background: 'rgba(0,194,255,0.08)', border: '1px solid rgba(0,194,255,0.2)', borderRadius: 6, textAlign: 'center' }}>
                <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>REQUIRED SAMPLE SIZE</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{sampleSize}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>items from population</div>
              </div>
            )}
          </div>
          <div className="card">
            <div className="card-title">Sampling Methods</div>
            <table className="tbl">
              <thead><tr><th>Method</th><th>Description</th><th>When to Use</th><th>Bias Risk</th></tr></thead>
              <tbody>
                {[
                  ['Random', 'Each item has equal probability of selection (RNG-based)', 'Default — all homogeneous populations', 'None'],
                  ['Systematic', 'Every Nth item from ordered population', 'Large ordered datasets', 'Low'],
                  ['Haphazard', 'Auditor selects without specific pattern', 'Small populations only', 'Medium'],
                  ['Stratified', 'Population divided into strata, sampled within each', 'Heterogeneous populations with sub-groups', 'Low'],
                  ['Judgement', 'Auditor judgement — not statistical', 'Specific high-risk items only', 'High'],
                ].map(r => (
                  <tr key={r[0]}><td className="text-accent">{r[0]}</td><td style={{ color: 'var(--text-primary)' }}>{r[1]}</td><td>{r[2]}</td><td><span className={`badge ${r[3]==='None'?'badge-green':r[3]==='Low'?'badge-blue':r[3]==='Medium'?'badge-amber':'badge-red'}`}>{r[3]}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'calculator' && (
        <div>
          <div className="grid-2">
            <div className="card">
              <div className="card-title">Exception Rate Calculator</div>
              <div className="form-group"><label className="form-label">Total Sample Size</label><input className="form-input" type="number" placeholder="e.g. 25" value={excTotal} onChange={e => setExcTotal(e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Number of Exceptions Found</label><input className="form-input" type="number" placeholder="e.g. 2" value={excFailed} onChange={e => setExcFailed(e.target.value)} /></div>
              {excRate !== null && (
                <div style={{ padding: '1rem', background: parseFloat(excRate) === 0 ? 'rgba(0,212,138,0.08)' : parseFloat(excRate) <= 5 ? 'rgba(255,179,71,0.08)' : 'rgba(255,77,106,0.08)', border: `1px solid ${parseFloat(excRate) === 0 ? 'rgba(0,212,138,0.3)' : parseFloat(excRate) <= 5 ? 'rgba(255,179,71,0.3)' : 'rgba(255,77,106,0.3)'}`, borderRadius: 6, textAlign: 'center' }}>
                  <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>EXCEPTION RATE</div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 700, color: parseFloat(excRate) === 0 ? 'var(--green)' : parseFloat(excRate) <= 5 ? 'var(--amber)' : 'var(--red)', lineHeight: 1 }}>{excRate}%</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                    {parseFloat(excRate) === 0 ? '✓ No exceptions — Control Effective' : parseFloat(excRate) <= 5 ? '⚠ Low rate — Effective with Exceptions' : '✗ Exceeds threshold — Control Ineffective'}
                  </div>
                </div>
              )}
            </div>
            <div className="card">
              <div className="card-title">Exception Thresholds & Escalation</div>
              <table className="tbl">
                <thead><tr><th>Exception Rate</th><th>Conclusion</th><th>Action</th></tr></thead>
                <tbody>
                  {[
                    ['0%', 'Effective', 'Document and close', 'green'],
                    ['1–5%', 'Effective with Exceptions', 'Document exceptions, management notification', 'amber'],
                    ['6–10%', 'Partially Effective', 'Finding raised — Medium severity', 'amber'],
                    ['>10%', 'Ineffective', 'Finding raised — High severity, expand sample', 'red'],
                    ['Any > 0% critical', 'Ineffective', 'Finding raised — Critical severity, immediate escalation', 'red'],
                  ].map(r => (
                    <tr key={r[0]}><td className={`mono text-${r[3]}`}>{r[0]}</td><td style={{ color: 'var(--text-primary)' }}>{r[1]}</td><td>{r[2]}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'reperformance' && (
        <AIPanel
          title="AI — Re-performance Testing Script"
          systemPrompt="You are an IT audit specialist. Generate a re-performance testing script for a specific IT control. Re-performance means the auditor independently executes the control (or a simulation of it) to verify it produces the expected result. Include: (1) Setup requirements, (2) Step-by-step re-performance procedure, (3) Expected outcome, (4) How to compare auditor result to management's result, (5) Evidence to capture. Note any limitations if full re-performance is not possible and suggest partial re-performance alternatives."
          fields={[
            { key: 'control', label: 'Control to Re-perform', placeholder: 'e.g. A.8.8 Vulnerability scan and remediation verification' },
            { key: 'system', label: 'System / Tool', placeholder: 'e.g. Nessus, Qualys, AWS Security Hub' },
          ]}
        />
      )}

      {tab === 'itgc' && (
        <AIPanel
          title="AI — ITGC Automated Testing Script"
          systemPrompt="You are an IT General Controls (ITGC) audit specialist. Generate an automated testing script for the specified ITGC. Include: (1) Data to extract (SQL queries, API calls, or system report specifications), (2) Automated checks to run (completeness, existence, accuracy), (3) Expected outputs and how to interpret them, (4) Exception identification logic, (5) Population reconciliation steps. Assume the auditor has access to the system's export functionality, SQL access, or standard reporting tools."
          fields={[
            { key: 'control', label: 'ITGC to Automate', placeholder: 'e.g. Privileged account review, terminated user deprovisioning' },
            { key: 'system', label: 'System / Database', placeholder: 'e.g. Active Directory, Oracle DB, AWS IAM' },
            { key: 'period', label: 'Test Period', placeholder: 'e.g. January–December 2024' },
          ]}
        />
      )}

      {tab === 'rollforward' && (
        <div className="card">
          <div className="card-title">Rollforward & Rollback Testing Procedures</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>For audits where the audit period extends beyond direct observation or precedes the fieldwork date.</p>
          <div className="grid-2">
            <div>
              <div style={{ padding: '0.75rem', background: 'rgba(0,194,255,0.06)', borderRadius: 6, border: '1px solid rgba(0,194,255,0.2)', marginBottom: '0.75rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Rollforward Testing</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Extends TOE from the end of the main audit period to the report date.</p>
                {['Identify controls tested in main period', 'Select rollforward period (main end → report date)', 'Apply reduced sample to rollforward period', 'Confirm no significant changes to control in gap', 'Document rollforward conclusion separately'].map((item, i) => (
                  <div key={i} style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>• {item}</div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ padding: '0.75rem', background: 'rgba(240,165,0,0.06)', borderRadius: 6, border: '1px solid rgba(240,165,0,0.2)' }}>
                <div style={{ fontWeight: 600, color: 'var(--gold)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Rollback Testing</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Testing controls in a prior period before the main audit window.</p>
                {['Define prior period requiring rollback coverage', 'Obtain historical evidence from archives/logs', 'Apply consistent sampling methodology', 'Note any system or process changes in prior period', 'Document separately — clearly labelled as rollback'].map((item, i) => (
                  <div key={i} style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>• {item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'workpaper' && (
        <div className="card">
          <div className="card-title">TOE Conclusion Workpaper</div>
          <div className="grid-2" style={{ gap: '0.75rem', marginBottom: '0.75rem' }}>
            {['Control Reference', 'Audit Period', 'Population Size', 'Sample Size', 'Sampling Method', 'Auditor Name'].map(f => (
              <div className="form-group" key={f} style={{ marginBottom: 0 }}><label className="form-label">{f}</label><input className="form-input" placeholder="Enter…" /></div>
            ))}
          </div>
          <div className="form-group">
            <label className="form-label">Exceptions Identified</label>
            <textarea className="ai-input" style={{ minHeight: 60 }} placeholder="List any exceptions found with item reference, date, and nature of exception…" />
          </div>
          <div className="form-group">
            <label className="form-label">Exception Rate</label>
            <input className="form-input" placeholder="e.g. 2/25 = 8% — exceeds threshold" />
          </div>
          <div className="form-group">
            <label className="form-label">TOE Conclusion</label>
            <select className="form-select">
              <option>Effective — No exceptions identified</option>
              <option>Effective with Exceptions — Exception rate within tolerance</option>
              <option>Ineffective — Exception rate exceeds threshold. Finding raised.</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Rationale</label>
            <textarea className="ai-input" style={{ minHeight: 60 }} placeholder="Explain the basis for your TOE conclusion…" />
          </div>
          <button className="btn btn-primary w-full">Save TOE Workpaper</button>
        </div>
      )}
    </div>
  )
}
