import { useAuth } from '@/contexts/AuthProvider'
import { useToast } from '@/hooks/use-toast'
import { ReactNode, useEffect } from 'react'
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

  useEffect(() => {
    user
      ?.getIdTokenResult()
      .then((idTokenResult) => {
        const userRole = (idTokenResult.claims.role as string) || 'user'

        if (userRole !== role) {
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
  }, [user, role, navigate, toast])

  if (loading) return loader
  else if (!user) return <Navigate to='/login' state={{ from: pathname }} />

  return <Outlet />
}

export default RequireRole
