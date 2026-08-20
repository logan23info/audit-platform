import { useState, useEffect, useCallback } from 'react'
import { FolderOpen, File, Download, Trash2, Filter, ExternalLink, Loader2, RefreshCw, Upload } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import FileUpload from '../../components/FileUpload'
import { useProgramme } from '../../context/ProgrammeContext'
import { useAuth } from '../../context/AuthContext'
import { getWorkpapers, deleteWorkpaper, updateWorkpaper, getSignedUrl } from '../../lib/supabase'

const statusColors = {
  'Draft': 'bg-blue-900/40 text-blue-300',
  'In Review': 'bg-amber-900/40 text-amber-300',
  'Signed Off': 'bg-emerald-900/40 text-emerald-300',
}

const phaseColors = {
  'TOD': 'bg-blue-900/40 text-blue-300',
  'TOI': 'bg-purple-900/40 text-purple-300',
  'TOE': 'bg-emerald-900/40 text-emerald-300',
  'Finding': 'bg-red-900/40 text-red-300',
  'Meeting': 'bg-cyan-900/40 text-cyan-300',
  'Report': 'bg-amber-900/40 text-amber-300',
  'Planning': 'bg-steel-400/20 text-steel-300',
  'PBC Evidence': 'bg-pink-900/40 text-pink-300',
}

