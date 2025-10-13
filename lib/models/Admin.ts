import mongoose, { Schema, Document } from "mongoose"
import bcrypt from "bcryptjs"

export interface IAdmin extends Document {
  email: string
  password: string
  name: string
  role: "admin" | "super_admin"
  isActive: boolean
  lastLogin?: Date
  created_at: Date
  updated_at: Date
}

const AdminSchema: Schema = new Schema(
  {
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
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
)

// Hash password before saving
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  
  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error as Error)
  }
})

// Compare password method
AdminSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

export default (mongoose.models.Admin as mongoose.Model<IAdmin>) ||
                   mongoose.model<IAdmin>("Admin", AdminSchema)
