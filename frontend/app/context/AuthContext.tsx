'use client'

import { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import api from '@/lib/api'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  register: (name: string, email: string, password: string) => Promise<User>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    })
    
    const { access_token, user: userData } = response.data
    
    localStorage.setItem('token', access_token)
    localStorage.setItem('user', JSON.stringify(userData))
    
    setUser(userData)
    return userData
  }

  const register = async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
    })
    
    const { access_token, user: userData } = response.data
    
    localStorage.setItem('token', access_token)
    localStorage.setItem('user', JSON.stringify(userData))
    
    setUser(userData)
    return userData
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
