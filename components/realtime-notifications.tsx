"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { Heart, UserPlus, Radio } from "lucide-react"

interface Notification {
  id: string
  type: "like" | "follow" | "new_track" | "live_stream"
  message: string
  timestamp: string
}

export function RealtimeNotifications() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    if (!user) return

    // Subscribe to likes on user's tracks
    const likesChannel = supabase
      .channel("user-likes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "likes",
          filter: `track_id=in.(${user.tracks?.map((t: any) => t.id).join(",") || ""})`,
        },
        (payload) => {
          toast("New like on your track!", {
            description: "Someone liked your music",
            icon: <Heart className="h-4 w-4 text-red-500" />,
          })
        },
      )
      .subscribe()

    // Subscribe to new followers
    const followsChannel = supabase
      .channel("user-follows")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "follows",
          filter: `following_id=eq.${user.id}`,
        },
        (payload) => {
          toast("New follower!", {
            description: "Someone started following you",
            icon: <UserPlus className="h-4 w-4 text-blue-500" />,
          })
        },
      )
      .subscribe()

    // Subscribe to live streams from followed users
    const streamsChannel = supabase
      .channel("live-streams")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "live_streams",
        },
        (payload) => {
          if (payload.new.is_live && !payload.old.is_live) {
            toast("Someone you follow is now live!", {
              description: payload.new.title,
              icon: <Radio className="h-4 w-4 text-red-500" />,
              action: {
                label: "Watch",
                onClick: () => window.open(`/live?stream=${payload.new.id}`, "_blank"),
              },
            })
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(likesChannel)
      supabase.removeChannel(followsChannel)
      supabase.removeChannel(streamsChannel)
    }
  }, [user])

  return null // This component doesn't render anything visible
}
