import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { LiveStreaming } from "@/components/live-streaming"

export default function StreamingPage() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <LiveStreaming />
        </main>
      </div>
    </SidebarProvider>
  )
}
