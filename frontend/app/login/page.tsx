'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = await login(email, password)
      if (user.role === 'ADMIN') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'} flex items-center justify-center p-4 transition-colors duration-300`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 p-3 rounded-lg ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'} hover:scale-110 transition-all shadow-lg z-50`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-3xl shadow-2xl p-8 w-full max-w-md border animate-fade-in-up`}>
        <div className="text-center mb-8">
          <Link href="/" className={`inline-block mb-4 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl">🔐</span>
              <h1 className="text-3xl font-bold gradient-text">SecureCampus</h1>
            </div>
          </Link>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mt-4`}>Welcome Back</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Login to access your account</p>
        </div>

        {error && (
          <div className={`${darkMode ? 'bg-red-900/50 border-red-500' : 'bg-red-50 border-red-500'} border-l-4 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm animate-slide-in`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border-2 ${darkMode ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' : 'border-gray-200 text-gray-900 placeholder-gray-400'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border-2 ${darkMode ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' : 'border-gray-200 text-gray-900 placeholder-gray-400'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Don&apos;t have an account?{' '}
            <Link href="/register" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-semibold hover:underline`}>
              Create Account
            </Link>
          </p>
          <Link href="/" className={`block mt-4 text-sm ${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-500 hover:text-gray-700'} transition-colors`}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
