import { useAuth } from '@/contexts/AuthProvider'
import { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'

const RequireNotLogin = ({ loader = null }: { loader?: ReactNode }) => {
  const { user, loading } = useAuth()

  const { state } = useLocation()
  const destination = state?.from || '/'

  if (loading) return loader
  else if (user) return <Navigate to={destination} />

  return <Outlet />
}

export default RequireNotLogin
