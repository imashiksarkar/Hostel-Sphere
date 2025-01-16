import { useAuth } from '@/contexts/AuthProvider'
import { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'

const RequireLogin = ({ loader = null }: { loader?: ReactNode }) => {
  const { user, loading } = useAuth()
  const { pathname = '/' } = useLocation()

  if (loading) return loader
  else if (!user) return <Navigate to='/login' state={{ from: pathname }} />

  return <Outlet />
}

export default RequireLogin
