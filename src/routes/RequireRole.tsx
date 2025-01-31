import { useAuth } from '@/contexts/AuthProvider'
import { useToast } from '@/hooks/use-toast'
import { ReactNode } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router'

const RequireRole = ({
  loader = null,
  role,
}: {
  loader?: ReactNode
  role: 'admin' | 'user'
}) => {
  const { user, loading } = useAuth()
  const { pathname = '/' } = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()

  if (loading) return loader
  else if (!user) return <Navigate to='/login' state={{ from: pathname }} />

  user
    .getIdTokenResult(true)
    .then((idTokenResult) => {
      if (idTokenResult.claims.role !== role) {
        toast({
          title: 'Unauthorized',
          description: 'You are not authorized to access this page',
          variant: 'destructive',
        })
        return navigate('/')
      }
    })
    .catch((error) => {
      console.error('Error fetching claims:', error)
    })

  return <Outlet />
}

export default RequireRole
