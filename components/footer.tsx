import Link from "next/link"
import Image from "next/image"
import { Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 invert">
                <Image src="/logo.png" alt="The OK Studios" fill className="object-contain" />
              </div>
              <span className="text-lg font-bold">The OK Studios</span>
            </div>
            <p className="text-sm text-background/80 leading-relaxed">
              Professional podcast recording studio delivering premium audio production services.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-background/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-background/80 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-background/80 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-sm text-background/80 hover:text-background transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-sm text-background/80 hover:text-background transition-colors">
                  Book Studio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-background/80 hover:text-background transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-background/80 hover:text-background transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-base mb-4">Services</h3>
            <ul className="space-y-3">
              <li className="text-sm text-background/80">Podcast Recording</li>
              <li className="text-sm text-background/80">Audio Editing</li>
              <li className="text-sm text-background/80">Full Production</li>
              <li className="text-sm text-background/80">Studio Rental</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-base mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-background/80">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>hello@theokstudios.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-background/80">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-background/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Studio Lane, Creative District, CA 90210</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-sm text-background/60">
            &copy; {new Date().getFullYear()} The OK Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
