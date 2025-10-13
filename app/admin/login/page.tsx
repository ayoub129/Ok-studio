"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Store admin token in both localStorage and cookie
        localStorage.setItem("adminToken", data.token)
        
        // Set cookie for middleware access (remove secure for localhost)
        document.cookie = `adminToken=${data.token}; path=/; max-age=${24 * 60 * 60}; samesite=lax`
        
        
        // Small delay to ensure cookie is set, then redirect
        setTimeout(() => {
          window.location.href = "/admin/dashboard"
        }, 100)
      } else {
        setError(data.error || "Login failed")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted relative overflow-hidden">
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

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-lg">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Admin Portal</h1>
                  <p className="text-sm text-muted-foreground">The OK Studios</p>
                </div>
              </div>
            </div>

            <Card className="border-border/50 hover:border-foreground/20 transition-all duration-300">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
                <p className="text-lg text-muted-foreground">
                  Access the admin dashboard to manage bookings and contacts
                </p>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-lg font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@theokstudios.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-14 text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-lg font-medium">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="h-14 text-lg pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="w-full bg-foreground text-background hover:bg-foreground/90 h-14 text-lg transition-all duration-300 hover:scale-105"
                  >
                    {isLoading ? (
                      "Signing In..."
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
      </div>
    </div>
  )
}
