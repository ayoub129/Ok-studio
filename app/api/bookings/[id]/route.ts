import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await getSupabaseServerClient()

    const { data: booking, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", params.id)
      .single()

    if (error) {
      console.error("[v0] Error fetching booking:", error)
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error("[v0] Error in booking route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}