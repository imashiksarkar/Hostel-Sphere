import { useAuth } from '@/contexts/AuthProvider'
import api from '@/services/axiosService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useLikes = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const createLike = useMutation({
    mutationFn: async (mealId: string) => {
      return await api.post(
        '/likes',
        {
          meal: mealId,
        },
        {
          headers: {
            Authorization: `Bearer ${await user?.getIdToken()}`,
          },
        }
      )
    },
    onSuccess: (_, mealId) => {
      queryClient.invalidateQueries({
        queryKey: ['meals', mealId],
      })
    },
  })

  const unlike = useMutation({
    mutationFn: async (mealId: string) => {
      return await api.delete('/likes', {
        data: {
          meal: mealId,
        },
        headers: {
          Authorization: `Bearer ${await user?.getIdToken()}`,
        },
      })
    },
    onSuccess: (_, mealId) => {
      queryClient.invalidateQueries({
        queryKey: ['meals', mealId],
      })
    },
  })

  return { createLike, unlike }
}

export default useLikes
