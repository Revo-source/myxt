// Health check endpoint to verify API and database connectivity
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const startTime = Date.now()
  const checks: Record<string, { status: "healthy" | "unhealthy"; message?: string; responseTime?: number }> = {}

  try {
    // Test database connectivity
    const dbStart = Date.now()
    const supabase = createClient()
    const { data, error } = await supabase.from("users").select("count").limit(1)

    checks.database = {
      status: error ? "unhealthy" : "healthy",
      message: error?.message,
      responseTime: Date.now() - dbStart,
    }

    // Test authentication service
    const authStart = Date.now()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    checks.authentication = {
      status: authError && authError.message !== "Auth session missing!" ? "unhealthy" : "healthy",
      message: authError?.message === "Auth session missing!" ? "No active session (expected)" : authError?.message,
      responseTime: Date.now() - authStart,
    }

    // Test file storage (Blob)
    const storageStart = Date.now()
    try {
      const { list } = await import("@vercel/blob")
      await list({ limit: 1 })
      checks.storage = {
        status: "healthy",
        responseTime: Date.now() - storageStart,
      }
    } catch (storageError) {
      checks.storage = {
        status: "unhealthy",
        message: storageError instanceof Error ? storageError.message : "Storage check failed",
        responseTime: Date.now() - storageStart,
      }
    }

    const totalResponseTime = Date.now() - startTime
    const overallStatus = Object.values(checks).every((check) => check.status === "healthy") ? "healthy" : "unhealthy"

    return NextResponse.json(
      {
        status: overallStatus,
        timestamp: new Date().toISOString(),
        responseTime: totalResponseTime,
        checks,
        version: "1.0.0",
      },
      {
        status: overallStatus === "healthy" ? 200 : 503,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : "Unknown error",
        checks,
      },
      { status: 503 },
    )
  }
}
