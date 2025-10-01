import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { BookingFormData } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body: BookingFormData & { service_id: string; total_price: number; duration_hours: number } =
      await request.json()

    const supabase = await getSupabaseServerClient()

    // Create booking in database
    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
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
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating booking:", error)
      return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error("[v0] Error in create booking route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
