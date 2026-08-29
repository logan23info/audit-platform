import { useState, useEffect, useCallback } from 'react'
import PageHeader from '../../components/PageHeader'
import AIPanel from '../../components/AIPanel'
import { CheckCircle2, Plus, Trash2, Loader2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useProgramme } from '../../context/ProgrammeContext'
import { useToast } from '../../components/Toast'
import { getRisks, getRiskControlLinks, createRiskControlLink, deleteRiskControlLink } from '../../lib/supabase'
import { controls as annexAControls } from '../../data/iso27002_controls'

const treatmentOptions = [
  { option: 'Mitigate', desc: 'Implement controls to reduce likelihood or impact below risk appetite', when: 'Risk is above appetite and cost of control is less than cost of risk materialising', examples: ['Patch management programme', 'MFA implementation', 'DLP tool deployment', 'Security awareness training'] },
  { option: 'Accept', desc: 'Formally accept the residual risk — documented and signed off by risk owner', when: 'Residual risk is within appetite OR cost of treatment exceeds benefit', examples: ['Low-scored risks within appetite', 'Risks with no cost-effective control', 'Risks accepted as business necessary'] },
  { option: 'Transfer', desc: 'Transfer financial consequence to a third party — insurance or contract', when: 'Risk cannot be eliminated but financial impact can be shared', examples: ['Cyber insurance policy', 'Contractual liability clauses with suppliers', 'Outsourcing to specialist provider'] },
  { option: 'Avoid', desc: 'Eliminate the risk by stopping the activity that causes it', when: 'Risk is too high and no cost-effective treatment exists', examples: ['Exit high-risk market or geography', 'Decommission vulnerable legacy system', 'Cancel high-risk project'] },
]

const controlMapping = [
  { risk: 'Ransomware / Malware', score: '20', controls: 'A.8.7, A.8.8, A.8.13, A.8.15', treatment: 'Mitigate', residual: '6' },
  { risk: 'Unauthorised Access', score: '16', controls: 'A.5.15, A.5.16, A.5.17, A.8.2, A.8.5', treatment: 'Mitigate', residual: '4' },
  { risk: 'Data Exfiltration', score: '15', controls: 'A.8.12, A.8.20, A.8.22, A.5.14', treatment: 'Mitigate', residual: '6' },
  { risk: 'Supplier / Third Party Breach', score: '12', controls: 'A.5.19, A.5.20, A.5.21, A.5.22', treatment: 'Mitigate + Transfer', residual: '6' },
  { risk: 'Phishing / Social Engineering', score: '15', controls: 'A.6.3, A.8.7, A.8.23, A.5.24', treatment: 'Mitigate', residual: '6' },
  { risk: 'Insider Threat', score: '12', controls: 'A.5.3, A.6.2, A.8.2, A.8.15, A.8.16', treatment: 'Mitigate', residual: '4' },
  { risk: 'DDoS / Availability', score: '9', controls: 'A.8.6, A.8.14, A.5.30', treatment: 'Mitigate + Transfer', residual: '4' },
  { risk: 'Data Loss / Corruption', score: '12', controls: 'A.8.13, A.8.14, A.8.10', treatment: 'Mitigate', residual: '3' },
  { risk: 'Regulatory Non-Compliance', score: '12', controls: 'A.5.31, A.5.34, A.5.36', treatment: 'Mitigate', residual: '4' },
  { risk: 'Misconfiguration', score: '12', controls: 'A.8.9, A.8.25, A.8.32', treatment: 'Mitigate', residual: '4' },
]

const scoreColor = (s) => {
  const n = parseInt(s)
  if (n >= 15) return 'text-red-400 font-bold'
  if (n >= 9) return 'text-amber-audit font-bold'
  return 'text-emerald-400 font-bold'
}

