"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Sparkles, Mail, Phone, MapPin, Clock, Send, CheckCircle, ArrowRight, MessageCircle, XCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000)
      } else {
        setSubmitStatus("error")
        setTimeout(() => setSubmitStatus("idle"), 5000)
      }
    } catch (error) {
      console.error("Error submitting contact form:", error)
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "hello@theokstudios.com",
      link: "mailto:hello@theokstudios.com",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 Studio Lane, Creative District, CA 90210",
      link: "https://maps.google.com/?q=123+Studio+Lane+Creative+District+CA+90210",
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon-Fri: 9AM-8PM, Sat-Sun: 10AM-6PM",
      link: null,
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-br from-background via-background to-muted relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium backdrop-blur-sm">
                <MessageCircle className="w-4 h-4" />
              <span>Get in Touch</span>
            </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                Let's Create Something{" "}
                <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                  Amazing
                </span>{" "}
                Together
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground text-pretty leading-relaxed max-w-3xl mx-auto">
                Have questions about our services? Want to discuss your podcast project? We'd love to hear from you and help bring your vision to life.
              </p>
              
              {/* Quick Contact Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-3xl mx-auto">
                <div className="text-center space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold">24h</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold">Free</div>
                  <div className="text-sm text-muted-foreground">Consultation</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold">7 Days</div>
                  <div className="text-sm text-muted-foreground">A Week</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold">100%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
              </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium w-fit">
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
                      Ready to Get Started?
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      Fill out the form below and we'll get back to you within 24 hours to discuss your project.
                    </p>
                  </div>
                  
                  <Card className="border-border/50 hover:border-foreground/20 transition-all duration-300">
                    <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                            <Label htmlFor="name" className="text-base font-medium">Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                              className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                            <Label htmlFor="email" className="text-base font-medium">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                              className="h-12"
                      />
                          </div>
                    </div>

                    <div className="space-y-2">
                          <Label htmlFor="phone" className="text-base font-medium">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                          <Label htmlFor="subject" className="text-base font-medium">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                            className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                          <Label htmlFor="message" className="text-base font-medium">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your project or question..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                            className="resize-none"
                      />
                    </div>

                    {submitStatus === "success" && (
                          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <p className="text-sm text-green-600">
                          Thank you for your message! We'll get back to you within 24 hours.
                        </p>
                      </div>
                    )}

                        {submitStatus === "error" && (
                          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                            <p className="text-sm text-red-600">
                              There was an error sending your message. Please try again.
                            </p>
                          </div>
                        )}

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                          className="w-full bg-foreground text-background hover:bg-foreground/90 h-14 text-lg transition-all duration-300 hover:scale-105"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                              <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
                </div>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div className="space-y-6">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium w-fit">
                      <MapPin className="w-4 h-4" />
                      <span>Contact Info</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
                      Get in Touch
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Multiple ways to reach us. We're here to help with your podcast needs.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                {contactInfo.map((info, index) => (
                      <ScrollReveal key={index} delay={index * 100}>
                        <Card className="border-border/50 hover:border-foreground/20 transition-all duration-300 hover:shadow-lg group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                              <div className="w-14 h-14 rounded-xl bg-foreground/5 flex items-center justify-center flex-shrink-0 group-hover:bg-foreground/10 group-hover:scale-110 transition-all duration-300">
                                <info.icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                                <h4 className="text-lg font-semibold mb-2">{info.title}</h4>
                          {info.link ? (
                            <a
                              href={info.link}
                              target="_blank"
                              rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground transition-colors text-base"
                            >
                              {info.content}
                            </a>
                          ) : (
                                  <p className="text-muted-foreground text-base">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                      </ScrollReveal>
                ))}
                  </div>
              </div>

              {/* Map */}
                <ScrollReveal delay={400}>
                  <Card className="overflow-hidden border-border/50 hover:border-foreground/20 transition-all duration-300">
                <CardContent className="p-0">
                      <div className="relative w-full h-[400px] bg-muted">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7334!2d-118.3!3d34.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAzJzAwLjAiTiAxMTjCsDE4JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="The OK Studios Location"
                    />
                  </div>
                </CardContent>
              </Card>
                </ScrollReveal>
              </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* FAQ Section */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-20 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium w-fit mx-auto">
                  <MessageCircle className="w-4 h-4" />
                  <span>FAQ</span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Quick answers to common questions about our services
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "Do I need to bring my own equipment?",
                  answer:
                    "No! We provide all professional recording equipment including microphones, headphones, and audio interfaces. Just bring yourself and your content.",
                },
                {
                  question: "Can I tour the studio before booking?",
                  answer:
                    "We offer free studio tours by appointment. Contact us to schedule a visit and see our facilities.",
                },
                {
                  question: "What's your cancellation policy?",
                  answer:
                    "You can cancel or reschedule up to 48 hours before your session for a full refund. Cancellations within 48 hours are subject to a 50% fee.",
                },
                {
                  question: "Do you offer package deals?",
                  answer:
                    "Yes! We offer discounted rates for bulk bookings and recurring sessions. Contact us to discuss custom packages for your needs.",
                },
              ].map((faq, index) => (
                  <ScrollReveal key={index} delay={index * 100}>
                    <Card className="border-border/50 hover:border-foreground/20 transition-all duration-300 hover:shadow-lg group">
                      <CardContent className="p-8">
                        <h3 className="font-bold text-xl mb-4 group-hover:text-foreground transition-colors">{faq.question}</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">{faq.answer}</p>
                  </CardContent>
                </Card>
                  </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 bg-foreground text-background relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-10">
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                  Ready to Start Your{" "}
                  <span className="bg-gradient-to-r from-background to-background/60 bg-clip-text text-transparent">
                    Podcast Journey?
                  </span>
                </h2>
                <p className="text-xl text-background/80 text-pretty leading-relaxed max-w-2xl mx-auto">
                  Don't wait to bring your podcast vision to life. Book your session today and experience professional-quality recording.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="text-lg px-10 h-14 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <a href="/booking" className="flex items-center gap-2">
                    Book Your Session
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 h-14 border-background/20 text-background hover:bg-background/10 transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  <a href="/services">View Services</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <Footer />
    </div>
  )
}
