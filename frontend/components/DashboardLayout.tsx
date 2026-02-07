'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'

interface DashboardLayoutProps {
  children: ReactNode
  role: 'STUDENT' | 'STAFF' | 'ADMIN'
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const studentMenu = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '✅', label: 'Attendance', href: '/dashboard/attendance' },
    { icon: '📢', label: 'Announcements', href: '/dashboard/announcements' },
    { icon: '🔒', label: 'Security', href: '/dashboard/security' },
    { icon: '👤', label: 'Profile', href: '/dashboard/profile' },
    { icon: '💬', label: 'Support', href: '/dashboard/support' }
  ]

  const staffMenu = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '✅', label: 'Attendance', href: '/dashboard/attendance' },
    { icon: '👥', label: 'Students', href: '/dashboard/students' },
    { icon: '📢', label: 'Announcements', href: '/dashboard/announcements' },
    { icon: '🔒', label: 'Security', href: '/dashboard/security' },
    { icon: '👤', label: 'Profile', href: '/dashboard/profile' }
  ]

  const adminMenu = [
    { icon: '📊', label: 'Dashboard', href: '/admin' },
    { icon: '🔐', label: 'Security Center', href: '/admin/security' },
    { icon: '👥', label: 'Users', href: '/admin/users' },
    { icon: '✅', label: 'Attendance', href: '/admin/attendance' },
    { icon: '📜', label: 'Audit Logs', href: '/admin/logs' },
    { icon: '📢', label: 'Announcements', href: '/admin/announcements' },
    { icon: '⚙️', label: 'Settings', href: '/admin/settings' }
  ]

  const menu = role === 'ADMIN' ? adminMenu : role === 'STAFF' ? staffMenu : studentMenu

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-600 to-indigo-700 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b border-blue-500">
          {sidebarOpen && (
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🔐</span>
              <span className="font-bold text-lg">SecureCampus</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menu.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500 transition-colors group"
            >
              <span className="text-2xl">{item.icon}</span>
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-500">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-500 transition-colors"
          >
            <span className="text-2xl">🚪</span>
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {role === 'ADMIN' ? 'Admin Dashboard' : role === 'STAFF' ? 'Staff Dashboard' : 'Student Dashboard'}
              </h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="text-2xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.role}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
