import { useState, useEffect, useCallback } from 'react'
import { History, Loader2 } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import { useProgramme } from '../../context/ProgrammeContext'
import { getControlHistory } from '../../lib/supabase'
import { useToast } from '../../components/Toast'

export default function ISMSHistory() {
  const { activeProgramme } = useProgramme()
  const { toast } = useToast()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    if (!activeProgramme) return
    setLoading(true)
    try { setRows(await getControlHistory(activeProgramme.id)) }
    catch (e) { toast('Failed to load history: ' + e.message, 'error') }
    setLoading(false)
  }, [activeProgramme])

  useEffect(() => { load() }, [load])

  const filtered = rows.filter(r => !search || r.control_id.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        title="Control History — Retirement & Versioning"
        description="Every SoA applicability/status change and every Implementation status change is logged here, with the reason captured when a control is retired (marked Not Applicable after being Applicable)."
        badges={['Audit Trail', 'ISMS']}
      />

      <div className="card mb-4">
        <input className="input-field text-xs py-1.5" placeholder="Filter by control ref, e.g. A.5.1" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {!activeProgramme ? (
        <div className="card text-center py-12 text-steel-400 text-sm">Select an audit programme.</div>
      ) : loading ? (
        <div className="card text-center py-12"><Loader2 size={22} className="animate-spin text-steel-400 mx-auto" /></div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-navy-700 bg-navy-800/50">{['When', 'Control', 'Source', 'Field', 'From', 'To', 'Reason'].map(h => <th key={h} className="text-left py-2.5 px-3 text-steel-400 font-medium whitespace-nowrap">{h}</th>)}</tr></thead>
              <tbody>
                {filtered.length === 0 ? <tr><td colSpan={7} className="py-12 text-center text-steel-400">No history yet — changes to SoA applicability/status or Implementation status are logged automatically</td></tr>
                  : filtered.map(r => (
                    <tr key={r.id} className="border-b border-navy-800">
                      <td className="py-2 px-3 text-steel-400 whitespace-nowrap">{new Date(r.changed_at).toLocaleString()}</td>
                      <td className="py-2 px-3 font-mono text-amber-audit font-semibold">{r.control_id}</td>
                      <td className="py-2 px-3"><span className="badge badge-steel text-xs">{r.source}</span></td>
                      <td className="py-2 px-3 text-steel-300">{r.field}</td>
                      <td className="py-2 px-3 text-steel-400">{r.old_value || '—'}</td>
                      <td className="py-2 px-3 text-white font-medium">{r.new_value}</td>
                      <td className="py-2 px-3 text-steel-400 max-w-xs">{r.reason || ''}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-navy-700 text-xs text-steel-500">{filtered.length} of {rows.length} history entries</div>
        </div>
      )}
    </div>
  )
}
