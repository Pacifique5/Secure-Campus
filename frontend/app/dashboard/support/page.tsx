'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import DashboardLayout from '@/components/DashboardLayout'

export default function SupportPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [tickets, setTickets] = useState([
    { id: '1', subject: 'Login Issue', status: 'Open', priority: 'High', date: new Date().toISOString() },
    { id: '2', subject: 'Attendance Not Recorded', status: 'In Progress', priority: 'Medium', date: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', subject: 'Profile Update Request', status: 'Resolved', priority: 'Low', date: new Date(Date.now() - 172800000).toISOString() }
  ])
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'technical',
    priority: 'medium',
    description: ''
  })
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleSubmitTicket = () => {
    if (!newTicket.subject || !newTicket.description) {
      setSubmitMessage('❌ Please fill in all fields')
      setTimeout(() => setSubmitMessage(''), 3000)
      return
    }

    const ticket = {
      id: String(tickets.length + 1),
      subject: newTicket.subject,
      status: 'Open',
      priority: newTicket.priority.charAt(0).toUpperCase() + newTicket.priority.slice(1),
      date: new Date().toISOString()
    }

    setTickets([ticket, ...tickets])
    setNewTicket({ subject: '', category: 'technical', priority: 'medium', description: '' })
    setShowNewTicket(false)
    setSubmitMessage('✅ Ticket submitted successfully!')
    setTimeout(() => setSubmitMessage(''), 3000)
  }

  if (loading) return null
  if (!user) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-700'
      case 'In Progress': return 'bg-yellow-100 text-yellow-700'
      case 'Resolved': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700'
      case 'Medium': return 'bg-orange-100 text-orange-700'
      case 'Low': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <DashboardLayout role={user.role as any}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">💬 Support & Feedback</h2>
            <p className="text-gray-600 mt-1">Get help and submit feedback</p>
          </div>
          <button
            onClick={() => setShowNewTicket(!showNewTicket)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl font-medium flex items-center gap-2"
          >
            <span>➕</span>
            <span>New Ticket</span>
          </button>
        </div>

        {submitMessage && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="font-semibold">{submitMessage}</p>
          </div>
        )}

        {/* New Ticket Form */}
        {showNewTicket && (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">📝 Submit New Ticket</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="technical">Technical Issue</option>
                    <option value="account">Account Problem</option>
                    <option value="attendance">Attendance Issue</option>
                    <option value="security">Security Concern</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  placeholder="Provide detailed information about your issue..."
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSubmitTicket}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium shadow-lg hover:shadow-xl"
                >
                  ✅ Submit Ticket
                </button>
                <button
                  onClick={() => setShowNewTicket(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
                📋
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{tickets.length}</div>
                <div className="text-sm text-gray-600">Total Tickets</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-2xl">
                🔄
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length}</div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-2xl">
                ✅
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{tickets.filter(t => t.status === 'Resolved').length}</div>
                <div className="text-sm text-gray-600">Resolved</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                ⏱️
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">2.5h</div>
                <div className="text-sm text-gray-600">Avg Response</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">🎫 My Tickets</h3>
          
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{ticket.subject}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>🆔 #{ticket.id}</span>
                      <span>📅 {new Date(ticket.date).toLocaleDateString()}</span>
                      <span>🕐 {new Date(ticket.date).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Help */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="text-4xl mb-3">📚</div>
            <h4 className="font-bold text-gray-900 mb-2">Knowledge Base</h4>
            <p className="text-sm text-gray-600 mb-4">Find answers to common questions</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
              Browse Articles
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="text-4xl mb-3">💬</div>
            <h4 className="font-bold text-gray-900 mb-2">Live Chat</h4>
            <p className="text-sm text-gray-600 mb-4">Chat with our support team</p>
            <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
              Start Chat
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="text-4xl mb-3">📧</div>
            <h4 className="font-bold text-gray-900 mb-2">Email Support</h4>
            <p className="text-sm text-gray-600 mb-4">Send us an email</p>
            <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm">
              Send Email
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
