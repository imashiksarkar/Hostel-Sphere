export default interface Meal {
  _id: string
  title: string
  image: string
  price: number
  description: string
  status: 'upcoming' | 'available' | 'delivered'
  category: 'breakfast' | 'lunch' | 'dinner'
  distributor: string // ref -> users._id
  ingredients: string[]
  rating: number
  createdAt: Date
  updatedAt: Date
}
