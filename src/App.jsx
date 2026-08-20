import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import ComingSoon from './pages/ComingSoon'

// ISO 19011 — all confirmed from GitHub screenshot
import Clause4 from './pages/iso19011/Clause4'
import Clause5 from './pages/iso19011/Clause5'
import Clause6Initiation from './pages/iso19011/Clause6Initiation'
import Clause6Preparation from './pages/iso19011/Clause6Preparation'
import Clause65Reporting from './pages/iso19011/Clause65Reporting'
import Clause7 from './pages/iso19011/Clause7'
import Findings from './pages/iso19011/Findings'
import Meetings from './pages/iso19011/Meetings'
import TOD from './pages/iso19011/TOD'
import TOI from './pages/iso19011/TOI'
import TOE from './pages/iso19011/TOE'

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
              <Route path="/iso19011/clause6-initiation" element={<Clause6Initiation />} />
              <Route path="/iso19011/clause6-preparation" element={<Clause6Preparation />} />
              <Route path="/iso19011/tod" element={<TOD />} />
              <Route path="/iso19011/toi" element={<TOI />} />
              <Route path="/iso19011/toe" element={<TOE />} />
              <Route path="/iso19011/findings" element={<Findings />} />
              <Route path="/iso19011/meetings" element={<Meetings />} />
              <Route path="/iso19011/reporting" element={<Clause65Reporting />} />
              <Route path="/iso19011/clause7" element={<Clause7 />} />
              <Route path="/iso19011/annexa" element={<ComingSoon />} />

              {/* All other routes show ComingSoon until
                  you share screenshots of remaining folders
                  or grant VS Code access */}
              <Route path="*" element={<ComingSoon />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
