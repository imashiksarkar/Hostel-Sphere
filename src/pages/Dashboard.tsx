import { useAuth } from '@/contexts/AuthProvider'

const Profile = () => {
  const { user } = useAuth()

  return (
    <section className='profile-page'>
      <div className='con py-8'>
        <h4 className='text-3xl'>
          Welcome, <span className='text-red-400'>{user?.displayName}</span>
        </h4>
        <div className='profile-card mt-8 flex flex-col sm:flex-row p-4 gap-8 justify-center items-start'>
          <figure className='dp h-44 aspect-square'>
            <img
              src={user?.photoURL || ''}
              alt='display picture'
              className='h-full w-full object-cover'
            />
          </figure>

          <div className='details flex flex-col gap-2'>
            <p>Email: {user?.email}</p>
            <p>Number Of Meals Added: 100</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
