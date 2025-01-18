import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Food from '@/types/Foods'
import { Link } from 'react-router'

interface Props {
  meals: Food[]
  className?: string
  title: string
  description: string
}

const MealsList = ({ meals, className, title, description }: Props) => {
  return (
    <section className={cn('explore-meals', className)}>
      <div className='con py-8 space-y-8'>
        <header className='text-center space-y-2'>
          <h1 className='text-2xl font-bold'>{title}</h1>
          <p>{description}</p>
        </header>

        <div className='meals flex flex-col gap-6'>
          {meals.map((meal) => (
            <div
              key={meal._id}
              className='meal mb-4 py-4 md:py-0  px-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-20 bg-teal-500 dark:bg-teal-900 text-slate-900 dark:text-slate-50'
            >
              <div className='details space-y-2'>
                <h2>{meal.title}</h2>
                <p>{meal.price}</p>
                {/* <p>{meal.description}</p> */}
              </div>
              <figure className='banner md:ms-auto md:relative md:-bottom-4'>
                <img src='https://placehold.co/150x150' alt='product-banner' />
              </figure>
              <div className='cta'>
                <Button asChild>
                  <Link to={`/meals/${meal._id}`}>Viw Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MealsList
