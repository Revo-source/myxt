import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ProfilePage } from "@/components/profile-page"

export default function Profile() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <ProfilePage />
        </main>
      </div>
    </SidebarProvider>
  )
}
