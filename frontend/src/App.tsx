import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Container } from '@chakra-ui/react'
import Login from './pages/Login'
import Assess from './pages/Assess'
import Dashboard from './pages/Dashboard'
import { useAuth } from './state/AuthContext'

const RequireAuth = ({ children }: any) => {
  const { user, loading } = useAuth() as any
  const location = useLocation()
  if (loading) return null as any
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Container maxW="container.lg" py={8}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/assess" element={<RequireAuth><Assess /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Container>
  )
}
