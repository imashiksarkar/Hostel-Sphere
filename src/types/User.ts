type User = {
  _id: string
  username: string
  email: string
  subscription: 'silver' | 'gold' | 'platinum' | 'bronze'
  role: 'admin' | 'user'
}

export default User
