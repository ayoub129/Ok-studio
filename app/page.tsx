import React from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedTitle } from "@/components/animated-title"
import { AnimatedCounter } from "@/components/animated-counter"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import {
  Mic,
  Headphones,
  Radio,
  Sparkles,
  Clock,
  Shield,
  Users,
  Award,
  TrendingUp,
  Zap,
  Star,
  CheckCircle,
  Calendar,
} from "lucide-react"

async function getServices() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/services`, {
      cache: 'no-store' // Ensure fresh data
    })
    if (!response.ok) {
      throw new Error('Failed to fetch services')
    }
    const data = await response.json()
    return data.services || []
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export default async function HomePage() {
  const services = await getServices()
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/professional-podcast-studio-setup.jpg"
            alt="Professional podcast studio"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 animate-pulse-glow"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-foreground/5 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24">
          <div className="max-w-4xl mx-auto text-center space-y-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium animate-scale-in">
              <Sparkles className="w-4 h-4" />
              <span>Professional Podcast Studio</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-balance leading-tight">
              Create Your Best
              <span className="block mt-2 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                <AnimatedTitle />
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              State-of-the-art recording facilities, expert production services, and premium equipment to bring your
              podcast vision to life.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 text-base px-8 h-14 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <Link href="/booking">Book Your Session</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base px-8 h-14 transition-all duration-300 hover:scale-105 bg-transparent hover:bg-foreground/5"
              >
                <Link href="/services">View Services</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-20 max-w-2xl mx-auto">
              {[
                { value: 500, suffix: "+", label: "Episodes Recorded" },
                { value: 150, suffix: "+", label: "Happy Clients" },
                { value: 5, suffix: "★", label: "Average Rating" },
              ].map((stat, index) => (
                <div key={index} className={`space-y-2 animate-fade-in-up animate-delay-${(index + 1) * 100}`}>
                  <AnimatedCounter 
                    end={stat.value} 
                    suffix={stat.suffix}
                    duration={2500}
                  />
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2">
            <div className="w-1 h-3 rounded-full bg-foreground/40" />
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="py-20 bg-muted/20 border-y border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-muted-foreground mb-12 uppercase tracking-wider">
              Trusted by leading podcasters
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
              {["TechTalk", "Business Daily", "Creative Minds", "The Interview", "Story Hour"].map((brand, index) => (
                <div
                  key={index}
                  className="text-2xl font-bold tracking-tight hover:opacity-100 transition-opacity duration-300"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                  Professional Studio Environment
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Our state-of-the-art facilities feature acoustically treated rooms, premium recording equipment, and a
                  comfortable atmosphere designed to bring out your best performance.
                </p>
                <ul className="space-y-4">
                  {[
                    "Soundproof recording booths",
                    "Professional-grade microphones",
                    "Advanced mixing consoles",
                    "Comfortable client lounge",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-foreground/60 flex-shrink-0" />
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all duration-300"
                >
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden group">
                <Image
                  src="/modern-podcast-recording-booth.jpg"
                  alt="Modern podcast recording booth"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Features Section */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Why Choose The OK Studios?
              </h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                We provide everything you need to create professional-quality podcast content
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  icon: Mic,
                  title: "Premium Equipment",
                  description: "Industry-leading microphones, mixers, and recording gear for crystal-clear audio",
                },
                {
                  icon: Headphones,
                  title: "Expert Production",
                  description: "Professional audio engineers to help you achieve the perfect sound",
                },
                {
                  icon: Clock,
                  title: "Flexible Scheduling",
                  description: "Book sessions that fit your schedule with our easy online booking system",
                },
                {
                  icon: Shield,
                  title: "Soundproof Booths",
                  description: "Acoustically treated rooms for pristine recordings without external noise",
                },
              ].map((feature, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <Card className="border-border/50 hover:border-foreground/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group h-full">
                    <CardContent className="p-8 space-y-4">
                      <div className="w-14 h-14 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 group-hover:scale-110 transition-all duration-300">
                        <feature.icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Premium Equipment
              </h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                We use only the best gear to ensure your podcast sounds professional
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Professional Microphones",
                  image: "/professional-studio-microphone.jpg",
                  description: "Industry-standard mics for crystal-clear vocals",
                },
                {
                  title: "Mixing Console",
                  image: "/audio-mixing-console.jpg",
                  description: "Advanced mixing boards for perfect sound control",
                },
                {
                  title: "Monitoring System",
                  image: "/studio-monitoring-headphones.jpg",
                  description: "High-fidelity monitoring for accurate playback",
                },
              ].map((equipment, index) => (
                <ScrollReveal key={index} delay={index * 150}>
                  <Card className="border-border/50 hover:border-foreground/20 transition-all duration-500 hover:shadow-2xl group overflow-hidden">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={equipment.image || "/placeholder.svg"}
                        alt={equipment.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <CardContent className="p-6 space-y-2">
                      <h3 className="text-xl font-semibold">{equipment.title}</h3>
                      <p className="text-muted-foreground text-sm">{equipment.description}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Process Section */}
      <ScrollReveal>
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Simple Process, Professional Results
              </h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                From booking to final delivery, we make it easy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  icon: Calendar,
                  title: "Book Your Session",
                  description: "Choose your preferred date and time through our online booking system",
                },
                {
                  step: "02",
                  icon: Mic,
                  title: "Record Your Content",
                  description: "Work with our expert team in our state-of-the-art recording studio",
                },
                {
                  step: "03",
                  icon: Zap,
                  title: "Receive Final Product",
                  description: "Get your professionally edited and mastered podcast ready to publish",
                },
              ].map((process, index) => (
                <ScrollReveal key={index} delay={index * 150}>
                  <div className="relative group">
                    <div className="text-center space-y-6">
                      <div className="relative inline-block">
                        <div className="w-20 h-20 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 group-hover:scale-110 transition-all duration-300 mx-auto">
                          <process.icon className="w-10 h-10" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                          {process.step}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold">{process.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{process.description}</p>
                    </div>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border/50" />
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Services Preview */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">Our Services</h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                From recording to final production, we've got you covered
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {services.slice(0, 3).map((service: any, index: number) => {
                // Map service names to icons
                const getServiceIcon = (name: string) => {
                  if (name.toLowerCase().includes('recording')) return Radio
                  if (name.toLowerCase().includes('editing')) return Headphones
                  if (name.toLowerCase().includes('production')) return Sparkles
                  if (name.toLowerCase().includes('rental')) return Mic
                  return Radio // default icon
                }
                
                return (
                <ScrollReveal key={service._id || service.id} delay={index * 100}>
                  <Card
                    className={`border-border/50 hover:border-foreground/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden h-full ${
                      index === 1 ? "ring-2 ring-foreground/20" : ""
                    }`}
                  >
                    {index === 1 && (
                      <div className="absolute top-4 right-4 bg-foreground text-background text-xs font-bold px-3 py-1 rounded-full">
                        POPULAR
                      </div>
                    )}
                    <CardContent className="p-8 space-y-6">
                      <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 group-hover:scale-110 transition-all duration-300">
                        {React.createElement(getServiceIcon(service.name), { className: "w-8 h-8" })}
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold mb-2">{service.name}</h3>
                        <p className="text-3xl font-bold text-muted-foreground">${service.price_per_hour}/hr</p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-foreground/60" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full group-hover:bg-foreground group-hover:text-background transition-all bg-transparent"
                      >
                        <Link href="/services">Learn More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
                )
              })}
            </div>

            <div className="text-center mt-16">
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all duration-300 px-10 h-14 text-base"
              >
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonials Section */}
      <ScrollReveal>
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                What Our Clients Say
              </h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Don't just take our word for it
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Tech Podcast Host",
                  content:
                    "The OK Studios transformed my podcast quality. The equipment and expertise are unmatched. Highly recommend!",
                  rating: 5,
                },
                {
                  name: "Michael Chen",
                  role: "Business Podcaster",
                  content:
                    "Professional service from start to finish. The team made recording easy and the final product exceeded expectations.",
                  rating: 5,
                },
                {
                  name: "Emily Rodriguez",
                  role: "Interview Series Creator",
                  content:
                    "Best studio experience I've had. The booking system is seamless and the audio quality is pristine.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <ScrollReveal key={index} delay={index * 150}>
                  <Card className="border-border/50 hover:border-foreground/20 transition-all duration-500 hover:shadow-xl group h-full">
                    <CardContent className="p-8 space-y-6">
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-foreground text-foreground" />
                        ))}
                      </div>
                      <p className="text-muted-foreground leading-relaxed italic">"{testimonial.content}"</p>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Stats Section */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 bg-foreground text-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
              {[
                { icon: Users, value: 150, suffix: "+", label: "Active Clients" },
                { icon: Mic, value: 500, suffix: "+", label: "Episodes Produced" },
                { icon: Award, value: 15, suffix: "+", label: "Industry Awards" },
                { icon: TrendingUp, value: 98, suffix: "%", label: "Client Satisfaction" },
              ].map((stat, index) => (
                <div key={index} className="text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-background/10 flex items-center justify-center mx-auto">
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <AnimatedCounter 
                    end={stat.value} 
                    suffix={stat.suffix}
                    duration={3000}
                  />
                  <div className="text-background/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-10">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Ready to Start Your Podcast Journey?
              </h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed max-w-2xl mx-auto">
                Book your first session today and experience the difference of professional podcast production
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 text-base px-10 h-14 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <Link href="/booking">Book Now</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-base px-10 h-14 transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  <Link href="/contact">Contact Us</Link>
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
