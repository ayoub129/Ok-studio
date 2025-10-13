"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CreditCard, CheckCircle, XCircle } from "lucide-react"

interface SquarePaymentFormProps {
  bookingId: string
  amount: number
  onSuccess: (paymentResult: any) => void
  onError: (error: string) => void
}

declare global {
  interface Window {
    Square: any
  }
}

export function SquarePaymentForm({ bookingId, amount, onSuccess, onError }: SquarePaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentRequest, setPaymentRequest] = useState<any>(null)
  const [card, setCard] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    // Load Square Web SDK
    const script = document.createElement('script')
    script.src = 'https://web.squarecdn.com/v1/square.js'
    script.async = true
    script.onload = initializeSquare
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const initializeSquare = async () => {
    try {
      if (!window.Square) {
        throw new Error('Square SDK not loaded')
      }

      console.log('Initializing Square with bookingId:', bookingId)

      // Initialize Square Web Payments SDK
      const payments = window.Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!,
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!
      )

      // Create card payment method
      const cardPaymentMethod = await payments.card()
      await cardPaymentMethod.attach('#card-container')
      setCard(cardPaymentMethod)

      // Fetch payment request data
      console.log('Sending request to create-payment with bookingId:', bookingId)
      const response = await fetch('/api/square/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId })
      })

      const data = await response.json()
      if (data.success) {
        setPaymentRequest(data.paymentRequest)
      } else {
        throw new Error(data.error || 'Failed to create payment request')
      }
    } catch (error) {
      console.error('Error initializing Square:', error)
      setErrorMessage('Failed to initialize payment system')
      onError('Failed to initialize payment system')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!card || !paymentRequest) {
      setErrorMessage('Payment system not ready')
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)

    try {
      // Tokenize the card
      const result = await card.tokenize()
      
      if (result.status === 'OK') {
        // Process payment with the token
        const paymentResponse = await fetch('/api/square/process-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId,
            cardNonce: result.token
          })
        })

        const paymentData = await paymentResponse.json()
        
        if (paymentData.success) {
          onSuccess(paymentData.payment)
        } else {
          throw new Error(paymentData.error || 'Payment failed')
        }
      } else {
        throw new Error(result.errors?.[0]?.detail || 'Card tokenization failed')
      }
    } catch (error) {
      console.error('Payment error:', error)
      const errorMsg = error instanceof Error ? error.message : 'Payment failed'
      setErrorMessage(errorMsg)
      onError(errorMsg)
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading payment form...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Amount</span>
              <span className="text-2xl font-bold">${amount.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Card Information</label>
              <div 
                id="card-container" 
                className="p-4 border rounded-lg min-h-[120px] bg-background"
              >
                {/* Square card form will be rendered here */}
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-destructive" />
                <p className="text-sm text-destructive">{errorMessage}</p>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={!card || isProcessing}
            className="w-full bg-foreground text-background hover:bg-foreground/90"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Pay ${amount.toFixed(2)}
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Your payment is secured by Square. We never store your card details.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
