import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ArtistSubmissions } from "@/components/artist-submissions"

export default function SubmissionsPage() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <ArtistSubmissions />
        </main>
      </div>
    </SidebarProvider>
  )
}
