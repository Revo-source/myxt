import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const isLive = searchParams.get("live") === "true"
    const upcoming = searchParams.get("upcoming") === "true"

    let query = supabase.from("live_streams").select(`
        *,
        users!live_streams_user_id_fkey (
          username,
          display_name,
          avatar_url,
          is_verified
        )
      `)

    if (isLive) {
      query = query.eq("is_live", true)
    } else if (upcoming) {
      query = query
        .eq("is_live", false)
        .gte("scheduled_for", new Date().toISOString())
        .order("scheduled_for", { ascending: true })
    } else {
      query = query.order("created_at", { ascending: false })
    }

    const { data: streams, error } = await query.limit(20)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ streams })
  } catch (error) {
    console.error("Error fetching streams:", error)
    return NextResponse.json({ error: "Failed to fetch streams" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, genre, tags, thumbnail_url, scheduled_for } = body

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const { data: stream, error } = await supabase
      .from("live_streams")
      .insert({
        user_id: user.id,
        title,
        description,
        genre,
        tags,
        thumbnail_url,
        scheduled_for,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ stream })
  } catch (error) {
    console.error("Error creating stream:", error)
    return NextResponse.json({ error: "Failed to create stream" }, { status: 500 })
  }
}
