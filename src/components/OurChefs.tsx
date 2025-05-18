import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import john from '../assets/images/chefs/john.png'
import meena from '../assets/images/chefs/meena.png'
import david from '../assets/images/chefs/david.png'
import mario from '../assets/images/chefs/mario.png'

const OurChefs = () => {
  const chefs = [
    {
      id: Math.random().toString(36).substring(2),
      name: 'Johnathan Cruz',
      image: john,
      role: 'Executive Chef',
      description:
        'With over 15 years in gourmet kitchens, Johnathan leads the culinary team with creativity and precision.',
    },
    {
      id: Math.random().toString(36).substring(2),
      name: 'Meena Khatun',
      image: meena,
      role: 'Sous Chef',
      description:
        'Meena specializes in South Asian cuisine and ensures every dish is cooked to perfection with traditional flair.',
    },
    {
      id: Math.random().toString(36).substring(2),
      name: 'David Swichmer',
      image: david,
      role: 'Pastry Chef',
      description:
        'An expert in desserts and baking, David crafts sweet masterpieces that delight every palate.',
    },
    {
      id: Math.random().toString(36).substring(2),
      name: 'Mario Jones',
      image: mario,
      role: 'Line Chef',
      description:
        'Fast, focused, and dependable, Mario keeps the kitchen running smoothly during peak hours.',
    },
  ]

  return (
    <section className='our-chefs'>
      <div className='con py-8'>
        <header className='text-center space-y-2'>
          <h1 className='text-2xl font-bold'>Our Chefs</h1>
          <p>Meet our talented chefs</p>
        </header>

        <section className='category-tab w-full grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-4 py-4'>
          <h1 className='sr-only'>Product List</h1>

          {chefs.map((chef) => (
            <Card
              key={chef.id}
              className='text-wrap p-6 border-none bg-slate-200 dark:bg-slate-800 flex flex-col items-center justify-center rounded-none'
            >
              <CardHeader className='space-y-0 p-0 flex flex-col items-center'>
                <figure className='w-28 aspect-square  relative circle-spin'>
                  <img
                    className='w-full h-full object-cover rounded-full'
                    src={chef.image}
                    alt={chef.name}
                  />
                </figure>
                <CardTitle className='pt-5 pb-3'>{chef.name}</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col gap-2 p-0 text-center'>
                <span className='font-medium text-emerald-600'>
                  {chef.role}
                </span>
                <p>{chef.description}</p>
              </CardContent>
            </Card>
          ))}

          {/* <Card key={'meal._id'} className='text-wrap p-4 rounded-lg'>
            <CardHeader className='space-y-0 p-0'>
              <figure className='w-12 text-4xl aspect-square overflow-hidden'>
                {'meal.icon'}
              </figure>
              <CardTitle className='pt-5 pb-3'>{'meal.title'}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-2 p-0'>
              Hosting {'meal.title'}
            </CardContent>
          </Card> */}
        </section>
      </div>
    </section>
  )
}

export default OurChefs
