import { Link } from 'react-router'

const NotFound = () => {
  return (
    <div className='h-screen w-full flex gap-7 flex-col justify-center items-center'>
      <p>404 Page Not Found! </p>

      <Link to='/' className='text-blue-500'>
        Go Home 🏡
      </Link>
    </div>
  )
}

export default NotFound
