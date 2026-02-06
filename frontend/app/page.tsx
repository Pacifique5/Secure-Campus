'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './context/AuthContext'

export default function Home() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [stats, setStats] = useState({ users: 0, attendance: 0, security: 0 })

  useEffect(() => {
    setMounted(true)
    
    // Animated counter
    const duration = 2000
    const steps = 60
    const increment = duration / steps
    
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      setStats({
        users: Math.floor(progress * 5000),
        attendance: Math.floor(progress * 15000),
        security: Math.floor(progress * 99.9 * 10) / 10
      })
      if (step >= steps) clearInterval(timer)
    }, increment)

    // Feature rotation
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(featureInterval)
    }
  }, [])

  useEffect(() => {
    if (!loading && user && mounted) {
      if (user.role === 'ADMIN') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    }
  }, [user, loading, router, mounted])

  if (loading || (user && mounted)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-xl text-primary-600 font-semibold">Loading...</div>
        </div>
      </div>
    )
  }

  const features = [
    { icon: '📊', title: 'Real-Time Analytics', color: 'from-blue-500 to-cyan-500' },
    { icon: '🔒', title: 'Advanced Security', color: 'from-purple-500 to-pink-500' },
    { icon: '⚡', title: 'Lightning Fast', color: 'from-orange-500 to-red-500' }
  ]

  const team = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', emoji: '👩‍💼', color: 'bg-blue-100' },
    { name: 'Michael Chen', role: 'CTO', emoji: '👨‍💻', color: 'bg-purple-100' },
    { name: 'Emily Rodriguez', role: 'Head of Security', emoji: '👩‍🔬', color: 'bg-pink-100' },
    { name: 'David Kim', role: 'Lead Developer', emoji: '👨‍🚀', color: 'bg-green-100' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-sm fixed w-full z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-3xl">🔐</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                  SecureCampus
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Features</a>
              <a href="#analytics" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Analytics</a>
              <a href="#team" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Team</a>
              <a href="#contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Login
              </Link>
              <Link href="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Animation */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-8 animate-fade-in-up">
              <div className="inline-block animate-slide-in">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold shadow-sm">
                  🎉 Trusted by 500+ Institutions Worldwide
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
                Secure Your
                <span className="block gradient-text mt-2 animate-pulse-slow">
                  Campus Future
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                The most advanced platform for campus security, attendance tracking, and real-time monitoring. 
                Powered by cutting-edge technology and trusted worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2">
                  Start Free Trial <span className="animate-float">→</span>
                </Link>
                <a href="#analytics" className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center">
                  See Analytics
                </a>
              </div>
              
              {/* Live Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{stats.users.toLocaleString()}+</div>
                  <div className="text-sm text-gray-600 mt-1 font-medium">Active Users</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{stats.attendance.toLocaleString()}+</div>
                  <div className="text-sm text-gray-600 mt-1 font-medium">Check-ins Today</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{stats.security}%</div>
                  <div className="text-sm text-gray-600 mt-1 font-medium">Security Score</div>
                </div>
              </div>
            </div>

            {/* Animated Feature Showcase */}
            <div className="relative h-96 animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl transform rotate-3 shadow-xl"></div>
              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-8 flex flex-col justify-center items-center space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`w-full p-6 rounded-2xl bg-gradient-to-r ${feature.color} transform transition-all duration-700 ease-out ${
                      activeFeature === index ? 'scale-105 opacity-100 shadow-2xl' : 'scale-95 opacity-40'
                    }`}
                  >
                    <div className="text-5xl mb-3 animate-float">{feature.icon}</div>
                    <div className="text-2xl font-bold text-white drop-shadow-lg">{feature.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need, All in One Place
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed for modern campus management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '👥', title: 'Smart Attendance', desc: 'AI-powered attendance tracking with facial recognition, QR codes, and automated reporting for seamless check-ins.', color: 'from-blue-500 to-cyan-500' },
              { icon: '🔒', title: 'Security Monitoring', desc: 'Real-time threat detection, suspicious activity alerts, and comprehensive audit trails for complete campus safety.', color: 'from-purple-500 to-pink-500' },
              { icon: '📢', title: 'Instant Alerts', desc: 'Campus-wide emergency notifications, announcements, and real-time updates delivered instantly to all devices.', color: 'from-orange-500 to-red-500' },
              { icon: '👨‍💼', title: 'Role Management', desc: 'Granular access control with custom roles, permissions, and secure authentication for admins, staff, and students.', color: 'from-green-500 to-emerald-500' },
              { icon: '📊', title: 'Advanced Analytics', desc: 'Deep insights with interactive dashboards, predictive analytics, and customizable reports for data-driven decisions.', color: 'from-indigo-500 to-purple-500' },
              { icon: '⚡', title: 'Lightning Performance', desc: 'Built on cutting-edge technology for instant response times, real-time updates, and seamless user experience.', color: 'from-yellow-500 to-orange-500' }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`text-5xl mb-4 inline-block p-4 rounded-xl bg-gradient-to-r ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Dashboard Preview */}
      <div id="analytics" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Real-Time Analytics Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monitor everything that matters with beautiful, actionable insights
            </p>
          </div>

          {/* Main Dashboard Preview */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Students', value: '2,847', change: '+12%', icon: '👥', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
                { label: 'Today\'s Attendance', value: '94.2%', change: '+2.4%', icon: '✅', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50' },
                { label: 'Security Score', value: '99.8%', change: '+0.3%', icon: '🔒', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50' },
                { label: 'Active Sessions', value: '1,234', change: '+8%', icon: '⚡', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50' }
              ].map((stat, index) => (
                <div key={index} className={`${stat.bgColor} p-6 rounded-2xl card-hover`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{stat.icon}</span>
                    <span className="text-green-600 text-sm font-bold bg-green-100 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Attendance Chart */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Weekly Attendance</h3>
                  <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">Last 7 days</span>
                </div>
                <div className="space-y-4">
                  {[
                    { day: 'Mon', value: 92, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
                    { day: 'Tue', value: 88, color: 'bg-gradient-to-r from-indigo-500 to-indigo-600' },
                    { day: 'Wed', value: 95, color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
                    { day: 'Thu', value: 90, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
                    { day: 'Fri', value: 94, color: 'bg-gradient-to-r from-indigo-500 to-indigo-600' },
                    { day: 'Sat', value: 78, color: 'bg-gradient-to-r from-gray-400 to-gray-500' },
                    { day: 'Sun', value: 65, color: 'bg-gradient-to-r from-gray-400 to-gray-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-bold text-gray-700">{item.day}</div>
                      <div className="flex-1 bg-white rounded-full h-10 overflow-hidden shadow-inner">
                        <div
                          className={`${item.color} h-full rounded-full flex items-center justify-end pr-4 text-white text-sm font-bold transition-all duration-1000 shadow-lg`}
                          style={{ width: `${item.value}%` }}
                        >
                          {item.value}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Heatmap */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Activity Heatmap</h3>
                  <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">Peak Hours</span>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }).map((_, index) => {
                    const intensity = Math.random()
                    const bgColor = intensity > 0.7 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                                   intensity > 0.4 ? 'bg-gradient-to-br from-purple-300 to-purple-400' :
                                   intensity > 0.2 ? 'bg-gradient-to-br from-purple-200 to-purple-300' :
                                   'bg-gray-200'
                    return (
                      <div
                        key={index}
                        className={`${bgColor} aspect-square rounded-lg card-hover shadow-sm`}
                        title={`Activity: ${Math.round(intensity * 100)}%`}
                      ></div>
                    )
                  })}
                </div>
                <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="w-4 h-4 bg-purple-200 rounded"></div>
                    <div className="w-4 h-4 bg-purple-400 rounded"></div>
                    <div className="w-4 h-4 bg-purple-600 rounded"></div>
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Feed */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">🔴 Live Activity Feed</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 font-medium">Live</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { user: 'Sarah Johnson', action: 'checked in at Main Building', time: 'Just now', icon: '✅', color: 'from-green-400 to-green-500' },
                { user: 'Mike Chen', action: 'accessed Lab 3', time: '2 min ago', icon: '🔐', color: 'from-blue-400 to-blue-500' },
                { user: 'Emily Davis', action: 'submitted assignment', time: '5 min ago', icon: '📄', color: 'from-purple-400 to-purple-500' },
                { user: 'Alex Kumar', action: 'joined virtual class', time: '8 min ago', icon: '💻', color: 'from-indigo-400 to-indigo-500' },
                { user: 'Lisa Wang', action: 'checked out', time: '12 min ago', icon: '👋', color: 'from-orange-400 to-orange-500' },
                { user: 'Tom Brown', action: 'updated profile', time: '15 min ago', icon: '👤', color: 'from-pink-400 to-pink-500' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all border border-gray-100">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center text-xl shadow-lg`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 truncate">
                      {activity.user}
                    </div>
                    <div className="text-sm text-gray-600 truncate">{activity.action}</div>
                    <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by Institutions Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers have to say about SecureCampus
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Jennifer Martinez',
                role: 'Dean of Student Affairs',
                institution: 'Stanford University',
                avatar: '👩‍🎓',
                rating: 5,
                text: 'SecureCampus has transformed how we manage campus security. The real-time analytics and attendance tracking are game-changers. Our response time to incidents has improved by 60%!',
                color: 'from-blue-500 to-blue-600'
              },
              {
                name: 'Prof. David Kim',
                role: 'IT Director',
                institution: 'MIT',
                avatar: '👨‍💼',
                rating: 5,
                text: 'The most intuitive campus management platform we\'ve used. Implementation was seamless, and the support team is outstanding. Highly recommend to any institution!',
                color: 'from-purple-500 to-purple-600'
              },
              {
                name: 'Maria Rodriguez',
                role: 'Security Chief',
                institution: 'Harvard University',
                avatar: '👩‍💻',
                rating: 5,
                text: 'Finally, a security platform that actually works! The suspicious activity detection has helped us prevent multiple incidents. It\'s like having an extra security team 24/7.',
                color: 'from-indigo-500 to-indigo-600'
              },
              {
                name: 'James Wilson',
                role: 'Campus Administrator',
                institution: 'Oxford University',
                avatar: '👨‍🏫',
                rating: 5,
                text: 'The attendance tracking feature alone has saved us countless hours. Students love the mobile check-in, and we have complete visibility into campus activity.',
                color: 'from-green-500 to-green-600'
              },
              {
                name: 'Dr. Aisha Patel',
                role: 'Vice Chancellor',
                institution: 'Cambridge University',
                avatar: '👩‍⚕️',
                rating: 5,
                text: 'SecureCampus has exceeded our expectations. The analytics dashboard provides insights we never had before. It\'s become essential to our daily operations.',
                color: 'from-pink-500 to-pink-600'
              },
              {
                name: 'Robert Chen',
                role: 'Student Services Director',
                institution: 'Yale University',
                avatar: '👨‍🔬',
                rating: 5,
                text: 'Best investment we\'ve made in campus technology. The ROI was evident within the first month. Our students and staff feel safer, and operations run smoother.',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 card-hover">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-3xl shadow-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-gray-500">{testimonial.institution}</div>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-8 font-medium">Trusted by leading institutions worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['🎓 Stanford', '🏛️ MIT', '📚 Harvard', '🎯 Oxford', '⚡ Cambridge', '🌟 Yale'].map((badge, index) => (
                <div key={index} className="text-2xl font-bold text-gray-700 hover:opacity-100 transition-opacity">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Amazing Team
            </h2>
            <p className="text-xl text-gray-600">
              Passionate experts dedicated to campus security
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group text-center transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`${member.color} w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform shadow-lg`}>
                  {member.emoji}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600 font-medium">{member.role}</p>
                <div className="flex justify-center gap-3 mt-4">
                  <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                    <span className="text-sm">in</span>
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                    <span className="text-sm">𝕏</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-5"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to Transform Your Campus?
          </h2>
          <p className="text-xl text-white/95 mb-8 leading-relaxed">
            Join 500+ institutions worldwide using SecureCampus for enhanced security, 
            streamlined operations, and peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="inline-block px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-xl shadow-2xl hover:shadow-3xl hover:bg-gray-50 transition-all transform hover:scale-105">
              Start Your Free Trial →
            </Link>
            <a href="#contact" className="inline-block px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105">
              Contact Sales
            </a>
          </div>
          <p className="text-white/90 mt-6 text-sm">✨ No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🔐</span>
                <span className="text-2xl font-bold text-white">SecureCampus</span>
              </div>
              <p className="text-gray-400 mb-4">
                The most trusted platform for campus security and management worldwide.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <span>𝕏</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <span>in</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <span>f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <span>📷</span>
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="hover:text-primary-400 transition-colors">Features</a></li>
                <li><a href="#analytics" className="hover:text-primary-400 transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Integrations</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#team" className="hover:text-primary-400 transition-colors">About Us</a></li>
                <li><a href="#team" className="hover:text-primary-400 transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Press Kit</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">API Reference</a></li>
                <li><a href="mailto:support@securecampus.com" className="hover:text-primary-400 transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">System Status</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
              <div>
                <div className="text-2xl mb-2">📧</div>
                <div className="text-white font-semibold">Email Us</div>
                <a href="mailto:hello@securecampus.com" className="text-primary-400 hover:text-primary-300">
                  hello@securecampus.com
                </a>
              </div>
              <div>
                <div className="text-2xl mb-2">📞</div>
                <div className="text-white font-semibold">Call Us</div>
                <a href="tel:+1234567890" className="text-primary-400 hover:text-primary-300">
                  +1 (234) 567-890
                </a>
              </div>
              <div>
                <div className="text-2xl mb-2">📍</div>
                <div className="text-white font-semibold">Visit Us</div>
                <p className="text-gray-400">123 Campus Drive, Tech City, TC 12345</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2026 SecureCampus. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
