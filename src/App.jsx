import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Clause4 from './pages/iso19011/Clause4'
import Clause5 from './pages/iso19011/Clause5'
import TOD from './pages/iso19011/TOD'
import TOI from './pages/iso19011/TOI'
import TOE from './pages/iso19011/TOE'
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
              {/* ISO 19011 */}
              <Route path="/iso19011/clause4" element={<Clause4 />} />
              <Route path="/iso19011/clause5" element={<Clause5 />} />
              <Route path="/iso19011/tod" element={<TOD />} />
              <Route path="/iso19011/toi" element={<TOI />} />
              <Route path="/iso19011/toe" element={<TOE />} />
              {/* All other routes → ComingSoon */}
              <Route path="*" element={<ComingSoon />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
