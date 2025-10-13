import { Client, Environment } from 'squareup'

// Square client configuration
export const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox,
})

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
