import { useAuth } from '@/contexts/AuthProvider'
import { AddMealDto } from '@/pages/AddMeal'
import api from '@/services/axiosService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type AddMealAttrs = Omit<AddMealDto, 'ingredients'> & {
  ingredients: string[]
}

const useAddMeal = (onAdd: () => void) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: AddMealAttrs) => {
      const response = await api.post('/meals', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await user?.getIdToken()}`,
        },
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] })
      onAdd()
    },
  })
}

export default useAddMeal
