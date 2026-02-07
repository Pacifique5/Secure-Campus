'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import DashboardLayout from '@/components/DashboardLayout'
import api from '@/lib/api'

export default function StudentsManagement() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [students, setStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (user && user.role !== 'STAFF' && user.role !== 'ADMIN') {
      router.push('/dashboard')
    } else if (user) {
      fetchStudents()
    }
  }, [user, loading, router])

  const fetchStudents = async () => {
    try {
      const res = await api.get('/users')
      const studentUsers = res.data.filter((u: any) => u.role === 'STUDENT')
      setStudents(studentUsers)
    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }

  const viewStudentDetails = (student: any) => {
    setSelectedStudent(student)
    setShowDetailsModal(true)
  }

  const filteredStudents = students.filter((student: any) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return null
  if (!user || (user.role !== 'STAFF' && user.role !== 'ADMIN')) return null

  return (
    <DashboardLayout role={user.role as any}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">👥 Student Management</h2>
          <p className="text-gray-600 mt-1">View and manage student information</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
                👨‍🎓
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{students.length}</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-2xl">
                ✅
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{Math.floor(students.length * 0.85)}</div>
                <div className="text-sm text-gray-600">Active Today</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-2xl">
                ⏰
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{Math.floor(students.length * 0.1)}</div>
                <div className="text-sm text-gray-600">Late Today</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center text-2xl">
                ❌
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{Math.floor(students.length * 0.05)}</div>
                <div className="text-sm text-gray-600">Absent Today</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">🔍 Search Students</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.length === 0 ? (
            <div className="col-span-full bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Students Found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          ) : (
            filteredStudents.map((student: any) => {
              const attendanceRate = Math.floor(Math.random() * 30) + 70
              const status = attendanceRate >= 85 ? 'excellent' : attendanceRate >= 70 ? 'good' : 'needs-attention'
              
              return (
                <div
                  key={student.id}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => viewStudentDetails(student)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Attendance Rate</span>
                      <span className={`font-bold ${
                        status === 'excellent' ? 'text-green-600' :
                        status === 'good' ? 'text-blue-600' :
                        'text-red-600'
                      }`}>
                        {attendanceRate}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Status</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        status === 'excellent' ? 'bg-green-100 text-green-700' :
                        status === 'good' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {status === 'excellent' ? '✅ Excellent' :
                         status === 'good' ? '👍 Good' :
                         '⚠️ Needs Attention'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Joined</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(student.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                    View Details →
                  </button>
                </div>
              )
            })
          )}
        </div>

        {/* Student Details Modal */}
        {showDetailsModal && selectedStudent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">👨‍🎓 Student Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Profile */}
                <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    {selectedStudent.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h4>
                    <p className="text-gray-600">{selectedStudent.email}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      Student
                    </span>
                  </div>
                </div>

                {/* Attendance Performance */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">📊 Attendance Performance</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="text-3xl font-bold text-green-600 mb-1">24</div>
                      <div className="text-sm text-gray-600">Present Days</div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                      <div className="text-3xl font-bold text-yellow-600 mb-1">3</div>
                      <div className="text-sm text-gray-600">Late Arrivals</div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                      <div className="text-3xl font-bold text-red-600 mb-1">3</div>
                      <div className="text-sm text-gray-600">Absent Days</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="text-3xl font-bold text-blue-600 mb-1">80%</div>
                      <div className="text-sm text-gray-600">Overall Rate</div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">📅 Recent Activity</h4>
                  <div className="space-y-2">
                    {[
                      { date: 'Today', time: '09:15 AM', status: 'Present', color: 'green' },
                      { date: 'Yesterday', time: '09:30 AM', status: 'Late', color: 'yellow' },
                      { date: '2 days ago', time: '09:10 AM', status: 'Present', color: 'green' },
                      { date: '3 days ago', time: '-', status: 'Absent', color: 'red' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className={`w-3 h-3 rounded-full bg-${activity.color}-500`}></span>
                          <span className="text-sm font-medium text-gray-900">{activity.date}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">{activity.time}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${activity.color}-100 text-${activity.color}-700`}>
                            {activity.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                    📧 Send Message
                  </button>
                  <button className="flex-1 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium">
                    📊 View Full Report
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
