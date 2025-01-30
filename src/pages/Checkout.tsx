import CheckoutForm from '@/components/PaymentElement'
import { useAuth } from '@/contexts/AuthProvider'
import { useTheme } from '@/contexts/ThemeProvider'
import api from '@/services/axiosService'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const Checkout = () => {
  const { plan } = useParams<{ plan: 'silver' | 'gold' | 'platinum' }>()

  const [clientSecret, setClientSecret] = useState('')
  const [paymentError, setPaymentError] = useState('')
  const { theme } = useTheme()

  const { user } = useAuth()

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!plan) return

      try {
        const { data: res } = await api.post(
          '/payment',
          {
            plan,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${await user?.getIdToken()}`,
            },
          }
        )

        setClientSecret(res.data.clientSecret)
      } catch (error) {
        setPaymentError((error as AxiosError).message)
      }
    }

    createPaymentIntent()
  }, [plan, user])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: theme === 'dark' ? 'night' : 'stripe',
    },
  }

  return (
    <section className='py-8'>
      <div className='con flex items-center justify-center h-full'>
        {clientSecret ? (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        ) : (
          <p>{paymentError || 'Loading Payment Element...'}</p>
        )}
      </div>
    </section>
  )
}

export default Checkout
