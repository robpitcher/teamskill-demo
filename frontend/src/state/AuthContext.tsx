import React, { createContext, useContext, useEffect, useState } from 'react'

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
        const res = await fetch('/auth/me', { credentials: 'include' })
        if (res.ok) {
          const u = await res.json()
          if (!cancelled) setUser(u)
        }
      } catch {
        // ignore
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const login = async (username: string, password: string) => {
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    })
    if (res.ok) {
      const u = await res.json()
      setUser(u)
      return true
    }
    return false
  }

  const logout = async () => {
    await fetch('/auth/logout', { method: 'POST', credentials: 'include' })
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
