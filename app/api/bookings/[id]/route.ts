import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Booking from "@/lib/models/Booking"
import mongoose from "mongoose"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid booking ID" }, { status: 400 })
    }

    const booking = await Booking.findById(params.id)

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error("[v0] Error in booking route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}