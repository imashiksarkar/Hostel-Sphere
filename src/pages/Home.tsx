import { useAuth } from '@/contexts/AuthProvider'

const Home = () => {
  const { loading } = useAuth()

  if (loading) return <div>Loading...</div>

  return <div>Home a</div>
}

export default Home
