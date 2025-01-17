import Slider from './Slider'
import MealsByCategory from './MealsByCategory'

const Home = () => {
  return (
    <main className='home-page row-start-1 row-end-3'>
      <Slider />
      <MealsByCategory />
    </main>
  )
}

export default Home
