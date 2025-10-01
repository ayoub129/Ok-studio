import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Mic, Headphones, Sparkles, Radio, Check, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Services - The OK Studios",
  description: "Professional podcast recording, editing, and production services. View our packages and pricing.",
}

export default function ServicesPage() {
  const services = [
    {
      icon: Radio,
      name: "Podcast Recording",
      price: "$150",
      duration: "per hour",
      description:
        "Professional podcast recording in our state-of-the-art studio with premium equipment and technical support.",
      features: [
        "Professional microphones (Shure SM7B, Rode NT1-A)",
        "Soundproof recording booth",
        "Live monitoring and feedback",
        "Multi-track recording capability",
        "Technical support during session",
        "Comfortable studio environment",
      ],
      popular: false,
    },
    {
      icon: Headphones,
      name: "Audio Editing",
      price: "$100",
      duration: "per hour",
      description: "Expert audio editing and post-production to make your podcast sound polished and professional.",
      features: [
        "Noise reduction and cleanup",
        "Audio enhancement and EQ",
        "Music and sound effects integration",
        "Final mastering for distribution",
        "Multiple format exports",
        "Fast turnaround time",
      ],
      popular: false,
    },
    {
      icon: Sparkles,
      name: "Full Production Package",
      price: "$500",
      duration: "4 hours",
      description:
        "Complete podcast production from recording to final delivery. Perfect for serious podcasters who want the best.",
      features: [
        "2-hour recording session",
        "Professional editing and mixing",
        "Intro/outro music production",
        "Show notes and timestamps",
        "Distribution to major platforms",
        "Dedicated producer support",
        "Priority scheduling",
        "Unlimited revisions",
      ],
      popular: true,
    },
    {
      icon: Mic,
      name: "Studio Rental",
      price: "$120",
      duration: "per hour",
      description: "Rent our premium studio space with all equipment included. Perfect for self-produced content.",
      features: [
        "Access to all studio equipment",
        "Soundproof recording space",
        "High-speed internet connection",
        "Green screen available",
        "Video recording capability",
        "Flexible scheduling options",
      ],
      popular: false,
    },
  ]

  const addOns = [
    {
      name: "Rush Delivery",
      price: "$50",
      description: "Get your edited podcast within 24 hours",
    },
    {
      name: "Video Recording",
      price: "$100/hr",
      description: "Multi-camera video recording for YouTube or social media",
    },
    {
      name: "Transcription Service",
      price: "$75",
      description: "Professional transcription of your podcast episode",
    },
    {
      name: "Social Media Clips",
      price: "$150",
      description: "5 short-form clips optimized for social media platforms",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-background via-background to-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Professional Services</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Services & Pricing
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
              Choose the perfect package for your podcast needs. All services include access to our premium equipment
              and expert support.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`relative border-border/50 hover:border-foreground/20 transition-all duration-300 hover:shadow-xl ${
                  service.popular ? "ring-2 ring-foreground/20" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-foreground text-background text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader className="space-y-4 pb-6">
                  <div className="w-14 h-14 rounded-xl bg-foreground/5 flex items-center justify-center">
                    <service.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2">{service.name}</CardTitle>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{service.price}</span>
                      <span className="text-muted-foreground">{service.duration}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full ${
                      service.popular
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : "bg-transparent border-2 border-foreground/20 hover:bg-foreground hover:text-background"
                    }`}
                    size="lg"
                  >
                    <Link href="/booking">
                      Book This Service
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Additional Services
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Enhance your podcast with these optional add-on services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index} className="border-border/50 hover:border-foreground/20 transition-all duration-300">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold">{addon.name}</h3>
                    <span className="text-xl font-bold">{addon.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">How It Works</h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Simple steps to get your podcast recorded and produced
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Book Online",
                description: "Choose your service and select an available time slot that works for you",
              },
              {
                step: "02",
                title: "Prepare Content",
                description: "We'll send you a preparation guide to help you get ready for your session",
              },
              {
                step: "03",
                title: "Record & Produce",
                description: "Come to our studio and work with our expert team to create amazing content",
              },
              {
                step: "04",
                title: "Receive & Publish",
                description: "Get your polished, ready-to-publish podcast files delivered to you",
              },
            ].map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center text-2xl font-bold mx-auto">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-background/80 text-pretty leading-relaxed">
              Book your session now and take your podcast to the next level with professional production
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-base px-8 h-12 transition-all duration-300 hover:scale-105"
              >
                <Link href="/booking">Book Your Session</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base px-8 h-12 border-background/20 text-background hover:bg-background/10 transition-all duration-300 hover:scale-105 bg-transparent"
              >
                <Link href="/contact">Have Questions?</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
