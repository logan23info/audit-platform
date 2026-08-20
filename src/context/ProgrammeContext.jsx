import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { getProgrammes, createProgramme, updateProgramme } from '../lib/supabase'

const ProgrammeContext = createContext({})

export function ProgrammeProvider({ children }) {
  const { user } = useAuth()
  const [programmes, setProgrammes] = useState([])
  const [activeProgramme, setActiveProgramme] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) loadProgrammes()
    else { setProgrammes([]); setActiveProgramme(null) }
  }, [user])

  async function loadProgrammes() {
    setLoading(true)
    try {
      const data = await getProgrammes(user.id)
      setProgrammes(data)
      // Auto-select last active programme
      const saved = localStorage.getItem('auditiq_active_programme')
      if (saved) {
        const found = data.find(p => p.id === saved)
        if (found) setActiveProgramme(found)
        else if (data.length > 0) setActiveProgramme(data[0])
      } else if (data.length > 0) {
        setActiveProgramme(data[0])
      }
    } catch (e) {
      console.error('Load programmes error:', e)
    } finally {
      setLoading(false)
    }
  }

  function selectProgramme(programme) {
    setActiveProgramme(programme)
    localStorage.setItem('auditiq_active_programme', programme.id)
  }

  async function addProgramme(data) {
    const prog = await createProgramme({ ...data, user_id: user.id })
    setProgrammes(prev => [prog, ...prev])
    selectProgramme(prog)
    return prog
  }

  async function editProgramme(id, updates) {
    const prog = await updateProgramme(id, updates)
    setProgrammes(prev => prev.map(p => p.id === id ? prog : p))
    if (activeProgramme?.id === id) setActiveProgramme(prog)
    return prog
  }

  return (
    <ProgrammeContext.Provider value={{
      programmes, activeProgramme, loading,
      selectProgramme, addProgramme, editProgramme, loadProgrammes
    }}>
      {children}
    </ProgrammeContext.Provider>
  )
}

export const useProgramme = () => useContext(ProgrammeContext)
