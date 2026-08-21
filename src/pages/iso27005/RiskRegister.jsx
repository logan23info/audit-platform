import { useNavigate } from 'react-router-dom'
import { ArrowRight, Database } from 'lucide-react'
import PageHeader from '../../components/PageHeader'

export default function RiskRegister() {
  const navigate = useNavigate()
  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader standard="ISO 27005:2022" clause="Risk Register" title="Risk Register"
        description="The Risk Register has been upgraded to a fully live Supabase-connected version — permanently saving all risks to your active audit programme."
        badges={['Redirecting', 'ISO 27005']} />
      <div className="card text-center py-12">
        <Database size={36} className="text-amber-audit mx-auto mb-4" />
        <h2 className="text-lg font-bold text-white mb-2">Live Risk Register Available</h2>
        <p className="text-sm text-steel-400 mb-6 max-w-md mx-auto leading-relaxed">
          The Risk Register is now fully live — Asset × Threat × Vulnerability scoring, inherent and residual scores, treatment tracking, search, delete, and CSV export. All data saved permanently to Supabase.
        </p>
        <button onClick={() => navigate('/iso27005/live-register')} className="btn-primary mx-auto">
          Open Live Risk Register <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
