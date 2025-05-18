import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useFetchOfferedServices from '@/hooks/useFetchOfferedServices'

const Services = () => {
  const { data: services } = useFetchOfferedServices()
  return (
    <section className='our-services'>
      <div className='con py-8'>
        <header className='text-center space-y-2'>
          <h1 className='text-2xl font-bold'>Our Services</h1>
          <p>Services we offer</p>
        </header>

        <section className='category-tab w-full grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4 py-4'>
          <h1 className='sr-only'>Services List</h1>
          {services?.map((meal) => (
            <Card key={meal._id} className='text-wrap p-4 rounded-lg'>
              <CardHeader className='space-y-0 p-0'>
                <figure className='w-12 text-4xl aspect-square overflow-hidden'>
                  {meal.icon}
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
