import { useAuth } from '@/contexts/AuthProvider'
import api from '@/services/axiosService'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export interface IPaymentHistoryResponse {
  success: boolean
  status: string
  data: {
    _id: string
    paymentId: string
    apiVersion: string
    created: number
    createdAt: Date
    currency: string
    expiresAt: Date
    paymentMethod: string
    plan: string
    price: number
    type: string
    updatedAt: Date
    userId: string
  }[]
}

const useFetchPaymentsHistory = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const { user } = useAuth()
  user?.getIdTokenResult().then(async ({ token }) => {
    setAccessToken(token)
  })

  return useQuery<IPaymentHistoryResponse['data']>({
    queryKey: ['payment', 'history', { accessToken }],
    queryFn: async () => {
      return api
        .get('/payment', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data.data)
    },
    enabled: !!accessToken,
  })
}

export default useFetchPaymentsHistory
