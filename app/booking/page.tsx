"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BookingCalendar } from "@/components/booking-calendar"
import { TimeSlotPicker } from "@/components/time-slot-picker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Calendar, Clock, User, FileText, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Service } from "@/lib/types"

export default function BookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    notes: "",
  })

  // Fetch services
  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data.services || []))
      .catch((error) => console.error("[v0] Error fetching services:", error))
  }, [])

  // Fetch available times when date is selected
  useEffect(() => {
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split("T")[0]
      fetch(`/api/bookings/available-times?date=${dateString}`)
        .then((res) => res.json())
        .then((data) => setBookedTimes(data.bookedTimes || []))
        .catch((error) => console.error("[v0] Error fetching available times:", error))
    }
  }, [selectedDate])

  const handleServiceSelect = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId)
    setSelectedService(service || null)
  }

  const handleSubmit = async () => {
    if (!selectedService || !selectedDate || !selectedTime) return

    setIsLoading(true)

    try {
      const bookingData = {
        ...formData,
        service_type: selectedService.name,
        service_id: selectedService.id,
        booking_date: selectedDate.toISOString().split("T")[0],
        booking_time: selectedTime,
        duration_hours: selectedService.duration_hours,
        total_price: selectedService.price_per_hour * selectedService.duration_hours,
      }

      const response = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to payment page
        router.push(`/booking/payment?bookingId=${data.booking.id}`)
      } else {
        alert("Failed to create booking. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Error creating booking:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const canProceedToStep2 = selectedService && selectedDate && selectedTime
  const canProceedToStep3 = formData.client_name && formData.client_email

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-gradient-to-br from-background via-background to-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Book Your Session</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Reserve Your Studio Time
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
              Choose your service, pick a time, and secure your booking in just a few steps
            </p>
          </div>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Indicator */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        step >= stepNumber
                          ? "bg-foreground text-background"
                          : "bg-muted text-muted-foreground border-2 border-border"
                      }`}
                    >
                      {stepNumber}
                    </div>
                    <span className="text-xs mt-2 font-medium">
                      {stepNumber === 1 ? "Select" : stepNumber === 2 ? "Details" : "Confirm"}
                    </span>
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 transition-all ${
                        step > stepNumber ? "bg-foreground" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Select Service, Date & Time */}
          {step === 1 && (
            <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Select Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select onValueChange={handleServiceSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - ${service.price_per_hour}/hr ({service.duration_hours}h session)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedService && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">{selectedService.description}</p>
                      <p className="text-lg font-semibold mt-2">
                        Total: ${selectedService.price_per_hour * selectedService.duration_hours}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BookingCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
                <TimeSlotPicker selectedTime={selectedTime} onTimeSelect={setSelectedTime} bookedTimes={bookedTimes} />
              </div>

              <div className="flex justify-end">
                <Button
                  size="lg"
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  Continue to Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Client Details */}
          {step === 2 && (
            <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.client_email}
                      onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.client_phone}
                      onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special requirements or questions?"
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={() => setStep(3)}
                  disabled={!canProceedToStep3}
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  Review Booking
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && selectedService && selectedDate && selectedTime && (
            <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Booking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 pb-4 border-b">
                      <Sparkles className="w-5 h-5 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Service</p>
                        <p className="font-semibold">{selectedService.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pb-4 border-b">
                      <Calendar className="w-5 h-5 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-semibold">{selectedDate.toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pb-4 border-b">
                      <Clock className="w-5 h-5 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-semibold">
                          {selectedTime} ({selectedService.duration_hours}h session)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pb-4 border-b">
                      <User className="w-5 h-5 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Contact</p>
                        <p className="font-semibold">{formData.client_name}</p>
                        <p className="text-sm text-muted-foreground">{formData.client_email}</p>
                        {formData.client_phone && (
                          <p className="text-sm text-muted-foreground">{formData.client_phone}</p>
                        )}
                      </div>
                    </div>

                    {formData.notes && (
                      <div className="flex items-start gap-3 pb-4 border-b">
                        <FileText className="w-5 h-5 mt-0.5 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Notes</p>
                          <p className="text-sm">{formData.notes}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4">
                      <span className="text-lg font-semibold">Total Amount</span>
                      <span className="text-2xl font-bold">
                        ${selectedService.price_per_hour * selectedService.duration_hours}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  {isLoading ? "Processing..." : "Proceed to Payment"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
