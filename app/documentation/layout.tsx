import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/custom/AppSideBar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex flex-row h-screen">
                <AppSidebar />
                <main className="flex-1 p-4 overflow-x-hidden ">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}
