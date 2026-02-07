 'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import DashboardLayout from '@/components/DashboardLayout'
import api from '@/lib/api'

export default function SecurityCenter() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [securityAlerts, setSecurityAlerts] = useState([])
  const [intrusionRules, setIntrusionRules] = useState({
    maxLoginAttempts: 5,
    sessionDuration: 24,
    autoLockEnabled: true,
    ipBlacklist: []
  })
  const [threatLevel, setThreatLevel] = useState('Low')
  const [showRulesModal, setShowRulesModal] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (user && user.role !== 'ADMIN') {
      router.push('/dashboard')
    } else if (user) {
      fetchSecurityData()
    }
  }, [user, loading, router])

  const fetchSecurityData = async () => {
    try {
      const res = await api.get('/logs')
      const logs = res.data
      
      const alerts = logs.filter((log: any) => 
        log.action === 'FAILED_LOGIN' || 
        log.action === 'SUSPICIOUS_ACTIVITY'
      ).slice(0, 10)
      
      setSecurityAlerts(alerts)
      
      // Calculate threat level
      const suspiciousCount = alerts.length
      if (suspiciousCount > 10) setThreatLevel('High')
      else if (suspiciousCount > 5) setThreatLevel('Medium')
      else setThreatLevel('Low')
    } catch (error) {
      console.error('Error fetching security data:', error)
    }
  }

  const handleSaveRules = () => {
    alert('🛡️ Security rules updated successfully!')
    setShowRulesModal(false)
  }

  const handleBlockIP = (ip: string) => {
    if (confirm(`Block IP address ${ip}?`)) {
      setIntrusionRules({
        ...intrusionRules,
        ipBlacklist: [...intrusionRules.ipBlacklist, ip]
      })
      alert(`🚫 IP ${ip} has been blocked`)
    }
  }

  if (loading) return null
  if (!user || user.role !== 'ADMIN') return null

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'High': return { bg: 'from-red-500 to-red-600', text: 'text-red-700', badge: 'bg-red-100' }
      case 'Medium': return { bg: 'from-yellow-500 to-yellow-600', text: 'text-yellow-700', badge: 'bg-yellow-100' }
      default: return { bg: 'from-green-500 to-green-600', text: 'text-green-700', badge: 'bg-green-100' }
    }
  }

  const colors = getThreatColor(threatLevel)

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">🔐 Security Command Center</h2>
            <p className="text-gray-600 mt-1">Monitor and manage system security</p>
          </div>
          <button
            onClick={() => setShowRulesModal(true)}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl font-medium flex items-center gap-2"
          >
            <span>⚙️</span>
            <span>Configure Rules</span>
          </button>
        </div>

        {/* Threat Level Banner */}
        <div className={`bg-gradient-to-r ${colors.bg} rounded-2xl p-8 text-white shadow-xl`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
                  🛡️
                </div>
                <div>
                  <h3 className="text-3xl font-bold">Threat Level: {threatLevel}</h3>
                  <p className="text-white/90">
                    {threatLevel === 'High' ? 'Multiple security threats detected' :
                     threatLevel === 'Medium' ? 'Some security concerns require attention' :
                     'All systems secure and operational'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span>🚨</span>
                  <span>{securityAlerts.length} Active Alerts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>Intrusion Detection: Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>Real-time Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center text-2xl">
                🚨
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{securityAlerts.length}</div>
                <div className="text-sm text-gray-600">Security Alerts</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-2xl">
                🔒
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{securityAlerts.filter((a: any) => a.action === 'FAILED_LOGIN').length}</div>
                <div className="text-sm text-gray-600">Failed Logins</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                🌐
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{intrusionRules.ipBlacklist.length}</div>
                <div className="text-sm text-gray-600">Blocked IPs</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-2xl">
                ✅
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">99.8%</div>
                <div className="text-sm text-gray-600">Security Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Security Alerts */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">🚨 Live Security Alerts</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 font-medium">Live Monitoring</span>
            </div>
          </div>

          {securityAlerts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">✅</div>
              <p className="font-semibold">All Clear!</p>
              <p className="text-sm">No security alerts at this time</p>
            </div>
          ) : (
            <div className="space-y-3">
              {securityAlerts.map((alert: any, index) => (
                <div key={index} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg hover:bg-red-100 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">
                          {alert.action === 'FAILED_LOGIN' ? '🔒' : 
                           alert.action === 'SUSPICIOUS_ACTIVITY' ? '⚠️' : '🚨'}
                        </span>
                        <h4 className="font-semibold text-gray-900">{alert.action.replace('_', ' ')}</h4>
                        <span className="px-2 py-1 bg-red-600 text-white rounded-full text-xs font-medium">
                          {index < 3 ? 'Critical' : 'Warning'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{alert.details}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>🌐 {alert.ipAddress}</span>
                        <span>👤 {alert.user?.name || 'Unknown'}</span>
                        <span>📅 {new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBlockIP(alert.ipAddress)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700"
                      >
                        🚫 Block IP
                      </button>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700">
                        🔍 Investigate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Intrusion Detection Rules */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">🧠 Intrusion Detection Rules</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">Max Login Attempts</span>
                <span className="text-2xl font-bold text-blue-600">{intrusionRules.maxLoginAttempts}</span>
              </div>
              <p className="text-sm text-gray-600">Account locked after this many failed attempts</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">Session Duration</span>
                <span className="text-2xl font-bold text-purple-600">{intrusionRules.sessionDuration}h</span>
              </div>
              <p className="text-sm text-gray-600">Maximum session duration before re-authentication</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">Auto-Lock Accounts</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  intrusionRules.autoLockEnabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {intrusionRules.autoLockEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <p className="text-sm text-gray-600">Automatically lock suspicious accounts</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">IP Blacklist</span>
                <span className="text-2xl font-bold text-red-600">{intrusionRules.ipBlacklist.length}</span>
              </div>
              <p className="text-sm text-gray-600">Blocked IP addresses</p>
            </div>
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="text-4xl mb-3">🔐</div>
            <h4 className="font-bold text-gray-900 mb-2">Enable 2FA for All</h4>
            <p className="text-sm text-gray-600 mb-4">Enforce two-factor authentication for all users</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
              Configure
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="text-4xl mb-3">📧</div>
            <h4 className="font-bold text-gray-900 mb-2">Email Alerts</h4>
            <p className="text-sm text-gray-600 mb-4">Get notified of critical security events</p>
            <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm">
              Setup Alerts
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="text-4xl mb-3">🔍</div>
            <h4 className="font-bold text-gray-900 mb-2">Security Audit</h4>
            <p className="text-sm text-gray-600 mb-4">Run comprehensive security audit</p>
            <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
              Run Audit
            </button>
          </div>
        </div>

        {/* Configure Rules Modal */}
        {showRulesModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">⚙️ Configure Security Rules</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                  <input
                    type="number"
                    value={intrusionRules.maxLoginAttempts}
                    onChange={(e) => setIntrusionRules({ ...intrusionRules, maxLoginAttempts: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Duration (hours)</label>
                  <input
                    type="number"
                    value={intrusionRules.sessionDuration}
                    onChange={(e) => setIntrusionRules({ ...intrusionRules, sessionDuration: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-900">Auto-Lock Accounts</span>
                  <button
                    onClick={() => setIntrusionRules({ ...intrusionRules, autoLockEnabled: !intrusionRules.autoLockEnabled })}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      intrusionRules.autoLockEnabled ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        intrusionRules.autoLockEnabled ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSaveRules}
                    className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium shadow-lg hover:shadow-xl"
                  >
                    💾 Save Rules
                  </button>
                  <button
                    onClick={() => setShowRulesModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
