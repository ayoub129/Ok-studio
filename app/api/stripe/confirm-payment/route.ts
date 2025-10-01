import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { getSupabaseServerClient } from "@/lib/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId } = await request.json()

    if (!paymentIntentId) {
      return NextResponse.json({ error: "Payment intent ID is required" }, { status: 400 })
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status === "succeeded") {
      const supabase = await getSupabaseServerClient()

      // Update booking status to completed
      const { error } = await supabase
        .from("bookings")
        .update({ 
          payment_status: "completed",
          status: "confirmed"
        })
        .eq("payment_intent_id", paymentIntentId)

      if (error) {
        console.error("[v0] Error updating booking:", error)
        return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
      }

      return NextResponse.json({ success: true, status: "completed" })
    } else {
      return NextResponse.json({ success: false, status: paymentIntent.status })
    }
  } catch (error) {
    console.error("[v0] Error confirming payment:", error)
    return NextResponse.json({ error: "Failed to confirm payment" }, { status: 500 })
  }
}