import api from '@/services/axiosService'
import { useQuery } from '@tanstack/react-query'
import IUser from '@/types/User'

const useFetchUsers = (searchText?: string, skip: number = 0) => {
  return useQuery({
    queryKey: ['users', { searchText, skip }],
    queryFn: async () =>
      await api
        .get('/users', {
          params: {
            search: searchText,
            skip,
          },
        })
        .then(
          (res) =>
            res.data.data as {
              totalDocs: number
              users: IUser[]
            }
        ),
  })
}

export default useFetchUsers
