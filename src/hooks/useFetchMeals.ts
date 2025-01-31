import api from '@/services/axiosService'
import { Meal } from '@/types'
import { useQuery } from '@tanstack/react-query'

const useFetchMeals = (query?: {
  category?: string
  sort?: string
  skip?: number
  limit?: number
  minPrice?: number
  maxPrice?: number
  q?: string
}) => {
  const { category, sort, skip, limit, minPrice, maxPrice, q } = query || {}
  return useQuery<Data>({
    queryKey: ['meals', query],
    staleTime: 1000 * 60 * 60,
    queryFn: async () =>
      api
        .get('/meals', {
          params: {
            category,
            sort,
            skip,
            limit,
            'price[lte]': maxPrice,
            'price[gte]': minPrice,
            q,
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
