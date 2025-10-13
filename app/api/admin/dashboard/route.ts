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

    // Get booking statistics
    const totalBookings = await Booking.countDocuments()
    const pendingBookings = await Booking.countDocuments({ payment_status: "pending" })
    const completedBookings = await Booking.countDocuments({ payment_status: "completed" })
    
    // Calculate total revenue
    const revenueResult = await Booking.aggregate([
      { $match: { payment_status: "completed" } },
      { $group: { _id: null, total: { $sum: "$total_price" } } }
    ])
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0

    // Get recent bookings
    const recentBookings = await Booking.find()
      .sort({ created_at: -1 })
      .limit(5)
      .select("client_name service_type total_price payment_status created_at")

    // For now, we'll use a placeholder for total contacts
    // In a real app, you'd have a Contact model
    const totalContacts = 0 // This would come from a Contact model

    return NextResponse.json({
      totalBookings,
      totalRevenue,
      pendingBookings,
      completedBookings,
      totalContacts,
      recentBookings: recentBookings.map(booking => ({
        ...booking.toObject(),
        id: booking._id
      }))
    })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
