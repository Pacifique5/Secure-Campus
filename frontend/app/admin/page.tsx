'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

interface Log {
  id: string
  action: string
  ipAddress: string
  userAgent: string
  details: string
  timestamp: string
  user?: {
    id: string
    name: string
    email: string
  }
}

interface Attendance {
  id: string
  checkIn: string
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

export default function AdminDashboard() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [users, setUsers] = useState<User[]>([])
  const [logs, setLogs] = useState<Log[]>([])
  const [suspiciousLogs, setSuspiciousLogs] = useState<Log[]>([])
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (!loading && user?.role !== 'ADMIN') {
      router.push('/dashboard')
    } else if (user?.role === 'ADMIN') {
      fetchData()
    }
  }, [user, loading, router])

  const fetchData = async () => {
    try {
      const [usersRes, logsRes, suspiciousRes, attendanceRes] = await Promise.all([
        axios.get('http://localhost:3000/users'),
        axios.get('http://localhost:3000/logs?limit=50'),
        axios.get('http://localhost:3000/logs/suspicious'),
        axios.get('http://localhost:3000/attendance/all'),
      ])
      setUsers(usersRes.data)
      setLogs(logsRes.data)
      setSuspiciousLogs(suspiciousRes.data)
      setAttendance(attendanceRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setDataLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  const todayAttendance = attendance.filter(a => 
    new Date(a.checkIn).toDateString() === new Date().toDateString()
  ).length

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">🛡️ Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-white">Admin: {user?.name}</span>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              User View
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{users.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Logs</h3>
            <p className="text-3xl font-bold text-green-600">{logs.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Suspicious Activity</h3>
            <p className="text-3xl font-bold text-red-600">{suspiciousLogs.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Today&apos;s Attendance</h3>
            <p className="text-3xl font-bold text-purple-600">{todayAttendance}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-semibold ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 font-semibold ${
                activeTab === 'users'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-6 py-3 font-semibold ${
                activeTab === 'logs'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              Security Logs
            </button>
            <button
              onClick={() => setActiveTab('suspicious')}
              className={`px-6 py-3 font-semibold ${
                activeTab === 'suspicious'
                  ? 'border-b-2 border-red-600 text-red-600'
                  : 'text-gray-600'
              }`}
            >
              🚨 Suspicious Activity
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">System Overview</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold">System Status</h3>
                    <p className="text-gray-600">All systems operational</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold">Recent Activity</h3>
                    <p className="text-gray-600">{logs.length} total events logged</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="font-semibold">Security Alerts</h3>
                    <p className="text-gray-600">
                      {suspiciousLogs.length} suspicious activities detected
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">User Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Name</th>
                        <th className="text-left py-2">Email</th>
                        <th className="text-left py-2">Role</th>
                        <th className="text-left py-2">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="border-b">
                          <td className="py-2">{u.name}</td>
                          <td className="py-2">{u.email}</td>
                          <td className="py-2">
                            <span
                              className={`px-2 py-1 rounded text-sm ${
                                u.role === 'ADMIN'
                                  ? 'bg-purple-100 text-purple-800'
                                  : u.role === 'STAFF'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="py-2">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'logs' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Security Logs</h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className="border-l-4 border-gray-300 pl-4 py-2 hover:bg-gray-50"
                    >
                      <div className="flex justify-between">
                        <span className="font-semibold">{log.action}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{log.details}</p>
                      <p className="text-xs text-gray-400">
                        IP: {log.ipAddress} | User: {log.user?.email || 'N/A'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'suspicious' && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-red-600">
                  🚨 Suspicious Activity
                </h2>
                {suspiciousLogs.length === 0 ? (
                  <p className="text-gray-600">No suspicious activity detected</p>
                ) : (
                  <div className="space-y-2">
                    {suspiciousLogs.map((log) => (
                      <div
                        key={log.id}
                        className="border-l-4 border-red-500 pl-4 py-2 bg-red-50"
                      >
                        <div className="flex justify-between">
                          <span className="font-semibold text-red-700">
                            {log.action}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{log.details}</p>
                        <p className="text-xs text-gray-500">
                          IP: {log.ipAddress} | User: {log.user?.email || 'Unknown'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
