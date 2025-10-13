"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  LogOut,
  Settings,
  BarChart3
} from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalBookings: number
  totalRevenue: number
  pendingBookings: number
  completedBookings: number
  totalContacts: number
  recentBookings: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalContacts: 0,
    recentBookings: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }

    fetchDashboardData()
  }, [router])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      if (!token) {
        router.push("/admin/login")
        return
      }
      
      const response = await fetch("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else if (response.status === 401) {
        localStorage.removeItem("adminToken")
        router.push("/admin/login")
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending Bookings",
      value: stats.pendingBookings,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Completed Bookings",
      value: stats.completedBookings,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Contacts",
      value: stats.totalContacts,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="bg-foreground text-background shadow-lg border-b border-background/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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
        {/* Quick Actions */}
        <ScrollReveal>
          <div className="mb-12">
            <div className="flex flex-wrap gap-6">
              <Button asChild variant="outline" className="h-12 px-6 bg-background/50 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105">
                <Link href="/admin/bookings">
                  <Calendar className="w-5 h-5 mr-3" />
                  Manage Bookings
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 px-6 bg-background/50 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105">
                <Link href="/admin/contacts">
                  <Users className="w-5 h-5 mr-3" />
                  Manage Contacts
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 px-6 bg-background/50 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105">
                <Link href="/admin/services">
                  <Settings className="w-5 h-5 mr-3" />
                  Manage Services
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 px-6 bg-background/50 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105">
                <Link href="/admin/analytics">
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Analytics
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <Card className="border-border/50 hover:border-foreground/20 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</p>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`w-16 h-16 rounded-2xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Recent Bookings */}
        <ScrollReveal>
          <Card className="border-border/50 hover:border-foreground/20 transition-all duration-300 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                Recent Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentBookings.map((booking, index) => (
                    <div key={index} className="flex items-center justify-between p-6 border border-border/50 rounded-xl hover:border-foreground/20 transition-all duration-300 bg-muted/20 hover:bg-muted/30">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
                          <span className="text-lg font-bold text-foreground">
                            {booking.client_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{booking.client_name}</p>
                          <p className="text-muted-foreground">{booking.service_type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl text-foreground">${booking.total_price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            booking.payment_status === "completed" 
                              ? "bg-green-100 text-green-800" 
                              : booking.payment_status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {booking.payment_status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No recent bookings found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  )
}
