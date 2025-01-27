import { useAuth } from '@/contexts/AuthProvider'
import api from '@/services/axiosService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useChangeRole = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userId: string) => {
      return api
        .patch(
          '/users',
          {
            userId,
            role: 'admin',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${await user?.getIdToken()}`,
            },
          }
        )
        .then((res) => res.data.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
    },
  })
}

export default useChangeRole
