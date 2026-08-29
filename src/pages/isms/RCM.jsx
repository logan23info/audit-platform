import { useState, useEffect, useCallback } from 'react'
import { FileDown, Loader2 } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import { exportToCSV } from '../../utils/exportCSV'
import { controls, themeColors } from '../../data/iso27002_controls'
import { useProgramme } from '../../context/ProgrammeContext'
import { useAuth } from '../../context/AuthContext'
import { getSoA, getISMSImplementation, getRiskControlLinks, getRisks, upsertISMSControl } from '../../lib/supabase'
import { useToast } from '../../components/Toast'
import { debounce } from '../../lib/debounce'

const debouncedSave = debounce((fn) => fn(), 600)
const TEXT_FIELDS = ['population_desc', 'selection_method', 'test_conclusion']

// Truth table — RCM test conclusion badge
// SoA Applicable | Impl Status  | Test Result  | -> Conclusion badge
//   No           | —            | —            | Excluded
//   Yes          | not Implemented | —         | Not Ready for Testing
//   Yes          | Implemented  | Not Tested / empty | Untested
//   Yes          | Implemented  | Pass         | Operating Effectively
//   Yes          | Implemented  | Exception    | Exception Noted
//   Yes          | Implemented  | Fail         | Control Failure
function conclusionBadge(applicable, implStatus, testResult) {
  if (applicable !== 'Yes') return { label: 'Excluded', color: 'text-steel-500 bg-navy-800' }
  if (implStatus !== 'Implemented') return { label: 'Not Ready for Testing', color: 'text-steel-400 bg-navy-700' }
  if (!testResult || testResult === 'Not Tested') return { label: 'Untested', color: 'text-blue-400 bg-blue-900/30 border border-blue-700' }
  if (testResult === 'Pass') return { label: 'Operating Effectively', color: 'text-emerald-400 bg-emerald-900/30 border border-emerald-700' }
  if (testResult === 'Exception') return { label: 'Exception Noted', color: 'text-amber-audit bg-amber-900/30 border border-amber-700' }
  return { label: 'Control Failure', color: 'text-red-400 bg-red-900/30 border border-red-700' }
}

const RCM_COLUMNS = [
  { label: 'Control Ref', key: 'ref' }, { label: 'Control Title', key: 'title' },
  { label: 'Linked Risks', key: 'riskRefs' }, { label: 'Applicable', key: 'applicable' },
  { label: 'Implementation Status', key: 'status' }, { label: 'Sample Size', key: 'sample_size' },
  { label: 'Population', key: 'population_desc' }, { label: 'Selection Method', key: 'selection_method' },
  { label: 'Test Result', key: 'test_result' }, { label: 'Conclusion', key: 'test_conclusion' },
]

const emptyTest = () => ({ sample_size: '', population_desc: '', selection_method: '', test_result: 'Not Tested', test_conclusion: '' })

