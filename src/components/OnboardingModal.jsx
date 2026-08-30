import { useState, useEffect } from 'react'
import { X, ShieldCheck, ClipboardList, Table, FileCheck } from 'lucide-react'

// First-run walkthrough. State is per-browser (localStorage), not per-account
// — deliberately lightweight, no new table/column. Dismiss is permanent
// unless the user clears site data or a future "Show tour again" link
// (from /faq or /wiki) resets the flag.
const STORAGE_KEY = 'auditiq_onboarding_seen'

const STEPS = [
  { icon: ShieldCheck, title: 'Welcome to AuditIQ', body: 'A two-layer ISMS workspace for ISO/IEC 27001:2022 — Statement of Applicability, control implementation evidence, and certification audit readiness in one place.' },
  { icon: ClipboardList, title: 'Layer 1 → Layer 2', body: 'Start in SoA (Applicability) to decide which of the 93 Annex A controls apply. Then move to ISMS Implementation to record evidence for each applicable control.' },
  { icon: Table, title: 'Risk Control Matrix', body: 'The RCM joins your risk register, SoA, and Implementation into one working paper — plus sample-based testing fields for audit-defensible evidence.' },
  { icon: FileCheck, title: 'Certification readiness', body: 'Stage 1/2 readiness, findings, sign-offs, and reporting all read from the same live data — no re-entry, always current.' },
]

export default function OnboardingModal() {
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    try { if (!localStorage.getItem(STORAGE_KEY)) setVisible(true) }
    catch { /* localStorage unavailable — skip onboarding rather than error */ }
  }, [])

  const dismiss = () => {
    try { localStorage.setItem(STORAGE_KEY, '1') } catch { /* best-effort */ }
    setVisible(false)
  }

  if (!visible) return null
  const s = STEPS[step]
  const Icon = s.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="card max-w-md w-full relative">
        <button onClick={dismiss} className="absolute top-3 right-3 text-steel-500 hover:text-white" aria-label="Close"><X size={16} /></button>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-amber-audit/10 flex items-center justify-center flex-shrink-0"><Icon size={18} className="text-amber-audit" /></div>
          <h2 className="font-display text-base font-bold text-white">{s.title}</h2>
        </div>
        <p className="text-sm text-steel-300 leading-relaxed mb-5">{s.body}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === step ? 'bg-amber-audit' : 'bg-navy-700'}`} />)}
          </div>
          <div className="flex gap-2">
            {step > 0 && <button onClick={() => setStep(p => p - 1)} className="btn-secondary text-xs py-1.5">Back</button>}
            {step < STEPS.length - 1
              ? <button onClick={() => setStep(p => p + 1)} className="btn-primary text-xs py-1.5">Next</button>
              : <button onClick={dismiss} className="btn-primary text-xs py-1.5">Get Started</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
