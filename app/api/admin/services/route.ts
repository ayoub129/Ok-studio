import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Service from "@/lib/models/Service"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// GET - Fetch all services (admin view)
export async function GET() {
  try {
    await connectDB()

    const services = await Service.find().sort({ name: 1 })

    // Convert MongoDB _id to id for frontend compatibility
    const formattedServices = services.map(service => ({
      id: service._id.toString(),
      _id: service._id.toString(),
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
    console.error("[v0] Error in admin services route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    await connectDB()

    // Create new service
    const service = new Service({
      name: body.name,
      description: body.description,
      price_per_hour: body.price_per_hour,
      duration_hours: body.duration_hours,
      features: body.features.filter((feature: string) => feature.trim() !== ""),
      is_active: body.is_active
    })

    const savedService = await service.save()

    return NextResponse.json({ 
      service: {
        id: savedService._id.toString(),
        _id: savedService._id.toString(),
        name: savedService.name,
        description: savedService.description,
        price_per_hour: savedService.price_per_hour,
        duration_hours: savedService.duration_hours,
        features: savedService.features,
        is_active: savedService.is_active,
        created_at: savedService.created_at
      }
    }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating service:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
