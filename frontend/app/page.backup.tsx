'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
    
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 6)
    }, 5000)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const team = [
    { 
      name: 'Mugisha Pacifique', 
      role: 'CEO & Founder', 
      image: '/images/team/mugisha.jpg',
      description: 'Visionary leader with 15+ years in campus security innovation and digital transformation'
    },
    { 
      name: 'Ruyange Arnold', 
      role: 'CTO', 
      image: '/images/team/arnold.jpg',
      description: 'Tech genius specializing in AI-powered security systems and real-time analytics platforms'
    },
    { 
      name: 'Nyumbayire Laurent', 
      role: 'Head of Security', 
      image: '/images/team/laurent.jpg',
      description: 'Former military strategist ensuring top-tier security protocols and threat prevention'
    },
    { 
      name: 'Ntwali David', 
      role: 'Lead Developer', 
      image: '/images/team/david.jpg',
      description: 'Full-stack expert building scalable solutions that power 500+ institutions worldwide'
    }
  ]

  if (!mounted) return null

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className={`${darkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-100'} backdrop-blur-md shadow-sm fixed w-full z-50 border-b transition-all duration-300 ${scrollY > 50 ? 'py-2' : 'py-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent hover:scale-105 transition-transform`}>
              SecureCampus
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-all hover:scale-110`}>Features</a>
              <a href="#analytics" className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-all hover:scale-110`}>Analytics</a>
              <a href="#testimonials" className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-all hover:scale-110`}>Testimonials</a>
              <a href="#team" className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-all hover:scale-110`}>Team</a>
            </div>
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'} hover:scale-110 transition-all`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <Link href="/login" className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium transition-all hover:scale-105`}>Login</Link>
              <Link href="/register" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all hover:scale-105 hover:shadow-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={`pt-32 pb-20 px-4 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'} relative overflow-hidden`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 left-10 w-72 h-72 ${darkMode ? 'bg-blue-500' : 'bg-blue-200'} rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob`}></div>
          <div className={`absolute top-40 right-10 w-72 h-72 ${darkMode ? 'bg-purple-500' : 'bg-purple-200'} rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000`}></div>
          <div className={`absolute -bottom-8 left-1/2 w-72 h-72 ${darkMode ? 'bg-pink-500' : 'bg-pink-200'} rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000`}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block mb-6 animate-fade-in-down">
              <span className={`px-4 py-2 ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'} rounded-full text-sm font-semibold hover:scale-105 transition-transform cursor-default`}>
                Trusted by 500+ Institutions Worldwide
              </span>
            </div>
            <h1 className={`text-5xl md:text-7xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 animate-fade-in-up`}>
              Secure Your Campus <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Future</span>
            </h1>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-3xl mx-auto animate-fade-in`}>
              The most advanced platform for campus security, attendance tracking, and real-time monitoring
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-300">
              <Link href="/register" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium text-lg shadow-lg hover:shadow-2xl transition-all hover:scale-105 relative overflow-hidden">
                <span className="relative z-10">Start Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <a href="#analytics" className={`px-8 py-4 ${darkMode ? 'bg-gray-800 text-blue-400 border-blue-400' : 'bg-white text-blue-600 border-blue-600'} rounded-lg hover:bg-opacity-80 font-medium text-lg shadow-lg border-2 hover:scale-105 transition-all hover:shadow-2xl`}>
                See Analytics
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className={`text-center p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 animate-fade-in-up animation-delay-500 group cursor-default`}>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">5,000+</div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Users</div>
            </div>
            <div className={`text-center p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 animate-fade-in-up animation-delay-700 group cursor-default`}>
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">15,000+</div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Check-ins Today</div>
            </div>
            <div className={`text-center p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 animate-fade-in-up animation-delay-900 group cursor-default`}>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">99.9%</div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Security Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Everything You Need, All in One Place
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Comprehensive tools designed for modern campus management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className={`group p-8 ${darkMode ? 'bg-gradient-to-br from-blue-900/40 to-cyan-900/40' : 'bg-gradient-to-br from-blue-50 to-cyan-50'} rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-2 cursor-pointer`}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:rotate-12 transition-transform">
                SA
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} mb-3 transition-colors`}>Smart Attendance</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                AI-powered attendance tracking with facial recognition, QR codes, and automated reporting
              </p>
            </div>

            <div className={`group p-8 ${darkMode ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/40' : 'bg-gradient-to-br from-purple-50 to-pink-50'} rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-2 cursor-pointer`}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:rotate-12 transition-transform">
                SM
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} mb-3 transition-colors`}>Security Monitoring</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Real-time threat detection, suspicious activity alerts, and comprehensive audit trails
              </p>
            </div>

            <div className={`group p-8 ${darkMode ? 'bg-gradient-to-br from-orange-900/40 to-red-900/40' : 'bg-gradient-to-br from-orange-50 to-red-50'} rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-2 cursor-pointer`}>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:rotate-12 transition-transform">
                IA
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'} mb-3 transition-colors`}>Instant Alerts</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Campus-wide emergency notifications and real-time updates delivered instantly
              </p>
            </div>

            <div className={`group p-8 ${darkMode ? 'bg-gradient-to-br from-green-900/40 to-emerald-900/40' : 'bg-gradient-to-br from-green-50 to-emerald-50'} rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-2 cursor-pointer`}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:rotate-12 transition-transform">
                RM
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white group-hover:text-green-400' : 'text-gray-900 group-hover:text-green-600'} mb-3 transition-colors`}>Role Management</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Granular access control with custom roles, permissions, and secure authentication
              </p>
            </div>

            <div className={`group p-8 ${darkMode ? 'bg-gradient-to-br from-indigo-900/40 to-purple-900/40' : 'bg-gradient-to-br from-indigo-50 to-purple-50'} rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-2 cursor-pointer`}>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:rotate-12 transition-transform">
                AA
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-600'} mb-3 transition-colors`}>Advanced Analytics</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Deep insights with interactive dashboards and customizable reports
              </p>
            </div>

            <div className={`group p-8 ${darkMode ? 'bg-gradient-to-br from-yellow-900/40 to-orange-900/40' : 'bg-gradient-to-br from-yellow-50 to-orange-50'} rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-2 cursor-pointer`}>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:rotate-12 transition-transform">
                LP
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white group-hover:text-yellow-400' : 'text-gray-900 group-hover:text-yellow-600'} mb-3 transition-colors`}>Lightning Performance</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Built on cutting-edge technology for instant response times
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard Section */}
      <div id="analytics" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Real-Time Analytics Dashboard
            </h2>
            <p className="text-xl text-blue-200">
              Monitor everything that matters with beautiful, actionable insights
            </p>
          </div>

          {/* Animated Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="group relative bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm p-6 rounded-2xl border border-blue-400/30 hover:border-blue-400/60 transition-all hover:scale-105 cursor-default overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-blue-300 font-semibold px-3 py-1 bg-blue-500/30 rounded-full">+12%</div>
                  <div className="text-2xl">👥</div>
                </div>
                <div className="text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">2,847</div>
                <div className="text-sm text-blue-200">Total Students</div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm p-6 rounded-2xl border border-green-400/30 hover:border-green-400/60 transition-all hover:scale-105 cursor-default overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-green-300 font-semibold px-3 py-1 bg-green-500/30 rounded-full">+2.4%</div>
                  <div className="text-2xl">✓</div>
                </div>
                <div className="text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">94.2%</div>
                <div className="text-sm text-green-200">Today's Attendance</div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm p-6 rounded-2xl border border-purple-400/30 hover:border-purple-400/60 transition-all hover:scale-105 cursor-default overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-purple-300 font-semibold px-3 py-1 bg-purple-500/30 rounded-full">+0.3%</div>
                  <div className="text-2xl">🛡️</div>
                </div>
                <div className="text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">99.8%</div>
                <div className="text-sm text-purple-200">Security Score</div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm p-6 rounded-2xl border border-orange-400/30 hover:border-orange-400/60 transition-all hover:scale-105 cursor-default overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-orange-300 font-semibold px-3 py-1 bg-orange-500/30 rounded-full">+8%</div>
                  <div className="text-2xl">⚡</div>
                </div>
                <div className="text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">1,234</div>
                <div className="text-sm text-orange-200">Active Sessions</div>
              </div>
            </div>
          </div>

          {/* Advanced Charts Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Attendance Wave Chart */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Attendance Wave</h3>
                <span className="text-sm text-blue-300 px-3 py-1 bg-blue-500/30 rounded-full">Last 30 Days</span>
              </div>
              <div className="h-64 flex items-end justify-between gap-1">
                {[85, 92, 88, 95, 90, 94, 96, 93, 91, 94, 97, 95, 92, 94, 96, 98, 94, 93, 95, 97, 96, 94, 95, 93, 94, 96, 95, 94, 93, 95].map((value, index) => (
                  <div key={index} className="group flex-1 relative">
                    <div 
                      className="w-full bg-gradient-to-t from-cyan-500 via-blue-500 to-indigo-500 rounded-t-lg transition-all duration-500 hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-400 cursor-pointer shadow-lg hover:shadow-cyan-500/50" 
                      style={{ 
                        height: `${value}%`,
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {value}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-blue-300">
                <span>Day 1</span>
                <span>Day 15</span>
                <span>Day 30</span>
              </div>
            </div>

            {/* Circular Progress Stats */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all">
              <h3 className="text-2xl font-bold text-white mb-6">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Security', value: 99, color: 'from-purple-500 to-pink-500', ring: 'stroke-purple-500' },
                  { label: 'Uptime', value: 100, color: 'from-green-500 to-emerald-500', ring: 'stroke-green-500' },
                  { label: 'Response', value: 95, color: 'from-blue-500 to-cyan-500', ring: 'stroke-blue-500' },
                  { label: 'Satisfaction', value: 98, color: 'from-orange-500 to-red-500', ring: 'stroke-orange-500' }
                ].map((metric, index) => (
                  <div key={index} className="flex flex-col items-center group cursor-default">
                    <div className="relative w-28 h-28 mb-3">
                      <svg className="transform -rotate-90 w-28 h-28">
                        <circle cx="56" cy="56" r="48" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                        <circle 
                          cx="56" 
                          cy="56" 
                          r="48" 
                          className={`${metric.ring} transition-all duration-1000 group-hover:stroke-width-10`}
                          strokeWidth="8" 
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 48}`}
                          strokeDashoffset={`${2 * Math.PI * 48 * (1 - metric.value / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">{metric.value}%</span>
                      </div>
                    </div>
                    <span className="text-sm text-blue-200">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Loved by Institutions Worldwide
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              See what our customers have to say about SecureCampus
            </p>
          </div>

          {/* Auto-scrolling Testimonials */}
          <div className="relative">
            <div className="flex gap-8 animate-scroll-testimonials">
              {[
                { name: 'Dr. Jennifer Martinez', role: 'Dean', institution: 'Stanford University', text: 'SecureCampus has transformed how we manage campus security. The real-time analytics are game-changers!', logo: '🎓' },
                { name: 'Prof. David Kim', role: 'IT Director', institution: 'MIT', text: 'The most intuitive campus management platform. Implementation was seamless and support is outstanding!', logo: '🏛️' },
                { name: 'Maria Rodriguez', role: 'Security Chief', institution: 'Harvard University', text: 'Finally, a security platform that actually works! Helped us prevent multiple incidents.', logo: '📚' },
                { name: 'James Wilson', role: 'Administrator', institution: 'Oxford University', text: 'The attendance tracking alone has saved us countless hours. Students love the mobile check-in!', logo: '🎯' },
                { name: 'Dr. Aisha Patel', role: 'Vice Chancellor', institution: 'Cambridge University', text: 'Exceeded our expectations. The analytics dashboard provides insights we never had before!', logo: '⭐' },
                { name: 'Robert Chen', role: 'Director', institution: 'Yale University', text: 'Best investment in campus technology. The ROI was evident within the first month!', logo: '🏆' },
                { name: 'Dr. Jennifer Martinez', role: 'Dean', institution: 'Stanford University', text: 'SecureCampus has transformed how we manage campus security. The real-time analytics are game-changers!', logo: '🎓' },
                { name: 'Prof. David Kim', role: 'IT Director', institution: 'MIT', text: 'The most intuitive campus management platform. Implementation was seamless and support is outstanding!', logo: '🏛️' },
              ].map((testimonial, index) => (
                <div key={index} className={`group ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-white'} p-8 rounded-2xl shadow-lg border ${darkMode ? 'border-gray-600' : 'border-gray-100'} hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer min-w-[400px] flex-shrink-0`}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="text-yellow-500 mb-3 text-lg">★★★★★</div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} italic mb-4`}>"{testimonial.text}"</p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-2xl">{testimonial.logo}</span>
                    <span className={`text-sm font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{testimonial.institution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* University Logos Marquee */}
          <div className="text-center mt-16">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-medium mb-8`}>Trusted by leading institutions worldwide</p>
            <div className="relative overflow-hidden">
              <div className="flex gap-12 animate-scroll-logos">
                {[
                  { name: 'Stanford', logo: '🎓' },
                  { name: 'MIT', logo: '🏛️' },
                  { name: 'Harvard', logo: '📚' },
                  { name: 'Oxford', logo: '🎯' },
                  { name: 'Cambridge', logo: '⭐' },
                  { name: 'Yale', logo: '🏆' },
                  { name: 'Princeton', logo: '🎖️' },
                  { name: 'Columbia', logo: '🌟' },
                  { name: 'Stanford', logo: '🎓' },
                  { name: 'MIT', logo: '🏛️' },
                  { name: 'Harvard', logo: '📚' },
                  { name: 'Oxford', logo: '🎯' },
                ].map((uni, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 min-w-[120px] flex-shrink-0">
                    <div className={`text-5xl ${darkMode ? 'opacity-70' : 'opacity-60'} hover:opacity-100 transition-opacity`}>{uni.logo}</div>
                    <div className={`text-xl font-bold ${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>{uni.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div id="team" className={`py-20 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-indigo-900/20' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Meet Our Amazing Team
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Passionate experts dedicated to campus security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className={`group text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-2 cursor-pointer animate-fade-in-up`} style={{ animationDelay: `${index * 150}ms` }}>
                <div className={`relative w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden ${darkMode ? 'bg-gradient-to-br from-blue-900 to-indigo-900' : 'bg-gradient-to-br from-blue-100 to-indigo-100'} ring-4 ${darkMode ? 'ring-blue-700 group-hover:ring-blue-500' : 'ring-blue-200 group-hover:ring-blue-400'} transition-all`}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-3xl font-bold text-blue-600">${member.name.charAt(0)}</div>`;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} mb-1 transition-colors`}>{member.name}</h3>
                <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} font-semibold mb-3`}>{member.role}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>{member.description}</p>
                <div className="flex justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className={`w-8 h-8 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-full flex items-center justify-center ${darkMode ? 'hover:bg-blue-800' : 'hover:bg-blue-200'} transition-colors cursor-pointer`}>
                    <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} text-sm`}>in</span>
                  </div>
                  <div className={`w-8 h-8 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-full flex items-center justify-center ${darkMode ? 'hover:bg-blue-800' : 'hover:bg-blue-200'} transition-colors cursor-pointer`}>
                    <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} text-sm`}>@</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`py-20 ${darkMode ? 'bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900' : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'} relative overflow-hidden`}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to Transform Your Campus?
          </h2>
          <p className={`text-xl ${darkMode ? 'text-blue-200' : 'text-blue-100'} mb-8 animate-fade-in animation-delay-300`}>
            Join 500+ institutions worldwide using SecureCampus for enhanced security and peace of mind
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-500">
            <Link href="/register" className="group px-8 py-4 bg-white text-blue-600 rounded-lg font-medium text-lg hover:scale-105 transition-all hover:shadow-2xl relative overflow-hidden">
              <span className="relative z-10">Start Your Free Trial</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <a href="#" className="px-8 py-4 bg-transparent text-white rounded-lg hover:bg-white/10 font-medium text-lg border-2 border-white hover:scale-105 transition-all hover:shadow-2xl">
              Contact Sales
            </a>
          </div>
          <p className={`mt-6 ${darkMode ? 'text-blue-200' : 'text-blue-100'} text-sm animate-fade-in animation-delay-700`}>No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className={`py-20 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-blue-900' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Get in Touch</h2>
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-12`}>
            Have questions? We'd love to hear from you
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`group ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-2 cursor-pointer`}>
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📧</div>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Email Us</h3>
              <a href="mailto:hello@securecampus.com" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium`}>
                hello@securecampus.com
              </a>
            </div>
            <div className={`group ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-2 cursor-pointer`}>
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📞</div>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Call Us</h3>
              <a href="tel:+1234567890" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium`}>
                +1 (234) 567-890
              </a>
            </div>
            <div className={`group ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-2 cursor-pointer`}>
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📍</div>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Visit Us</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>123 Campus Drive<br />Tech City, TC 12345</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-black' : 'bg-gray-900'} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">SecureCampus</h3>
              <p className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                The most trusted platform for campus security and management worldwide
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#features" className={`${darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>Features</a></li>
                <li><a href="#analytics" className={`${darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>Analytics</a></li>
                <li><a href="#testimonials" className={`${darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#team" className={`${darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>About Us</a></li>
                <li><a href="#team" className={`${darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>Team</a></li>
                <li><a href="#" className={`${darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className={`${darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>Help Center</a></li>
                <li><a href="#" className={`${darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>Documentation</a></li>
                <li><a href="#" className={`${darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className={`border-t ${darkMode ? 'border-gray-900' : 'border-gray-800'} pt-8 text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            <p>© 2026 SecureCampus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
