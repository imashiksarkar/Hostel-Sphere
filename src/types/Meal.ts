export default interface Meal {
  _id: string
  title: string
  image: string
  price: number
  description: string
  numLikes: number
  isLikedByUser?: boolean
  status: 'upcoming' | 'available' | 'delivered'
  category: 'breakfast' | 'lunch' | 'dinner'
  distributor: { _id: string; fbId: string; name: string } // ref -> users
  ingredients: string[]
  rating: number
  createdAt: string
  updatedAt: string
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
