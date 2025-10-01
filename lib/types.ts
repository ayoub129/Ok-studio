export interface Booking {
  id: string
  client_name: string
  client_email: string
  client_phone?: string
  service_type: string
  booking_date: string
  booking_time: string
  duration_hours: number
  total_price: number
  payment_status: "pending" | "completed" | "failed"
  payment_intent_id?: string
  notes?: string
  status: "confirmed" | "cancelled" | "completed"
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name: string
  description: string
  price_per_hour: number
  duration_hours: number
  features: string[]
  is_active: boolean
  created_at: string
}

export interface BookingFormData {
  client_name: string
  client_email: string
  client_phone?: string
  service_type: string
  booking_date: string
  booking_time: string
  notes?: string
}
