import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Button",
    url: "/documentation/button",
  },
  {
    title: "Navbar",
    url: "/documentation/navbar",
  },
  {
    title: "Tabs",
    url: "/documentation/tabs",
  },
  {
    title: "Snackbar",
    url: "/documentation/snackbar",
  },
  {
    title: "File Upload",
    url: "/documentation/fileupload",
  },
  {
    title: "Form Modal",
    url: "/documentation/form",
  },
  {
    title: "Log History",
    url: "/documentation/logs",
  },
  {
    title: "Additional Resources",
    url: "/documentation/resources",
  },
  {
    title: "WAMS Demo",
    url: "/delivery"
  },
  {
    title: "Auth Demo",
    url: "/authdemo/login"
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-outfit font-bold text-lg hover:cursor-default text-black">Component List</SidebarGroupLabel>
          <SidebarGroupContent className="pt-2">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
