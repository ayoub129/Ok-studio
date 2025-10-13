import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/mongodb"
import Contact from "@/lib/models/Contact"

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

    // Get all contacts with pagination
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1")
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "50")
    const skip = (page - 1) * limit

    const contacts = await Contact.find()
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Contact.countDocuments()

    return NextResponse.json({
      contacts: contacts.map(contact => ({
        ...contact.toObject(),
        id: contact._id
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Admin contacts API error:", error)
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

    const { contactId, updates } = await request.json()

    if (!contactId) {
      return NextResponse.json({ error: "Contact ID is required" }, { status: 400 })
    }

    await connectDB()

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { ...updates, updated_at: new Date() },
      { new: true }
    )

    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      contact: {
        ...contact.toObject(),
        id: contact._id
      }
    })
  } catch (error) {
    console.error("Admin contact update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
