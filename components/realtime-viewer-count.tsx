"use client"

import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import { useRealtimeViewerCount } from "@/hooks/use-realtime"

interface RealtimeViewerCountProps {
  streamId: string
  className?: string
}

export function RealtimeViewerCount({ streamId, className }: RealtimeViewerCountProps) {
  const viewerCount = useRealtimeViewerCount(streamId)

  return (
    <Badge variant="secondary" className={className}>
      <Eye className="h-3 w-3 mr-1" />
      {viewerCount.toLocaleString()} {viewerCount === 1 ? "viewer" : "viewers"}
    </Badge>
  )
}
