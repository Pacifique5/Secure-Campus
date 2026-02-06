'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './context/AuthContext'

export default function Home() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!loading && user && mounted) {
      if (user.role === 'ADMIN') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    }
  }, [user, loading, router, mounted])

  if (loading || (user && mounted)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="text-xl text-primary-600 animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary-600">🔐 SecureCampus</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Login
              </Link>
              <Link href="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Secure Your Campus
              <span className="block text-primary-600 mt-2">Digital Experience</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A comprehensive platform for campus security, attendance tracking, and real-time monitoring. 
              Keep your institution safe and connected.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register" className="btn-primary text-lg px-8 py-4">
                Get Started Free
              </Link>
              <Link href="/login" className="btn-secondary text-lg px-8 py-4">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600">
              Powerful features to manage your campus security and operations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Attendance Tracking</h3>
              <p className="text-gray-600">
                Real-time attendance monitoring with automated check-ins and comprehensive reporting for students and staff.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Security Monitoring</h3>
              <p className="text-gray-600">
                Advanced security logs, suspicious activity detection, and comprehensive audit trails for complete oversight.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📢</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Announcements</h3>
              <p className="text-gray-600">
                Instant campus-wide announcements and notifications to keep everyone informed and connected.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">👨‍💼</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Role-Based Access</h3>
              <p className="text-gray-600">
                Granular permissions for admins, staff, and students with secure authentication and authorization.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600">
                Comprehensive insights and analytics to make data-driven decisions for your campus operations.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Updates</h3>
              <p className="text-gray-600">
                Instant notifications and live updates to stay on top of all campus activities and security events.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Secure Your Campus?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join institutions worldwide using SecureCampus for enhanced security and operations.
          </p>
          <Link href="/register" className="inline-block px-8 py-4 bg-white text-primary-600 font-bold text-lg rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all">
            Start Your Free Trial
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-semibold text-white mb-2">SecureCampus</p>
            <p className="text-sm">© 2026 SecureCampus. All rights reserved.</p>
            <p className="text-sm mt-2">Secure. Connected. Efficient.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
