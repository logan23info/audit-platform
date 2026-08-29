import { useState, useEffect, useCallback } from 'react'
import { ShieldCheck, Loader2, Trash2 } from 'lucide-react'
import { getSignoffs, addSignoff, deleteSignoff, getMyRole } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useToast } from './Toast'

// Reusable approval-stamp panel — used on findings (CAPA Tracker) and
// on Stage 1/2 certification readiness (ISMS Certification Audit).
// Only Owner/Reviewer can add a sign-off (matches /team role description);
// only Owner can retract one. Enforced by RLS too, this is UX only.
export default function SignoffPanel({ programmeId, scopeType, scopeRef = null, label = 'Sign-off' }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [signoffs, setSignoffs] = useState([])
  const [myRole, setMyRole] = useState(null)
  const [loading, setLoading] = useState(false)
  const [comment, setComment] = useState('')
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    if (!programmeId || !user) return
    setLoading(true)
    try {
      const [s, role] = await Promise.all([getSignoffs(programmeId, scopeType, scopeRef), getMyRole(programmeId, user.id)])
      setSignoffs(s); setMyRole(role)
    } catch (e) { toast('Failed to load sign-offs: ' + e.message, 'error') }
    setLoading(false)
  }, [programmeId, scopeType, scopeRef, user])

  useEffect(() => { load() }, [load])

  const canSign = myRole === 'owner' || myRole === 'reviewer'

  const sign = () => {
    setSaving(true)
    addSignoff({ programme_id: programmeId, scope_type: scopeType, scope_ref: scopeRef, signed_by: user?.id, role_at_signoff: myRole, comment: comment.trim() || null })
      .then(row => { setSignoffs(p => [row, ...p]); setComment('') })
      .catch(e => toast('Sign-off failed: ' + e.message, 'error'))
      .finally(() => setSaving(false))
  }

  const retract = (id) => {
    deleteSignoff(id)
      .then(() => setSignoffs(p => p.filter(s => s.id !== id)))
      .catch(() => toast('Retract failed', 'error'))
  }

  if (loading) return <Loader2 size={12} className="animate-spin text-steel-400" />

  return (
    <div className="bg-navy-800 rounded-lg p-3">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-steel-300 mb-2"><ShieldCheck size={12} className="text-emerald-audit" /> {label} ({signoffs.length})</div>
      {signoffs.length === 0 && <div className="text-xs text-steel-500 mb-2">No sign-offs recorded yet.</div>}
      {signoffs.map(s => (
        <div key={s.id} className="flex items-start gap-2 mb-1.5 text-xs">
          <span className="badge bg-emerald-900/30 text-emerald-300 flex-shrink-0">{s.role_at_signoff}</span>
          <span className="text-steel-300 flex-1 min-w-0">{s.comment || 'Approved'} — {s.created_at?.split('T')[0]}</span>
          {myRole === 'owner' && <button onClick={() => retract(s.id)} className="text-steel-500 hover:text-red-400 flex-shrink-0"><Trash2 size={11} /></button>}
        </div>
      ))}
      {canSign ? (
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <input className="input-field text-xs py-1 flex-1 min-w-0" placeholder="Optional comment" value={comment} onChange={e => setComment(e.target.value)} />
          <button onClick={sign} disabled={saving} className="btn-secondary text-xs py-1 px-3 whitespace-nowrap">{saving ? <Loader2 size={11} className="animate-spin" /> : <ShieldCheck size={11} />} Sign Off</button>
        </div>
      ) : (
        <div className="text-xs text-steel-500 mt-1">Only the programme Owner or a Reviewer can sign off.</div>
      )}
    </div>
  )
}
