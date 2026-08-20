import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import ComingSoon from './pages/ComingSoon'

// ISO 19011
import Clause4 from './pages/iso19011/Clause4'
import Clause5 from './pages/iso19011/Clause5'
import TOD from './pages/iso19011/TOD'
import TOI from './pages/iso19011/TOI'
import TOE from './pages/iso19011/TOE'
import Findings from './pages/iso19011/Findings'
import Initiation from './pages/iso19011/Initiation'
import Preparation from './pages/iso19011/Preparation'
import Reporting from './pages/iso19011/Reporting'
import Competence from './pages/iso19011/Competence'

// ISO 27000
import ISO27000 from './pages/iso27000/ISO27000'

// ISO 27001
import Cl4 from './pages/iso27001/Cl4'
import Cl5 from './pages/iso27001/Cl5'
import Cl6 from './pages/iso27001/Cl6'
import Cl7 from './pages/iso27001/Cl7'
import Cl8 from './pages/iso27001/Cl8'
import Cl9 from './pages/iso27001/Cl9'
import Cl10 from './pages/iso27001/Cl10'

// ISO 27002
import Organizational from './pages/iso27002/Organizational'
import People from './pages/iso27002/People'
import Physical from './pages/iso27002/Physical'
import Technological from './pages/iso27002/Technological'

// ISO 27005
import Assets from './pages/iso27005/Assets'
import Register from './pages/iso27005/Register'
import Treatment from './pages/iso27005/Treatment'
import Scenarios from './pages/iso27005/Scenarios'

// ISO 9001
import ISO9001Cl5 from './pages/iso9001/Cl5'
import ISO9001Cl7 from './pages/iso9001/Cl7'
import ISO9001Cl8 from './pages/iso9001/Cl8'
import ISO9001Cl9 from './pages/iso9001/Cl9'
import ISO9001Cl10 from './pages/iso9001/Cl10'

// Reporting
import Report from './pages/reporting/Report'
import Management from './pages/reporting/Management'
import KPI from './pages/reporting/KPI'
import CAPA from './pages/reporting/CAPA'

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              {/* ISO 19011 */}
              <Route path="/iso19011/clause4" element={<Clause4 />} />
              <Route path="/iso19011/clause5" element={<Clause5 />} />
              <Route path="/iso19011/clause6-initiation" element={<Initiation />} />
              <Route path="/iso19011/clause6-preparation" element={<Preparation />} />
              <Route path="/iso19011/tod" element={<TOD />} />
              <Route path="/iso19011/toi" element={<TOI />} />
              <Route path="/iso19011/toe" element={<TOE />} />
              <Route path="/iso19011/findings" element={<Findings />} />
              <Route path="/iso19011/meetings" element={<ComingSoon />} />
              <Route path="/iso19011/reporting" element={<Reporting />} />
              <Route path="/iso19011/clause7" element={<Competence />} />
              <Route path="/iso19011/annexa" element={<ComingSoon />} />

              {/* ISO 27000 */}
              <Route path="/iso27000" element={<ISO27000 />} />

              {/* ISO 27001 */}
              <Route path="/iso27001/clause4" element={<Cl4 />} />
              <Route path="/iso27001/clause5" element={<Cl5 />} />
              <Route path="/iso27001/clause6" element={<Cl6 />} />
              <Route path="/iso27001/clause7" element={<Cl7 />} />
              <Route path="/iso27001/clause8" element={<Cl8 />} />
              <Route path="/iso27001/clause9" element={<Cl9 />} />
              <Route path="/iso27001/clause10" element={<Cl10 />} />

              {/* ISO 27002 */}
              <Route path="/iso27002/organizational" element={<Organizational />} />
              <Route path="/iso27002/people" element={<People />} />
              <Route path="/iso27002/physical" element={<Physical />} />
              <Route path="/iso27002/technological" element={<Technological />} />
              <Route path="/iso27002/netnew" element={<Technological />} />

              {/* ISO 27005 */}
              <Route path="/iso27005/assets" element={<Assets />} />
              <Route path="/iso27005/register" element={<Register />} />
              <Route path="/iso27005/rtp" element={<Treatment />} />
              <Route path="/iso27005/scenarios" element={<Scenarios />} />

              {/* ISO 9001 */}
              <Route path="/iso9001/clause5" element={<ISO9001Cl5 />} />
              <Route path="/iso9001/clause7" element={<ISO9001Cl7 />} />
              <Route path="/iso9001/clause8" element={<ISO9001Cl8 />} />
              <Route path="/iso9001/clause9" element={<ISO9001Cl9 />} />
              <Route path="/iso9001/clause10" element={<ISO9001Cl10 />} />

              {/* IMS */}
              <Route path="/ims/crosswalk" element={<ComingSoon />} />
              <Route path="/ims/worksheets" element={<ComingSoon />} />

              {/* Fieldwork */}
              <Route path="/fieldwork/pbc" element={<ComingSoon />} />
              <Route path="/fieldwork/tracker" element={<ComingSoon />} />
              <Route path="/fieldwork/workpapers" element={<ComingSoon />} />
              <Route path="/fieldwork/library" element={<ComingSoon />} />

              {/* Reporting */}
              <Route path="/reporting/builder" element={<Report />} />
              <Route path="/reporting/management-review" element={<Management />} />
              <Route path="/reporting/kpi" element={<KPI />} />
              <Route path="/reporting/capa" element={<CAPA />} />
              <Route path="/reporting/universe" element={<ComingSoon />} />

              <Route path="*" element={<ComingSoon />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
