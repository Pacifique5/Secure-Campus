'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import { useTheme } from '@/app/context/ThemeContext'

interface DashboardLayoutProps {
  children: ReactNode
  role: 'STUDENT' | 'STAFF' | 'ADMIN'
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const studentMenu = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '✓', label: 'Attendance', href: '/dashboard/attendance' },
    { icon: '📢', label: 'Announcements', href: '/dashboard/announcements' },
    { icon: '🔒', label: 'Security', href: '/dashboard/security' },
    { icon: '👤', label: 'Profile', href: '/dashboard/profile' },
    { icon: '💬', label: 'Support', href: '/dashboard/support' }
  ]

  const staffMenu = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '✓', label: 'Attendance', href: '/dashboard/attendance' },
    { icon: '👥', label: 'Students', href: '/dashboard/students' },
    { icon: '📢', label: 'Announcements', href: '/dashboard/announcements' },
    { icon: '🔒', label: 'Security', href: '/dashboard/security' },
    { icon: '👤', label: 'Profile', href: '/dashboard/profile' }
  ]

  const adminMenu = [
    { icon: '📊', label: 'Dashboard', href: '/admin' },
    { icon: '🔐', label: 'Security Center', href: '/admin/security' },
    { icon: '👥', label: 'Users', href: '/admin/users' },
    { icon: '✓', label: 'Attendance', href: '/admin/attendance' },
    { icon: '📋', label: 'Audit Logs', href: '/admin/logs' },
    { icon: '📢', label: 'Announcements', href: '/admin/announcements' },
    { icon: '⚙', label: 'Settings', href: '/admin/settings' }
  ]

  const menu = role === 'ADMIN' ? adminMenu : role === 'STAFF' ? staffMenu : studentMenu

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex transition-colors duration-300`}>
      {/* Sidebar - Fixed */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} ${darkMode ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-blue-600 to-indigo-700'} text-white transition-all duration-300 flex flex-col fixed h-screen z-40`}>
        <div className={`p-4 flex items-center justify-between border-b ${darkMode ? 'border-gray-700' : 'border-blue-500'}`}>
          {sidebarOpen && (
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl">🔐</span>
              <span className="font-bold text-base">SecureCampus</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-500'} rounded-lg transition-colors text-sm`}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menu.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-500'} transition-colors group`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-blue-500'}`}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-500 transition-colors"
          >
            <span className="text-lg">⏻</span>
            {sidebarOpen && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content - With margin to account for fixed sidebar */}
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b transition-colors duration-300`}>
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {role === 'ADMIN' ? 'Admin Dashboard' : role === 'STAFF' ? 'Staff Dashboard' : 'Student Dashboard'}
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Welcome back, {user?.name}!</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-700'} hover:scale-110 rounded-lg transition-all`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>

              {/* Notifications */}
              <button className={`relative p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}>
                <span className="text-2xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className={`flex items-center gap-3 p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors cursor-pointer`}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <div className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user?.name}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user?.role}</div>
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
