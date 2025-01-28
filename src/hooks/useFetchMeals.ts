import api from '@/services/axiosService'
import { useQuery } from '@tanstack/react-query'

const useFetchMeals = (sort?: string, skip: number = 0, limit: number = 10) => {
  return useQuery({
    queryKey: ['meals', { sort, skip, limit }],
    queryFn: async () =>
      api
        .get('/meals', {
          params: {
            sort,
            skip,
            limit,
          },
        })
        .then((res) => res.data.data),
  })
}

export default useFetchMeals
