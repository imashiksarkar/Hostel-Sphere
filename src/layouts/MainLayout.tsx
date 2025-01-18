import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import { Outlet, useLocation } from 'react-router'

const MainLayout = () => {
  const { pathname } = useLocation()
  return (
    <div className='layout main-layout min-h-dvh w-full grid grid-flow-row grid-cols-1 grid-rows-[auto_1fr_auto] [&>*]:col-start-1'>
      <Navbar
        className={cn(
          'row-start-1 z-10',
          pathname === '/' && ' bg-transparent'
        )}
      />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
