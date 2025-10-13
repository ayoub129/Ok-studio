import { type NextRequest, NextResponse } from "next/server"
import { squareClient, formatAmountForSquare } from "@/lib/square"
import connectDB from "@/lib/mongodb"
import Booking from "@/lib/models/Booking"
import mongoose from "mongoose"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('create-payment received body:', body)
    
    const { bookingId } = body

    if (!bookingId) {
      console.log('No bookingId provided in request body')
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 })
    }

    console.log('Processing payment for bookingId:', bookingId)

    await connectDB()

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return NextResponse.json({ error: "Invalid booking ID" }, { status: 400 })
    }

    // Get booking details
    const booking = await Booking.findById(bookingId)

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Create Square payment request
    const amount = formatAmountForSquare(booking.total_price)
    
    const requestBody = {
      sourceId: 'cnon:card-nonce-ok', // This will be replaced by the actual card nonce from the frontend
      idempotencyKey: `${bookingId}-${Date.now()}`, // Unique key to prevent duplicate payments
      amountMoney: {
        amount: amount,
        currency: 'USD'
      },
      note: `${booking.service_type} - ${booking.booking_date} at ${booking.booking_time}`,
      buyerEmailAddress: booking.client_email,
      orderId: bookingId, // Use booking ID as order ID
      metadata: {
        bookingId: booking._id.toString(),
        clientName: booking.client_name,
        serviceType: booking.service_type,
      }
    }

    // For now, we'll return the payment request data
    // The actual payment will be processed when the frontend sends the card nonce
    return NextResponse.json({
      success: true,
      paymentRequest: {
        amount: amount,
        currency: 'USD',
        bookingId: booking._id.toString(),
        clientName: booking.client_name,
        serviceType: booking.service_type,
        description: `${booking.service_type} - ${booking.booking_date} at ${booking.booking_time}`
      }
    })
  } catch (error) {
    console.error("[v0] Error creating Square payment:", error)
    
    // Handle specific Square client errors
    if (error instanceof Error && error.message.includes('SQUARE_ACCESS_TOKEN')) {
      return NextResponse.json({ error: "Payment service configuration error" }, { status: 500 })
    }
    
    return NextResponse.json({ error: "Failed to create payment request" }, { status: 500 })
  }
}
