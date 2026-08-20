import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Shield, Loader2, Eye, EyeOff } from 'lucide-react'

export default function AuthPage() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState('login') // login | register
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    email: '', password: '', fullName: '', organisation: ''
  })

  const update = (field, value) => {
    setForm(p => ({ ...p, [field]: value }))
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Email and password are required'); return }
    if (mode === 'register' && !form.fullName) { setError('Full name is required'); return }
    setLoading(true)
    setError('')
    try {
      if (mode === 'login') {
        await signIn({ email: form.email, password: form.password })
      } else {
        await signUp({ email: form.email, password: form.password, fullName: form.fullName, organisation: form.organisation })
        setSuccess('Account created — check your email to confirm, then log in.')
        setMode('login')
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-navy-800 border border-navy-600 flex items-center justify-center mx-auto mb-4">
            <Shield size={28} className="text-amber-audit" />
          </div>
          <div className="font-display text-2xl font-bold text-white">AuditIQ</div>
          <div className="text-sm text-steel-400 mt-1">IT Audit Intelligence Platform</div>
        </div>

        {/* Card */}
        <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1">
            {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="text-sm text-steel-400 mb-6">
            {mode === 'login' ? 'Your audit data is saved securely in the cloud.' : 'All audit data encrypted and stored in your private workspace.'}
          </p>

          {error && (
            <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 mb-4 text-xs text-red-300">{error}</div>
          )}
          {success && (
            <div className="bg-emerald-900/30 border border-emerald-800 rounded-lg p-3 mb-4 text-xs text-emerald-300">{success}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs text-steel-400 mb-1.5">Full Name</label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="e.g. John Smith"
                    value={form.fullName}
                    onChange={e => update('fullName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-steel-400 mb-1.5">Organisation (optional)</label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="e.g. Acme Financial Ltd"
                    value={form.organisation}
                    onChange={e => update('organisation', e.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs text-steel-400 mb-1.5">Email address</label>
              <input
                className="input-field"
                type="email"
                placeholder="you@organisation.com"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-xs text-steel-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  className="input-field pr-10"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={mode === 'register' ? 'Minimum 8 characters' : '••••••••'}
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-400 hover:text-steel-200"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2"
            >
              {loading
                ? <><Loader2 size={14} className="animate-spin" /> {mode === 'login' ? 'Signing in...' : 'Creating account...'}</>
                : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-navy-700 text-center">
            <span className="text-xs text-steel-400">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setSuccess('') }}
              className="text-xs text-amber-audit hover:text-amber-300 font-medium transition-colors"
            >
              {mode === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-steel-500">ISO 19011 · 27001 · 27002 · 27005 · 9001</p>
        </div>
      </div>
    </div>
  )
}
