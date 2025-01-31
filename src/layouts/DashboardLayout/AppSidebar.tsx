import logo from '@/assets/images/logo.png'

import {
  User,
  UserRoundPen,
  Heater,
  CookingPot,
  Table,
  Star,
  HandPlatter,
} from 'lucide-react'
import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Link } from 'react-router'
import NavMain from './NavMain'
import NavUser from './NavUser'
import { useAuth } from '@/contexts/AuthProvider'

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { user } = useAuth()

  const { displayName, email, photoURL } = user!

  const [isAdmin, setIsAdmin] = React.useState(false)

  user?.getIdTokenResult(true).then((idTokenResult) => {
    setIsAdmin(idTokenResult.claims.role === 'admin')
  })

  const data = {
    navMain: [
      {
        title: 'My Profile',
        url: '/dashboard',
        icon: User,
        isActive: true,
      },
      {
        title: 'Users Roles',
        icon: UserRoundPen,
        url: '/dashboard/users',
      },
      {
        title: 'All Meals',
        url: '/dashboard/meals',
        icon: Table,
      },
      {
        title: 'Requested Meals',
        url: '/dashboard/meals/requested',
        icon: Heater,
      },
      {
        title: 'Add Meal',
        url: '/dashboard/meals/add',
        icon: CookingPot,
      },
      {
        title: 'Serve Meals',
        url: '/dashboard/meals/serve',
        icon: HandPlatter,
      },
      {
        title: 'Reviews',
        url: '/dashboard/reviews',
        icon: Star,
      },
    ],
  }

  if (isAdmin) {
    delete data.navMain[3]
  } else {
    ;[1, 2, 4, 5, 6].forEach((i) => delete data.navMain[i])
  }

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              asChild
            >
              <Link to='/'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <img src={logo} alt='logo' className='size-6' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>Hostel Sphere</span>
                  <span className='truncate text-xs'>Silver</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className='mt-8'>
        <NavMain links={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: displayName!,
            email: email!,
            avatar: photoURL!,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
