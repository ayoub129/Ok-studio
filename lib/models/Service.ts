import mongoose, { Schema, Document } from 'mongoose'

export interface IService extends Document {
  name: string
  description: string
  price_per_hour: number
  duration_hours: number
  features: string[]
  is_active: boolean
  created_at: Date
}

const ServiceSchema = new Schema<IService>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price_per_hour: {
    type: Number,
    required: true
  },
  duration_hours: {
    type: Number,
    required: true
  },
  features: [{
    type: String,
    trim: true
  }],
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Create index for better performance
ServiceSchema.index({ is_active: 1 })

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema)
