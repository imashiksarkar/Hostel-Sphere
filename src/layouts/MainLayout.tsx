import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <div className='layout main-layout min-h-dvh w-full grid grid-flow-row grid-cols-1 grid-rows-[auto_1fr_auto] [&>*]:col-start-1'>
      <Navbar className='row-start-1 z-10 bg-transparent' />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
