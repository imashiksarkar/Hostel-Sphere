import meals from '@/data/meals.dummy.json'
import { Meal } from '@/types'

const useFetchUpcomingMeals = () => {
  return { data: meals as unknown as Meal[] }
}

export default useFetchUpcomingMeals
