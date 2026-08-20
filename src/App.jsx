import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

// Sprint 1 — ISO 19011 Core
import Dashboard from './pages/Dashboard'
import Clause4 from './pages/iso19011/Clause4'
import Clause5 from './pages/iso19011/Clause5'
import TOD from './pages/iso19011/TOD'
import TOI from './pages/iso19011/TOI'
import TOE from './pages/iso19011/TOE'

// Sprint 2 — ISO 19011 Cl. 6 & 7
import Clause6Initiation from './pages/iso19011/Clause6Initiation'
import Clause6Preparation from './pages/iso19011/Clause6Preparation'
import Findings from './pages/iso19011/Findings'
import Meetings from './pages/iso19011/Meetings'
import Clause65Reporting from './pages/iso19011/Clause65Reporting'
import Clause7 from './pages/iso19011/Clause7'

// Sprint 3 — ISO 27001
import ISO27001Clause4 from './pages/iso27001/Clause4'
import ISO27001Clause5 from './pages/iso27001/Clause5'
import ISO27001Clause6 from './pages/iso27001/Clause6'
import ISO27001Clause7 from './pages/iso27001/Clause7'
import ISO27001Clause8 from './pages/iso27001/Clause8'
import ISO27001Clause9 from './pages/iso27001/Clause9'
import ISO27001Clause10 from './pages/iso27001/Clause10'

// Sprint 4 — ISO 27002
import Organizational from './pages/iso27002/Organizational'
import People from './pages/iso27002/People'
import Physical from './pages/iso27002/Physical'
import Technological from './pages/iso27002/Technological'

// Sprint 5 — ISO 27005
import Assets from './pages/iso27005/Assets'
import RiskRegister from './pages/iso27005/RiskRegister'
import RTP from './pages/iso27005/RTP'
import Scenarios from './pages/iso27005/Scenarios'

// Sprint 6 — ISO 9001 + IMS
import { ISO9001Clause5, ISO9001Clause7, ISO9001Clause8, ISO9001Clause9, ISO9001Clause10 } from './pages/iso9001/AllClauses'
import { IMSCrosswalk, IMSWorksheets } from './pages/ims/AllPages'

import ComingSoon from './pages/ComingSoon'

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

              {/* Sprint 1 */}
              <Route path="/iso19011/clause4" element={<Clause4 />} />
              <Route path="/iso19011/clause5" element={<Clause5 />} />
              <Route path="/iso19011/tod" element={<TOD />} />
              <Route path="/iso19011/toi" element={<TOI />} />
              <Route path="/iso19011/toe" element={<TOE />} />

              {/* Sprint 2 */}
              <Route path="/iso19011/clause6-initiation" element={<Clause6Initiation />} />
              <Route path="/iso19011/clause6-preparation" element={<Clause6Preparation />} />
              <Route path="/iso19011/findings" element={<Findings />} />
              <Route path="/iso19011/meetings" element={<Meetings />} />
              <Route path="/iso19011/reporting" element={<Clause65Reporting />} />
              <Route path="/iso19011/clause7" element={<Clause7 />} />

              {/* Sprint 3 — ISO 27001 */}
              <Route path="/iso27001/clause4" element={<ISO27001Clause4 />} />
              <Route path="/iso27001/clause5" element={<ISO27001Clause5 />} />
              <Route path="/iso27001/clause6" element={<ISO27001Clause6 />} />
              <Route path="/iso27001/clause7" element={<ISO27001Clause7 />} />
              <Route path="/iso27001/clause8" element={<ISO27001Clause8 />} />
              <Route path="/iso27001/clause9" element={<ISO27001Clause9 />} />
              <Route path="/iso27001/clause10" element={<ISO27001Clause10 />} />

              {/* Sprint 4 — ISO 27002 */}
              <Route path="/iso27002/organizational" element={<Organizational />} />
              <Route path="/iso27002/people" element={<People />} />
              <Route path="/iso27002/physical" element={<Physical />} />
              <Route path="/iso27002/technological" element={<Technological />} />
              <Route path="/iso27002/netnew" element={<Technological />} />

              {/* Sprint 5 — ISO 27005 */}
              <Route path="/iso27005/assets" element={<Assets />} />
              <Route path="/iso27005/register" element={<RiskRegister />} />
              <Route path="/iso27005/rtp" element={<RTP />} />
              <Route path="/iso27005/scenarios" element={<Scenarios />} />

              {/* Sprint 6 — ISO 9001 */}
              <Route path="/iso9001/clause5" element={<ISO9001Clause5 />} />
              <Route path="/iso9001/clause7" element={<ISO9001Clause7 />} />
              <Route path="/iso9001/clause8" element={<ISO9001Clause8 />} />
              <Route path="/iso9001/clause9" element={<ISO9001Clause9 />} />
              <Route path="/iso9001/clause10" element={<ISO9001Clause10 />} />

              {/* Sprint 6 — IMS Cross-Walk */}
              <Route path="/ims/crosswalk" element={<IMSCrosswalk />} />
              <Route path="/ims/worksheets" element={<IMSWorksheets />} />

              <Route path="*" element={<ComingSoon />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
