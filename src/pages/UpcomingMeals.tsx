import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import useFetchUpcomingMeals from '@/hooks/useFetchUpcomingMeals'
import { Meal } from '@/types'
import { Link } from 'react-router'

const UpcomingMeals = () => {
  const { data: meals } = useFetchUpcomingMeals()
  return (
    <main className='upcoming-meals-page'>
      <section className='explore-meals'>
        <div className='con py-8 space-y-8'>
          <header className='text-center space-y-2'>
            <h1 className='text-2xl font-bold'>Explore Upcoming Meals</h1>
            <p>A sneak peek of our upcoming meals</p>
          </header>
          <section className='grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4'>
            <h1 className='sr-only'>Meal Cards</h1>
            {(meals as unknown as Meal[]).map((meal) => (
              <Card key={meal._id} className='text-wrap p-2'>
                <CardHeader className='space-y-0 p-0'>
                  <figure className='aspect-video bg-red-300 overflow-hidden'>
                    <img
                      className='w-full h-full object-cover'
                      src={meal.image}
                      alt={meal.title}
                      loading='lazy'
                    />
                  </figure>
                  <CardTitle className='pt-5 pb-3'>{meal.title}</CardTitle>
                  <CardDescription className='pb-3'>
                    {meal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col gap-2 p-0'>
                  <p>Expires At: {'Unknown'}</p>
                  <p className='capitalize'>Category: {meal.category}</p>
                  <p className='capitalize p-2 bg-red-400/20 w-max rounded-md'>
                    {meal.status}
                  </p>
                </CardContent>
                <CardFooter className='p-0 mt-5'>
                  <Button asChild>
                    <Link to={`/foods/${meal._id}`}>See Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </section>
        </div>
      </section>
    </main>
  )
}

export default UpcomingMeals
