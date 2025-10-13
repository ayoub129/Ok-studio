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

    // Get current month and year
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    // Total bookings and revenue
    const totalBookings = await Booking.countDocuments()
    const totalRevenueResult = await Booking.aggregate([
      { $match: { payment_status: "completed" } },
      { $group: { _id: null, total: { $sum: "$total_price" } } }
    ])
    const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0

    // Monthly bookings and revenue
    const monthlyBookings = await Booking.countDocuments({
      created_at: {
        $gte: new Date(currentYear, currentMonth, 1),
        $lt: new Date(currentYear, currentMonth + 1, 1)
      }
    })

    const monthlyRevenueResult = await Booking.aggregate([
      { 
        $match: { 
          payment_status: "completed",
          created_at: {
            $gte: new Date(currentYear, currentMonth, 1),
            $lt: new Date(currentYear, currentMonth + 1, 1)
          }
        } 
      },
      { $group: { _id: null, total: { $sum: "$total_price" } } }
    ])
    const monthlyRevenue = monthlyRevenueResult.length > 0 ? monthlyRevenueResult[0].total : 0

    // Popular services
    const popularServices = await Booking.aggregate([
      { $group: { _id: "$service_type", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ])

    // Booking trends (last 6 months)
    const trends = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - i, 1)
      const nextDate = new Date(currentYear, currentMonth - i + 1, 1)
      
      const monthBookings = await Booking.countDocuments({
        created_at: { $gte: date, $lt: nextDate }
      })

      const monthRevenueResult = await Booking.aggregate([
        { 
          $match: { 
            payment_status: "completed",
            created_at: { $gte: date, $lt: nextDate }
          } 
        },
        { $group: { _id: null, total: { $sum: "$total_price" } } }
      ])
      const monthRevenue = monthRevenueResult.length > 0 ? monthRevenueResult[0].total : 0

      trends.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        bookings: monthBookings,
        revenue: monthRevenue
      })
    }

    return NextResponse.json({
      totalBookings,
      totalRevenue,
      monthlyBookings,
      monthlyRevenue,
      popularServices: popularServices.map(item => ({
        service: item._id,
        count: item.count
      })),
      bookingTrends: trends
    })
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
