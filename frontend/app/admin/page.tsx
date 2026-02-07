'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import DashboardLayout from '@/components/DashboardLayout'
import api from '@/lib/api'

export default function AdminDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSessions: 0,
    failedLogins: 0,
    threatLevel: 'Low'
  })
  const [securityAlerts, setSecurityAlerts] = useState([])
  const [recentLogs, setRecentLogs] = useState([])
  const [usersByRole, setUsersByRole] = useState({ ADMIN: 0, STAFF: 0, STUDENT: 0 })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (user) {
      if (user.role !== 'ADMIN') {
        router.push('/dashboard')
      } else {
        fetchAdminData()
      }
    }
  }, [user, loading, router])

  const fetchAdminData = async () => {
    try {
      const [usersRes, logsRes] = await Promise.all([
        api.get('/users'),
        api.get('/logs')
      ])
      
      // Calculate stats
      const users = usersRes.data
      const logs = logsRes.data
      
      setStats({
        totalUsers: users.length,
        activeSessions: Math.floor(users.length * 0.6), // Simulated
        failedLogins: logs.filter((log: any) => log.action === 'FAILED_LOGIN').length,
        threatLevel: logs.filter((log: any) => log.action === 'SUSPICIOUS_ACTIVITY').length > 5 ? 'High' : 'Low'
      })
      
      // Group users by role
      const roleCount = users.reduce((acc: any, user: any) => {
        acc[user.role] = (acc[user.role] || 0) + 1
        return acc
      }, {})
      setUsersByRole(roleCount)
      
      // Get security alerts
      const alerts = logs.filter((log: any) => 
        log.action === 'FAILED_LOGIN' || log.action === 'SUSPICIOUS_ACTIVITY'
      ).slice(0, 5)
      setSecurityAlerts(alerts)
      
      setRecentLogs(logs.slice(0, 10))
    } catch (error) {
      console.error('Error fetching admin data:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-xl text-purple-600 font-semibold">Loading Admin Dashboard...</div>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'ADMIN') return null

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'High': return 'from-red-500 to-red-600'
      case 'Medium': return 'from-yellow-500 to-yellow-600'
      default: return 'from-green-500 to-green-600'
    }
  }

  return (
    <DashboardLayout role="ADMIN">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">👑 Admin Command Center</h2>
            <p className="text-purple-100">Complete system oversight and control</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-purple-100">System Status</div>
            <div className="text-2xl font-bold">🟢 ONLINE</div>
            <div className="text-xs text-purple-200 mt-1">All systems operational</div>
          </div>
        </div>
      </div>

      {/* System Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
              👥
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalUsers}</div>
          <div className="text-sm text-gray-600 mb-3">Total Users</div>
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Admin: {usersByRole.ADMIN || 0}</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Staff: {usersByRole.STAFF || 0}</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">Student: {usersByRole.STUDENT || 0}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-2xl">
              ⚡
            </div>
            <span className="text-green-600 text-sm font-bold bg-green-100 px-2 py-1 rounded-full">
              Live
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.activeSessions}</div>
          <div className="text-sm text-gray-600">Active Sessions</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center text-2xl">
              🚨
            </div>
            {stats.failedLogins > 0 && (
              <span className="text-red-600 text-sm font-bold bg-red-100 px-2 py-1 rounded-full">
                Alert
              </span>
            )}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.failedLogins}</div>
          <div className="text-sm text-gray-600">Failed Logins Today</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${getThreatColor(stats.threatLevel)} rounded-xl flex items-center justify-center text-2xl`}>
              🛡️
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.threatLevel}</div>
          <div className="text-sm text-gray-600">Threat Level</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Alerts */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">🚨 Live Security Alerts</h3>
            <button className="text-red-600 hover:text-red-700 font-medium text-sm">
              View All →
            </button>
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
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{alert.action === 'FAILED_LOGIN' ? '🔒' : '⚠️'}</span>
                        <h4 className="font-semibold text-gray-900">{alert.action.replace('_', ' ')}</h4>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{alert.details}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>🌐 {alert.ipAddress}</span>
                        <span>📅 {new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700">
                      Investigate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">⚡ Quick Actions</h3>
          
          <div className="space-y-3">
            <button className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👥</span>
                <span className="font-semibold">Manage Users</span>
              </div>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button className="w-full p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📜</span>
                <span className="font-semibold">Audit Logs</span>
              </div>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button className="w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📢</span>
                <span className="font-semibold">Send Broadcast</span>
              </div>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button className="w-full p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚙️</span>
                <span className="font-semibold">System Settings</span>
              </div>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Audit Logs */}
      <div className="mt-6 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">📜 Recent Audit Logs</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All Logs →
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">IP Address</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Timestamp</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Details</th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No logs available
                  </td>
                </tr>
              ) : (
                recentLogs.map((log: any, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        log.action === 'LOGIN' ? 'bg-green-100 text-green-700' :
                        log.action === 'FAILED_LOGIN' ? 'bg-red-100 text-red-700' :
                        log.action === 'SUSPICIOUS_ACTIVITY' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{log.user?.name || 'Unknown'}</td>
                    <td className="py-3 px-4 text-gray-600 font-mono text-sm">{log.ipAddress}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm truncate max-w-xs">{log.details}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Health */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl">
              💾
            </div>
            <div>
              <div className="font-bold text-gray-900">Database</div>
              <div className="text-sm text-green-700">Healthy</div>
            </div>
          </div>
          <div className="text-2xl font-bold text-green-700">98.5%</div>
          <div className="text-sm text-green-600">Uptime</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
              🌐
            </div>
            <div>
              <div className="font-bold text-gray-900">API Server</div>
              <div className="text-sm text-blue-700">Running</div>
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-700">45ms</div>
          <div className="text-sm text-blue-600">Avg Response</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl">
              🔐
            </div>
            <div>
              <div className="font-bold text-gray-900">Security</div>
              <div className="text-sm text-purple-700">Protected</div>
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-700">100%</div>
          <div className="text-sm text-purple-600">Secure</div>
        </div>
      </div>
    </DashboardLayout>
  )
}
