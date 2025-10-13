import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Service from "@/lib/models/Service"

export async function GET() {
  try {
    await connectDB()

    const services = await Service.find({ is_active: true }).sort({ name: 1 })

    // Convert MongoDB _id to id for frontend compatibility
    const formattedServices = services.map(service => ({
      id: service._id.toString(),
      name: service.name,
      description: service.description,
      price_per_hour: service.price_per_hour,
      duration_hours: service.duration_hours,
      features: service.features,
      is_active: service.is_active,
      created_at: service.created_at
    }))

    return NextResponse.json({ services: formattedServices })
  } catch (error) {
    console.error("[v0] Error in services route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
