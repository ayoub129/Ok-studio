import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import Link from "next/link"
import { Sparkles, Target, Users, Award, Mic, Headphones, Radio, Zap, Star, CheckCircle, ArrowRight } from "lucide-react"
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
                <Sparkles className="w-4 h-4" />
                <span>About The OK Studios</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                Where Great{" "}
                <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                  Podcasts
                </span>{" "}
                Are Made
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground text-pretty leading-relaxed max-w-3xl mx-auto">
                The OK Studios is a premier podcast recording facility dedicated to helping creators produce
                professional-quality content that resonates with their audience.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-3xl mx-auto">
                <div className="text-center space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold">500+</div>
                  <div className="text-sm text-muted-foreground">Episodes Produced</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold">150+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold">98%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission Section */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              {/* Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium w-fit">
                    <Target className="w-4 h-4" />
                    <span>Our Mission</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                    Empowering Every Voice
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
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
                
                {/* Key Points */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Professional-grade recording equipment</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Expert audio engineering and production</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Flexible scheduling and support</span>
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <Image 
                    src="/professional-podcast-studio-setup.jpg" 
                    alt="Professional podcast studio setup at The OK Studios" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-foreground/5 rounded-full"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-foreground/5 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Values Section */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium w-fit mx-auto">
                <Star className="w-4 h-4" />
                <span>Our Values</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                The Principles That Guide Us
              </h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                These core values shape every interaction and decision we make
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <Card className="border-border/50 hover:border-foreground/20 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group h-full">
                    <CardContent className="p-8 space-y-6 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center mx-auto group-hover:bg-foreground/10 group-hover:scale-110 transition-all duration-300">
                        <value.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">{value.description}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Team Section */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium w-fit mx-auto">
                <Users className="w-4 h-4" />
                <span>Meet Our Team</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                The Experts Behind Your Success
              </h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Experienced professionals dedicated to bringing your podcast vision to life
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <ScrollReveal key={index} delay={index * 150}>
                  <Card className="border-border/50 hover:border-foreground/20 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group h-full">
                    <CardContent className="p-8 space-y-6">
                      <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted group-hover:scale-105 transition-transform duration-300">
                        <Image 
                          src={member.image || "/placeholder.svg"} 
                          alt={member.name} 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      <div className="space-y-4 text-center">
                        <div>
                          <h3 className="text-2xl font-bold">{member.name}</h3>
                          <p className="text-lg font-medium text-muted-foreground mt-1">{member.role}</p>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Equipment Section */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              {/* Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium w-fit">
                    <Zap className="w-4 h-4" />
                    <span>Our Equipment</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                    State-of-the-Art Technology
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    We use only the finest professional equipment to ensure your podcast sounds absolutely perfect. 
                    From premium microphones to advanced audio interfaces, every piece of gear is carefully selected 
                    for optimal performance.
                  </p>
                </div>
                
                {/* Equipment Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {equipment.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors duration-300">
                      <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Image */}
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <Image 
                    src="/audio-mixing-console.jpg" 
                    alt="Professional audio mixing console at The OK Studios" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-foreground/5 rounded-full"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-foreground/5 rounded-full"></div>
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
                  Ready to Create Something{" "}
                  <span className="bg-gradient-to-r from-background to-background/60 bg-clip-text text-transparent">
                    Amazing?
                  </span>
                </h2>
                <p className="text-xl text-background/80 text-pretty leading-relaxed max-w-2xl mx-auto">
                  Join the growing community of podcasters who trust The OK Studios for their audio production needs
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="text-lg px-10 h-14 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Link href="/booking" className="flex items-center gap-2">
                    Book Your Session
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 h-14 border-background/20 text-background hover:bg-background/10 transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  <Link href="/contact">Get in Touch</Link>
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
