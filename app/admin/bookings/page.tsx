"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/scroll-reveal"
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle,
  LogOut,
  ArrowLeft,
  Search,
  Filter,
  Eye,
  Edit
} from "lucide-react"
import Link from "next/link"

interface Booking {
  _id: string
  client_name: string
  client_email: string
  client_phone?: string
  service_type: string
  booking_date: string
  booking_time: string
  duration_hours: number
  total_price: number
  payment_status: "pending" | "completed" | "failed"
  status: "confirmed" | "cancelled" | "completed"
  notes?: string
  created_at: string
  updated_at: string
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const router = useRouter()

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }

    fetchBookings()
  }, [router])

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch("/api/admin/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setBookings(data.bookings)
      } else if (response.status === 401) {
        localStorage.removeItem("adminToken")
        router.push("/admin/login")
      }
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    // Clear cookie
    document.cookie = "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/admin/login")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>
      case "cancelled":
        return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.client_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service_type.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || booking.payment_status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading bookings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="bg-foreground text-background shadow-lg border-b border-background/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-background hover:bg-background/10 transition-all duration-300"
              >
                <Link href="/admin/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Manage Bookings</h1>
                  <span className="text-background/70 text-sm">The OK Studios</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-background/30 text-background bg-background/10 hover:bg-background hover:text-foreground hover:border-background transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <ScrollReveal>
          <Card className="mb-8 border-border/50 hover:border-foreground/20 transition-all duration-300 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/20 bg-background/50 text-foreground"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-6 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/20 bg-background/50 text-foreground"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <ScrollReveal key={booking._id} delay={index * 50}>
                <Card className="border-border/50 hover:border-foreground/20 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl font-bold text-foreground">
                            {booking.client_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{booking.client_name}</h3>
                            <p className="text-muted-foreground">{booking.client_email}</p>
                            {booking.client_phone && (
                              <p className="text-sm text-muted-foreground">{booking.client_phone}</p>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="bg-background/50">{booking.service_type}</Badge>
                            <Badge variant="outline" className="bg-background/50">
                              {new Date(booking.booking_date).toLocaleDateString()} at {booking.booking_time}
                            </Badge>
                            <Badge variant="outline" className="bg-background/50">{booking.duration_hours}h</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col lg:items-end gap-4">
                        <div className="text-right">
                          <p className="text-3xl font-bold text-foreground">${booking.total_price}</p>
                          <div className="flex items-center gap-2 mt-3">
                            {getStatusBadge(booking.payment_status)}
                            {getStatusBadge(booking.status)}
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" className="bg-background/50 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="bg-background/50 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {booking.notes && (
                      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <strong>Notes:</strong> {booking.notes}
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-border/50 flex justify-between text-sm text-muted-foreground">
                      <span>Created: {new Date(booking.created_at).toLocaleString()}</span>
                      <span>Updated: {new Date(booking.updated_at).toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))
          ) : (
            <ScrollReveal>
              <Card className="border-border/50">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || statusFilter !== "all" 
                      ? "Try adjusting your search or filter criteria."
                      : "No bookings have been made yet."
                    }
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          )}
        </div>
      </div>
    </div>
  )
}
