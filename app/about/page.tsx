import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Target, Users, Award, Mic, Headphones, Radio, Zap } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "About Us - The OK Studios",
  description: "Learn about The OK Studios, our mission, team, and state-of-the-art podcast recording facilities.",
}

export default function AboutPage() {
  const team = [
    {
      name: "Alex Rivera",
      role: "Founder & Lead Audio Engineer",
      bio: "15+ years of experience in audio production, working with top podcasters and content creators.",
      image: "/professional-audio-engineer-portrait.jpg",
    },
    {
      name: "Jordan Chen",
      role: "Production Manager",
      bio: "Expert in podcast production workflows and client relations, ensuring every session runs smoothly.",
      image: "/professional-production-manager-portrait.jpg",
    },
    {
      name: "Sam Taylor",
      role: "Sound Designer",
      bio: "Specializes in audio post-production, mixing, and mastering for broadcast-quality sound.",
      image: "/professional-sound-designer.png",
    },
  ]

  const equipment = [
    {
      icon: Mic,
      name: "Premium Microphones",
      description: "Shure SM7B, Rode NT1-A, Neumann U87",
    },
    {
      icon: Headphones,
      name: "Studio Monitors",
      description: "Yamaha HS8, Audio-Technica ATH-M50x",
    },
    {
      icon: Radio,
      name: "Audio Interface",
      description: "Universal Audio Apollo, Focusrite Scarlett",
    },
    {
      icon: Zap,
      name: "Acoustic Treatment",
      description: "Professional soundproofing and acoustic panels",
    },
  ]

  const values = [
    {
      icon: Target,
      title: "Quality First",
      description:
        "We never compromise on audio quality. Every session is treated with professional care and attention.",
    },
    {
      icon: Users,
      title: "Client-Focused",
      description: "Your success is our success. We work closely with you to bring your podcast vision to life.",
    },
    {
      icon: Award,
      title: "Industry Expertise",
      description: "Our team brings decades of combined experience in audio production and podcast creation.",
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
              <span>About Us</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Where Great Podcasts Are Made
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
              The OK Studios is a premier podcast recording facility dedicated to helping creators produce
              professional-quality content that resonates with their audience.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-foreground/10">
              <CardContent className="p-8 lg:p-12">
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-bold text-balance">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    At The OK Studios, we believe every voice deserves to be heard with clarity and impact. Our mission
                    is to provide podcasters, content creators, and businesses with access to world-class recording
                    facilities and expert production services that elevate their content to professional standards.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We're passionate about the power of audio storytelling and committed to supporting creators at every
                    stage of their journey—from first-time podcasters to established shows looking to level up their
                    production quality.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">Our Values</h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="border-border/50 hover:border-foreground/20 transition-all duration-300">
                <CardContent className="p-8 space-y-4 text-center">
                  <div className="w-14 h-14 rounded-xl bg-foreground/5 flex items-center justify-center mx-auto">
                    <value.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="border-border/50 hover:border-foreground/20 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{member.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              State-of-the-Art Equipment
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Professional gear for professional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {equipment.map((item, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-lg text-background/80 text-pretty leading-relaxed">
              Join the growing community of podcasters who trust The OK Studios for their audio production needs
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
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
