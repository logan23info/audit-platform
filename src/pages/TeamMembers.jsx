import { useState, useEffect, useCallback } from 'react'
import { Users, Loader2, UserPlus, Trash2, Shield } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { useProgramme } from '../context/ProgrammeContext'
import { useAuth } from '../context/AuthContext'
import { getProgrammeMembers, inviteProgrammeMember, updateMemberRole, removeMember } from '../lib/supabase'
import { useToast } from '../components/Toast'

const ROLE_DESC = {
  owner: 'Full access — can manage members and delete the programme.',
  auditor: 'Full read/write on all audit data. Cannot manage membership.',
  reviewer: 'Read-only, plus can add sign-off/approval stamps.',
  read_only: 'View only.',
}
const roleBadge = { owner: 'bg-amber-900/40 text-amber-300', auditor: 'bg-blue-900/40 text-blue-300', reviewer: 'bg-purple-900/40 text-purple-300', read_only: 'badge-steel' }

export default function TeamMembers() {
  const { user } = useAuth()
  const { activeProgramme } = useProgramme()
  const { toast } = useToast()
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [inviting, setInviting] = useState(false)
  const [form, setForm] = useState({ email: '', role: 'auditor' })

  const load = useCallback(async () => {
    if (!activeProgramme) return
    setLoading(true)
    try { setMembers(await getProgrammeMembers(activeProgramme.id)) }
    catch (e) { toast('Failed to load members: ' + e.message, 'error') }
    setLoading(false)
  }, [activeProgramme])

  useEffect(() => { load() }, [load])

  const myRole = members.find(m => m.user_id === user?.id)?.role
  const isOwner = myRole === 'owner'

  const invite = async (e) => {
    e.preventDefault()
    if (!form.email.trim() || !activeProgramme) return
    setInviting(true)
    try {
      const row = await inviteProgrammeMember({ programmeId: activeProgramme.id, email: form.email.trim(), role: form.role, invitedBy: user?.id })
      setMembers(p => [...p, row])
      setForm({ email: '', role: 'auditor' })
      toast('Member added', 'success')
    } catch (e) { toast('Invite failed: ' + e.message, 'error') }
    setInviting(false)
  }

  const changeRole = (id, role) => {
    updateMemberRole(id, role)
      .then(() => setMembers(p => p.map(m => m.id === id ? { ...m, role } : m)))
      .catch(e => toast('Role update failed: ' + e.message, 'error'))
  }

  const remove = (id) => {
    if (!window.confirm('Remove this member from the programme?')) return
    removeMember(id)
      .then(() => setMembers(p => p.filter(m => m.id !== id)))
      .catch(e => toast('Remove failed: ' + e.message, 'error'))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        standard="Access Control"
        clause="Team"
        title="Team Members"
        description="Manage who has access to this audit programme. Owner has full control; Auditor can read/write all audit data; Reviewer is read-only plus sign-off; Read Only is view-only. Access is enforced at the database level via Row-Level Security, not just hidden in the UI."
        badges={['RLS-Enforced', activeProgramme?.programme_id || 'No Programme']}
      />

      {!activeProgramme && <div className="card text-center py-8 mb-6 text-steel-400 text-sm">Select an audit programme to manage its team.</div>}
      {loading && <div className="card text-center py-8 mb-6"><Loader2 size={20} className="animate-spin text-steel-400 mx-auto" /></div>}

      {!loading && activeProgramme && (
        <>
          {isOwner ? (
            <div className="card mb-6">
              <h2 className="section-title mb-3 flex items-center gap-2"><UserPlus size={15} className="text-amber-audit" /> Invite a Member</h2>
              <form onSubmit={invite} className="flex flex-col sm:flex-row gap-3">
                <input type="email" required className="input-field flex-1 min-w-0" placeholder="colleague@company.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                <select className="input-field w-full sm:w-40" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}>
                  <option value="auditor">Auditor</option>
                  <option value="reviewer">Reviewer</option>
                  <option value="read_only">Read Only</option>
                </select>
                <button type="submit" disabled={inviting} className="btn-primary whitespace-nowrap">{inviting ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />} Invite</button>
              </form>
              <p className="text-xs text-steel-500 mt-3">Invites are sent via your Supabase edge function. The invited person must already have (or create) an AuditIQ account with this email.</p>
            </div>
          ) : (
            <div className="card mb-6 text-xs text-steel-400 flex items-center gap-2"><Shield size={13} /> Only the programme Owner can invite or remove members.</div>
          )}

          <div className="card p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-700 bg-navy-800/50">
                    {['Member', 'Role', 'Added', ''].map(h => (
                      <th key={h} className="text-left py-3 px-4 text-steel-400 font-medium text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {members.length === 0 ? (
                    <tr><td colSpan={4} className="py-10 text-center text-steel-400 text-xs">No members loaded.</td></tr>
                  ) : members.map(m => (
                    <tr key={m.id} className="border-b border-navy-800">
                      <td className="py-2.5 px-4 text-white text-xs font-mono">{m.user_id === user?.id ? 'You' : m.user_id}</td>
                      <td className="py-2.5 px-4">
                        {isOwner && m.role !== 'owner' ? (
                          <select className="input-field py-0.5 text-xs w-32" value={m.role} onChange={e => changeRole(m.id, e.target.value)}>
                            <option value="auditor">Auditor</option>
                            <option value="reviewer">Reviewer</option>
                            <option value="read_only">Read Only</option>
                          </select>
                        ) : (
                          <span className={`badge text-xs ${roleBadge[m.role]}`}>{m.role.replace('_', ' ')}</span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-steel-400 text-xs whitespace-nowrap">{m.created_at?.split('T')[0]}</td>
                      <td className="py-2.5 px-4 text-right">
                        {isOwner && m.role !== 'owner' && (
                          <button onClick={() => remove(m.id)} className="text-steel-500 hover:text-red-400"><Trash2 size={14} /></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 text-xs text-steel-500 leading-relaxed">
            {Object.entries(ROLE_DESC).map(([role, desc]) => (
              <div key={role} className="mb-1"><span className={`badge text-xs mr-2 ${roleBadge[role]}`}>{role.replace('_', ' ')}</span>{desc}</div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
