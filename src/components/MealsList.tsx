import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Meal } from '@/types'
import { Link } from 'react-router'

interface Props {
  meals: Meal[]
  className?: string
}

const MealsList = ({ meals, className }: Props) => {
  return (
    <section className={cn('meals flex flex-col gap-6', className)}>
      <h1 className='sr-only'>Product List</h1>
      {meals.map((meal) => (
        <div
          key={meal._id}
          className='meal mb-4 py-4 md:py-0  px-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-20 bg-teal-500 dark:bg-teal-900 text-slate-900 dark:text-slate-50'
        >
          <div className='details space-y-2'>
            <h2>{meal.title}</h2>
            <p>{meal.price}</p>
          </div>
          <figure className='banner md:w-40 aspect-square overflow-hidden md:ms-auto md:relative md:-bottom-4'>
            <img
            className='w-full h-full object-cover'
            src={meal.image} alt={`${meal.title}-banner`} />
          </figure>
          <div className='cta'>
            <Button asChild>
              <Link to={`/meals/${meal._id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      ))}
    </section>
  )
}

export default MealsList
