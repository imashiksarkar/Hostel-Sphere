import { useQuery } from '@tanstack/react-query'
import ourServices from '@/data/ourServices.json'

const useFetchOfferedServices = () => {
  return useQuery({
    queryKey: ['offeredServices'],
    queryFn: async () => ourServices,
  })
}

export default useFetchOfferedServices
