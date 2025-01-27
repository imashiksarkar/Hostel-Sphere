import api from '@/services/axiosService'
import { useQuery } from '@tanstack/react-query'

const useFetchUsers = (searchText?: string) => {
  return useQuery({
    queryKey: ['users', { searchText }],
    queryFn: async () =>
      await api
        .get('/users', {
          params: {
            search: searchText,
          },
        })
        .then((res) => res.data),
  })
}

export default useFetchUsers
