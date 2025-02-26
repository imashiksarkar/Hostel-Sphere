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
  subscription?: {
    _id: string
    paymentId: string
    apiVersion: string
    created: number
    createdAt: Date
    currency: string
    expiresAt: Date
    paymentMethod: string
    plan: string
    price: number
    type: string
    updatedAt: Date
    userId: string
  }
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
