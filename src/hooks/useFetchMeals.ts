import api from '@/services/axiosService'
import { Meal } from '@/types'
import { useQuery } from '@tanstack/react-query'

const useFetchMeals = (
  category?: string,
  sort?: string,
  skip: number = 0,
  limit: number = 10
) => {
  return useQuery<Data>({
    queryKey: ['meals', { category, sort, skip, limit }],
    queryFn: async () =>
      api
        .get('/meals', {
          params: {
            category,
            sort,
            skip,
            limit,
          },
        })
        .then((res) => res.data.data),
  })
}

export default useFetchMeals

export interface Data {
  totalDocs: number
  meals: Meal[]
}
