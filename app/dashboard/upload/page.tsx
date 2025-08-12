import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { UploadContent } from "@/components/upload-content"

export default function UploadPage() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <UploadContent />
        </main>
      </div>
    </SidebarProvider>
  )
}
