// including meal image, distributor name, description, ingredients, post time, rating, like button, meal request button, and reviews

export default interface Meal {
  _id: string
  title: string
  image: string
  price: number
  description: string
  category: string
  distributor: string
  ingredients: string[]
  postTime: string
  rating: number
}
