import logo from '@/assets/images/logo.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useAuth } from '@/contexts/AuthProvider'
import { cn } from '@/lib/utils'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosNotifications } from 'react-icons/io'
import { RxAvatar } from 'react-icons/rx'
import { Link, NavLink, useLocation } from 'react-router'
import ThemeToggle from '@/components/ThemeToggle'

const Navbar = ({ className }: { className?: string }) => {
  const { user, logOut } = useAuth()

  const { pathname } = useLocation()
  const isJoinUsActive = pathname === '/login' || pathname === '/signup'

  const avatarUrl = user?.photoURL ?? undefined

  const NavLinks = ({
    type = 'desktop',
    className,
  }: {
    type?: 'desktop' | 'mobile'
    isAuthenticated?: boolean
    className?: string
  }) => {
    return (
      <ul
        className={cn(
          "[&>li::after]:content-[''] [&>li::after]:block [&>li::after]:w-0 [&>li:has(>a.active)::after]:w-1/2 [&>li::after]:h-1 [&>li::after]:bg-purple-300 [&>li:has(>a:hover)::after]:w-3/4 [&>li::after]:rounded [&>li::after]:transition-all [&>li::after]:duration-300 [&>li::after]:mx-auto [&>li>a]:text-lg [&>li>a]:font-medium hidden lg:flex gap-8",
          type === 'mobile' &&
            'flex lg:hidden flex-col [&>li]:w-max py-4 gap-4',
          className
        )}
      >
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/meals' end>
            Meals
          </NavLink>
        </li>
        <li>
          <NavLink to='/meals/upcoming'>Upcoming Meals</NavLink>
        </li>
      </ul>
    )
  }

  return (
    <section className={cn('navbar bg-purple-800 py-4 text-white', className)}>
      <div className='con'>
        <nav className='flex items-center justify-between'>
          <NavLink to='/'>
            <figure className='logo flex items-center gap-2 font-extrabold'>
              <img className='w-12' src={logo} alt='png' loading='lazy' />
              <figcaption className='hidden md:block'>Hostel Sphere</figcaption>
            </figure>
          </NavLink>

          <NavLinks className='gap-10' />

          <div className='flex items-center gap-6'>
            {/* Notification */}
            {user && (
              <Popover>
                <PopoverTrigger className='rounded-full p-1 border border-transparent hover:border-slate-100 transition-[border] duration-100'>
                  <IoIosNotifications className='text-3xl text-slate-100' />
                </PopoverTrigger>
                <PopoverContent className='w-max me-4'>
                  <ul className='flex flex-col gap-2'>
                    <li>Notifications</li>
                    <li>Notifications</li>
                    <li>Notifications</li>
                    <li>Notifications</li>
                  </ul>
                </PopoverContent>
              </Popover>
            )}

            {/* Auth Button */}
            {!user && (
              <Button
                asChild
                variant='ghost'
                className={cn(
                  'text-xl font-medium outline outline-1 outline-purple-100 hover:bg-purple-500',
                  isJoinUsActive && 'bg-purple-500 active'
                )}
              >
                <NavLink to='/login'>Join Us</NavLink>
              </Button>
            )}

            {/* User Avatar */}
            {user && (
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className='bg-purple-100'>
                      <RxAvatar className='text-4xl text-slate-700' />
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className='w-max me-4'>
                  <ul className='flex flex-col gap-2'>
                    {user && (
                      <>
                        <li>{user.displayName}</li>
                        <li>
                          <Link to='/dashboard' className='underline'>
                            Dashboard
                          </Link>
                        </li>
                      </>
                    )}

                    {user && (
                      <li className='mt-2'>
                        <Button variant='destructive' onClick={logOut}>
                          Logout
                        </Button>
                      </li>
                    )}
                  </ul>
                </PopoverContent>
              </Popover>
            )}

            {/* Theme Toggle */}
            <ThemeToggle className='hidden lg:flex' />

            {/* Mobile Nav */}
            <Sheet>
              <SheetTrigger>
                <Button
                  variant='default'
                  className='h-auto aspect-square p-1 bg-purple-100 hover:bg-purple-200 cursor-pointer lg:hidden'
                  asChild
                >
                  <GiHamburgerMenu className='w-9 h-9 text-slate-700' />
                </Button>
              </SheetTrigger>
              <SheetContent className='w-max py-8 lg:hidden'>
                <SheetHeader className='hidden'>
                  <SheetTitle className='hidden' />
                  <SheetDescription className='hidden' />
                </SheetHeader>

                <NavLinks type='mobile' />

                {/* Theme Toggle */}
                <div className='flex items-center gap-4'>
                  <p>Toggle Theme</p>
                  <ThemeToggle className='bg-slate-700 text-slate-100 hover:bg-slate-600 hover:text-slate-200' />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </section>
  )
}

export default Navbar
