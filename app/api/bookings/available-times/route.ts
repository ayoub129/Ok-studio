import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")

    if (!date) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 })
    }

    const supabase = await getSupabaseServerClient()

    // Get all bookings for the specified date
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("booking_time, duration_hours")
      .eq("booking_date", date)
      .eq("status", "confirmed")

    if (error) {
      console.error("[v0] Error fetching available times:", error)
      return NextResponse.json({ error: "Failed to fetch available times" }, { status: 500 })
    }

    // Generate available time slots (9 AM to 6 PM, hourly slots)
    const availableSlots = []
    const bookedTimes = bookings?.map(booking => booking.booking_time) || []

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