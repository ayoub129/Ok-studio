"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, Calendar, Clock, Mail, Loader2 } from "lucide-react"
import type { Booking } from "@/lib/types"

function SuccessContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")
  const paymentIntent = searchParams.get("payment_intent")

  const [booking, setBooking] = useState<Booking | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (bookingId && paymentIntent) {
      // Confirm payment
      fetch("/api/stripe/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, paymentIntentId: paymentIntent }),
      })
        .then(() => fetch(`/api/bookings/${bookingId}`))
        .then((res) => res.json())
        .then((data) => {
          setBooking(data.booking)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("[v0] Error loading booking:", error)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [bookingId, paymentIntent])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-foreground/10">
              <CardContent className="p-8 lg:p-12 text-center space-y-8">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl font-bold">Booking Confirmed!</h1>
                  <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                    Your payment has been processed successfully. We've sent a confirmation email with all the details.
                  </p>
                </div>

                {booking && (
                  <div className="bg-muted/50 rounded-lg p-6 space-y-4 text-left">
                    <h2 className="font-semibold text-lg text-center mb-4">Session Details</h2>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-semibold">{new Date(booking.booking_date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-semibold">{booking.booking_time.substring(0, 5)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Confirmation sent to</p>
                        <p className="font-semibold">{booking.client_email}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3 pt-4">
                  <Button asChild size="lg" className="w-full bg-foreground text-background hover:bg-foreground/90">
                    <Link href="/">Return to Home</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
                    <Link href="/booking">Book Another Session</Link>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  Need to make changes? Contact us at{" "}
                  <a href="mailto:hello@theokstudios.com" className="underline hover:text-foreground">
                    hello@theokstudios.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
