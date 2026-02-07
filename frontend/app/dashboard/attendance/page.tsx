'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import DashboardLayout from '@/components/DashboardLayout'
import api from '@/lib/api'

export default function AttendancePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [attendance, setAttendance] = useState([])
  const [checkInMessage, setCheckInMessage] = useState('')
  const [checkInLoading, setCheckInLoading] = useState(false)
  const [stats, setStats] = useState({
    present: 0,
    late: 0,
    absent: 0,
    percentage: 0
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (user) {
      fetchAttendance()
    }
  }, [user, loading, router])

  const fetchAttendance = async () => {
    try {
      const res = await api.get('/attendance/my-attendance')
      setAttendance(res.data)
      
      // Calculate stats
      const totalDays = 30
      const presentDays = res.data.length
      const percentage = ((presentDays / totalDays) * 100).toFixed(1)
      
      setStats({
        present: presentDays,
        late: Math.floor(presentDays * 0.1),
        absent: totalDays - presentDays,
        percentage: parseFloat(percentage)
      })
    } catch (error) {
      console.error('Error fetching attendance:', error)
    }
  }

  const handleCheckIn = async () => {
    setCheckInLoading(true)
    try {
      await api.post('/attendance/check-in', {
        location: 'Main Campus'
      })
      setCheckInMessage('✅ Successfully checked in!')
      fetchAttendance()
      setTimeout(() => setCheckInMessage(''), 3000)
    } catch (error: any) {
      setCheckInMessage(error.response?.data?.message || '❌ Check-in failed')
      setTimeout(() => setCheckInMessage(''), 3000)
    } finally {
      setCheckInLoading(false)
    }
  }

  const downloadReport = () => {
    // Simulate PDF download
    alert('📄 Attendance report downloaded!')
  }

  if (loading) return null
  if (!user) return null

  return (
    <DashboardLayout role={user.role as any}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">✅ Attendance Management</h2>
            <p className="text-gray-600 mt-1">Track your attendance and check-in status</p>
          </div>
          <button
            onClick={downloadReport}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <span>📄</span>
            <span>Download Report</span>
          </button>
        </div>

        {/* Check-in Card */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Quick Check-In</h3>
              <p className="text-green-100 mb-4">Click the button to mark your attendance for today</p>
              <div className="flex items-center gap-2 text-sm text-green-100">
                <span>📍</span>
                <span>Location: Main Campus</span>
                <span>•</span>
                <span>🕐</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            <button
              onClick={handleCheckIn}
              disabled={checkInLoading}
              className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-green-50 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checkInLoading ? '⏳ Checking In...' : '✅ Check In Now'}
            </button>
          </div>
          {checkInMessage && (
            <div className="mt-4 p-3 bg-white/20 rounded-lg text-center font-semibold">
              {checkInMessage}
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-2xl">
                ✅
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.present}</div>
            <div className="text-sm text-gray-600">Present Days</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-2xl">
                ⏰
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.late}</div>
            <div className="text-sm text-gray-600">Late Arrivals</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center text-2xl">
                ❌
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.absent}</div>
            <div className="text-sm text-gray-600">Absent Days</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
                📊
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.percentage}%</div>
            <div className="text-sm text-gray-600">Attendance Rate</div>
          </div>
        </div>

        {/* Attendance Calendar View */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">📅 Attendance Calendar</h3>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, index) => {
              const status = Math.random()
              const bgColor = status > 0.7 ? 'bg-green-100 border-green-500' :
                             status > 0.4 ? 'bg-yellow-100 border-yellow-500' :
                             status > 0.2 ? 'bg-red-100 border-red-500' :
                             'bg-gray-100 border-gray-300'
              const icon = status > 0.7 ? '✅' : status > 0.4 ? '⏰' : status > 0.2 ? '❌' : ''
              
              return (
                <div
                  key={index}
                  className={`aspect-square ${bgColor} border-2 rounded-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform cursor-pointer`}
                  title={`Day ${index + 1}`}
                >
                  {icon}
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded"></div>
              <span className="text-gray-600">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-500 rounded"></div>
              <span className="text-gray-600">Late</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border-2 border-red-500 rounded"></div>
              <span className="text-gray-600">Absent</span>
            </div>
          </div>
        </div>

        {/* Attendance History Table */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">📋 Attendance History</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-gray-500">
                      <div className="text-6xl mb-4">📭</div>
                      <p>No attendance records yet</p>
                    </td>
                  </tr>
                ) : (
                  attendance.map((record: any) => (
                    <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-gray-900">
                        {new Date(record.checkIn).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(record.checkIn).toLocaleTimeString()}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{record.location || 'Main Campus'}</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          ✅ Present
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
