import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Booking from "@/lib/models/Booking"

// Force dynamic rendering
export const dynamic = 'force-dynamic'
import type { BookingFormData } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body: BookingFormData & { service_id: string; total_price: number; duration_hours: number } =
      await request.json()

    await connectDB()

    // Create booking in database
    const booking = new Booking({
      client_name: body.client_name,
      client_email: body.client_email,
      client_phone: body.client_phone,
      service_type: body.service_type,
      booking_date: body.booking_date,
      booking_time: body.booking_time,
      duration_hours: body.duration_hours,
      total_price: body.total_price,
      notes: body.notes,
      payment_status: "pending",
      status: "confirmed",
    })

    const savedBooking = await booking.save()

    return NextResponse.json({ booking: savedBooking })
  } catch (error) {
    console.error("[v0] Error in create booking route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
