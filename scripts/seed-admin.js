const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config({ path: ".env.local" })

const AdminSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  role: { 
    type: String, 
    enum: ["admin", "super_admin"], 
    default: "admin" 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  lastLogin: { 
    type: Date 
  },
}, { timestamps: true })

const Admin = mongoose.model("Admin", AdminSchema)

async function seedAdmin() {
  try {
    console.log("Connecting to MongoDB...")
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@theokstudios.com" })
    if (existingAdmin) {
      console.log("Admin user already exists")
      return
    }

    // Hash password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash("admin123", salt)

    // Create admin user
    const admin = new Admin({
      email: "admin@theokstudios.com",
      password: hashedPassword,
      name: "Admin User",
      role: "admin",
      isActive: true
    })

    await admin.save()
    console.log("Admin user created successfully!")
    console.log("Email: admin@theokstudios.com")
    console.log("Password: admin123")

  } catch (error) {
    console.error("Error seeding admin:", error)
  } finally {
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
  }
}

seedAdmin()
