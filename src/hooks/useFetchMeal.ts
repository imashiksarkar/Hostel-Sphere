import api from '@/services/axiosService'
import { Meal } from '@/types'
import { useQuery } from '@tanstack/react-query'

const useFetchMeal = (mealId: string) => {
  return useQuery<Meal>({
    queryKey: ['meal', mealId],
    queryFn: async () => {
      return api.get(`/meals/${mealId}`).then((res) => {
        return res.data.data
      })
    },
  })
}

export default useFetchMeal
