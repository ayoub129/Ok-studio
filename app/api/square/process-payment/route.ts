import { type NextRequest, NextResponse } from "next/server"
import { squareClient, formatAmountFromSquare } from "@/lib/square"
import connectDB from "@/lib/mongodb"
import Booking from "@/lib/models/Booking"
import mongoose from "mongoose"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { bookingId, cardNonce } = await request.json()

    if (!bookingId || !cardNonce) {
      return NextResponse.json({ error: "Booking ID and card nonce are required" }, { status: 400 })
    }

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

    // Create Square payment
    const amount = Math.round(booking.total_price * 100) // Convert to cents
    
    const requestBody = {
      sourceId: cardNonce,
      idempotencyKey: `${bookingId}-${Date.now()}`,
      amountMoney: {
        amount: amount,
        currency: 'USD'
      },
      note: `${booking.service_type} - ${booking.booking_date} at ${booking.booking_time}`,
      buyerEmailAddress: booking.client_email,
      orderId: bookingId,
      metadata: {
        bookingId: booking._id.toString(),
        clientName: booking.client_name,
        serviceType: booking.service_type,
      }
    }

    // Process payment with Square
    const { result } = await squareClient.paymentsApi.createPayment(requestBody)

    if (result.payment) {
      const payment = result.payment
      
      // Update booking with payment information
      await Booking.findByIdAndUpdate(bookingId, {
        payment_status: payment.status === 'COMPLETED' ? 'completed' : 'failed',
        payment_intent_id: payment.id,
        status: payment.status === 'COMPLETED' ? 'confirmed' : 'cancelled'
      })

      return NextResponse.json({
        success: payment.status === 'COMPLETED',
        payment: {
          id: payment.id,
          status: payment.status,
          amount: formatAmountFromSquare(payment.amountMoney?.amount || 0),
          currency: payment.amountMoney?.currency,
          receiptUrl: payment.receiptUrl,
          createdAt: payment.createdAt
        }
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: "Payment processing failed" 
      }, { status: 400 })
    }
  } catch (error) {
    console.error("[v0] Error processing Square payment:", error)
    return NextResponse.json({ error: "Failed to process payment" }, { status: 500 })
  }
}
