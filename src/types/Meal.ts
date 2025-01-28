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

export interface MealsRequest {
  _id: string
  meal: {
    _id: string
    title: string
    status: string
  }
  requestor: {
    _id: string
    fbId: string
    name: string
    email: string
  }
  status: string
  distributor: {
    _id: string
    fbId: string
    name: string
    email: string
  }
}
