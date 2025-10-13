import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Service from "@/lib/models/Service"
import mongoose from "mongoose"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// PUT - Update service
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    
    await connectDB()

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid service ID" }, { status: 400 })
    }

    const updatedService = await Service.findByIdAndUpdate(
      params.id,
      {
        name: body.name,
        description: body.description,
        price_per_hour: body.price_per_hour,
        duration_hours: body.duration_hours,
        features: body.features.filter((feature: string) => feature.trim() !== ""),
        is_active: body.is_active
      },
      { new: true }
    )

    if (!updatedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json({ 
      service: {
        id: updatedService._id.toString(),
        _id: updatedService._id.toString(),
        name: updatedService.name,
        description: updatedService.description,
        price_per_hour: updatedService.price_per_hour,
        duration_hours: updatedService.duration_hours,
        features: updatedService.features,
        is_active: updatedService.is_active,
        created_at: updatedService.created_at
      }
    })
  } catch (error) {
    console.error("[v0] Error updating service:", error)
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 })
  }
}

// DELETE - Delete service
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid service ID" }, { status: 400 })
    }

    const deletedService = await Service.findByIdAndDelete(params.id)

    if (!deletedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Service deleted successfully" })
  } catch (error) {
    console.error("[v0] Error deleting service:", error)
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 })
  }
}
