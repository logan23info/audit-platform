import { useState, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProgrammeProvider } from './context/ProgrammeContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './components/Toast'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Breadcrumb from './components/Breadcrumb'
import AuthPage from './pages/AuthPage'

// Item 6 — Code splitting with lazy loading
const lazy_ = (fn) => {
  const C = lazy(fn)
  return (props) => (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="w-6 h-6 border-2 border-amber-audit border-t-transparent rounded-full animate-spin" /></div>}>
      <C {...props} />
    </Suspense>
  )
}

// Eager load only critical pages
import Dashboard from './pages/Dashboard'
import ComingSoon from './pages/ComingSoon'

// Lazy load everything else — Item 6: Code splitting
const FAQ = lazy_(() => import('./pages/FAQ'))
const Wiki = lazy_(() => import('./pages/Wiki'))
const Profile = lazy_(() => import('./pages/Profile'))
const ISO27000 = lazy_(() => import('./pages/iso27000/ISO27000'))
const Clause4 = lazy_(() => import('./pages/iso19011/Clause4'))
const Clause5 = lazy_(() => import('./pages/iso19011/Clause5'))
const Clause6Initiation = lazy_(() => import('./pages/iso19011/Clause6Initiation'))
const Clause6Preparation = lazy_(() => import('./pages/iso19011/Clause6Preparation'))
const Clause65Reporting = lazy_(() => import('./pages/iso19011/Clause65Reporting'))
const Clause7 = lazy_(() => import('./pages/iso19011/Clause7'))
const Findings = lazy_(() => import('./pages/iso19011/Findings'))
const Meetings = lazy_(() => import('./pages/iso19011/Meetings'))
const TOD = lazy_(() => import('./pages/iso19011/TOD'))
const TOI = lazy_(() => import('./pages/iso19011/TOI'))
const TOE = lazy_(() => import('./pages/iso19011/TOE'))
const AnnexA = lazy_(() => import('./pages/iso19011/AnnexA'))
const ISO27001Clause4 = lazy_(() => import('./pages/iso27001/Clause4'))
const ISO27001Clause5 = lazy_(() => import('./pages/iso27001/Clause5'))
const ISO27001Clause6 = lazy_(() => import('./pages/iso27001/Clause6'))
const ISO27001Clause7 = lazy_(() => import('./pages/iso27001/Clause7'))
const ISO27001SoA = lazy_(() => import('./pages/iso27001/SoA'))
const ISO27001Clause8 = lazy_(() => import('./pages/iso27001/Clause8'))
const ISO27001Clause9 = lazy_(() => import('./pages/iso27001/Clause9'))
const ISO27001Clause10 = lazy_(() => import('./pages/iso27001/Clause10'))
const Organizational = lazy_(() => import('./pages/iso27002/Organizational'))
const People = lazy_(() => import('./pages/iso27002/People'))
const Physical = lazy_(() => import('./pages/iso27002/Physical'))
const Technological = lazy_(() => import('./pages/iso27002/Technological'))
const NetNew = lazy_(() => import('./pages/iso27002/NetNew'))
const Assets = lazy_(() => import('./pages/iso27005/Assets'))
const RiskRegister = lazy_(() => import('./pages/iso27005/RiskRegister'))
const RTP = lazy_(() => import('./pages/iso27005/RTP'))
const Scenarios = lazy_(() => import('./pages/iso27005/Scenarios'))
const RiskRegisterLive = lazy_(() => import('./pages/reporting/RiskRegisterLive'))
const AllClauses = lazy_(() => import('./pages/iso9001/AllClauses'))
const AllPages = lazy_(() => import('./pages/ims/AllPages'))
const PBCList = lazy_(() => import('./pages/fieldwork/PBCList'))
const FieldworkTracker = lazy_(() => import('./pages/fieldwork/FieldworkTracker'))
const FindingRegister = lazy_(() => import('./pages/fieldwork/FindingRegister'))
const WorkpaperIndex = lazy_(() => import('./pages/fieldwork/WorkpaperIndex'))
const WorkpaperLibrary = lazy_(() => import('./pages/fieldwork/WorkpaperLibrary'))
const ReportBuilder = lazy_(() => import('./pages/reporting/ReportBuilder'))
const ManagementReview = lazy_(() => import('./pages/reporting/ManagementReview'))
const KPIDashboard = lazy_(() => import('./pages/reporting/KPIDashboard'))
const CAPATracker = lazy_(() => import('./pages/reporting/CAPATracker'))
const AuditUniverseLive = lazy_(() => import('./pages/reporting/AuditUniverseLive'))

// Named exports need wrapper components
const ISO9001Clause5 = lazy_(() => import('./pages/iso9001/AllClauses').then(m => ({ default: m.ISO9001Clause5 })))
const ISO9001Clause7 = lazy_(() => import('./pages/iso9001/AllClauses').then(m => ({ default: m.ISO9001Clause7 })))
const ISO9001Clause8 = lazy_(() => import('./pages/iso9001/AllClauses').then(m => ({ default: m.ISO9001Clause8 })))
const ISO9001Clause9 = lazy_(() => import('./pages/iso9001/AllClauses').then(m => ({ default: m.ISO9001Clause9 })))
const ISO9001Clause10 = lazy_(() => import('./pages/iso9001/AllClauses').then(m => ({ default: m.ISO9001Clause10 })))
const IMSCrosswalk = lazy_(() => import('./pages/ims/AllPages').then(m => ({ default: m.IMSCrosswalk })))
const IMSWorksheets = lazy_(() => import('./pages/ims/AllPages').then(m => ({ default: m.IMSWorksheets })))

