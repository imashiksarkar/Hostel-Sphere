import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import registerIcon from '../assets/images/register.png'
import paymentIcon from '../assets/images/payment.png'
import orderIcon from '../assets/images/order.png'

const HowItWorks = () => {
  const cards = [
    {
      title: 'register',
      icon: (
        <figure className='w-14 h-14 aspect-square p-2 bg-green-400/80 rounded-md'>
          <img
            className='w-full h-full object-contain'
            src={registerIcon}
            alt='register'
          />
        </figure>
      ),
      content: 'register yourself to this platform.',
    },
    {
      title: 'pay',
      icon: (
        <figure className='w-14 h-14 aspect-square p-2 bg-purple-400/80 rounded-md'>
          <img
            className='w-full h-full object-contain'
            src={paymentIcon}
            alt='pay'
          />
        </figure>
      ),
      content: 'take a subscription plan.',
    },
    {
      title: 'order',
      icon: (
        <figure className='w-14 h-14 aspect-square p-2 bg-orange-400/80 rounded-md'>
          <img
            className='w-full h-full object-contain'
            src={orderIcon}
            alt='order'
          />
        </figure>
      ),
      content: 'order food and get it delivered.',
    },
  ]

  return (
    <section className='how-it-works'>
      <div className='con py-8'>
        <header className='text-center space-y-2'>
          <h1 className='text-2xl font-bold'>How It Works!</h1>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4'>
          {cards.map((card, index) => (
            <Card
              key={card.title}
              className='text-wrap p-4 rounded-lg flex flex-col items-center justify-center relative overflow-hidden border-dashed'
            >
              <span className='absolute text-xl font-bold -left-2 -top-2 p-4 bg-red-500/10 rounded-full w-12 h-12 aspect-square flex items-center justify-center border border-dashed border-red-500'>
                {index + 1}
              </span>
              <CardHeader className='space-y-4 p-0 flex flex-col items-center justify-center'>
                {card.icon}
                <CardTitle className='uppercase'>{card.title}</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col gap-2 p-0 text-center pt-4 capitalize'>
                {card.content}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