function formatSize(bytes) {
  if (!bytes) return '—'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

// Group workpapers by standard then phase
function groupWorkpapers(workpapers) {
  const groups = {}
  workpapers.forEach(wp => {
    const std = wp.standard || 'Other'
    const phase = wp.phase || 'General'
    if (!groups[std]) groups[std] = {}
    if (!groups[std][phase]) groups[std][phase] = []
    groups[std][phase].push(wp)
  })
  return groups
}

export default function WorkpaperLibrary() {
  const { activeProgramme } = useProgramme()
  const { user } = useAuth()
  const [workpapers, setWorkpapers] = useState([])
  const [loading, setLoading] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [filterStandard, setFilterStandard] = useState('All')
  const [filterPhase, setFilterPhase] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [deleting, setDeleting] = useState(null)
  const [updating, setUpdating] = useState(null)

  const load = useCallback(async () => {
    if (!activeProgramme) return
    setLoading(true)
    try {
      const data = await getWorkpapers(activeProgramme.id)
      setWorkpapers(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [activeProgramme])

  useEffect(() => { load() }, [load])

  const standards = ['All', ...new Set(workpapers.map(w => w.standard).filter(Boolean))]
  const phases = ['All', ...new Set(workpapers.map(w => w.phase).filter(Boolean))]

  const filtered = workpapers.filter(w =>
    (filterStandard === 'All' || w.standard === filterStandard) &&
    (filterPhase === 'All' || w.phase === filterPhase) &&
    (filterStatus === 'All' || w.status === filterStatus)
  )

  const grouped = groupWorkpapers(filtered)

  async function handleDownload(wp) {
    try {
      const url = await getSignedUrl(wp.file_path)
      window.open(url, '_blank')
    } catch (e) {
      console.error('Download error:', e)
    }
  }

  async function handleDelete(wp) {
    if (!confirm(`Delete ${wp.workpaper_ref} — ${wp.title}? This cannot be undone.`)) return
    setDeleting(wp.id)
    try {
      await deleteWorkpaper(wp.id, wp.file_path)
      setWorkpapers(prev => prev.filter(w => w.id !== wp.id))
    } catch (e) {
      console.error('Delete error:', e)
    } finally {
      setDeleting(null)
    }
  }

  async function handleStatusChange(wp, newStatus) {
    setUpdating(wp.id)
    try {
      const updated = await updateWorkpaper(wp.id, { status: newStatus })
      setWorkpapers(prev => prev.map(w => w.id === wp.id ? updated : w))
    } catch (e) {
      console.error('Update error:', e)
    } finally {
      setUpdating(null)
    }
  }

  const stats = {
    total: workpapers.length,
    signedOff: workpapers.filter(w => w.status === 'Signed Off').length,
    draft: workpapers.filter(w => w.status === 'Draft').length,
    inReview: workpapers.filter(w => w.status === 'In Review').length,
  }

  if (!activeProgramme) {
    return (
      <div className="max-w-5xl mx-auto">
        <PageHeader standard="Fieldwork" clause="Workpaper Library" title="Workpaper Library" description="Upload and manage audit evidence files — organised by audit programme, standard, and phase." badges={['Cloud Storage', 'Supabase']} />
        <div className="card text-center py-12">
          <FolderOpen size={32} className="text-steel-500 mx-auto mb-3" />
          <div className="text-white font-medium mb-1">No audit programme selected</div>
          <div className="text-xs text-steel-400">Select or create an audit programme from the header to manage workpapers</div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        standard="Fieldwork"
        clause="Workpaper Library"
        title="Workpaper Library"
        description={`Cloud-stored audit evidence for ${activeProgramme.programme_id} — ${activeProgramme.name}. Files organised by standard and phase, permanently saved in Supabase.`}
        badges={['Cloud Storage', 'Structured Filing', activeProgramme.programme_id]}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Files', value: stats.total, color: 'text-white' },
          { label: 'Signed Off', value: stats.signedOff, color: 'text-emerald-400' },
          { label: 'In Review', value: stats.inReview, color: 'text-amber-audit' },
          { label: 'Draft', value: stats.draft, color: 'text-blue-400' },
        ].map(s => (
          <div key={s.label} className="card-sm text-center">
            <div className={`font-display text-2xl font-bold mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs text-steel-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Actions row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button onClick={() => setShowUpload(!showUpload)} className="btn-primary text-xs">
          <Upload size={13} /> {showUpload ? 'Hide Upload' : 'Upload File'}
        </button>
        <button onClick={load} className="btn-secondary text-xs">
          <RefreshCw size={13} /> Refresh
        </button>
        <div className="flex items-center gap-2 ml-auto flex-wrap">
          <Filter size={13} className="text-steel-400" />
          {[
            { label: 'Standard', value: filterStandard, setter: setFilterStandard, options: standards },
            { label: 'Phase', value: filterPhase, setter: setFilterPhase, options: phases },
            { label: 'Status', value: filterStatus, setter: setFilterStatus, options: ['All', 'Draft', 'In Review', 'Signed Off'] },
          ].map(f => (
            <select key={f.label} className="input-field py-1 text-xs w-auto" value={f.value} onChange={e => f.setter(e.target.value)}>
              {f.options.map(o => <option key={o}>{o}</option>)}
            </select>
          ))}
        </div>
      </div>

      {/* Upload panel */}
      {showUpload && (
        <div className="card mb-6">
          <h2 className="section-title mb-4">Upload Workpaper / Evidence File</h2>
          <FileUpload onUploaded={(wp) => { setWorkpapers(prev => [...prev, wp]); setShowUpload(false) }} />
        </div>
      )}

      {/* File tree — grouped by standard then phase */}
      {loading ? (
        <div className="card text-center py-12">
          <Loader2 size={24} className="animate-spin text-steel-400 mx-auto mb-2" />
          <div className="text-xs text-steel-400">Loading workpapers...</div>
        </div>
      ) : Object.keys(grouped).length === 0 ? (
        <div className="card text-center py-12">
          <FolderOpen size={32} className="text-steel-500 mx-auto mb-3" />
          <div className="text-white font-medium mb-1">No files yet</div>
          <div className="text-xs text-steel-400 mb-4">Upload your first workpaper or evidence file above</div>
          <button onClick={() => setShowUpload(true)} className="btn-primary text-xs mx-auto">
            <Upload size={12} /> Upload First File
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([standard, phases]) => (
            <div key={standard} className="card p-0 overflow-hidden">
              {/* Standard header */}
              <div className="px-4 py-3 bg-navy-800/50 border-b border-navy-700 flex items-center gap-2">
                <FolderOpen size={14} className="text-amber-audit" />
                <span className="text-sm font-semibold text-white">{standard}</span>
                <span className="text-xs text-steel-400 ml-auto">
                  {Object.values(phases).flat().length} file{Object.values(phases).flat().length !== 1 ? 's' : ''}
                </span>
              </div>

              {Object.entries(phases).map(([phase, files]) => (
                <div key={phase}>
                  {/* Phase subheader */}
                  <div className="px-4 py-2 bg-navy-900/30 border-b border-navy-800 flex items-center gap-2">
                    <span className={`badge text-xs ${phaseColors[phase] || 'badge-steel'}`}>{phase}</span>
                    <span className="text-xs text-steel-500">{files.length} file{files.length !== 1 ? 's' : ''}</span>
                  </div>

                  {/* Files */}
                  {files.map((wp, i) => (
                    <div key={wp.id} className={`flex items-center gap-3 px-4 py-3 border-b border-navy-800 last:border-0 ${i % 2 === 0 ? '' : 'bg-navy-800/10'}`}>
                      <File size={14} className="text-steel-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono text-amber-audit font-semibold">{wp.workpaper_ref}</span>
                          <span className="text-xs font-medium text-white truncate">{wp.title}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {wp.clause_control && <span className="text-xs text-steel-400">{wp.clause_control}</span>}
                          {wp.auditor && <span className="text-xs text-steel-500">· {wp.auditor}</span>}
                          <span className="text-xs text-steel-600">{formatSize(wp.file_size)}</span>
                          {wp.file_name && <span className="text-xs text-steel-600 truncate max-w-[150px]">{wp.file_name}</span>}
                        </div>
                      </div>

                      {/* Status selector */}
                      <select
                        className="input-field py-0.5 text-xs w-28 flex-shrink-0"
                        value={wp.status}
                        disabled={updating === wp.id}
                        onChange={e => handleStatusChange(wp, e.target.value)}
                      >
                        <option>Draft</option>
                        <option>In Review</option>
                        <option>Signed Off</option>
                      </select>

                      {/* Actions */}
                      <div className="flex gap-1 flex-shrink-0">
                        {wp.file_path && (
                          <button onClick={() => handleDownload(wp)} className="p-1.5 rounded hover:bg-navy-700 text-steel-400 hover:text-steel-200 transition-colors" title="Download">
                            <ExternalLink size={13} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(wp)}
                          disabled={deleting === wp.id}
                          className="p-1.5 rounded hover:bg-red-900/30 text-steel-500 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          {deleting === wp.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
