"use client"

import { useState, useEffect } from "react"

interface LoadingScreenProps {
  children: React.ReactNode
}

export function LoadingScreen({ children }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Simulate loading time (adjust as needed)
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Fast fade out - only 100ms delay
      setTimeout(() => {
        setIsVisible(false)
      }, 100)
    }, 600) // Reduced to 600ms for faster loading

    return () => clearTimeout(timer)
  }, [])

  if (isLoading || isVisible) {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-200 ${!isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="text-center space-y-8 relative z-10">
          {/* Enhanced Logo/Brand */}
          <div className="space-y-4">
            <div className="text-3xl font-bold tracking-wider text-foreground">
              THE OK STUDIOS
            </div>
            <div className="text-sm text-muted-foreground tracking-wide uppercase">
              Professional Podcast Recording
            </div>
            <div className="w-16 h-0.5 bg-foreground/20 mx-auto"></div>
          </div>
          
          {/* Enhanced Loading Animation */}
          <div className="flex items-center justify-center space-x-3">
            <div className="w-3 h-3 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-foreground rounded-full animate-bounce"></div>
          </div>
          
          {/* Enhanced Loading Text */}
          <div className="text-lg font-medium text-foreground tracking-widest uppercase">
            Loading
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
