import { TiTickOutline } from 'react-icons/ti'

const PaymentSuccess = () => {
  return (
    <section className='payment-success-page my-52'>
      <div className='con flex flex-col items-center gap-12'>
        <h4 className='text-4xl'>Payment Success</h4>
        <figure className='w-max aspect-square rounded-full bg-green-500 flex items-center justify-center'>
          <TiTickOutline className='text-9xl p-1' />
        </figure>
        <p>Your payment has been successfully processed</p>
      </div>
    </section>
  )
}

export default PaymentSuccess
