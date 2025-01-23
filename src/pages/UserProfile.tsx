import UserProfileBox from '@/components/UserProfileBox'

const UserProfile = () => {
  // TODO: fetch this from the server
  const modifiedUser = {
    displayName: 'John Doe',
    email: 'ashik@aa.com',
    photoURL:
      'https://lh3.googleusercontent.com/a/ACg8ocLzeG0eFxR8JC2ze4RF0U_Z0bTRwJD65RwXIsynNsR45D22yDOx=s96-c',
    numMealsAdded: 156,
    badge: 'Bronze',
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

export default UserProfile
