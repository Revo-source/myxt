import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { MonetizationPage } from "@/components/monetization-page"

export default function Monetization() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <MonetizationPage />
        </main>
      </div>
    </SidebarProvider>
  )
}
