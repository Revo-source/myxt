import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { dj_id, amount, message } = await request.json()

    if (!dj_id || !amount || amount < 100) {
      // Minimum $1.00
      return NextResponse.json({ error: "Invalid tip amount" }, { status: 400 })
    }

    // Get DJ information
    const { data: dj } = await supabase.from("users").select("display_name, username").eq("id", dj_id).single()

    if (!dj) {
      return NextResponse.json({ error: "DJ not found" }, { status: 404 })
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: {
        type: "tip",
        dj_id,
        tipper_id: user.id,
        message: message || "",
      },
      description: `Tip for ${dj.display_name || dj.username}`,
    })

    return NextResponse.json({
      id: paymentIntent.id,
      client_secret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    })
  } catch (error) {
    console.error("Tip payment error:", error)
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}
