import MealsList from '@/components/MealsList'
import { meals } from '@/constants'

const UpcomingMeals = () => {
  return (
    <main className='upcoming-meals-page'>
      <section className='explore-meals'>
        <div className='con py-8 space-y-8'>
          <header className='text-center space-y-2'>
            <h1 className='text-2xl font-bold'>Explore Upcoming Meals</h1>
            <p>A sneak peek of our upcoming meals</p>
          </header>
          <MealsList meals={meals} />
        </div>
      </section>
    </main>
  )
}

export default UpcomingMeals
