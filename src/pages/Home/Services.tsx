import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { meals } from '@/constants'

const Services = () => {
  return (
    <section className='our-services'>
      <div className='con py-8'>
        <header className='text-center space-y-2'>
          <h1 className='text-2xl font-bold'>Our Services</h1>
          <p>Services we offer</p>
        </header>

        <section className='category-tab w-full grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4 py-4'>
          <h1 className='sr-only'>Product List</h1>
          {meals.map((meal) => (
            <Card key={meal._id} className='text-wrap p-4 rounded-lg'>
              <CardHeader className='space-y-0 p-0'>
                <figure className='w-12 aspect-square overflow-hidden'>
                  <img
                    className='w-full h-full object-cover'
                    src={meal.image}
                    alt={meal.title}
                    loading='lazy'
                  />
                </figure>
                <CardTitle className='pt-5 pb-3'>{meal.title}</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col gap-2 p-0'>
                Hosting {meal.title}
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </section>
  )
}

export default Services
