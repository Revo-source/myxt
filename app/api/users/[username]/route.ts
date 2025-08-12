import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  try {
    const supabase = createClient()
    const { data: user, error } = await supabase.from("users").select("*").eq("username", params.username).single()

    if (error) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get user's tracks
    const { data: tracks } = await supabase
      .from("tracks")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(10)

    // Get user's upcoming events
    const { data: events } = await supabase
      .from("events")
      .select("*")
      .eq("user_id", user.id)
      .gte("event_date", new Date().toISOString())
      .order("event_date", { ascending: true })
      .limit(5)

    // Get user's merchandise
    const { data: merchandise } = await supabase
      .from("merchandise")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .limit(6)

    return NextResponse.json({
      user,
      tracks: tracks || [],
      events: events || [],
      merchandise: merchandise || [],
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}
