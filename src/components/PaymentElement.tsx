import { Button } from '@/components/ui/button'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { FormEvent, useState } from 'react'

const CheckoutForm = () => {
 const {origin}= new URL(window.location.href)


  const stripe = useStripe()
  const elements = useElements()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (elements == null) return

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setErrorMessage(submitError.message ?? 'Failed to submit payment')
      return
    }

    const { error } = await stripe!.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${origin}/payment-success`,
      },
    })

    if (error) setErrorMessage(error.message ?? 'Failed to confirm payment')
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <PaymentElement />
      <Button
        className='w-full font-medium text-xl'
        type='submit'
        disabled={!stripe || !elements}
      >
        Pay
      </Button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
}

export default CheckoutForm