function LiveRiskControlMap() {
  const { user } = useAuth()
  const { activeProgramme } = useProgramme()
  const { toast } = useToast()
  const [risks, setRisks] = useState([])
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ risk_id: '', control_id: '', treatment_rationale: '' })
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    if (!activeProgramme) return
    setLoading(true)
    try {
      const [r, l] = await Promise.all([getRisks(activeProgramme.id), getRiskControlLinks(activeProgramme.id)])
      setRisks(r); setLinks(l)
    } catch (e) { toast('Failed to load: ' + e.message, 'error') }
    setLoading(false)
  }, [activeProgramme])

  useEffect(() => { load() }, [load])

  const addLink = async () => {
    if (!form.risk_id || !form.control_id) return
    setSaving(true)
    try {
      const row = await createRiskControlLink({ programme_id: activeProgramme.id, user_id: user?.id, ...form })
      setLinks(p => [...p, row])
      setForm({ risk_id: '', control_id: '', treatment_rationale: '' })
    } catch (e) { toast('Save failed: ' + e.message, 'error') }
    setSaving(false)
  }

  const removeLink = async (id) => {
    try { await deleteRiskControlLink(id); setLinks(p => p.filter(l => l.id !== id)) }
    catch (e) { toast('Delete failed', 'error') }
  }

  if (!activeProgramme) return <div className="card text-center py-8 mb-6 text-steel-400 text-sm">Select an audit programme to link risks to controls.</div>

  return (
    <div className="card mb-6">
      <h2 className="section-title mb-1">Risk ↔ Control Map — Live (Cl. 6.1.3)</h2>
      <p className="text-xs text-steel-400 mb-4">Real, DB-backed mapping of this programme's actual risk register entries to Annex A controls. Feeds ISMS Implementation (Layer 2) prioritisation.</p>
      <div className="flex flex-wrap gap-2 mb-4">
        <select className="input-field text-xs py-1.5 flex-1 min-w-40" value={form.risk_id} onChange={e => setForm(p => ({ ...p, risk_id: e.target.value }))}>
          <option value="">Select risk...</option>
          {risks.map(r => <option key={r.id} value={r.id}>{r.risk_ref} — {r.asset}</option>)}
        </select>
        <select className="input-field text-xs py-1.5 flex-1 min-w-40" value={form.control_id} onChange={e => setForm(p => ({ ...p, control_id: e.target.value }))}>
          <option value="">Select control...</option>
          {annexAControls.map(c => <option key={c.ref} value={c.ref}>{c.ref} — {c.title}</option>)}
        </select>
        <input className="input-field text-xs py-1.5 flex-1 min-w-40" placeholder="Treatment rationale" value={form.treatment_rationale} onChange={e => setForm(p => ({ ...p, treatment_rationale: e.target.value }))} />
        <button onClick={addLink} disabled={saving || !form.risk_id || !form.control_id} className="btn-primary text-xs py-1.5"><Plus size={12} /> Link</button>
      </div>
      {loading ? <Loader2 size={18} className="animate-spin text-steel-400 mx-auto" /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b border-navy-700 bg-navy-800/50">{['Risk', 'Control', 'Rationale', ''].map(h => <th key={h} className="text-left py-2 px-3 text-steel-400 font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {links.length === 0 ? <tr><td colSpan={4} className="py-8 text-center text-steel-400">No links yet</td></tr> : links.map(l => {
                const risk = risks.find(r => r.id === l.risk_id)
                return (
                  <tr key={l.id} className="border-b border-navy-800">
                    <td className="py-2 px-3 text-white">{risk?.risk_ref || '—'} {risk?.asset ? `— ${risk.asset}` : ''}</td>
                    <td className="py-2 px-3 text-blue-400 font-mono">{l.control_id}</td>
                    <td className="py-2 px-3 text-steel-300">{l.treatment_rationale}</td>
                    <td className="py-2 px-3"><button onClick={() => removeLink(l.id)} className="text-steel-500 hover:text-red-400"><Trash2 size={13} /></button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default function RTP() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader standard="ISO 27005:2022" clause="Risk Treatment Plan" title="Risk Treatment Plan (RTP)"
        description="ISO 27005:2022 risk treatment — select treatment options (Mitigate, Accept, Transfer, Avoid), map risks to ISO 27002 Annex A controls, and document residual risk acceptance. The RTP feeds directly into the Statement of Applicability (SoA)."
        badges={['ISO 27005', 'ISO 27002', 'Cl. 6.1.3']} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {treatmentOptions.map(t => (
          <div key={t.option} className="card-sm text-center">
            <div className="text-sm font-bold text-amber-audit mb-1">{t.option}</div>
            <div className="text-xs text-steel-400 leading-snug">{t.desc.split(' — ')[0]}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        {treatmentOptions.map(t => (
          <div key={t.option} className="card border-l-4 border-l-amber-audit">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="clause-tag flex-shrink-0 self-start">{t.option}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-steel-300 mb-2">{t.desc}</p>
                <div className="text-xs text-steel-400 mb-2"><span className="text-steel-300 font-medium">Use when: </span>{t.when}</div>
                <div className="flex flex-wrap gap-1.5">
                  {t.examples.map(e => <span key={e} className="badge badge-steel text-xs">{e}</span>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <LiveRiskControlMap />

      <div className="card mb-6">
        <h2 className="section-title mb-3">Risk → Control Mapping — Illustrative Reference</h2>
        <p className="text-xs text-steel-400 mb-4">Common risk scenarios mapped to applicable ISO 27002:2022 controls with indicative inherent and residual scores (1–25 scale). Static reference examples — use the live map above to link your programme's actual risks.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b border-navy-700 bg-navy-800/50">
              {['Risk Scenario', 'Inherent', 'ISO 27002 Controls', 'Treatment', 'Residual'].map(h => (
                <th key={h} className="text-left py-2.5 px-3 text-steel-400 font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {controlMapping.map((r, i) => (
                <tr key={r.risk} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/20'}`}>
                  <td className="py-2.5 px-3 text-white font-medium">{r.risk}</td>
                  <td className={`py-2.5 px-3 ${scoreColor(r.score)}`}>{r.score}</td>
                  <td className="py-2.5 px-3 text-blue-400 font-mono">{r.controls}</td>
                  <td className="py-2.5 px-3"><span className="badge badge-amber text-xs">{r.treatment}</span></td>
                  <td className={`py-2.5 px-3 ${scoreColor(r.residual)}`}>{r.residual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AIPanel title="Generate Risk Treatment Plan"
        systemPrompt="You are an ISO 27005:2022 risk treatment specialist. Generate formal Risk Treatment Plans mapping identified risks to ISO 27002:2022 Annex A controls. Include treatment option justification, control references, implementation guidance, residual risk scores, and risk acceptance statements. All outputs must be audit-ready."
        placeholder="e.g. Generate a risk treatment plan for a cloud-native fintech with 10 high-rated risks"
        contextFields={[
          { id: 'org', label: 'Organisation & Sector', type: 'text', placeholder: 'e.g. AWS SaaS fintech, 200 staff, FCA regulated' },
          { id: 'artifact', label: 'Artifact Required', type: 'select', options: ['Full Risk Treatment Plan', 'Control Selection Justification', 'Risk Acceptance Statement', 'Residual Risk Register', 'Treatment Implementation Roadmap', 'Risk-to-Control Mapping Table'] },
          { id: 'risks', label: 'Key Risks to Address', type: 'textarea', placeholder: 'e.g. Ransomware, insider threat, cloud misconfiguration...' },
        ]} />
    </div>
  )
}
