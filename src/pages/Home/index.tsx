import Slider from './Slider'
import MealsByCategory from './MealsByCategory'
import Pricing from './Pricing'
import Services from './Services'
import NewMeals from './NewMeals'
import HowItWorks from '@/components/HowItWorks'

const Home = () => {
  return (
    <main className='home-page row-start-1 row-end-3'>
      <Slider />
      <MealsByCategory />
      <NewMeals />
      <HowItWorks />
      <Services />
      <Pricing />
    </main>
  )
}

export default Home
