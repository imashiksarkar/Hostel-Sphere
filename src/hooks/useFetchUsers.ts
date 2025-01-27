import api from '@/services/axiosService'
import { useQuery } from '@tanstack/react-query'

const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => await api.get('/users').then((res) => res.data),
  })
}

export default useFetchUsers
