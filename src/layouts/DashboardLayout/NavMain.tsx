import { ChevronRight, type LucideIcon } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Link } from 'react-router'

interface Prop {
  links: {
    title: string
    url?: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}

const NavMain = ({ links }: Prop) => {
  const CollapsibleLinkItem = ({ link }: { link: Prop['links'][number] }) => {
    return (
      <Collapsible
        key={link.title}
        asChild
        defaultOpen={link.isActive}
        className='group/collapsible'
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={link.title}>
              {link.icon && <link.icon />}
              <span>{link.title}</span>
              <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {link.items?.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild>
                    <Link to={subItem.url}>
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  const LinkItem = ({ link }: { link: Prop['links'][number] }) => {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={link.title}>
          <Link to={link?.url || '#'}>
            {link.icon && <link.icon />}
            <span>{link.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {links.map((link) => {
          return link?.items ? (
            <CollapsibleLinkItem key={link.title} link={link} />
          ) : (
            <LinkItem key={link.title} link={link} />
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavMain
