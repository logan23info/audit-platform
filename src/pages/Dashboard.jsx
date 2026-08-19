import { useNavigate } from 'react-router-dom'
import {
  Shield, BarChart3, FileText, AlertTriangle, CheckCircle,
  Clock, ArrowRight, Activity, BookOpen, Target, Zap
} from 'lucide-react'

const stats = [
  { label: 'Total Modules', value: '58', sub: 'Across all standards', icon: BookOpen, color: 'text-steel-300' },
  { label: 'Standards Covered', value: '6', sub: 'ISO 19011 · 27001 · 27002 · 27005 · 27000 · 9001', icon: Shield, color: 'text-amber-audit' },
  { label: 'Audit Phases', value: '3', sub: 'TOD · TOI · TOE', icon: Activity, color: 'text-blue-400' },
  { label: 'AI-Powered Tools', value: '20+', sub: 'Artifact generators', icon: Zap, color: 'text-purple-400' },
]

const quickAccess = [
  { label: 'Audit Principles', sub: 'ISO 19011 Cl. 4', path: '/iso19011/clause4', color: 'border-amber-audit/30 hover:border-amber-audit/60', tag: 'Start Here' },
  { label: 'Audit Programme', sub: 'ISO 19011 Cl. 5', path: '/iso19011/clause5', color: 'border-navy-600 hover:border-steel-400/50', tag: 'Programme' },
  { label: 'Test of Design', sub: 'TOD Workpapers', path: '/iso19011/tod', color: 'border-blue-800 hover:border-blue-600', tag: 'TOD' },
  { label: 'Test of Implementation', sub: 'TOI Walkthroughs', path: '/iso19011/toi', color: 'border-purple-800 hover:border-purple-600', tag: 'TOI' },
  { label: 'Test of Effectiveness', sub: 'TOE Sampling', path: '/iso19011/toe', color: 'border-emerald-800 hover:border-emerald-600', tag: 'TOE' },
  { label: 'ISMS Scope & Context', sub: 'ISO 27001 Cl. 4', path: '/iso27001/clause4', color: 'border-navy-600 hover:border-steel-400/50', tag: '27001' },
  { label: 'Statement of Applicability', sub: 'ISO 27001 Cl. 6', path: '/iso27001/clause6', color: 'border-navy-600 hover:border-steel-400/50', tag: '27001' },
  { label: 'Risk Register', sub: 'ISO 27005', path: '/iso27005/register', color: 'border-red-800 hover:border-red-600', tag: '27005' },
  { label: 'Org. Controls', sub: 'ISO 27002 (5.1–5.37)', path: '/iso27002/organizational', color: 'border-navy-600 hover:border-steel-400/50', tag: '27002' },
  { label: 'Finding Development', sub: '4Cs Framework', path: '/iso19011/findings', color: 'border-orange-800 hover:border-orange-600', tag: 'Findings' },
  { label: 'PBC Master List', sub: 'Evidence Tracker', path: '/fieldwork/pbc', color: 'border-navy-600 hover:border-steel-400/50', tag: 'Fieldwork' },
  { label: 'Management Review', sub: 'ISO 27001 Cl. 9.3', path: '/reporting/management-review', color: 'border-pink-800 hover:border-pink-600', tag: 'Reporting' },
]

const lifecycle = [
  { phase: 'Pre-Audit', items: ['Audit Programme', 'Scope Matrix', 'RACI', 'Audit Plan'], color: 'bg-steel-400/10 border-steel-400/30 text-steel-300' },
  { phase: 'TOD', items: ['Design Gap Analyzer', 'Control Objectives', 'SoD Check', 'SoA Review'], color: 'bg-blue-500/10 border-blue-500/30 text-blue-300' },
  { phase: 'TOI', items: ['Walkthrough Scripts', 'System Demo Guide', 'Evidence Capture', 'Config SOPs'], color: 'bg-purple-500/10 border-purple-500/30 text-purple-300' },
  { phase: 'TOE', items: ['Sampling Methodology', 'Population Workpaper', 'Exception Calculator', 'Multi-Period Testing'], color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' },
  { phase: 'Closure', items: ['CAPA Workflow', 'Management Review', 'KPI Dashboard', 'Audit File Closure'], color: 'bg-amber-500/10 border-amber-500/30 text-amber-300' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero */}
      <div className="card border-navy-600 bg-gradient-to-br from-navy-800 to-navy-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-amber">Sprint 1</span>
              <span className="badge badge-steel">ISO 19011 Backbone Active</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-1">
              IT Audit Intelligence Platform
            </h2>
            <p className="text-steel-300 text-sm max-w-xl leading-relaxed">
              A structured audit engineering engine grounded in ISO 19011:2018, covering the full lifecycle from programme management through TOD · TOI · TOE to reporting and CAPA closure.
            </p>
          </div>
          <button
            onClick={() => navigate('/iso19011/clause4')}
            className="btn-primary flex-shrink-0"
          >
            Start Auditing <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="card-sm">
              <div className="flex items-start justify-between mb-2">
                <Icon size={16} className={s.color} />
              </div>
              <div className="font-display text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs font-medium text-steel-200 mt-0.5">{s.label}</div>
              <div className="text-xs text-steel-400 mt-0.5 leading-snug">{s.sub}</div>
            </div>
          )
        })}
      </div>

      {/* Audit Lifecycle */}
      <div className="card">
        <h2 className="section-title mb-4">Audit Lifecycle — ISO 19011 Backbone</h2>
        <div className="flex flex-col sm:flex-row gap-2 overflow-x-auto pb-1">
          {lifecycle.map((phase, i) => (
            <div key={phase.phase} className="flex sm:flex-col items-start sm:items-stretch gap-2 sm:gap-0 flex-shrink-0 sm:flex-1">
              <div className={`border rounded-lg px-3 py-2 sm:mb-2 min-w-[120px] sm:min-w-0 ${phase.color}`}>
                <div className="text-xs font-bold">{phase.phase}</div>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                {phase.items.map(item => (
                  <div key={item} className="text-xs text-steel-400 bg-navy-800 rounded px-2 py-1 leading-snug">
                    {item}
                  </div>
                ))}
              </div>
              {i < lifecycle.length - 1 && (
                <div className="hidden sm:flex items-center justify-center self-stretch px-1 text-steel-500">
                  <ArrowRight size={12} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="section-title mb-3">Quick Access — All Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {quickAccess.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`card-sm text-left border transition-all duration-150 hover:bg-navy-800 group ${item.color}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white group-hover:text-steel-100 truncate">{item.label}</div>
                  <div className="text-xs text-steel-400 mt-0.5">{item.sub}</div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="badge badge-steel text-xs">{item.tag}</span>
                  <ArrowRight size={12} className="text-steel-500 group-hover:text-steel-300 transition-colors" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