export default function RCM() {
  const { user } = useAuth()
  const { activeProgramme } = useProgramme()
  const { toast } = useToast()
  const [soaMap, setSoaMap] = useState({})
  const [implData, setImplData] = useState({})
  const [riskLinks, setRiskLinks] = useState({}) // control_id -> [risk_ref,...]
  const [loading, setLoading] = useState(false)
  const [savingRef, setSavingRef] = useState(null)
  const [search, setSearch] = useState('')
  const [filterResult, setFilterResult] = useState('All')

  const load = useCallback(async () => {
    if (!activeProgramme) return
    setLoading(true)
    try {
      const [soaRows, implRows, links, risks] = await Promise.all([
        getSoA(activeProgramme.id), getISMSImplementation(activeProgramme.id),
        getRiskControlLinks(activeProgramme.id), getRisks(activeProgramme.id),
      ])
      const soa = {}
      soaRows.forEach(r => { soa[r.control_id] = r.applicable })
      const riskByaId = Object.fromEntries(risks.map(r => [r.id, r.risk_ref]))
      const rl = {}
      links.forEach(l => { (rl[l.control_id] ||= []).push(riskByaId[l.risk_id] || '—') })
      const impl = controls.reduce((acc, c) => ({ ...acc, [c.ref]: { status: 'Not Started', evidence_url: '', ...emptyTest() } }), {})
      implRows.forEach(r => {
        impl[r.control_id] = {
          status: r.status, evidence_url: r.evidence_url || '',
          sample_size: r.sample_size ?? '', population_desc: r.population_desc || '',
          selection_method: r.selection_method || '', test_result: r.test_result || 'Not Tested',
          test_conclusion: r.test_conclusion || '',
        }
      })
      setSoaMap(soa); setImplData(impl); setRiskLinks(rl)
    } catch (e) { toast('Failed to load RCM: ' + e.message, 'error') }
    setLoading(false)
  }, [activeProgramme])

  useEffect(() => { load() }, [load])

  const persist = (ref, row) => {
    if (!activeProgramme) return
    setSavingRef(ref)
    upsertISMSControl({
      programme_id: activeProgramme.id, user_id: user?.id, control_id: ref,
      status: row.status, evidence_url: row.evidence_url,
      sample_size: row.sample_size === '' ? null : Number(row.sample_size),
      population_desc: row.population_desc, selection_method: row.selection_method,
      test_result: row.test_result, test_conclusion: row.test_conclusion,
    }).catch(e => toast('Save failed — ' + ref + ': ' + e.message, 'error'))
      .finally(() => setSavingRef(null))
  }

  const update = (ref, field, value) => {
    const row = { ...implData[ref], [field]: value }
    setImplData(p => ({ ...p, [ref]: row }))
    if (TEXT_FIELDS.includes(field)) debouncedSave(ref, () => persist(ref, row))
    else persist(ref, row)
  }

  // RCM reads SoA applicability + Implementation status as source of truth — same discipline as Layer 2
  const applicableControls = controls.filter(c => (soaMap[c.ref] ?? 'Yes') === 'Yes')
  const filtered = applicableControls.filter(c => {
    const row = implData[c.ref] || emptyTest()
    const matchesSearch = !search || c.ref.toLowerCase().includes(search.toLowerCase()) || c.title.toLowerCase().includes(search.toLowerCase())
    const matchesResult = filterResult === 'All' || (row.test_result || 'Not Tested') === filterResult
    return matchesSearch && matchesResult
  })

  const stats = {
    total: applicableControls.length,
    tested: applicableControls.filter(c => (implData[c.ref]?.test_result || 'Not Tested') !== 'Not Tested').length,
    pass: applicableControls.filter(c => implData[c.ref]?.test_result === 'Pass').length,
    exception: applicableControls.filter(c => implData[c.ref]?.test_result === 'Exception').length,
    fail: applicableControls.filter(c => implData[c.ref]?.test_result === 'Fail').length,
  }

  const exportData = applicableControls.map(c => ({
    ref: c.ref, title: c.title, riskRefs: (riskLinks[c.ref] || []).join('; '),
    applicable: soaMap[c.ref] || 'Yes', ...implData[c.ref],
  }))

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        standard="ISO 27001:2022"
        clause="RCM"
        title="Risk Control Matrix"
        description="Single working-paper view joining Risk ↔ Control links, Implementation status, and control testing — sample size, population, selection method, test result, and conclusion — for every applicable control. Reads SoA and Implementation as source of truth; testing fields are additive to Layer 2."
        badges={['RCM', 'Reads SoA + Layer 2', 'ISMS']}
      />

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {[
          { label: 'Applicable Controls', value: stats.total, color: 'text-white' },
          { label: 'Tested', value: stats.tested, color: 'text-blue-400' },
          { label: 'Operating Effectively', value: stats.pass, color: 'text-emerald-400' },
          { label: 'Exceptions', value: stats.exception, color: 'text-amber-audit' },
          { label: 'Control Failures', value: stats.fail, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="card-sm text-center">
            <div className={`font-display text-2xl font-bold mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs text-steel-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card mb-4">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center">
          <input className="input-field text-xs py-1.5 pl-3 flex-1 min-w-40" placeholder="Search ref or title..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="input-field text-xs py-1.5 w-full sm:w-auto" value={filterResult} onChange={e => setFilterResult(e.target.value)}>
            <option value="All">All Test Results</option>
            <option>Not Tested</option><option>Pass</option><option>Exception</option><option>Fail</option>
          </select>
          <span className="text-xs text-steel-400 sm:ml-auto">{filtered.length} controls{savingRef ? ' — saving...' : ''}</span>
          <button onClick={() => exportToCSV(exportData, 'ISMS_RCM', RCM_COLUMNS)} className="btn-secondary text-xs py-1.5">
            <FileDown size={12} /> Export CSV
          </button>
        </div>
      </div>

      {!activeProgramme && <div className="card text-center py-8 mb-6 text-steel-400 text-sm">Select an audit programme to load the RCM.</div>}
      {loading && <div className="card text-center py-8 mb-6"><Loader2 size={20} className="animate-spin text-steel-400 mx-auto" /></div>}

      {!loading && activeProgramme && (
        <div className="card p-0 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-navy-700 bg-navy-800/50">
                  {['Control', 'Title', 'Linked Risks', 'Sample Size', 'Population', 'Selection Method', 'Test Result', 'Conclusion'].map(h => (
                    <th key={h} className="text-left py-3 px-3 text-steel-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="py-12 text-center text-steel-400">No applicable controls match — check SoA if none are marked Applicable</td></tr>
                ) : filtered.map((c, i) => {
                  const row = implData[c.ref] || emptyTest()
                  const badge = conclusionBadge(soaMap[c.ref] || 'Yes', row.status, row.test_result)
                  return (
                    <tr key={c.ref} className={`border-b border-navy-800 ${i % 2 === 0 ? '' : 'bg-navy-800/10'}`}>
                      <td className="py-2 px-3 whitespace-nowrap font-mono text-amber-audit font-semibold">{c.ref}</td>
                      <td className="py-2 px-3 text-white max-w-xs">
                        {c.title}
                        <div className="mt-0.5"><span className={`badge text-xs ${themeColors[c.theme]}`}>{c.theme}</span></div>
                      </td>
                      <td className="py-2 px-3 text-steel-300 whitespace-nowrap">{(riskLinks[c.ref] || []).join(', ') || '—'}</td>
                      <td className="py-2 px-3 min-w-20"><input type="number" min="0" className="input-field text-xs py-0.5 w-full" value={row.sample_size} onChange={e => update(c.ref, 'sample_size', e.target.value)} /></td>
                      <td className="py-2 px-3 min-w-32"><input className="input-field text-xs py-0.5 w-full" placeholder="e.g. All change tickets Q1" value={row.population_desc} onChange={e => update(c.ref, 'population_desc', e.target.value)} /></td>
                      <td className="py-2 px-3 min-w-32"><input className="input-field text-xs py-0.5 w-full" placeholder="e.g. Random / Judgemental" value={row.selection_method} onChange={e => update(c.ref, 'selection_method', e.target.value)} /></td>
                      <td className="py-2 px-3 whitespace-nowrap">
                        <select className="input-field py-0.5 text-xs w-28" value={row.test_result} onChange={e => update(c.ref, 'test_result', e.target.value)}>
                          <option>Not Tested</option><option>Pass</option><option>Exception</option><option>Fail</option>
                        </select>
                        <div className={`mt-1 text-xs px-1.5 py-0.5 rounded inline-block ${badge.color}`}>{badge.label}</div>
                      </td>
                      <td className="py-2 px-3 min-w-40"><input className="input-field text-xs py-0.5 w-full" placeholder="Test conclusion / rationale" value={row.test_conclusion} onChange={e => update(c.ref, 'test_conclusion', e.target.value)} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-navy-700 text-xs text-steel-500">
            {filtered.length} applicable controls — {stats.pass} operating effectively, {stats.exception} exceptions, {stats.fail} failures, {stats.total - stats.tested} untested
          </div>
        </div>
      )}
    </div>
  )
}
