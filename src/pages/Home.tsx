import { useAuth } from '@/contexts/AuthProvider'

const Home = () => {
  // throw new Error('Not implemented')
  const { loading } = useAuth()

  if (loading) return <div>Loading...</div>
  return <div>Home</div>
}

export default Home
