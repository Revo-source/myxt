import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if already liked
    const { data: existingLike } = await supabase
      .from("likes")
      .select("id")
      .eq("user_id", user.id)
      .eq("track_id", params.id)
      .single()

    if (existingLike) {
      return NextResponse.json({ error: "Track already liked" }, { status: 400 })
    }

    // Add like
    const { error: likeError } = await supabase.from("likes").insert({
      user_id: user.id,
      track_id: params.id,
    })

    if (likeError) {
      return NextResponse.json({ error: likeError.message }, { status: 500 })
    }

    // Update like count
    const { error: updateError } = await supabase.rpc("increment_like_count", {
      track_id: params.id,
    })

    if (updateError) {
      console.error("Error updating like count:", updateError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error liking track:", error)
    return NextResponse.json({ error: "Failed to like track" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Remove like
    const { error: unlikeError } = await supabase
      .from("likes")
      .delete()
      .eq("user_id", user.id)
      .eq("track_id", params.id)

    if (unlikeError) {
      return NextResponse.json({ error: unlikeError.message }, { status: 500 })
    }

    // Update like count
    const { error: updateError } = await supabase.rpc("decrement_like_count", {
      track_id: params.id,
    })

    if (updateError) {
      console.error("Error updating like count:", updateError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error unliking track:", error)
    return NextResponse.json({ error: "Failed to unlike track" }, { status: 500 })
  }
}
