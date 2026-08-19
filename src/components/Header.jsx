import { Menu, Bell, Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { navSections } from '../navConfig'

function getPageTitle(pathname) {
  for (const section of navSections) {
    for (const item of section.items) {
      if (item.path === pathname) return item.label
    }
  }
  return 'Dashboard'
}

export default function Header({ onMenuClick }) {
  const location = useLocation()
  const title = getPageTitle(location.pathname)

  return (
    <header className="h-14 bg-navy-900 border-b border-navy-700 flex items-center px-4 gap-3 flex-shrink-0">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-navy-800 text-steel-400 hover:text-steel-200 transition-colors"
      >
        <Menu size={18} />
      </button>

      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-white truncate">{title}</h1>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 bg-navy-800 border border-navy-600 rounded-lg px-3 py-1.5">
        <Search size={13} className="text-steel-400" />
        <span className="text-xs text-steel-400">Search modules...</span>
      </div>

      <button className="p-2 rounded-lg hover:bg-navy-800 text-steel-400 hover:text-steel-200 transition-colors relative">
        <Bell size={16} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-audit" />
      </button>
    </header>
  )
}
