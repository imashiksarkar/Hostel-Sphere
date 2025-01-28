import { useAuth } from '@/contexts/AuthProvider'
import api from '@/services/axiosService'
import { MealsRequest } from '@/types/Meal'
import { useQuery } from '@tanstack/react-query'

const useFetchMealsReq = () => {
  const { user } = useAuth()
  return useQuery<MealsRequest[]>({
    queryKey: ['meals/request'],
    queryFn: async () => {
      return api
        .get('/meals/request', {
          headers: {
            Authorization: `Bearer ${await user?.getIdToken()}`,
          },
        })
        .then((res) => {
          return res.data.data.map((item: MealsRequest) => ({
            id: item._id,
            title: item.meal.title,
            userName: item.distributor.name,
            userEmail: item.distributor.email,
            status: item.status,
          }))
        })
    },
  })
}

export default useFetchMealsReq
