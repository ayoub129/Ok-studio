import { Client, Environment } from 'squareup'

// Square client configuration - lazy initialization to avoid build-time errors
let _squareClient: Client | null = null

export function getSquareClient(): Client {
  if (!_squareClient) {
    if (!process.env.SQUARE_ACCESS_TOKEN) {
      throw new Error('SQUARE_ACCESS_TOKEN environment variable is required')
    }
    
    _squareClient = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox,
    })
  }
  return _squareClient
}

// For backward compatibility, export a getter
export const squareClient = {
  get paymentsApi() {
    return getSquareClient().paymentsApi
  },
  get ordersApi() {
    return getSquareClient().ordersApi
  },
  get customersApi() {
    return getSquareClient().customersApi
  }
}

// Square Web SDK configuration
export const squareWebConfig = {
  applicationId: process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!,
  locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!,
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
}

// Helper function to format amount for Square (in cents)
export function formatAmountForSquare(amount: number): number {
  return Math.round(amount * 100)
}

// Helper function to format amount from Square (from cents to dollars)
export function formatAmountFromSquare(amount: number): number {
  return amount / 100
}
