import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Link, Outlet, useLocation } from 'react-router'
import AppSidebar from './AppSidebar'
import { Fragment } from 'react'
const DashboardLayout = () => {
  const loc = useLocation()
  const paths = loc.pathname.split('/')
  paths.shift()

  let url = ''

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                {paths.map((path, index) => {
                  url += '/' + path
                  return (
                    <Fragment key={index}>
                      <BreadcrumbItem key={index} className='capitalize'>
                        <BreadcrumbLink asChild>
                          <Link to={url}>{path}</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index !== paths.length - 1 && <BreadcrumbSeparator />}
                    </Fragment>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0 content-area'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
