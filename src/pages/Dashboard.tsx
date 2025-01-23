import UserProfileBox from '@/components/UserProfileBox'
import { useAuth } from '@/contexts/AuthProvider'

const Dashboard = () => {
  const { user } = useAuth()

  if (!user || !user.displayName || !user.email || !user.photoURL)
    throw new Error('User not found')

  const { displayName, email, photoURL } = user
  const modifiedUser = {
    displayName,
    email,
    photoURL,
    // TODO: fetch this from the server
    numMealsAdded: 156,
  }

  return (
    <section className='profile-page'>
      <div className='con py-8'>
        <h4 className='sr-only'>user profile</h4>
        <UserProfileBox user={modifiedUser} />
      </div>
    </section>
  )
}

export default Dashboard
