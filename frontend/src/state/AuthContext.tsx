import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiGet, apiPost } from '../api'

interface User { id: number; username: string }

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext(undefined as any)

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null as any)
  const [loading, setLoading] = useState(true as any)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const u = await apiGet('/auth/me')
        if (!cancelled) setUser(u)
      } catch {
        // ignore
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const u = await apiPost('/auth/login', { username, password })
      setUser(u)
      return true
    } catch {
      return false
    }
  }

  const logout = async () => {
    try { await apiPost('/auth/logout', {}) } catch {}
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext as any)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx as AuthContextValue
}
