import { list } from "@vercel/blob"
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    // Check authentication
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { blobs } = await list()

    // Filter files by user ID (files are stored with user ID prefix)
    const userFiles = blobs
      .filter((blob) => blob.pathname.startsWith(`${user.id}/`))
      .map((blob) => ({
        ...blob,
        filename: blob.pathname.split("/").pop() || "unknown",
        category: blob.pathname.split("/")[1] || "misc",
      }))

    return NextResponse.json({ files: userFiles })
  } catch (error) {
    console.error("Error listing files:", error)
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 })
  }
}
