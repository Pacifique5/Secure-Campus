'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import DashboardLayout from '@/components/DashboardLayout'
import api from '@/lib/api'

export default function AnnouncementsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [announcements, setAnnouncements] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState('all')
  const [readStatus, setReadStatus] = useState<{[key: string]: boolean}>({})

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (user) {
      fetchAnnouncements()
    }
  }, [user, loading, router])

  const fetchAnnouncements = async () => {
    try {
      const res = await api.get('/announcements')
      setAnnouncements(res.data)
      
      // Initialize read status (simulate from localStorage)
      const stored = localStorage.getItem('readAnnouncements')
      if (stored) {
        setReadStatus(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error fetching announcements:', error)
    }
  }

  const markAsRead = (id: string) => {
    const newStatus = { ...readStatus, [id]: true }
    setReadStatus(newStatus)
    localStorage.setItem('readAnnouncements', JSON.stringify(newStatus))
  }

  const filteredAnnouncements = announcements.filter((announcement: any) => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === 'all' || announcement.priority === filterPriority
    return matchesSearch && matchesPriority
  })

  if (loading) return null
  if (!user) return null

  return (
    <DashboardLayout role={user.role as any}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">📢 Announcements</h2>
          <p className="text-gray-600 mt-1">Stay updated with the latest campus news and notices</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">🔍 Search Announcements</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or content..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">🏷️ Filter by Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="normal">Normal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
                📢
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{announcements.length}</div>
                <div className="text-sm text-gray-600">Total Announcements</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-2xl">
                ✅
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{Object.keys(readStatus).length}</div>
                <div className="text-sm text-gray-600">Read</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-2xl">
                📭
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{announcements.length - Object.keys(readStatus).length}</div>
                <div className="text-sm text-gray-600">Unread</div>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.length === 0 ? (
            <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Announcements Found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredAnnouncements.map((announcement: any) => {
              const isRead = readStatus[announcement.id]
              const isUrgent = announcement.priority === 'urgent' || Math.random() > 0.7
              
              return (
                <div
                  key={announcement.id}
                  className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all hover:shadow-xl ${
                    isRead ? 'border-gray-200' : 'border-blue-300 bg-blue-50'
                  }`}
                  onClick={() => markAsRead(announcement.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                        isUrgent ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {isUrgent ? '🚨' : '📢'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{announcement.title}</h3>
                          {!isRead && (
                            <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
                              New
                            </span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isUrgent 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {isUrgent ? '🔴 Urgent' : '🟢 Normal'}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{announcement.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>📅 {new Date(announcement.createdAt).toLocaleDateString()}</span>
                          <span>🕐 {new Date(announcement.createdAt).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
