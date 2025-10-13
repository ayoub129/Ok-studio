"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SquarePaymentForm } from "@/components/square-payment-form"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Calendar, Clock, User, Loader2 } from "lucide-react"
import type { Booking } from "@/lib/types"


function PaymentContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")

  const [booking, setBooking] = useState<Booking | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!bookingId) {
      setError("No booking ID provided")
      setIsLoading(false)
      return
    }

    // Fetch booking details
    fetch(`/api/bookings/${bookingId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.booking) {
          setBooking(data.booking)
          setIsLoading(false)
        } else {
          throw new Error("Booking not found")
        }
      })
      .catch((error) => {
        console.error("[v0] Error loading payment:", error)
        setError("Failed to load payment details")
        setIsLoading(false)
      })
  }, [bookingId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">Loading payment details...</p>
        </div>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <p className="text-destructive">{error || "Failed to load booking"}</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-gradient-to-br from-background via-background to-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Secure Payment</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">Complete Your Booking</h1>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Review your booking details and complete payment to confirm your session
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <Card>
              <CardContent className="p-8 space-y-6">
                <h2 className="text-2xl font-bold">Booking Summary</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-4 border-b">
                    <Sparkles className="w-5 h-5 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Service</p>
                      <p className="font-semibold">{booking.service_type}</p>
                      <p className="text-sm text-muted-foreground">{booking.duration_hours} hour session</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b">
                    <Calendar className="w-5 h-5 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-semibold">{new Date(booking.booking_date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b">
                    <Clock className="w-5 h-5 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-semibold">{booking.booking_time.substring(0, 5)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b">
                    <User className="w-5 h-5 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-semibold">{booking.client_name}</p>
                      <p className="text-sm text-muted-foreground">{booking.client_email}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-3xl font-bold">${booking.total_price.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <SquarePaymentForm 
              bookingId={booking.id} 
              amount={booking.total_price} 
              onSuccess={(paymentResult) => {
                // Redirect to success page
                window.location.href = `/booking/success?bookingId=${booking.id}`
              }}
              onError={(error) => {
                console.error('Payment error:', error)
              }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  )
}
