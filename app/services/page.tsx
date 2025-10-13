import React from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Mic, Headphones, Sparkles, Radio, Check, ArrowRight, Star, Clock, Users, Award } from "lucide-react"
import connectDB from "@/lib/mongodb"
import Service from "@/lib/models/Service"

export const metadata = {
  title: "Services - The OK Studios",
  description: "Professional podcast recording, editing, and production services. View our packages and pricing.",
}

async function getServices() {
  try {
    await connectDB()
    
    const services = await Service.find({ is_active: true }).sort({ name: 1 })
    
    // Convert MongoDB _id to id for frontend compatibility
    const formattedServices = services.map(service => ({
      id: service._id.toString(),
      _id: service._id.toString(),
      name: service.name,
      description: service.description,
      price_per_hour: service.price_per_hour,
      duration_hours: service.duration_hours,
      features: service.features,
      is_active: service.is_active,
      created_at: service.created_at
    }))
    
    return formattedServices
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export default async function ServicesPage() {
  const dbServices = await getServices()
  
  // Map service names to icons
  const getServiceIcon = (name: string) => {
    if (name.toLowerCase().includes('recording')) return Radio
    if (name.toLowerCase().includes('editing')) return Headphones
    if (name.toLowerCase().includes('production')) return Sparkles
    if (name.toLowerCase().includes('rental')) return Mic
    return Radio // default icon
  }


  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-br from-background via-background to-muted relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-foreground/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Professional Services</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              Premium Podcast
              <span className="block mt-2 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground text-pretty leading-relaxed max-w-3xl mx-auto">
              Transform your ideas into professional podcast content with our state-of-the-art equipment and expert production team.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ScrollReveal>
        <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Choose Your Package
              </h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Professional podcast services tailored to your needs and budget
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {dbServices.map((service: any, index: number) => (
                <ScrollReveal key={service._id || service.id} delay={index * 150}>
              <Card
                    className={`relative border-border/50 hover:border-foreground/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group ${
                      index === 1 ? "ring-2 ring-foreground/20 scale-105" : ""
                }`}
              >
                {index === 1 && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-foreground text-background text-sm font-bold rounded-full shadow-lg">
                        <Star className="w-4 h-4 inline mr-1" />
                    Most Popular
                  </div>
                )}
                    <CardHeader className="space-y-6 pb-8">
                      <div className="flex items-start justify-between">
                        <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 group-hover:scale-110 transition-all duration-300">
                          {React.createElement(getServiceIcon(service.name), { className: "w-8 h-8" })}
                        </div>
                        {index === 1 && (
                          <div className="text-right">
                            <div className="text-2xl font-bold text-foreground">${service.price_per_hour}/hr</div>
                            <div className="text-sm text-muted-foreground">{service.duration_hours} hour{service.duration_hours > 1 ? 's' : ''}</div>
                          </div>
                        )}
                  </div>
                  <div>
                        <CardTitle className="text-3xl mb-3">{service.name}</CardTitle>
                        {index !== 1 && (
                          <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-bold">${service.price_per_hour}</span>
                      <span className="text-muted-foreground">per hour</span>
                    </div>
                        )}
                        <p className="text-muted-foreground leading-relaxed text-lg">{service.description}</p>
                  </div>
                </CardHeader>
                    <CardContent className="space-y-8">
                      <ul className="space-y-4">
                    {service.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                        className={`w-full h-14 text-lg font-semibold transition-all duration-300 hover:scale-105 ${
                      index === 1
                            ? "bg-foreground text-background hover:bg-foreground/90 shadow-lg"
                            : "bg-foreground/10 text-foreground border-2 border-foreground/20 hover:bg-foreground hover:text-background hover:border-foreground"
                    }`}
                    size="lg"
                  >
                    <Link href="/booking">
                      Book This Service
                          <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Divider Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-0.5 bg-foreground/20 mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Looking for something extra? Our additional services can take your podcast to the next level.
            </p>
          </div>
        </div>
      </section>


      {/* Process Section */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Simple steps to transform your ideas into professional podcast content
            </p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                  icon: Clock,
                title: "Book Online",
                description: "Choose your service and select an available time slot that works for you",
              },
              {
                step: "02",
                  icon: Users,
                title: "Prepare Content",
                description: "We'll send you a preparation guide to help you get ready for your session",
              },
              {
                step: "03",
                  icon: Mic,
                title: "Record & Produce",
                description: "Come to our studio and work with our expert team to create amazing content",
              },
              {
                step: "04",
                  icon: Award,
                title: "Receive & Publish",
                description: "Get your polished, ready-to-publish podcast files delivered to you",
              },
            ].map((step, index) => (
                <ScrollReveal key={index} delay={index * 150}>
                  <div className="text-center space-y-6 group">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-foreground text-background flex items-center justify-center text-2xl font-bold mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                  {step.step}
                </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-foreground flex items-center justify-center">
                        <step.icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
                </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 bg-foreground text-background relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-background/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-background/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-10">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Ready to Create Something
                <span className="block mt-2 bg-gradient-to-r from-background via-background/80 to-background/60 bg-clip-text text-transparent">
                  Amazing?
                </span>
            </h2>
              <p className="text-xl text-background/80 text-pretty leading-relaxed max-w-2xl mx-auto">
                Book your session now and take your podcast to the next level with professional production and expert guidance.
            </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Button
                asChild
                size="lg"
                variant="secondary"
                  className="text-lg px-10 h-14 transition-all duration-300 hover:scale-105 hover:shadow-2xl font-semibold"
              >
                  <Link href="/booking">
                    Book Your Session
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                  className="text-lg px-10 h-14 border-background/20 text-background hover:bg-background/10 transition-all duration-300 hover:scale-105 bg-transparent font-semibold"
              >
                <Link href="/contact">Have Questions?</Link>
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
