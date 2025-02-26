import api from '@/services/axiosService'
import { useQuery } from '@tanstack/react-query'

const useFetchUpcomingMeals = () => {
  return useQuery({
    queryKey: ['upcomingMeals'],
    queryFn: async () => {
      return await api
        .get('/meals', {
          params: {
            sort: '-createdAt',
            status: 'upcoming',
          },
        })
        .then((res) => {
          return res.data.data
        })
    },
  })
}

export default useFetchUpcomingMeals
