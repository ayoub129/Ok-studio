import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Booking from "@/lib/models/Booking"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")

    if (!date) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 })
    }

    await connectDB()

    // Get all bookings for the specified date
    const bookings = await Booking.find({
      booking_date: date,
      status: "confirmed"
    }).select("booking_time duration_hours")

    // Generate available time slots (9 AM to 6 PM, hourly slots)
    const availableSlots = []
    const bookedTimes = bookings.map(booking => booking.booking_time)

    for (let hour = 9; hour <= 17; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00:00`
      if (!bookedTimes.includes(timeString)) {
        availableSlots.push(timeString)
      }
    }

    return NextResponse.json({ 
      availableTimes: availableSlots,
      bookedTimes: bookedTimes 
    })
  } catch (error) {
    console.error("[v0] Error in available times route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}