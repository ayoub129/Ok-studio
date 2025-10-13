import mongoose, { Schema, Document } from "mongoose"

export interface IContact extends Document {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: "new" | "read" | "replied" | "archived"
  created_at: Date
  updated_at: Date
}

const ContactSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["new", "read", "replied", "archived"], 
      default: "new" 
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
)

export default (mongoose.models.Contact as mongoose.Model<IContact>) ||
                   mongoose.model<IContact>("Contact", ContactSchema)
