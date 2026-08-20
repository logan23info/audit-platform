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

// Sprint 3 — ISO 27001 Cl. 4–10
import ISO27001Clause4 from './pages/iso27001/Clause4'
import ISO27001Clause5 from './pages/iso27001/Clause5'
import ISO27001Clause6 from './pages/iso27001/Clause6'
import ISO27001Clause7 from './pages/iso27001/Clause7'
import ISO27001Clause8 from './pages/iso27001/Clause8'
import ISO27001Clause9 from './pages/iso27001/Clause9'
import ISO27001Clause10 from './pages/iso27001/Clause10'

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
              {/* Dashboard */}
              <Route path="/" element={<Dashboard />} />

              {/* Sprint 1 — ISO 19011 Backbone */}
              <Route path="/iso19011/clause4" element={<Clause4 />} />
              <Route path="/iso19011/clause5" element={<Clause5 />} />
              <Route path="/iso19011/tod" element={<TOD />} />
              <Route path="/iso19011/toi" element={<TOI />} />
              <Route path="/iso19011/toe" element={<TOE />} />

              {/* Sprint 2 — ISO 19011 Cl. 6 & 7 */}
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

              {/* Catch-all */}
              <Route path="*" element={<ComingSoon />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
