import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Shield, CalendarDays, PlayCircle, ClipboardList,
  PenTool, Eye, BarChart3, AlertTriangle, Users, FileText, GraduationCap,
  BookOpen, BookMarked, Map, Crown, Target, Wrench, Settings, TrendingUp,
  RefreshCw, Building2, UserCheck, Lock, Cpu, Sparkles, Database,
  AlertOctagon, ShieldCheck, Zap, Star, GitMerge, FileCheck, List,
  CheckSquare, FolderOpen, BarChart2, Activity, CheckCircle, Globe, X, Menu
} from 'lucide-react'
import { navSections } from '../navConfig'

const iconMap = {
  LayoutDashboard, Shield, CalendarDays, PlayCircle, ClipboardList,
  PenTool, Eye, BarChart3, AlertTriangle, Users, FileText, GraduationCap,
  BookOpen, BookMarked, Map, Crown, Target, Wrench, Settings, TrendingUp,
  RefreshCw, Building2, UserCheck, Lock, Cpu, Sparkles, Database,
  AlertOctagon, ShieldCheck, Zap, Star, GitMerge, FileCheck, List,
  CheckSquare, FolderOpen, BarChart2, Activity, CheckCircle, Globe
}

const sectionColors = {
  iso19011: 'text-amber-audit',
  iso27000: 'text-steel-400',
  iso27001: 'text-blue-400',
  iso27002: 'text-purple-400',
  iso27005: 'text-red-400',
  iso9001: 'text-emerald-400',
  ims: 'text-cyan-400',
  fieldwork: 'text-orange-400',
  reporting: 'text-pink-400',
  core: 'text-steel-400',
}

export default function Sidebar({ mobileOpen, onClose }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState({})

  const toggle = (id) => setCollapsed(p => ({ ...p, [id]: !p[id] }))

  const handleNav = (path) => {
    navigate(path)
    onClose?.()
  }

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-navy-900 border-r border-navy-700 z-50
        flex flex-col overflow-hidden
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-navy-700 flex-shrink-0">
          <div>
            <div className="font-display text-lg font-bold text-white tracking-tight">AuditIQ</div>
            <div className="text-xs text-steel-400 mt-0.5">IT Audit Intelligence Platform</div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-navy-800 text-steel-400"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {navSections.map(section => (
            <div key={section.id}>
              <button
                onClick={() => toggle(section.id)}
                className={`nav-section w-full text-left flex items-center justify-between hover:text-steel-200 transition-colors ${sectionColors[section.id] || 'text-steel-400'}`}
              >
                <span>{section.label}</span>
                <span className="text-xs normal-case font-normal opacity-60">
                  {collapsed[section.id] ? '▸' : '▾'}
                </span>
              </button>
              {!collapsed[section.id] && (
                <div className="space-y-0.5 mb-1">
                  {section.items.map(item => {
                    const Icon = iconMap[item.icon]
                    const isActive = location.pathname === item.path
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNav(item.path)}
                        className={`nav-item w-full text-left ${isActive ? 'active' : ''}`}
                      >
                        {Icon && <Icon size={14} className="flex-shrink-0" />}
                        <span className="truncate">{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
          <div className="h-8" />
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-navy-700 flex-shrink-0">
          <div className="text-xs text-steel-400 text-center">
            ISO 19011 · 27001 · 27002 · 27005 · 9001
          </div>
        </div>
      </aside>
    </>
  )
}
