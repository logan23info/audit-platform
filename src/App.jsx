import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Menu, X, Shield } from 'lucide-react'
import Sidebar from './components/Sidebar'

import Dashboard from './pages/Dashboard'
import Principles from './pages/iso19011/Principles'
import Programme from './pages/iso19011/Programme'
import Initiation from './pages/iso19011/Initiation'
import Preparation from './pages/iso19011/Preparation'
import Opening from './pages/iso19011/Opening'
import TOD from './pages/iso19011/TOD'
import TOI from './pages/iso19011/TOI'
import TOE from './pages/iso19011/TOE'
import Findings from './pages/iso19011/Findings'
import Closing from './pages/iso19011/Closing'
import Reporting19011 from './pages/iso19011/Reporting'
import Competence from './pages/iso19011/Competence'
import AnnexA from './pages/iso19011/AnnexA'

import ISO27000 from './pages/iso27000/ISO27000'
import Cl4 from './pages/iso27001/Cl4'
import Cl5_27001 from './pages/iso27001/Cl5'
import Cl6_27001 from './pages/iso27001/Cl6'
import Cl7_27001 from './pages/iso27001/Cl7'
import Cl8_27001 from './pages/iso27001/Cl8'
import Cl9_27001 from './pages/iso27001/Cl9'
import Cl10_27001 from './pages/iso27001/Cl10'
import Organizational from './pages/iso27002/Organizational'
import People from './pages/iso27002/People'
import Physical from './pages/iso27002/Physical'
import Technological from './pages/iso27002/Technological'
import Assets from './pages/iso27005/Assets'
import Register from './pages/iso27005/Register'
import Treatment from './pages/iso27005/Treatment'
import Scenarios from './pages/iso27005/Scenarios'
import Cl5_9001 from './pages/iso9001/Cl5'
import Cl7_9001 from './pages/iso9001/Cl7'
import Cl8_9001 from './pages/iso9001/Cl8'
import Cl9_9001 from './pages/iso9001/Cl9'
import Cl10_9001 from './pages/iso9001/Cl10'
import Crosswalk from './pages/ims/Crosswalk'
import Worksheets from './pages/ims/Worksheets'
import PBC from './pages/pbc/PBC'
import Fieldwork from './pages/fieldwork/Fieldwork'
import Report from './pages/reporting/Report'
import Management from './pages/reporting/Management'
import KPI from './pages/reporting/KPI'
import CAPA from './pages/reporting/CAPA'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="app-shell">
      {/* Topbar */}
      <header className="topbar">
        <button className="menu-toggle" onClick={() => setSidebarOpen(o => !o)} aria-label="Toggle menu">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link to="/" className="topbar-brand">
          AuditIQ <span>Platform</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem' }}>
          <span className="badge badge-blue" style={{ fontSize: '0.6rem' }}>ISO 19011 · 27001 · 27002 · 27005 · 9001</span>
        </div>
        <div className="topbar-spacer" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={14} style={{ color: 'var(--green)' }} />
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Sprint 1 Active</span>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/iso19011/principles" element={<Principles />} />
          <Route path="/iso19011/programme" element={<Programme />} />
          <Route path="/iso19011/initiation" element={<Initiation />} />
          <Route path="/iso19011/preparation" element={<Preparation />} />
          <Route path="/iso19011/opening" element={<Opening />} />
          <Route path="/iso19011/tod" element={<TOD />} />
          <Route path="/iso19011/toi" element={<TOI />} />
          <Route path="/iso19011/toe" element={<TOE />} />
          <Route path="/iso19011/findings" element={<Findings />} />
          <Route path="/iso19011/closing" element={<Closing />} />
          <Route path="/iso19011/reporting" element={<Reporting19011 />} />
          <Route path="/iso19011/competence" element={<Competence />} />
          <Route path="/iso19011/annexa" element={<AnnexA />} />
          <Route path="/iso27000" element={<ISO27000 />} />
          <Route path="/iso27001/cl4" element={<Cl4 />} />
          <Route path="/iso27001/cl5" element={<Cl5_27001 />} />
          <Route path="/iso27001/cl6" element={<Cl6_27001 />} />
          <Route path="/iso27001/cl7" element={<Cl7_27001 />} />
          <Route path="/iso27001/cl8" element={<Cl8_27001 />} />
          <Route path="/iso27001/cl9" element={<Cl9_27001 />} />
          <Route path="/iso27001/cl10" element={<Cl10_27001 />} />
          <Route path="/iso27002/organizational" element={<Organizational />} />
          <Route path="/iso27002/people" element={<People />} />
          <Route path="/iso27002/physical" element={<Physical />} />
          <Route path="/iso27002/technological" element={<Technological />} />
          <Route path="/iso27005/assets" element={<Assets />} />
          <Route path="/iso27005/register" element={<Register />} />
          <Route path="/iso27005/treatment" element={<Treatment />} />
          <Route path="/iso27005/scenarios" element={<Scenarios />} />
          <Route path="/iso9001/cl5" element={<Cl5_9001 />} />
          <Route path="/iso9001/cl7" element={<Cl7_9001 />} />
          <Route path="/iso9001/cl8" element={<Cl8_9001 />} />
          <Route path="/iso9001/cl9" element={<Cl9_9001 />} />
          <Route path="/iso9001/cl10" element={<Cl10_9001 />} />
          <Route path="/ims/crosswalk" element={<Crosswalk />} />
          <Route path="/ims/worksheets" element={<Worksheets />} />
          <Route path="/pbc" element={<PBC />} />
          <Route path="/fieldwork" element={<Fieldwork />} />
          <Route path="/reporting/report" element={<Report />} />
          <Route path="/reporting/management" element={<Management />} />
          <Route path="/reporting/kpi" element={<KPI />} />
          <Route path="/reporting/capa" element={<CAPA />} />
        </Routes>
      </main>
    </div>
  )
}
