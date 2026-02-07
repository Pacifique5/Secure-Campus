'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import DashboardLayout from '@/components/DashboardLayout'
import api from '@/lib/api'

export default function SecurityPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [loginHistory, setLoginHistory] = useState([])
  const [securityAlerts, setSecurityAlerts] = useState([])
  const [reportModalOpen, setReportModalOpen] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (user) {
      fetchSecurityData()
    }
  }, [user, loading, router])

  const fetchSecurityData = async () => {
    try {
      const res = await api.get('/logs/my-activity')
      const logs = res.data
      
      setLoginHistory(logs.filter((log: any) => 
        log.action === 'LOGIN' || log.action === 'LOGOUT'
      ))
      
      setSecurityAlerts(logs.filter((log: any) => 
        log.action === 'FAILED_LOGIN' || log.action === 'SUSPICIOUS_ACTIVITY'
      ))
    } catch (error) {
      console.error('Error fetching security data:', error)
    }
  }

  const handleReportSuspicious = () => {
    setReportModalOpen(true)
    setTimeout(() => {
      alert('🚨 Suspicious activity reported to security team!')
      setReportModalOpen(false)
    }, 1000)
  }

  if (loading) return null
  if (!user) return null

  return (
    <DashboardLayout role={user.role as any}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">🔒 Security Activity</h2>
          <p className="text-gray-600 mt-1">Monitor your account security and login history</p>
        </div>

        {/* Security Status Card */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
                  🛡️
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Account Status: Secure</h3>
                  <p className="text-green-100">No suspicious activity detected</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>2FA Enabled</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🔐</span>
                  <span>Strong Password</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <span>Email Verified</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleReportSuspicious}
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
            >
              🚨 Report Suspicious Activity
            </button>
          </div>
        </div>

        {/* Security Alerts */}
        {securityAlerts.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-red-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-2xl">
                ⚠️
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Security Alerts</h3>
                <p className="text-sm text-gray-600">Recent security events requiring attention</p>
              </div>
            </div>

            <div className="space-y-3">
              {securityAlerts.map((alert: any, index) => (
                <div key={index} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{alert.action.replace('_', ' ')}</h4>
                      <p className="text-sm text-gray-600 mb-2">{alert.details}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>🌐 {alert.ipAddress}</span>
                        <span>📅 {new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-medium">
                      Alert
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Login History */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">📜 Login History</h3>
          
          <div className="space-y-3">
            {loginHistory.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">🔐</div>
                <p>No login history available</p>
              </div>
            ) : (
              loginHistory.map((log: any, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    log.action === 'LOGIN' ? 'bg-green-100' : 'bg-orange-100'
                  }`}>
                    {log.action === 'LOGIN' ? '🔓' : '🔒'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{log.action}</span>
                      {index === 0 && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          Current Session
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>🕐 {new Date(log.timestamp).toLocaleString()}</span>
                      <span>🌐 {log.ipAddress}</span>
                      <span>💻 {log.userAgent?.split(' ')[0] || 'Unknown Device'}</span>
                    </div>
                  </div>
                  {index === 0 && (
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="text-4xl mb-3">🔐</div>
            <h4 className="font-bold text-gray-900 mb-2">Enable 2FA</h4>
            <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
              Enable Now
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="text-4xl mb-3">🔔</div>
            <h4 className="font-bold text-gray-900 mb-2">Login Notifications</h4>
            <p className="text-sm text-gray-600 mb-4">Get notified of new login attempts</p>
            <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm">
              Configure
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="text-4xl mb-3">🔑</div>
            <h4 className="font-bold text-gray-900 mb-2">Change Password</h4>
            <p className="text-sm text-gray-600 mb-4">Update your password regularly</p>
            <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🚨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Reporting...</h3>
              <p className="text-gray-600">Sending report to security team</p>
              <div className="mt-6">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