function AppShell() {
  const { user, loading } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (loading) return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-amber-audit border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <div className="text-xs text-steel-400">Loading AuditIQ...</div>
      </div>
    </div>
  )

  if (!user) return <AuthPage />

  return (
    <ProgrammeProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6" id="main-content">
            <Breadcrumb />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/wiki" element={<Wiki />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/iso27000" element={<ISO27000 />} />
              <Route path="/iso19011" element={<Navigate to="/iso19011/clause4" replace />} />
              <Route path="/iso19011/clause4" element={<Clause4 />} />
              <Route path="/iso19011/clause5" element={<Clause5 />} />
              <Route path="/iso19011/clause6-initiation" element={<Clause6Initiation />} />
              <Route path="/iso19011/clause6-preparation" element={<Clause6Preparation />} />
              <Route path="/iso19011/tod" element={<TOD />} />
              <Route path="/iso19011/toi" element={<TOI />} />
              <Route path="/iso19011/toe" element={<TOE />} />
              <Route path="/iso19011/findings" element={<Findings />} />
              <Route path="/iso19011/meetings" element={<Meetings />} />
              <Route path="/iso19011/reporting" element={<Clause65Reporting />} />
              <Route path="/iso19011/clause7" element={<Clause7 />} />
              <Route path="/iso19011/annexa" element={<AnnexA />} />
              <Route path="/iso27001" element={<Navigate to="/iso27001/clause4" replace />} />
              <Route path="/iso27001/clause4" element={<ISO27001Clause4 />} />
              <Route path="/iso27001/clause5" element={<ISO27001Clause5 />} />
              <Route path="/iso27001/clause6" element={<ISO27001Clause6 />} />
              <Route path="/iso27001/clause7" element={<ISO27001Clause7 />} />
              <Route path="/iso27001/soa" element={<ISO27001SoA />} />
              <Route path="/iso27001/clause8" element={<ISO27001Clause8 />} />
              <Route path="/iso27001/clause9" element={<ISO27001Clause9 />} />
              <Route path="/iso27001/clause10" element={<ISO27001Clause10 />} />
              <Route path="/iso27002" element={<Navigate to="/iso27002/organizational" replace />} />
              <Route path="/iso27002/organizational" element={<Organizational />} />
              <Route path="/iso27002/people" element={<People />} />
              <Route path="/iso27002/physical" element={<Physical />} />
              <Route path="/iso27002/technological" element={<Technological />} />
              <Route path="/iso27002/netnew" element={<NetNew />} />
              <Route path="/iso27005" element={<Navigate to="/iso27005/assets" replace />} />
              <Route path="/iso27005/assets" element={<Assets />} />
              <Route path="/iso27005/register" element={<RiskRegister />} />
              <Route path="/iso27005/live-register" element={<RiskRegisterLive />} />
              <Route path="/iso27005/rtp" element={<RTP />} />
              <Route path="/iso27005/scenarios" element={<Scenarios />} />
              <Route path="/iso9001" element={<Navigate to="/iso9001/clause5" replace />} />
              <Route path="/iso9001/clause5" element={<ISO9001Clause5 />} />
              <Route path="/iso9001/clause7" element={<ISO9001Clause7 />} />
              <Route path="/iso9001/clause8" element={<ISO9001Clause8 />} />
              <Route path="/iso9001/clause9" element={<ISO9001Clause9 />} />
              <Route path="/iso9001/clause10" element={<ISO9001Clause10 />} />
              <Route path="/ims" element={<Navigate to="/ims/crosswalk" replace />} />
              <Route path="/ims/crosswalk" element={<IMSCrosswalk />} />
              <Route path="/ims/worksheets" element={<IMSWorksheets />} />
              <Route path="/fieldwork" element={<Navigate to="/fieldwork/tracker" replace />} />
              <Route path="/fieldwork/pbc" element={<PBCList />} />
              <Route path="/fieldwork/tracker" element={<FieldworkTracker />} />
              <Route path="/fieldwork/findings" element={<FindingRegister />} />
              <Route path="/fieldwork/workpapers" element={<WorkpaperIndex />} />
              <Route path="/fieldwork/library" element={<WorkpaperLibrary />} />
              <Route path="/reporting" element={<Navigate to="/reporting/builder" replace />} />
              <Route path="/reporting/builder" element={<ReportBuilder />} />
              <Route path="/reporting/management-review" element={<ManagementReview />} />
              <Route path="/reporting/kpi" element={<KPIDashboard />} />
              <Route path="/reporting/capa" element={<CAPATracker />} />
              <Route path="/reporting/universe" element={<AuditUniverseLive />} />
              <Route path="*" element={<ComingSoon />} />
            </Routes>
          </main>
        </div>
      </div>
    </ProgrammeProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <AppShell />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
    </BrowserRouter>
  )
}
