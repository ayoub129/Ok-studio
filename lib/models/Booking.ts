import mongoose, { Schema, Document } from 'mongoose'

export interface IBooking extends Document {
  client_name: string
  client_email: string
  client_phone?: string
  service_type: string
  booking_date: string
  booking_time: string
  duration_hours: number
  total_price: number
  payment_status: 'pending' | 'completed' | 'failed'
  payment_intent_id?: string
  notes?: string
  status: 'confirmed' | 'cancelled' | 'completed'
  created_at: Date
  updated_at: Date
}

const BookingSchema = new Schema<IBooking>({
  client_name: {
    type: String,
    required: true,
    trim: true
  },
  client_email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  client_phone: {
    type: String,
    trim: true
  },
  service_type: {
    type: String,
    required: true,
    trim: true
  },
  booking_date: {
    type: String,
    required: true
  },
  booking_time: {
    type: String,
    required: true
  },
  duration_hours: {
    type: Number,
    required: true,
    default: 2
  },
  total_price: {
    type: Number,
    required: true
  },
  payment_status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  payment_intent_id: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  }
}, {
  timestamps: true
})

// Create indexes for better performance
BookingSchema.index({ booking_date: 1 })
BookingSchema.index({ client_email: 1 })
BookingSchema.index({ status: 1 })
BookingSchema.index({ payment_status: 1 })

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema)
