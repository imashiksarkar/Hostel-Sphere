import { useAuth } from '@/contexts/AuthProvider'
import api from '@/services/axiosService'
import { Meal } from '@/types'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const useFetchMeal = (mealId: string) => {
  const { user } = useAuth()

  const [accessToken, setAccessToken] = useState<string | null>(null)
  user?.getIdTokenResult().then(async ({ token }) => {
    setAccessToken(token)
  })

  return useQuery<Meal>({
    queryKey: ['meals', mealId, { accessToken }],
    queryFn: async () => {
      return api
        .get(`/meals/${mealId}`, {
          ...(accessToken
            ? {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            : {}),
        })
        .then((res) => {
          return res.data.data
        })
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}

export default useFetchMeal
