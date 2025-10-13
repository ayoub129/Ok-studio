import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Contact from "@/lib/models/Contact"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      )
    }

    await connectDB()

    // Create new contact
    const contact = new Contact({
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
      status: "new"
    })

    await contact.save()

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject
      }
    })
  } catch (error) {
    console.error("Contact form submission error:", error)
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    )
  }
}
