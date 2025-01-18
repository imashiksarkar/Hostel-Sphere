import Slider from './Slider'
import MealsByCategory from './MealsByCategory'
import Pricing from './Pricing'

const Home = () => {
  return (
    <main className='home-page row-start-1 row-end-3'>
      <Slider />
      <MealsByCategory />
      <Pricing />
    </main>
  )
}

export default Home
