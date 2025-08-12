import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { event, data } = await request.json()

    if (!event) {
      return NextResponse.json({ error: "Event type is required" }, { status: 400 })
    }

    const supabase = createClient()

    // Track different types of events
    switch (event) {
      case "track_play":
        if (data.track_id) {
          // Increment play count
          await supabase.rpc("increment_play_count", { track_id: data.track_id })
        }
        break

      case "track_like":
        if (data.track_id && data.user_id) {
          // This is handled by the likes API, but we can track additional analytics here
          console.log(`Track ${data.track_id} liked by user ${data.user_id}`)
        }
        break

      case "profile_view":
        if (data.profile_id) {
          // Track profile views (could be stored in a separate analytics table)
          console.log(`Profile ${data.profile_id} viewed`)
        }
        break

      case "stream_join":
        if (data.stream_id) {
          // Track stream joins
          console.log(`User joined stream ${data.stream_id}`)
        }
        break

      case "download":
        if (data.track_id) {
          // Increment download count
          await supabase
            .from("tracks")
            .update({ download_count: supabase.raw("download_count + 1") })
            .eq("id", data.track_id)
        }
        break

      default:
        console.log(`Unknown event type: ${event}`)
    }

    // You could also send this data to external analytics services like Google Analytics
    // or Mixpanel here

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics tracking error:", error)
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 })
  }
}
