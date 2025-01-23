import { Badge } from './ui/badge'

interface Prop {
  user: {
    displayName: string
    email: string
    numMealsAdded: number
    badge?: string
    photoURL: string
  }
}
const UserProfileBox = ({ user }: Prop) => {
  return (
    <div className='profile-card mt-8 flex flex-col sm:flex-row p-4 gap-8 justify-center items-start'>
      <figure className='dp h-44 aspect-square'>
        <img
          src={user.photoURL}
          alt='display picture'
          className='h-full w-full object-cover'
        />
      </figure>

      <div className='details flex flex-col gap-2'>
        <table>
          <tbody className='[&>tr>th]:text-start [&>tr>th+td]:px-4'>
            <tr>
              <th>Name</th>
              <td>:</td>
              <td>
                <span className='text-red-400'>{user.displayName}</span>
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>:</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Number Of Meals Added</th>
              <td>:</td>
              <td>{user.numMealsAdded}</td>
            </tr>
            {user.badge && (
              <tr>
                <td className='text-start' colSpan={3}>
                  <Badge className='w-min'>{user.badge}</Badge>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserProfileBox
