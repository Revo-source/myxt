import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { MusicLibrary } from "@/components/music-library"

export default function LibraryPage() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <MusicLibrary />
        </main>
      </div>
    </SidebarProvider>
  )
}
