'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

interface Announcement {
  id: string
  title: string
  content: string
  createdAt: string
}

interface Attendance {
  id: string
  checkIn: string
  location: string
}

export default function Dashboard() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [dataLoading, setDataLoading] = useState(true)
  const [checkInMessage, setCheckInMessage] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (user) {
      fetchData()
    }
  }, [user, loading, router])

  const fetchData = async () => {
    try {
      const [announcementsRes, attendanceRes] = await Promise.all([
        axios.get('http://localhost:3000/announcements'),
        axios.get('http://localhost:3000/attendance/my-attendance'),
      ])
      setAnnouncements(announcementsRes.data)
      setAttendance(attendanceRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setDataLoading(false)
    }
  }

  const handleCheckIn = async () => {
    try {
      await axios.post('http://localhost:3000/attendance/check-in', {
        location: 'Campus',
      })
      setCheckInMessage('✅ Checked in successfully!')
      fetchData()
      setTimeout(() => setCheckInMessage(''), 3000)
    } catch (error: any) {
      setCheckInMessage(error.response?.data?.message || '❌ Check-in failed')
      setTimeout(() => setCheckInMessage(''), 3000)
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

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">🔐 SecureCampus</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user?.name}</span>
            {user?.role === 'ADMIN' && (
              <button
                onClick={() => router.push('/admin')}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Admin Panel
              </button>
            )}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Profile</h3>
            <p className="text-gray-600">Email: {user?.email}</p>
            <p className="text-gray-600">Role: {user?.role}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Attendance</h3>
            <p className="text-gray-600">Total: {attendance.length} days</p>
            <button
              onClick={handleCheckIn}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Check In Today
            </button>
            {checkInMessage && (
              <p className="mt-2 text-sm text-center">{checkInMessage}</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
            <p className="text-gray-600">Announcements: {announcements.length}</p>
            <p className="text-gray-600">Status: Active</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">📢 Announcements</h2>
          {announcements.length === 0 ? (
            <p className="text-gray-600">No announcements yet</p>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-lg">{announcement.title}</h3>
                  <p className="text-gray-600">{announcement.content}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">📅 My Attendance History</h2>
          {attendance.length === 0 ? (
            <p className="text-gray-600">No attendance records yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Time</th>
                    <th className="text-left py-2">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((record) => (
                    <tr key={record.id} className="border-b">
                      <td className="py-2">
                        {new Date(record.checkIn).toLocaleDateString()}
                      </td>
                      <td className="py-2">
                        {new Date(record.checkIn).toLocaleTimeString()}
                      </td>
                      <td className="py-2">{record.location || 'Campus'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
