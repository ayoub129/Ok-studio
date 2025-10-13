import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/mongodb"
import Booking from "@/lib/models/Booking"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

async function verifyAdminToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return decoded
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin token
    const admin = await verifyAdminToken(request)
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    // Get all bookings with pagination
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1")
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "50")
    const skip = (page - 1) * limit

    const bookings = await Booking.find()
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Booking.countDocuments()

    return NextResponse.json({
      bookings: bookings.map(booking => ({
        ...booking.toObject(),
        id: booking._id
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Admin bookings API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify admin token
    const admin = await verifyAdminToken(request)
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { bookingId, updates } = await request.json()

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 })
    }

    await connectDB()

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { ...updates, updated_at: new Date() },
      { new: true }
    )

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      booking: {
        ...booking.toObject(),
        id: booking._id
      }
    })
  } catch (error) {
    console.error("Admin booking update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
