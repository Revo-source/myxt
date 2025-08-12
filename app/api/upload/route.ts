import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = formData.get("type") as string // 'audio', 'image', 'video'

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = {
      audio: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/m4a", "audio/flac"],
      image: ["image/jpeg", "image/png", "image/webp", "image/gif"],
      video: ["video/mp4", "video/webm", "video/ogg"],
    }

    if (type && allowedTypes[type as keyof typeof allowedTypes]) {
      const validTypes = allowedTypes[type as keyof typeof allowedTypes]
      if (!validTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `Invalid file type. Allowed types: ${validTypes.join(", ")}` },
          { status: 400 },
        )
      }
    }

    // Create a unique filename with user ID and timestamp
    const timestamp = Date.now()
    const fileExtension = file.name.split(".").pop()
    const filename = `${user.id}/${type || "misc"}/${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
    })

    return NextResponse.json({
      url: blob.url,
      filename: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
