import { useState, useRef, useEffect } from 'react'
import { Menu, Bell, Search, X, ArrowRight } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { navSections } from '../navConfig'

function getPageTitle(pathname) {
  for (const section of navSections) {
    for (const item of section.items) {
      if (item.path === pathname) return item.label
    }
  }
  return 'Dashboard'
}

const allPages = navSections.flatMap(s =>
  s.items.map(item => ({ ...item, section: s.label }))
)

const notifications = [
  { id: 1, title: 'TOE Sampling reminder', desc: 'User Access Review sample due for completion', time: '2h ago', unread: true },
  { id: 2, title: 'PBC Outstanding', desc: 'DLP Policy evidence not yet received', time: '5h ago', unread: true },
  { id: 3, title: 'Finding F001 response', desc: 'Management response due in 3 days', time: '1d ago', unread: false },
]

export default function Header({ onMenuClick }) {
  const location = useLocation()
  const navigate = useNavigate()
  const title = getPageTitle(location.pathname)

  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifOpen, setNotifOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => n.unread).length)

  const searchRef = useRef(null)
  const notifRef = useRef(null)

  const searchResults = searchQuery.length > 1
    ? allPages.filter(p =>
        p.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.section.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : []

  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSearchNav = (path) => {
    navigate(path)
    setSearchOpen(false)
    setSearchQuery('')
  }

  const markAllRead = () => setUnreadCount(0)

  return (
    <header className="h-14 bg-navy-900 border-b border-navy-700 flex items-center px-4 gap-3 flex-shrink-0 relative z-30">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-navy-800 text-steel-400 hover:text-steel-200 transition-colors"
      >
        <Menu size={18} />
      </button>

      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-white truncate">{title}</h1>
      </div>

      {/* Search */}
      <div className="relative" ref={searchRef}>
        <button
          onClick={() => { setSearchOpen(!searchOpen); setNotifOpen(false) }}
          className="hidden sm:flex items-center gap-1.5 bg-navy-800 border border-navy-600 rounded-lg px-3 py-1.5 hover:border-steel-500 transition-colors"
        >
          <Search size={13} className="text-steel-400" />
          <span className="text-xs text-steel-400 w-28 text-left">Search modules...</span>
        </button>
        <button
          onClick={() => { setSearchOpen(!searchOpen); setNotifOpen(false) }}
          className="sm:hidden p-2 rounded-lg hover:bg-navy-800 text-steel-400"
        >
          <Search size={16} />
        </button>

        {searchOpen && (
          <div className="absolute right-0 top-10 w-80 bg-navy-900 border border-navy-600 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-navy-700">
              <Search size={13} className="text-steel-400 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search all modules..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white placeholder-steel-500 outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-steel-500 hover:text-steel-300">
                  <X size={12} />
                </button>
              )}
            </div>

            {searchQuery.length > 1 && (
              <div className="max-h-72 overflow-y-auto py-1">
                {searchResults.length > 0 ? searchResults.map(r => (
                  <button
                    key={r.path}
                    onClick={() => handleSearchNav(r.path)}
                    className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-navy-800 transition-colors text-left group"
                  >
                    <div className="min-w-0">
                      <div className="text-sm text-white truncate">{r.label}</div>
                      <div className="text-xs text-steel-400 truncate">{r.section}</div>
                    </div>
                    <ArrowRight size={12} className="text-steel-500 group-hover:text-steel-300 flex-shrink-0 ml-2" />
                  </button>
                )) : (
                  <div className="px-3 py-4 text-xs text-steel-400 text-center">No modules found for "{searchQuery}"</div>
                )}
              </div>
            )}

            {searchQuery.length <= 1 && (
              <div className="py-2">
                <div className="px-3 py-1.5 text-xs text-steel-500 uppercase tracking-wide font-medium">Quick access</div>
                {[
                  { label: 'TOD — Test of Design', path: '/iso19011/tod' },
                  { label: 'Risk Register', path: '/iso27005/register' },
                  { label: 'PBC Master List', path: '/fieldwork/pbc' },
                  { label: 'Fieldwork Tracker', path: '/fieldwork/tracker' },
                  { label: 'Audit Report Builder', path: '/reporting/builder' },
                ].map(q => (
                  <button
                    key={q.path}
                    onClick={() => handleSearchNav(q.path)}
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-navy-800 transition-colors group"
                  >
                    <span className="text-sm text-steel-300 group-hover:text-white">{q.label}</span>
                    <ArrowRight size={12} className="text-steel-500 group-hover:text-steel-300 flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="relative" ref={notifRef}>
        <button
          onClick={() => { setNotifOpen(p => !p); setSearchOpen(false) }}
          className="p-2 rounded-lg hover:bg-navy-800 text-steel-400 hover:text-steel-200 transition-colors relative"
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-audit text-navy-950 text-xs font-bold flex items-center justify-center leading-none">
              {unreadCount}
            </span>
          )}
        </button>

        {notifOpen && (
          <div className="absolute right-0 top-10 w-80 bg-navy-900 border border-navy-600 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-navy-700">
              <span className="text-sm font-semibold text-white">Notifications</span>
              <button onClick={markAllRead} className="text-xs text-steel-400 hover:text-steel-200 transition-colors">
                Mark all read
              </button>
            </div>
            <div className="divide-y divide-navy-800">
              {notifications.map(n => (
                <div key={n.id} className={`px-4 py-3 ${n.unread ? 'bg-navy-800/50' : ''}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-amber-audit flex-shrink-0" />}
                        <span className="text-xs font-semibold text-white">{n.title}</span>
                      </div>
                      <div className="text-xs text-steel-400 mt-0.5 leading-snug">{n.desc}</div>
                    </div>
                    <span className="text-xs text-steel-500 flex-shrink-0 whitespace-nowrap">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-navy-700">
              <span className="text-xs text-steel-400">Notifications are audit reminders only</span>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
