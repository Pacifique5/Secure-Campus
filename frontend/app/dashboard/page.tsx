'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import DashboardLayout from '@/components/DashboardLayout'
import api from '@/lib/api'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    attendance: 0,
    missedSessions: 0,
    upcomingEvents: 0,
    lastLogin: ''
  })
  const [announcements, setAnnouncements] = useState([])
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (user) {
      if (user.role === 'ADMIN') {
        router.push('/admin')
      } else {
        fetchDashboardData()
      }
    }
  }, [user, loading, router])

  const fetchDashboardData = async () => {
    try {
      const [announcementsRes, attendanceRes, logsRes] = await Promise.all([
        api.get('/announcements'),
        api.get('/attendance/my-attendance'),
        api.get('/logs/my-activity')
      ])
      
      setAnnouncements(announcementsRes.data.slice(0, 3))
      
      // Calculate stats
      const totalDays = 30
      const attendedDays = attendanceRes.data.length
      const attendancePercentage = ((attendedDays / totalDays) * 100).toFixed(1)
      
      setStats({
        attendance: parseFloat(attendancePercentage),
        missedSessions: totalDays - attendedDays,
        upcomingEvents: 3,
        lastLogin: logsRes.data[0]?.timestamp || new Date().toISOString()
      })
      
      setRecentActivity(logsRes.data.slice(0, 5))
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-xl text-blue-600 font-semibold">Loading Dashboard...</div>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <DashboardLayout role={user.role as any}>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h2>
            <p className="text-blue-100">Here's what's happening with your account today.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">Last Login</div>
            <div className="text-lg font-semibold">{new Date(stats.lastLogin).toLocaleString()}</div>
            <div className="text-xs text-blue-200 mt-1">🔒 Account Secure</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-2xl">
              ✅
            </div>
            <span className="text-green-600 text-sm font-bold bg-green-100 px-2 py-1 rounded-full">
              +5%
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.attendance}%</div>
          <div className="text-sm text-gray-600">Attendance Rate</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center text-2xl">
              ❌
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.missedSessions}</div>
          <div className="text-sm text-gray-600">Missed Sessions</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
              📅
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.upcomingEvents}</div>
          <div className="text-sm text-gray-600">Upcoming Events</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
              🔔
            </div>
            <span className="text-blue-600 text-sm font-bold bg-blue-100 px-2 py-1 rounded-full">
              New
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{announcements.length}</div>
          <div className="text-sm text-gray-600">New Announcements</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Announcements */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">📢 Recent Announcements</h3>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All →
            </button>
          </div>
          
          {announcements.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📭</div>
              <p>No announcements yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement: any) => (
                <div key={announcement.id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg hover:bg-blue-100 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{announcement.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{announcement.content}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>📅 {new Date(announcement.createdAt).toLocaleDateString()}</span>
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full font-medium">
                          Normal
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">🔒 Security Activity</h3>
          
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No recent activity</p>
            ) : (
              recentActivity.map((activity: any, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    {activity.action === 'LOGIN' ? '🔓' : '📝'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900">{activity.action}</div>
                    <div className="text-xs text-gray-500 truncate">{activity.ipAddress}</div>
                    <div className="text-xs text-gray-400">{new Date(activity.timestamp).toLocaleString()}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <button className="w-full mt-4 py-2 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm">
            🚨 Report Suspicious Activity
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">⚡ Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
            <div className="text-3xl mb-2">✅</div>
            <div className="font-semibold text-gray-900 group-hover:text-blue-600">Check In</div>
          </button>
          <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold text-gray-900 group-hover:text-purple-600">View Reports</div>
          </button>
          <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group">
            <div className="text-3xl mb-2">👤</div>
            <div className="font-semibold text-gray-900 group-hover:text-green-600">Update Profile</div>
          </button>
          <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all group">
            <div className="text-3xl mb-2">💬</div>
            <div className="font-semibold text-gray-900 group-hover:text-orange-600">Get Support</div>
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
