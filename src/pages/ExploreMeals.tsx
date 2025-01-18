import MealsList from '@/components/MealsList'

const ExploreMeals = () => {
  const meals = Array(10)
    .fill(0)
    .map((_, i) => ({
      _id: `${i + 1}`,
      title: 'Test',
      image: 'https://placehold.co/150x150',
      price: 100,
    }))

  return (
    <main className='meals-page'>
      <MealsList
        meals={meals}
        title='Explore Meals'
        description='A sneak peek of our meals'
      />
    </main>
  )
}

export default ExploreMeals
