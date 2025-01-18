import MealsList from '@/components/MealsList'
import { meals } from '@/constants'
import { cn } from '@/lib/utils'

const ExploreMeals = () => {
  return (
    <main className='meals-page'>
      <section className={cn('explore-meals')}>
        <div className='con py-8 space-y-8'>
          <header className='text-center space-y-2'>
            <h1 className='text-2xl font-bold'>Explore Meals</h1>
            <p>A sneak peek of our meals</p>
          </header>
          <MealsList meals={meals} />
        </div>
      </section>
    </main>
  )
}

export default ExploreMeals
