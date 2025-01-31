import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { plans } from '@/constants'
import { Link } from 'react-router'

const Pricing = () => {
  return (
    <section className='pricing'>
      <div className='con flex flex-col gap-4 items-center py-8'>
        <header className='text-center space-y-2'>
          <h1 className='text-2xl font-bold'>Pricing</h1>
          <p>Choose the best plan for you</p>
        </header>

        <ul className='plans grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] grid-rows-1 gap-4 w-full py-8'>
          {plans.map((plan) => (
            <Link to={`/checkout/${plan.name}`} key={plan._id}>
              <li className='h-full'>
                <Card
                  key={plan._id}
                  className='text-wrap p-4 rounded-lg flex flex-col items-center h-full'
                >
                  <CardHeader className='space-y-0 p-0 text-center'>
                    <CardTitle className='pt-5 pb-3 uppercase'>
                      {plan.name}
                    </CardTitle>
                    <CardDescription className='pb-3 flex flex-col'>
                      {plan.recommended && <Badge>Recommended</Badge>}
                      <p className='text-2xl mt-8'>${plan.price}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='flex flex-col gap-2 p-0 self-start'>
                    <ul className='list-disc list-inside pl-4 space-y-2'>
                      {plan.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Pricing
