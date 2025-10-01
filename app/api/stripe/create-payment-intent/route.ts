import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { getSupabaseServerClient } from "@/lib/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request: NextRequest) {
  try {
    const { bookingId } = await request.json()

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 })
    }

    const supabase = await getSupabaseServerClient()

    // Get booking details
    const { data: booking, error } = await supabase.from("bookings").select("*").eq("id", bookingId).single()

    if (error || !booking) {
      console.error("[v0] Error fetching booking:", error)
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.total_price * 100), // Convert to cents
      currency: "usd",
      metadata: {
        bookingId: booking.id,
        clientName: booking.client_name,
        clientEmail: booking.client_email,
        serviceType: booking.service_type,
      },
      description: `${booking.service_type} - ${booking.booking_date} at ${booking.booking_time}`,
    })

    // Update booking with payment intent ID
    await supabase.from("bookings").update({ payment_intent_id: paymentIntent.id }).eq("id", bookingId)

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error("[v0] Error creating payment intent:", error)
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}
