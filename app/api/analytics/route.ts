import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's track analytics
    const { data: tracks } = await supabase
      .from("tracks")
      .select("id, title, play_count, like_count, download_count, created_at")
      .eq("user_id", user.id)
      .order("play_count", { ascending: false })

    // Get total stats
    const totalPlays = tracks?.reduce((sum, track) => sum + track.play_count, 0) || 0
    const totalLikes = tracks?.reduce((sum, track) => sum + track.like_count, 0) || 0
    const totalDownloads = tracks?.reduce((sum, track) => sum + track.download_count, 0) || 0

    // Get follower count
    const { count: followerCount } = await supabase
      .from("follows")
      .select("*", { count: "exact" })
      .eq("following_id", user.id)

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data: recentTracks } = await supabase
      .from("tracks")
      .select("created_at, play_count, like_count")
      .eq("user_id", user.id)
      .gte("created_at", thirtyDaysAgo.toISOString())

    return NextResponse.json({
      totalStats: {
        plays: totalPlays,
        likes: totalLikes,
        downloads: totalDownloads,
        followers: followerCount || 0,
        tracks: tracks?.length || 0,
      },
      topTracks: tracks?.slice(0, 10) || [],
      recentActivity: recentTracks || [],
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
